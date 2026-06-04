import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/components/public-layout";
import { useAppStore } from "@/store/appStore";
import { ChevronRight, CheckCircle2, ArrowRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/detail")({
  head: () => ({ meta: [{ title: "Fonctionnement complet · LB Digital" }] }),
  component: DetailPage,
});

function DetailPage() {
  const plans = useAppStore((s) => s.settings.plans);
  const [open, setOpen] = useState<number | null>(0);

  const faqs = [
    { q: "Quand reçois-je mes commissions ?", a: "Chaque vendredi, automatiquement, dès que tu dépasses le seuil de 500 FCFA." },
    { q: "Quels sont les moyens de paiement ?", a: "Wero, PayPal, MTN Mobile Money, Orange Money." },
    { q: "Puis-je gagner sans investir ?", a: "Oui, le plan Starter est 100% gratuit avec 10% de commission." },
    { q: "Combien de filleuls pour 100 000 FCFA/mois ?", a: "En Pro Creator (40% de 8 500), environ 30 filleuls actifs." },
    { q: "Le cookie dure combien de temps ?", a: "365 jours. Si ton filleul s'inscrit dans l'année après ton lien, c'est ta commission." },
    { q: "Y a-t-il une limite de gains ?", a: "Aucune. Plus tu partages, plus tu gagnes." },
    { q: "Mes filleuls peuvent-ils aussi parrainer ?", a: "Oui, et tu touches une commission sur chaque souscription." },
    { q: "Comment retirer en France/Europe ?", a: "Via Wero (instantané) ou PayPal." },
    { q: "Puis-je suspendre mon abonnement ?", a: "Oui, sans frais, à tout moment." },
    { q: "Comment contacter le support ?", a: "WhatsApp 24/7 et formulaire de contact." },
  ];

  return (
    <PublicLayout>
      <section className="bg-hero-radial py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-forest">Accueil</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Fonctionnement complet</span>
          </nav>
          <h1 className="text-4xl font-bold text-foreground sm:text-6xl">Le fonctionnement complet de <span className="text-accent-serif">LB Digital</span></h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">Apprends comment la plateforme te forme, te paie et grandit avec toi.</p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-wider text-amber font-semibold">Vision</p>
            <h2 className="mt-2 text-3xl font-bold text-foreground">Démocratiser l'IA en Afrique francophone</h2>
            <p className="mt-4 text-muted-foreground">Chaque jeune africain devrait pouvoir maîtriser les outils IA et générer un revenu en ligne, depuis un simple téléphone.</p>
          </div>
          <div>
            <p className="text-sm uppercase tracking-wider text-amber font-semibold">Mission</p>
            <h2 className="mt-2 text-3xl font-bold text-foreground">Apprendre & Gagner en parallèle</h2>
            <p className="mt-4 text-muted-foreground">Formations courtes et actionnables + système d'affiliation transparent qui paie chaque vendredi.</p>
          </div>
          {[
            { t: "Pédagogie 100% pratique", d: "Vidéos courtes, exemples concrets, exercices guidés." },
            { t: "Paiement transparent", d: "Tu vois en temps réel tes commissions dans ton dashboard." },
            { t: "Communauté soudée", d: "Telegram + WhatsApp VIP pour s'entraider chaque jour." },
            { t: "Made for Africa", d: "Pensé pour MTN, Orange Money, FCFA, faible bande passante." },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-border bg-white p-6 shadow-soft">
              <h3 className="font-semibold text-foreground">{c.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Plans */}
      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-foreground">Les 3 offres en détail</h2>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {(["starter","club_ia","pro_creator"] as const).map((id) => {
              const p = plans[id];
              return (
                <div key={id} className={`rounded-2xl border bg-white p-6 shadow-soft ${p.populaire ? "border-forest ring-2 ring-forest/10" : "border-border"}`}>
                  <h3 className="text-lg font-bold text-foreground">{p.nom}</h3>
                  <p className="mt-4 text-4xl font-bold text-forest" style={{ fontFamily: "var(--font-heading)" }}>{p.prixMensuel === 0 ? "Gratuit" : `${p.prixMensuel.toLocaleString("fr-FR")} FCFA`}</p>
                  <p className="text-sm text-amber font-medium">Commission {p.commission}%</p>
                  <ul className="mt-5 space-y-2 text-sm">
                    {p.features.map((f) => <li key={f} className="flex gap-2 text-muted-foreground"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-forest" />{f}</li>)}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Revenue simulation */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-foreground">Simulation de revenus</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
              <h3 className="font-semibold text-foreground">Club IA (25%)</h3>
              <p className="mt-2 text-sm text-muted-foreground">25% de 3 500 FCFA = 875 FCFA / filleul / mois</p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>10 filleuls → <strong className="text-foreground">8 750 FCFA</strong>/mois</li>
                <li>50 filleuls → <strong className="text-foreground">43 750 FCFA</strong>/mois</li>
                <li>100 filleuls → <strong className="text-foreground">87 500 FCFA</strong>/mois</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-forest bg-forest/5 p-6 shadow-glow">
              <h3 className="font-semibold text-foreground">Pro Creator (40%)</h3>
              <p className="mt-2 text-sm text-muted-foreground">40% de 8 500 FCFA = 3 400 FCFA / filleul / mois</p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>10 filleuls → <strong className="text-foreground">34 000 FCFA</strong>/mois</li>
                <li>50 filleuls → <strong className="text-foreground">170 000 FCFA</strong>/mois</li>
                <li>100 filleuls → <strong className="text-foreground">340 000 FCFA</strong>/mois</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Paiements détaillés */}
      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-foreground">Moyens de paiement supportés</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              { n: "Wero", d: "Virement instantané depuis ton app bancaire. France, Belgique, Allemagne, Espagne, Portugal." },
              { n: "PayPal", d: "Paiement international sécurisé. 200+ pays. Solde PayPal ou carte." },
              { n: "MTN Mobile Money", d: "Cameroun, Côte d'Ivoire, Bénin, Congo, Ghana. Push sur ton téléphone, PIN, confirmation." },
              { n: "Orange Money", d: "Côte d'Ivoire, Sénégal, Cameroun, Mali, Guinée. Confirme depuis ton menu Orange." },
            ].map((p) => (
              <div key={p.n} className="rounded-2xl border border-border bg-white p-6 shadow-soft">
                <h3 className="font-semibold text-foreground">{p.n}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-foreground text-center">Questions fréquentes</h2>
          <div className="mt-8 space-y-2">
            {faqs.map((f, i) => (
              <div key={i} className="rounded-2xl border border-border bg-white shadow-soft">
                <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between p-5 text-left">
                  <span className="font-semibold text-foreground">{f.q}</span>
                  <ChevronRight className={`h-5 w-5 text-muted-foreground transition-transform ${open === i ? "rotate-90" : ""}`} />
                </button>
                {open === i && <p className="px-5 pb-5 text-sm text-muted-foreground">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold text-white">Prêt à commencer ?</h2>
          <Link to="/auth/register" className="mt-6 inline-flex items-center gap-2 rounded-full gradient-amber px-7 py-4 font-semibold text-forest shadow-glow transition-transform hover:scale-[1.02]">
            Créer mon compte gratuit <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
