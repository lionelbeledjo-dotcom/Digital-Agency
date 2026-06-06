import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Plus, Edit3, Trash2, Eye, EyeOff, FileText, Search, X } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/blog")({
  component: AdminBlog,
});

interface Article {
  id: string;
  slug: string;
  titre: string;
  extrait: string;
  contenu: string;
  categorie: string;
  image_url: string;
  auteur: string;
  lecture: string;
  tags: string[];
  is_published: boolean;
  vues: number;
  created_at: string;
}

const CATEGORIES = ["IA", "Marketing", "Revenus", "Formations", "Actualites", "Tutoriel", "Tendances"];

function AdminBlog() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<Article | null>(null);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    titre: "", slug: "", extrait: "", contenu: "", categorie: "IA",
    image_url: "", auteur: "Lionel B.", lecture: "5 min", tags: "", is_published: false,
  });

  useEffect(() => { fetchArticles(); }, []);

  async function fetchArticles() {
    const { data, error } = await supabase.from("blog_articles").select("*").order("created_at", { ascending: false });
    if (error) toast.error("Erreur chargement blog");
    else setArticles(data || []);
    setLoading(false);
  }

  function openCreate() {
    setEditItem(null);
    setForm({ titre: "", slug: "", extrait: "", contenu: "", categorie: "IA", image_url: "", auteur: "Lionel B.", lecture: "5 min", tags: "", is_published: false });
    setShowForm(true);
  }

  function openEdit(a: Article) {
    setEditItem(a);
    setForm({ titre: a.titre, slug: a.slug, extrait: a.extrait, contenu: a.contenu, categorie: a.categorie, image_url: a.image_url || "", auteur: a.auteur, lecture: a.lecture || "5 min", tags: (a.tags || []).join(", "), is_published: a.is_published });
    setShowForm(true);
  }

  function generateSlug(titre: string) {
    return titre.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  async function handleSave() {
    if (!form.titre || !form.contenu) { toast.error("Titre et contenu obligatoires"); return; }
    const slug = form.slug || generateSlug(form.titre);
    const payload = {
      titre: form.titre, slug, extrait: form.extrait, contenu: form.contenu,
      categorie: form.categorie, image_url: form.image_url || null, auteur: form.auteur,
      lecture: form.lecture, tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
      is_published: form.is_published, updated_at: new Date().toISOString(),
    };

    if (editItem) {
      const { error } = await supabase.from("blog_articles").update(payload).eq("id", editItem.id);
      if (error) { toast.error("Erreur mise a jour"); return; }
      toast.success("Article mis a jour !");
    } else {
      const { error } = await supabase.from("blog_articles").insert(payload);
      if (error) { toast.error("Erreur creation"); return; }
      toast.success("Article cree !");
    }
    setShowForm(false);
    fetchArticles();
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer cet article ?")) return;
    await supabase.from("blog_articles").delete().eq("id", id);
    toast.success("Supprime !");
    setArticles(articles.filter(a => a.id !== id));
  }

  async function togglePublish(a: Article) {
    await supabase.from("blog_articles").update({ is_published: !a.is_published }).eq("id", a.id);
    setArticles(articles.map(x => x.id === a.id ? { ...x, is_published: !x.is_published } : x));
  }

  const filtered = articles.filter(a => !search || a.titre.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>Blog</h1>
        <button onClick={openCreate} className="rounded-full gradient-primary px-5 py-2.5 text-sm font-semibold text-white flex items-center gap-2 shadow-glow transition-transform hover:scale-[1.02]">
          <Plus className="h-4 w-4" /> Nouvel article
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { l: "Total articles", v: articles.length, bg: "bg-forest" },
          { l: "Publies", v: articles.filter(a => a.is_published).length, bg: "bg-forest-light" },
          { l: "Brouillons", v: articles.filter(a => !a.is_published).length, bg: "bg-amber" },
        ].map(s => (
          <div key={s.l} className={`rounded-2xl ${s.bg} p-5 shadow-soft`}>
            <p className="text-xs uppercase tracking-wider text-white/70">{s.l}</p>
            <p className="mt-2 text-3xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>{s.v}</p>
          </div>
        ))}
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher un article..." className="w-full rounded-xl border border-border bg-white pl-10 pr-4 py-2.5 text-sm focus:border-forest focus:outline-none" />
      </div>

      {loading ? <p className="text-muted-foreground py-12 text-center">Chargement...</p> : filtered.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-muted-foreground/30" />
          <p className="mt-3 text-muted-foreground">Aucun article</p>
          <button onClick={openCreate} className="mt-4 text-sm font-semibold text-forest">+ Creer un article</button>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(a => (
            <div key={a.id} className="flex items-center gap-4 rounded-2xl border border-border bg-white p-4 shadow-soft">
              {a.image_url && <img src={a.image_url} alt="" className="h-16 w-24 rounded-xl object-cover" />}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">{a.titre}</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">{a.categorie} · {a.auteur} · {a.lecture} · {a.vues} vues</p>
              </div>
              <div className="flex items-center gap-2">
                {a.is_published ? (
                  <span className="rounded-full bg-forest/10 px-2.5 py-1 text-[10px] font-medium text-forest">Publie</span>
                ) : (
                  <span className="rounded-full bg-amber/10 px-2.5 py-1 text-[10px] font-medium text-amber">Brouillon</span>
                )}
                <button onClick={() => openEdit(a)} className="rounded-lg p-2 hover:bg-secondary"><Edit3 className="h-4 w-4 text-forest" /></button>
                <button onClick={() => togglePublish(a)} className="rounded-lg p-2 hover:bg-secondary">
                  {a.is_published ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-forest" />}
                </button>
                <button onClick={() => handleDelete(a.id)} className="rounded-lg p-2 hover:bg-secondary"><Trash2 className="h-4 w-4 text-red-500" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowForm(false)}>
          <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-6 shadow-xl" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 rounded-lg p-1 hover:bg-secondary"><X className="h-5 w-5" /></button>
            <h2 className="text-xl font-bold text-foreground mb-6">{editItem ? "Modifier l'article" : "Nouvel article"}</h2>
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div><label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Titre *</label><input value={form.titre} onChange={e => setForm({ ...form, titre: e.target.value, slug: form.slug || generateSlug(e.target.value) })} className="mt-1 w-full rounded-xl border border-border px-4 py-2.5 text-sm focus:border-forest focus:outline-none" /></div>
                <div><label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Slug</label><input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} className="mt-1 w-full rounded-xl border border-border px-4 py-2.5 text-sm focus:border-forest focus:outline-none" /></div>
              </div>
              <div><label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Extrait</label><textarea value={form.extrait} onChange={e => setForm({ ...form, extrait: e.target.value })} rows={2} className="mt-1 w-full rounded-xl border border-border px-4 py-2.5 text-sm focus:border-forest focus:outline-none resize-none" /></div>
              <div><label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Contenu * (Markdown)</label><textarea value={form.contenu} onChange={e => setForm({ ...form, contenu: e.target.value })} rows={12} className="mt-1 w-full rounded-xl border border-border px-4 py-2.5 text-sm font-mono focus:border-forest focus:outline-none resize-none" /></div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div><label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Categorie</label><select value={form.categorie} onChange={e => setForm({ ...form, categorie: e.target.value })} className="mt-1 w-full rounded-xl border border-border px-4 py-2.5 text-sm">{CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                <div><label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Auteur</label><input value={form.auteur} onChange={e => setForm({ ...form, auteur: e.target.value })} className="mt-1 w-full rounded-xl border border-border px-4 py-2.5 text-sm focus:border-forest focus:outline-none" /></div>
                <div><label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Temps de lecture</label><input value={form.lecture} onChange={e => setForm({ ...form, lecture: e.target.value })} className="mt-1 w-full rounded-xl border border-border px-4 py-2.5 text-sm focus:border-forest focus:outline-none" /></div>
              </div>
              <div><label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Image (URL)</label><input value={form.image_url} onChange={e => setForm({ ...form, image_url: e.target.value })} className="mt-1 w-full rounded-xl border border-border px-4 py-2.5 text-sm focus:border-forest focus:outline-none" placeholder="https://..." /></div>
              <div><label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tags (virgules)</label><input value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} className="mt-1 w-full rounded-xl border border-border px-4 py-2.5 text-sm focus:border-forest focus:outline-none" placeholder="IA, ChatGPT, revenus..." /></div>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={form.is_published} onChange={e => setForm({ ...form, is_published: e.target.checked })} className="h-4 w-4 rounded border-border text-forest" />
                <label className="text-sm text-foreground">Publier immediatement</label>
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={handleSave} className="flex-1 rounded-xl gradient-primary px-6 py-3 text-sm font-semibold text-white shadow-glow hover:scale-[1.01] transition-transform">{editItem ? "Enregistrer" : "Creer"}</button>
                <button onClick={() => setShowForm(false)} className="rounded-xl border-2 border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-secondary transition-colors">Annuler</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
