"use client";

// ─────────────────────────────────────────────────────────────────────────────
// PhoneLink — pay-per-call optimized click-to-call component
//
// Features:
//  • Fires GA4 + GTM phone_click conversion event on every tap/click
//  • data-phone-target="tracking" attribute → DNI scripts (CallRail,
//    WhatConverts, CallTrackingMetrics) replace displayed number by source
//  • data-conversion-type for granular reporting (header, hero, cta, footer…)
//  • Minimum 44px tap target (WCAG 2.5.5) enforced on all variants
//  • Renders as <a href="tel:…"> — never <button> — so mobile dialer opens
//  • Pulse animation for emergency-context CTAs
// ─────────────────────────────────────────────────────────────────────────────

import { useCallback } from "react";
import { cn } from "@/lib/utils";
import { BUSINESS } from "@/data/business";

// ── Types ─────────────────────────────────────────────────────────────────────

export type PhoneLinkVariant =
  | "header"      // Compact pill — header phone button
  | "hero"        // Large emergency red CTA button
  | "inline"      // Inline text link — body copy
  | "footer"      // Footer NAP block
  | "mobile-bar"  // Fixed mobile bottom bar
  | "cta-banner"  // Full-width CTA section button
  | "emergency";  // Emergency page — maximum size, pulsing

export type PhoneLinkSource =
  | "header"
  | "hero"
  | "services_section"
  | "location_section"
  | "emergency_banner"
  | "footer"
  | "mobile_bar"
  | "contact_page"
  | "emergency_page"
  | "blog_cta"
  | "faq_section"
  | "combo_page"
  | "not_found"
  | string; // allow custom sources

interface PhoneLinkProps {
  /** Visual style of the button */
  variant?: PhoneLinkVariant;
  /** Where on the page this link lives — used in GA4 event */
  source?: PhoneLinkSource;
  /** Override the displayed number text */
  displayNumber?: string;
  /** Override the tel: href number (E.164 format) */
  phoneHref?: string;
  /** Custom label text (replaces display number) */
  label?: string;
  /** Show phone icon before label */
  showIcon?: boolean;
  /** Add pulse ring animation (for emergency contexts) */
  pulse?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Additional children rendered after the label */
  children?: React.ReactNode;
}

// ── GA4 / GTM event helper ────────────────────────────────────────────────────

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

function pushPhoneClickEvent(source: PhoneLinkSource, number: string) {
  // GA4 direct (if loaded without GTM)
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "phone_call", {
      event_category: "contact",
      event_label: source,
      phone_number: number,
      value: 1,
      // Maps to GA4 conversion — mark "phone_call" as a conversion in GA4
    });
  }

  // GTM dataLayer push (works with GA4 via GTM, Google Ads, etc.)
  if (typeof window !== "undefined" && Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: "phone_click",
      phone_number: number,
      click_source: source,
      page_path: window.location.pathname,
      // Google Ads conversion fields — configure in GTM trigger
      conversion_category: "phone_call",
      conversion_label: source,
    });
  }
}

// ── Variant styles ────────────────────────────────────────────────────────────

const VARIANT_CLASSES: Record<PhoneLinkVariant, string> = {
  header: cn(
    "inline-flex items-center gap-2 min-h-[44px] px-4 py-2",
    "bg-[#0f3460] text-white font-bold text-sm rounded-full",
    "hover:bg-[#0f3460]/90 active:scale-[0.98]",
    "transition-all duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f3460] focus-visible:ring-offset-2"
  ),
  hero: cn(
    "inline-flex items-center justify-center gap-3 min-h-[56px] px-8 py-4",
    "bg-[#e94560] text-white font-extrabold text-xl rounded-2xl",
    "shadow-[0_4px_20px_rgb(233_69_96/0.45)]",
    "hover:bg-[#d43050] hover:shadow-[0_6px_24px_rgb(233_69_96/0.55)] hover:-translate-y-0.5",
    "active:scale-[0.97] active:shadow-none",
    "transition-all duration-150",
    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#e94560] focus-visible:ring-offset-2"
  ),
  inline: cn(
    "inline-flex items-center gap-1 min-h-[44px]",
    "text-[#0f3460] font-bold underline decoration-2 decoration-[#0f3460]/30",
    "hover:decoration-[#0f3460] hover:text-[#e94560]",
    "transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f3460] rounded"
  ),
  footer: cn(
    "inline-flex items-center gap-2 min-h-[44px]",
    "text-[#f5a623] font-bold text-xl",
    "hover:text-white transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5a623] rounded"
  ),
  "mobile-bar": cn(
    "flex-1 flex items-center justify-center gap-2 min-h-[56px]",
    "bg-[#0f3460] text-white font-bold text-sm",
    "hover:bg-[#0f3460]/90 active:bg-[#0f3460]/80",
    "transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-inset"
  ),
  "cta-banner": cn(
    "inline-flex items-center justify-center gap-3 min-h-[60px] px-10 py-4",
    "bg-white text-[#0f3460] font-extrabold text-2xl rounded-2xl",
    "shadow-[0_4px_24px_rgb(0_0_0/0.2)]",
    "hover:bg-[#f5a623] hover:text-white hover:-translate-y-0.5",
    "active:scale-[0.97]",
    "transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white focus-visible:ring-offset-2"
  ),
  emergency: cn(
    "inline-flex items-center justify-center gap-4 min-h-[72px] w-full max-w-md px-10 py-5",
    "bg-white text-[#e94560] font-extrabold text-3xl rounded-2xl",
    "shadow-[0_8px_32px_rgb(0_0_0/0.25)]",
    "hover:bg-[#fff5f6] hover:-translate-y-1",
    "active:scale-[0.97]",
    "transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white"
  ),
};

