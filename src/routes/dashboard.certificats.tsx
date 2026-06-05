import { createFileRoute } from "@tanstack/react-router";
import { useAppStore } from "@/store/appStore";
import { Award, Lock, Download, CheckCircle2 } from "lucide-react";
import { downloadCertificate } from "@/lib/certificate";

export const Route = createFileRoute("/dashboard/certificats")({
  component: CertificatsPage,
});

function CertificatsPage() {
  const user = useAppStore((s) => s.currentUser);
  const formations = useAppStore((s) => s.formations);
  if (!user) return null;

  const complets = formations.filter((f) => user.formationsCompletes.includes(f.id));
  const verrous = formations.filter((f) => !user.formationsCompletes.includes(f.id)).slice(0, 6);

  function handleDownload(formation: { titre: string }) {
    downloadCertificate({
      prenom: user!.prenom,
      nom: user!.nom,
      formation: formation.titre,
      date: new Date().toLocaleDateString("fr-FR"),
      certificateId: `DA-${Math.random().toString(36).slice(2, 10).toUpperCase()}`,
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>Mes certificats</h1>
        <p className="text-sm text-muted-foreground">Décroche tes diplômes officiels Digital Agency.</p>
      </div>

      {complets.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-forest">Obtenus ({complets.length})</h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {complets.map((f) => (
              <div key={f.id} className="card-glow rounded-2xl border border-amber/30 bg-amber/5 p-5 shadow-soft">
                <div className="flex items-center gap-3">
                  <Award className="h-8 w-8 text-amber" />
                  <CheckCircle2 className="h-4 w-4 text-forest" />
                </div>
                <p className="mt-3 font-semibold text-foreground">{f.titre}</p>
                <p className="text-xs text-muted-foreground">Obtenu le {new Date().toLocaleDateString("fr-FR")}</p>
                <button
                  onClick={() => handleDownload(f)}
                  className="mt-4 inline-flex items-center gap-2 rounded-full gradient-primary px-4 py-2 text-xs font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]"
                >
                  <Download className="h-3 w-3" /> Télécharger
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {complets.length === 0 && (
        <div className="rounded-2xl border border-border bg-white p-8 text-center shadow-soft">
          <Award className="h-12 w-12 text-muted-foreground mx-auto" />
          <p className="mt-3 font-semibold text-foreground">Aucun certificat pour le moment</p>
          <p className="mt-1 text-sm text-muted-foreground">Termine une formation à 100% pour obtenir ton premier certificat.</p>
        </div>
      )}

      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">À débloquer ({verrous.length})</h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {verrous.map((f) => (
            <div key={f.id} className="rounded-2xl border border-border bg-white p-5 shadow-soft opacity-60">
              <Lock className="h-7 w-7 text-muted-foreground" />
              <p className="mt-3 font-semibold text-foreground">{f.titre}</p>
              <p className="text-xs text-muted-foreground">Termine la formation à 100% pour débloquer</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
