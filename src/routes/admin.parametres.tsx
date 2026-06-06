import { createFileRoute } from "@tanstack/react-router";
import { useAppStore } from "@/store/appStore";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Settings, CreditCard, Bell, Shield, Plug, Tag, User, Globe, BarChart3, MessageSquare } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin/parametres")({
  component: ParametresPage,
});

type Tab = "general" | "fondateur" | "hero" | "reseaux" | "temoignages" | "plans" | "paiements" | "notifs" | "securite" | "integrations";

function ParametresPage() {
  const settings = useAppStore((s) => s.settings);
  const updateSetting = useAppStore((s) => s.updateSetting);
  const [tab, setTab] = useState<Tab>("general");

  const tabs = [
    { id: "general" as const, label: "Général", Icon: Settings },
    { id: "fondateur" as const, label: "Fondateur", Icon: User },
    { id: "hero" as const, label: "Hero & Chiffres", Icon: BarChart3 },
    { id: "reseaux" as const, label: "Réseaux sociaux", Icon: Globe },
    { id: "temoignages" as const, label: "Témoignages", Icon: MessageSquare },
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

      {tab === "general" && <GeneralTab settings={settings} updateSetting={updateSetting} />}
      {tab === "fondateur" && <FondateurTab />}
      {tab === "hero" && <HeroTab />}
      {tab === "reseaux" && <ReseauxTab />}
      {tab === "temoignages" && <TemoignagesTab />}
      {tab === "plans" && <PlansTab settings={settings} updateSetting={updateSetting} />}
      {tab === "paiements" && <PaiementsTab settings={settings} updateSetting={updateSetting} />}
      {tab === "notifs" && <NotifsTab />}
      {tab === "securite" && <SecuriteTab />}
      {tab === "integrations" && <IntegrationsTab />}
    </div>
  );
}

// === FONDATEUR TAB ===
function FondateurTab() {
  const [data, setData] = useState({ nom: "", role: "", bio: "", photo_url: "", linkedin: "", twitter: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("site_content").select("value").eq("key", "fondateur").single().then(({ data: row }) => {
      if (row) setData(row.value as typeof data);
      setLoading(false);
    });
  }, []);

  async function save() {
    const { error } = await supabase.from("site_content").upsert({ key: "fondateur", value: data, updated_at: new Date().toISOString() });
    if (error) { toast.error("Erreur sauvegarde"); return; }
    toast.success("Fondateur mis à jour !");
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const path = `site/fondateur-${Date.now()}.${file.name.split(".").pop()}`;
    const { error } = await supabase.storage.from("media").upload(path, file);
    if (error) { toast.error("Erreur upload"); return; }
    const { data: urlData } = supabase.storage.from("media").getPublicUrl(path);
    setData({ ...data, photo_url: urlData.publicUrl });
    toast.success("Photo uploadée !");
  }

  if (loading) return <p className="text-muted-foreground">Chargement...</p>;

  return (
    <Box>
      <p className="text-sm text-muted-foreground">Ces informations apparaissent sur la page "À propos" et dans la section fondateur du site.</p>
      <Field label="Nom complet" value={data.nom} onChange={(e) => setData({ ...data, nom: e.target.value })} />
      <Field label="Rôle / Titre" value={data.role} onChange={(e) => setData({ ...data, role: e.target.value })} />
      <div>
        <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Bio</label>
        <textarea value={data.bio} onChange={(e) => setData({ ...data, bio: e.target.value })} rows={5} className="mt-1 w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-forest/20 resize-none" />
      </div>
      <div>
        <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Photo</label>
        {data.photo_url && <img src={data.photo_url} alt="Fondateur" className="mt-2 h-24 w-24 rounded-full object-cover border-2 border-forest" />}
        <input type="file" accept="image/*" onChange={handleUpload} className="mt-2 text-xs text-muted-foreground" />
        <Field label="Ou URL directe" value={data.photo_url} onChange={(e) => setData({ ...data, photo_url: e.target.value })} />
      </div>
      <Field label="LinkedIn" value={data.linkedin} onChange={(e) => setData({ ...data, linkedin: e.target.value })} placeholder="https://linkedin.com/in/..." />
      <Field label="Twitter / X" value={data.twitter} onChange={(e) => setData({ ...data, twitter: e.target.value })} placeholder="https://x.com/..." />
      <button onClick={save} className="rounded-full gradient-primary px-6 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]">Enregistrer</button>
    </Box>
  );
}

