import { createFileRoute, Link } from "@tanstack/react-router";
import { useAppStore } from "@/store/appStore";
import { Lock, Play, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/dashboard/formations")({
  component: DashboardFormations,
});

type Tab = "en_cours" | "completes" | "toutes" | "verrouillees";

function DashboardFormations() {
  const formations = useAppStore((s) => s.formations);
  const user = useAppStore((s) => s.currentUser);
  const [tab, setTab] = useState<Tab>("en_cours");
  if (!user) return null;

  const planRank = { starter: 0, club_ia: 1, pro_creator: 2 };
  const myRank = planRank[user.plan];
  const enCoursIds = user.formationsEnCours.map((f) => f.id);

  const filtered = formations.filter((f) => {
    const locked = planRank[f.acces] > myRank;
    if (tab === "en_cours") return enCoursIds.includes(f.id);
    if (tab === "completes") return user.formationsCompletes.includes(f.id);
    if (tab === "verrouillees") return locked;
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold">Mes formations</h1>
        <p className="text-sm text-muted-foreground">Apprends à ton rythme. Décroche tes certificats.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {([
          ["en_cours","En cours"],["completes","Complétées"],["toutes","Toutes disponibles"],["verrouillees","Verrouillées"]
        ] as [Tab,string][]).map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} className={`rounded-full border px-4 py-2 text-xs font-medium ${tab === k ? "border-cobalt bg-cobalt/20" : "border-border text-muted-foreground"}`}>{l}</button>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((f) => {
          const locked = planRank[f.acces] > myRank;
          const enCours = user.formationsEnCours.find((x) => x.id === f.id);
          const complet = user.formationsCompletes.includes(f.id);
          return (
            <div key={f.id} className="card-glow rounded-2xl border border-border bg-card overflow-hidden">
              <div className={`relative flex h-28 items-center justify-center bg-gradient-to-br ${f.couleur} text-5xl`}>
                {f.emoji}
                {locked && <div className="absolute inset-0 flex items-center justify-center bg-navy/70 backdrop-blur-sm"><Lock className="h-6 w-6 text-white" /></div>}
              </div>
              <div className="p-5">
                <p className="font-semibold leading-snug">{f.titre}</p>
                {enCours && (
                  <div className="mt-3">
                    <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                      <div className="h-full gradient-cobalt" style={{ width: `${enCours.progression}%` }} />
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{enCours.progression}% terminé</p>
                  </div>
                )}
                {complet && <p className="mt-3 inline-flex items-center gap-1 text-xs text-green"><CheckCircle2 className="h-3 w-3" /> Complétée</p>}
                {locked ? (
                  <Link to="/paiement" hash={f.acces === "club_ia" ? "club" : "pro"} className="mt-4 block rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-center text-xs font-semibold text-gold">
                    Passer à {f.acces === "club_ia" ? "Club IA" : "Pro Creator"}
                  </Link>
                ) : (
                  <Link to="/dashboard/formation/$id" params={{ id: f.id }} className="mt-4 flex items-center justify-center gap-2 rounded-full gradient-cobalt px-4 py-2 text-xs font-semibold text-white">
                    <Play className="h-3 w-3" /> {enCours ? "Continuer" : "Démarrer"}
                  </Link>
                )}
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && <p className="text-sm text-muted-foreground">Aucune formation dans cette catégorie.</p>}
      </div>
    </div>
  );
}
