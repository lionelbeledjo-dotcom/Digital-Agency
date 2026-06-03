import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/components/public-layout";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { useMemo, useState } from "react";
import { useAppStore } from "@/store/appStore";

export const Route = createFileRoute("/affiliation")({
  head: () => ({ meta: [{ title: "Affiliation · LB Digital" }] }),
  component: AffiliationPage,
});

function AffiliationPage() {
  const plans = useAppStore((s) => s.settings.plans);
  const [filleuls, setFilleuls] = useState(20);
  const [monPlan, setMonPlan] = useState<"starter" | "club_ia" | "pro_creator">("club_ia");
  const [planFilleul, setPlanFilleul] = useState<"club_ia" | "pro_creator">("club_ia");

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
      <section className="bg-hero-radial py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="text-sm uppercase tracking-wider text-sky">Programme d'affiliation</p>
          <h1 className="mt-3 text-4xl font-bold sm:text-6xl">Gagne jusqu'à <span className="text-gradient">40%</span> de commission récurrente à vie</h1>
          <p className="mt-4 text-muted-foreground">Chaque filleul, chaque mois, ta commission tombe. Versement chaque vendredi.</p>
          <Link to="/auth/register" className="mt-8 inline-block rounded-full gradient-cobalt px-7 py-4 font-semibold text-white shadow-glow">Obtenir mon lien gratuit</Link>
        </div>
      </section>

      <section className="border-t border-border py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center">4 étapes simples</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "01", t: "Inscription gratuite", d: "Crée ton compte en 30 secondes." },
              { n: "02", t: "Récupère ton lien", d: "Ton lien unique de tracking est prêt." },
              { n: "03", t: "Partage", d: "WhatsApp, TikTok, Facebook, Insta." },
              { n: "04", t: "Encaisse", d: "Versement chaque vendredi." },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl border border-border bg-card p-5">
                <p className="font-serif text-3xl text-muted-foreground/50">{s.n}</p>
                <h3 className="mt-3 font-semibold">{s.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simulator */}
      <section className="border-t border-border bg-navy2/30 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold">Simulateur de revenus</h2>
          <p className="mt-2 text-muted-foreground">Calcule ce que tu peux gagner.</p>

          <div className="mt-8 grid gap-6 rounded-2xl border border-border bg-card p-6 lg:grid-cols-[1fr_1fr]">
            <div className="space-y-5">
              <div>
                <label className="text-sm font-medium">Nombre de filleuls actifs : <span className="text-sky">{filleuls}</span></label>
                <input type="range" min={0} max={200} value={filleuls} onChange={(e) => setFilleuls(Number(e.target.value))} className="mt-2 w-full accent-cobalt" />
              </div>
              <div>
                <label className="text-sm font-medium">Mon plan</label>
                <select value={monPlan} onChange={(e) => setMonPlan(e.target.value as typeof monPlan)} className="mt-2 w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm">
                  <option value="starter">Starter (10%)</option>
                  <option value="club_ia">Club IA (25%)</option>
                  <option value="pro_creator">Pro Creator (40%)</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Plan des filleuls</label>
                <select value={planFilleul} onChange={(e) => setPlanFilleul(e.target.value as typeof planFilleul)} className="mt-2 w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm">
                  <option value="club_ia">Club IA (3 500 FCFA)</option>
                  <option value="pro_creator">Pro Creator (8 500 FCFA)</option>
                </select>
              </div>
            </div>

            <div className="rounded-xl border border-cobalt/40 bg-gradient-to-br from-cobalt/20 to-teal/10 p-6">
              <p className="text-xs uppercase tracking-wider text-sky">Commission par mois</p>
              <p className="mt-1 font-serif text-4xl font-bold">{commissionMois.toLocaleString("fr-FR")} FCFA</p>
              <p className="mt-4 text-xs uppercase tracking-wider text-sky">Commission par an</p>
              <p className="mt-1 font-serif text-3xl font-bold">{commissionAn.toLocaleString("fr-FR")} FCFA</p>
            </div>
          </div>

          <div className="mt-6 h-64 rounded-2xl border border-border bg-card p-4">
            <ResponsiveContainer>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="mois" stroke="#888" fontSize={11} />
                <YAxis stroke="#888" fontSize={11} />
                <Tooltip contentStyle={{ background: "#0F1E38", border: "1px solid #1A56DB", borderRadius: 8 }} />
                <Line type="monotone" dataKey="revenu" stroke="#3B82F6" strokeWidth={3} dot={{ fill: "#0EA5E9" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center">Règles du programme</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3 text-sm">
            {[
              { t: "Versement vendredi", d: "Chaque semaine, sans exception." },
              { t: "Cookie 365 jours", d: "Tes filleuls comptent même 1 an après le clic." },
              { t: "Seuil 500 FCFA", d: "Dépasse 500 FCFA pour déclencher le virement." },
            ].map((r) => (
              <div key={r.t} className="rounded-2xl border border-border bg-card p-5 text-center">
                <p className="font-semibold">{r.t}</p>
                <p className="mt-2 text-muted-foreground">{r.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/auth/register" className="rounded-full gradient-cobalt px-7 py-4 font-semibold text-white shadow-glow">Démarrer maintenant</Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