// === HERO & CHIFFRES TAB ===
function HeroTab() {
  const [data, setData] = useState({ carte1_label: "", carte1_montant: "", carte1_sous_texte: "", carte2_label: "", carte2_montant: "", carte2_sous_texte: "" });
  const [stats, setStats] = useState({ formations: "", pays: "", apprenants: "", reverses: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      supabase.from("site_content").select("value").eq("key", "hero_chiffres").single(),
      supabase.from("site_content").select("value").eq("key", "statistiques").single(),
    ]).then(([hero, stat]) => {
      if (hero.data) setData(hero.data.value as typeof data);
      if (stat.data) setStats(stat.data.value as typeof stats);
      setLoading(false);
    });
  }, []);

  async function save() {
    const [r1, r2] = await Promise.all([
      supabase.from("site_content").upsert({ key: "hero_chiffres", value: data, updated_at: new Date().toISOString() }),
      supabase.from("site_content").upsert({ key: "statistiques", value: stats, updated_at: new Date().toISOString() }),
    ]);
    if (r1.error || r2.error) { toast.error("Erreur sauvegarde"); return; }
    toast.success("Chiffres mis à jour !");
  }

  if (loading) return <p className="text-muted-foreground">Chargement...</p>;

  return (
    <div className="space-y-6">
      <Box>
        <h3 className="font-semibold text-foreground">Cartes flottantes du Hero</h3>
        <p className="text-sm text-muted-foreground">Les chiffres affichés à côté du personnage sur la page d'accueil.</p>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Carte 1 — Label" value={data.carte1_label} onChange={(e) => setData({ ...data, carte1_label: e.target.value })} />
          <Field label="Carte 1 — Montant" value={data.carte1_montant} onChange={(e) => setData({ ...data, carte1_montant: e.target.value })} />
          <Field label="Carte 1 — Sous-texte" value={data.carte1_sous_texte} onChange={(e) => setData({ ...data, carte1_sous_texte: e.target.value })} />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Carte 2 — Label" value={data.carte2_label} onChange={(e) => setData({ ...data, carte2_label: e.target.value })} />
          <Field label="Carte 2 — Montant" value={data.carte2_montant} onChange={(e) => setData({ ...data, carte2_montant: e.target.value })} />
          <Field label="Carte 2 — Sous-texte" value={data.carte2_sous_texte} onChange={(e) => setData({ ...data, carte2_sous_texte: e.target.value })} />
        </div>
      </Box>

      <Box>
        <h3 className="font-semibold text-foreground">Statistiques (page À propos)</h3>
        <div className="grid gap-4 sm:grid-cols-4">
          <Field label="Formations" value={stats.formations} onChange={(e) => setStats({ ...stats, formations: e.target.value })} />
          <Field label="Pays" value={stats.pays} onChange={(e) => setStats({ ...stats, pays: e.target.value })} />
          <Field label="Apprenants" value={stats.apprenants} onChange={(e) => setStats({ ...stats, apprenants: e.target.value })} />
          <Field label="FCFA reversés" value={stats.reverses} onChange={(e) => setStats({ ...stats, reverses: e.target.value })} />
        </div>
      </Box>

      <button onClick={save} className="rounded-full gradient-primary px-6 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]">Enregistrer</button>
    </div>
  );
}

