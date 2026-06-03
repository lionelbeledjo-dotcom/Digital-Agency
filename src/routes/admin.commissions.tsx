import { createFileRoute } from "@tanstack/react-router";
import { useAppStore } from "@/store/appStore";
import { Download, Check } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/commissions")({
  component: AdminCommissions,
});

function AdminCommissions() {
  const membres = useAppStore((s) => s.membres).filter((m) => m.commissionsTotal > 500).slice(0, 20);
  const total = membres.reduce((s, m) => s + m.commissionsTotal, 0);

  const kpis = [
    { l: "À verser vendredi", v: "342 500 F" },
    { l: "Versé ce mois", v: "1 285 000 F" },
    { l: "Total all-time", v: "14 820 000 F" },
    { l: "Membres dus", v: `${membres.length}` },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-serif text-3xl font-bold">Commissions</h1>
        <button onClick={() => toast.success("Rapport généré")} className="rounded-full gradient-cobalt px-5 py-2.5 text-sm font-semibold text-white flex items-center gap-2"><Download className="h-4 w-4" /> Générer rapport vendredi</button>
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.l} className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{k.l}</p>
            <p className="mt-1 font-serif text-xl font-bold">{k.v}</p>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="border-b border-border">
            <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              {["Membre","Email","Plan","Filleuls","Due","Méthode","Numéro","Action"].map((h) => <th key={h} className="px-4 py-3 font-medium">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {membres.map((m) => (
              <tr key={m.id} className="border-b border-border/40">
                <td className="px-4 py-3 font-medium">{m.prenom} {m.nom}</td>
                <td className="px-4 py-3 text-muted-foreground">{m.email}</td>
                <td className="px-4 py-3 capitalize">{m.plan.replace("_", " ")}</td>
                <td className="px-4 py-3">{m.filleulsActifs}</td>
                <td className="px-4 py-3 font-semibold">{m.commissionsTotal.toLocaleString("fr-FR")} F</td>
                <td className="px-4 py-3">MTN MoMo</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">+225 07 ** **</td>
                <td className="px-4 py-3">
                  <button onClick={() => toast.success("Versement marqué")} className="rounded-full bg-green/20 px-3 py-1 text-[10px] font-semibold text-green flex items-center gap-1"><Check className="h-3 w-3" /> Marquer versé</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="border-t border-border p-4 text-sm text-muted-foreground">Total à verser : <strong className="text-foreground">{total.toLocaleString("fr-FR")} F</strong></p>
      </div>
    </div>
  );
}
