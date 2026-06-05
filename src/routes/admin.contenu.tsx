import { createFileRoute } from "@tanstack/react-router";
import { useAppStore } from "@/store/appStore";
import { useState } from "react";
import { toast } from "sonner";
import { FileText, Home, Tag, Users, Scale, Layout } from "lucide-react";

export const Route = createFileRoute("/admin/contenu")({
  component: ContenuPage,
});

type Tab = "homepage" | "tarifs" | "affiliation" | "legal" | "footer";

function ContenuPage() {
  const settings = useAppStore((s) => s.settings);
  const updateSetting = useAppStore((s) => s.updateSetting);
  const [tab, setTab] = useState<Tab>("homepage");

  const save = () => toast.success("Modifications enregistrées");

  const tabs = [
    { id: "homepage" as const, label: "Homepage", Icon: Home },
    { id: "tarifs" as const, label: "Tarifs", Icon: Tag },
    { id: "affiliation" as const, label: "Affiliation", Icon: Users },
    { id: "legal" as const, label: "Légal", Icon: Scale },
    { id: "footer" as const, label: "Footer", Icon: Layout },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>Contenu éditorial</h1>

      <div className="flex flex-wrap gap-1 rounded-xl bg-secondary p-1">
        {tabs.map(({ id, label, Icon }) => (
          <button key={id} onClick={() => setTab(id)} className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-medium transition-colors ${tab === id ? "bg-white text-forest shadow-soft" : "text-muted-foreground hover:text-foreground"}`}>
            <Icon className="h-3.5 w-3.5" /> {label}
          </button>
        ))}
      </div>

      {tab === "homepage" && (
        <div className="space-y-4">
          <Box titre="Hero">
            <Field label="Titre H1" defaultValue="Maîtrise l'IA. Partage la connaissance. Génère des revenus réels." />
            <Field label="Sous-titre" defaultValue="Digital Agency te forme aux outils IA…" />
            <Field label="CTA principal" defaultValue="Démarrer gratuitement" />
            <Field label="CTA secondaire" defaultValue="Découvrir le programme" />
          </Box>
          <Box titre="Stats">
            {["0 FCFA / Pour commencer","+500K FCFA / Par mois possibles","12 pays / Couverts","Vendredi / Mobile Money"].map((s, i) => <Field key={i} label={`Stat ${i + 1}`} defaultValue={s} />)}
          </Box>
          <button onClick={save} className="rounded-full gradient-primary px-6 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]">Sauvegarder</button>
        </div>
      )}

      {tab === "tarifs" && (
        <div className="space-y-4">
          {(["starter","club_ia","pro_creator"] as const).map((id) => {
            const p = settings.plans[id];
            return (
              <Box key={id} titre={p.nom}>
                <Field label="Nom" defaultValue={p.nom} onChange={(e) => updateSetting(`plans.${id}.nom`, e.target.value)} />
                <Field label="Prix mensuel" type="number" defaultValue={p.prixMensuel} onChange={(e) => updateSetting(`plans.${id}.prixMensuel`, Number(e.target.value))} />
                <Field label="Commission %" type="number" defaultValue={p.commission} onChange={(e) => updateSetting(`plans.${id}.commission`, Number(e.target.value))} />
              </Box>
            );
          })}
          <button onClick={save} className="rounded-full gradient-primary px-6 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]">Sauvegarder</button>
        </div>
      )}

      {tab === "affiliation" && (
        <div className="space-y-4">
          <Box titre="Texte hero"><Field label="Titre" defaultValue="Gagne jusqu'à 40% à vie" /></Box>
          <Box titre="Messages marketing">
            <Textarea label="WhatsApp" defaultValue="Découvre Digital Agency — formation IA + commissions chaque vendredi." />
            <Textarea label="Facebook" defaultValue="Et si tu transformais ton téléphone en source de revenus ?" />
            <Textarea label="TikTok" defaultValue="POV : t'as commencé l'affiliation à 0 FCFA et t'as reçu ton premier virement." />
          </Box>
          <button onClick={save} className="rounded-full gradient-primary px-6 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]">Sauvegarder</button>
        </div>
      )}

      {tab === "legal" && (
        <div className="space-y-4">
          <Box titre="Mentions légales"><Textarea label="" rows={8} defaultValue="Digital Agency · Plateforme de formation en ligne…" /></Box>
          <Box titre="CGV"><Textarea label="" rows={8} defaultValue="Les présentes CGV régissent l'utilisation de la plateforme…" /></Box>
          <Box titre="Politique de confidentialité"><Textarea label="" rows={8} defaultValue="Digital Agency traite tes données personnelles conformément au RGPD…" /></Box>
          <button onClick={save} className="rounded-full gradient-primary px-6 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]">Sauvegarder</button>
        </div>
      )}

      {tab === "footer" && (
        <div className="space-y-4">
          <Box titre="Réseaux sociaux">
            <Field label="Facebook URL" placeholder="https://facebook.com/digitalagency" />
            <Field label="Instagram URL" placeholder="https://instagram.com/digitalagency" />
            <Field label="TikTok URL" placeholder="https://tiktok.com/@digitalagency" />
            <Field label="Telegram URL" placeholder="https://t.me/digitalagency" />
            <Field label="WhatsApp URL" placeholder="https://wa.me/2250700000000" />
          </Box>
          <Box titre="Copyright"><Field label="Texte" defaultValue="© 2025 Digital Agency · Tous droits réservés" /></Box>
          <button onClick={save} className="rounded-full gradient-primary px-6 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]">Sauvegarder</button>
        </div>
      )}
    </div>
  );
}

function Box({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-5 shadow-soft">
      <div className="flex items-center gap-2">
        <FileText className="h-4 w-4 text-amber" />
        <h3 className="font-semibold text-foreground text-sm">{titre}</h3>
      </div>
      <div className="mt-4 space-y-3">{children}</div>
    </div>
  );
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      {label && <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>}
      <input {...rest} className="mt-1 w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-forest/20" />
    </div>
  );
}

function Textarea({ label, rows = 4, ...rest }: { label: string; rows?: number } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      {label && <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>}
      <textarea rows={rows} {...rest} className="mt-1 w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-forest/20" />
    </div>
  );
}
