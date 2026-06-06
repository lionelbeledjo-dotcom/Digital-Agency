import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/components/public-layout";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Search, Clock, User, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({ meta: [{ title: "Blog · Digital Agency" }, { name: "description", content: "Articles sur l'IA, le marketing digital et les revenus en ligne pour l'Afrique francophone." }] }),
  component: BlogPage,
});

interface Article {
  id: string;
  slug: string;
  titre: string;
  extrait: string;
  categorie: string;
  image_url: string;
  auteur: string;
  lecture: string;
  tags: string[];
  created_at: string;
}

const CATEGORIES = ["Tout", "IA", "Marketing", "Revenus", "Formations", "Tutoriel", "Tendances"];

function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("Tout");

  useEffect(() => {
    supabase.from("blog_articles").select("id,slug,titre,extrait,categorie,image_url,auteur,lecture,tags,created_at").eq("is_published", true).order("created_at", { ascending: false }).then(({ data }) => {
      setArticles(data || []);
      setLoading(false);
    });
  }, []);

  const filtered = articles.filter(a => {
    if (activeCat !== "Tout" && a.categorie !== activeCat) return false;
    if (search && !a.titre.toLowerCase().includes(search.toLowerCase()) && !(a.tags || []).some(t => t.toLowerCase().includes(search.toLowerCase()))) return false;
    return true;
  });

  return (
    <PublicLayout>
      <section className="bg-hero-radial py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-amber">Blog</p>
          <h1 className="mt-3 text-4xl font-bold text-foreground sm:text-5xl" style={{ fontFamily: "var(--font-heading)" }}>
            Apprends, applique, gagne
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">Conseils pratiques sur l'IA, le marketing digital et les revenus en ligne.</p>

          <div className="mt-8 relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher un article..." className="w-full rounded-full border border-border bg-white pl-11 pr-5 py-3 text-sm focus:border-forest focus:outline-none shadow-soft" />
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveCat(cat)} className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${activeCat === cat ? "bg-forest text-white" : "border border-border bg-white text-foreground hover:border-forest/30"}`}>
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <p className="text-center text-muted-foreground py-12">Chargement...</p>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">Aucun article pour le moment. Reviens bientot !</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map(a => (
                <Link key={a.id} to="/blog/$slug" params={{ slug: a.slug }} className="group rounded-2xl border border-border bg-white overflow-hidden shadow-soft hover:shadow-lg transition-all">
                  {a.image_url ? (
                    <div className="h-48 overflow-hidden">
                      <img src={a.image_url} alt={a.titre} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    </div>
                  ) : (
                    <div className="h-48 flex items-center justify-center bg-forest/5">
                      <span className="text-5xl">📝</span>
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider">
                      <span className="rounded-full bg-forest/10 px-2.5 py-0.5 font-medium text-forest">{a.categorie}</span>
                      <span className="text-muted-foreground">{new Date(a.created_at).toLocaleDateString("fr-FR")}</span>
                    </div>
                    <h3 className="mt-3 font-semibold text-foreground leading-snug group-hover:text-forest transition-colors">{a.titre}</h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{a.extrait}</p>
                    <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><User className="h-3 w-3" /> {a.auteur}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {a.lecture}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-forest py-16">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold text-white">Recois nos meilleurs conseils</h2>
          <p className="mt-3 text-white/70">Un email par semaine avec les strategies IA qui marchent en Afrique.</p>
          <NewsletterForm />
        </div>
      </section>
    </PublicLayout>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    await supabase.from("email_leads").insert({ email, source: "blog_cta" });
    setDone(true);
  }

  if (done) return <p className="mt-6 text-green-300 font-semibold">Merci ! Tu recevras nos prochains articles.</p>;

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Ton email..." required className="flex-1 rounded-full px-5 py-3 text-sm text-foreground focus:outline-none" />
      <button type="submit" className="rounded-full gradient-amber px-6 py-3 text-sm font-semibold text-forest hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
        S'abonner <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}
