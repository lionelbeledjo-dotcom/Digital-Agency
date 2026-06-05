import { TopNav } from "./top-nav";
import { SiteFooter } from "./site-footer";
import { ScrollToTop } from "./scroll-to-top";
import { checkRefParam } from "@/lib/affiliation";
import { useEffect, type ReactNode } from "react";

export function PublicLayout({ children }: { children: ReactNode }) {
  useEffect(() => { checkRefParam(); }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopNav />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <ScrollToTop />
    </div>
  );
}
