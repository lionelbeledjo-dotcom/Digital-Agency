import { createFileRoute } from "@tanstack/react-router";
import { CreditCard, Edit3, Calendar, Wallet } from "lucide-react";

export const Route = createFileRoute("/dashboard/paiements")({
  component: PaiementsPage,
});

const versements = [
  { date: "2025-05-30", montant: 8750, methode: "MTN MoMo", ref: "TXN-A8F92", statut: "versé" },
  { date: "2025-05-23", montant: 9100, methode: "MTN MoMo", ref: "TXN-A8E11", statut: "versé" },
  { date: "2025-05-16", montant: 7400, methode: "MTN MoMo", ref: "TXN-A8D04", statut: "versé" },
  { date: "2025-05-09", montant: 5800, methode: "MTN MoMo", ref: "TXN-A8C77", statut: "versé" },
  { date: "2025-05-02", montant: 3200, methode: "MTN MoMo", ref: "TXN-A8B43", statut: "versé" },
];

function PaiementsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>Paiements</h1>
        <p className="text-sm text-muted-foreground">Tes versements reçus et ta méthode de paiement.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-white p-5 shadow-soft">
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Méthode actuelle</p>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber/10"><CreditCard className="h-6 w-6 text-amber" /></div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">MTN Mobile Money</p>
              <p className="text-xs text-muted-foreground">+225 07 00 00 00 (Côte d'Ivoire)</p>
            </div>
            <button className="rounded-full border border-border px-3 py-1.5 text-xs flex items-center gap-1 text-foreground hover:bg-secondary transition-colors"><Edit3 className="h-3 w-3" /> Modifier</button>
          </div>
        </div>

        <div className="rounded-2xl border border-forest/20 bg-forest/5 p-5">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-forest" />
            <p className="text-xs uppercase tracking-wider text-forest font-semibold">Prochaine échéance</p>
          </div>
          <p className="mt-2 text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>3 juillet 2025</p>
          <p className="mt-1 text-sm text-muted-foreground">Club IA · 3 500 FCFA</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { l: "Total reçu", v: "34 250 F", Icon: Wallet, bg: "bg-forest" },
          { l: "Ce mois", v: "8 750 F", Icon: CreditCard, bg: "bg-forest-light" },
          { l: "Versements", v: "5", Icon: Calendar, bg: "bg-amber" },
        ].map((k) => (
          <div key={k.l} className={`rounded-2xl ${k.bg} p-4`}>
            <div className="flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-wider text-white/70">{k.l}</p>
              <k.Icon className="h-4 w-4 text-white/70" />
            </div>
            <p className="mt-1 text-2xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>{k.v}</p>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-white shadow-soft">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-secondary/50">
            <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              {["Date","Montant","Méthode","Référence","Statut"].map((h) => <th key={h} className="px-4 py-3 font-medium">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {versements.map((v) => (
              <tr key={v.ref} className="border-b border-border/40 hover:bg-secondary/30 transition-colors">
                <td className="px-4 py-3 text-muted-foreground">{v.date}</td>
                <td className="px-4 py-3 font-semibold text-foreground">{v.montant.toLocaleString("fr-FR")} F</td>
                <td className="px-4 py-3"><span className="rounded-full bg-amber/10 px-2.5 py-1 text-[10px] font-medium text-amber">{v.methode}</span></td>
                <td className="px-4 py-3 text-xs text-muted-foreground font-mono">{v.ref}</td>
                <td className="px-4 py-3"><span className="rounded-full bg-forest/10 px-2.5 py-1 text-[10px] font-semibold uppercase text-forest">{v.statut}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
