import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { PublicLayout } from "@/components/public-layout";
import { articles } from "./blog";
import { ChevronRight, Facebook, MessageCircle, Send } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  component: BlogArticle,
});

function BlogArticle() {
  const { slug } = useParams({ from: "/blog/$slug" });
  const article = articles.find((a) => a.slug === slug);
  const others = articles.filter((a) => a.slug !== slug).slice(0, 3);

  if (!article) return <PublicLayout><div className="px-4 py-32 text-center"><h1 className="text-2xl font-bold text-foreground">Article introuvable</h1></div></PublicLayout>;

  return (
    <PublicLayout>
      <article className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <nav className="mb-6 flex items-center gap-1 text-xs text-muted-foreground">
            <Link to="/blog" className="hover:text-forest">Blog</Link><ChevronRight className="h-3 w-3" /><span className="text-foreground">{article.titre}</span>
          </nav>
          <span className="rounded-full bg-forest/10 px-3 py-1 text-xs font-semibold text-forest">{article.cat}</span>
          <h1 className="mt-4 text-3xl font-bold text-foreground sm:text-5xl">{article.titre}</h1>
          <p className="mt-3 text-sm text-muted-foreground">{article.auteur} · {article.date} · {article.lecture}</p>
          <div className="mt-8 flex h-64 items-center justify-center rounded-3xl bg-forest/5 text-8xl">{article.emoji}</div>

          <div className="mt-10 space-y-5 text-base leading-relaxed text-foreground/90">
            <p className="text-xl text-muted-foreground">{article.extrait}</p>
            <p>Aujourd'hui, l'écosystème digital africain explose. Entre l'IA, le mobile money et l'affiliation, il existe enfin de vraies opportunités accessibles depuis ton téléphone.</p>
            <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-serif)" }}>Pourquoi c'est le bon moment</h2>
            <p>La majorité des francophones d'Afrique ont aujourd'hui un smartphone et un compte mobile money. La barrière à l'entrée n'a jamais été aussi basse.</p>
            <p>Avec un peu de méthode, une formation solide et la bonne plateforme, il est possible de générer un revenu complémentaire dès le premier mois.</p>
            <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-serif)" }}>Les 3 piliers à maîtriser</h2>
            <p>1. La compréhension des outils IA. 2. La capacité à créer du contenu engageant. 3. La discipline du partage quotidien.</p>
            <p>Chez LB Digital, on te donne les trois sous forme de vidéos courtes, en français, avec une communauté active pour t'accompagner.</p>
          </div>

          <div className="mt-12 flex items-center gap-3 border-t border-border pt-6">
            <p className="text-sm text-muted-foreground">Partager :</p>
            <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-forest hover:border-forest/30 transition-colors"><Facebook className="h-4 w-4" /></a>
            <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-forest hover:border-forest/30 transition-colors"><MessageCircle className="h-4 w-4" /></a>
            <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-forest hover:border-forest/30 transition-colors"><Send className="h-4 w-4" /></a>
          </div>

          <div className="mt-14">
            <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-serif)" }}>À lire aussi</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {others.map((a) => (
                <Link key={a.slug} to="/blog/$slug" params={{ slug: a.slug }} className="card-glow rounded-2xl border border-border bg-white overflow-hidden shadow-soft">
                  <div className="flex h-24 items-center justify-center bg-forest/5 text-3xl">{a.emoji}</div>
                  <div className="p-4"><p className="text-sm font-semibold leading-snug text-foreground line-clamp-2">{a.titre}</p></div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </article>
    </PublicLayout>
  );
}
