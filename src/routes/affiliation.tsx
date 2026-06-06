import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/components/public-layout";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { useMemo, useState } from "react";
import { useAppStore } from "@/store/appStore";
import { Users, Wallet, TrendingUp, Shield, Clock, Gift, ChevronDown, CheckCircle2, Star } from "lucide-react";

export const Route = createFileRoute("/affiliation")({
  head: () => ({ meta: [{ title: "Affiliation · Digital Agency" }, { name: "description", content: "Gagne jusqu'a 40% de commission recurrente a vie en recommandant Digital Agency." }] }),
  component: AffiliationPage,
});

function AffiliationPage() {
  const plans = useAppStore((s) => s.settings.plans);
  const [filleuls, setFilleuls] = useState(20);
  const [monPlan, setMonPlan] = useState<"starter" | "club_ia" | "pro_creator">("club_ia");
  const [planFilleul, setPlanFilleul] = useState<"club_ia" | "pro_creator">("club_ia");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const taux = plans[monPlan].commission / 100;
  const prixFilleul = plans[planFilleul].prixMensuel;
  const commissionMois = Math.round(filleuls * prixFilleul * taux);
  const commissionAn = commissionMois * 12;

  const data = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    mois: `M${i + 1}`,
    revenu: Math.round(commissionMois * (i + 1) * 0.9),
  })), [commissionMois]);

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-hero-radial py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber/10 px-4 py-1.5 text-sm font-medium text-amber mb-6">
            <Gift className="h-4 w-4" /> Programme d'affiliation
          </div>
          <h1 className="text-4xl font-bold text-foreground sm:text-6xl leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
            Gagne jusqu'a <span className="text-forest">40%</span> de commission<br />
            <span className="text-accent-serif">recurrente a vie</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
            Recommande Digital Agency a ton reseau. Chaque filleul qui s'abonne te rapporte une commission chaque mois, automatiquement. Versement chaque vendredi.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth/register" className="rounded-full gradient-primary px-8 py-4 font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]">
              Obtenir mon lien gratuit
            </Link>
            <a href="#simulateur" className="rounded-full border-2 border-forest px-8 py-4 font-semibold text-forest hover:bg-forest hover:text-white transition-colors">
              Simuler mes gains
            </a>
          </div>

          {/* Stats bar */}
          <div className="mt-14 grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {[
              { v: "40%", l: "Commission max" },
              { v: "365j", l: "Cookie tracking" },
              { v: "Vendredi", l: "Versement" },
            ].map(s => (
              <div key={s.l} className="text-center">
                <p className="text-2xl font-bold text-forest" style={{ fontFamily: "var(--font-heading)" }}>{s.v}</p>
                <p className="text-xs text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Comment ca marche ?</h2>
            <p className="mt-3 text-muted-foreground">4 etapes simples pour commencer a gagner</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "01", t: "Inscris-toi", d: "Cree ton compte gratuitement en 30 secondes. Aucun frais.", icon: Users },
              { n: "02", t: "Copie ton lien", d: "Ton lien de tracking unique est genere automatiquement.", icon: Gift },
              { n: "03", t: "Partage", d: "WhatsApp, TikTok, Facebook, groupes Telegram... partout.", icon: TrendingUp },
              { n: "04", t: "Encaisse", d: "Commission versee chaque vendredi sur ton Mobile Money.", icon: Wallet },
            ].map((s) => (
              <div key={s.n} className="group relative rounded-2xl border border-border bg-white p-6 shadow-soft hover:shadow-lg hover:border-forest/30 transition-all">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest/10 text-forest group-hover:bg-forest group-hover:text-white transition-colors">
                  <s.icon className="h-6 w-6" />
                </div>
                <p className="absolute top-4 right-4 text-3xl font-bold text-border/50" style={{ fontFamily: "var(--font-heading)" }}>{s.n}</p>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commission table */}
      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Taux de commission par plan</h2>
            <p className="mt-3 text-muted-foreground">Plus ton plan est eleve, plus tu gagnes sur chaque filleul</p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[
              { plan: "Starter", prix: "1 500 FCFA/mois", taux: "10%", color: "border-border", highlight: false, exemple: "Si 10 filleuls Club IA : 3 500 FCFA/mois" },
              { plan: "Club IA", prix: "3 500 FCFA/mois", taux: "25%", color: "border-forest", highlight: true, exemple: "Si 10 filleuls Club IA : 8 750 FCFA/mois" },
              { plan: "Pro Creator", prix: "8 500 FCFA/mois", taux: "40%", color: "border-amber", highlight: false, exemple: "Si 10 filleuls Pro : 34 000 FCFA/mois" },
            ].map(p => (
              <div key={p.plan} className={`relative rounded-2xl border-2 ${p.color} bg-white p-6 shadow-soft ${p.highlight ? "ring-2 ring-forest/20 scale-[1.02]" : ""}`}>
                {p.highlight && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-forest px-4 py-1 text-xs font-bold text-white">Populaire</span>}
                <h3 className="text-xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>{p.plan}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.prix}</p>
                <p className="mt-4 text-5xl font-bold text-forest" style={{ fontFamily: "var(--font-heading)" }}>{p.taux}</p>
                <p className="text-sm text-muted-foreground">de commission recurrente</p>
                <div className="mt-4 rounded-xl bg-forest/5 p-3">
                  <p className="text-xs text-forest font-medium">{p.exemple}</p>
                </div>
                <ul className="mt-4 space-y-2">
                  {["Commission a vie", "Cookie 365 jours", "Versement vendredi", "Dashboard temps reel"].map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-forest flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simulator */}
      <section id="simulateur" className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Simulateur de revenus</h2>
            <p className="mt-3 text-muted-foreground">Deplace les curseurs et vois combien tu peux gagner</p>
          </div>

          <div className="mt-10 grid gap-6 rounded-3xl border border-border bg-white p-6 sm:p-8 shadow-soft lg:grid-cols-[1fr_1fr]">
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-foreground">Nombre de filleuls actifs : <span className="text-forest font-bold text-lg">{filleuls}</span></label>
                <input type="range" min={0} max={200} value={filleuls} onChange={(e) => setFilleuls(Number(e.target.value))} className="mt-3 w-full accent-forest h-2" />
                <div className="flex justify-between text-[10px] text-muted-foreground mt-1"><span>0</span><span>50</span><span>100</span><span>150</span><span>200</span></div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Ton plan</label>
                <select value={monPlan} onChange={(e) => setMonPlan(e.target.value as typeof monPlan)} className="mt-2 w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm focus:border-forest focus:outline-none">
                  <option value="starter">Starter — 10% de commission</option>
                  <option value="club_ia">Club IA — 25% de commission</option>
                  <option value="pro_creator">Pro Creator — 40% de commission</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Plan de tes filleuls</label>
                <select value={planFilleul} onChange={(e) => setPlanFilleul(e.target.value as typeof planFilleul)} className="mt-2 w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm focus:border-forest focus:outline-none">
                  <option value="club_ia">Club IA — 3 500 FCFA/mois</option>
                  <option value="pro_creator">Pro Creator — 8 500 FCFA/mois</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col justify-center rounded-2xl border border-forest/20 bg-gradient-to-br from-forest/5 to-forest/10 p-6 sm:p-8">
              <p className="text-xs uppercase tracking-wider text-forest font-semibold">Tes gains par mois</p>
              <p className="mt-2 text-5xl font-bold text-forest" style={{ fontFamily: "var(--font-heading)" }}>{commissionMois.toLocaleString("fr-FR")} <span className="text-2xl">FCFA</span></p>
              <div className="mt-6 h-px bg-forest/20" />
              <p className="mt-4 text-xs uppercase tracking-wider text-amber font-semibold">Tes gains par an</p>
              <p className="mt-2 text-3xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>{commissionAn.toLocaleString("fr-FR")} <span className="text-lg">FCFA</span></p>
              <p className="mt-4 text-xs text-muted-foreground">= {Math.round(commissionAn / 12).toLocaleString("fr-FR")} FCFA/mois en moyenne</p>
            </div>
          </div>

          <div className="mt-8 h-64 rounded-2xl border border-border bg-white p-4 shadow-soft">
            <ResponsiveContainer>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                <XAxis dataKey="mois" stroke="#6b6b6b" fontSize={11} />
                <YAxis stroke="#6b6b6b" fontSize={11} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e5e5e0", borderRadius: 12 }} formatter={(v: number) => [`${v.toLocaleString("fr-FR")} FCFA`, "Revenus cumules"]} />
                <Line type="monotone" dataKey="revenu" stroke="#1a5c3a" strokeWidth={3} dot={{ fill: "#c8a415", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Ils gagnent deja avec nous</h2>
            <p className="mt-3 text-muted-foreground">Des membres comme toi qui ont pris de l'avance</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { name: "Alain K.", city: "Douala", text: "J'ai partage mon lien dans 3 groupes WhatsApp et en 2 semaines j'avais 8 filleuls. Ma commission tombe chaque vendredi.", gain: "28 000 FCFA/mois" },
              { name: "Grace M.", city: "Abidjan", text: "Je fais des TikTok sur l'IA et je mets mon lien en bio. Ca marche tout seul pendant que je dors.", gain: "45 000 FCFA/mois" },
              { name: "Patrick O.", city: "Kinshasa", text: "Avec le plan Pro Creator a 40%, meme 5 filleuls ca fait deja plus que mon ancien side hustle.", gain: "68 000 FCFA/mois" },
            ].map(t => (
              <div key={t.name} className="rounded-2xl border border-border bg-white p-6 shadow-soft">
                <div className="flex gap-1 mb-3">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-amber text-amber" />)}</div>
                <p className="text-sm text-muted-foreground italic">"{t.text}"</p>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.city}</p>
                  </div>
                  <span className="rounded-full bg-forest/10 px-3 py-1 text-xs font-bold text-forest">{t.gain}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Pourquoi nous choisir ?</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Wallet, t: "Commission a vie", d: "Tant que ton filleul reste abonne, tu gagnes. Pas de limite de temps." },
              { icon: Clock, t: "Versement chaque vendredi", d: "Pas d'attente 30 jours. Ton argent arrive chaque semaine sur Mobile Money." },
              { icon: Shield, t: "Cookie 365 jours", d: "Meme si ton filleul s'inscrit 6 mois apres le clic, tu gagnes la commission." },
              { icon: TrendingUp, t: "Dashboard en temps reel", d: "Suis tes clics, inscriptions et commissions en direct dans ton espace." },
              { icon: Users, t: "Pas de limite de filleuls", d: "10, 100 ou 1000 filleuls — tu gagnes sur chacun d'entre eux." },
              { icon: Gift, t: "Inscription 100% gratuite", d: "Aucun frais pour devenir affilier. Tu gagnes des que ton premier filleul s'abonne." },
            ].map(a => (
              <div key={a.t} className="flex gap-4 rounded-2xl border border-border bg-white p-5 shadow-soft">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-forest/10 text-forest">
                  <a.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{a.t}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{a.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Questions frequentes</h2>
          </div>
          <div className="mt-10 space-y-3">
            {[
              { q: "C'est vraiment gratuit ?", a: "Oui. L'inscription est gratuite et tu recois ton lien immediatement. Tu gagnes des que quelqu'un s'abonne via ton lien." },
              { q: "Comment je recois mon argent ?", a: "Chaque vendredi, ta commission est versee sur ton compte Mobile Money (MTN, Orange, Airtel) ou par virement bancaire. Seuil minimum : 500 FCFA." },
              { q: "Combien de temps dure la commission ?", a: "A vie ! Tant que ton filleul reste abonne, tu recois ta commission chaque mois. C'est un revenu passif recurrent." },
              { q: "Je peux promouvoir sur quels canaux ?", a: "Partout : WhatsApp, Facebook, TikTok, Instagram, Telegram, YouTube, email, blog... Seul le spam est interdit." },
              { q: "Mon filleul peut-il voir que je suis son parrain ?", a: "Non. Ton lien est discret. Le filleul ne sait pas qu'il est passe par un lien d'affiliation." },
              { q: "Que se passe-t-il si mon filleul change de plan ?", a: "Ta commission s'ajuste au nouveau plan. S'il passe au Pro Creator, tu gagnes plus !" },
            ].map((f, i) => (
              <div key={i} className="rounded-2xl border border-border bg-white shadow-soft overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex w-full items-center justify-between px-6 py-4 text-left">
                  <span className="font-semibold text-foreground text-sm">{f.q}</span>
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4">
                    <p className="text-sm text-muted-foreground">{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
            Pret a generer des revenus passifs ?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Rejoins des centaines d'affilies qui gagnent chaque semaine grace a Digital Agency.
          </p>
          <Link to="/auth/register" className="mt-8 inline-block rounded-full gradient-primary px-10 py-4 text-lg font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]">
            Commencer maintenant — C'est gratuit
          </Link>
          <p className="mt-4 text-xs text-muted-foreground">Aucune carte requise. Lien genere en 30 secondes.</p>
        </div>
      </section>
    </PublicLayout>
  );
}
