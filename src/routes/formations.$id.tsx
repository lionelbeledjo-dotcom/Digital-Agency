import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { PublicLayout } from "@/components/public-layout";
import { useAppStore } from "@/store/appStore";
import { CheckCircle2, ChevronRight, Clock, Users, Star, BookOpen } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/formations/$id")({
  component: FormationDetailPage,
});

function FormationDetailPage() {
  const { id } = useParams({ from: "/formations/$id" });
  const formation = useAppStore((s) => s.getFormation(id));
  const allFormations = useAppStore((s) => s.formations);
  const others = useMemo(() => allFormations.filter((f) => f.id !== id).slice(0, 3), [allFormations, id]);
  const isLoggedIn = useAppStore((s) => s.isLoggedIn);
  const [openModule, setOpenModule] = useState(0);

  if (!formation) {
    return (
      <PublicLayout>
        <div className="mx-auto max-w-md px-4 py-32 text-center">
          <h1 className="text-2xl font-bold text-foreground">Formation introuvable</h1>
          <Link to="/formations" className="mt-6 inline-block rounded-full gradient-primary px-6 py-3 font-semibold text-white">Retour au catalogue</Link>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <section className="relative bg-forest py-14">
        <div className="absolute inset-0 bg-dots opacity-10" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <nav className="mb-4 flex items-center gap-1 text-xs text-white/80">
            <Link to="/" className="hover:text-white">Accueil</Link><ChevronRight className="h-3 w-3" />
            <Link to="/formations" className="hover:text-white">Formations</Link><ChevronRight className="h-3 w-3" />
            <span className="text-white">{formation.titre}</span>
          </nav>
          <div className="grid items-end gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">{formation.categorie}</span>
              <h1 className="mt-4 text-3xl font-bold text-white sm:text-5xl">{formation.titre}</h1>
              <p className="mt-3 max-w-2xl text-white/80">{formation.description}</p>
              <div className="mt-6 flex flex-wrap gap-5 text-sm text-white/90">
                <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> {formation.duree}</span>
                <span className="flex items-center gap-2"><BookOpen className="h-4 w-4" /> {formation.modules} modules</span>
                <span className="flex items-center gap-2"><Users className="h-4 w-4" /> {formation.inscrits.toLocaleString("fr-FR")} inscrits</span>
                <span className="flex items-center gap-2"><Star className="h-4 w-4 fill-amber text-amber" /> {formation.note}/5</span>
              </div>
            </div>
            <div className="text-7xl sm:text-8xl">{formation.emoji}</div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Ce que tu vas apprendre</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {formation.apprentissages.map((a) => (
                  <li key={a} className="flex gap-2 text-sm text-muted-foreground"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-forest" /> {a}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground">Programme</h2>
              <div className="mt-6 space-y-2">
                {formation.programme.map((m, i) => (
                  <div key={i} className="rounded-2xl border border-border bg-white shadow-soft overflow-hidden">
                    <button onClick={() => setOpenModule(openModule === i ? -1 : i)} className="flex w-full items-center justify-between p-4">
                      <span className="font-semibold text-foreground">Module {i + 1} · {m.titre}</span>
                      <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${openModule === i ? "rotate-90" : ""}`} />
                    </button>
                    <div className={`grid transition-all duration-300 ease-in-out ${openModule === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                      <div className="overflow-hidden">
                        <ul className="space-y-1 border-t border-border p-4">
                          {m.lecons.map((l, j) => (
                            <li key={j} className="flex items-center justify-between text-sm text-muted-foreground">
                              <span>· {l.titre}</span>
                              <span>{l.duree}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-bold text-foreground">Prérequis</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>· Un smartphone ou un ordinateur</li>
                  <li>· Une connexion internet</li>
                  <li>· De la motivation</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-foreground">Pour qui c'est fait</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>· Débutants complets</li>
                  <li>· Entrepreneurs en herbe</li>
                  <li>· Créateurs de contenu</li>
                </ul>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-forest text-white font-bold text-lg">LB</div>
                <div>
                  <p className="font-semibold text-foreground">Équipe Digital Agency</p>
                  <p className="text-xs text-muted-foreground">Experts en IA, marketing et entrepreneuriat</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">Nous formons plus de 10 000 entrepreneurs africains chaque mois.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground">Formations similaires</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {others.map((f) => (
                  <Link key={f.id} to="/formations/$id" params={{ id: f.id }} className="card-glow rounded-2xl border border-border bg-white overflow-hidden shadow-soft">
                    <div className="flex h-24 items-center justify-center bg-forest/5 text-4xl">{f.emoji}</div>
                    <div className="p-4">
                      <p className="text-sm font-semibold leading-snug text-foreground line-clamp-2">{f.titre}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border bg-white overflow-hidden shadow-soft">
              <div className="flex h-32 items-center justify-center bg-forest/5 text-6xl">{formation.emoji}</div>
              <div className="p-6">
                <span className="rounded-full bg-amber/10 px-3 py-1 text-xs font-semibold text-amber">{formation.acces === "starter" ? "Accès gratuit" : formation.acces === "club_ia" ? "Club IA" : "Pro Creator"}</span>
                <p className="mt-4 text-3xl font-bold text-forest" style={{ fontFamily: "var(--font-heading)" }}>{formation.acces === "starter" ? "GRATUIT" : "Inclus"}</p>
                <p className="mt-1 text-sm text-muted-foreground">{formation.duree} · {formation.modules} modules</p>
                {isLoggedIn ? (
                  <Link to="/dashboard/formation/$id" params={{ id: formation.id }} className="mt-5 block rounded-full gradient-primary px-5 py-3 text-center text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]">
                    Accéder à la formation
                  </Link>
                ) : (
                  <Link to="/auth/register" className="mt-5 block rounded-full gradient-primary px-5 py-3 text-center text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]">
                    M'inscrire pour accéder
                  </Link>
                )}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </PublicLayout>
  );
}
