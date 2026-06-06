-- ============================================================
-- GALERIE IA — Créations avec prompts
-- ============================================================

CREATE TABLE IF NOT EXISTS galerie (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titre TEXT NOT NULL,
  description TEXT,
  prompt TEXT NOT NULL,
  media_url TEXT NOT NULL,
  media_type TEXT NOT NULL DEFAULT 'image' CHECK (media_type IN ('image', 'video')),
  thumbnail_url TEXT,
  tags TEXT[] DEFAULT '{}',
  categorie TEXT DEFAULT 'art',
  format TEXT DEFAULT '1:1',
  duree TEXT,
  outil TEXT DEFAULT 'Midjourney',
  acces TEXT NOT NULL DEFAULT 'starter' CHECK (acces IN ('starter', 'club_ia', 'pro_creator')),
  likes INTEGER DEFAULT 0,
  vues INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index pour recherche par tags et catégorie
CREATE INDEX IF NOT EXISTS idx_galerie_tags ON galerie USING GIN (tags);
CREATE INDEX IF NOT EXISTS idx_galerie_categorie ON galerie (categorie);
CREATE INDEX IF NOT EXISTS idx_galerie_acces ON galerie (acces);

-- RLS
ALTER TABLE galerie ENABLE ROW LEVEL SECURITY;

-- Tout le monde peut lire les créations publiées
CREATE POLICY "galerie_select_published" ON galerie
  FOR SELECT USING (is_published = true);

-- Les admins peuvent tout faire
CREATE POLICY "galerie_admin_all" ON galerie
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Table pour les recréations des utilisateurs
CREATE TABLE IF NOT EXISTS galerie_recreations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  galerie_id UUID NOT NULL REFERENCES galerie(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  result_url TEXT,
  input_photo_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'done', 'failed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE galerie_recreations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "recreations_own" ON galerie_recreations
  FOR ALL USING (user_id = auth.uid());

CREATE POLICY "recreations_admin" ON galerie_recreations
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
