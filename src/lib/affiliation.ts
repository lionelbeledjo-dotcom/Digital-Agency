import { supabase } from "./supabase";

const COOKIE_NAME = "da_ref";
const COOKIE_DAYS = 365;

export function setAffiliateCookie(code: string) {
  const expires = new Date(Date.now() + COOKIE_DAYS * 86400000).toUTCString();
  document.cookie = `${COOKIE_NAME}=${code};expires=${expires};path=/;SameSite=Lax`;
}

export function getAffiliateCookie(): string | null {
  const match = document.cookie.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  return match?.[1] || null;
}

export async function trackClick(affiliateCode: string) {
  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("parrain_code", affiliateCode.toUpperCase())
    .single();

  if (!profile) return;

  setAffiliateCookie(affiliateCode);

  await supabase.from("affiliate_clicks").insert({
    affiliate_id: profile.id,
    referrer: document.referrer,
    page: window.location.pathname,
  });
}

export function checkRefParam() {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const ref = params.get("ref");

  if (ref) {
    trackClick(ref);
    const url = new URL(window.location.href);
    url.searchParams.delete("ref");
    window.history.replaceState({}, "", url.toString());
  }
}
