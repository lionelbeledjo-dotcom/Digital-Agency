import { createFileRoute } from "@tanstack/react-router";
import { Download, CreditCard, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/admin/paiements")({
  component: AdminPaiements,
});

const data = Array.from({ length: 25 }, (_, i) => ({
  date: new Date(Date.now() - i * 86400000).toISOString().slice(0, 10),
  membre: ["Aminata K.","Kofi M.","Moussa D.","Fatou D.","Ibrahim S."][i % 5],
  plan: ["Club IA","Pro Creator","Starter"][i % 3],
  montant: [3500, 8500, 0][i % 3],
  methode: ["MTN MoMo","Orange Money","Wero","PayPal"][i % 4],
  ref: `TXN-${(Math.random() * 100000 | 0).toString().padStart(5, "0")}`,
  statut: ["confirmé","confirmé","en_attente","confirmé","échoué"][i % 5],
}));

function AdminPaiements() {
  const confirmes = data.filter(p => p.statut === "confirmé").length;
  const enAttente = data.filter(p => p.statut === "en_attente").length;
  const echoues = data.filter(p => p.statut === "échoué").length;
  const totalMontant = data.filter(p => p.statut === "confirmé").reduce((s, p) => s + p.montant, 0);

  const kpis = [
    { l: "Revenu confirmé", v: `${totalMontant.toLocaleString("fr-FR")} F`, Icon: TrendingUp, bg: "bg-forest" },
    { l: "Confirmés", v: confirmes, Icon: CheckCircle2, bg: "bg-forest-light" },
    { l: "En attente", v: enAttente, Icon: CreditCard, bg: "bg-amber" },
    { l: "Échoués", v: echoues, Icon: AlertTriangle, bg: "bg-destructive" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>Paiements</h1>
        <button className="rounded-full border border-border px-4 py-2 text-sm flex items-center gap-2 text-foreground hover:bg-secondary transition-colors"><Download className="h-4 w-4" /> Export CSV</button>
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
              {["Date","Membre","Plan","Montant","Méthode","Réf","Statut"].map((h) => <th key={h} className="px-4 py-3 font-medium">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {data.map((p, i) => (
              <tr key={i} className="border-b border-border/40 hover:bg-secondary/30 transition-colors">
                <td className="px-4 py-3 text-muted-foreground">{p.date}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-forest text-[9px] font-bold text-white">{p.membre.split(" ").map(w => w[0]).join("")}</div>
                    <span className="font-semibold text-foreground">{p.membre}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase ${
                    p.plan === "Pro Creator" ? "bg-amber/15 text-amber" :
                    p.plan === "Club IA" ? "bg-forest/10 text-forest" :
                    "bg-secondary text-muted-foreground"
                  }`}>{p.plan}</span>
                </td>
                <td className="px-4 py-3 font-semibold text-foreground">{p.montant.toLocaleString("fr-FR")} F</td>
                <td className="px-4 py-3"><span className="rounded-full bg-amber/10 px-2.5 py-1 text-[10px] font-medium text-amber">{p.methode}</span></td>
                <td className="px-4 py-3 text-xs text-muted-foreground font-mono">{p.ref}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase ${
                    p.statut === "confirmé" ? "bg-forest/10 text-forest" :
                    p.statut === "en_attente" ? "bg-amber/15 text-amber" :
                    "bg-destructive/10 text-destructive"
                  }`}>{p.statut}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
