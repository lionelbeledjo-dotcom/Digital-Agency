import { createFileRoute, Link } from "@tanstack/react-router";
import { useAppStore } from "@/store/appStore";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Copy, Share2, GraduationCap, Users, Wallet, TrendingUp, ArrowRight, Sparkles } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardHome,
});

const chartData = [
  { mois: "Déc", v: 3200 }, { mois: "Jan", v: 5800 }, { mois: "Fév", v: 7400 },
  { mois: "Mar", v: 9100 }, { mois: "Avr", v: 8400 }, { mois: "Mai", v: 10500 },
];

const activities = [
  { t: "Nouveau filleul : k***@gmail.com", d: "il y a 2h", type: "new" },
  { t: "Commission reçue : +875 FCFA", d: "il y a 4h", type: "money" },
  { t: "Module complété : ChatGPT - Prompts", d: "hier", type: "course" },
  { t: "Versement effectué : 8 750 FCFA", d: "il y a 3j", type: "money" },
  { t: "Nouveau filleul : m***@yahoo.fr", d: "il y a 4j", type: "new" },
];

function DashboardHome() {
  const user = useAppStore((s) => s.currentUser);
  const formations = useAppStore((s) => s.formations);
  if (!user) return null;

  const kpis = [
    { label: "Formations complétées", value: `${user.formationsCompletes.length} / ${formations.length}`, Icon: GraduationCap, c: "bg-forest" },
    { label: "Filleuls actifs", value: user.filleulsActifs, Icon: Users, c: "bg-forest-light" },
    { label: "Commissions ce mois", value: `${user.commissionsMois.toLocaleString("fr-FR")} F`, Icon: Wallet, c: "bg-amber" },
    { label: "Total gagné", value: `${user.commissionsTotal.toLocaleString("fr-FR")} F`, Icon: TrendingUp, c: "bg-olive" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>Salut {user.prenom} 👋</h1>
        <p className="text-sm text-muted-foreground">Ravie de te revoir. Voici tes stats du moment.</p>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="card-glow rounded-2xl border border-border bg-white p-5 shadow-soft">
            <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${k.c}`}>
              <k.Icon className="h-5 w-5 text-white" />
            </div>
            <p className="mt-4 text-xs uppercase tracking-wider text-muted-foreground">{k.label}</p>
            <p className="mt-1 text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>{k.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-border bg-white p-5 shadow-soft">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Commissions (6 derniers mois)</h3>
            <span className="text-xs text-muted-foreground">FCFA</span>
          </div>
          <div className="mt-4 h-64">
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                <XAxis dataKey="mois" stroke="#6b6b6b" fontSize={11} />
                <YAxis stroke="#6b6b6b" fontSize={11} />
                <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e5e5e0", borderRadius: 12 }} />
                <Bar dataKey="v" fill="#1a5c3a" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-5 shadow-soft">
          <h3 className="font-semibold text-foreground">Activité récente</h3>
          <ul className="mt-4 space-y-3">
            {activities.map((a, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <div className={`mt-1 h-2 w-2 shrink-0 rounded-full ${a.type === "money" ? "bg-forest" : a.type === "new" ? "bg-amber" : "bg-forest-light"}`} />
                <div className="flex-1">
                  <p className="text-foreground">{a.t}</p>
                  <p className="text-xs text-muted-foreground">{a.d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Formations en cours */}
      <div className="rounded-2xl border border-border bg-white p-5 shadow-soft">
        <h3 className="font-semibold text-foreground">Formations en cours</h3>
        <div className="mt-4 space-y-4">
          {user.formationsEnCours.map((fc) => {
            const f = formations.find((x) => x.id === fc.id);
            if (!f) return null;
            return (
              <div key={fc.id} className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest/10 text-2xl">{f.emoji}</div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">{f.titre}</p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
                    <div className="h-full gradient-primary rounded-full" style={{ width: `${fc.progression}%` }} />
                  </div>
                </div>
                <Link to="/dashboard/formation/$id" params={{ id: f.id }} className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-forest hover:bg-forest/5 transition-colors">Continuer →</Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lien affilié */}
      <div className="rounded-2xl border border-forest/20 bg-forest/5 p-5">
        <p className="text-xs uppercase tracking-wider text-forest font-semibold">Mon lien affilié</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <code className="flex-1 min-w-[200px] truncate rounded-xl bg-white border border-border px-3 py-2 text-sm text-foreground">{user.lienAffilie}</code>
          <button onClick={() => { navigator.clipboard?.writeText(user.lienAffilie); toast.success("Lien copié !"); }} className="rounded-xl border border-border bg-white px-3 py-2 text-sm text-muted-foreground hover:text-forest transition-colors"><Copy className="h-4 w-4" /></button>
          <a href={`https://wa.me/?text=${encodeURIComponent("Rejoins Digital Agency : " + user.lienAffilie)}`} className="rounded-xl gradient-primary px-3 py-2 text-sm text-white"><Share2 className="h-4 w-4" /></a>
        </div>
      </div>

      {/* Upgrade banner */}
      {user.plan !== "pro_creator" && (
        <Link to="/tarifs" className="flex items-center gap-4 rounded-2xl border border-amber/30 bg-amber/5 p-5 card-glow">
          <Sparkles className="h-8 w-8 text-amber" />
          <div className="flex-1">
            <p className="font-semibold text-foreground">Passe à Pro Creator pour 40% de commission</p>
            <p className="text-xs text-muted-foreground">Coaching 1-on-1, badge certifié, retrait prioritaire.</p>
          </div>
          <ArrowRight className="h-5 w-5 text-forest" />
        </Link>
      )}
    </div>
  );
}
