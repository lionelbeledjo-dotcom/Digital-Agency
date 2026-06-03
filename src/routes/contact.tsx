import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/public-layout";
import { toast } from "sonner";
import { MessageCircle, Mail } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact · LB Digital" }] }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PublicLayout>
      <section className="bg-hero-radial py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h1 className="text-4xl font-bold sm:text-5xl">On t'écoute</h1>
          <p className="mt-3 text-muted-foreground">Réponse sous 24h, garanti.</p>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.4fr_1fr]">
          <form onSubmit={(e) => { e.preventDefault(); toast.success("Message envoyé !"); }} className="rounded-3xl border border-border bg-card p-6 space-y-4 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Nom" required />
              <Field label="Email" type="email" required />
              <Field label="WhatsApp" />
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Sujet</label>
                <select className="mt-1 w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm">
                  {["Support technique","Question commerciale","Affiliation","Partenariat","Autre"].map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Message</label>
              <textarea rows={6} required className="mt-1 w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm" />
            </div>
            <button className="rounded-full gradient-cobalt px-6 py-3 font-semibold text-white shadow-glow">Envoyer le message</button>
          </form>
          <div className="space-y-4">
            <a href="https://wa.me/2250700000000" className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 hover:bg-secondary">
              <MessageCircle className="h-6 w-6 text-green" />
              <div><p className="font-semibold">WhatsApp</p><p className="text-xs text-muted-foreground">+225 07 00 00 00 00</p></div>
            </a>
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5">
              <Mail className="h-6 w-6 text-sky" />
              <div><p className="font-semibold">Email</p><p className="text-xs text-muted-foreground">contact@lbdigital.com</p></div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="text-sm font-semibold">Temps de réponse</p>
              <p className="mt-1 text-xs text-muted-foreground">Sous 24h en semaine, 48h le week-end.</p>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</label>
      <input {...rest} className="mt-1 w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm" />
    </div>
  );
}
