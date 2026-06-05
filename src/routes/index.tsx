import { createFileRoute, Link } from "@tanstack/react-router";
import { useAppStore } from "@/store/appStore";
import { PublicLayout } from "@/components/public-layout";
import { ArrowRight, CheckCircle2, Zap, Share2, Coins, Wallet, GraduationCap, Star, ChevronDown, Sparkles, Play, Rocket, Users, ShieldCheck, Headphones } from "lucide-react";
import { useMemo, useState } from "react";
import { useReveal } from "@/hooks/use-reveal";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Digital Agency · Apprends l'IA, partage, gagne des commissions" },
      { name: "description", content: "Plateforme de formation IA et marketing digital avec affiliation. 0 FCFA pour commencer. Paiement chaque vendredi via Mobile Money." },
      { property: "og:title", content: "Digital Agency · Apprends l'IA, partage, gagne des commissions" },
      { property: "og:description", content: "Plateforme de formation IA et marketing digital avec affiliation pour l'Afrique francophone." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://digitalagency.site" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Digital Agency" },
      { name: "twitter:description", content: "Formation IA + affiliation. 0 FCFA pour commencer." },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: "Digital Agency",
          description: "Plateforme de formation IA et marketing digital avec affiliation pour l'Afrique francophone",
          url: "https://digitalagency.site",
          areaServed: "Afrique francophone",
          foundingDate: "2025",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "XOF",
            description: "Plan Starter gratuit à vie",
          },
        }),
      },
    ],
  }),
  component: HomePage,
});

