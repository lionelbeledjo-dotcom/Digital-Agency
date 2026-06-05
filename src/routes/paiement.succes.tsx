import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/components/public-layout";
import { CheckCircle2, Copy, Share2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/paiement/succes")({
  head: () => ({ meta: [{ title: "Paiement confirmé · Digital Agency" }] }),
  component: SuccesPage,
});

function SuccesPage() {
  const link = "https://digital-agency.site/?ref=MONCODE";
  return (
    <PublicLayout>
      <section className="bg-hero-radial py-24">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-forest/10">
            <CheckCircle2 className="h-14 w-14 text-forest animate-pulse-dot" />
          </div>
          <h1 className="mt-8 text-4xl font-bold text-foreground sm:text-5xl" style={{ fontFamily: "var(--font-heading)" }}>Paiement confirmé !</h1>
          <p className="mt-3 text-muted-foreground">Bienvenue dans Digital Agency. Un email de confirmation t'a été envoyé.</p>

          <div className="mt-10 rounded-2xl border border-border bg-white p-6 text-left shadow-soft">
            <p className="text-xs uppercase tracking-wider text-forest font-semibold">Ton lien d'affiliation</p>
            <p className="mt-1 text-xs text-muted-foreground">Partage ce lien pour gagner des commissions sur chaque inscription.</p>
            <div className="mt-3 flex items-center gap-2">
              <code className="flex-1 truncate rounded-xl bg-secondary border border-border px-3 py-2 text-sm text-foreground">{link}</code>
              <button onClick={() => { navigator.clipboard?.writeText(link); toast.success("Lien copié !"); }} className="rounded-xl border border-border p-2 hover:bg-secondary transition-colors">
                <Copy className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/dashboard" className="rounded-full gradient-primary px-6 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]">
              Accéder à mon espace →
            </Link>
            <a href={`https://wa.me/?text=Rejoins-moi sur Digital Agency : ${link}`} target="_blank" rel="noreferrer" className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground flex items-center gap-2 hover:bg-secondary transition-colors">
              <Share2 className="h-4 w-4" /> Partager WhatsApp
            </a>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
