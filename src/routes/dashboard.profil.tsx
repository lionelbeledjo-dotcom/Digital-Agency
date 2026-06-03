import { createFileRoute } from "@tanstack/react-router";
import { useAppStore, PAYS_LIST } from "@/store/appStore";
import { toast } from "sonner";
import { useState } from "react";

export const Route = createFileRoute("/dashboard/profil")({
  component: ProfilPage,
});

function ProfilPage() {
  const user = useAppStore((s) => s.currentUser);
  const [tab, setTab] = useState<"infos" | "securite" | "paiement" | "notifs">("infos");
  if (!user) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold">Mon profil</h1>
        <p className="text-sm text-muted-foreground">Gère tes informations, sécurité et préférences.</p>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-border">
        {[["infos","Infos"],["securite","Sécurité"],["paiement","Paiement"],["notifs","Notifications"]].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k as typeof tab)} className={`pb-3 px-2 text-sm font-semibold ${tab === k ? "border-b-2 border-cobalt text-foreground" : "text-muted-foreground"}`}>{l}</button>
        ))}
      </div>

      {tab === "infos" && (
        <form onSubmit={(e) => { e.preventDefault(); toast.success("Profil mis à jour"); }} className="grid gap-4 sm:grid-cols-2 rounded-2xl border border-border bg-card p-6">
          <div className="sm:col-span-2 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full gradient-cobalt text-xl font-bold text-white">{user.prenom[0]}{user.nom[0]}</div>
            <button type="button" className="rounded-full border border-border px-4 py-2 text-xs">Changer la photo</button>
          </div>
          <Field label="Prénom" defaultValue={user.prenom} />
          <Field label="Nom" defaultValue={user.nom} />
          <Field label="Email" defaultValue={user.email} type="email" />
          <Field label="WhatsApp" defaultValue={user.whatsapp} />
          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground">Pays</label>
            <select defaultValue={user.pays} className="mt-1 w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm">
              {PAYS_LIST.map((p) => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs uppercase tracking-wider text-muted-foreground">Bio</label>
            <textarea rows={3} className="mt-1 w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm" placeholder="Parle un peu de toi" />
          </div>
          <button className="sm:col-span-2 rounded-full gradient-cobalt px-6 py-2.5 text-sm font-semibold text-white">Enregistrer</button>
        </form>
      )}

      {tab === "securite" && (
        <form onSubmit={(e) => { e.preventDefault(); toast.success("Mot de passe modifié"); }} className="grid gap-4 rounded-2xl border border-border bg-card p-6 max-w-md">
          <Field label="Mot de passe actuel" type="password" />
          <Field label="Nouveau mot de passe" type="password" />
          <Field label="Confirmation" type="password" />
          <button className="rounded-full gradient-cobalt px-6 py-2.5 text-sm font-semibold text-white">Mettre à jour</button>
        </form>
      )}

      {tab === "paiement" && (
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-xs uppercase tracking-wider text-sky">Méthode pour recevoir mes commissions</p>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {["Wero","PayPal","MTN MoMo","Orange Money"].map((m, i) => (
              <button key={m} className={`rounded-lg border p-3 text-xs font-semibold ${i === 2 ? "border-cobalt bg-cobalt/15" : "border-border text-muted-foreground"}`}>{m}</button>
            ))}
          </div>
          <Field className="mt-4" label="Numéro MTN" defaultValue="+225 07 00 00 00" />
          <button className="mt-4 rounded-full gradient-cobalt px-6 py-2.5 text-sm font-semibold text-white">Enregistrer</button>
        </div>
      )}

      {tab === "notifs" && (
        <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
          {[
            ["Email — nouvelles commissions", true],
            ["Email — nouveau filleul", true],
            ["WhatsApp — alertes paiement", true],
            ["Email — newsletter hebdo", false],
          ].map(([l, on]) => (
            <label key={l as string} className="flex items-center justify-between">
              <span className="text-sm">{l}</span>
              <input type="checkbox" defaultChecked={on as boolean} className="h-5 w-9 appearance-none rounded-full bg-secondary checked:bg-cobalt" />
            </label>
          ))}
        </div>
      )}

      <div className="rounded-2xl border border-destructive/40 bg-destructive/5 p-5">
        <p className="font-semibold text-destructive">Zone danger</p>
        <p className="mt-1 text-xs text-muted-foreground">Suppression de compte définitive, sans retour.</p>
        <button className="mt-3 rounded-full border border-destructive/40 px-4 py-2 text-xs text-destructive">Supprimer mon compte</button>
      </div>
    </div>
  );
}

function Field({ label, className = "", ...rest }: { label: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className}>
      <label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</label>
      <input {...rest} className="mt-1 w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm" />
    </div>
  );
}
