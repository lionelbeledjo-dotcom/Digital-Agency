import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/components/public-layout";
import { Star, Play, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/temoignages")({
  head: () => ({ meta: [{ title: "Témoignages · Digital Agency" }] }),
  component: TemoignagesPage,
});

const videoTestimonials = [
  { name: "Aminata K.", city: "Abidjan, CI", plan: "Club IA", revenue: "65 000 FCFA/mois", text: "J'ai commencé en Starter, en 2 mois je suis passée à 65 000 FCFA de commissions. La méthode marche vraiment.", duration: "2:34" },
  { name: "Kofi M.", city: "Dakar, SN", plan: "Pro Creator", revenue: "180 000 FCFA/mois", text: "Les formations IA sont concrètes. J'ai automatisé mes posts Instagram et mes ventes ont doublé en 3 semaines.", duration: "3:12" },
  { name: "Moussa D.", city: "Yaoundé, CM", plan: "Club IA", revenue: "45 000 FCFA/mois", text: "Le paiement vendredi via MTN, c'est ce qui change tout. On voit la lumière au bout de la semaine.", duration: "1:58" },
  { name: "Fatou S.", city: "Bamako, ML", plan: "Pro Creator", revenue: "210 000 FCFA/mois", text: "Depuis que je suis Pro Creator, je touche 40% sur chaque filleul. Avec 60 filleuls actifs, c'est un vrai salaire.", duration: "2:45" },
  { name: "Ibrahim C.", city: "Cotonou, BJ", plan: "Club IA", revenue: "35 000 FCFA/mois", text: "Je partage mon lien sur WhatsApp et TikTok. Chaque vendredi, je reçois mon virement. Simple et efficace.", duration: "2:10" },
  { name: "Marie N.", city: "Lomé, TG", plan: "Club IA", revenue: "52 000 FCFA/mois", text: "Les formations sont courtes et en français. Je les suis depuis mon téléphone entre deux courses.", duration: "1:45" },
];

const stats = [
  { v: "98%", l: "Satisfaction" },
  { v: "4.9/5", l: "Note moyenne" },
  { v: "+500", l: "Témoignages" },
  { v: "12 pays", l: "Représentés" },
];

function TemoignagesPage() {
  return (
    <PublicLayout>
      <section className="bg-hero-radial py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-amber">Témoignages</p>
          <h1 className="mt-3 text-4xl font-bold text-foreground sm:text-5xl" style={{ fontFamily: "var(--font-heading)" }}>
            Ils ont transformé leur vie avec <span className="text-accent-serif">Digital Agency</span>
          </h1>
          <p className="mt-4 text-muted-foreground text-lg">Des histoires vraies, des résultats concrets, des virements chaque vendredi.</p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-forest py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 text-center">
            {stats.map((s) => (
              <div key={s.l}>
                <p className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>{s.v}</p>
                <p className="mt-1 text-xs text-white/60">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vidéos */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {videoTestimonials.map((t) => (
              <div key={t.name} className="card-glow rounded-2xl border border-border bg-white overflow-hidden shadow-soft">
                <div className="relative aspect-video bg-forest/5 flex items-center justify-center">
                  <div className="text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-forest/10 mx-auto cursor-pointer hover:bg-forest/20 transition-colors">
                      <Play className="h-6 w-6 text-forest" />
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">{t.duration}</p>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-amber text-amber" />)}
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">"{t.text}"</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-forest text-xs font-bold text-white">{t.name[0]}</div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.city}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-semibold text-forest">{t.revenue}</p>
                      <p className="text-[10px] text-amber">{t.plan}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold text-foreground">La prochaine success story, c'est toi.</h2>
          <p className="mt-3 text-muted-foreground">Commence gratuitement et génère tes premiers revenus dès vendredi.</p>
          <Link to="/auth/register" className="mt-6 inline-flex items-center gap-2 rounded-full gradient-primary px-7 py-4 font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]">
            Rejoindre Digital Agency <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
