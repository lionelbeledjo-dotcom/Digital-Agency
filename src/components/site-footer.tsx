import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Send, MessageCircle, Youtube } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Reseaux {
  facebook: string;
  instagram: string;
  telegram: string;
  whatsapp: string;
  tiktok: string;
  youtube: string;
}

export function SiteFooter() {
  const [reseaux, setReseaux] = useState<Reseaux>({
    facebook: "https://www.facebook.com/digitalagency.site",
    instagram: "https://www.instagram.com/digitalagency.site",
    telegram: "https://t.me/digitalagencysite",
    whatsapp: "https://wa.me/message/digitalagency",
    tiktok: "",
    youtube: "",
  });

  useEffect(() => {
    supabase.from("site_content").select("value").eq("key", "reseaux_sociaux").single().then(({ data }) => {
      if (data) setReseaux(data.value as Reseaux);
    });
  }, []);

  const socialLinks = [
    { Icon: Facebook, href: reseaux.facebook },
    { Icon: Instagram, href: reseaux.instagram },
    { Icon: Send, href: reseaux.telegram },
    { Icon: MessageCircle, href: reseaux.whatsapp },
    { Icon: Youtube, href: reseaux.youtube },
  ].filter((s) => s.href);

  return (
    <footer className="bg-forest text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber">
                <span className="text-sm font-bold text-forest">DA</span>
              </div>
              <span className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>Digital Agency</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-white/70">
              La plateforme "Apprends & Gagne" qui forme l'Afrique francophone à l'IA et reverse des commissions chaque vendredi.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ Icon, href }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/70 hover:bg-white/10 hover:text-white transition-colors">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {[
            { title: "Plateforme", links: [["Accueil","/"],["À propos","/a-propos"],["Tarifs","/tarifs"],["Affiliation","/affiliation"]] },
            { title: "Formations", links: [["Catalogue","/formations"],["Témoignages","/temoignages"],["Blog","/blog"],["FAQ","/faq"]] },
            { title: "Légal", links: [["Mentions légales","/mentions-legales"],["CGV","/cgv"],["Contact","/contact"]] },
          ].map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold tracking-wide uppercase text-amber">{col.title}</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {col.links.map(([label, href]) => (
                  <li key={href}><Link to={href} className="text-white/70 hover:text-white transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-white/10 pt-8">
          {["Wero","PayPal","MTN Mobile Money","Orange Money"].map((p) => (
            <span key={p} className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs text-white/70">{p}</span>
          ))}
          <p className="ml-auto text-xs text-white/50">&copy; 2025–2026 Digital Agency &middot; Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
}
