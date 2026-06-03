import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";

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
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl font-bold">Paiements</h1>
        <button className="rounded-full border border-border px-4 py-2 text-sm flex items-center gap-2"><Download className="h-4 w-4" /> Export CSV</button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="border-b border-border">
            <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              {["Date","Membre","Plan","Montant","Méthode","Réf","Statut"].map((h) => <th key={h} className="px-4 py-3 font-medium">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {data.map((p, i) => (
              <tr key={i} className="border-b border-border/40">
                <td className="px-4 py-3 text-muted-foreground">{p.date}</td>
                <td className="px-4 py-3 font-medium">{p.membre}</td>
                <td className="px-4 py-3">{p.plan}</td>
                <td className="px-4 py-3 font-semibold">{p.montant.toLocaleString("fr-FR")} F</td>
                <td className="px-4 py-3"><span className="rounded-full bg-secondary px-2 py-0.5 text-[10px]">{p.methode}</span></td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{p.ref}</td>
                <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${p.statut === "confirmé" ? "bg-green/20 text-green" : p.statut === "en_attente" ? "bg-gold/20 text-gold" : "bg-destructive/20 text-destructive"}`}>{p.statut}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
