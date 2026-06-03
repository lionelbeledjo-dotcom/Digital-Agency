import { createFileRoute, Link } from "@tanstack/react-router";
import { useAppStore } from "@/store/appStore";
import { Plus, Edit3, Copy, Archive } from "lucide-react";

export const Route = createFileRoute("/admin/formations")({
  component: AdminFormations,
});

function AdminFormations() {
  const formations = useAppStore((s) => s.formations);
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-serif text-3xl font-bold">Formations</h1>
        <Link to="/admin/formations/new" className="rounded-full gradient-cobalt px-5 py-2.5 text-sm font-semibold text-white flex items-center gap-2"><Plus className="h-4 w-4" /> Nouvelle formation</Link>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="border-b border-border">
            <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              {["Thumb","Titre","Catégorie","Niveau","Accès","Inscrits","Note","Statut","Actions"].map((h) => <th key={h} className="px-4 py-3 font-medium">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {formations.map((f) => (
              <tr key={f.id} className="border-b border-border/40">
                <td className="px-4 py-2"><div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${f.couleur} text-lg`}>{f.emoji}</div></td>
                <td className="px-4 py-3 font-medium max-w-xs">{f.titre}</td>
                <td className="px-4 py-3 text-muted-foreground">{f.categorie}</td>
                <td className="px-4 py-3 text-muted-foreground">{f.niveau}</td>
                <td className="px-4 py-3"><span className="rounded-full bg-gold/15 px-2 py-0.5 text-[10px] text-gold">{f.acces === "starter" ? "Gratuit" : f.acces === "club_ia" ? "Club" : "Pro"}</span></td>
                <td className="px-4 py-3">{f.inscrits.toLocaleString("fr-FR")}</td>
                <td className="px-4 py-3">{f.note}</td>
                <td className="px-4 py-3"><span className="rounded-full bg-green/20 px-2 py-0.5 text-[10px] font-semibold text-green">Publié</span></td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <Link to="/admin/formations/$id/edit" params={{ id: f.id }} className="rounded-md p-1.5 hover:bg-secondary"><Edit3 className="h-3.5 w-3.5" /></Link>
                    <button className="rounded-md p-1.5 hover:bg-secondary"><Copy className="h-3.5 w-3.5" /></button>
                    <button className="rounded-md p-1.5 hover:bg-secondary"><Archive className="h-3.5 w-3.5" /></button>
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
