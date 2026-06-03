import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { PublicLayout } from "@/components/public-layout";
import { useAppStore } from "@/store/appStore";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/auth/login")({
  head: () => ({ meta: [{ title: "Connexion · LB Digital" }] }),
  component: LoginPage,
});

function LoginPage() {
  const login = useAppStore((s) => s.login);
  const navigate = useNavigate();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    login("aminata@example.com");
    navigate({ to: "/dashboard" });
  }

  return (
    <PublicLayout>
      <section className="bg-hero-radial py-20">
        <div className="mx-auto max-w-md px-4 sm:px-6">
          <div className="rounded-3xl border border-border bg-card p-8">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-cobalt shadow-glow">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h1 className="mt-4 text-2xl font-bold">Bon retour</h1>
              <p className="mt-1 text-sm text-muted-foreground">Connecte-toi à ton espace LB Digital.</p>
            </div>
            <form onSubmit={submit} className="mt-6 space-y-4">
              <Field label="Email" type="email" defaultValue="aminata@example.com" />
              <Field label="Mot de passe" type="password" defaultValue="password" />
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-muted-foreground"><input type="checkbox" /> Se souvenir</label>
                <Link to="/auth/forgot-password" className="text-sky">Mot de passe oublié ?</Link>
              </div>
              <button type="submit" className="w-full rounded-full gradient-cobalt px-6 py-3 text-sm font-semibold text-white shadow-glow">Se connecter</button>
              <p className="text-center text-xs text-muted-foreground">
                Pas encore inscrit ? <Link to="/auth/register" className="text-sky font-semibold">Créer un compte</Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</label>
      <input {...rest} className="mt-1 w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cobalt/40" />
    </div>
  );
}
