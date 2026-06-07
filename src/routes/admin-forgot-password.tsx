import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Mail, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin-forgot-password")({
  head: () => ({ meta: [{ title: "Admin · Mot de passe oublié" }] }),
  component: AdminForgotPasswordPage,
});

function AdminForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      toast.success("Email de réinitialisation envoyé !");
    }, 1200);
  }

  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-olive p-12">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber">
            <span className="text-sm font-bold text-forest">DA</span>
          </div>
          <span className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>Digital Agency</span>
        </div>

        <div className="max-w-md">
          <h1 className="text-4xl font-bold text-white leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
            Réinitialisation du mot de passe
          </h1>
          <p className="mt-4 text-white/60 text-lg">
            On t'envoie un lien sécurisé par email pour créer un nouveau mot de passe.
          </p>
        </div>

        <p className="text-xs text-white/30">&copy; 2025 Digital Agency · Accès réservé</p>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 items-center justify-center bg-secondary px-4 py-12">
        <div className="w-full max-w-md">
          {sent ? (
            <div className="rounded-3xl border border-border bg-white p-8 shadow-soft text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-forest/10 mx-auto">
                <Mail className="h-7 w-7 text-forest" />
              </div>
              <h2 className="mt-4 text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>Email envoyé !</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Si un compte admin existe avec cette adresse, tu recevras un lien de réinitialisation dans quelques instants.
              </p>
              <p className="mt-4 text-xs text-muted-foreground">
                Vérifie aussi ton dossier spam. Le lien expire dans 1 heure.
              </p>
              <Link to="/admin-login" className="mt-6 inline-flex items-center gap-2 rounded-full bg-olive px-6 py-3 text-sm font-semibold text-white hover:bg-olive/90 transition-colors">
                <ArrowLeft className="h-4 w-4" /> Retour à la connexion
              </Link>
            </div>
          ) : (
            <div className="rounded-3xl border border-border bg-white p-8 shadow-soft">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-olive">
                  <ShieldCheck className="h-7 w-7 text-amber" />
                </div>
                <h2 className="mt-4 text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>Mot de passe oublié</h2>
                <p className="mt-1 text-sm text-muted-foreground">Entre ton email admin pour recevoir le lien de réinitialisation.</p>
              </div>

              <form onSubmit={submit} className="mt-8 space-y-5">
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Email administrateur</label>
                  <input
                    type="email"
                    placeholder="admin@digitalagency.com"
                    className="mt-1 w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-olive/30"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-olive px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-olive/90 disabled:opacity-60"
                >
                  {loading ? "Envoi en cours..." : "Envoyer le lien de réinitialisation"}
                </button>
              </form>

              <p className="mt-5 text-center text-xs text-muted-foreground">
                <Link to="/admin-login" className="inline-flex items-center gap-1 text-forest font-semibold hover:text-forest-light">
                  <ArrowLeft className="h-3 w-3" /> Retour à la connexion
                </Link>
              </p>
            </div>
          )}

          {/* Mobile branding */}
          <div className="mt-6 text-center lg:hidden">
            <div className="flex items-center justify-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber">
                <span className="text-xs font-bold text-forest">DA</span>
              </div>
              <span className="font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>Digital Agency</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
