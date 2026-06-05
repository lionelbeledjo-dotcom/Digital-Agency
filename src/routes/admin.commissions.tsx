import { createFileRoute } from "@tanstack/react-router";
import { useAppStore } from "@/store/appStore";
import { Download, Check, Wallet, TrendingUp, Calendar, Users } from "lucide-react";
import { toast } from "sonner";
import { useMemo } from "react";

export const Route = createFileRoute("/admin/commissions")({
  component: AdminCommissions,
});

function AdminCommissions() {
  const allMembres = useAppStore((s) => s.membres);
  const membres = useMemo(() => allMembres.filter((m) => m.commissionsTotal > 500).slice(0, 20), [allMembres]);
  const total = membres.reduce((s, m) => s + m.commissionsTotal, 0);

  const kpis = [
    { l: "À verser vendredi", v: "342 500 F", Icon: Calendar, bg: "bg-forest" },
    { l: "Versé ce mois", v: "1 285 000 F", Icon: Wallet, bg: "bg-forest-light" },
    { l: "Total all-time", v: "14 820 000 F", Icon: TrendingUp, bg: "bg-amber" },
    { l: "Membres dus", v: `${membres.length}`, Icon: Users, bg: "bg-olive" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>Commissions</h1>
        <button onClick={() => toast.success("Rapport généré")} className="rounded-full gradient-primary px-5 py-2.5 text-sm font-semibold text-white flex items-center gap-2 shadow-glow transition-transform hover:scale-[1.02]"><Download className="h-4 w-4" /> Générer rapport vendredi</button>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.l} className={`rounded-2xl ${k.bg} p-5 shadow-soft`}>
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-wider text-white/70">{k.l}</p>
              <k.Icon className="h-5 w-5 text-white/70" />
            </div>
            <p className="mt-2 text-3xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>{k.v}</p>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-white shadow-soft">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-secondary/50">
            <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              {["Membre","Email","Plan","Filleuls","Due","Méthode","Numéro","Action"].map((h) => <th key={h} className="px-4 py-3 font-medium">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {membres.map((m) => (
              <tr key={m.id} className="border-b border-border/40 hover:bg-secondary/30 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-forest text-[10px] font-bold text-white">{m.prenom[0]}{m.nom[0]}</div>
                    <span className="font-semibold text-foreground">{m.prenom} {m.nom}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{m.email}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase ${
                    m.plan === "pro_creator" ? "bg-amber/15 text-amber" :
                    m.plan === "club_ia" ? "bg-forest/10 text-forest" :
                    "bg-secondary text-muted-foreground"
                  }`}>{m.plan.replace("_", " ")}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-forest/10 text-xs font-semibold text-forest">{m.filleulsActifs}</span>
                </td>
                <td className="px-4 py-3 font-semibold text-foreground">{m.commissionsTotal.toLocaleString("fr-FR")} F</td>
                <td className="px-4 py-3"><span className="rounded-full bg-amber/10 px-2.5 py-1 text-[10px] font-medium text-amber">MTN MoMo</span></td>
                <td className="px-4 py-3 text-xs text-muted-foreground">+225 07 ** **</td>
                <td className="px-4 py-3">
                  <button onClick={() => toast.success("Versement marqué")} className="rounded-full bg-forest/10 px-3 py-1.5 text-[10px] font-semibold text-forest flex items-center gap-1 hover:bg-forest/20 transition-colors"><Check className="h-3 w-3" /> Marquer versé</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="border-t border-border p-4 text-sm text-muted-foreground">Total à verser : <strong className="text-forest">{total.toLocaleString("fr-FR")} F</strong></p>
      </div>
    </div>
  );
}
