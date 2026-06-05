import { useState } from "react";
import { Bell, X, UserPlus, Coins, GraduationCap, CreditCard } from "lucide-react";

interface Notification {
  id: string;
  type: "filleul" | "commission" | "formation" | "paiement";
  message: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  { id: "1", type: "commission", message: "Nouvelle commission : +875 FCFA de k***@gmail.com", time: "il y a 2h", read: false },
  { id: "2", type: "filleul", message: "Nouveau filleul inscrit via ton lien !", time: "il y a 4h", read: false },
  { id: "3", type: "formation", message: "Tu as complété 80% de ChatGPT Avancé", time: "hier", read: false },
  { id: "4", type: "paiement", message: "Versement de 8 750 FCFA effectué (MTN MoMo)", time: "il y a 3j", read: true },
  { id: "5", type: "filleul", message: "Nouveau filleul : m***@yahoo.fr", time: "il y a 4j", read: true },
  { id: "6", type: "commission", message: "Commission versée : 3 400 FCFA", time: "il y a 5j", read: true },
];

const iconMap = {
  filleul: UserPlus,
  commission: Coins,
  formation: GraduationCap,
  paiement: CreditCard,
};

const colorMap = {
  filleul: "bg-forest/10 text-forest",
  commission: "bg-amber/10 text-amber",
  formation: "bg-forest-light/10 text-forest-light",
  paiement: "bg-olive/10 text-olive",
};

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const unread = notifications.filter(n => !n.read).length;

  function markAllRead() {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }

  function dismiss(id: string) {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="relative rounded-full p-2 hover:bg-secondary transition-colors">
        <Bell className="h-5 w-5 text-muted-foreground" />
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-forest text-[9px] font-bold text-white">{unread}</span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-12 z-50 w-80 rounded-2xl border border-border bg-white shadow-xl overflow-hidden">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <p className="text-sm font-semibold text-foreground">Notifications</p>
              {unread > 0 && (
                <button onClick={markAllRead} className="text-xs text-forest font-medium hover:text-forest-light">Tout marquer lu</button>
              )}
            </div>

            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="p-6 text-center text-sm text-muted-foreground">Aucune notification</p>
              ) : (
                notifications.map(n => {
                  const Icon = iconMap[n.type];
                  return (
                    <div key={n.id} className={`flex items-start gap-3 px-4 py-3 border-b border-border/40 last:border-0 ${!n.read ? "bg-forest/5" : ""}`}>
                      <div className={`flex h-8 w-8 items-center justify-center rounded-full shrink-0 ${colorMap[n.type]}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs leading-relaxed ${!n.read ? "text-foreground font-medium" : "text-muted-foreground"}`}>{n.message}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{n.time}</p>
                      </div>
                      <button onClick={() => dismiss(n.id)} className="text-muted-foreground/40 hover:text-muted-foreground shrink-0">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
