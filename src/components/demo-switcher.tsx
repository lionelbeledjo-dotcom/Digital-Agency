import { useAppStore, type DemoMode } from "@/store/appStore";
import { useState } from "react";
import { Eye, User, Shield, X } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

export function DemoSwitcher() {
  const mode = useAppStore((s) => s.demoMode);
  const setMode = useAppStore((s) => s.setDemoMode);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const modes: { id: DemoMode; label: string; Icon: typeof Eye; desc: string; path: string }[] = [
    { id: "visitor", label: "Visiteur", Icon: Eye, desc: "Public, non connecté", path: "/" },
    { id: "member", label: "Membre", Icon: User, desc: "Aminata Koné · Club IA", path: "/dashboard" },
    { id: "admin", label: "Admin", Icon: Shield, desc: "Accès panneau admin", path: "/admin" },
  ];

  function handleSwitch(m: DemoMode, path: string) {
    setMode(m);
    setOpen(false);
    navigate({ to: path });
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open ? (
        <div className="w-72 rounded-2xl border border-border bg-white p-4 shadow-xl">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-forest">Mode démo</p>
            <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
          </div>
          <div className="space-y-2">
            {modes.map((m) => {
              const active = mode === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => handleSwitch(m.id, m.path)}
                  className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-colors ${active ? "border-forest bg-forest/5" : "border-border hover:bg-secondary"}`}
                >
                  <m.Icon className={`h-5 w-5 ${active ? "text-forest" : "text-muted-foreground"}`} />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{m.label}</p>
                    <p className="text-xs text-muted-foreground">{m.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-[10px] text-muted-foreground">Bascule sans authentification réelle.</p>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-full gradient-primary px-4 py-3 text-sm font-semibold text-white shadow-xl"
        >
          <Eye className="h-4 w-4" />
          Démo: {mode === "visitor" ? "Visiteur" : mode === "member" ? "Membre" : "Admin"}
        </button>
      )}
    </div>
  );
}
