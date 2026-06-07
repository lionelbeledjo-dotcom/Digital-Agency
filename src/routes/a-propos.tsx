import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/components/public-layout";
import { ArrowRight, Target, Heart, Globe, Zap, Linkedin, Twitter } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/a-propos")({
  head: () => ({ meta: [{ title: "À propos · Digital Agency" }] }),
  component: AProposPage,
});

const values = [
  { Icon: Target, title: "Mission", desc: "Donner à chaque francophone les outils IA pour générer un revenu en ligne, depuis un simple téléphone." },
  { Icon: Heart, title: "Accessibilité", desc: "0 FCFA pour commencer. Formations en français, optimisées pour la 3G. Pas besoin d'être expert." },
  { Icon: Globe, title: "Pan-africain", desc: "12 pays couverts, paiements locaux (MTN MoMo, Orange Money), contenu adapté au contexte africain." },
  { Icon: Zap, title: "Résultats", desc: "Commissions versées chaque vendredi. Pas de promesses vides — des virements réels sur ton mobile." },
];

const milestones = [
  { year: "2024", event: "Idée & recherche" },
  { year: "2025 T1", event: "Lancement bêta — 3 formations, 50 testeurs" },
  { year: "2025 T2", event: "Ouverture publique — 15 formations, 12 pays" },
  { year: "2025 T3", event: "1 000 membres actifs, +5M FCFA reversés" },
  { year: "2026", event: "App mobile, certifications officielles, 50+ formations" },
];

interface Fondateur {
  nom: string;
  role: string;
  bio: string;
  photo_url: string;
  linkedin: string;
  twitter: string;
}

interface Stats {
  formations: string;
  pays: string;
  apprenants: string;
  reverses: string;
}

function AProposPage() {
  const [fondateur, setFondateur] = useState<Fondateur>({
    nom: "Lionel & Ines", role: "Co-fondateurs",
    bio: "Passionnes de marketing digital et d'intelligence artificielle, nous avons cree Digital Agency avec une mission simple : donner a chaque francophone les outils pour generer un revenu en ligne. Apres plusieurs annees dans le digital, nous avons decide de mettre notre expertise au service de l'Afrique francophone.",
    photo_url: "", linkedin: "", twitter: "",
  });
  const [stats, setStats] = useState<Stats>({ formations: "15+", pays: "12", apprenants: "10K+", reverses: "5M+ FCFA" });

  useEffect(() => {
    supabase.from("site_content").select("key, value").in("key", ["fondateur", "statistiques"]).then(({ data }) => {
      if (data) {
        data.forEach((row) => {
          if (row.key === "fondateur") setFondateur(row.value as Fondateur);
          if (row.key === "statistiques") setStats(row.value as Stats);
        });
      }
    });
  }, []);

  return (
    <PublicLayout>
      <section className="bg-hero-radial py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-amber">À propos</p>
          <h1 className="mt-3 text-4xl font-bold text-foreground sm:text-6xl" style={{ fontFamily: "var(--font-heading)" }}>
            On croit que l'<span className="text-accent-serif">IA</span> peut changer des vies en Afrique.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Digital Agency est née d'une conviction : chaque francophone mérite d'accéder aux outils qui transforment le monde — et d'en tirer un revenu concret.
          </p>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl border border-border bg-white p-6 shadow-soft">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest/10">
                  <v.Icon className="h-5 w-5 text-forest" />
                </div>
                <h3 className="mt-4 font-semibold text-foreground">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fondateur */}
      <section className="py-20 bg-secondary">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-amber">Les fondateurs</p>
            <h2 className="mt-2 text-3xl font-bold text-foreground">Les visages derriere Digital Agency</h2>
          </div>

          <div className="mt-12 grid items-center gap-10 md:grid-cols-2">
            <div className="flex justify-center">
              {fondateur.photo_url ? (
                <img src={fondateur.photo_url} alt={fondateur.nom} className="h-72 w-72 rounded-3xl object-cover shadow-xl border-4 border-white" />
              ) : (
                <div className="flex h-72 w-72 items-center justify-center rounded-3xl bg-forest text-6xl font-bold text-white shadow-xl">
                  {fondateur.nom.split(" ").map(w => w[0]).join("")}
                </div>
              )}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">{fondateur.nom}</h3>
              <p className="mt-1 text-sm font-semibold text-forest">{fondateur.role}</p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">{fondateur.bio}</p>
              <div className="mt-6 flex items-center gap-3">
                {fondateur.linkedin && (
                  <a href={fondateur.linkedin} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-forest/10 text-forest hover:bg-forest hover:text-white transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}
                {fondateur.twitter && (
                  <a href={fondateur.twitter} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-forest/10 text-forest hover:bg-forest hover:text-white transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chiffres */}
      <section className="bg-forest py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 text-center">
            {[
              { v: stats.formations, l: "Formations" },
              { v: stats.pays, l: "Pays couverts" },
              { v: stats.apprenants, l: "Apprenants" },
              { v: stats.reverses, l: "FCFA reversés" },
            ].map((s) => (
              <div key={s.l}>
                <p className="text-4xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>{s.v}</p>
                <p className="mt-1 text-sm text-white/60">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-amber">Notre parcours</p>
            <h2 className="mt-2 text-3xl font-bold text-foreground">De l'idée à l'impact</h2>
          </div>
          <div className="mt-12 space-y-4">
            {milestones.map((m, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-forest text-xs font-bold text-white">{i + 1}</div>
                  {i < milestones.length - 1 && <div className="w-0.5 flex-1 bg-forest/20 mt-1" />}
                </div>
                <div className="pb-6">
                  <p className="text-xs font-semibold text-forest">{m.year}</p>
                  <p className="mt-1 text-sm text-foreground">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold text-foreground">Prêt à rejoindre l'aventure ?</h2>
          <p className="mt-3 text-muted-foreground">Commence gratuitement. Apprends. Partage. Gagne.</p>
          <Link to="/auth/register" className="mt-6 inline-flex items-center gap-2 rounded-full gradient-primary px-7 py-4 font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]">
            Rejoindre Digital Agency <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
