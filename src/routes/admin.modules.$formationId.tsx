import { createFileRoute, useParams, Link } from "@tanstack/react-router";
import { useAppStore } from "@/store/appStore";
import { supabase } from "@/lib/supabase";
import { Plus, Trash2, Video, Upload, Youtube, ChevronLeft, GripVertical, Save } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/modules/$formationId")({
  component: ModulesPage,
});

interface Lecon {
  id?: string;
  module_id?: string;
  titre: string;
  description: string;
  duree: string;
  position: number;
  video_type: "youtube" | "upload" | "vimeo";
  video_url: string;
  video_storage_path: string;
  gratuit: boolean;
}

interface Module {
  id?: string;
  formation_id: string;
  titre: string;
  position: number;
  lecons: Lecon[];
}

function ModulesPage() {
  const { formationId } = useParams({ from: "/admin/modules/$formationId" });
  const f = useAppStore((s) => s.getFormation(formationId));
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchModules = useCallback(async () => {
    const { data: mods } = await supabase
      .from("modules")
      .select("*")
      .eq("formation_id", formationId)
      .order("position");

    if (mods && mods.length > 0) {
      const { data: lecs } = await supabase
        .from("lecons")
        .select("*")
        .in("module_id", mods.map((m) => m.id))
        .order("position");

      setModules(mods.map((m) => ({
        ...m,
        lecons: (lecs || []).filter((l) => l.module_id === m.id),
      })));
    } else if (f) {
      setModules(f.programme.map((m, i) => ({
        formation_id: formationId,
        titre: m.titre,
        position: i,
        lecons: m.lecons.map((l, j) => ({
          titre: l.titre,
          description: "",
          duree: l.duree,
          position: j,
          video_type: "youtube" as const,
          video_url: "",
          video_storage_path: "",
          gratuit: false,
        })),
      })));
    }
    setLoading(false);
  }, [formationId, f]);

  useEffect(() => { fetchModules(); }, [fetchModules]);

  function addModule() {
    setModules([...modules, {
      formation_id: formationId,
      titre: `Module ${modules.length + 1}`,
      position: modules.length,
      lecons: [],
    }]);
  }

  function removeModule(idx: number) {
    setModules(modules.filter((_, i) => i !== idx));
  }

  function updateModule(idx: number, field: string, value: string) {
    const n = [...modules];
    (n[idx] as unknown as Record<string, unknown>)[field] = value;
    setModules(n);
  }

  function addLecon(moduleIdx: number) {
    const n = [...modules];
    n[moduleIdx].lecons.push({
      titre: `Leçon ${n[moduleIdx].lecons.length + 1}`,
      description: "",
      duree: "10min",
      position: n[moduleIdx].lecons.length,
      video_type: "youtube",
      video_url: "",
      video_storage_path: "",
      gratuit: false,
    });
    setModules(n);
  }

  function removeLecon(moduleIdx: number, leconIdx: number) {
    const n = [...modules];
    n[moduleIdx].lecons = n[moduleIdx].lecons.filter((_, i) => i !== leconIdx);
    setModules(n);
  }

  function updateLecon(moduleIdx: number, leconIdx: number, field: string, value: string | boolean) {
    const n = [...modules];
    (n[moduleIdx].lecons[leconIdx] as unknown as Record<string, unknown>)[field] = value;
    setModules(n);
  }

  async function handleVideoUpload(moduleIdx: number, leconIdx: number, file: File) {
    const path = `formations/${formationId}/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("videos").upload(path, file);

    if (error) {
      toast.error("Erreur upload : " + error.message);
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from("videos").getPublicUrl(path);
    updateLecon(moduleIdx, leconIdx, "video_type", "upload");
    updateLecon(moduleIdx, leconIdx, "video_storage_path", path);
    updateLecon(moduleIdx, leconIdx, "video_url", publicUrl);
    toast.success("Vidéo uploadée !");
  }

  async function saveAll() {
    setSaving(true);

    for (const [i, mod] of modules.entries()) {
      let moduleId = mod.id;

      if (moduleId) {
        await supabase.from("modules").update({ titre: mod.titre, position: i }).eq("id", moduleId);
      } else {
        const { data } = await supabase.from("modules").insert({
          formation_id: formationId,
          titre: mod.titre,
          position: i,
        }).select("id").single();
        moduleId = data?.id;
      }

      if (!moduleId) continue;

      await supabase.from("lecons").delete().eq("module_id", moduleId);

      if (mod.lecons.length > 0) {
        await supabase.from("lecons").insert(
          mod.lecons.map((l, j) => ({
            module_id: moduleId,
            titre: l.titre,
            description: l.description,
            duree: l.duree,
            position: j,
            video_type: l.video_type,
            video_url: l.video_url,
            video_storage_path: l.video_storage_path,
            gratuit: l.gratuit,
          }))
        );
      }
    }

    setSaving(false);
    toast.success("Modules et leçons enregistrés !");
  }

  if (!f) return <div className="p-8 text-foreground">Formation introuvable</div>;

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-forest border-t-transparent" />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/admin/formations" className="rounded-full border border-border p-2 text-muted-foreground hover:text-forest hover:bg-secondary transition-colors">
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>Modules & Leçons</h1>
            <p className="text-sm text-muted-foreground">{f.emoji} {f.titre}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={addModule} className="rounded-full border border-forest/30 px-4 py-2 text-xs font-medium text-forest hover:bg-forest/5 flex items-center gap-1 transition-colors">
            <Plus className="h-3.5 w-3.5" /> Module
          </button>
          <button onClick={saveAll} disabled={saving} className="rounded-full gradient-primary px-5 py-2 text-xs font-semibold text-white shadow-glow flex items-center gap-1 disabled:opacity-60 transition-transform hover:scale-[1.02]">
            <Save className="h-3.5 w-3.5" /> {saving ? "Sauvegarde..." : "Sauvegarder tout"}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {modules.map((mod, mi) => (
          <div key={mi} className="rounded-2xl border border-border bg-white p-5 shadow-soft">
            <div className="flex items-center gap-3">
              <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-forest text-xs font-bold text-white">{mi + 1}</span>
              <input
                value={mod.titre}
                onChange={(e) => updateModule(mi, "titre", e.target.value)}
                className="flex-1 rounded-xl border border-border bg-secondary px-3 py-2 text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-forest/20"
              />
              <button onClick={() => removeModule(mi)} className="rounded-lg p-1.5 text-destructive hover:bg-destructive/10 transition-colors"><Trash2 className="h-4 w-4" /></button>
            </div>

            <div className="mt-4 space-y-3 ml-10">
              {mod.lecons.map((lec, li) => (
                <div key={li} className="rounded-xl border border-border bg-secondary/50 p-3">
                  <div className="flex items-center gap-2">
                    <GripVertical className="h-3 w-3 text-muted-foreground" />
                    <input
                      value={lec.titre}
                      onChange={(e) => updateLecon(mi, li, "titre", e.target.value)}
                      placeholder="Titre de la leçon"
                      className="flex-1 rounded-lg border border-border bg-white px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-forest/20"
                    />
                    <input
                      value={lec.duree}
                      onChange={(e) => updateLecon(mi, li, "duree", e.target.value)}
                      placeholder="10min"
                      className="w-16 rounded-lg border border-border bg-white px-2 py-1.5 text-xs text-center text-foreground focus:outline-none focus:ring-2 focus:ring-forest/20"
                    />
                    <label className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <input type="checkbox" checked={lec.gratuit} onChange={(e) => updateLecon(mi, li, "gratuit", e.target.checked)} className="rounded" /> Gratuit
                    </label>
                    <button onClick={() => removeLecon(mi, li)} className="rounded-md p-1 text-destructive hover:bg-destructive/10"><Trash2 className="h-3 w-3" /></button>
                  </div>

                  {/* Vidéo section */}
                  <div className="mt-2 flex items-center gap-2">
                    <select
                      value={lec.video_type}
                      onChange={(e) => updateLecon(mi, li, "video_type", e.target.value)}
                      className="rounded-lg border border-border bg-white px-2 py-1.5 text-[10px] text-foreground"
                    >
                      <option value="youtube">YouTube</option>
                      <option value="vimeo">Vimeo</option>
                      <option value="upload">Upload</option>
                    </select>

                    {(lec.video_type === "youtube" || lec.video_type === "vimeo") && (
                      <div className="flex-1 flex items-center gap-1">
                        <Youtube className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        <input
                          value={lec.video_url}
                          onChange={(e) => updateLecon(mi, li, "video_url", e.target.value)}
                          placeholder={lec.video_type === "youtube" ? "https://youtube.com/watch?v=..." : "https://vimeo.com/..."}
                          className="flex-1 rounded-lg border border-border bg-white px-2 py-1.5 text-[10px] text-foreground focus:outline-none focus:ring-2 focus:ring-forest/20"
                        />
                      </div>
                    )}

                    {lec.video_type === "upload" && (
                      <div className="flex-1 flex items-center gap-2">
                        {lec.video_url ? (
                          <div className="flex items-center gap-2 text-[10px] text-forest">
                            <Video className="h-3.5 w-3.5" />
                            <span className="truncate max-w-[200px]">Vidéo uploadée</span>
                          </div>
                        ) : (
                          <label className="flex items-center gap-1 cursor-pointer rounded-lg border border-dashed border-forest/30 bg-forest/5 px-3 py-1.5 text-[10px] text-forest hover:bg-forest/10 transition-colors">
                            <Upload className="h-3 w-3" /> Choisir un fichier
                            <input
                              type="file"
                              accept="video/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleVideoUpload(mi, li, file);
                              }}
                            />
                          </label>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <button onClick={() => addLecon(mi)} className="text-xs text-forest font-medium hover:text-forest-light transition-colors flex items-center gap-1">
                <Plus className="h-3 w-3" /> Ajouter une leçon
              </button>
            </div>
          </div>
        ))}

        {modules.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border bg-white p-10 text-center">
            <Video className="h-10 w-10 text-muted-foreground mx-auto" />
            <p className="mt-3 text-sm text-muted-foreground">Aucun module. Clique sur "+ Module" pour commencer.</p>
          </div>
        )}
      </div>
    </div>
  );
}
