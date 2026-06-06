import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Plus, Trash2, Edit3, Image, Video, Eye, EyeOff, Search, X } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/galerie")({
  component: AdminGalerie,
});

interface GalerieItem {
  id: string;
  titre: string;
  description: string;
  prompt: string;
  media_url: string;
  media_type: "image" | "video";
  thumbnail_url: string;
  tags: string[];
  categorie: string;
  format: string;
  duree: string;
  outil: string;
  acces: string;
  likes: number;
  vues: number;
  is_published: boolean;
  created_at: string;
}

const CATEGORIES = ["art", "portrait", "3D", "fashion", "editorial", "sport", "neon", "collage", "urban", "modern", "aesthetic"];
const OUTILS = ["Midjourney", "DALL-E", "Stable Diffusion", "Leonardo AI", "Ideogram", "Flux", "ChatGPT", "Canva AI"];
const FORMATS = ["1:1", "9:16", "16:9", "4:5", "3:4"];

function AdminGalerie() {
  const [items, setItems] = useState<GalerieItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<GalerieItem | null>(null);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("all");

  const [form, setForm] = useState({
    titre: "",
    description: "",
    prompt: "",
    media_url: "",
    media_type: "image" as "image" | "video",
    thumbnail_url: "",
    tags: "",
    categorie: "art",
    format: "1:1",
    duree: "",
    outil: "Midjourney",
    acces: "starter",
    is_published: true,
  });

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    const { data, error } = await supabase
      .from("galerie")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("Erreur chargement galerie");
      console.error(error);
    } else {
      setItems(data || []);
    }
    setLoading(false);
  }

  function openCreate() {
    setEditItem(null);
    setForm({
      titre: "", description: "", prompt: "", media_url: "", media_type: "image",
      thumbnail_url: "", tags: "", categorie: "art", format: "1:1", duree: "",
      outil: "Midjourney", acces: "starter", is_published: true,
    });
    setShowForm(true);
  }

  function openEdit(item: GalerieItem) {
    setEditItem(item);
    setForm({
      titre: item.titre,
      description: item.description || "",
      prompt: item.prompt,
      media_url: item.media_url,
      media_type: item.media_type,
      thumbnail_url: item.thumbnail_url || "",
      tags: (item.tags || []).join(", "),
      categorie: item.categorie,
      format: item.format || "1:1",
      duree: item.duree || "",
      outil: item.outil || "Midjourney",
      acces: item.acces,
      is_published: item.is_published,
    });
    setShowForm(true);
  }

  async function handleSave() {
    if (!form.titre || !form.prompt || !form.media_url) {
      toast.error("Titre, prompt et URL média sont obligatoires");
      return;
    }

    const payload = {
      titre: form.titre,
      description: form.description || null,
      prompt: form.prompt,
      media_url: form.media_url,
      media_type: form.media_type,
      thumbnail_url: form.thumbnail_url || null,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      categorie: form.categorie,
      format: form.format,
      duree: form.duree || null,
      outil: form.outil,
      acces: form.acces,
      is_published: form.is_published,
      updated_at: new Date().toISOString(),
    };

    if (editItem) {
      const { error } = await supabase.from("galerie").update(payload).eq("id", editItem.id);
      if (error) { toast.error("Erreur mise à jour"); return; }
      toast.success("Création mise à jour !");
    } else {
      const { error } = await supabase.from("galerie").insert(payload);
      if (error) { toast.error("Erreur ajout"); return; }
      toast.success("Création ajoutée !");
    }

    setShowForm(false);
    fetchItems();
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer cette création ?")) return;
    const { error } = await supabase.from("galerie").delete().eq("id", id);
    if (error) { toast.error("Erreur suppression"); return; }
    toast.success("Supprimé !");
    setItems(items.filter((i) => i.id !== id));
  }

  async function togglePublish(item: GalerieItem) {
    const { error } = await supabase.from("galerie").update({ is_published: !item.is_published }).eq("id", item.id);
    if (error) { toast.error("Erreur"); return; }
    setItems(items.map((i) => i.id === item.id ? { ...i, is_published: !i.is_published } : i));
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>, field: "media_url" | "thumbnail_url") {
    const file = e.target.files?.[0];
    if (!file) return;
    const ext = file.name.split(".").pop();
    const path = `galerie/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("media").upload(path, file);
    if (error) { toast.error("Erreur upload"); return; }
    const { data } = supabase.storage.from("media").getPublicUrl(path);
    setForm({ ...form, [field]: data.publicUrl });
    toast.success("Fichier uploadé !");
  }

  const filtered = items.filter((i) => {
    if (filterCat !== "all" && i.categorie !== filterCat) return false;
    if (search && !i.titre.toLowerCase().includes(search.toLowerCase()) && !(i.tags || []).some(t => t.toLowerCase().includes(search.toLowerCase()))) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>Galerie IA</h1>
        <button onClick={openCreate} className="rounded-full gradient-primary px-5 py-2.5 text-sm font-semibold text-white flex items-center gap-2 shadow-glow transition-transform hover:scale-[1.02]">
          <Plus className="h-4 w-4" /> Nouvelle création
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { l: "Total créations", v: items.length, Icon: Image, bg: "bg-forest" },
          { l: "Images", v: items.filter(i => i.media_type === "image").length, Icon: Image, bg: "bg-forest-light" },
          { l: "Vidéos", v: items.filter(i => i.media_type === "video").length, Icon: Video, bg: "bg-amber" },
          { l: "Publiées", v: items.filter(i => i.is_published).length, Icon: Eye, bg: "bg-olive" },
        ].map((s) => (
          <div key={s.l} className={`rounded-2xl ${s.bg} p-5 shadow-soft`}>
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-wider text-white/70">{s.l}</p>
              <s.Icon className="h-5 w-5 text-white/70" />
            </div>
            <p className="mt-2 text-3xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>{s.v}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par titre ou tag..."
            className="w-full rounded-xl border border-border bg-white pl-10 pr-4 py-2.5 text-sm focus:border-forest focus:outline-none"
          />
        </div>
        <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)} className="rounded-xl border border-border bg-white px-4 py-2.5 text-sm">
          <option value="all">Toutes catégories</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Grid */}
      {loading ? (
        <p className="text-center text-muted-foreground py-12">Chargement...</p>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12">
          <Image className="mx-auto h-12 w-12 text-muted-foreground/30" />
          <p className="mt-3 text-muted-foreground">Aucune création trouvée</p>
          <button onClick={openCreate} className="mt-4 text-sm font-semibold text-forest">+ Ajouter une création</button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((item) => (
            <div key={item.id} className="group relative rounded-2xl border border-border bg-white overflow-hidden shadow-soft hover:shadow-lg transition-shadow">
              <div className="relative aspect-[4/5] bg-secondary overflow-hidden">
                {item.media_type === "video" ? (
                  <video src={item.media_url} className="h-full w-full object-cover" muted />
                ) : (
                  <img src={item.media_url} alt={item.titre} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                )}
                {!item.is_published && (
                  <div className="absolute top-2 left-2 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">Brouillon</div>
                )}
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(item)} className="rounded-lg bg-white/90 p-2 hover:bg-white shadow-sm">
                    <Edit3 className="h-3.5 w-3.5 text-forest" />
                  </button>
                  <button onClick={() => togglePublish(item)} className="rounded-lg bg-white/90 p-2 hover:bg-white shadow-sm">
                    {item.is_published ? <EyeOff className="h-3.5 w-3.5 text-muted-foreground" /> : <Eye className="h-3.5 w-3.5 text-forest" />}
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="rounded-lg bg-white/90 p-2 hover:bg-white shadow-sm">
                    <Trash2 className="h-3.5 w-3.5 text-red-500" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-sm text-foreground truncate">{item.titre}</h3>
                <p className="mt-1 text-[11px] text-muted-foreground">{new Date(item.created_at).toLocaleDateString("fr-FR")} · {item.format}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {(item.tags || []).slice(0, 3).map((t) => (
                    <span key={t} className="rounded-full bg-forest/10 px-2 py-0.5 text-[9px] font-medium text-forest">{t}</span>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between text-[10px] text-muted-foreground">
                  <span className="rounded bg-secondary px-2 py-0.5">{item.outil}</span>
                  <span className="rounded bg-amber/10 px-2 py-0.5 text-amber font-medium">{item.acces === "starter" ? "Gratuit" : item.acces === "club_ia" ? "Club IA" : "Pro"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowForm(false)}>
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 rounded-lg p-1 hover:bg-secondary">
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-bold text-foreground mb-6">{editItem ? "Modifier la création" : "Nouvelle création"}</h2>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Titre *</label>
                <input value={form.titre} onChange={(e) => setForm({ ...form, titre: e.target.value })} className="mt-1 w-full rounded-xl border border-border px-4 py-2.5 text-sm focus:border-forest focus:outline-none" />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Prompt IA *</label>
                <textarea value={form.prompt} onChange={(e) => setForm({ ...form, prompt: e.target.value })} rows={4} className="mt-1 w-full rounded-xl border border-border px-4 py-2.5 text-sm focus:border-forest focus:outline-none resize-none" placeholder="Le prompt utilisé pour générer cette image/vidéo..." />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Type de média</label>
                  <select value={form.media_type} onChange={(e) => setForm({ ...form, media_type: e.target.value as "image" | "video" })} className="mt-1 w-full rounded-xl border border-border px-4 py-2.5 text-sm">
                    <option value="image">Image</option>
                    <option value="video">Vidéo</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Outil utilisé</label>
                  <select value={form.outil} onChange={(e) => setForm({ ...form, outil: e.target.value })} className="mt-1 w-full rounded-xl border border-border px-4 py-2.5 text-sm">
                    {OUTILS.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">URL du média * ou upload</label>
                <input value={form.media_url} onChange={(e) => setForm({ ...form, media_url: e.target.value })} className="mt-1 w-full rounded-xl border border-border px-4 py-2.5 text-sm focus:border-forest focus:outline-none" placeholder="https://..." />
                <input type="file" accept="image/*,video/*" onChange={(e) => handleUpload(e, "media_url")} className="mt-2 text-xs text-muted-foreground" />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Thumbnail (optionnel)</label>
                <input value={form.thumbnail_url} onChange={(e) => setForm({ ...form, thumbnail_url: e.target.value })} className="mt-1 w-full rounded-xl border border-border px-4 py-2.5 text-sm focus:border-forest focus:outline-none" placeholder="https://..." />
                <input type="file" accept="image/*" onChange={(e) => handleUpload(e, "thumbnail_url")} className="mt-2 text-xs text-muted-foreground" />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Catégorie</label>
                  <select value={form.categorie} onChange={(e) => setForm({ ...form, categorie: e.target.value })} className="mt-1 w-full rounded-xl border border-border px-4 py-2.5 text-sm">
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Format</label>
                  <select value={form.format} onChange={(e) => setForm({ ...form, format: e.target.value })} className="mt-1 w-full rounded-xl border border-border px-4 py-2.5 text-sm">
                    {FORMATS.map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Accès</label>
                  <select value={form.acces} onChange={(e) => setForm({ ...form, acces: e.target.value })} className="mt-1 w-full rounded-xl border border-border px-4 py-2.5 text-sm">
                    <option value="starter">Starter (Gratuit)</option>
                    <option value="club_ia">Club IA</option>
                    <option value="pro_creator">Pro Creator</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tags (séparés par des virgules)</label>
                <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} className="mt-1 w-full rounded-xl border border-border px-4 py-2.5 text-sm focus:border-forest focus:outline-none" placeholder="portrait, neon, fashion, 3D..." />
              </div>

              {form.media_type === "video" && (
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Durée</label>
                  <input value={form.duree} onChange={(e) => setForm({ ...form, duree: e.target.value })} className="mt-1 w-full rounded-xl border border-border px-4 py-2.5 text-sm focus:border-forest focus:outline-none" placeholder="12s" />
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description (optionnel)</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className="mt-1 w-full rounded-xl border border-border px-4 py-2.5 text-sm focus:border-forest focus:outline-none resize-none" />
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} className="h-4 w-4 rounded border-border text-forest" />
                <label className="text-sm text-foreground">Publier immédiatement</label>
              </div>

              <div className="flex gap-3 pt-4">
                <button onClick={handleSave} className="flex-1 rounded-xl gradient-primary px-6 py-3 text-sm font-semibold text-white shadow-glow hover:scale-[1.01] transition-transform">
                  {editItem ? "Enregistrer" : "Créer"}
                </button>
                <button onClick={() => setShowForm(false)} className="rounded-xl border-2 border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-secondary transition-colors">
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
