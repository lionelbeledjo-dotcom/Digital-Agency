import { createFileRoute, Link } from "@tanstack/react-router";
import { useAppStore } from "@/store/appStore";
import { PublicLayout } from "@/components/public-layout";
import { ArrowRight, Sparkles, CheckCircle2, Zap, Share2, Coins, Wallet, GraduationCap, Star, Quote, ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LB Digital · Apprends l'IA, partage, gagne des commissions" },
      { name: "description", content: "Plateforme de formation IA et marketing digital avec affiliation. 0 FCFA pour commencer. Paiement chaque vendredi via Mobile Money." },
    ],
  }),
  component: HomePage,
});

const flags = ["🇨🇮","🇸🇳","🇨🇲","🇲🇱","🇧🇯","🇹🇬","🇧🇫","🇳🇪","🇬🇳","🇨🇬","🇬🇦","🇫🇷"];

const steps = [
  { n: "01", t: "Inscription gratuite", d: "Accès immédiat aux formations et à ton lien affilié.", Icon: Sparkles },
  { n: "02", t: "Tu te formes", d: "Vidéos courtes pratiques, 100% en français, depuis ton téléphone.", Icon: GraduationCap },
  { n: "03", t: "Tu partages", d: "WhatsApp, Facebook, Telegram, TikTok — ton lien partout.", Icon: Share2 },
  { n: "04", t: "Commission auto", d: "Dès chaque souscription d'un filleul, ta commission tombe.", Icon: Coins },
  { n: "05", t: "Paiement vendredi", d: "Wero, PayPal, MTN MoMo, Orange Money. Chaque semaine.", Icon: Wallet },
];

const testimonials = [
  { name: "Aminata K.", city: "Abidjan, CI", text: "J'ai commencé en Starter, en 2 mois je suis passée à 65 000 FCFA de commissions. La méthode marche." },
  { name: "Kofi M.", city: "Dakar, SN", text: "Les formations IA sont concrètes. J'ai automatisé mes posts Instagram et mes ventes ont doublé." },
  { name: "Moussa D.", city: "Yaoundé, CM", text: "Le paiement vendredi via MTN, c'est ce qui change tout. On voit la lumière au bout de la semaine." },
];

const faqs = [
  { q: "Est-ce vraiment gratuit pour commencer ?", a: "Oui, le plan Starter est gratuit à vie avec 3 formations, ton lien affilié et 10% de commission." },
  { q: "Comment je reçois mes commissions ?", a: "Chaque vendredi via Wero (EU), PayPal, MTN Mobile Money ou Orange Money selon ton pays." },
  { q: "Puis-je annuler à tout moment ?", a: "Oui, résiliation libre sans frais. Tu gardes l'accès jusqu'à la fin de la période payée." },
  { q: "Dans combien de pays c'est disponible ?", a: "12 pays d'Afrique francophone + France, Belgique et autres pays européens via Wero et PayPal." },
  { q: "Faut-il être expert pour commencer ?", a: "Non. Les formations partent du niveau zéro. Si tu sais utiliser WhatsApp, tu peux suivre." },
];

