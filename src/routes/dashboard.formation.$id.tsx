import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useAppStore } from "@/store/appStore";
import { supabase } from "@/lib/supabase";
import { CheckCircle2, Circle, ChevronLeft, ChevronRight, Play, FileText, MessageSquare, BookOpen } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

export const Route = createFileRoute("/dashboard/formation/$id")({
  component: FormationLecture,
});

interface RealLecon {
  titre: string;
  duree: string;
  video_type: "youtube" | "upload" | "vimeo";
  video_url: string;
}

interface RealModule {
  titre: string;
  lecons: RealLecon[];
}

function FormationLecture() {
  const { id } = useParams({ from: "/dashboard/formation/$id" });
  const formation = useAppStore((s) => s.getFormation(id));
  const [done, setDone] = useState<string[]>([]);
  const [current, setCurrent] = useState<{ m: number; l: number }>({ m: 0, l: 0 });
  const [activeTab, setActiveTab] = useState(0);
  const [realModules, setRealModules] = useState<RealModule[] | null>(null);

  const fetchRealModules = useCallback(async () => {
    const { data: mods } = await supabase
      .from("modules")
      .select("id, titre, position")
      .eq("formation_id", id)
      .order("position");

    if (mods && mods.length > 0) {
      const { data: lecs } = await supabase
        .from("lecons")
        .select("module_id, titre, duree, video_type, video_url")
        .in("module_id", mods.map((m) => m.id))
        .order("position");

      setRealModules(mods.map((m) => ({
        titre: m.titre,
        lecons: (lecs || []).filter((l) => l.module_id === m.id).map((l) => ({
          titre: l.titre,
          duree: l.duree || "",
          video_type: l.video_type || "youtube",
          video_url: l.video_url || "",
        })),
      })));
    }
  }, [id]);

  useEffect(() => { fetchRealModules(); }, [fetchRealModules]);

  if (!formation) return <div className="p-8"><h1 className="text-2xl font-bold text-foreground">Formation introuvable</h1></div>;

  const allLessons = formation.programme.flatMap((m, mi) => m.lecons.map((l, li) => ({ ...l, m: mi, l: li, key: `${mi}-${li}` })));
  const totalLessons = allLessons.length;
  const progress = Math.round((done.length / totalLessons) * 100);
  const currentLesson = formation.programme[current.m]?.lecons[current.l];
  const currentKey = `${current.m}-${current.l}`;

  const goPrev = () => {
    const idx = allLessons.findIndex((l) => l.key === currentKey);
    if (idx > 0) { const p = allLessons[idx - 1]; setCurrent({ m: p.m, l: p.l }); }
  };
  const goNext = () => {
    const idx = allLessons.findIndex((l) => l.key === currentKey);
    if (idx < allLessons.length - 1) { const n = allLessons[idx + 1]; setCurrent({ m: n.m, l: n.l }); }
  };
  const toggleDone = () => setDone((d) => d.includes(currentKey) ? d.filter((x) => x !== currentKey) : [...d, currentKey]);

  const tabItems = [
    { label: "Description", Icon: BookOpen },
    { label: "Ressources", Icon: FileText },
    { label: "Discussion", Icon: MessageSquare },
  ];

  return (
    <div className="space-y-4">
      <Link to="/dashboard/formations" className="inline-flex items-center gap-1 text-sm text-forest font-medium hover:text-forest-light transition-colors">
        <ChevronLeft className="h-4 w-4" /> Retour aux formations
      </Link>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Sidebar */}
        <aside className="rounded-2xl border border-border bg-white p-4 shadow-soft h-fit lg:sticky lg:top-20">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest/10 text-xl">{formation.emoji}</div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-foreground truncate">{formation.titre}</p>
              <p className="text-[10px] text-muted-foreground">{formation.modules} modules · {formation.duree}</p>
            </div>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-secondary">
            <div className="h-full gradient-primary rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{progress}% terminé · {done.length}/{totalLessons} leçons</p>

          <div className="mt-5 space-y-4">
            {formation.programme.map((m, mi) => (
              <div key={mi}>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-amber">Module {mi + 1}</p>
                <p className="text-xs font-semibold text-foreground mt-0.5">{m.titre}</p>
                <ul className="mt-2 space-y-0.5">
                  {m.lecons.map((l, li) => {
                    const k = `${mi}-${li}`;
                    const isCurr = currentKey === k;
                    const isDone = done.includes(k);
                    return (
                      <li key={li}>
                        <button onClick={() => setCurrent({ m: mi, l: li })} className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs transition-colors ${isCurr ? "bg-forest/10 text-forest font-medium" : "text-muted-foreground hover:bg-secondary"}`}>
                          {isDone ? <CheckCircle2 className="h-3.5 w-3.5 text-forest shrink-0" /> : <Circle className="h-3.5 w-3.5 shrink-0" />}
                          <span className="flex-1 truncate">{l.titre}</span>
                          <span className="text-[10px]">{l.duree}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </aside>

        {/* Player */}
        <main className="rounded-2xl border border-border bg-white overflow-hidden shadow-soft">
          <VideoPlayer
            modules={realModules}
            fallbackProgramme={formation.programme}
            currentM={current.m}
            currentL={current.l}
            lessonTitle={currentLesson?.titre}
            lessonDuree={currentLesson?.duree}
          />
          <div className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>{currentLesson?.titre}</h1>
                <p className="mt-1 text-xs text-muted-foreground">Module {current.m + 1} · Leçon {current.l + 1} · {currentLesson?.duree}</p>
              </div>
              <button onClick={toggleDone} className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-all ${done.includes(currentKey) ? "bg-forest/10 text-forest" : "gradient-primary text-white shadow-glow"}`}>
                {done.includes(currentKey) ? "✓ Terminée" : "Marquer terminée"}
              </button>
            </div>

            <div className="mt-5 flex items-center gap-2">
              <button onClick={goPrev} className="rounded-full border border-border px-4 py-2 text-xs flex items-center gap-1 text-foreground hover:bg-secondary transition-colors"><ChevronLeft className="h-3 w-3" /> Précédente</button>
              <button onClick={goNext} className="rounded-full border border-border px-4 py-2 text-xs flex items-center gap-1 text-foreground hover:bg-secondary transition-colors">Suivante <ChevronRight className="h-3 w-3" /></button>
            </div>

            <div className="mt-8 border-t border-border pt-6">
              <div className="flex gap-1 rounded-xl bg-secondary p-1">
                {tabItems.map((t, i) => (
                  <button key={t.label} onClick={() => setActiveTab(i)} className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-medium transition-colors ${activeTab === i ? "bg-white text-forest shadow-soft" : "text-muted-foreground"}`}>
                    <t.Icon className="h-3.5 w-3.5" /> {t.label}
                  </button>
                ))}
              </div>

              <div className="mt-4">
                {activeTab === 0 && (
                  <p className="text-sm text-muted-foreground leading-relaxed">Dans cette leçon, tu vas apprendre les bases pour démarrer et appliquer la méthode pas-à-pas. Chaque concept est illustré par un exemple concret que tu peux reproduire immédiatement.</p>
                )}
                {activeTab === 1 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 rounded-xl border border-border p-3">
                      <FileText className="h-5 w-5 text-forest" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">Template PDF</p>
                        <p className="text-xs text-muted-foreground">Guide pratique de la leçon</p>
                      </div>
                      <button className="rounded-full bg-forest/10 px-3 py-1 text-xs font-medium text-forest">Télécharger</button>
                    </div>
                    <div className="flex items-center gap-3 rounded-xl border border-border p-3">
                      <FileText className="h-5 w-5 text-amber" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">Checklist d'action</p>
                        <p className="text-xs text-muted-foreground">Les étapes à suivre</p>
                      </div>
                      <button className="rounded-full bg-forest/10 px-3 py-1 text-xs font-medium text-forest">Télécharger</button>
                    </div>
                  </div>
                )}
                {activeTab === 2 && (
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">Pose tes questions et échange avec la communauté.</p>
                    <textarea placeholder="Écris ton message..." className="w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-forest/20" rows={3} />
                    <button className="rounded-full gradient-primary px-4 py-2 text-xs font-semibold text-white">Envoyer</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function VideoPlayer({ modules, fallbackProgramme, currentM, currentL, lessonTitle, lessonDuree }: {
  modules: RealModule[] | null;
  fallbackProgramme: { titre: string; lecons: { titre: string; duree: string }[] }[];
  currentM: number;
  currentL: number;
  lessonTitle?: string;
  lessonDuree?: string;
}) {
  const realLecon = modules?.[currentM]?.lecons[currentL];

  if (realLecon?.video_url) {
    const url = realLecon.video_url;

    if (realLecon.video_type === "youtube") {
      const videoId = extractYouTubeId(url);
      if (videoId) {
        return (
          <div className="relative aspect-video bg-black rounded-t-2xl overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?rel=0`}
              className="h-full w-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        );
      }
    }

    if (realLecon.video_type === "vimeo") {
      const vimeoId = url.match(/vimeo\.com\/(\d+)/)?.[1];
      if (vimeoId) {
        return (
          <div className="relative aspect-video bg-black rounded-t-2xl overflow-hidden">
            <iframe
              src={`https://player.vimeo.com/video/${vimeoId}`}
              className="h-full w-full"
              allowFullScreen
            />
          </div>
        );
      }
    }

    if (realLecon.video_type === "upload") {
      return (
        <div className="relative aspect-video bg-black rounded-t-2xl overflow-hidden">
          <video src={url} controls className="h-full w-full" />
        </div>
      );
    }
  }

  return (
    <div className="relative aspect-video bg-forest/5 flex items-center justify-center">
      <div className="text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-forest/10 mx-auto">
          <Play className="h-8 w-8 text-forest" />
        </div>
        <p className="mt-3 text-sm text-muted-foreground">Vidéo bientôt disponible</p>
        <p className="text-xs text-muted-foreground mt-1">{lessonTitle} · {lessonDuree}</p>
      </div>
    </div>
  );
}

function extractYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?\s]+)/);
  return match?.[1] || null;
}
