import { createFileRoute } from "@tanstack/react-router";
import { CreditCard, Edit3 } from "lucide-react";

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
        <h1 className="font-serif text-3xl font-bold">Paiements</h1>
        <p className="text-sm text-muted-foreground">Tes versements reçus et ta méthode de paiement.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Méthode actuelle</p>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/15 text-gold"><CreditCard className="h-6 w-6" /></div>
            <div className="flex-1">
              <p className="font-semibold">MTN Mobile Money</p>
              <p className="text-xs text-muted-foreground">+225 07 00 00 00 (Côte d'Ivoire)</p>
            </div>
            <button className="rounded-full border border-border px-3 py-1.5 text-xs flex items-center gap-1"><Edit3 className="h-3 w-3" /> Modifier</button>
          </div>
        </div>

        <div className="rounded-2xl border border-cobalt/40 bg-gradient-to-br from-cobalt/15 to-teal/5 p-5">
          <p className="text-xs uppercase tracking-wider text-sky">Prochaine échéance abonnement</p>
          <p className="mt-1 font-serif text-2xl font-bold">3 juillet 2025</p>
          <p className="mt-2 text-sm text-muted-foreground">Club IA · 3 500 FCFA</p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="border-b border-border">
            <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              {["Date","Montant","Méthode","Référence","Statut"].map((h) => <th key={h} className="px-4 py-3 font-medium">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {versements.map((v) => (
              <tr key={v.ref} className="border-b border-border/40">
                <td className="px-4 py-3 text-muted-foreground">{v.date}</td>
                <td className="px-4 py-3 font-semibold">{v.montant.toLocaleString("fr-FR")} F</td>
                <td className="px-4 py-3">{v.methode}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{v.ref}</td>
                <td className="px-4 py-3"><span className="rounded-full bg-green/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase text-green">{v.statut}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
