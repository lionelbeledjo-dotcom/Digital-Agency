import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/components/public-layout";
import { useAppStore, type Plan } from "@/store/appStore";
import { Search, Star } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/formations")({
  head: () => ({ meta: [{ title: "Formations · LB Digital" }] }),
  component: FormationsPage,
});

const categories = ["Tous","IA","Design","Vidéo","Marketing","Réseaux","Business","Affiliation","Automatisation"];
const niveaux = ["Tous","Débutant","Intermédiaire","Avancé"] as const;
const acces: { label: string; value: "all" | Plan }[] = [
  { label: "Tous", value: "all" },
  { label: "Gratuit", value: "starter" },
  { label: "Club IA", value: "club_ia" },
  { label: "Pro", value: "pro_creator" },
];

function FormationsPage() {
  const formations = useAppStore((s) => s.formations);
  const [cat, setCat] = useState("Tous");
  const [niv, setNiv] = useState<typeof niveaux[number]>("Tous");
  const [acc, setAcc] = useState<"all" | Plan>("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => formations.filter((f) =>
    (cat === "Tous" || f.categorie === cat) &&
    (niv === "Tous" || f.niveau === niv) &&
    (acc === "all" || f.acces === acc) &&
    (q === "" || f.titre.toLowerCase().includes(q.toLowerCase()))
  ), [formations, cat, niv, acc, q]);

  return (
    <PublicLayout>
      <section className="bg-hero-radial py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-sm uppercase tracking-wider text-sky">Catalogue</p>
          <h1 className="mt-2 text-4xl font-bold sm:text-5xl">15 formations pour passer à l'action</h1>
          <p className="mt-3 text-muted-foreground">IA, design, vidéo, marketing, business — choisis ton chemin.</p>
        </div>
      </section>

      {/* Filtres sticky */}
      <div className="sticky top-16 z-30 border-y border-border bg-navy/80 py-4 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl space-y-3 px-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((c) => (
              <button key={c} onClick={() => setCat(c)} className={`rounded-full border px-3 py-1.5 text-xs font-medium ${cat === c ? "border-cobalt bg-cobalt/20 text-foreground" : "border-border text-muted-foreground"}`}>{c}</button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-wrap gap-1">
              <span className="text-xs text-muted-foreground self-center mr-1">Niveau:</span>
              {niveaux.map((n) => (
                <button key={n} onClick={() => setNiv(n)} className={`rounded-full px-2.5 py-1 text-[11px] ${niv === n ? "bg-teal/20 text-teal" : "text-muted-foreground"}`}>{n}</button>
              ))}
            </div>
            <div className="flex flex-wrap gap-1">
              <span className="text-xs text-muted-foreground self-center mr-1">Accès:</span>
              {acces.map((a) => (
                <button key={a.label} onClick={() => setAcc(a.value)} className={`rounded-full px-2.5 py-1 text-[11px] ${acc === a.value ? "bg-gold/20 text-gold" : "text-muted-foreground"}`}>{a.label}</button>
              ))}
            </div>
            <div className="relative ml-auto">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher…" className="w-full rounded-full border border-border bg-secondary py-2 pl-9 pr-4 text-sm sm:w-64" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">{filtered.length} formation{filtered.length > 1 ? "s" : ""} trouvée{filtered.length > 1 ? "s" : ""}</p>
        </div>
      </div>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((f) => (
              <Link key={f.id} to="/formations/$id" params={{ id: f.id }} className="card-glow group rounded-2xl border border-border bg-card overflow-hidden">
                <div className={`flex h-36 items-center justify-center bg-gradient-to-br ${f.couleur} text-6xl`}>{f.emoji}</div>
                <div className="p-5">
                  <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-wider">
                    <span className="rounded-full bg-cobalt/15 px-2 py-0.5 text-cobalt">{f.categorie}</span>
                    <span className="rounded-full bg-teal/15 px-2 py-0.5 text-teal">{f.niveau}</span>
                    <span className="rounded-full bg-gold/15 px-2 py-0.5 text-gold">{f.acces === "starter" ? "Gratuit" : f.acces === "club_ia" ? "Club IA" : "Pro"}</span>
                  </div>
                  <h3 className="mt-3 font-semibold leading-snug">{f.titre}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{f.description}</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{f.modules} modules · {f.duree}</span>
                    <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-gold text-gold" /> {f.note} · {f.inscrits.toLocaleString("fr-FR")}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