// ── Phone icon (inline SVG — no extra import) ─────────────────────────────────

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.36 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 5.46 5.46l.97-.97a2 2 0 0 1 2.11-.45c.907.34 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

// ── Icon sizing by variant ────────────────────────────────────────────────────

const ICON_SIZE: Record<PhoneLinkVariant, string> = {
  header:      "w-4 h-4 shrink-0",
  hero:        "w-6 h-6 shrink-0",
  inline:      "w-4 h-4 shrink-0",
  footer:      "w-5 h-5 shrink-0",
  "mobile-bar":"w-5 h-5 shrink-0",
  "cta-banner":"w-7 h-7 shrink-0",
  emergency:   "w-8 h-8 shrink-0",
};

// ── Component ─────────────────────────────────────────────────────────────────

export function PhoneLink({
  variant = "inline",
  source = "unknown",
  displayNumber,
  phoneHref,
  label,
  showIcon = true,
  pulse = false,
  className,
  children,
}: PhoneLinkProps) {
  const displayNum = displayNumber ?? BUSINESS.phoneDisplay;
  const href = phoneHref ?? `tel:${BUSINESS.phone}`;
  const ariaLabel = `Call Royal Water Damage at ${displayNum}`;

  const handleClick = useCallback(() => {
    pushPhoneClickEvent(source, displayNum);
  }, [source, displayNum]);

  return (
    <a
      href={href}
      onClick={handleClick}
      className={cn(
        VARIANT_CLASSES[variant],
        pulse && "animate-pulse-ring",
        className
      )}
      aria-label={ariaLabel}
      // DNI hook — CallRail/WhatConverts scripts look for this attribute
      data-phone-target="tracking"
      // Conversion source for GTM rule matching
      data-conversion-type={source}
      // Suppress iOS auto-detection (we've already linked it)
      translate="no"
    >
      {showIcon && (
        <PhoneIcon className={ICON_SIZE[variant]} />
      )}

      <span
        // DNI script replaces text inside [data-phone-display]
        data-phone-display="true"
      >
        {label ?? displayNum}
      </span>

      {children}
    </a>
  );
}

// ── Convenience exports for the most common uses ──────────────────────────────

/** Header phone pill */
export function HeaderPhone({ className }: { className?: string }) {
  return (
    <PhoneLink
      variant="header"
      source="header"
      showIcon={true}
      className={className}
    />
  );
}

/** Large hero emergency CTA */
export function HeroPhone({
  label,
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <PhoneLink
      variant="hero"
      source="hero"
      label={label ?? `${BUSINESS.phoneDisplay} — Call 24/7`}
      showIcon={true}
      className={className}
    />
  );
}

/** Mobile sticky bar call button */
export function MobileBarPhone({ className }: { className?: string }) {
  return (
    <PhoneLink
      variant="mobile-bar"
      source="mobile_bar"
      label="Call Now"
      showIcon={true}
      className={className}
    />
  );
}

/** CTA banner large phone button */
export function BannerPhone({
  source = "emergency_banner",
  className,
}: {
  source?: PhoneLinkSource;
  className?: string;
}) {
  return (
    <PhoneLink
      variant="cta-banner"
      source={source}
      showIcon={true}
      className={className}
    />
  );
}

/** Emergency page maximum-size phone button */
export function EmergencyPhone({ className }: { className?: string }) {
  return (
    <PhoneLink
      variant="emergency"
      source="emergency_page"
      showIcon={true}
      pulse={false}
      className={className}
    />
  );
}

/** Footer NAP phone link */
export function FooterPhone({ className }: { className?: string }) {
  return (
    <PhoneLink
      variant="footer"
      source="footer"
      showIcon={false}
      className={className}
    />
  );
}
