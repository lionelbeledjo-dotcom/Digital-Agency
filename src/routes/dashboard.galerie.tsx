import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";
import { useAppStore } from "@/store/appStore";
import { useEffect, useState } from "react";
import { Search, Image, Play, Copy, CheckCircle2, Lock, X, Upload, Sparkles } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/galerie")({
  component: DashboardGalerie,
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
  created_at: string;
}

const planRank: Record<string, number> = { starter: 0, club_ia: 1, pro_creator: 2 };

function DashboardGalerie() {
  const currentUser = useAppStore((s) => s.currentUser);
  const [items, setItems] = useState<GalerieItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("Tout");
  const [selectedItem, setSelectedItem] = useState<GalerieItem | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showRecreate, setShowRecreate] = useState(false);
  const [copied, setCopied] = useState(false);

  const userPlan = currentUser?.plan || "starter";
  const userRank = planRank[userPlan] ?? 0;

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    const { data, error } = await supabase
      .from("galerie")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false });
    if (error) {
      console.error(error);
    } else {
      setItems(data || []);
    }
    setLoading(false);
  }

  const allTags = ["Tout", ...Array.from(new Set(items.flatMap((i) => i.tags || [])))];

  const filtered = items.filter((i) => {
    if (activeTag !== "Tout" && !(i.tags || []).includes(activeTag)) return false;
    if (search && !i.titre.toLowerCase().includes(search.toLowerCase()) && !(i.tags || []).some(t => t.toLowerCase().includes(search.toLowerCase()))) return false;
    return true;
  });

  function canAccess(item: GalerieItem) {
    return userRank >= (planRank[item.acces] ?? 0);
  }

  function handleCopyPrompt(prompt: string) {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    toast.success("Prompt copié !");
    setTimeout(() => setCopied(false), 2000);
  }

  function openDetail(item: GalerieItem) {
    if (!canAccess(item)) {
      toast.error("Passe au plan supérieur pour accéder à ce contenu");
      return;
    }
    setSelectedItem(item);
    setShowPrompt(true);
  }

  function openRecreate(item: GalerieItem) {
    if (!canAccess(item)) {
      toast.error("Passe au plan supérieur pour recréer");
      return;
    }
    setSelectedItem(item);
    setShowRecreate(true);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>Galerie IA</h1>
        <p className="mt-1 text-muted-foreground">Explore les créations, copie les prompts et recrée avec tes propres photos.</p>
      </div>

      {/* Search */}
      <div className="relative max-w-lg">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher des prompts, titres ou tags..."
          className="w-full rounded-xl border border-border bg-white pl-10 pr-4 py-3 text-sm focus:border-forest focus:outline-none"
        />
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              activeTag === tag
                ? "bg-forest text-white"
                : "border border-border bg-white text-foreground hover:border-forest/30"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <p className="text-center text-muted-foreground py-12">Chargement...</p>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12">
          <Image className="mx-auto h-12 w-12 text-muted-foreground/30" />
          <p className="mt-3 text-muted-foreground">Aucune création trouvée</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((item) => {
            const locked = !canAccess(item);
            return (
              <div key={item.id} className="group relative rounded-2xl border border-border bg-white overflow-hidden shadow-soft hover:shadow-lg transition-all">
                <div className="relative aspect-[4/5] bg-secondary overflow-hidden">
                  {item.media_type === "video" ? (
                    <video src={item.media_url} className="h-full w-full object-cover" muted poster={item.thumbnail_url || undefined} />
                  ) : (
                    <img src={item.media_url} alt={item.titre} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  )}
                  {item.media_type === "video" && (
                    <div className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[10px] text-white">
                      <Play className="h-3 w-3" /> {item.duree || "Vidéo"}
                    </div>
                  )}
                  {locked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                      <div className="flex flex-col items-center gap-1 text-white">
                        <Lock className="h-6 w-6" />
                        <span className="text-xs font-semibold">{item.acces === "club_ia" ? "Club IA" : "Pro Creator"}</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm text-foreground">{item.titre}</h3>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{new Date(item.created_at).toLocaleDateString("fr-FR")} · {item.format}</p>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => openRecreate(item)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${locked ? "bg-secondary text-muted-foreground" : "bg-forest text-white hover:bg-forest-light"}`}
                    >
                      Recréer
                    </button>
                    <button
                      onClick={() => openDetail(item)}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${locked ? "border-border text-muted-foreground" : "border-forest/20 text-forest hover:border-forest/40"}`}
                    >
                      Voir le prompt
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal — Voir le prompt */}
      {showPrompt && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowPrompt(false)}>
          <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowPrompt(false)} className="absolute top-4 right-4 rounded-lg p-1 hover:bg-secondary">
              <X className="h-5 w-5" />
            </button>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="aspect-square overflow-hidden rounded-2xl bg-secondary">
                {selectedItem.media_type === "video" ? (
                  <video src={selectedItem.media_url} controls className="h-full w-full object-cover" />
                ) : (
                  <img src={selectedItem.media_url} alt={selectedItem.titre} className="h-full w-full object-cover" />
                )}
              </div>
              <div className="flex flex-col">
                <h2 className="text-xl font-bold text-foreground">{selectedItem.titre}</h2>
                <p className="mt-1 text-xs text-muted-foreground">{selectedItem.outil} · {selectedItem.format} · {new Date(selectedItem.created_at).toLocaleDateString("fr-FR")}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {(selectedItem.tags || []).map((t) => (
                    <span key={t} className="rounded-full bg-forest/10 px-2.5 py-0.5 text-[10px] font-medium text-forest">{t}</span>
                  ))}
                </div>

                {selectedItem.description && (
                  <p className="mt-4 text-sm text-muted-foreground">{selectedItem.description}</p>
                )}

                <div className="mt-4 flex-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Prompt</label>
                  <div className="mt-2 rounded-xl bg-secondary/70 p-4 text-sm leading-relaxed text-foreground font-mono">
                    {selectedItem.prompt}
                  </div>
                </div>

                <button
                  onClick={() => handleCopyPrompt(selectedItem.prompt)}
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl gradient-primary px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.01]"
                >
                  {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copié !" : "Copier le prompt"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal — Recréer */}
      {showRecreate && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowRecreate(false)}>
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowRecreate(false)} className="absolute top-4 right-4 rounded-lg p-1 hover:bg-secondary">
              <X className="h-5 w-5" />
            </button>

            <div className="text-center">
              <Sparkles className="mx-auto h-10 w-10 text-forest" />
              <h2 className="mt-3 text-xl font-bold text-foreground">Recréer cette image</h2>
              <p className="mt-1 text-sm text-muted-foreground">Uploade ta photo pour recréer ce style avec le même prompt</p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl overflow-hidden border border-border">
                <img src={selectedItem.media_url} alt={selectedItem.titre} className="h-48 w-full object-cover" />
                <p className="p-3 text-center text-xs font-medium text-muted-foreground">Résultat original</p>
              </div>
              <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border p-6 hover:border-forest/30 transition-colors">
                <Upload className="h-8 w-8 text-muted-foreground/50" />
                <p className="mt-2 text-sm font-medium text-foreground">Ta photo</p>
                <p className="text-xs text-muted-foreground">Clique ou glisse ta photo ici</p>
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 cursor-pointer opacity-0"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      toast.success("Photo reçue ! La recréation sera bientôt disponible.");
                      setShowRecreate(false);
                    }
                  }}
                />
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-secondary/70 p-4">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Prompt utilisé</label>
              <p className="mt-1 text-sm text-foreground font-mono">{selectedItem.prompt}</p>
            </div>

            <button
              onClick={() => {
                toast.info("Fonctionnalité bientôt disponible ! En attendant, copie le prompt et utilise-le directement.");
                handleCopyPrompt(selectedItem.prompt);
                setShowRecreate(false);
              }}
              className="mt-6 w-full rounded-xl gradient-primary px-6 py-3 text-sm font-semibold text-white shadow-glow hover:scale-[1.01] transition-transform"
            >
              Lancer la recréation
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
