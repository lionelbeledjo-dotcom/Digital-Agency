import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/components/public-layout";
import { toast } from "sonner";

export const Route = createFileRoute("/auth/forgot-password")({
  head: () => ({ meta: [{ title: "Mot de passe oublié · LB Digital" }] }),
  component: Page,
});

function Page() {
  return (
    <PublicLayout>
      <section className="bg-hero-radial py-24">
        <div className="mx-auto max-w-md rounded-3xl border border-border bg-card p-8">
          <h1 className="text-2xl font-bold">Mot de passe oublié</h1>
          <p className="mt-2 text-sm text-muted-foreground">Entre ton email, on t'envoie un lien de réinitialisation.</p>
          <form onSubmit={(e) => { e.preventDefault(); toast.success("Email envoyé !"); }} className="mt-6 space-y-4">
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Email</label>
              <input required type="email" className="mt-1 w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm" />
            </div>
            <button className="w-full rounded-full gradient-cobalt px-6 py-3 font-semibold text-white shadow-glow">Envoyer le lien</button>
          </form>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            <Link to="/auth/login" className="text-sky">← Retour à la connexion</Link>
          </p>
        </div>
      </section>
    </PublicLayout>
  );
}
