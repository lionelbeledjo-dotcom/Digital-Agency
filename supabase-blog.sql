CREATE TABLE IF NOT EXISTS blog_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  titre TEXT NOT NULL,
  extrait TEXT NOT NULL,
  contenu TEXT NOT NULL,
  categorie TEXT NOT NULL DEFAULT 'IA',
  image_url TEXT,
  auteur TEXT NOT NULL DEFAULT 'Lionel B.',
  lecture TEXT DEFAULT '5 min',
  tags TEXT[] DEFAULT '{}',
  is_published BOOLEAN DEFAULT false,
  vues INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blog_slug ON blog_articles (slug);
CREATE INDEX IF NOT EXISTS idx_blog_categorie ON blog_articles (categorie);
CREATE INDEX IF NOT EXISTS idx_blog_published ON blog_articles (is_published);

ALTER TABLE blog_articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "blog_read_published" ON blog_articles FOR SELECT USING (is_published = true);
CREATE POLICY "blog_admin_all" ON blog_articles FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE TABLE IF NOT EXISTS email_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  prenom TEXT,
  source TEXT DEFAULT 'popup',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE email_leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "leads_insert_anon" ON email_leads FOR INSERT WITH CHECK (true);
CREATE POLICY "leads_admin_read" ON email_leads FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
