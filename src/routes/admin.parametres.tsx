import { createFileRoute } from "@tanstack/react-router";
import { useAppStore } from "@/store/appStore";
import { useState } from "react";
import { toast } from "sonner";
import { Settings, CreditCard, Bell, Shield, Plug, Tag } from "lucide-react";

export const Route = createFileRoute("/admin/parametres")({
  component: ParametresPage,
});

type Tab = "general" | "plans" | "paiements" | "notifs" | "securite" | "integrations";

function ParametresPage() {
  const settings = useAppStore((s) => s.settings);
  const updateSetting = useAppStore((s) => s.updateSetting);
  const [tab, setTab] = useState<Tab>("general");
  const save = () => toast.success("Paramètres enregistrés");

  const tabs = [
    { id: "general" as const, label: "Général", Icon: Settings },
    { id: "plans" as const, label: "Plans & Tarifs", Icon: Tag },
    { id: "paiements" as const, label: "Paiements", Icon: CreditCard },
    { id: "notifs" as const, label: "Notifications", Icon: Bell },
    { id: "securite" as const, label: "Sécurité", Icon: Shield },
    { id: "integrations" as const, label: "Intégrations", Icon: Plug },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>Paramètres</h1>

      <div className="flex flex-wrap gap-1 rounded-xl bg-secondary p-1">
        {tabs.map(({ id, label, Icon }) => (
          <button key={id} onClick={() => setTab(id)} className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-medium transition-colors ${tab === id ? "bg-white text-forest shadow-soft" : "text-muted-foreground hover:text-foreground"}`}>
            <Icon className="h-3.5 w-3.5" /> {label}
          </button>
        ))}
      </div>

      {tab === "general" && (
        <Box>
          <Field label="Nom plateforme" defaultValue={settings.general.nomPlateforme} onChange={(e) => updateSetting("general.nomPlateforme", e.target.value)} />
          <Field label="Tagline" defaultValue={settings.general.tagline} onChange={(e) => updateSetting("general.tagline", e.target.value)} />
          <Field label="Email contact" defaultValue={settings.general.email} />
          <Field label="WhatsApp support" defaultValue={settings.general.whatsapp} />
          <Select label="Devise" options={["FCFA","EUR","USD"]} defaultValue={settings.general.devise} />
          <Toggle label="Mode maintenance" defaultChecked={settings.general.maintenanceMode} onChange={(v) => updateSetting("general.maintenanceMode", v)} />
          <Toggle label="Inscriptions ouvertes" defaultChecked={settings.general.inscriptionsOuvertes} onChange={(v) => updateSetting("general.inscriptionsOuvertes", v)} />
        </Box>
      )}

      {tab === "plans" && (
        <div className="space-y-4">
          {(["starter","club_ia","pro_creator"] as const).map((id) => {
            const p = settings.plans[id];
            return (
              <div key={id} className="rounded-2xl border border-border bg-white p-5 shadow-soft">
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase ${
                    id === "pro_creator" ? "bg-amber/15 text-amber" :
                    id === "club_ia" ? "bg-forest/10 text-forest" :
                    "bg-secondary text-muted-foreground"
                  }`}>{p.nom}</span>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <Field label="Nom" defaultValue={p.nom} onChange={(e) => updateSetting(`plans.${id}.nom`, e.target.value)} />
                  <Field label="Prix mensuel (FCFA)" type="number" defaultValue={p.prixMensuel} onChange={(e) => updateSetting(`plans.${id}.prixMensuel`, Number(e.target.value))} />
                  <Field label="Commission %" type="number" defaultValue={p.commission} onChange={(e) => updateSetting(`plans.${id}.commission`, Number(e.target.value))} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === "paiements" && (
        <div className="space-y-4">
          {(["wero","paypal","mtn","orange"] as const).map((m) => {
            const p = settings.paiements[m];
            return (
              <div key={m} className="rounded-2xl border border-border bg-white p-5 shadow-soft">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">{m === "mtn" ? "MTN Mobile Money" : m === "orange" ? "Orange Money" : m.charAt(0).toUpperCase() + m.slice(1)}</h3>
                  <Toggle label="" defaultChecked={p.actif} onChange={(v) => updateSetting(`paiements.${m}.actif`, v)} />
                </div>
                {"pays" in p && (
                  <div className="mt-3">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Pays activés</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {p.pays.map((pays) => (
                        <span key={pays} className="rounded-full bg-forest/10 px-2.5 py-1 text-[10px] font-medium text-forest">{pays}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          <div className="rounded-2xl border border-border bg-white p-5 shadow-soft">
            <h3 className="font-semibold text-foreground">Commissions</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <Field label="Jour versement" defaultValue={settings.affiliation.jourVersement} />
              <Field label="Seuil min (FCFA)" type="number" defaultValue={settings.affiliation.seuilMin} />
              <Field label="Cookie (jours)" type="number" defaultValue={settings.affiliation.cookieDuree} />
            </div>
          </div>
        </div>
      )}

      {tab === "notifs" && (
        <Box>
          <Toggle label="Email admin : nouvel inscrit" defaultChecked />
          <Toggle label="Email admin : nouveau paiement" defaultChecked />
          <Toggle label="Email admin : paiement échoué" defaultChecked />
          <Field label="Webhook URL" placeholder="https://hooks.digitalagency.com/…" />
          <Field label="SMTP Host" placeholder="smtp.example.com" />
        </Box>
      )}

      {tab === "securite" && (
        <Box>
          <Toggle label="Vérification email obligatoire" defaultChecked />
          <Toggle label="2FA admin" />
          <Field label="Nouveau mot de passe admin" type="password" />
          <Field label="Code d'invitation admin" placeholder="Code requis pour créer un compte admin" />
        </Box>
      )}

      {tab === "integrations" && (
        <Box>
          <Field label="CinetPay API Key" placeholder="Clé API CinetPay" />
          <Field label="CinetPay Site ID" placeholder="Site ID CinetPay" />
          <Field label="Google Analytics (G-XXXX)" />
          <Field label="Facebook Pixel ID" />
          <Field label="WhatsApp Business" />
          <Textarea label="Code HTML custom HEAD" />
          <Textarea label="Code HTML custom BODY END" />
        </Box>
      )}

      <button onClick={save} className="rounded-full gradient-primary px-6 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]">Enregistrer</button>
    </div>
  );
}

function Box({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border border-border bg-white p-6 shadow-soft space-y-4">{children}</div>;
}
function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return <div><label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</label><input {...rest} className="mt-1 w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-forest/20" /></div>;
}
function Textarea({ label }: { label: string }) {
  return <div><label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</label><textarea rows={4} className="mt-1 w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-forest/20" /></div>;
}
function Select({ label, options, defaultValue }: { label: string; options: string[]; defaultValue?: string }) {
  return <div><label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</label><select defaultValue={defaultValue} className="mt-1 w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-forest/20">{options.map((o) => <option key={o}>{o}</option>)}</select></div>;
}
function Toggle({ label, defaultChecked, onChange }: { label: string; defaultChecked?: boolean; onChange?: (v: boolean) => void }) {
  return (
    <label className="flex items-center justify-between py-1">
      <span className="text-sm text-foreground">{label}</span>
      <div className="relative">
        <input type="checkbox" defaultChecked={defaultChecked} onChange={(e) => onChange?.(e.target.checked)} className="sr-only peer" />
        <div className="w-10 h-5 rounded-full bg-secondary peer-checked:bg-forest transition-colors cursor-pointer" />
        <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow peer-checked:translate-x-5 transition-transform" />
      </div>
    </label>
  );
}
