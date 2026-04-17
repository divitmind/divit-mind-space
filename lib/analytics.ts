// Client-side analytics helpers. Wraps gtag events so components don't need to
// know which provider is wired up. Currently targets GA4 via @next/third-parties;
// swap/extend here when adding Plausible, PostHog, or Meta Pixel.

export type ConversionName = "whatsapp_click" | "phone_click" | "email_click";

export type ConversionSource =
  | "whatsapp_cta"
  | "hero_cta"
  | "nav_cta"
  | "footer_cta"
  | "specialist_cta"
  | "service_cta"
  | "condition_cta"
  | "near_me_cta"
  | "howto_cta"
  | "faq_cta"
  | "glossary_cta"
  | "404_cta"
  | "inline_cta"
  | "other";

type ConversionPayload = {
  source?: ConversionSource;
  /** Optional page-specific label, e.g. service slug, condition slug */
  item?: string;
  /** Optional monetary estimate — defaults to 0 (consultation is free). */
  value?: number;
};

// Extend Window for gtag — no-op on servers or when GA isn't loaded.
declare global {
  interface Window {
    gtag?: (command: string, action: string, params?: Record<string, unknown>) => void;
    dataLayer?: unknown[];
  }
}

export function trackConversion(name: ConversionName, payload: ConversionPayload = {}) {
  if (typeof window === "undefined") return;
  const { source = "other", item, value = 0 } = payload;

  // GA4 event — fires whether GA is loaded or not (gtag call is a no-op without GA).
  if (typeof window.gtag === "function") {
    window.gtag("event", name, {
      event_category: "engagement",
      event_label: source,
      value,
      ...(item ? { item_name: item } : {}),
    });
  }

  // Lightweight dataLayer push — lets Tag Manager or any other listener react.
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: name, source, item, value });
  }
}
