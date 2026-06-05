import { TopNav } from "./top-nav";
import { SiteFooter } from "./site-footer";
import { ScrollToTop } from "./scroll-to-top";
import type { ReactNode } from "react";

export function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopNav />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <ScrollToTop />
    </div>
  );
}
