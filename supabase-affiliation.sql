-- ============================================
-- AFFILIATION — à exécuter dans Supabase SQL Editor
-- ============================================

-- Table clicks affilié (tracking)
CREATE TABLE public.affiliate_clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id UUID REFERENCES public.profiles(id) NOT NULL,
  visitor_ip TEXT DEFAULT '',
  referrer TEXT DEFAULT '',
  page TEXT DEFAULT '/',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Ajouter colonne parrain_code unique aux profils
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS parrain_code TEXT UNIQUE;

-- Générer un code parrain pour les profils existants qui n'en ont pas
UPDATE public.profiles
SET parrain_code = UPPER(SUBSTRING(MD5(id::text) FROM 1 FOR 8))
WHERE parrain_code IS NULL OR parrain_code = '';

-- Fonction : attribuer un filleul lors de l'inscription
CREATE OR REPLACE FUNCTION public.handle_new_user_affiliation()
RETURNS TRIGGER AS $$
DECLARE
  parrain_user_id UUID;
  parrain_plan TEXT;
  commission_rate NUMERIC;
  plan_prix INTEGER;
  commission_amount INTEGER;
BEGIN
  -- Chercher le parrain via le code
  IF NEW.raw_user_meta_data->>'code_parrain' IS NOT NULL AND NEW.raw_user_meta_data->>'code_parrain' != '' THEN
    SELECT id, plan INTO parrain_user_id, parrain_plan
    FROM public.profiles
    WHERE parrain_code = UPPER(NEW.raw_user_meta_data->>'code_parrain');

    IF parrain_user_id IS NOT NULL THEN
      -- Mettre à jour le profil du filleul avec le parrain
      UPDATE public.profiles SET parrain_id = parrain_user_id WHERE id = NEW.id;

      -- Calculer la commission selon le plan du parrain
      commission_rate := CASE parrain_plan
        WHEN 'starter' THEN 0.10
        WHEN 'club_ia' THEN 0.25
        WHEN 'pro_creator' THEN 0.40
        ELSE 0.10
      END;

      -- Pour l'instant, on crée une commission de base (sera recalculée au paiement)
      -- La vraie commission sera créée quand le filleul paie
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger après création du profil
DROP TRIGGER IF EXISTS on_profile_created_affiliation ON public.profiles;
CREATE TRIGGER on_profile_created_affiliation
  AFTER INSERT ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_affiliation();

-- Fonction : créer une commission quand un paiement est confirmé
CREATE OR REPLACE FUNCTION public.create_commission_on_payment()
RETURNS TRIGGER AS $$
DECLARE
  parrain_id_val UUID;
  parrain_plan TEXT;
  commission_rate NUMERIC;
  commission_amount INTEGER;
BEGIN
  -- Seulement pour les paiements confirmés
  IF NEW.statut != 'complete' THEN
    RETURN NEW;
  END IF;

  -- Trouver le parrain du payeur
  SELECT parrain_id INTO parrain_id_val FROM public.profiles WHERE id = NEW.user_id;

  IF parrain_id_val IS NOT NULL THEN
    -- Récupérer le plan du parrain pour le taux
    SELECT plan INTO parrain_plan FROM public.profiles WHERE id = parrain_id_val;

    commission_rate := CASE parrain_plan
      WHEN 'starter' THEN 0.10
      WHEN 'club_ia' THEN 0.25
      WHEN 'pro_creator' THEN 0.40
      ELSE 0.10
    END;

    commission_amount := FLOOR(NEW.montant * commission_rate);

    -- Créer la commission
    INSERT INTO public.commissions (user_id, filleul_id, plan, montant, statut)
    VALUES (parrain_id_val, NEW.user_id, NEW.plan, commission_amount, 'en_attente');
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_payment_confirmed ON public.paiements;
CREATE TRIGGER on_payment_confirmed
  AFTER INSERT OR UPDATE ON public.paiements
  FOR EACH ROW EXECUTE FUNCTION public.create_commission_on_payment();

-- RLS pour clicks
ALTER TABLE public.affiliate_clicks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own clicks" ON public.affiliate_clicks
  FOR SELECT USING (auth.uid() = affiliate_id);

CREATE POLICY "Anyone can insert clicks" ON public.affiliate_clicks
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all clicks" ON public.affiliate_clicks
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Fonction RPC pour compter les stats d'un affilié
CREATE OR REPLACE FUNCTION public.get_affiliate_stats(user_id_param UUID)
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'total_clicks', (SELECT COUNT(*) FROM public.affiliate_clicks WHERE affiliate_id = user_id_param),
    'total_filleuls', (SELECT COUNT(*) FROM public.profiles WHERE parrain_id = user_id_param),
    'filleuls_actifs', (SELECT COUNT(*) FROM public.profiles WHERE parrain_id = user_id_param AND plan != 'starter'),
    'commissions_total', (SELECT COALESCE(SUM(montant), 0) FROM public.commissions WHERE user_id = user_id_param AND statut = 'verse'),
    'commissions_en_attente', (SELECT COALESCE(SUM(montant), 0) FROM public.commissions WHERE user_id = user_id_param AND statut = 'en_attente')
  ) INTO result;
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
