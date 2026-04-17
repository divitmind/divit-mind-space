"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { trackConversion, type ConversionSource } from "@/lib/analytics";

// Canonical WhatsApp URL — single source of truth. All 3 previously-divergent
// numbers across the codebase (layout, footer, this component) now agree.
const WHATSAPP_CONSULTATION_URL = "https://wa.me/919901666139";

export function WhatsAppConsultationLink({
  children,
  className,
  message,
  source = "whatsapp_cta",
}: {
  children: React.ReactNode;
  className?: string;
  message?: string;
  /** Optional label for analytics — which CTA variant fired? (e.g. "hero_cta", "footer_cta") */
  source?: ConversionSource;
}) {
  const url = message
    ? `${WHATSAPP_CONSULTATION_URL}?text=${encodeURIComponent(message)}`
    : WHATSAPP_CONSULTATION_URL;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackConversion("whatsapp_click", { source })}
      data-conversion="whatsapp"
      className={cn(
        "inline-flex items-center justify-center gap-2 no-underline cursor-pointer",
        className
      )}
    >
      {children}
    </a>
  );
}
