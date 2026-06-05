import { createFileRoute, Link } from "@tanstack/react-router";
import { useAppStore } from "@/store/appStore";
import { Plus, Edit3, Copy, Archive, GraduationCap, Star, Users, BookOpen } from "lucide-react";

export const Route = createFileRoute("/admin/formations")({
  component: AdminFormations,
});

function AdminFormations() {
  const formations = useAppStore((s) => s.formations);

  const stats = [
    { l: "Total formations", v: formations.length, Icon: BookOpen, bg: "bg-forest" },
    { l: "Total inscrits", v: formations.reduce((s, f) => s + f.inscrits, 0).toLocaleString("fr-FR"), Icon: Users, bg: "bg-forest-light" },
    { l: "Note moyenne", v: (formations.reduce((s, f) => s + f.note, 0) / formations.length).toFixed(1), Icon: Star, bg: "bg-amber" },
    { l: "Catégories", v: [...new Set(formations.map(f => f.categorie))].length, Icon: GraduationCap, bg: "bg-olive" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>Formations</h1>
        <a href="/admin/formations/new" className="rounded-full gradient-primary px-5 py-2.5 text-sm font-semibold text-white flex items-center gap-2 shadow-glow transition-transform hover:scale-[1.02]"><Plus className="h-4 w-4" /> Nouvelle formation</a>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.l} className={`rounded-2xl ${s.bg} p-5 shadow-soft`}>
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-wider text-white/70">{s.l}</p>
              <s.Icon className="h-5 w-5 text-white/70" />
            </div>
            <p className="mt-2 text-3xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>{s.v}</p>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-white shadow-soft">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-secondary/50">
            <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              {["","Titre","Catégorie","Niveau","Accès","Inscrits","Note","Statut","Actions"].map((h) => <th key={h} className="px-4 py-3 font-medium">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {formations.map((f) => (
              <tr key={f.id} className="border-b border-border/40 hover:bg-secondary/30 transition-colors">
                <td className="px-4 py-2"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest/10 text-xl">{f.emoji}</div></td>
                <td className="px-4 py-3 font-semibold text-foreground max-w-xs">{f.titre}</td>
                <td className="px-4 py-3"><span className="rounded-full bg-forest/10 px-2.5 py-1 text-[10px] font-medium text-forest">{f.categorie}</span></td>
                <td className="px-4 py-3"><span className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${
                  f.niveau === "Débutant" ? "bg-forest/10 text-forest" :
                  f.niveau === "Intermédiaire" ? "bg-amber/15 text-amber" :
                  "bg-olive/15 text-olive"
                }`}>{f.niveau}</span></td>
                <td className="px-4 py-3"><span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase ${
                  f.acces === "starter" ? "bg-secondary text-muted-foreground" :
                  f.acces === "club_ia" ? "bg-forest/10 text-forest" :
                  "bg-amber/15 text-amber"
                }`}>{f.acces === "starter" ? "Gratuit" : f.acces === "club_ia" ? "Club" : "Pro"}</span></td>
                <td className="px-4 py-3">
                  <span className="inline-flex h-6 min-w-[24px] items-center justify-center rounded-full bg-forest/10 px-1.5 text-xs font-semibold text-forest">{f.inscrits.toLocaleString("fr-FR")}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 text-xs"><Star className="h-3 w-3 fill-amber text-amber" /> {f.note}</span>
                </td>
                <td className="px-4 py-3"><span className="rounded-full bg-forest/10 px-2.5 py-1 text-[10px] font-semibold text-forest">Publié</span></td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <Link to="/admin/formations/$id/edit" params={{ id: f.id }} className="rounded-lg p-1.5 hover:bg-secondary transition-colors text-muted-foreground hover:text-forest"><Edit3 className="h-3.5 w-3.5" /></Link>
                    <button className="rounded-lg p-1.5 hover:bg-secondary transition-colors text-muted-foreground hover:text-forest"><Copy className="h-3.5 w-3.5" /></button>
                    <button className="rounded-lg p-1.5 hover:bg-secondary transition-colors text-muted-foreground hover:text-destructive"><Archive className="h-3.5 w-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
