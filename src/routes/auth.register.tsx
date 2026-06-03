import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { PublicLayout } from "@/components/public-layout";
import { useAppStore, PAYS_LIST, type Plan } from "@/store/appStore";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/auth/register")({
  head: () => ({ meta: [{ title: "Inscription · LB Digital" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  const login = useAppStore((s) => s.login);
  const plans = useAppStore((s) => s.settings.plans);
  const navigate = useNavigate();
  const [plan, setPlan] = useState<Plan>("starter");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (plan === "starter") {
      login("new@example.com");
      navigate({ to: "/dashboard" });
    } else {
      navigate({ to: "/paiement", hash: plan === "club_ia" ? "club" : "pro" });
    }
  }

  return (
    <PublicLayout>
      <section className="bg-hero-radial py-16">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr]">
          <div className="rounded-3xl border border-border bg-card p-8">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-cobalt"><Sparkles className="h-5 w-5 text-white" /></div>
              <span className="text-lg font-bold">LB Digital</span>
            </div>
            <h1 className="mt-6 text-2xl font-bold">Crée ton compte en 1 minute</h1>
            <p className="mt-1 text-sm text-muted-foreground">Accès immédiat aux formations + ton lien affilié.</p>
            <form onSubmit={submit} className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Prénom" required />
              <Field label="Nom" required />
              <Field className="sm:col-span-2" label="Email" type="email" required />
              <Field label="WhatsApp" required />
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Pays</label>
                <select className="mt-1 w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm">{PAYS_LIST.map((p) => <option key={p}>{p}</option>)}</select>
              </div>
              <Field label="Mot de passe" type="password" required />
              <Field label="Confirmation" type="password" required />
              <Field className="sm:col-span-2" label="Code parrain (optionnel)" />
              <label className="sm:col-span-2 flex items-start gap-2 text-xs text-muted-foreground">
                <input type="checkbox" required className="mt-0.5" /> J'accepte les CGV et la politique de confidentialité.
              </label>
              <button type="submit" className="sm:col-span-2 rounded-full gradient-cobalt px-6 py-3 font-semibold text-white shadow-glow">
                {plan === "starter" ? "Créer mon compte gratuit" : "Continuer vers le paiement →"}
              </button>
              <p className="sm:col-span-2 text-center text-xs text-muted-foreground">Déjà un compte ? <Link to="/auth/login" className="text-sky font-semibold">Se connecter</Link></p>
            </form>
          </div>

          <div className="space-y-3">
            <p className="text-sm uppercase tracking-wider text-sky">Choisis ton plan</p>
            {(["starter","club_ia","pro_creator"] as Plan[]).map((id) => {
              const p = plans[id];
              const active = plan === id;
              return (
                <button key={id} type="button" onClick={() => setPlan(id)} className={`w-full rounded-2xl border p-5 text-left transition-all ${active ? "border-cobalt bg-cobalt/10 shadow-glow" : "border-border bg-card"}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{p.nom}</p>
                      <p className="text-xs text-teal">Commission {p.commission}%</p>
                    </div>
                    <p className="font-serif text-xl font-bold">{p.prixMensuel === 0 ? "Gratuit" : `${p.prixMensuel.toLocaleString("fr-FR")} F`}</p>
                  </div>
                  <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
                    {p.features.slice(0, 3).map((f) => <li key={f} className="flex gap-1.5"><CheckCircle2 className="h-3 w-3 mt-0.5 text-green shrink-0" />{f}</li>)}
                  </ul>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

function Field({ label, className = "", ...rest }: { label: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className}>
      <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</label>
      <input {...rest} className="mt-1 w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cobalt/40" />
    </div>
  );
}
