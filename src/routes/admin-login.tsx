import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAppStore } from "@/store/appStore";
import { ShieldCheck } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin-login")({
  head: () => ({ meta: [{ title: "Admin · Connexion" }] }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const setDemoMode = useAppStore((s) => s.setDemoMode);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setDemoMode("admin");
      navigate({ to: "/admin" });
    }, 1200);
  }

  return (
    <div className="flex min-h-screen">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-olive p-12">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber">
            <span className="text-sm font-bold text-forest">LB</span>
          </div>
          <span className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>Digital Agency</span>
        </div>

        <div className="max-w-md">
          <h1 className="text-4xl font-bold text-white leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
            Panneau d'administration
          </h1>
          <p className="mt-4 text-white/60 text-lg">
            Gère tes membres, formations, commissions et paiements depuis un seul endroit.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {[
              { v: "565", l: "Membres" },
              { v: "15", l: "Formations" },
              { v: "1.2M", l: "FCFA ce mois" },
              { v: "342K", l: "À verser" },
            ].map((s) => (
              <div key={s.l} className="rounded-xl bg-white/10 p-4">
                <p className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>{s.v}</p>
                <p className="text-xs text-white/50 uppercase tracking-wider">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-white/30">&copy; 2025 Digital Agency · Accès réservé</p>
      </div>

      {/* Right panel — form */}
      <div className="flex flex-1 items-center justify-center bg-secondary px-4 py-12">
        <div className="w-full max-w-md">
          <div className="rounded-3xl border border-border bg-white p-8 shadow-soft">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-olive">
                <ShieldCheck className="h-7 w-7 text-amber" />
              </div>
              <h2 className="mt-4 text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>Accès administrateur</h2>
              <p className="mt-1 text-sm text-muted-foreground">Connecte-toi pour gérer la plateforme.</p>
            </div>

            <form onSubmit={submit} className="mt-8 space-y-5">
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Email administrateur</label>
                <input
                  type="email"
                  defaultValue="admin@digitalagency.com"
                  className="mt-1 w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-olive/30"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Mot de passe</label>
                <input
                  type="password"
                  defaultValue="admin123"
                  className="mt-1 w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-olive/30"
                  required
                />
              </div>
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-muted-foreground">
                  <input type="checkbox" className="rounded" /> Rester connecté
                </label>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-olive px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-olive/90 disabled:opacity-60"
              >
                {loading ? "Connexion en cours..." : "Se connecter"}
              </button>
            </form>

            <div className="mt-6 rounded-xl bg-amber/10 border border-amber/20 p-3">
              <p className="text-xs text-center text-amber font-medium">
                Accès réservé aux administrateurs autorisés uniquement.
              </p>
            </div>
          </div>

          {/* Mobile branding */}
          <div className="mt-6 text-center lg:hidden">
            <div className="flex items-center justify-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber">
                <span className="text-xs font-bold text-forest">LB</span>
              </div>
              <span className="font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>Digital Agency</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Panneau d'administration</p>
          </div>
        </div>
      </div>
    </div>
  );
}
