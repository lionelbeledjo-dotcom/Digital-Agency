import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/components/public-layout";
import { CheckCircle2, Copy, Share2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/paiement/succes")({
  head: () => ({ meta: [{ title: "Paiement confirmé · Digital Agency" }] }),
  component: SuccesPage,
});

function SuccesPage() {
  const link = "https://lbdigital.com/ref/AMINATA2025";
  return (
    <PublicLayout>
      <section className="bg-hero-radial py-24">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green/20">
            <CheckCircle2 className="h-14 w-14 text-green animate-pulse-dot" />
          </div>
          <h1 className="mt-8 text-4xl font-bold sm:text-5xl">Paiement confirmé ! 🎉</h1>
          <p className="mt-3 text-muted-foreground">Bienvenue dans Digital Agency. Un email de confirmation t'a été envoyé.</p>

          <div className="mt-10 rounded-2xl border border-border bg-card p-6 text-left">
            <p className="text-xs uppercase tracking-wider text-sky">Ton lien d'affiliation</p>
            <div className="mt-3 flex items-center gap-2">
              <code className="flex-1 truncate rounded-lg bg-secondary px-3 py-2 text-sm">{link}</code>
              <button onClick={() => { navigator.clipboard?.writeText(link); toast.success("Lien copié !"); }} className="rounded-lg border border-border p-2 hover:bg-secondary">
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/dashboard" className="rounded-full gradient-cobalt px-6 py-3 text-sm font-semibold text-white shadow-glow">
              Accéder à mon espace →
            </Link>
            <a href={`https://wa.me/?text=Rejoins-moi sur Digital Agency : ${link}`} target="_blank" rel="noreferrer" className="rounded-full border border-border px-6 py-3 text-sm font-semibold flex items-center gap-2">
              <Share2 className="h-4 w-4" /> Partager WhatsApp
            </a>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
