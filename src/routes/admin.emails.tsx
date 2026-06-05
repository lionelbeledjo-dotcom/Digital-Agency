import { createFileRoute } from "@tanstack/react-router";
import { Send, Mail, CheckCircle2 } from "lucide-react";
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
  const [obj, setObj] = useState("Bienvenue sur Digital Agency");
  const [body, setBody] = useState("Salut {prenom},\n\nTon compte Digital Agency est prêt. Voici ton lien d'affiliation : {lien_affilie}\n\nÀ très vite,\nL'équipe LB.");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>Emails automatiques</h1>
        <div className="flex items-center gap-2 rounded-full bg-forest/10 px-4 py-2 text-xs font-medium text-forest">
          <Mail className="h-4 w-4" /> {emailsTpl.length} templates actifs
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-2xl border border-border bg-white p-3 space-y-1 h-fit shadow-soft">
          {emailsTpl.map((e) => (
            <button key={e.id} onClick={() => setActive(e.id)} className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${active === e.id ? "bg-forest/10 text-forest font-semibold" : "text-foreground hover:bg-secondary"}`}>
              <span>{e.t}</span>
              <CheckCircle2 className={`h-4 w-4 ${active === e.id ? "text-forest" : "text-muted-foreground/30"}`} />
            </button>
          ))}
        </aside>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-white p-6 space-y-5 shadow-soft">
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Objet</label>
              <input value={obj} onChange={(e) => setObj(e.target.value)} className="mt-1 w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-forest/20" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Corps du message</label>
              <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={10} className="mt-1 w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-forest/20" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-2">Variables disponibles</p>
              <div className="flex flex-wrap gap-1.5">
                {variables.map((v) => (
                  <button key={v} onClick={() => setBody((b) => b + " " + v)} className="rounded-full border border-forest/20 bg-forest/5 px-2.5 py-1 text-[11px] font-mono text-forest hover:bg-forest/10 transition-colors">{v}</button>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => toast.success("Email enregistré")} className="rounded-full gradient-primary px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]">Enregistrer</button>
              <button onClick={() => toast.success("Email de test envoyé")} className="rounded-full border border-border px-5 py-2.5 text-sm flex items-center gap-2 text-foreground hover:bg-secondary transition-colors"><Send className="h-3.5 w-3.5" /> Envoyer test</button>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Prévisualisation</p>
            <div className="mt-3 rounded-xl bg-secondary p-5 text-sm">
              <p className="font-semibold text-foreground">{obj}</p>
              <pre className="mt-3 whitespace-pre-wrap font-sans text-muted-foreground">{body}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
