import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/components/public-layout";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/auth/forgot-password")({
  head: () => ({ meta: [{ title: "Mot de passe oublié · Digital Agency" }] }),
  component: Page,
});

function Page() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    setSent(true);
    toast.success("Email envoyé !");
  }

  return (
    <PublicLayout>
      <section className="bg-hero-radial py-24">
        <div className="mx-auto max-w-md px-4 sm:px-6">
          {sent ? (
            <div className="rounded-3xl border border-border bg-white p-8 shadow-soft text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-forest/10 mx-auto">
                <Mail className="h-7 w-7 text-forest" />
              </div>
              <h1 className="mt-4 text-2xl font-bold text-foreground">Email envoyé !</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Si un compte existe avec cette adresse, tu recevras un lien de réinitialisation.
              </p>
              <p className="mt-3 text-xs text-muted-foreground">Vérifie aussi ton dossier spam.</p>
              <Link to="/auth/login" className="mt-6 inline-flex items-center gap-2 rounded-full gradient-primary px-6 py-3 text-sm font-semibold text-white">
                <ArrowLeft className="h-4 w-4" /> Retour à la connexion
              </Link>
            </div>
          ) : (
            <div className="rounded-3xl border border-border bg-white p-8 shadow-soft">
              <h1 className="text-2xl font-bold text-foreground">Mot de passe oublié</h1>
              <p className="mt-2 text-sm text-muted-foreground">Entre ton email, on t'envoie un lien de réinitialisation.</p>
              <form onSubmit={submit} className="mt-6 space-y-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground">Email</label>
                  <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-forest/20" />
                </div>
                <button disabled={loading} className="w-full rounded-full gradient-primary px-6 py-3 font-semibold text-white shadow-glow disabled:opacity-60">
                  {loading ? "Envoi..." : "Envoyer le lien"}
                </button>
              </form>
              <p className="mt-4 text-center text-xs text-muted-foreground">
                <Link to="/auth/login" className="inline-flex items-center gap-1 text-forest font-semibold">
                  <ArrowLeft className="h-3 w-3" /> Retour à la connexion
                </Link>
              </p>
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
