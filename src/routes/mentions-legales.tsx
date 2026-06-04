import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/public-layout";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({ meta: [{ title: "Mentions légales · Digital Agency" }] }),
  component: () => (
    <PublicLayout>
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-4xl font-bold">Mentions légales</h1>
        <div className="mt-8 space-y-5 text-sm text-muted-foreground leading-relaxed">
          <section><h2 className="text-lg font-semibold text-foreground">Éditeur</h2><p>Digital Agency · Plateforme de formation et affiliation. Siège : Abidjan, Côte d'Ivoire.</p></section>
          <section><h2 className="text-lg font-semibold text-foreground">Hébergement</h2><p>Cloudflare Workers, infrastructure mondiale.</p></section>
          <section><h2 className="text-lg font-semibold text-foreground">Propriété intellectuelle</h2><p>L'ensemble des contenus, formations, textes, vidéos et visuels est la propriété exclusive de Digital Agency.</p></section>
          <section><h2 className="text-lg font-semibold text-foreground">Données personnelles</h2><p>Les données sont traitées conformément aux normes RGPD. Tu peux exercer tes droits à tout moment via contact@lbdigital.com.</p></section>
          <section><h2 className="text-lg font-semibold text-foreground">Cookies</h2><p>La plateforme utilise des cookies fonctionnels pour ton expérience et le tracking d'affiliation (365 jours).</p></section>
        </div>
      </article>
    </PublicLayout>
  ),
});
