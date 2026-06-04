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
  { name: "Starter", value: 320, color: "#1a5c3a" },
  { name: "Club IA", value: 180, color: "#237a4d" },
  { name: "Pro Creator", value: 65, color: "#c8a415" },
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
      <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {kpis.map((k) => (
          <div key={k.l} className="rounded-2xl border border-border bg-white p-5 shadow-soft">
            <k.Icon className="h-5 w-5 text-forest" />
            <p className="mt-4 text-xs uppercase tracking-wider text-muted-foreground">{k.l}</p>
            <p className="mt-1 text-xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>{k.v}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-white p-5 shadow-soft">
          <h3 className="font-semibold text-foreground">Inscriptions 30 derniers jours</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer>
              <AreaChart data={inscriptionsData}>
                <defs>
                  <linearGradient id="ins" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1a5c3a" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#1a5c3a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                <XAxis dataKey="jour" stroke="#6b6b6b" fontSize={10} />
                <YAxis stroke="#6b6b6b" fontSize={10} />
                <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e5e5e0", borderRadius: 12 }} />
                <Area type="monotone" dataKey="v" stroke="#1a5c3a" fill="url(#ins)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-5 shadow-soft">
          <h3 className="font-semibold text-foreground">Revenus 12 mois</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer>
              <BarChart data={revenusData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                <XAxis dataKey="mois" stroke="#6b6b6b" fontSize={10} />
                <YAxis stroke="#6b6b6b" fontSize={10} />
                <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e5e5e0", borderRadius: 12 }} />
                <Bar dataKey="v" fill="#237a4d" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr]">
        <div className="rounded-2xl border border-border bg-white p-5 shadow-soft">
          <h3 className="font-semibold text-foreground">Répartition plans</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={plansData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90}>
                  {plansData.map((p) => <Cell key={p.name} fill={p.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e5e5e0", borderRadius: 12 }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-5 shadow-soft">
          <h3 className="font-semibold text-foreground">Top 5 affiliés</h3>
          <table className="mt-4 w-full text-sm">
            <thead><tr className="text-left text-xs uppercase tracking-wider text-muted-foreground"><th className="py-2">Nom</th><th>Filleuls</th><th>Gain total</th></tr></thead>
            <tbody>
              {topAffiliates.map((a) => (
                <tr key={a.nom} className="border-t border-border/40">
                  <td className="py-3 font-medium text-foreground">{a.nom}</td>
                  <td className="text-foreground">{a.filleuls}</td>
                  <td className="font-semibold text-foreground">{a.gain.toLocaleString("fr-FR")} F</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-3">
        {[
          { cls: "border-amber/40 bg-amber/5", icon: "text-amber", t: "Commissions vendredi prêtes (342 500 F sur 28 membres)" },
          { cls: "border-destructive/40 bg-destructive/5", icon: "text-destructive", t: "3 paiements ont échoué cette semaine" },
          { cls: "border-forest/40 bg-forest/5", icon: "text-forest", t: "12 abonnements expirent dans les 7 jours" },
        ].map((a, i) => (
          <div key={i} className={`flex items-center gap-3 rounded-xl border p-4 ${a.cls}`}>
            <AlertTriangle className={`h-5 w-5 ${a.icon}`} />
            <p className="text-sm text-foreground">{a.t}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
