import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useAppStore } from "@/store/appStore";
import { ThemeToggle } from "./theme-toggle";

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
    <header className="sticky top-0 z-40 border-b border-border bg-white/80 dark:bg-[#0f1a14]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-forest">
            <span className="text-sm font-bold text-white">LB</span>
          </div>
          <span className="text-lg font-bold text-forest dark:text-white" style={{ fontFamily: "var(--font-heading)" }}>Digital Agency</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`link-underline text-sm font-medium transition-colors hover:text-forest ${pathname.startsWith(l.to) ? "text-forest font-semibold" : "text-muted-foreground"}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          {isLoggedIn ? (
            <Link to="/dashboard" className="rounded-full gradient-primary px-5 py-2.5 text-sm font-semibold text-white shadow-glow">
              Mon espace
            </Link>
          ) : (
            <>
              <Link to="/auth/login" className="rounded-full border border-forest/30 px-4 py-2 text-sm font-medium text-forest hover:bg-forest/5">
                Se connecter
              </Link>
              <Link to="/auth/register" className="rounded-full gradient-primary px-5 py-2.5 text-sm font-semibold text-white shadow-glow">
                Commencer
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-md border border-border p-2"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="animate-slide-in-down border-t border-border bg-white dark:bg-[#0f1a14] lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-forest"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-border pt-4">
              {isLoggedIn ? (
                <Link to="/dashboard" onClick={() => setOpen(false)} className="rounded-full gradient-primary px-4 py-2 text-center text-sm font-semibold text-white">Mon espace</Link>
              ) : (
                <>
                  <Link to="/auth/login" onClick={() => setOpen(false)} className="rounded-full border border-forest/30 px-4 py-2 text-center text-sm text-forest">Se connecter</Link>
                  <Link to="/auth/register" onClick={() => setOpen(false)} className="rounded-full gradient-primary px-4 py-2 text-center text-sm font-semibold text-white">Commencer</Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
