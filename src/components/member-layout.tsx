import { Link, Outlet, useRouterState, useNavigate } from "@tanstack/react-router";
import { Home, GraduationCap, Wallet, Users, CreditCard, Award, User, Sparkles, LogOut } from "lucide-react";
import { useAppStore } from "@/store/appStore";
import { useEffect } from "react";

const items = [
  { to: "/dashboard", label: "Accueil", Icon: Home, exact: true as boolean | undefined },
  { to: "/dashboard/formations", label: "Formations", Icon: GraduationCap, exact: undefined as boolean | undefined },
  { to: "/dashboard/commissions", label: "Commissions", Icon: Wallet, exact: undefined as boolean | undefined },
  { to: "/dashboard/affiliation", label: "Affiliation", Icon: Users, exact: undefined as boolean | undefined },
  { to: "/dashboard/paiements", label: "Paiements", Icon: CreditCard, exact: undefined as boolean | undefined },
  { to: "/dashboard/certificats", label: "Certificats", Icon: Award, exact: undefined as boolean | undefined },
  { to: "/dashboard/profil", label: "Profil", Icon: User, exact: undefined as boolean | undefined },
] as const;

export function MemberLayout() {
  const user = useAppStore((s) => s.currentUser);
  const isLoggedIn = useAppStore((s) => s.isLoggedIn);
  const logout = useAppStore((s) => s.logout);
  const navigate = useNavigate();
  const path = useRouterState({ select: (r) => r.location.pathname });

  useEffect(() => {
    if (!isLoggedIn) navigate({ to: "/auth/login" });
  }, [isLoggedIn, navigate]);

  if (!user) return null;

  const isActive = (to: string, exact?: boolean) => (exact ? path === to : path.startsWith(to));

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar desktop */}
      <aside className="hidden w-60 flex-col border-r border-border bg-sidebar lg:flex">
        <Link to="/" className="flex items-center gap-2 border-b border-border px-5 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-cobalt">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold">LB Digital</span>
        </Link>

        <nav className="flex-1 space-y-1 p-3">
          {items.map(({ to, label, Icon, exact }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive(to, exact) ? "gradient-cobalt text-white shadow-glow" : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-border p-3">
          <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full gradient-cobalt text-sm font-bold text-white">
              {user.prenom[0]}{user.nom[0]}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{user.prenom}</p>
              <p className="text-[10px] uppercase tracking-wider text-sky">{user.plan.replace("_", " ")}</p>
            </div>
            <button onClick={logout} className="text-muted-foreground hover:text-foreground"><LogOut className="h-4 w-4" /></button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col pb-20 lg:pb-0">
        <main className="flex-1 px-4 py-6 sm:px-8">
          <Outlet />
        </main>
      </div>

      {/* Bottom nav mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 flex justify-around border-t border-border bg-sidebar lg:hidden">
        {items.slice(0, 5).map(({ to, label, Icon, exact }) => (
          <Link
            key={to}
            to={to}
            className={`flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] ${
              isActive(to, exact) ? "text-sky" : "text-muted-foreground"
            }`}
          >
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
