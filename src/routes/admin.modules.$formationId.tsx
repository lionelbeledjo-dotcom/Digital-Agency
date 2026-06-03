import { createFileRoute, useParams, Link } from "@tanstack/react-router";
import { useAppStore } from "@/store/appStore";
import { Plus, GripVertical, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/modules/$formationId")({
  component: ModulesPage,
});

function ModulesPage() {
  const { formationId } = useParams({ from: "/admin/modules/$formationId" });
  const f = useAppStore((s) => s.getFormation(formationId));
  if (!f) return <div>Formation introuvable</div>;

  return (
    <div className="space-y-6">
      <div>
        <Link to="/admin/formations" className="text-sm text-sky">← Retour</Link>
        <h1 className="mt-2 font-serif text-3xl font-bold">Modules : {f.titre}</h1>
      </div>

      <button className="rounded-full gradient-cobalt px-5 py-2.5 text-sm font-semibold text-white flex items-center gap-2"><Plus className="h-4 w-4" /> Ajouter un module</button>

      <div className="space-y-4">
        {f.programme.map((m, mi) => (
          <div key={mi} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <GripVertical className="h-4 w-4 text-muted-foreground" />
              <input defaultValue={`Module ${mi + 1} · ${m.titre}`} className="flex-1 rounded-lg border border-border bg-secondary px-3 py-2 text-sm font-semibold" />
              <button className="rounded-md p-1.5 text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></button>
            </div>
            <div className="mt-4 space-y-2 border-l border-border pl-4">
              {m.lecons.map((l, li) => (
                <div key={li} className="flex items-center gap-2">
                  <GripVertical className="h-3 w-3 text-muted-foreground" />
                  <input defaultValue={l.titre} className="flex-1 rounded-lg border border-border bg-secondary px-3 py-1.5 text-sm" />
                  <select className="rounded-lg border border-border bg-secondary px-2 py-1.5 text-xs"><option>Vidéo</option><option>PDF</option><option>Texte</option><option>Quiz</option></select>
                  <input defaultValue={l.duree} className="w-20 rounded-lg border border-border bg-secondary px-2 py-1.5 text-xs" />
                  <button className="rounded-md p-1.5 text-destructive hover:bg-destructive/10"><Trash2 className="h-3 w-3" /></button>
                </div>
              ))}
              <button className="text-xs text-sky">+ Ajouter une leçon</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
