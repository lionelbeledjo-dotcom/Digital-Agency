import { createFileRoute } from "@tanstack/react-router";
import { useAppStore, PAYS_LIST } from "@/store/appStore";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useState } from "react";
import { User, Lock, CreditCard, Bell, Trash2 } from "lucide-react";

export const Route = createFileRoute("/dashboard/profil")({
  component: ProfilPage,
});

function ProfilPage() {
  const user = useAppStore((s) => s.currentUser);
  const [tab, setTab] = useState<"infos" | "securite" | "paiement" | "notifs">("infos");
  const [loading, setLoading] = useState(false);
  if (!user) return null;

  const tabs = [
    { id: "infos" as const, label: "Infos", Icon: User },
    { id: "securite" as const, label: "Sécurité", Icon: Lock },
    { id: "paiement" as const, label: "Paiement", Icon: CreditCard },
    { id: "notifs" as const, label: "Notifications", Icon: Bell },
  ];

  async function updatePassword(e: React.FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const newPwd = (form.elements.namedItem("new_password") as HTMLInputElement).value;
    const confirm = (form.elements.namedItem("confirm_password") as HTMLInputElement).value;

    if (newPwd !== confirm) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }
    if (newPwd.length < 6) {
      toast.error("Minimum 6 caractères.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPwd });
    setLoading(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Mot de passe mis à jour !");
      form.reset();
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>Mon profil</h1>
        <p className="text-sm text-muted-foreground">Gère tes informations, sécurité et préférences.</p>
      </div>

      <div className="flex flex-wrap gap-1 rounded-xl bg-secondary p-1">
        {tabs.map(({ id, label, Icon }) => (
          <button key={id} onClick={() => setTab(id)} className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${tab === id ? "bg-white text-forest shadow-soft" : "text-muted-foreground hover:text-foreground"}`}>
            <Icon className="h-4 w-4" /> {label}
          </button>
        ))}
      </div>

      {tab === "infos" && (
        <form onSubmit={(e) => { e.preventDefault(); toast.success("Profil mis à jour"); }} className="grid gap-4 sm:grid-cols-2 rounded-2xl border border-border bg-white p-6 shadow-soft">
          <div className="sm:col-span-2 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-forest text-xl font-bold text-white">{user.prenom[0]}{user.nom[0]}</div>
            <div>
              <p className="font-semibold text-foreground">{user.prenom} {user.nom}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
              <button type="button" className="mt-1 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:bg-secondary transition-colors">Changer la photo</button>
            </div>
          </div>
          <Field label="Prénom" defaultValue={user.prenom} />
          <Field label="Nom" defaultValue={user.nom} />
          <Field label="Email" defaultValue={user.email} type="email" />
          <Field label="WhatsApp" defaultValue={user.whatsapp} />
          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground">Pays</label>
            <select defaultValue={user.pays} className="mt-1 w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-forest/20">
              {PAYS_LIST.map((p) => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs uppercase tracking-wider text-muted-foreground">Bio</label>
            <textarea rows={3} className="mt-1 w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-forest/20" placeholder="Parle un peu de toi" />
          </div>
          <button className="sm:col-span-2 rounded-full gradient-primary px-6 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]">Enregistrer</button>
        </form>
      )}

      {tab === "securite" && (
        <form onSubmit={updatePassword} className="grid gap-4 rounded-2xl border border-border bg-white p-6 shadow-soft max-w-md">
          <p className="text-sm text-muted-foreground">Modifie ton mot de passe. Min 6 caractères.</p>
          <Field label="Mot de passe actuel" type="password" name="current_password" />
          <Field label="Nouveau mot de passe" type="password" name="new_password" />
          <Field label="Confirmation" type="password" name="confirm_password" />
          <button disabled={loading} className="rounded-full gradient-primary px-6 py-2.5 text-sm font-semibold text-white shadow-glow disabled:opacity-60 transition-transform hover:scale-[1.02]">
            {loading ? "Mise à jour..." : "Mettre à jour"}
          </button>
        </form>
      )}

      {tab === "paiement" && (
        <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
          <p className="text-xs uppercase tracking-wider text-forest font-semibold">Méthode pour recevoir mes commissions</p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {["Wero","PayPal","MTN MoMo","Orange Money"].map((m, i) => (
              <button key={m} className={`rounded-xl border p-3 text-xs font-semibold transition-colors ${i === 2 ? "border-forest bg-forest/10 text-forest" : "border-border text-muted-foreground hover:border-forest/30"}`}>{m}</button>
            ))}
          </div>
          <Field className="mt-4" label="Numéro MTN" defaultValue="+225 07 00 00 00" />
          <button className="mt-4 rounded-full gradient-primary px-6 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]">Enregistrer</button>
        </div>
      )}

      {tab === "notifs" && (
        <div className="rounded-2xl border border-border bg-white p-6 shadow-soft space-y-4">
          {[
            { l: "Email — nouvelles commissions", on: true },
            { l: "Email — nouveau filleul", on: true },
            { l: "WhatsApp — alertes paiement", on: true },
            { l: "Email — newsletter hebdo", on: false },
            { l: "Push — rappel formation", on: true },
          ].map((n) => (
            <label key={n.l} className="flex items-center justify-between py-2 border-b border-border/40 last:border-0">
              <span className="text-sm text-foreground">{n.l}</span>
              <div className="relative">
                <input type="checkbox" defaultChecked={n.on} className="sr-only peer" />
                <div className="w-10 h-5 rounded-full bg-secondary peer-checked:bg-forest transition-colors" />
                <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow peer-checked:translate-x-5 transition-transform" />
              </div>
            </label>
          ))}
        </div>
      )}

      <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-5">
        <div className="flex items-center gap-3">
          <Trash2 className="h-5 w-5 text-destructive" />
          <div>
            <p className="font-semibold text-destructive">Zone danger</p>
            <p className="mt-0.5 text-xs text-muted-foreground">Suppression de compte définitive, sans retour.</p>
          </div>
        </div>
        <button className="mt-3 rounded-full border border-destructive/40 px-4 py-2 text-xs text-destructive hover:bg-destructive/10 transition-colors">Supprimer mon compte</button>
      </div>
    </div>
  );
}

function Field({ label, className = "", ...rest }: { label: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className}>
      <label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</label>
      <input {...rest} className="mt-1 w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-forest/20" />
    </div>
  );
}
