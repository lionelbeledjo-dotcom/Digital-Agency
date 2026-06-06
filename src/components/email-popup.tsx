import { useState, useEffect } from "react";
import { X, Gift, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

export function EmailPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [prenom, setPrenom] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("popup_dismissed");
    if (dismissed) return;
    const timer = setTimeout(() => setShow(true), 15000);
    return () => clearTimeout(timer);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    await supabase.from("email_leads").insert({ email, prenom, source: "popup" });
    setDone(true);
    setTimeout(() => { setShow(false); sessionStorage.setItem("popup_dismissed", "1"); }, 3000);
  }

  function dismiss() {
    setShow(false);
    sessionStorage.setItem("popup_dismissed", "1");
  }

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4" onClick={dismiss}>
      <div className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl" onClick={e => e.stopPropagation()}>
        <button onClick={dismiss} className="absolute top-4 right-4 rounded-lg p-1 hover:bg-secondary">
          <X className="h-5 w-5 text-muted-foreground" />
        </button>

        {done ? (
          <div className="text-center py-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-forest/10">
              <Gift className="h-7 w-7 text-forest" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-foreground">Merci !</h3>
            <p className="mt-2 text-sm text-muted-foreground">Ton guide arrive dans ta boite mail.</p>
          </div>
        ) : (
          <>
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber/10">
                <Gift className="h-7 w-7 text-amber" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>Guide gratuit</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                "5 outils IA pour gagner tes premiers 50.000 FCFA en ligne" — PDF offert.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="mt-6 space-y-3">
              <input type="text" value={prenom} onChange={e => setPrenom(e.target.value)} placeholder="Ton prenom" className="w-full rounded-xl border border-border px-4 py-3 text-sm focus:border-forest focus:outline-none" />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Ton email" required className="w-full rounded-xl border border-border px-4 py-3 text-sm focus:border-forest focus:outline-none" />
              <button type="submit" className="w-full rounded-xl gradient-primary px-6 py-3 text-sm font-semibold text-white shadow-glow hover:scale-[1.01] transition-transform flex items-center justify-center gap-2">
                Recevoir le guide <ArrowRight className="h-4 w-4" />
              </button>
            </form>
            <p className="mt-3 text-center text-[10px] text-muted-foreground">Pas de spam. Desabonnement en 1 clic.</p>
          </>
        )}
      </div>
    </div>
  );
}
