import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

const GA_ID = import.meta.env.VITE_GA_ID || "";

export function Analytics() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  useEffect(() => {
    if (!GA_ID || typeof window === "undefined") return;

    const w = window as unknown as { gtag?: (...args: unknown[]) => void };
    if (w.gtag) {
      w.gtag("config", GA_ID, { page_path: pathname });
    }
  }, [pathname]);

  if (!GA_ID) return null;

  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`,
        }}
      />
    </>
  );
}
