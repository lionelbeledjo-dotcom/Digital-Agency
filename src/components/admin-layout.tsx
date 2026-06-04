import { Link, Outlet, useRouterState, useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, Users, GraduationCap, Wallet, CreditCard, Mail, FileText, Settings, ShieldCheck } from "lucide-react";
import { useAppStore } from "@/store/appStore";
import { useEffect } from "react";

const items = [
  { to: "/admin", label: "Dashboard", Icon: LayoutDashboard, exact: true as boolean | undefined },
  { to: "/admin/membres", label: "Membres", Icon: Users, exact: undefined as boolean | undefined },
  { to: "/admin/formations", label: "Formations", Icon: GraduationCap, exact: undefined as boolean | undefined },
  { to: "/admin/commissions", label: "Commissions", Icon: Wallet, exact: undefined as boolean | undefined },
  { to: "/admin/paiements", label: "Paiements", Icon: CreditCard, exact: undefined as boolean | undefined },
  { to: "/admin/emails", label: "Emails", Icon: Mail, exact: undefined as boolean | undefined },
  { to: "/admin/contenu", label: "Contenu", Icon: FileText, exact: undefined as boolean | undefined },
  { to: "/admin/parametres", label: "Paramètres", Icon: Settings, exact: undefined as boolean | undefined },
] as const;

export function AdminLayout() {
  const isAdmin = useAppStore((s) => s.isAdmin);
  const navigate = useNavigate();
  const path = useRouterState({ select: (r) => r.location.pathname });

  useEffect(() => {
    if (!isAdmin) navigate({ to: "/" });
  }, [isAdmin, navigate]);

  if (!isAdmin) return null;

  const isActive = (to: string, exact?: boolean) => (exact ? path === to : path.startsWith(to));

  return (
    <div className="flex min-h-screen bg-secondary">
      <aside className="hidden w-64 flex-col border-r border-white/10 bg-olive lg:flex">
        <Link to="/" className="flex items-center justify-between gap-2 border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber">
              <span className="text-xs font-bold text-forest">LB</span>
            </div>
            <span className="font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>LB Digital</span>
          </div>
          <span className="rounded-full bg-amber/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber">Admin</span>
        </Link>

        <nav className="flex-1 space-y-1 p-3">
          {items.map(({ to, label, Icon, exact }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive(to, exact) ? "bg-white/15 text-white" : "text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-white/10 p-3 text-xs text-white/50">
          <div className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-amber" /> Mode admin actif</div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-border bg-white px-6 lg:px-8">
          <h1 className="text-lg font-semibold text-foreground">Panneau d'administration</h1>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-forest text-sm font-bold text-white">A</div>
        </header>
        <main className="flex-1 overflow-x-hidden px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
