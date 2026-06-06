-- ============================================================
-- SITE CONTENT — Contenu modifiable depuis l'admin
-- ============================================================

CREATE TABLE IF NOT EXISTS site_content (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Tout le monde peut lire
CREATE POLICY "site_content_read" ON site_content
  FOR SELECT USING (true);

-- Seuls les admins peuvent modifier
CREATE POLICY "site_content_admin_write" ON site_content
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Données initiales
INSERT INTO site_content (key, value) VALUES
('fondateur', '{
  "nom": "Lionel Beledjo",
  "role": "Fondateur & CEO",
  "bio": "Passionné de marketing digital et d''intelligence artificielle, j''ai créé Digital Agency avec une mission simple : donner à chaque francophone les outils pour générer un revenu en ligne. Après 5 ans dans le digital en Europe, j''ai décidé de mettre mon expertise au service de l''Afrique francophone.",
  "photo_url": "",
  "linkedin": "",
  "twitter": ""
}'::jsonb),
('reseaux_sociaux', '{
  "facebook": "https://www.facebook.com/digitalagency.site",
  "instagram": "https://www.instagram.com/digitalagency.site",
  "telegram": "https://t.me/digitalagencysite",
  "whatsapp": "https://wa.me/message/digitalagency",
  "tiktok": "",
  "youtube": ""
}'::jsonb),
('hero_chiffres', '{
  "carte1_label": "Top membre",
  "carte1_montant": "+ 85.000 FCFA",
  "carte1_sous_texte": "gagné ce vendredi",
  "carte2_label": "Total distribué",
  "carte2_montant": "+ 2.4M FCFA",
  "carte2_sous_texte": "à nos membres cette semaine"
}'::jsonb),
('statistiques', '{
  "formations": "15+",
  "pays": "12",
  "apprenants": "10K+",
  "reverses": "5M+ FCFA"
}'::jsonb),
('temoignages', '[
  {"nom": "Aminata K.", "ville": "Abidjan, CI", "texte": "J''ai commencé en Starter, en 2 mois je suis passée à 65 000 FCFA de commissions. La méthode marche.", "photo_url": ""},
  {"nom": "Kofi M.", "ville": "Dakar, SN", "texte": "Les formations IA sont concrètes. J''ai automatisé mes posts Instagram et mes ventes ont doublé.", "photo_url": ""},
  {"nom": "Moussa D.", "ville": "Yaoundé, CM", "texte": "Le paiement vendredi via MTN, c''est ce qui change tout. On voit la lumière au bout de la semaine.", "photo_url": ""}
]'::jsonb)
ON CONFLICT (key) DO NOTHING;
