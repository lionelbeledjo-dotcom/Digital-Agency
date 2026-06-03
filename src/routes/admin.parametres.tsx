import { createFileRoute } from "@tanstack/react-router";
import { useAppStore } from "@/store/appStore";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/parametres")({
  component: ParametresPage,
});

type Tab = "general" | "plans" | "paiements" | "notifs" | "securite" | "integrations";

function ParametresPage() {
  const settings = useAppStore((s) => s.settings);
  const updateSetting = useAppStore((s) => s.updateSetting);
  const [tab, setTab] = useState<Tab>("general");
  const save = () => toast.success("Paramètres enregistrés");

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-3xl font-bold">Paramètres</h1>
      <div className="flex flex-wrap gap-2 border-b border-border">
        {([["general","Général"],["plans","Plans & Tarifs"],["paiements","Paiements"],["notifs","Notifications"],["securite","Sécurité"],["integrations","Intégrations"]] as [Tab,string][]).map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} className={`pb-3 px-3 text-sm font-semibold ${tab === k ? "border-b-2 border-cobalt" : "text-muted-foreground"}`}>{l}</button>
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
              <div key={id} className="rounded-2xl border border-border bg-card p-5">
                <h3 className="font-semibold">{p.nom}</h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <Field label="Nom" defaultValue={p.nom} onChange={(e) => updateSetting(`plans.${id}.nom`, e.target.value)} />
                  <Field label="Prix mensuel" type="number" defaultValue={p.prixMensuel} onChange={(e) => updateSetting(`plans.${id}.prixMensuel`, Number(e.target.value))} />
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
              <div key={m} className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold capitalize">{m === "mtn" ? "MTN Mobile Money" : m === "orange" ? "Orange Money" : m}</h3>
                  <Toggle label="Actif" defaultChecked={p.actif} onChange={(v) => updateSetting(`paiements.${m}.actif`, v)} />
                </div>
                {"pays" in p && (
                  <div className="mt-4">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Pays activés</p>
                    <p className="mt-1 text-sm text-muted-foreground">{p.pays.join(", ")}</p>
                  </div>
                )}
              </div>
            );
          })}
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-semibold">Commissions</h3>
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
          <Field label="Webhook URL" placeholder="https://hooks.lbdigital.com/…" />
          <Field label="SMTP Host" placeholder="smtp.example.com" />
        </Box>
      )}

      {tab === "securite" && (
        <Box>
          <Toggle label="Vérification email obligatoire" defaultChecked />
          <Toggle label="2FA admin" />
          <Field label="Nouveau mot de passe admin" type="password" />
        </Box>
      )}

      {tab === "integrations" && (
        <Box>
          <Field label="Google Analytics (G-XXXX)" />
          <Field label="Facebook Pixel ID" />
          <Field label="WhatsApp Business" />
          <Textarea label="Code HTML custom HEAD" />
          <Textarea label="Code HTML custom BODY END" />
        </Box>
      )}

      <button onClick={save} className="rounded-full gradient-cobalt px-6 py-2.5 text-sm font-semibold text-white">Enregistrer</button>
    </div>
  );
}

function Box({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border border-border bg-card p-5 space-y-3">{children}</div>;
}
function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return <div><label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</label><input {...rest} className="mt-1 w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm" /></div>;
}
function Textarea({ label }: { label: string }) {
  return <div><label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</label><textarea rows={4} className="mt-1 w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm font-mono" /></div>;
}
function Select({ label, options, defaultValue }: { label: string; options: string[]; defaultValue?: string }) {
  return <div><label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</label><select defaultValue={defaultValue} className="mt-1 w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm">{options.map((o) => <option key={o}>{o}</option>)}</select></div>;
}
function Toggle({ label, defaultChecked, onChange }: { label: string; defaultChecked?: boolean; onChange?: (v: boolean) => void }) {
  return <label className="flex items-center justify-between"><span className="text-sm">{label}</span><input type="checkbox" defaultChecked={defaultChecked} onChange={(e) => onChange?.(e.target.checked)} className="h-5 w-9 appearance-none rounded-full bg-secondary checked:bg-cobalt cursor-pointer" /></label>;
}
