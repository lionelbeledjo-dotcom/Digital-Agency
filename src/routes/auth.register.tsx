import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { PublicLayout } from "@/components/public-layout";
import { useAppStore, PAYS_LIST, type Plan } from "@/store/appStore";
import { supabase } from "@/lib/supabase";
import { getAffiliateCookie } from "@/lib/affiliation";
import { CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/auth/register")({
  head: () => ({ meta: [{ title: "Inscription · Digital Agency" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  const plans = useAppStore((s) => s.settings.plans);
  const navigate = useNavigate();
  const [plan, setPlan] = useState<Plan>("starter");
  const [loading, setLoading] = useState(false);
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [pays, setPays] = useState("Côte d'Ivoire");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [codeParrain, setCodeParrain] = useState("");

  useEffect(() => {
    const ref = getAffiliateCookie();
    if (ref && !codeParrain) setCodeParrain(ref);
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    if (password !== confirm) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }

    if (password.length < 6) {
      toast.error("Le mot de passe doit faire au moins 6 caractères.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { prenom, nom, whatsapp, pays, code_parrain: codeParrain },
      },
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    toast.success("Compte créé ! Vérifie ton email pour confirmer ton inscription.");

    if (plan === "starter") {
      navigate({ to: "/auth/login" });
    } else {
      navigate({ to: "/paiement", hash: plan === "club_ia" ? "club" : "pro" });
    }
  }

  return (
    <PublicLayout>
      <section className="bg-hero-radial py-16">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr]">
          <div className="rounded-3xl border border-border bg-white p-8 shadow-soft">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-forest">
                <span className="text-sm font-bold text-white">LB</span>
              </div>
              <span className="text-lg font-bold text-forest" style={{ fontFamily: "var(--font-heading)" }}>Digital Agency</span>
            </div>
            <h1 className="mt-6 text-2xl font-bold text-foreground">Crée ton compte en 1 minute</h1>
            <p className="mt-1 text-sm text-muted-foreground">Accès immédiat aux formations + ton lien affilié.</p>
            <form onSubmit={submit} className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Prénom" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
              <Field label="Nom" value={nom} onChange={(e) => setNom(e.target.value)} required />
              <Field className="sm:col-span-2" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <Field label="WhatsApp" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} required />
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Pays</label>
                <select value={pays} onChange={(e) => setPays(e.target.value)} className="mt-1 w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground">{PAYS_LIST.map((p) => <option key={p}>{p}</option>)}</select>
              </div>
              <Field label="Mot de passe" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <Field label="Confirmation" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
              <Field className="sm:col-span-2" label="Code parrain (optionnel)" value={codeParrain} onChange={(e) => setCodeParrain(e.target.value)} />
              <label className="sm:col-span-2 flex items-start gap-2 text-xs text-muted-foreground">
                <input type="checkbox" required className="mt-0.5" /> J'accepte les CGV et la politique de confidentialité.
              </label>
              <button type="submit" disabled={loading} className="sm:col-span-2 rounded-full gradient-primary px-6 py-3 font-semibold text-white shadow-glow transition-transform hover:scale-[1.02] disabled:opacity-60">
                {loading ? "Création en cours..." : plan === "starter" ? "Créer mon compte gratuit" : "Continuer vers le paiement →"}
              </button>
              <p className="sm:col-span-2 text-center text-xs text-muted-foreground">Déjà un compte ? <Link to="/auth/login" className="text-forest font-semibold">Se connecter</Link></p>
            </form>
          </div>

          <div className="space-y-3">
            <p className="text-sm uppercase tracking-wider text-amber font-semibold">Choisis ton plan</p>
            {(["starter","club_ia","pro_creator"] as Plan[]).map((id) => {
              const p = plans[id];
              const active = plan === id;
              return (
                <button key={id} type="button" onClick={() => setPlan(id)} className={`w-full rounded-2xl border p-5 text-left transition-all ${active ? "border-forest bg-forest/5 ring-2 ring-forest/10" : "border-border bg-white shadow-soft"}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{p.nom}</p>
                      <p className="text-xs text-amber font-medium">Commission {p.commission}%</p>
                    </div>
                    <p className="text-xl font-bold text-forest" style={{ fontFamily: "var(--font-heading)" }}>{p.prixMensuel === 0 ? "Gratuit" : `${p.prixMensuel.toLocaleString("fr-FR")} F`}</p>
                  </div>
                  <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
                    {p.features.slice(0, 3).map((f) => <li key={f} className="flex gap-1.5"><CheckCircle2 className="h-3 w-3 mt-0.5 text-forest shrink-0" />{f}</li>)}
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
      <input {...rest} className="mt-1 w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-forest/20" />
    </div>
  );
}
