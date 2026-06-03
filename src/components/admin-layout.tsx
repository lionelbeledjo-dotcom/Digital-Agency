import { Link, Outlet, useRouterState, useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, Users, GraduationCap, Wallet, CreditCard, Mail, FileText, Settings, Sparkles, ShieldCheck } from "lucide-react";
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
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-64 flex-col border-r border-border lg:flex" style={{ backgroundColor: "#060C18" }}>
        <Link to="/" className="flex items-center justify-between gap-2 border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-cobalt">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold">LB Digital</span>
          </div>
          <span className="rounded-full bg-destructive/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-destructive">Admin</span>
        </Link>

        <nav className="flex-1 space-y-1 p-3">
          {items.map(({ to, label, Icon, exact }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive(to, exact) ? "gradient-cobalt text-white shadow-glow" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-border p-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-green" /> Mode admin actif</div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-border bg-navy/60 px-6 backdrop-blur-xl lg:px-8">
          <h1 className="text-lg font-semibold">Panneau d'administration</h1>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-destructive/20 text-sm font-bold text-destructive">A</div>
        </header>
        <main className="flex-1 overflow-x-hidden px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
