-- ============================================
-- MODULES & LEÇONS — à exécuter dans Supabase SQL Editor
-- ============================================

-- Table modules (chapitres d'une formation)
CREATE TABLE public.modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  formation_id UUID REFERENCES public.formations(id) ON DELETE CASCADE NOT NULL,
  titre TEXT NOT NULL,
  position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table leçons (vidéos d'un module)
CREATE TABLE public.lecons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID REFERENCES public.modules(id) ON DELETE CASCADE NOT NULL,
  titre TEXT NOT NULL,
  description TEXT DEFAULT '',
  duree TEXT DEFAULT '',
  position INTEGER NOT NULL DEFAULT 0,
  video_type TEXT NOT NULL DEFAULT 'youtube' CHECK (video_type IN ('youtube', 'upload', 'vimeo')),
  video_url TEXT DEFAULT '',
  video_storage_path TEXT DEFAULT '',
  ressources JSONB DEFAULT '[]',
  gratuit BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lecons ENABLE ROW LEVEL SECURITY;

-- Tout le monde peut lire les modules/leçons
CREATE POLICY "Anyone can view modules" ON public.modules FOR SELECT USING (true);
CREATE POLICY "Anyone can view lecons" ON public.lecons FOR SELECT USING (true);

-- Admins peuvent tout gérer
CREATE POLICY "Admins can manage modules" ON public.modules FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can manage lecons" ON public.lecons FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Bucket storage pour les vidéos uploadées
INSERT INTO storage.buckets (id, name, public) VALUES ('videos', 'videos', true)
ON CONFLICT (id) DO NOTHING;

-- Policy storage : admins peuvent upload
CREATE POLICY "Admins can upload videos" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'videos' AND
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Anyone can view videos" ON storage.objects
  FOR SELECT USING (bucket_id = 'videos');
