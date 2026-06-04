import { createFileRoute } from "@tanstack/react-router";
import { useAppStore } from "@/store/appStore";
import { Award, Lock, Download } from "lucide-react";

export const Route = createFileRoute("/dashboard/certificats")({
  component: CertificatsPage,
});

function CertificatsPage() {
  const user = useAppStore((s) => s.currentUser);
  const formations = useAppStore((s) => s.formations);
  if (!user) return null;

  const complets = formations.filter((f) => user.formationsCompletes.includes(f.id));
  const verrous = formations.filter((f) => !user.formationsCompletes.includes(f.id)).slice(0, 6);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold">Mes certificats</h1>
        <p className="text-sm text-muted-foreground">Décroche tes diplômes officiels Digital Agency.</p>
      </div>

      {complets.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-sky">Obtenus</h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {complets.map((f) => (
              <div key={f.id} className="card-glow rounded-2xl border border-gold/40 bg-gradient-to-br from-gold/10 to-cobalt/5 p-5">
                <Award className="h-8 w-8 text-gold" />
                <p className="mt-3 font-semibold">{f.titre}</p>
                <p className="text-xs text-muted-foreground">Obtenu le 12 mai 2025</p>
                <button className="mt-4 inline-flex items-center gap-2 rounded-full gradient-cobalt px-4 py-2 text-xs font-semibold text-white"><Download className="h-3 w-3" /> Télécharger PDF</button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Verrouillés</h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {verrous.map((f) => (
            <div key={f.id} className="rounded-2xl border border-border bg-card p-5 opacity-70">
              <Lock className="h-7 w-7 text-muted-foreground" />
              <p className="mt-3 font-semibold">{f.titre}</p>
              <p className="text-xs text-muted-foreground">Termine la formation à 100% pour débloquer</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