function HomePage() {
  return (
    <PublicLayout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-hero-radial">
        <div className="absolute inset-0 bg-dots opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto flex flex-wrap items-center justify-center gap-1 text-lg">
              {flags.map((f, i) => <span key={i} className="animate-float" style={{ animationDelay: `${i * 0.1}s` }}>{f}</span>)}
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-sky/30 bg-sky/10 px-4 py-1.5 text-xs font-medium text-sky">
              <span className="h-2 w-2 rounded-full bg-green animate-pulse-dot" />
              Plateforme Apprends & Gagne · 12 pays d'Afrique francophone
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
              Maîtrise l'<span className="text-gradient">IA</span>.
              <br /> Partage la connaissance.
              <br /> Génère des <span className="text-gradient">revenus réels</span>.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              LB Digital te forme aux outils IA et au marketing digital depuis ton téléphone — et te reverse des commissions récurrentes chaque vendredi via Mobile Money.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link to="/auth/register" className="group inline-flex items-center gap-2 rounded-full gradient-cobalt px-7 py-4 text-base font-semibold text-white shadow-glow">
                Démarrer gratuitement
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/detail" className="rounded-full border border-border bg-card/40 px-7 py-4 text-base font-semibold backdrop-blur hover:bg-card">
                Découvrir le programme →
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {["0 FCFA pour commencer","Aucun investissement","Paiement chaque vendredi","100% en français"].map((b) => (
                <span key={b} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-green" /> {b}
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { v: "0 FCFA", l: "Pour commencer" },
              { v: "+500K FCFA", l: "Par mois possibles" },
              { v: "12 pays", l: "Couverts" },
              { v: "Vendredi", l: "Paiement Mobile Money" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl border border-border bg-card/60 p-6 text-center backdrop-blur">
                <p className="font-serif text-3xl font-bold text-gradient sm:text-4xl">{s.v}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-sky">Le système</p>
            <h2 className="mt-2 text-4xl font-bold sm:text-5xl">Comment ça marche</h2>
            <p className="mt-4 text-muted-foreground">5 étapes simples, du compte gratuit à ton premier virement vendredi.</p>
          </div>

          <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {steps.map((s) => (
              <div key={s.n} className="card-glow rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-cobalt">
                    <s.Icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-serif text-3xl text-muted-foreground/40">{s.n}</span>
                </div>
                <h3 className="mt-5 font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/detail" className="inline-flex items-center gap-2 text-sm font-semibold text-sky hover:text-foreground">
              Voir le détail complet <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FORMATIONS APERÇU */}
      <FormationsPreview />

      {/* TARIFS */}
      <TarifsPreview />

      {/* PAIEMENTS */}
      <section className="border-t border-border py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold sm:text-4xl">Paie & sois payé partout</h2>
          <p className="mt-3 text-muted-foreground">Paiement sécurisé · Résiliation libre · Remboursement 7 jours</p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { name: "Wero", c: "from-cobalt to-sky" },
              { name: "PayPal", c: "from-sky to-teal" },
              { name: "MTN Mobile Money", c: "from-gold to-cobalt" },
              { name: "Orange Money", c: "from-gold to-destructive" },
            ].map((p) => (
              <div key={p.name} className={`rounded-2xl bg-gradient-to-br ${p.c} p-[1px]`}>
                <div className="rounded-2xl bg-card p-5 text-center">
                  <p className="text-sm font-semibold">{p.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGES */}
      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-sky">Communauté</p>
            <h2 className="mt-2 text-4xl font-bold">Ils gagnent déjà chaque semaine</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="card-glow rounded-2xl border border-border bg-card p-6">
                <Quote className="h-6 w-6 text-sky/60" />
                <p className="mt-4 text-sm leading-relaxed">{t.text}</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-cobalt text-sm font-bold text-white">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.city}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection />

      {/* CTA FINAL */}
      <section className="relative overflow-hidden border-t border-border py-24">
        <div className="absolute inset-0 bg-hero-radial opacity-60" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Zap className="mx-auto h-10 w-10 text-gold" />
          <h2 className="mt-6 text-4xl font-bold sm:text-5xl">Tu es à <span className="text-gradient">0 FCFA</span> de ton premier revenu digital</h2>
          <p className="mt-4 text-muted-foreground">Rejoins LB Digital aujourd'hui. Ton premier virement peut tomber dès vendredi prochain.</p>
          <Link to="/auth/register" className="mt-8 inline-flex items-center gap-2 rounded-full gradient-cobalt px-8 py-4 text-base font-semibold text-white shadow-glow">
            Rejoindre LB Digital gratuitement
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}

function FormationsPreview() {
  const allFormations = useAppStore((s) => s.formations);
  const formations = useMemo(() => allFormations.slice(0, 6), [allFormations]);
  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-sky">Catalogue</p>
            <h2 className="mt-2 text-4xl font-bold">Formations qui rapportent</h2>
          </div>
          <Link to="/formations" className="text-sm font-semibold text-sky">Voir toutes les formations →</Link>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {formations.map((f) => (
            <Link key={f.id} to="/formations/$id" params={{ id: f.id }} className="card-glow group rounded-2xl border border-border bg-card overflow-hidden">
              <div className={`flex h-32 items-center justify-center bg-gradient-to-br ${f.couleur} text-5xl`}>{f.emoji}</div>
              <div className="p-5">
                <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-wider">
                  <span className="rounded-full bg-cobalt/15 px-2 py-0.5 text-cobalt">{f.categorie}</span>
                  <span className="rounded-full bg-teal/15 px-2 py-0.5 text-teal">{f.niveau}</span>
                  <span className="rounded-full bg-gold/15 px-2 py-0.5 text-gold">{f.acces === "starter" ? "Gratuit" : f.acces === "club_ia" ? "Club IA" : "Pro"}</span>
                </div>
                <h3 className="mt-3 font-semibold leading-snug">{f.titre}</h3>
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{f.modules} modules · {f.duree}</span>
                  <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-gold text-gold" /> {f.note}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function TarifsPreview() {
  const plans = useAppStore((s) => s.settings.plans);
  const planList = [
    { id: "starter", ...plans.starter, anchor: "#starter" as const, cta: "Commencer gratuitement" },
    { id: "club_ia", ...plans.club_ia, anchor: "#club" as const, cta: "Choisir Club IA" },
    { id: "pro_creator", ...plans.pro_creator, anchor: "#pro" as const, cta: "Devenir Pro Creator" },
  ];

  return (
    <section className="border-t border-border bg-navy2/30 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-sky">Tarifs</p>
          <h2 className="mt-2 text-4xl font-bold">3 plans, 1 seul objectif : tes revenus</h2>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {planList.map((p) => {
            const isPop = p.populaire;
            return (
              <div key={p.id} className={`relative rounded-3xl border bg-card p-7 ${isPop ? "border-cobalt shadow-glow" : "border-border"}`}>
                {isPop && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full gradient-cobalt px-4 py-1 text-xs font-bold text-white">
                    ⚡ Populaire
                  </div>
                )}
                <h3 className="text-lg font-bold">{p.nom}</h3>
                <p className="mt-4 font-serif text-5xl font-bold">
                  {p.prixMensuel === 0 ? "Gratuit" : <>{p.prixMensuel.toLocaleString("fr-FR")} <span className="text-base font-sans text-muted-foreground">FCFA/mois</span></>}
                </p>
                <p className="mt-2 text-sm text-teal">Commission affilié : {p.commission}%</p>
                <ul className="mt-6 space-y-2.5">
                  {p.features.map((feat) => (
                    <li key={feat} className="flex gap-2 text-sm"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green" /> {feat}</li>
                  ))}
                </ul>
                <Link to="/paiement" hash={p.anchor.slice(1)} className={`mt-7 block rounded-full px-5 py-3 text-center text-sm font-semibold ${isPop ? "gradient-cobalt text-white shadow-glow" : "border border-border hover:bg-secondary"}`}>
                  {p.cta}
                </Link>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link to="/tarifs" className="text-sm font-semibold text-sky">Comparer tous les plans →</Link>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-sky">FAQ</p>
          <h2 className="mt-2 text-4xl font-bold">Questions fréquentes</h2>
        </div>
        <div className="mt-10 space-y-2">
          {faqs.map((f, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card">
              <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between p-5 text-left">
                <span className="font-semibold">{f.q}</span>
                <ChevronDown className={`h-5 w-5 shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && <p className="px-5 pb-5 text-sm text-muted-foreground">{f.a}</p>}
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/faq" className="text-sm font-semibold text-sky">Voir toutes les questions →</Link>
        </div>
      </div>
    </section>
  );
}
