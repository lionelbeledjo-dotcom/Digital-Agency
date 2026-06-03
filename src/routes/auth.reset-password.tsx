import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PublicLayout } from "@/components/public-layout";
import { toast } from "sonner";

export const Route = createFileRoute("/auth/reset-password")({
  head: () => ({ meta: [{ title: "Nouveau mot de passe · LB Digital" }] }),
  component: Page,
});

function Page() {
  const nav = useNavigate();
  return (
    <PublicLayout>
      <section className="bg-hero-radial py-24">
        <div className="mx-auto max-w-md rounded-3xl border border-border bg-card p-8">
          <h1 className="text-2xl font-bold">Nouveau mot de passe</h1>
          <form onSubmit={(e) => { e.preventDefault(); toast.success("Mot de passe modifié !"); nav({ to: "/auth/login" }); }} className="mt-6 space-y-4">
            <Field label="Nouveau mot de passe" />
            <Field label="Confirmation" />
            <button className="w-full rounded-full gradient-cobalt px-6 py-3 font-semibold text-white shadow-glow">Réinitialiser</button>
          </form>
        </div>
      </section>
    </PublicLayout>
  );
}

function Field({ label }: { label: string }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</label>
      <input type="password" required className="mt-1 w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm" />
    </div>
  );
}
