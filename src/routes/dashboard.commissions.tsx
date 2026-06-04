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
          <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>Commissions</h1>
          <p className="text-sm text-muted-foreground">L'historique complet de tes gains.</p>
        </div>
        <button className="rounded-full border border-border px-4 py-2 text-sm flex items-center gap-2 text-foreground hover:bg-secondary transition-colors"><Download className="h-4 w-4" /> Export CSV</button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.l} className="rounded-2xl border border-border bg-white p-5 shadow-soft">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{k.l}</p>
            <p className="mt-1 text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>{k.v}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-white p-5 shadow-soft">
        <h3 className="font-semibold text-foreground">Évolution sur 12 mois</h3>
        <div className="mt-4 h-64">
          <ResponsiveContainer>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
              <XAxis dataKey="mois" stroke="#6b6b6b" fontSize={11} />
              <YAxis stroke="#6b6b6b" fontSize={11} />
              <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e5e5e0", borderRadius: 12 }} />
              <Line type="monotone" dataKey="v" stroke="#1a5c3a" strokeWidth={3} dot={{ fill: "#c8a415" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-white shadow-soft">
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
                <td className="px-4 py-3 text-foreground">{c.filleulEmail}</td>
                <td className="px-4 py-3 capitalize text-foreground">{c.plan.replace("_", " ")}</td>
                <td className="px-4 py-3 font-semibold text-foreground">{c.montant.toLocaleString("fr-FR")} F</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase ${c.statut === "verse" ? "bg-forest/10 text-forest" : c.statut === "en_attente" ? "bg-amber/15 text-amber" : "bg-destructive/10 text-destructive"}`}>
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
