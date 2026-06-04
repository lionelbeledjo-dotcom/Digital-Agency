import { createFileRoute } from "@tanstack/react-router";
import { useAppStore } from "@/store/appStore";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/contenu")({
  component: ContenuPage,
});

type Tab = "homepage" | "tarifs" | "affiliation" | "legal" | "footer";

function ContenuPage() {
  const settings = useAppStore((s) => s.settings);
  const updateSetting = useAppStore((s) => s.updateSetting);
  const [tab, setTab] = useState<Tab>("homepage");

  const save = () => toast.success("Modifications enregistrées");

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-3xl font-bold">Contenu éditorial</h1>
      <div className="flex flex-wrap gap-2 border-b border-border">
        {([["homepage","Homepage"],["tarifs","Tarifs"],["affiliation","Affiliation"],["legal","Légal"],["footer","Footer"]] as [Tab,string][]).map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} className={`pb-3 px-3 text-sm font-semibold ${tab === k ? "border-b-2 border-cobalt" : "text-muted-foreground"}`}>{l}</button>
        ))}
      </div>

      {tab === "homepage" && (
        <div className="space-y-4">
          <Box titre="Hero"><Field label="Titre H1" defaultValue="Maîtrise l'IA. Partage la connaissance. Génère des revenus réels." />
            <Field label="Sous-titre" defaultValue="Digital Agency te forme aux outils IA…" />
            <Field label="CTA principal" defaultValue="Démarrer gratuitement" />
            <Field label="CTA secondaire" defaultValue="Découvrir le programme" /></Box>
          <Box titre="Stats">{["0 FCFA / Pour commencer","+500K FCFA / Par mois possibles","12 pays / Couverts","Vendredi / Mobile Money"].map((s, i) => <Field key={i} label={`Stat ${i + 1}`} defaultValue={s} />)}</Box>
          <Box titre="FAQ Homepage"><Field label="Q1" defaultValue="Est-ce vraiment gratuit ?" /><Field label="R1" defaultValue="Oui, le plan Starter est gratuit à vie." /></Box>
          <button onClick={save} className="rounded-full gradient-cobalt px-6 py-2.5 text-sm font-semibold text-white">Sauvegarder</button>
        </div>
      )}

      {tab === "tarifs" && (
        <div className="space-y-4">
          {(["starter","club_ia","pro_creator"] as const).map((id) => {
            const p = settings.plans[id];
            return (
              <Box key={id} titre={`Plan ${p.nom}`}>
                <Field label="Nom" defaultValue={p.nom} onChange={(e) => updateSetting(`plans.${id}.nom`, e.target.value)} />
                <Field label="Prix mensuel" type="number" defaultValue={p.prixMensuel} onChange={(e) => updateSetting(`plans.${id}.prixMensuel`, Number(e.target.value))} />
                <Field label="Commission %" type="number" defaultValue={p.commission} onChange={(e) => updateSetting(`plans.${id}.commission`, Number(e.target.value))} />
              </Box>
            );
          })}
          <button onClick={save} className="rounded-full gradient-cobalt px-6 py-2.5 text-sm font-semibold text-white">Sauvegarder</button>
        </div>
      )}

      {tab === "affiliation" && (
        <div className="space-y-4">
          <Box titre="Texte hero"><Field label="Titre" defaultValue="Gagne jusqu'à 40% à vie" /></Box>
          <Box titre="Messages marketing">
            <Textarea label="WhatsApp" defaultValue="🚀 Découvre Digital Agency…" />
            <Textarea label="Facebook" defaultValue="Et si tu transformais ton téléphone…" />
            <Textarea label="TikTok" defaultValue="POV : t'as commencé l'affiliation à 0 FCFA…" />
          </Box>
          <button onClick={save} className="rounded-full gradient-cobalt px-6 py-2.5 text-sm font-semibold text-white">Sauvegarder</button>
        </div>
      )}

      {tab === "legal" && (
        <div className="space-y-4">
          <Box titre="Mentions légales"><Textarea label="" rows={8} defaultValue="Digital Agency · Plateforme de formation…" /></Box>
          <Box titre="CGV"><Textarea label="" rows={8} defaultValue="Les présentes CGV régissent l'utilisation…" /></Box>
          <Box titre="Politique de confidentialité"><Textarea label="" rows={8} defaultValue="Digital Agency traite tes données…" /></Box>
          <button onClick={save} className="rounded-full gradient-cobalt px-6 py-2.5 text-sm font-semibold text-white">Sauvegarder</button>
        </div>
      )}

      {tab === "footer" && (
        <div className="space-y-4">
          <Box titre="Réseaux sociaux">
            <Field label="Facebook URL" />
            <Field label="Instagram URL" />
            <Field label="TikTok URL" />
            <Field label="Telegram URL" />
            <Field label="WhatsApp URL" />
          </Box>
          <Box titre="Copyright"><Field label="Texte" defaultValue="© 2025 Digital Agency" /></Box>
          <button onClick={save} className="rounded-full gradient-cobalt px-6 py-2.5 text-sm font-semibold text-white">Sauvegarder</button>
        </div>
      )}
    </div>
  );
}

function Box({ titre, children }: { titre: string; children: React.ReactNode }) {
  return <div className="rounded-2xl border border-border bg-card p-5"><h3 className="font-semibold">{titre}</h3><div className="mt-4 space-y-3">{children}</div></div>;
}
function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return <div>{label && <label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</label>}<input {...rest} className="mt-1 w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm" /></div>;
}
function Textarea({ label, rows = 4, ...rest }: { label: string; rows?: number } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <div>{label && <label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</label>}<textarea rows={rows} {...rest} className="mt-1 w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm" /></div>;
}
