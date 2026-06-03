import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/formations/new")({
  component: FormationForm,
});

function FormationForm({ titre = "Nouvelle formation" }: { titre?: string }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl font-bold">{titre}</h1>
        <Link to="/admin/formations" className="text-sm text-sky">← Retour</Link>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); toast.success("Formation enregistrée"); }} className="space-y-6">
        <Section titre="Infos générales">
          <Grid>
            <Field label="Titre" required />
            <Field label="Slug URL" />
            <FullField label="Description courte"><textarea maxLength={200} rows={2} className="mt-1 w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm" /></FullField>
            <FullField label="Description longue"><textarea rows={5} className="mt-1 w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm" /></FullField>
            <Select label="Catégorie" options={["IA","Design","Vidéo","Marketing","Réseaux","Business","Affiliation","Automatisation"]} />
            <Select label="Niveau" options={["Débutant","Intermédiaire","Avancé"]} />
            <Select label="Accès requis" options={["Gratuit","Club IA","Pro Creator"]} />
            <Field label="Durée totale (ex: 2h30)" />
            <Field label="URL image de couverture" />
            <Field label="URL vidéo de présentation" />
            <FullField label="Tags (séparés par virgule)"><input className="mt-1 w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm" /></FullField>
          </Grid>
        </Section>

        <Section titre="Programme">
          <p className="text-xs text-muted-foreground">Ce que les apprenants vont apprendre</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {Array.from({ length: 6 }).map((_, i) => <input key={i} placeholder={`Point ${i + 1}`} className="rounded-lg border border-border bg-secondary px-3 py-2 text-sm" />)}
          </div>
        </Section>

        <Section titre="Instructeur">
          <Grid>
            <Field label="Nom" />
            <Field label="Photo URL" />
            <FullField label="Bio"><textarea rows={3} className="mt-1 w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm" /></FullField>
            <Field label="LinkedIn" />
            <Field label="Twitter" />
          </Grid>
        </Section>

        <Section titre="Paramètres">
          <div className="space-y-3">
            <Toggle label="Mise en avant homepage" />
            <Toggle label="Formation gratuite (override)" />
            <Toggle label="Certificat téléchargeable" />
          </div>
        </Section>

        <div className="flex flex-wrap gap-3">
          <button type="submit" className="rounded-full gradient-cobalt px-6 py-3 text-sm font-semibold text-white">Publier</button>
          <button type="button" className="rounded-full border border-border px-6 py-3 text-sm">Enregistrer brouillon</button>
        </div>
      </form>
    </div>
  );
}

export { FormationForm };

function Section({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h2 className="font-semibold">{titre}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}
function Grid({ children }: { children: React.ReactNode }) { return <div className="grid gap-4 sm:grid-cols-2">{children}</div>; }
function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div><label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</label>
    <input {...rest} className="mt-1 w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm" /></div>
  );
}
function FullField({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="sm:col-span-2"><label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</label>{children}</div>;
}
function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <div><label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</label>
    <select className="mt-1 w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm">{options.map((o) => <option key={o}>{o}</option>)}</select></div>
  );
}
function Toggle({ label }: { label: string }) {
  return <label className="flex items-center justify-between"><span className="text-sm">{label}</span><input type="checkbox" className="h-5 w-9 appearance-none rounded-full bg-secondary checked:bg-cobalt" /></label>;
}
