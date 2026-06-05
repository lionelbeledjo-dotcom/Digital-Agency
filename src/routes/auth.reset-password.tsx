import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PublicLayout } from "@/components/public-layout";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { toast } from "sonner";
import { Lock } from "lucide-react";

export const Route = createFileRoute("/auth/reset-password")({
  head: () => ({ meta: [{ title: "Nouveau mot de passe · Digital Agency" }] }),
  component: Page,
});

function Page() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    if (password !== confirm) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }
    if (password.length < 6) {
      toast.error("Minimum 6 caractères.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Mot de passe mis à jour !");
      navigate({ to: "/auth/login" });
    }
  }

  return (
    <PublicLayout>
      <section className="bg-hero-radial py-24">
        <div className="mx-auto max-w-md px-4 sm:px-6">
          <div className="rounded-3xl border border-border bg-white p-8 shadow-soft">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-forest/10">
                <Lock className="h-6 w-6 text-forest" />
              </div>
              <h1 className="mt-4 text-2xl font-bold text-foreground">Nouveau mot de passe</h1>
              <p className="mt-1 text-sm text-muted-foreground">Choisis un nouveau mot de passe sécurisé.</p>
            </div>
            <form onSubmit={submit} className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Nouveau mot de passe</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-forest/20" />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Confirmation</label>
                <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required className="mt-1 w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-forest/20" />
              </div>
              <button disabled={loading} className="w-full rounded-full gradient-primary px-6 py-3 font-semibold text-white shadow-glow disabled:opacity-60 transition-transform hover:scale-[1.02]">
                {loading ? "Mise à jour..." : "Réinitialiser mon mot de passe"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
