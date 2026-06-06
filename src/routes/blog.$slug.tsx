import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/components/public-layout";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { ChevronRight, Clock, User, Facebook, MessageCircle, Send, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  component: BlogArticlePage,
});

interface Article {
  id: string;
  slug: string;
  titre: string;
  extrait: string;
  contenu: string;
  categorie: string;
  image_url: string;
  auteur: string;
  lecture: string;
  tags: string[];
  created_at: string;
}

interface RelatedArticle {
  id: string;
  slug: string;
  titre: string;
  image_url: string;
  categorie: string;
  created_at: string;
}

function BlogArticlePage() {
  const { slug } = Route.useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [related, setRelated] = useState<RelatedArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("blog_articles").select("*").eq("slug", slug).eq("is_published", true).single().then(({ data }) => {
      setArticle(data);
      setLoading(false);
      if (data) {
        supabase.from("blog_articles").update({ vues: (data.vues || 0) + 1 }).eq("id", data.id);
        supabase.from("blog_articles").select("id,slug,titre,image_url,categorie,created_at").eq("is_published", true).eq("categorie", data.categorie).neq("id", data.id).limit(3).then(({ data: rel }) => setRelated(rel || []));
      }
    });
  }, [slug]);

  if (loading) return <PublicLayout><div className="py-20 text-center text-muted-foreground">Chargement...</div></PublicLayout>;
  if (!article) return <PublicLayout><div className="py-20 text-center"><h1 className="text-2xl font-bold">Article introuvable</h1><Link to="/blog" className="mt-4 inline-block text-forest font-semibold">Retour au blog</Link></div></PublicLayout>;

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <PublicLayout>
      <article className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-8">
            <Link to="/blog" className="hover:text-forest">Blog</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground truncate">{article.titre}</span>
          </nav>

          {article.image_url && (
            <img src={article.image_url} alt={article.titre} className="w-full h-64 sm:h-80 object-cover rounded-3xl mb-8" />
          )}

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="rounded-full bg-forest/10 px-3 py-1 text-xs font-medium text-forest">{article.categorie}</span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground"><User className="h-3 w-3" /> {article.auteur}</span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3 w-3" /> {article.lecture}</span>
            <span className="text-xs text-muted-foreground">{new Date(article.created_at).toLocaleDateString("fr-FR")}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight" style={{ fontFamily: "var(--font-heading)" }}>{article.titre}</h1>

          {article.extrait && <p className="mt-4 text-lg text-muted-foreground">{article.extrait}</p>}

          <div className="mt-8 prose prose-lg max-w-none text-foreground leading-relaxed" style={{ whiteSpace: "pre-wrap" }}>
            {article.contenu}
          </div>

          {(article.tags || []).length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {article.tags.map(tag => (
                <span key={tag} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">{tag}</span>
              ))}
            </div>
          )}

          <div className="mt-10 flex items-center gap-3 border-t border-border pt-6">
            <span className="text-sm font-medium text-foreground">Partager :</span>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-forest/10 text-forest hover:bg-forest hover:text-white transition-colors"><Facebook className="h-4 w-4" /></a>
            <a href={`https://t.me/share/url?url=${shareUrl}&text=${article.titre}`} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-forest/10 text-forest hover:bg-forest hover:text-white transition-colors"><Send className="h-4 w-4" /></a>
            <a href={`https://wa.me/?text=${article.titre} ${shareUrl}`} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-forest/10 text-forest hover:bg-forest hover:text-white transition-colors"><MessageCircle className="h-4 w-4" /></a>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-secondary py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="text-2xl font-bold text-foreground mb-8">Articles similaires</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map(a => (
                <Link key={a.id} to="/blog/$slug" params={{ slug: a.slug }} className="group rounded-2xl border border-border bg-white overflow-hidden shadow-soft hover:shadow-lg transition-all">
                  {a.image_url ? (
                    <img src={a.image_url} alt={a.titre} className="h-40 w-full object-cover" />
                  ) : (
                    <div className="h-40 flex items-center justify-center bg-forest/5"><span className="text-4xl">📝</span></div>
                  )}
                  <div className="p-4">
                    <span className="text-[10px] uppercase tracking-wider text-forest font-medium">{a.categorie}</span>
                    <h3 className="mt-1 font-semibold text-foreground text-sm group-hover:text-forest transition-colors">{a.titre}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="py-8 text-center">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-forest hover:text-forest-light transition-colors">
          <ArrowLeft className="h-4 w-4" /> Retour au blog
        </Link>
      </div>
    </PublicLayout>
  );
}
