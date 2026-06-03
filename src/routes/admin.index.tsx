import { createFileRoute } from "@tanstack/react-router";
import { useAppStore } from "@/store/appStore";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import { AlertTriangle, TrendingUp, Users, Wallet, UserPlus, Percent } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminHome,
});

const inscriptionsData = Array.from({ length: 30 }, (_, i) => ({
  jour: `${i + 1}`,
  v: Math.round(5 + Math.random() * 25),
}));

const revenusData = Array.from({ length: 12 }, (_, i) => ({
  mois: `M${i + 1}`,
  v: Math.round(120000 + i * 30000 + Math.random() * 50000),
}));

const plansData = [
  { name: "Starter", value: 320, color: "#3B82F6" },
  { name: "Club IA", value: 180, color: "#0EA5E9" },
  { name: "Pro Creator", value: 65, color: "#F59E0B" },
];

const topAffiliates = [
  { nom: "Aminata K.", filleuls: 87, gain: 215000 },
  { nom: "Kofi M.", filleuls: 62, gain: 158000 },
  { nom: "Moussa D.", filleuls: 54, gain: 142000 },
  { nom: "Awa T.", filleuls: 41, gain: 105000 },
  { nom: "Ibrahim S.", filleuls: 38, gain: 92000 },
];

function AdminHome() {
  const membres = useAppStore((s) => s.membres);
  const actifs = membres.filter((m) => m.plan !== "starter").length;

  const kpis = [
    { l: "Membres inscrits", v: membres.length, Icon: Users },
    { l: "Membres payants", v: actifs, Icon: UserPlus },
    { l: "Revenu ce mois", v: "1 285 000 F", Icon: Wallet },
    { l: "À verser vendredi", v: "342 500 F", Icon: TrendingUp },
    { l: "Inscriptions 7j", v: 87, Icon: UserPlus },
    { l: "Taux conversion", v: "23%", Icon: Percent },
  ];

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {kpis.map((k) => (
          <div key={k.l} className="rounded-2xl border border-border bg-card p-5">
            <k.Icon className="h-5 w-5 text-sky" />
            <p className="mt-4 text-xs uppercase tracking-wider text-muted-foreground">{k.l}</p>
            <p className="mt-1 font-serif text-xl font-bold">{k.v}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-semibold">Inscriptions 30 derniers jours</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer>
              <AreaChart data={inscriptionsData}>
                <defs>
                  <linearGradient id="ins" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="jour" stroke="#888" fontSize={10} />
                <YAxis stroke="#888" fontSize={10} />
                <Tooltip contentStyle={{ background: "#0F1E38", border: "1px solid #1A56DB", borderRadius: 8 }} />
                <Area type="monotone" dataKey="v" stroke="#3B82F6" fill="url(#ins)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-semibold">Revenus 12 mois</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer>
              <BarChart data={revenusData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="mois" stroke="#888" fontSize={10} />
                <YAxis stroke="#888" fontSize={10} />
                <Tooltip contentStyle={{ background: "#0F1E38", border: "1px solid #1A56DB", borderRadius: 8 }} />
                <Bar dataKey="v" fill="#0EA5E9" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr]">
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-semibold">Répartition plans</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={plansData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90}>
                  {plansData.map((p) => <Cell key={p.name} fill={p.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "#0F1E38", border: "1px solid #1A56DB", borderRadius: 8 }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-semibold">Top 5 affiliés</h3>
          <table className="mt-4 w-full text-sm">
            <thead><tr className="text-left text-xs uppercase tracking-wider text-muted-foreground"><th className="py-2">Nom</th><th>Filleuls</th><th>Gain total</th></tr></thead>
            <tbody>
              {topAffiliates.map((a) => (
                <tr key={a.nom} className="border-t border-border/40">
                  <td className="py-3 font-medium">{a.nom}</td>
                  <td>{a.filleuls}</td>
                  <td className="font-semibold">{a.gain.toLocaleString("fr-FR")} F</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-3">
        {[
          { c: "gold", t: "Commissions vendredi prêtes (342 500 F sur 28 membres)" },
          { c: "destructive", t: "3 paiements ont échoué cette semaine" },
          { c: "sky", t: "12 abonnements expirent dans les 7 jours" },
        ].map((a, i) => (
          <div key={i} className={`flex items-center gap-3 rounded-xl border bg-card p-4 border-${a.c}/40 bg-${a.c}/5`}>
            <AlertTriangle className={`h-5 w-5 text-${a.c}`} />
            <p className="text-sm">{a.t}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
