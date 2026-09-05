import type { EventName } from "./counters";

/**
 * Egy kattintás jelzése a szervernek. Aggregált számlálót növel, semmilyen
 * azonosítót nem küld és nem tesz le sütit. Ha nem megy át, nem történik semmi:
 * a mérés soha nem akadályozhatja a felhasználót.
 */
export function track(event: EventName, label?: string) {
  if (typeof window === "undefined") return;
  try {
    void fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        e: event,
        p: window.location.pathname,
        ...(label ? { l: label } : {}),
      }),
    }).catch(() => {});
  } catch {
    // csendben elengedjük
  }
}
