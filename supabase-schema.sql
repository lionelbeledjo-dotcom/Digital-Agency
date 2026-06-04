-- ============================================
-- DIGITAL AGENCY — Schéma de base de données
-- Exécute ce fichier dans Supabase > SQL Editor
-- ============================================

-- Table profiles (extension de auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  prenom TEXT NOT NULL DEFAULT '',
  nom TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL,
  whatsapp TEXT DEFAULT '',
  pays TEXT DEFAULT '',
  plan TEXT NOT NULL DEFAULT 'starter' CHECK (plan IN ('starter', 'club_ia', 'pro_creator')),
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('member', 'admin')),
  lien_affilie TEXT DEFAULT '',
  code_parrain TEXT DEFAULT '',
  parrain_id UUID REFERENCES public.profiles(id),
  date_inscription TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  statut TEXT NOT NULL DEFAULT 'actif' CHECK (statut IN ('actif', 'suspendu')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table formations
CREATE TABLE public.formations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  titre TEXT NOT NULL,
  description TEXT DEFAULT '',
  categorie TEXT NOT NULL,
  niveau TEXT NOT NULL CHECK (niveau IN ('Débutant', 'Intermédiaire', 'Avancé')),
  acces TEXT NOT NULL DEFAULT 'starter' CHECK (acces IN ('starter', 'club_ia', 'pro_creator')),
  modules INTEGER DEFAULT 0,
  duree TEXT DEFAULT '',
  emoji TEXT DEFAULT '',
  inscrits INTEGER DEFAULT 0,
  note NUMERIC(2,1) DEFAULT 0,
  apprentissages TEXT[] DEFAULT '{}',
  publie BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table inscriptions formations (user <-> formation)
CREATE TABLE public.inscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  formation_id UUID REFERENCES public.formations(id) ON DELETE CASCADE NOT NULL,
  progression INTEGER DEFAULT 0 CHECK (progression >= 0 AND progression <= 100),
  complete BOOLEAN DEFAULT FALSE,
  date_inscription TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  date_completion TIMESTAMPTZ,
  UNIQUE(user_id, formation_id)
);

-- Table commissions
CREATE TABLE public.commissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  filleul_id UUID REFERENCES public.profiles(id),
  plan TEXT NOT NULL,
  montant INTEGER NOT NULL DEFAULT 0,
  statut TEXT NOT NULL DEFAULT 'en_attente' CHECK (statut IN ('en_attente', 'verse', 'annule')),
  date_versement DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table paiements
CREATE TABLE public.paiements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  montant INTEGER NOT NULL,
  methode TEXT NOT NULL CHECK (methode IN ('wero', 'paypal', 'mtn', 'orange')),
  plan TEXT NOT NULL,
  statut TEXT NOT NULL DEFAULT 'en_attente' CHECK (statut IN ('en_attente', 'complete', 'echoue', 'rembourse')),
  reference TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.formations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.paiements ENABLE ROW LEVEL SECURITY;

-- Profiles : chacun voit/modifie son profil, admin voit tout
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update all profiles" ON public.profiles
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Formations : tout le monde peut lire, admin peut modifier
CREATE POLICY "Anyone can view formations" ON public.formations
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage formations" ON public.formations
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Inscriptions : user voit les siennes, admin voit tout
CREATE POLICY "Users can view own inscriptions" ON public.inscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own inscriptions" ON public.inscriptions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own inscriptions" ON public.inscriptions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage inscriptions" ON public.inscriptions
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Commissions : user voit les siennes, admin voit tout
CREATE POLICY "Users can view own commissions" ON public.commissions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage commissions" ON public.commissions
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Paiements : user voit les siens, admin voit tout
CREATE POLICY "Users can view own paiements" ON public.paiements
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage paiements" ON public.paiements
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================
-- TRIGGER : créer un profil à chaque inscription
-- ============================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, prenom, nom, lien_affilie)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'prenom', ''),
    COALESCE(NEW.raw_user_meta_data->>'nom', ''),
    'https://digitalagency.com/ref/' || UPPER(SUBSTRING(MD5(NEW.id::text) FROM 1 FOR 8))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
