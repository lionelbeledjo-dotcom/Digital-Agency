import { createFileRoute } from "@tanstack/react-router";
import { useAppStore } from "@/store/appStore";
import { useState, useMemo } from "react";
import { Search, MoreHorizontal, Download, Users, UserCheck, UserX, UserPlus } from "lucide-react";

export const Route = createFileRoute("/admin/membres")({
  component: MembresPage,
});

function MembresPage() {
  const membres = useAppStore((s) => s.membres);
  const [q, setQ] = useState("");
  const [planF, setPlanF] = useState<"all" | string>("all");

  const filtered = useMemo(() => membres.filter((m) =>
    (planF === "all" || m.plan === planF) &&
    (m.email.toLowerCase().includes(q.toLowerCase()) || m.nom.toLowerCase().includes(q.toLowerCase()))
  ), [membres, q, planF]);

  const stats = [
    { l: "Total", v: membres.length, Icon: Users, bg: "bg-forest", text: "text-white" },
    { l: "Actifs", v: membres.filter((m) => m.statut === "actif").length, Icon: UserCheck, bg: "bg-forest-light", text: "text-white" },
    { l: "Suspendus", v: membres.filter((m) => m.statut === "suspendu").length, Icon: UserX, bg: "bg-amber", text: "text-white" },
    { l: "Nouveaux 7j", v: 12, Icon: UserPlus, bg: "bg-olive", text: "text-white" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>Membres</h1>
        <button className="rounded-full border border-border px-4 py-2 text-sm flex items-center gap-2 text-foreground hover:bg-secondary transition-colors"><Download className="h-4 w-4" /> Export CSV</button>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.l} className={`rounded-2xl ${s.bg} p-5 shadow-soft`}>
            <div className="flex items-center justify-between">
              <p className={`text-xs uppercase tracking-wider ${s.text} opacity-70`}>{s.l}</p>
              <s.Icon className={`h-5 w-5 ${s.text} opacity-70`} />
            </div>
            <p className={`mt-2 text-3xl font-bold ${s.text}`} style={{ fontFamily: "var(--font-heading)" }}>{s.v}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher membre…" className="w-full rounded-xl border border-border bg-white py-2.5 pl-9 pr-3 text-sm text-foreground shadow-soft focus:outline-none focus:ring-2 focus:ring-forest/20" />
        </div>
        <select value={planF} onChange={(e) => setPlanF(e.target.value)} className="rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-foreground shadow-soft focus:outline-none focus:ring-2 focus:ring-forest/20">
          <option value="all">Tous les plans</option>
          <option value="starter">Starter</option>
          <option value="club_ia">Club IA</option>
          <option value="pro_creator">Pro Creator</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-white shadow-soft">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-secondary/50">
            <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              {["Membre","Email","Pays","Plan","Inscription","Filleuls","Total","Statut","Actions"].map((h) => <th key={h} className="px-4 py-3 font-medium">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, 30).map((m) => (
              <tr key={m.id} className="border-b border-border/40 hover:bg-secondary/30 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-forest text-[10px] font-bold text-white">{m.prenom[0]}{m.nom[0]}</div>
                    <span className="font-semibold text-foreground">{m.prenom} {m.nom}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{m.email}</td>
                <td className="px-4 py-3 text-foreground">{m.pays}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase ${
                    m.plan === "pro_creator" ? "bg-amber/15 text-amber" :
                    m.plan === "club_ia" ? "bg-forest/10 text-forest" :
                    "bg-secondary text-muted-foreground"
                  }`}>{m.plan.replace("_", " ")}</span>
                </td>
                <td className="px-4 py-3 text-muted-foreground text-xs">{m.dateInscription}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-forest/10 text-xs font-semibold text-forest">{m.filleulsActifs}</span>
                </td>
                <td className="px-4 py-3 font-semibold text-foreground">{m.commissionsTotal.toLocaleString("fr-FR")} F</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase ${
                    m.statut === "actif" ? "bg-forest/10 text-forest" : "bg-destructive/10 text-destructive"
                  }`}>{m.statut}</span>
                </td>
                <td className="px-4 py-3">
                  <button className="rounded-lg p-1.5 hover:bg-secondary transition-colors"><MoreHorizontal className="h-4 w-4 text-muted-foreground" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground">{filtered.length} membre{filtered.length > 1 ? "s" : ""} au total</p>
    </div>
  );
}