// === RESEAUX SOCIAUX TAB ===
function ReseauxTab() {
  const [data, setData] = useState({ facebook: "", instagram: "", telegram: "", whatsapp: "", tiktok: "", youtube: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("site_content").select("value").eq("key", "reseaux_sociaux").single().then(({ data: row }) => {
      if (row) setData(row.value as typeof data);
      setLoading(false);
    });
  }, []);

  async function save() {
    const { error } = await supabase.from("site_content").upsert({ key: "reseaux_sociaux", value: data, updated_at: new Date().toISOString() });
    if (error) { toast.error("Erreur sauvegarde"); return; }
    toast.success("Réseaux sociaux mis à jour !");
  }

  if (loading) return <p className="text-muted-foreground">Chargement...</p>;

  return (
    <Box>
      <p className="text-sm text-muted-foreground">Ces liens apparaissent dans le footer et la page À propos.</p>
      <Field label="Facebook" value={data.facebook} onChange={(e) => setData({ ...data, facebook: e.target.value })} placeholder="https://facebook.com/..." />
      <Field label="Instagram" value={data.instagram} onChange={(e) => setData({ ...data, instagram: e.target.value })} placeholder="https://instagram.com/..." />
      <Field label="TikTok" value={data.tiktok} onChange={(e) => setData({ ...data, tiktok: e.target.value })} placeholder="https://tiktok.com/@..." />
      <Field label="YouTube" value={data.youtube} onChange={(e) => setData({ ...data, youtube: e.target.value })} placeholder="https://youtube.com/@..." />
      <Field label="Telegram" value={data.telegram} onChange={(e) => setData({ ...data, telegram: e.target.value })} placeholder="https://t.me/..." />
      <Field label="WhatsApp" value={data.whatsapp} onChange={(e) => setData({ ...data, whatsapp: e.target.value })} placeholder="https://wa.me/..." />
      <button onClick={save} className="rounded-full gradient-primary px-6 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]">Enregistrer</button>
    </Box>
  );
}

// === TEMOIGNAGES TAB ===
function TemoignagesTab() {
  const [items, setItems] = useState<Array<{ nom: string; ville: string; texte: string; photo_url: string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("site_content").select("value").eq("key", "temoignages").single().then(({ data: row }) => {
      if (row) setItems(row.value as typeof items);
      setLoading(false);
    });
  }, []);

  function updateItem(index: number, field: string, value: string) {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  }

  function addItem() {
    setItems([...items, { nom: "", ville: "", texte: "", photo_url: "" }]);
  }

  function removeItem(index: number) {
    setItems(items.filter((_, i) => i !== index));
  }

  async function save() {
    const { error } = await supabase.from("site_content").upsert({ key: "temoignages", value: items, updated_at: new Date().toISOString() });
    if (error) { toast.error("Erreur sauvegarde"); return; }
    toast.success("Témoignages mis à jour !");
  }

  if (loading) return <p className="text-muted-foreground">Chargement...</p>;

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Ces témoignages apparaissent sur la page d'accueil.</p>
      {items.map((item, i) => (
        <div key={i} className="rounded-2xl border border-border bg-white p-5 shadow-soft space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-forest">Témoignage #{i + 1}</span>
            <button onClick={() => removeItem(i)} className="text-xs text-red-500 hover:text-red-700">Supprimer</button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Nom" value={item.nom} onChange={(e) => updateItem(i, "nom", e.target.value)} />
            <Field label="Ville, Pays" value={item.ville} onChange={(e) => updateItem(i, "ville", e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Texte</label>
            <textarea value={item.texte} onChange={(e) => updateItem(i, "texte", e.target.value)} rows={3} className="mt-1 w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-forest/20 resize-none" />
          </div>
          <Field label="URL photo (capture paiement, avatar...)" value={item.photo_url} onChange={(e) => updateItem(i, "photo_url", e.target.value)} placeholder="https://..." />
        </div>
      ))}
      <button onClick={addItem} className="text-sm font-semibold text-forest hover:text-forest-light">+ Ajouter un témoignage</button>
      <div>
        <button onClick={save} className="rounded-full gradient-primary px-6 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]">Enregistrer</button>
      </div>
    </div>
  );
}

// === EXISTING TABS ===
function GeneralTab({ settings, updateSetting }: { settings: any; updateSetting: any }) {
  const save = () => toast.success("Paramètres enregistrés");
  return (
    <>
      <Box>
        <Field label="Nom plateforme" defaultValue={settings.general.nomPlateforme} onChange={(e) => updateSetting("general.nomPlateforme", e.target.value)} />
        <Field label="Tagline" defaultValue={settings.general.tagline} onChange={(e) => updateSetting("general.tagline", e.target.value)} />
        <Field label="Email contact" defaultValue={settings.general.email} />
        <Field label="WhatsApp support" defaultValue={settings.general.whatsapp} />
        <Select label="Devise" options={["FCFA","EUR","USD"]} defaultValue={settings.general.devise} />
        <Toggle label="Mode maintenance" defaultChecked={settings.general.maintenanceMode} onChange={(v) => updateSetting("general.maintenanceMode", v)} />
        <Toggle label="Inscriptions ouvertes" defaultChecked={settings.general.inscriptionsOuvertes} onChange={(v) => updateSetting("general.inscriptionsOuvertes", v)} />
      </Box>
      <button onClick={save} className="rounded-full gradient-primary px-6 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]">Enregistrer</button>
    </>
  );
}

