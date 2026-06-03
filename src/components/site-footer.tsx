import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Send, MessageCircle, Sparkles } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-navy">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-cobalt">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold">LB Digital</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              La plateforme “Apprends & Gagne” qui forme l'Afrique francophone à l'IA et reverse des commissions chaque vendredi.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[Facebook, Instagram, Send, MessageCircle].map((Icon, i) => (
                <a key={i} href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-secondary hover:text-foreground">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {[
            { title: "Plateforme", links: [["Accueil","/"],["Fonctionnement","/detail"],["Tarifs","/tarifs"],["Affiliation","/affiliation"]] },
            { title: "Formations", links: [["Catalogue","/formations"],["Blog","/blog"],["FAQ","/faq"]] },
            { title: "Légal", links: [["Mentions légales","/mentions-legales"],["CGV","/cgv"],["Contact","/contact"]] },
          ].map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold tracking-wide uppercase">{col.title}</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {col.links.map(([label, href]) => (
                  <li key={href}><Link to={href} className="text-muted-foreground hover:text-foreground">{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-border pt-8">
          {["Wero","PayPal","MTN Mobile Money","Orange Money"].map((p) => (
            <span key={p} className="rounded-full border border-border bg-secondary px-3 py-1 text-xs text-muted-foreground">{p}</span>
          ))}
          <p className="ml-auto text-xs text-muted-foreground">© 2025 LB Digital · Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
}
