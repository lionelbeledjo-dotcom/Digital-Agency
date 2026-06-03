import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/public-layout";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/faq")({
  head: () => ({ meta: [{ title: "FAQ · LB Digital" }] }),
  component: FaqPage,
});

const sections = [
  { titre: "Général", qs: [
    { q: "Qu'est-ce que LB Digital ?", a: "Une plateforme de formation IA + affiliation pour l'Afrique francophone." },
    { q: "À qui s'adresse la plateforme ?", a: "Tout francophone qui veut apprendre l'IA et générer des revenus." },
    { q: "Combien ça coûte pour commencer ?", a: "0 FCFA. Le plan Starter est gratuit à vie." },
    { q: "Dans quels pays c'est disponible ?", a: "12 pays d'Afrique francophone + Europe via Wero/PayPal." },
    { q: "Y a-t-il une app mobile ?", a: "La plateforme est 100% responsive, pensée mobile-first." },
  ]},
  { titre: "Formations", qs: [
    { q: "Combien de formations sont disponibles ?", a: "15 formations couvrant IA, design, vidéo, marketing, business." },
    { q: "Y a-t-il des certificats ?", a: "Oui, dès le plan Club IA, téléchargeables après 100% de complétion." },
    { q: "Les formations sont-elles à vie ?", a: "Oui tant que ton abonnement est actif." },
    { q: "Y a-t-il un examen final ?", a: "Chaque formation a un quiz de validation." },
    { q: "Puis-je télécharger les vidéos ?", a: "Streaming uniquement, mais ressources PDF téléchargeables." },
  ]},
  { titre: "Paiements", qs: [
    { q: "Quels moyens de paiement ?", a: "Wero, PayPal, MTN Mobile Money, Orange Money." },
    { q: "Est-ce sécurisé ?", a: "Oui, SSL 256-bit et partenaires certifiés." },
    { q: "Puis-je annuler ?", a: "Oui à tout moment, sans frais." },
    { q: "Y a-t-il un remboursement ?", a: "Oui, 7 jours satisfait ou remboursé." },
  ]},
  { titre: "Commissions & Affiliation", qs: [
    { q: "Quand suis-je payé ?", a: "Chaque vendredi automatiquement dès 500 FCFA." },
    { q: "Quel est le taux ?", a: "10% (Starter), 25% (Club IA), 40% (Pro Creator)." },
    { q: "Combien de temps dure le cookie ?", a: "365 jours." },
    { q: "Les commissions sont-elles récurrentes ?", a: "Oui, tant que ton filleul reste abonné." },
  ]},
  { titre: "Technique", qs: [
    { q: "Quels appareils sont compatibles ?", a: "Tout smartphone, tablette ou ordinateur avec un navigateur récent." },
    { q: "Quel débit minimum ?", a: "3G suffit. Tu peux baisser la qualité vidéo." },
  ]},
];

function FaqPage() {
  const [open, setOpen] = useState<string | null>("s0q0");
  return (
    <PublicLayout>
      <section className="bg-hero-radial py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h1 className="text-4xl font-bold sm:text-5xl">Foire aux questions</h1>
          <p className="mt-3 text-muted-foreground">Tout ce que tu dois savoir avant de te lancer.</p>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-3xl space-y-10 px-4 sm:px-6">
          {sections.map((s, i) => (
            <div key={s.titre}>
              <h2 className="text-xl font-bold text-sky">{s.titre}</h2>
              <div className="mt-4 space-y-2">
                {s.qs.map((qa, j) => {
                  const k = `s${i}q${j}`;
                  const isOpen = open === k;
                  return (
                    <div key={k} className="rounded-2xl border border-border bg-card">
                      <button onClick={() => setOpen(isOpen ? null : k)} className="flex w-full items-center justify-between p-4 text-left">
                        <span className="font-medium">{qa.q}</span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                      {isOpen && <p className="px-4 pb-4 text-sm text-muted-foreground">{qa.a}</p>}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}
