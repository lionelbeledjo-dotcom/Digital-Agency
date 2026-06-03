import { createFileRoute } from "@tanstack/react-router";
import { useAppStore } from "@/store/appStore";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Download } from "lucide-react";

export const Route = createFileRoute("/dashboard/commissions")({
  component: CommissionsPage,
});

const lineData = Array.from({ length: 12 }, (_, i) => ({
  mois: `M${i + 1}`,
  v: Math.round(2000 + i * 800 + Math.random() * 1500),
}));

function CommissionsPage() {
  const commissions = useAppStore((s) => s.commissions);
  const enAttente = commissions.filter((c) => c.statut === "en_attente").reduce((s, c) => s + c.montant, 0);
  const verse = commissions.filter((c) => c.statut === "verse").reduce((s, c) => s + c.montant, 0);
  const ceMois = 10500;

  const kpis = [
    { l: "Ce mois", v: `${ceMois.toLocaleString("fr-FR")} F` },
    { l: "En attente", v: `${enAttente.toLocaleString("fr-FR")} F` },
    { l: "Total versé", v: `${verse.toLocaleString("fr-FR")} F` },
    { l: "Prochain vendredi", v: "Vendredi 6/06" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold">Commissions</h1>
          <p className="text-sm text-muted-foreground">L'historique complet de tes gains.</p>
        </div>
        <button className="rounded-full border border-border px-4 py-2 text-sm flex items-center gap-2"><Download className="h-4 w-4" /> Export CSV</button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.l} className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{k.l}</p>
            <p className="mt-1 font-serif text-2xl font-bold">{k.v}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="font-semibold">Évolution sur 12 mois</h3>
        <div className="mt-4 h-64">
          <ResponsiveContainer>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="mois" stroke="#888" fontSize={11} />
              <YAxis stroke="#888" fontSize={11} />
              <Tooltip contentStyle={{ background: "#0F1E38", border: "1px solid #1A56DB", borderRadius: 8 }} />
              <Line type="monotone" dataKey="v" stroke="#0EA5E9" strokeWidth={3} dot={{ fill: "#3B82F6" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="border-b border-border">
            <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              {["Date","Filleul","Plan","Commission","Statut"].map((h) => <th key={h} className="px-4 py-3 font-medium">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {commissions.map((c) => (
              <tr key={c.id} className="border-b border-border/40">
                <td className="px-4 py-3 text-muted-foreground">{c.date}</td>
                <td className="px-4 py-3">{c.filleulEmail}</td>
                <td className="px-4 py-3 capitalize">{c.plan.replace("_", " ")}</td>
                <td className="px-4 py-3 font-semibold">{c.montant.toLocaleString("fr-FR")} F</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase ${c.statut === "verse" ? "bg-green/20 text-green" : c.statut === "en_attente" ? "bg-gold/20 text-gold" : "bg-destructive/20 text-destructive"}`}>
                    {c.statut === "verse" ? "Versé" : c.statut === "en_attente" ? "En attente" : "Annulé"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
