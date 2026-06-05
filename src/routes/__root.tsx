import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Toaster } from "@/components/ui/sonner";
import { DemoSwitcher } from "@/components/demo-switcher";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-hero-radial px-4">
      <div className="max-w-md text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-amber font-semibold">Erreur 404</p>
        <h1 className="mt-4 text-7xl font-bold text-foreground">Page introuvable</h1>
        <p className="mt-4 text-muted-foreground">
          Cette page n'existe pas ou a été déplacée.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="rounded-full gradient-primary px-6 py-3 text-sm font-semibold text-white">Accueil</Link>
          <Link to="/formations" className="rounded-full border-2 border-forest/20 px-6 py-3 text-sm font-semibold text-forest">Formations</Link>
          <Link to="/contact" className="rounded-full border-2 border-forest/20 px-6 py-3 text-sm font-semibold text-forest">Contact</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Cette page n'a pas pu se charger
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">Réessaie ou retourne à l'accueil.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-md gradient-primary px-4 py-2 text-sm font-medium text-white"
          >
            Réessayer
          </button>
          <a href="/" className="rounded-md border border-border px-4 py-2 text-sm font-medium">Accueil</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Digital Agency · Apprends. Partage. Gagne." },
      { name: "description", content: "Digital Agency — Plateforme de formation IA et marketing digital avec affiliation pour l'Afrique francophone." },
      { property: "og:title", content: "Digital Agency · Apprends. Partage. Gagne." },
      { property: "og:description", content: "Digital Agency — Plateforme de formation IA et marketing digital avec affiliation pour l'Afrique francophone." },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Digital Agency · Apprends. Partage. Gagne." },
      { name: "twitter:description", content: "Digital Agency — Plateforme de formation IA et marketing digital avec affiliation pour l'Afrique francophone." },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@500;600;700;800&family=Playfair+Display:ital,wght@0,700;1,700&display=swap" },
    ],
    scripts: [
      { src: "https://cdn.cinetpay.com/seamless/main.js", async: true },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <DemoSwitcher />
      <Toaster theme="light" position="top-right" richColors />
    </QueryClientProvider>
  );
}
