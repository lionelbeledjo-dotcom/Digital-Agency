import { Link, Outlet, useRouterState, useNavigate } from "@tanstack/react-router";
import { Home, GraduationCap, Wallet, Users, CreditCard, Award, User, LogOut } from "lucide-react";
import { useAppStore } from "@/store/appStore";
import { supabase } from "@/lib/supabase";
import { useEffect } from "react";
import { NotificationBell } from "./notifications";

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

  async function handleLogout() {
    await supabase.auth.signOut();
    logout();
    navigate({ to: "/" });
  }

  return (
    <div className="flex min-h-screen bg-secondary">
      {/* Sidebar desktop */}
      <aside className="hidden w-60 flex-col border-r border-border bg-forest lg:flex">
        <Link to="/" className="flex items-center gap-2 border-b border-white/10 px-5 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber">
            <span className="text-xs font-bold text-forest">LB</span>
          </div>
          <span className="font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>Digital Agency</span>
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

        <div className="border-t border-white/10 p-3">
          <div className="flex items-center gap-3 rounded-xl bg-white/10 p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber text-sm font-bold text-forest">
              {user.prenom[0]}{user.nom[0]}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">{user.prenom}</p>
              <p className="text-[10px] uppercase tracking-wider text-amber">{user.plan.replace("_", " ")}</p>
            </div>
            <button onClick={handleLogout} className="text-white/50 hover:text-white"><LogOut className="h-4 w-4" /></button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col pb-20 lg:pb-0">
        {/* Top bar avec notifications */}
        <header className="flex h-14 items-center justify-end gap-3 border-b border-border bg-white px-4 sm:px-8">
          <NotificationBell />
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-forest text-xs font-bold text-white">
            {user.prenom[0]}{user.nom[0]}
          </div>
        </header>
        <main className="flex-1 px-4 py-6 sm:px-8">
          <Outlet />
        </main>
      </div>

      {/* Bottom nav mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 flex justify-around border-t border-border bg-white lg:hidden">
        {items.slice(0, 5).map(({ to, label, Icon, exact }) => (
          <Link
            key={to}
            to={to}
            className={`flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] ${
              isActive(to, exact) ? "text-forest font-semibold" : "text-muted-foreground"
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
