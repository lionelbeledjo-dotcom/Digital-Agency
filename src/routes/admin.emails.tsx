import { createFileRoute } from "@tanstack/react-router";
import { Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/emails")({
  component: AdminEmails,
});

const emailsTpl = [
  { id: 1, t: "Bienvenue (inscription)" },
  { id: 2, t: "Confirmation paiement" },
  { id: 3, t: "Accès formation débloqué" },
  { id: 4, t: "Nouvelle commission" },
  { id: 5, t: "Rappel renouvellement" },
  { id: 6, t: "Formation 100% + certificat" },
  { id: 7, t: "Nouveau filleul" },
  { id: 8, t: "Versement effectué" },
  { id: 9, t: "Upgrade plan" },
  { id: 10, t: "Reset mot de passe" },
];

const variables = ["{prenom}","{nom}","{email}","{plan}","{commission}","{lien_affilie}","{lien_reset}","{formation}","{montant}"];

function AdminEmails() {
  const [active, setActive] = useState(1);
  const [obj, setObj] = useState("Bienvenue sur LB Digital 🎉");
  const [body, setBody] = useState("Salut {prenom},\n\nTon compte LB Digital est prêt. Voici ton lien d'affiliation : {lien_affilie}\n\nÀ très vite,\nL'équipe LB.");

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-3xl font-bold">Emails automatiques</h1>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-2xl border border-border bg-card p-3 space-y-1 h-fit">
          {emailsTpl.map((e) => (
            <button key={e.id} onClick={() => setActive(e.id)} className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm ${active === e.id ? "bg-cobalt/20" : "hover:bg-secondary"}`}>
              <span>{e.t}</span>
              <input type="checkbox" defaultChecked className="h-3 w-7 appearance-none rounded-full bg-secondary checked:bg-cobalt" onClick={(ev) => ev.stopPropagation()} />
            </button>
          ))}
        </aside>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Objet</label>
              <input value={obj} onChange={(e) => setObj(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Corps du message</label>
              <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={10} className="mt-1 w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm font-mono" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Variables disponibles</p>
              <div className="flex flex-wrap gap-1.5">
                {variables.map((v) => (
                  <button key={v} onClick={() => setBody((b) => b + " " + v)} className="rounded-full border border-border px-2.5 py-1 text-[11px] font-mono text-sky hover:bg-secondary">{v}</button>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => toast.success("Email enregistré")} className="rounded-full gradient-cobalt px-5 py-2.5 text-sm font-semibold text-white">Enregistrer</button>
              <button onClick={() => toast.success("Email de test envoyé")} className="rounded-full border border-border px-5 py-2.5 text-sm flex items-center gap-2"><Send className="h-3.5 w-3.5" /> Envoyer test</button>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Prévisualisation</p>
            <div className="mt-3 rounded-xl bg-white p-5 text-navy text-sm">
              <p className="font-semibold">{obj}</p>
              <pre className="mt-3 whitespace-pre-wrap font-sans">{body}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
