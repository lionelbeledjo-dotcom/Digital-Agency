import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/public-layout";

export const Route = createFileRoute("/cgv")({
  head: () => ({ meta: [{ title: "CGV · Digital Agency" }] }),
  component: () => (
    <PublicLayout>
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-4xl font-bold">Conditions Générales de Vente</h1>
        <div className="mt-8 space-y-5 text-sm text-muted-foreground leading-relaxed">
          <section><h2 className="text-lg font-semibold text-foreground">Objet</h2><p>Les présentes CGV régissent l'utilisation de la plateforme Digital Agency et la souscription aux abonnements Starter, Club IA et Pro Creator.</p></section>
          <section><h2 className="text-lg font-semibold text-foreground">Prix</h2><p>Les prix sont indiqués en FCFA TTC. Starter : gratuit. Club IA : 3 500 FCFA/mois. Pro Creator : 8 500 FCFA/mois.</p></section>
          <section><h2 className="text-lg font-semibold text-foreground">Paiement</h2><p>Modes acceptés : Wero, PayPal, MTN Mobile Money, Orange Money. Tous les paiements sont sécurisés SSL 256-bit.</p></section>
          <section><h2 className="text-lg font-semibold text-foreground">Résiliation</h2><p>L'abonnement est résiliable à tout moment, sans frais, depuis ton espace membre. L'accès reste actif jusqu'à la fin de la période en cours.</p></section>
          <section><h2 className="text-lg font-semibold text-foreground">Remboursement</h2><p>Garantie satisfait ou remboursé pendant 7 jours après le premier paiement.</p></section>
          <section><h2 className="text-lg font-semibold text-foreground">Affiliation</h2><p>Le programme d'affiliation verse 10% à 40% de commission selon le plan. Versement hebdomadaire chaque vendredi dès 500 FCFA.</p></section>
        </div>
      </article>
    </PublicLayout>
  ),
});
