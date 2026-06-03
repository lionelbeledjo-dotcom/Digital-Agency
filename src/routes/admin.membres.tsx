import { createFileRoute } from "@tanstack/react-router";
import { useAppStore } from "@/store/appStore";
import { useState, useMemo } from "react";
import { Search, MoreHorizontal, Download } from "lucide-react";

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

  const stats = {
    total: membres.length,
    actifs: membres.filter((m) => m.statut === "actif").length,
    suspendus: membres.filter((m) => m.statut === "suspendu").length,
    nouveaux: 12,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-serif text-3xl font-bold">Membres</h1>
        <button className="rounded-full border border-border px-4 py-2 text-sm flex items-center gap-2"><Download className="h-4 w-4" /> Export CSV</button>
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        {[["Total",stats.total],["Actifs",stats.actifs],["Suspendus",stats.suspendus],["Nouveaux 7j",stats.nouveaux]].map(([l,v]) => (
          <div key={l as string} className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{l}</p>
            <p className="mt-1 font-serif text-xl font-bold">{v}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher membre…" className="w-full rounded-lg border border-border bg-secondary py-2 pl-9 pr-3 text-sm" />
        </div>
        <select value={planF} onChange={(e) => setPlanF(e.target.value)} className="rounded-lg border border-border bg-secondary px-3 py-2 text-sm">
          <option value="all">Tous les plans</option>
          <option value="starter">Starter</option>
          <option value="club_ia">Club IA</option>
          <option value="pro_creator">Pro Creator</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="border-b border-border">
            <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              {["Membre","Email","Pays","Plan","Inscription","Filleuls","Total","Statut","Actions"].map((h) => <th key={h} className="px-4 py-3 font-medium">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, 30).map((m) => (
              <tr key={m.id} className="border-b border-border/40">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full gradient-cobalt text-[10px] font-bold text-white">{m.prenom[0]}{m.nom[0]}</div>
                    <span className="font-medium">{m.prenom} {m.nom}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{m.email}</td>
                <td className="px-4 py-3">{m.pays}</td>
                <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${m.plan === "pro_creator" ? "bg-gold/20 text-gold" : m.plan === "club_ia" ? "bg-cobalt/20 text-cobalt" : "bg-secondary text-muted-foreground"}`}>{m.plan.replace("_", " ")}</span></td>
                <td className="px-4 py-3 text-muted-foreground text-xs">{m.dateInscription}</td>
                <td className="px-4 py-3">{m.filleulsActifs}</td>
                <td className="px-4 py-3 font-semibold">{m.commissionsTotal.toLocaleString("fr-FR")} F</td>
                <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${m.statut === "actif" ? "bg-green/20 text-green" : "bg-destructive/20 text-destructive"}`}>{m.statut}</span></td>
                <td className="px-4 py-3"><button className="rounded-md p-1 hover:bg-secondary"><MoreHorizontal className="h-4 w-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
