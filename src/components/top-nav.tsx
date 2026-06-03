import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";
import { useAppStore } from "@/store/appStore";

const links = [
  { to: "/formations", label: "Formations" },
  { to: "/tarifs", label: "Tarifs" },
  { to: "/affiliation", label: "Affiliation" },
  { to: "/blog", label: "Blog" },
  { to: "/faq", label: "FAQ" },
] as const;

export function TopNav() {
  const [open, setOpen] = useState(false);
  const isLoggedIn = useAppStore((s) => s.isLoggedIn);
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-navy/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-cobalt shadow-glow">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight">LB Digital</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-medium transition-colors hover:text-foreground ${pathname.startsWith(l.to) ? "text-foreground" : "text-muted-foreground"}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {isLoggedIn ? (
            <Link to="/dashboard" className="rounded-full gradient-cobalt px-5 py-2 text-sm font-semibold text-white shadow-glow">
              Mon espace
            </Link>
          ) : (
            <>
              <Link to="/auth/login" className="rounded-full border border-sky/40 px-4 py-2 text-sm font-medium text-sky hover:bg-sky/10">
                Se connecter
              </Link>
              <Link to="/auth/register" className="rounded-full gradient-cobalt px-5 py-2 text-sm font-semibold text-white shadow-glow">
                Commencer gratuitement
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-md border border-border p-2 lg:hidden"
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-navy lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-border pt-4">
              {isLoggedIn ? (
                <Link to="/dashboard" onClick={() => setOpen(false)} className="rounded-full gradient-cobalt px-4 py-2 text-center text-sm font-semibold text-white">Mon espace</Link>
              ) : (
                <>
                  <Link to="/auth/login" onClick={() => setOpen(false)} className="rounded-full border border-sky/40 px-4 py-2 text-center text-sm">Se connecter</Link>
                  <Link to="/auth/register" onClick={() => setOpen(false)} className="rounded-full gradient-cobalt px-4 py-2 text-center text-sm font-semibold text-white">Commencer gratuitement</Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
