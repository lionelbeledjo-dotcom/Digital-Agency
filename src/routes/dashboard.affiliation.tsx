import { createFileRoute } from "@tanstack/react-router";
import { useAppStore } from "@/store/appStore";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Copy, QrCode } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/affiliation")({
  component: AffiliationDashboard,
});

const funnel = [
  { etape: "Clics", v: 480 },
  { etape: "Inscrits", v: 92 },
  { etape: "Payants", v: 12 },
];

const filleulsMock = Array.from({ length: 12 }, (_, i) => ({
  nom: ["Awa","Kofi","Moussa","Fatou","Ibrahim","Jean","Marie","Paul","Aminata","Sophie","Cheikh","Mariam"][i],
  date: new Date(Date.now() - i * 86400000 * 5).toISOString().slice(0, 10),
  plan: ["Club IA","Pro Creator","Starter"][i % 3],
  commissions: [875, 3400, 0][i % 3],
  statut: i % 5 === 0 ? "essai" : "actif",
}));

const scripts = [
  { canal: "WhatsApp", txt: "🚀 Je viens de découvrir une plateforme qui forme à l'IA et qui paie chaque vendredi. Tu peux commencer gratuit. Voici mon lien :" },
  { canal: "Facebook", txt: "Et si tu transformais ton téléphone en source de revenus ? 0 FCFA pour commencer, paiement Mobile Money chaque semaine. Je te montre comment ↓" },
  { canal: "TikTok", txt: "POV : t'as commencé l'affiliation à 0 FCFA et t'as reçu ton premier virement Mobile Money vendredi 😎 Lien en bio !" },
];

function AffiliationDashboard() {
  const user = useAppStore((s) => s.currentUser);
  if (!user) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold">Affiliation</h1>
        <p className="text-sm text-muted-foreground">Ton lien, tes filleuls, tes outils de partage.</p>
      </div>

      <div className="rounded-2xl border border-cobalt/40 bg-gradient-to-br from-cobalt/15 to-teal/5 p-5">
        <p className="text-xs uppercase tracking-wider text-sky">Mon lien d'affiliation</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <code className="flex-1 min-w-[200px] truncate rounded-lg bg-navy/60 px-3 py-2 text-sm">{user.lienAffilie}</code>
          <button onClick={() => { navigator.clipboard?.writeText(user.lienAffilie); toast.success("Copié !"); }} className="rounded-lg border border-border px-3 py-2"><Copy className="h-4 w-4" /></button>
          <button className="rounded-lg gradient-cobalt px-3 py-2 text-white"><QrCode className="h-4 w-4" /></button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { l: "Clics", v: "480" }, { l: "Inscrits", v: "92" },
          { l: "Payants", v: "12" }, { l: "Conversion", v: "13%" },
        ].map((k) => (
          <div key={k.l} className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{k.l}</p>
            <p className="mt-1 font-serif text-2xl font-bold">{k.v}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="font-semibold">Entonnoir de conversion</h3>
        <div className="mt-4 h-56">
          <ResponsiveContainer>
            <BarChart data={funnel} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis type="number" stroke="#888" fontSize={11} />
              <YAxis dataKey="etape" type="category" stroke="#888" fontSize={11} />
              <Tooltip contentStyle={{ background: "#0F1E38", border: "1px solid #1A56DB", borderRadius: 8 }} />
              <Bar dataKey="v" fill="#0EA5E9" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="border-b border-border">
            <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              {["Filleul","Date","Plan","Commissions","Statut"].map((h) => <th key={h} className="px-4 py-3 font-medium">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {filleulsMock.map((f, i) => (
              <tr key={i} className="border-b border-border/40">
                <td className="px-4 py-3 font-medium">{f.nom}</td>
                <td className="px-4 py-3 text-muted-foreground">{f.date}</td>
                <td className="px-4 py-3">{f.plan}</td>
                <td className="px-4 py-3 font-semibold">{f.commissions.toLocaleString("fr-FR")} F</td>
                <td className="px-4 py-3"><span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase ${f.statut === "actif" ? "bg-green/20 text-green" : "bg-gold/20 text-gold"}`}>{f.statut}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h3 className="font-semibold">Ressources marketing</h3>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {scripts.map((s) => (
            <div key={s.canal} className="rounded-2xl border border-border bg-card p-5">
              <p className="text-xs uppercase tracking-wider text-sky">{s.canal}</p>
              <p className="mt-3 text-sm text-muted-foreground">{s.txt}</p>
              <button onClick={() => { navigator.clipboard?.writeText(s.txt + " " + user.lienAffilie); toast.success("Message copié !"); }} className="mt-4 rounded-full border border-border px-4 py-2 text-xs flex items-center gap-1"><Copy className="h-3 w-3" /> Copier</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