const services = [
  "App Design", "Website Design", "Dashboard", "Wireframing", "Marketing Digital", "IA & Automatisation",
];

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
  useReveal();

  return (
    <PublicLayout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-hero-radial">
        <div className="absolute inset-0 bg-dots opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-12 sm:px-6 sm:pt-20">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
            {/* Left column — text */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-forest/5 px-4 py-1.5 text-xs font-medium text-forest">
                <span className="h-2 w-2 rounded-full bg-forest animate-pulse-dot" />
                Plateforme Apprends & Gagne
              </div>

              <h1 className="mt-8 text-3xl font-bold leading-[1.12] text-foreground sm:text-5xl lg:text-6xl" style={{ fontFamily: "var(--font-heading)" }}>
                <span className="hero-word" style={{ animationDelay: "0.1s" }}>Maîtrise l'</span>
                <span className="hero-word text-accent-serif" style={{ animationDelay: "0.4s" }}>IA</span>
                <span className="hero-word" style={{ animationDelay: "0.7s" }}>.</span>
                <br />
                <span className="hero-word" style={{ animationDelay: "1.0s" }}>Partage la connaissance.</span>
                <br />
                <span className="hero-word" style={{ animationDelay: "1.3s" }}>Génère des </span>
                <span className="hero-word text-accent-serif" style={{ animationDelay: "1.6s" }}>revenus réels</span>
                <span className="hero-word" style={{ animationDelay: "1.9s" }}>.</span>
              </h1>

              <p className="mt-6 max-w-lg text-base text-muted-foreground sm:text-lg">
                Digital Agency te forme aux outils IA et au marketing digital depuis ton téléphone — et te reverse des commissions récurrentes chaque vendredi via Mobile Money.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/auth/register" className="group inline-flex items-center gap-2 rounded-full gradient-primary px-8 py-4 text-base font-semibold text-white shadow-glow pulse-glow transition-transform hover:scale-[1.03]">
                  Démarrer gratuitement
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link to="/detail" className="inline-flex items-center gap-2 rounded-full border-2 border-forest/20 bg-white px-7 py-4 text-base font-semibold text-forest hover:border-forest/40 transition-colors">
                  <Play className="h-4 w-4" />
                  Découvrir le programme
                </Link>
              </div>
            </div>

            {/* Right column — hero image + floating cards */}
            <div className="relative flex justify-center lg:justify-end min-h-[420px] sm:min-h-[520px] lg:min-h-[580px]">
              <img
                src="/hero-person.png"
                alt="Membre Digital Agency avec téléphone"
                className="relative z-10 h-auto w-[400px] sm:w-[520px] lg:w-[600px] max-w-none object-contain drop-shadow-2xl"
              />

              {/* Floating card — Commissions */}
              <div className="absolute top-6 right-0 z-20 animate-float rounded-2xl bg-white px-5 py-4 shadow-lg border border-border">
                <p className="text-xs text-muted-foreground">Commissions</p>
                <p className="text-xl font-bold text-forest">+ 650.000 FCFA</p>
                <p className="text-[11px] text-muted-foreground">Chaque vendredi</p>
              </div>

              {/* Floating card — Revenus */}
              <div className="absolute bottom-[38%] -left-4 z-20 animate-float rounded-2xl bg-white px-5 py-4 shadow-lg border border-border" style={{ animationDelay: "1s" }}>
                <p className="text-xs text-muted-foreground">Revenus générés</p>
                <p className="text-2xl font-bold text-forest">+ 2.450.000 FCFA</p>
                <p className="text-[11px] text-muted-foreground">Cette semaine</p>
              </div>

              {/* Floating card — Payment logos */}
              <div className="absolute bottom-[16%] right-0 z-20 animate-float flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-lg border border-border" style={{ animationDelay: "2s" }}>
                <span className="rounded-md bg-orange-500 px-2 py-1 text-[10px] font-bold text-white">Orange</span>
                <span className="rounded-md bg-yellow-400 px-2 py-1 text-[10px] font-bold text-black">MTN</span>
                <span className="rounded-md bg-blue-800 px-2 py-1 text-[10px] font-bold text-white">Moov</span>
              </div>

              {/* Rocket icon top-left */}
              <div className="absolute top-12 left-4 z-20 flex h-14 w-14 items-center justify-center rounded-2xl bg-forest shadow-lg">
                <Rocket className="h-7 w-7 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Features bar */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pb-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
            {[
              { Icon: GraduationCap, title: "Formations", desc: "IA & Marketing Digital 100% pratiques" },
              { Icon: Users, title: "Affiliation", desc: "Gagne des commissions chaque semaine" },
              { Icon: Wallet, title: "Paiement", desc: "Mobile Money rapide & sécurisé" },
              { Icon: Headphones, title: "Accompagnement", desc: "Support & suivi personnalisé" },
            ].map((f) => (
              <div key={f.title} className="hover-tilt rounded-2xl border border-border bg-white p-5 text-center shadow-soft">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-forest/10">
                  <f.Icon className="h-5 w-5 text-forest" />
                </div>
                <h3 className="mt-3 text-sm font-bold text-foreground">{f.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* "Commence aujourd'hui" banner */}
          <div className="mt-5 flex flex-col items-center gap-4 rounded-2xl bg-forest p-5 sm:flex-row sm:justify-between sm:p-6">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-green-300" />
                <h3 className="text-lg font-bold text-white">Commence aujourd'hui</h3>
              </div>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5">
                {["0 FCFA pour commencer", "Aucun investissement", "Paiement chaque vendredi", "100% en français"].map((b) => (
                  <span key={b} className="inline-flex items-center gap-1.5 text-sm text-white/90">
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-300" /> {b}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center rounded-xl bg-white/10 px-5 py-3 backdrop-blur-sm">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-green-300">Pour commencer</p>
              <p className="text-4xl font-black text-white" style={{ fontFamily: "var(--font-heading)" }}>0 <span className="text-lg">FCFA</span></p>
              <p className="text-[10px] uppercase tracking-wide text-white/70">Rejoins des milliers déjà actifs !</p>
            </div>
          </div>
        </div>

        {/* Social proof bar */}
        <div className="relative border-t border-border bg-white/80 backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Déjà plus de <strong className="text-foreground">15.000+</strong> membres actifs</span>
              <div className="flex -space-x-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-forest text-[10px] font-bold text-white">
                    {["A", "K", "M", "D", "S"][i]}
                  </div>
                ))}
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-amber text-[10px] font-bold text-foreground">
                  15K+
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber text-amber" />
              ))}
              <span className="ml-1 text-sm text-muted-foreground">4.9/5 (Avis vérifiés)</span>
            </div>
            <div className="hidden items-center gap-5 sm:flex">
              {[
                { Icon: Rocket, label: "Simple" },
                { Icon: Zap, label: "Rapide" },
                { Icon: ShieldCheck, label: "Sécurisé" },
                { Icon: CheckCircle2, label: "Efficace" },
              ].map((t) => (
                <span key={t.label} className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                  <t.Icon className="h-4 w-4 text-forest" /> {t.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TICKER BAND */}
      <section className="overflow-hidden bg-forest py-4">
        <div className="animate-scroll-x flex whitespace-nowrap">
          {[...services, ...services].map((s, i) => (
            <span key={i} className="mx-6 inline-flex items-center gap-3 text-sm font-medium text-white">
              <span className="text-amber">✦</span> {s}
            </span>
          ))}
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-amber">Le système</p>
            <h2 className="mt-2 text-4xl font-bold text-foreground sm:text-5xl">Comment ça marche</h2>
            <p className="mt-4 text-muted-foreground">5 étapes simples, du compte gratuit à ton premier virement vendredi.</p>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-5 reveal">
            {steps.map((s) => (
              <div key={s.n} className="card-glow hover-tilt rounded-2xl border border-border bg-white p-6 shadow-soft">
                <div className="flex items-center justify-between">
                  <div className="icon-bounce flex h-10 w-10 items-center justify-center rounded-xl bg-forest">
                    <s.Icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-3xl font-bold text-border" style={{ fontFamily: "var(--font-heading)" }}>{s.n}</span>
                </div>
                <h3 className="mt-5 font-semibold text-foreground">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>


          <div className="mt-10 text-center">
            <Link to="/detail" className="inline-flex items-center gap-2 text-sm font-semibold text-forest hover:text-forest-light transition-colors">
              Voir le détail complet <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FORMATIONS APERÇU */}
      <FormationsPreview />

      {/* CONFIANCE */}
      <TrustSection />

      {/* TARIFS */}
      <TarifsPreview />

      {/* PAIEMENTS */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Paie & sois payé partout</h2>
          <p className="mt-3 text-muted-foreground">Paiement sécurisé · Résiliation libre · Remboursement 7 jours</p>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { name: "Wero", c: "from-forest to-forest-light" },
              { name: "PayPal", c: "from-forest-light to-olive" },
              { name: "MTN Mobile Money", c: "from-amber to-amber-light" },
              { name: "Orange Money", c: "from-amber-light to-amber" },
            ].map((p) => (
              <div key={p.name} className={`rounded-2xl bg-gradient-to-br ${p.c} p-[2px]`}>
                <div className="rounded-2xl bg-white p-5 text-center">
                  <p className="text-sm font-semibold text-foreground">{p.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGES */}
      <section className="bg-cream py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-amber">Communauté</p>
            <h2 className="mt-2 text-4xl font-bold text-foreground">Ils gagnent déjà chaque semaine</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="card-glow rounded-2xl border border-border bg-white p-6 shadow-soft">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-amber text-amber" />)}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-forest text-sm font-bold text-white">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.city}</p>
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
      <section className="relative overflow-hidden bg-forest py-24">
        <div className="absolute inset-0 opacity-10 bg-dots" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Zap className="mx-auto h-10 w-10 text-amber" />
          <h2 className="mt-6 text-4xl font-bold text-white sm:text-5xl">Tu es à <span className="text-amber">0 FCFA</span> de ton premier revenu digital</h2>
          <p className="mt-4 text-white/70">Rejoins Digital Agency aujourd'hui. Ton premier virement peut tomber dès vendredi prochain.</p>
          <Link to="/auth/register" className="mt-8 inline-flex items-center gap-2 rounded-full gradient-amber px-8 py-4 text-base font-semibold text-forest shadow-glow transition-transform hover:scale-[1.02]">
            Rejoindre Digital Agency gratuitement
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
    <section className="bg-secondary py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-amber">Catalogue</p>
            <h2 className="mt-2 text-4xl font-bold text-foreground">Formations qui rapportent</h2>
          </div>
          <Link to="/formations" className="text-sm font-semibold text-forest hover:text-forest-light transition-colors">Voir toutes les formations →</Link>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3 stagger reveal">
          {formations.map((f) => (
            <Link key={f.id} to="/formations/$id" params={{ id: f.id }} className="card-glow hover-tilt group rounded-2xl border border-border bg-white overflow-hidden shadow-soft">
              <div className="flex h-32 items-center justify-center bg-forest/5 text-5xl transition-transform duration-300 group-hover:scale-110">{f.emoji}</div>

              <div className="p-5">
                <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-wider">
                  <span className="rounded-full bg-forest/10 px-2 py-0.5 text-forest font-medium">{f.categorie}</span>
                  <span className="rounded-full bg-amber/10 px-2 py-0.5 text-amber font-medium">{f.niveau}</span>
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-muted-foreground">{f.acces === "starter" ? "Gratuit" : f.acces === "club_ia" ? "Club IA" : "Pro"}</span>
                </div>
                <h3 className="mt-3 font-semibold leading-snug text-foreground group-hover:text-forest transition-colors">{f.titre}</h3>
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{f.modules} modules · {f.duree}</span>
                  <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-amber text-amber" /> {f.note}</span>
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
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-amber">Tarifs</p>
          <h2 className="mt-2 text-4xl font-bold text-foreground">3 plans, 1 seul objectif : tes revenus</h2>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {planList.map((p) => {
            const isPop = p.populaire;
            return (
              <div key={p.id} className={`relative rounded-3xl border bg-white p-7 shadow-soft ${isPop ? "border-forest ring-2 ring-forest/10" : "border-border"}`}>
                {isPop && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full gradient-primary px-4 py-1 text-xs font-bold text-white">
                    ⚡ Populaire
                  </div>
                )}
                <h3 className="text-lg font-bold text-foreground">{p.nom}</h3>
                <p className="mt-4 text-5xl font-bold text-forest" style={{ fontFamily: "var(--font-heading)" }}>
                  {p.prixMensuel === 0 ? "Gratuit" : <>{p.prixMensuel.toLocaleString("fr-FR")} <span className="text-base font-normal text-muted-foreground">FCFA/mois</span></>}
                </p>
                <p className="mt-2 text-sm text-amber font-medium">Commission affilié : {p.commission}%</p>
                <ul className="mt-6 space-y-2.5">
                  {p.features.map((feat) => (
                    <li key={feat} className="flex gap-2 text-sm text-muted-foreground"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-forest" /> {feat}</li>
                  ))}
                </ul>
                <Link to="/paiement" hash={p.anchor.slice(1)} className={`mt-7 block rounded-full px-5 py-3 text-center text-sm font-semibold transition-all ${isPop ? "gradient-primary text-white shadow-glow hover:scale-[1.02]" : "border-2 border-forest/20 text-forest hover:border-forest/40"}`}>
                  {p.cta}
                </Link>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link to="/tarifs" className="text-sm font-semibold text-forest">Comparer tous les plans →</Link>
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  const partners = ["ChatGPT", "Canva", "MTN MoMo", "Orange Money", "PayPal", "Wero", "TikTok", "WhatsApp"];
  return (
    <section className="py-16 border-t border-border">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <p className="text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">Outils & partenaires intégrés</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {partners.map((p) => (
            <span key={p} className="text-sm font-semibold text-muted-foreground/60 hover:text-forest transition-colors">{p}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-amber">FAQ</p>
          <h2 className="mt-2 text-4xl font-bold text-foreground">Questions fréquentes</h2>
        </div>
        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="rounded-2xl border border-border bg-white shadow-soft overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between p-5 text-left">
                <span className="font-semibold text-foreground">{f.q}</span>
                <ChevronDown className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${open === i ? "rotate-180" : ""}`} />
              </button>
              <div className={`grid transition-all duration-300 ease-in-out ${open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm text-muted-foreground">{f.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/faq" className="text-sm font-semibold text-forest">Voir toutes les questions →</Link>
        </div>
      </div>
    </section>
  );
}
