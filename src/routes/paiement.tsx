import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { PublicLayout } from "@/components/public-layout";
import { useAppStore, PAYS_LIST } from "@/store/appStore";
import { useState, useEffect } from "react";
import { CheckCircle2, Lock } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/paiement")({
  head: () => ({ meta: [{ title: "Paiement · Digital Agency" }] }),
  component: PaiementPage,
});

type PlanKey = "starter" | "club_ia" | "pro_creator";
type Method = "wero" | "paypal" | "mtn" | "orange";

function PaiementPage() {
  const plans = useAppStore((s) => s.settings.plans);
  const navigate = useNavigate();
  const router = useRouter();
  const hash = router.state.location.hash;

  const [plan, setPlan] = useState<PlanKey>("starter");
  const [method, setMethod] = useState<Method>("mtn");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (hash === "club") setPlan("club_ia");
    else if (hash === "pro") setPlan("pro_creator");
    else if (hash === "starter") setPlan("starter");
  }, [hash]);

  const prix = plans[plan].prixMensuel;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      navigate({ to: "/paiement/succes" });
    }, 1800);
  }

  return (
    <PublicLayout>
      <section className="py-12">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr]">
          {/* Plan selection */}
          <div>
            <h1 className="text-2xl font-bold text-foreground">Choisis ton plan</h1>
            <div className="mt-6 space-y-3">
              {(["starter","club_ia","pro_creator"] as PlanKey[]).map((id) => {
                const p = plans[id];
                const active = plan === id;
                return (
                  <button key={id} onClick={() => setPlan(id)} className={`w-full rounded-2xl border p-5 text-left transition-all ${active ? "border-forest bg-forest/5 ring-2 ring-forest/10" : "border-border bg-white shadow-soft hover:bg-secondary"}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-foreground">{p.nom}</p>
                        <p className="text-xs text-amber font-medium">{p.commission}% de commission</p>
                      </div>
                      <p className="text-2xl font-bold text-forest" style={{ fontFamily: "var(--font-heading)" }}>{p.prixMensuel === 0 ? "Gratuit" : `${p.prixMensuel.toLocaleString("fr-FR")} FCFA`}</p>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="mt-6 rounded-2xl border border-border bg-white p-5 shadow-soft">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Récapitulatif</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm text-foreground">{plans[plan].nom}</span>
                <span className="text-xl font-bold text-forest" style={{ fontFamily: "var(--font-heading)" }}>{prix === 0 ? "Gratuit" : `${prix.toLocaleString("fr-FR")} FCFA/mois`}</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={submit} className="rounded-3xl border border-border bg-white p-6 shadow-soft sm:p-8">
            <h2 className="text-xl font-bold text-foreground">Tes informations</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Input label="Prénom" required />
              <Input label="Nom" required />
              <Input label="Email" type="email" required />
              <Input label="WhatsApp" required />
              <div className="sm:col-span-2">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Pays</label>
                <select className="mt-1 w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground" required>
                  {PAYS_LIST.map((p) => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <Input label="Code parrain (optionnel)" />
              </div>
            </div>

            {prix > 0 && (
              <>
                <h3 className="mt-8 font-semibold text-foreground">Méthode de paiement</h3>
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {(["wero","paypal","mtn","orange"] as Method[]).map((m) => (
                    <button key={m} type="button" onClick={() => setMethod(m)} className={`rounded-xl border p-3 text-center text-xs font-semibold transition-colors ${method === m ? "border-forest bg-forest/10 text-forest" : "border-border text-muted-foreground"}`}>
                      {m === "wero" ? "Wero" : m === "paypal" ? "PayPal" : m === "mtn" ? "MTN" : "Orange"}
                    </button>
                  ))}
                </div>

                <div className="mt-5 rounded-xl border border-border bg-secondary/50 p-5 text-sm">
                  {method === "wero" && (
                    <div>
                      <p className="text-muted-foreground">Disponible en France, Belgique, Allemagne, Espagne, Portugal.</p>
                      <Input className="mt-3" label="Numéro de téléphone Wero" />
                      <p className="mt-3 text-xs text-muted-foreground">1. Entre ton numéro · 2. Notification dans ton app bancaire · 3. Confirme le virement.</p>
                    </div>
                  )}
                  {method === "paypal" && (
                    <div>
                      <Input label="Email PayPal (optionnel)" />
                      <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground"><Lock className="h-3 w-3" /> Paiement sécurisé SSL 256-bit</p>
                    </div>
                  )}
                  {method === "mtn" && (
                    <div>
                      <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Pays MTN</label>
                      <select className="mt-1 w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm">
                        {["Cameroun","Côte d'Ivoire","Bénin","Congo","Ghana"].map((p) => <option key={p}>{p}</option>)}
                      </select>
                      <Input className="mt-3" label="Numéro MTN" />
                      <ol className="mt-3 list-decimal pl-5 text-xs text-muted-foreground space-y-1">
                        <li>Entre ton numéro MTN.</li>
                        <li>Clique sur initier.</li>
                        <li>Tu reçois un push *126#.</li>
                        <li>Valide avec ton code PIN MTN.</li>
                        <li>Confirmation instantanée.</li>
                      </ol>
                    </div>
                  )}
                  {method === "orange" && (
                    <div>
                      <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Pays Orange</label>
                      <select className="mt-1 w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm">
                        {["Côte d'Ivoire","Sénégal","Cameroun","Mali","Guinée"].map((p) => <option key={p}>{p}</option>)}
                      </select>
                      <Input className="mt-3" label="Numéro Orange" />
                      <ol className="mt-3 list-decimal pl-5 text-xs text-muted-foreground space-y-1">
                        <li>Entre ton numéro Orange.</li>
                        <li>Tu reçois un SMS de confirmation.</li>
                        <li>Compose #144# et valide.</li>
                        <li>Ton accès est activé immédiatement.</li>
                      </ol>
                    </div>
                  )}
                </div>
              </>
            )}

            <label className="mt-6 flex items-start gap-2 text-xs text-muted-foreground">
              <input type="checkbox" required className="mt-0.5" /> J'accepte les CGV et la politique de confidentialité.
            </label>

            <button disabled={loading} type="submit" className="mt-6 w-full rounded-full gradient-primary px-6 py-4 font-semibold text-white shadow-glow disabled:opacity-60 transition-transform hover:scale-[1.02]">
              {loading ? "Traitement en cours…" : prix === 0 ? "Créer mon compte gratuit" : `Payer ${prix.toLocaleString("fr-FR")} FCFA →`}
            </button>

            <div className="mt-4 flex flex-wrap justify-center gap-4 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-forest" /> Sécurisé</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-forest" /> Remboursement 7j</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-forest" /> Annulable</span>
            </div>
          </form>
        </div>
      </section>
    </PublicLayout>
  );
}

function Input({ label, className = "", ...rest }: { label: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className}>
      <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</label>
      <input {...rest} className="mt-1 w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-forest/20" />
    </div>
  );
}

// noinspection JSUnusedLocalSymbols
const _ = toast;
