import { Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useState } from "react";
import { ChevronLeft, BookOpen, Sparkles } from "lucide-react";

interface FormationData {
  id?: string;
  slug?: string;
  titre?: string;
  description?: string;
  categorie?: string;
  niveau?: string;
  acces?: string;
  duree?: string;
  emoji?: string;
  modules?: number;
  apprentissages?: string[];
}

export function FormationForm({ titre = "Nouvelle formation", initial }: { titre?: string; initial?: FormationData }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formTitre, setFormTitre] = useState(initial?.titre || "");
  const [slug, setSlug] = useState(initial?.slug || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [categorie, setCategorie] = useState(initial?.categorie || "IA");
  const [niveau, setNiveau] = useState(initial?.niveau || "Débutant");
  const [acces, setAcces] = useState(initial?.acces || "starter");
  const [duree, setDuree] = useState(initial?.duree || "");
  const [emoji, setEmoji] = useState(initial?.emoji || "🤖");
  const [nbModules, setNbModules] = useState(initial?.modules || 1);
  const [apprentissages, setApprentissages] = useState<string[]>(initial?.apprentissages || ["", "", "", "", "", ""]);

  function generateSlug(t: string) {
    return t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  async function submit(e: React.FormEvent, publie: boolean) {
    e.preventDefault();
    if (!formTitre || !slug) {
      toast.error("Titre et slug sont obligatoires.");
      return;
    }

    setLoading(true);

    const payload = {
      slug,
      titre: formTitre,
      description,
      categorie,
      niveau,
      acces,
      duree,
      emoji,
      modules: nbModules,
      apprentissages: apprentissages.filter(Boolean),
      publie,
    };

    let error;
    if (initial?.id) {
      ({ error } = await supabase.from("formations").update(payload).eq("id", initial.id));
    } else {
      ({ error } = await supabase.from("formations").insert(payload));
    }

    setLoading(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(publie ? "Formation publiée !" : "Brouillon enregistré !");
      navigate({ to: "/admin" });
    }
  }

  return (
    <div className="min-h-screen bg-secondary py-8 px-4 sm:px-6">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Header sticky */}
        <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-soft border border-border sticky top-4 z-10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest/10">
              <BookOpen className="h-5 w-5 text-forest" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>{titre}</h1>
              <p className="text-xs text-muted-foreground">Remplis les infos et publie</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" disabled={loading} onClick={(e) => submit(e as unknown as React.FormEvent, false)} className="rounded-full border border-border px-4 py-2 text-xs font-medium text-foreground hover:bg-secondary transition-colors">
              Brouillon
            </button>
            <button type="button" disabled={loading} onClick={(e) => submit(e as unknown as React.FormEvent, true)} className="rounded-full gradient-primary px-5 py-2 text-xs font-semibold text-white shadow-glow transition-transform hover:scale-[1.02] disabled:opacity-60">
              {loading ? "..." : "Publier"}
            </button>
            <a href="/admin" className="ml-2 rounded-full border border-border p-2 text-muted-foreground hover:text-forest hover:bg-secondary transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </a>
          </div>
        </div>

        <form onSubmit={(e) => submit(e, true)} className="space-y-5">
          {/* Infos générales */}
          <div className="rounded-2xl border border-border bg-white p-5 shadow-soft">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-4 w-4 text-amber" />
              <h2 className="font-semibold text-foreground text-sm">Infos générales</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Titre *</Label>
                <input value={formTitre} onChange={(e) => { setFormTitre(e.target.value); if (!initial?.id) setSlug(generateSlug(e.target.value)); }} required placeholder="Ex: ChatGPT pour débutants" className="input-field" />
              </div>
              <div>
                <Label>Slug URL *</Label>
                <input value={slug} onChange={(e) => setSlug(e.target.value)} required placeholder="chatgpt-debutants" className="input-field" />
              </div>
              <div className="sm:col-span-2">
                <Label>Description</Label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} placeholder="Description courte de la formation..." className="input-field resize-none" />
              </div>
              <div>
                <Label>Catégorie</Label>
                <select value={categorie} onChange={(e) => setCategorie(e.target.value)} className="input-field">
                  {["IA","Design","Vidéo","Marketing","Réseaux","Business","Affiliation","Automatisation"].map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <Label>Niveau</Label>
                <select value={niveau} onChange={(e) => setNiveau(e.target.value)} className="input-field">
                  {["Débutant","Intermédiaire","Avancé"].map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <Label>Accès requis</Label>
                <select value={acces} onChange={(e) => setAcces(e.target.value)} className="input-field">
                  <option value="starter">Gratuit (Starter)</option>
                  <option value="club_ia">Club IA</option>
                  <option value="pro_creator">Pro Creator</option>
                </select>
              </div>
              <div>
                <Label>Durée totale</Label>
                <input value={duree} onChange={(e) => setDuree(e.target.value)} placeholder="2h30" className="input-field" />
              </div>
              <div>
                <Label>Emoji</Label>
                <input value={emoji} onChange={(e) => setEmoji(e.target.value)} className="input-field text-2xl" />
              </div>
              <div>
                <Label>Modules</Label>
                <input type="number" min={1} value={nbModules} onChange={(e) => setNbModules(Number(e.target.value))} className="input-field" />
              </div>
            </div>
          </div>

          {/* Apprentissages */}
          <div className="rounded-2xl border border-border bg-white p-5 shadow-soft">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-4 w-4 text-forest" />
              <h2 className="font-semibold text-foreground text-sm">Points d'apprentissage</h2>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {apprentissages.map((a, i) => (
                <input key={i} value={a} onChange={(e) => { const n = [...apprentissages]; n[i] = e.target.value; setApprentissages(n); }} placeholder={`Point ${i + 1}`} className="input-field text-sm" />
              ))}
            </div>
            <button type="button" onClick={() => setApprentissages([...apprentissages, ""])} className="mt-3 text-xs text-forest font-medium hover:text-forest-light transition-colors">+ Ajouter un point</button>
          </div>
        </form>
      </div>

      <style>{`
        .input-field {
          margin-top: 0.25rem;
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid var(--border);
          background: var(--secondary);
          padding: 0.625rem 1rem;
          font-size: 0.875rem;
          color: var(--foreground);
          outline: none;
          transition: box-shadow 0.2s;
        }
        .input-field:focus {
          box-shadow: 0 0 0 2px rgba(26, 92, 58, 0.15);
        }
      `}</style>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{children}</label>;
}
