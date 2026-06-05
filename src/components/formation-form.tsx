import { Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";

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
      navigate({ to: "/admin/formations" });
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>{titre}</h1>
        <Link to="/admin/formations" className="inline-flex items-center gap-1 text-sm text-forest font-medium hover:text-forest-light transition-colors">
          <ChevronLeft className="h-4 w-4" /> Retour
        </Link>
      </div>

      <form onSubmit={(e) => submit(e, true)} className="space-y-6">
        <Section titre="Infos générales">
          <Grid>
            <div>
              <Label>Titre *</Label>
              <input value={formTitre} onChange={(e) => { setFormTitre(e.target.value); if (!initial?.id) setSlug(generateSlug(e.target.value)); }} required className="mt-1 w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-forest/20" />
            </div>
            <div>
              <Label>Slug URL *</Label>
              <input value={slug} onChange={(e) => setSlug(e.target.value)} required className="mt-1 w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-forest/20" />
            </div>
            <div className="sm:col-span-2">
              <Label>Description</Label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="mt-1 w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-forest/20" />
            </div>
            <div>
              <Label>Catégorie</Label>
              <select value={categorie} onChange={(e) => setCategorie(e.target.value)} className="mt-1 w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-forest/20">
                {["IA","Design","Vidéo","Marketing","Réseaux","Business","Affiliation","Automatisation"].map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <Label>Niveau</Label>
              <select value={niveau} onChange={(e) => setNiveau(e.target.value)} className="mt-1 w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-forest/20">
                {["Débutant","Intermédiaire","Avancé"].map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <Label>Accès requis</Label>
              <select value={acces} onChange={(e) => setAcces(e.target.value)} className="mt-1 w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-forest/20">
                <option value="starter">Gratuit (Starter)</option>
                <option value="club_ia">Club IA</option>
                <option value="pro_creator">Pro Creator</option>
              </select>
            </div>
            <div>
              <Label>Durée totale (ex: 2h30)</Label>
              <input value={duree} onChange={(e) => setDuree(e.target.value)} className="mt-1 w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-forest/20" />
            </div>
            <div>
              <Label>Emoji</Label>
              <input value={emoji} onChange={(e) => setEmoji(e.target.value)} className="mt-1 w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-forest/20" />
            </div>
            <div>
              <Label>Nombre de modules</Label>
              <input type="number" min={1} value={nbModules} onChange={(e) => setNbModules(Number(e.target.value))} className="mt-1 w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-forest/20" />
            </div>
          </Grid>
        </Section>

        <Section titre="Ce que les apprenants vont apprendre">
          <div className="grid gap-2 sm:grid-cols-2">
            {apprentissages.map((a, i) => (
              <input key={i} value={a} onChange={(e) => { const n = [...apprentissages]; n[i] = e.target.value; setApprentissages(n); }} placeholder={`Point d'apprentissage ${i + 1}`} className="rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-forest/20" />
            ))}
          </div>
          <button type="button" onClick={() => setApprentissages([...apprentissages, ""])} className="mt-3 text-xs text-forest font-medium hover:text-forest-light">+ Ajouter un point</button>
        </Section>

        <div className="flex flex-wrap gap-3">
          <button type="submit" disabled={loading} className="rounded-full gradient-primary px-6 py-3 text-sm font-semibold text-white shadow-glow disabled:opacity-60 transition-transform hover:scale-[1.02]">
            {loading ? "Enregistrement..." : "Publier"}
          </button>
          <button type="button" disabled={loading} onClick={(e) => submit(e as unknown as React.FormEvent, false)} className="rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground hover:bg-secondary transition-colors">
            Enregistrer brouillon
          </button>
        </div>
      </form>
    </div>
  );
}

function Section({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
      <h2 className="font-semibold text-foreground">{titre}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>;
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{children}</label>;
}
