"use client";

import * as React from "react";
import { trackConversion, type ConversionSource } from "@/lib/analytics";

// Small client wrapper so footer + any SSR page can track tel:/mailto: clicks
// without turning the entire parent into a client component.
export function ContactClickLink({
  href,
  type,
  source = "footer_cta",
  className,
  children,
}: {
  href: string;
  type: "phone" | "email";
  source?: ConversionSource;
  className?: string;
  children: React.ReactNode;
}) {
  const onClick = () => {
    trackConversion(type === "phone" ? "phone_click" : "email_click", { source });
  };
  return (
    <a
      href={href}
      onClick={onClick}
      data-conversion={type}
      className={className}
    >
      {children}
    </a>
  );
}
