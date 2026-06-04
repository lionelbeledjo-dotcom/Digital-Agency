import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/components/public-layout";
import { useAppStore } from "@/store/appStore";
import { Check, X } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/tarifs")({
  head: () => ({ meta: [{ title: "Tarifs · Digital Agency" }] }),
  component: TarifsPage,
});

const compareRows = [
  { label: "Prix mensuel", starter: "Gratuit", club: "3 500 FCFA", pro: "8 500 FCFA" },
  { label: "Formations gratuites", starter: "3", club: "Toutes", pro: "Toutes" },
  { label: "Nouvelles formations/semaine", starter: false, club: true, pro: true },
  { label: "Templates & ressources", starter: false, club: true, pro: true },
  { label: "Groupe Telegram", starter: true, club: true, pro: true },
  { label: "WhatsApp VIP", starter: false, club: true, pro: true },
  { label: "Coaching groupe", starter: false, club: true, pro: true },
  { label: "Coaching 1-on-1", starter: false, club: false, pro: true },
  { label: "Badge certifié", starter: false, club: false, pro: true },
  { label: "Lien affilié", starter: true, club: true, pro: true },
  { label: "Commission", starter: "10%", club: "25%", pro: "40%" },
  { label: "Retrait prioritaire", starter: false, club: false, pro: true },
  { label: "Avant-première", starter: false, club: false, pro: true },
  { label: "Certificats", starter: false, club: true, pro: true },
  { label: "Support prioritaire", starter: false, club: false, pro: true },
];

function TarifsPage() {
  const plans = useAppStore((s) => s.settings.plans);
  const [annuel, setAnnuel] = useState(false);

  const planList = [
    { id: "starter" as const, anchor: "starter", ...plans.starter },
    { id: "club_ia" as const, anchor: "club", ...plans.club_ia },
    { id: "pro_creator" as const, anchor: "pro", ...plans.pro_creator },
  ];

  return (
    <PublicLayout>
      <section className="bg-hero-radial py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h1 className="text-4xl font-bold text-foreground sm:text-5xl">Choisir le bon plan pour toi</h1>
          <p className="mt-4 text-muted-foreground">Commence gratuitement. Monte en gamme dès que tu génères tes premières commissions.</p>
          <div className="mt-8 inline-flex rounded-full border border-border bg-secondary p-1">
            <button onClick={() => setAnnuel(false)} className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${!annuel ? "gradient-primary text-white" : "text-muted-foreground"}`}>Mensuel</button>
            <button onClick={() => setAnnuel(true)} className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${annuel ? "gradient-primary text-white" : "text-muted-foreground"}`}>Annuel <span className="ml-1 text-forest font-semibold">-20%</span></button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-5 lg:grid-cols-3">
            {planList.map((p) => {
              const prix = annuel && "prixAnnuel" in p ? (p as { prixAnnuel: number }).prixAnnuel / 12 : p.prixMensuel;
              return (
                <div key={p.id} className={`relative rounded-3xl border bg-white p-7 shadow-soft ${p.populaire ? "border-forest ring-2 ring-forest/10" : "border-border"}`}>
                  {p.populaire && <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full gradient-primary px-4 py-1 text-xs font-bold text-white">⚡ Populaire</div>}
                  <h3 className="text-lg font-bold text-foreground">{p.nom}</h3>
                  <p className="mt-4 text-5xl font-bold text-forest" style={{ fontFamily: "var(--font-heading)" }}>{prix === 0 ? "Gratuit" : <>{Math.round(prix).toLocaleString("fr-FR")} <span className="text-base font-normal text-muted-foreground">FCFA{annuel ? "/mois eq." : "/mois"}</span></>}</p>
                  <p className="mt-2 text-sm text-amber font-medium">Commission {p.commission}%</p>
                  <ul className="mt-6 space-y-2 text-sm">
                    {p.features.map((f) => <li key={f} className="flex gap-2 text-muted-foreground"><Check className="mt-0.5 h-4 w-4 shrink-0 text-forest" /> {f}</li>)}
                  </ul>
                  <Link to="/paiement" hash={p.anchor} className={`mt-6 block rounded-full px-5 py-3 text-center text-sm font-semibold transition-all ${p.populaire ? "gradient-primary text-white shadow-glow hover:scale-[1.02]" : "border-2 border-forest/20 text-forest hover:border-forest/40"}`}>
                    {p.prixMensuel === 0 ? "Commencer" : "Choisir ce plan"}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tableau comparatif */}
      <section className="bg-secondary py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-foreground text-center">Comparatif complet</h2>
          <div className="mt-10 overflow-x-auto rounded-2xl border border-border bg-white shadow-soft">
            <table className="w-full text-sm">
              <thead className="border-b border-border">
                <tr>
                  <th className="px-4 py-4 text-left font-semibold text-foreground">Fonctionnalité</th>
                  <th className="px-4 py-4 text-center font-semibold text-foreground">Starter</th>
                  <th className="px-4 py-4 text-center font-semibold text-forest">Club IA</th>
                  <th className="px-4 py-4 text-center font-semibold text-amber">Pro Creator</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((r) => (
                  <tr key={r.label} className="border-b border-border/40">
                    <td className="px-4 py-3 text-muted-foreground">{r.label}</td>
                    {(["starter","club","pro"] as const).map((k) => {
                      const v = r[k];
                      return (
                        <td key={k} className="px-4 py-3 text-center">
                          {typeof v === "boolean" ? (v ? <Check className="mx-auto h-4 w-4 text-forest" /> : <X className="mx-auto h-4 w-4 text-muted-foreground/30" />) : <span className="font-medium text-foreground">{v}</span>}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Moyens de paiement */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-foreground text-center">Moyens de paiement</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {[
              { n: "Wero", d: "Virement instantané · France, Belgique, Allemagne, Espagne, Portugal." },
              { n: "PayPal", d: "Solde PayPal ou carte · Disponible dans 200+ pays." },
              { n: "MTN Mobile Money", d: "Cameroun, CI, Bénin, Congo, Ghana · Push + PIN sur ton téléphone." },
              { n: "Orange Money", d: "CI, Sénégal, Cameroun, Mali, Guinée · Confirmation depuis ton menu Orange." },
            ].map((p) => (
              <div key={p.n} className="rounded-2xl border border-border bg-white p-6 shadow-soft">
                <h3 className="font-semibold text-foreground">{p.n}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span>🔒 Paiement 100% sécurisé</span>
            <span>✓ Satisfait ou remboursé 7 jours</span>
            <span>✓ Résiliation à tout moment</span>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