function PlansTab({ settings, updateSetting }: { settings: any; updateSetting: any }) {
  const save = () => toast.success("Paramètres enregistrés");
  return (
    <>
      <div className="space-y-4">
        {(["starter","club_ia","pro_creator"] as const).map((id) => {
          const p = settings.plans[id];
          return (
            <div key={id} className="rounded-2xl border border-border bg-white p-5 shadow-soft">
              <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase ${id === "pro_creator" ? "bg-amber/15 text-amber" : id === "club_ia" ? "bg-forest/10 text-forest" : "bg-secondary text-muted-foreground"}`}>{p.nom}</span>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <Field label="Nom" defaultValue={p.nom} onChange={(e) => updateSetting(`plans.${id}.nom`, e.target.value)} />
                <Field label="Prix mensuel (FCFA)" type="number" defaultValue={p.prixMensuel} onChange={(e) => updateSetting(`plans.${id}.prixMensuel`, Number(e.target.value))} />
                <Field label="Commission %" type="number" defaultValue={p.commission} onChange={(e) => updateSetting(`plans.${id}.commission`, Number(e.target.value))} />
              </div>
            </div>
          );
        })}
      </div>
      <button onClick={save} className="rounded-full gradient-primary px-6 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]">Enregistrer</button>
    </>
  );
}

function PaiementsTab({ settings, updateSetting }: { settings: any; updateSetting: any }) {
  const save = () => toast.success("Paramètres enregistrés");
  return (
    <>
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
                    {p.pays.map((pays: string) => (
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
      <button onClick={save} className="rounded-full gradient-primary px-6 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]">Enregistrer</button>
    </>
  );
}

function NotifsTab() {
  const save = () => toast.success("Paramètres enregistrés");
  return (
    <>
      <Box>
        <Toggle label="Email admin : nouvel inscrit" defaultChecked />
        <Toggle label="Email admin : nouveau paiement" defaultChecked />
        <Toggle label="Email admin : paiement échoué" defaultChecked />
        <Field label="Webhook URL" placeholder="https://hooks.digitalagency.com/…" />
        <Field label="SMTP Host" placeholder="smtp.example.com" />
      </Box>
      <button onClick={save} className="rounded-full gradient-primary px-6 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]">Enregistrer</button>
    </>
  );
}

function SecuriteTab() {
  const save = () => toast.success("Paramètres enregistrés");
  return (
    <>
      <Box>
        <Toggle label="Vérification email obligatoire" defaultChecked />
        <Toggle label="2FA admin" />
        <Field label="Nouveau mot de passe admin" type="password" />
        <Field label="Code d'invitation admin" placeholder="Code requis pour créer un compte admin" />
      </Box>
      <button onClick={save} className="rounded-full gradient-primary px-6 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]">Enregistrer</button>
    </>
  );
}

function IntegrationsTab() {
  const save = () => toast.success("Paramètres enregistrés");
  return (
    <>
      <Box>
        <Field label="CinetPay API Key" placeholder="Clé API CinetPay" />
        <Field label="CinetPay Site ID" placeholder="Site ID CinetPay" />
        <Field label="Google Analytics (G-XXXX)" />
        <Field label="Facebook Pixel ID" />
        <Field label="WhatsApp Business" />
        <TextareaField label="Code HTML custom HEAD" />
        <TextareaField label="Code HTML custom BODY END" />
      </Box>
      <button onClick={save} className="rounded-full gradient-primary px-6 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]">Enregistrer</button>
    </>
  );
}

// === UI COMPONENTS ===
function Box({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border border-border bg-white p-6 shadow-soft space-y-4">{children}</div>;
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</label>
      <input {...rest} className="mt-1 w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-forest/20" />
    </div>
  );
}

function TextareaField({ label }: { label: string }) {
  return (
    <div>
      <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</label>
      <textarea rows={4} className="mt-1 w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-forest/20" />
    </div>
  );
}

function Select({ label, options, defaultValue }: { label: string; options: string[]; defaultValue?: string }) {
  return (
    <div>
      <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</label>
      <select defaultValue={defaultValue} className="mt-1 w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-forest/20">
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
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
