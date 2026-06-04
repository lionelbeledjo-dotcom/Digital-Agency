import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { PublicLayout } from "@/components/public-layout";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/auth/login")({
  head: () => ({ meta: [{ title: "Connexion · Digital Agency" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast.error(error.message === "Invalid login credentials"
        ? "Email ou mot de passe incorrect."
        : error.message);
      setLoading(false);
      return;
    }

    toast.success("Connexion réussie !");
    navigate({ to: "/dashboard" });
  }

  return (
    <PublicLayout>
      <section className="bg-hero-radial py-20">
        <div className="mx-auto max-w-md px-4 sm:px-6">
          <div className="rounded-3xl border border-border bg-white p-8 shadow-soft">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-forest">
                <span className="text-lg font-bold text-white">LB</span>
              </div>
              <h1 className="mt-4 text-2xl font-bold text-foreground">Bon retour</h1>
              <p className="mt-1 text-sm text-muted-foreground">Connecte-toi à ton espace Digital Agency.</p>
            </div>
            <form onSubmit={submit} className="mt-6 space-y-4">
              <Field label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <Field label="Mot de passe" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-muted-foreground"><input type="checkbox" /> Se souvenir</label>
                <Link to="/auth/forgot-password" className="text-forest font-medium">Mot de passe oublié ?</Link>
              </div>
              <button type="submit" disabled={loading} className="w-full rounded-full gradient-primary px-6 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02] disabled:opacity-60">
                {loading ? "Connexion..." : "Se connecter"}
              </button>
              <p className="text-center text-xs text-muted-foreground">
                Pas encore inscrit ? <Link to="/auth/register" className="text-forest font-semibold">Créer un compte</Link>
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
      <input {...rest} className="mt-1 w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-forest/20" />
    </div>
  );
}
