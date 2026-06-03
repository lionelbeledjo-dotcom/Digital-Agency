import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useAppStore } from "@/store/appStore";
import { CheckCircle2, Circle, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/dashboard/formation/$id")({
  component: FormationLecture,
});

function FormationLecture() {
  const { id } = useParams({ from: "/dashboard/formation/$id" });
  const formation = useAppStore((s) => s.getFormation(id));
  const [done, setDone] = useState<string[]>([]);
  const [current, setCurrent] = useState<{ m: number; l: number }>({ m: 0, l: 0 });

  if (!formation) return <div className="p-8"><h1 className="text-2xl font-bold">Formation introuvable</h1></div>;

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

  return (
    <div className="space-y-4">
      <Link to="/dashboard/formations" className="text-sm text-sky">← Retour</Link>
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Sidebar */}
        <aside className="rounded-2xl border border-border bg-card p-4">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">{formation.titre}</p>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary">
            <div className="h-full gradient-cobalt" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{progress}% terminé</p>
          <div className="mt-5 space-y-3">
            {formation.programme.map((m, mi) => (
              <div key={mi}>
                <p className="text-xs font-semibold uppercase tracking-wider text-sky">Module {mi + 1}</p>
                <p className="text-sm font-semibold">{m.titre}</p>
                <ul className="mt-2 space-y-1">
                  {m.lecons.map((l, li) => {
                    const k = `${mi}-${li}`;
                    const isCurr = currentKey === k;
                    const isDone = done.includes(k);
                    return (
                      <li key={li}>
                        <button onClick={() => setCurrent({ m: mi, l: li })} className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs ${isCurr ? "bg-cobalt/20 text-foreground" : "text-muted-foreground hover:bg-secondary"}`}>
                          {isDone ? <CheckCircle2 className="h-3.5 w-3.5 text-green" /> : <Circle className="h-3.5 w-3.5" />}
                          <span className="flex-1 truncate">{l.titre}</span>
                          <span>{l.duree}</span>
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
        <main className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="relative aspect-video bg-navy">
            <iframe className="h-full w-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ" allowFullScreen />
          </div>
          <div className="p-6">
            <h1 className="text-2xl font-bold">{currentLesson?.titre}</h1>
            <p className="mt-1 text-xs text-muted-foreground">Durée : {currentLesson?.duree}</p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button onClick={goPrev} className="rounded-full border border-border px-4 py-2 text-sm flex items-center gap-1"><ChevronLeft className="h-4 w-4" /> Précédente</button>
              <button onClick={goNext} className="rounded-full border border-border px-4 py-2 text-sm flex items-center gap-1">Suivante <ChevronRight className="h-4 w-4" /></button>
              <button onClick={toggleDone} className={`ml-auto rounded-full px-5 py-2 text-sm font-semibold ${done.includes(currentKey) ? "bg-green/20 text-green" : "gradient-cobalt text-white"}`}>
                {done.includes(currentKey) ? "✓ Terminée" : "✓ Marquer comme terminée"}
              </button>
            </div>

            <div className="mt-8 border-t border-border pt-6">
              <div className="flex gap-6 text-sm font-semibold border-b border-border">
                {["Description","Ressources","Notes","Discussion"].map((t, i) => (
                  <button key={t} className={`pb-3 ${i === 0 ? "border-b-2 border-cobalt text-foreground" : "text-muted-foreground"}`}>{t}</button>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted-foreground">Dans cette leçon, tu vas apprendre les bases pour démarrer et appliquer la méthode pas-à-pas.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
