import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/components/public-layout";
import { Search } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({ meta: [{ title: "Blog · Digital Agency" }] }),
  component: BlogPage,
});

export const articles = [
  { slug: "premier-revenu-ia", cat: "Revenus", titre: "Mon premier revenu avec l'IA en 30 jours", extrait: "L'histoire vraie de Awa qui est passée de 0 à 45 000 FCFA/mois.", auteur: "Équipe LB", date: "2025-05-12", lecture: "5 min", emoji: "💰" },
  { slug: "chatgpt-prompts", cat: "IA", titre: "10 prompts ChatGPT qui changent ta vie", extrait: "Les meilleurs prompts pour gagner du temps chaque jour.", auteur: "Équipe LB", date: "2025-05-10", lecture: "8 min", emoji: "🤖" },
  { slug: "tiktok-viral", cat: "Marketing", titre: "Le système TikTok viral 2025", extrait: "Comment passer de 0 à 10K followers en 60 jours.", auteur: "Équipe LB", date: "2025-05-05", lecture: "6 min", emoji: "📱" },
  { slug: "affiliation-debutant", cat: "Revenus", titre: "Affiliation pour débutants : par où commencer", extrait: "Le guide pas-à-pas pour ta première commission.", auteur: "Équipe LB", date: "2025-04-28", lecture: "7 min", emoji: "🚀" },
  { slug: "canva-pro-tips", cat: "Formations", titre: "5 hacks Canva Pro que personne ne montre", extrait: "Crée des visuels qui convertissent en 5 minutes.", auteur: "Équipe LB", date: "2025-04-20", lecture: "4 min", emoji: "🎨" },
  { slug: "moboney", cat: "Actualités", titre: "MTN MoMo : les nouveautés 2025", extrait: "Plafonds, frais, intégrations… tout ce qui change.", auteur: "Équipe LB", date: "2025-04-15", lecture: "5 min", emoji: "📲" },
  { slug: "midjourney-fr", cat: "IA", titre: "Midjourney en français : guide express", extrait: "Génère tes premières images IA en 10 minutes.", auteur: "Équipe LB", date: "2025-04-10", lecture: "6 min", emoji: "🖼️" },
  { slug: "personal-brand", cat: "Marketing", titre: "Construire ton personal branding en Afrique", extrait: "Méthode + études de cas locales.", auteur: "Équipe LB", date: "2025-04-02", lecture: "9 min", emoji: "⭐" },
  { slug: "automatisation", cat: "Formations", titre: "Automatise ton WhatsApp Business", extrait: "Réponses, catalogues, suivi… gagne 2h/jour.", auteur: "Équipe LB", date: "2025-03-28", lecture: "7 min", emoji: "⚡" },
];

function BlogPage() {
  return (
    <PublicLayout>
      <section className="bg-hero-radial py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h1 className="text-4xl font-bold text-foreground sm:text-5xl">Le blog Digital Agency</h1>
          <p className="mt-3 text-muted-foreground">Stratégies, méthodes, études de cas pour passer à l'action.</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="relative max-w-xs flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input placeholder="Rechercher…" className="w-full rounded-full border border-border bg-white py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-forest/20" />
            </div>
            <div className="flex flex-wrap gap-2">
              {["Tous","IA","Marketing","Revenus","Formations","Actualités"].map((c) => (
                <button key={c} className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground hover:bg-forest/5 hover:text-forest hover:border-forest/30 transition-colors">{c}</button>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <Link key={a.slug} to="/blog/$slug" params={{ slug: a.slug }} className="card-glow rounded-2xl border border-border bg-white overflow-hidden shadow-soft">
                <div className="flex h-36 items-center justify-center bg-forest/5 text-5xl">{a.emoji}</div>
                <div className="p-5">
                  <span className="rounded-full bg-forest/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-forest font-medium">{a.cat}</span>
                  <h3 className="mt-3 font-semibold leading-snug text-foreground">{a.titre}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{a.extrait}</p>
                  <p className="mt-4 text-xs text-muted-foreground">{a.auteur} · {a.date} · {a.lecture}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
