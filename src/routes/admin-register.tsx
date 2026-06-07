import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ShieldCheck, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin-register")({
  head: () => ({ meta: [{ title: "Admin · Création de compte" }] }),
  component: AdminRegisterPage,
});

function AdminRegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      toast.success("Un email de confirmation a été envoyé !");
    }, 1500);
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
            Deviens administrateur
          </h1>
          <p className="mt-4 text-white/60 text-lg">
            Crée ton compte admin pour gérer la plateforme Digital Agency.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              "Gestion complète des membres",
              "Suivi des commissions et paiements",
              "Création et édition des formations",
              "Accès aux statistiques avancées",
            ].map((f) => (
              <li key={f} className="flex items-center gap-3 text-white/80 text-sm">
                <CheckCircle2 className="h-4 w-4 text-amber shrink-0" /> {f}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-white/30">&copy; 2025 Digital Agency · Accès réservé</p>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 items-center justify-center bg-secondary px-4 py-12">
        <div className="w-full max-w-md">
          {success ? (
            <div className="rounded-3xl border border-border bg-white p-8 shadow-soft text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-forest/10 mx-auto">
                <CheckCircle2 className="h-7 w-7 text-forest" />
              </div>
              <h2 className="mt-4 text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>Email envoyé !</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Un email de confirmation a été envoyé à ton adresse. Clique sur le lien dans l'email pour activer ton compte administrateur.
              </p>
              <p className="mt-4 text-xs text-muted-foreground">
                Vérifie aussi ton dossier spam.
              </p>
              <Link to="/admin-login" className="mt-6 inline-block rounded-full bg-olive px-6 py-3 text-sm font-semibold text-white hover:bg-olive/90 transition-colors">
                Retour à la connexion
              </Link>
            </div>
          ) : (
            <div className="rounded-3xl border border-border bg-white p-8 shadow-soft">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-olive">
                  <ShieldCheck className="h-7 w-7 text-amber" />
                </div>
                <h2 className="mt-4 text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>Créer un compte admin</h2>
                <p className="mt-1 text-sm text-muted-foreground">Un email de confirmation sera envoyé.</p>
              </div>

              <form onSubmit={submit} className="mt-8 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Prénom</label>
                    <input type="text" required className="mt-1 w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-olive/30" />
                  </div>
                  <div>
                    <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Nom</label>
                    <input type="text" required className="mt-1 w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-olive/30" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Email professionnel</label>
                  <input type="email" required className="mt-1 w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-olive/30" />
                </div>
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Mot de passe</label>
                  <input type="password" required className="mt-1 w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-olive/30" />
                </div>
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Confirmer le mot de passe</label>
                  <input type="password" required className="mt-1 w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-olive/30" />
                </div>
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Code d'invitation admin</label>
                  <input type="text" required placeholder="Fourni par le super-admin" className="mt-1 w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-olive/30" />
                </div>

                <label className="flex items-start gap-2 text-xs text-muted-foreground">
                  <input type="checkbox" required className="mt-0.5" /> J'accepte les conditions d'utilisation de la plateforme admin.
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-olive px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-olive/90 disabled:opacity-60"
                >
                  {loading ? "Création en cours..." : "Créer mon compte admin"}
                </button>
              </form>

              <p className="mt-5 text-center text-xs text-muted-foreground">
                Déjà un compte ? <Link to="/admin-login" className="text-forest font-semibold hover:text-forest-light">Se connecter</Link>
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
