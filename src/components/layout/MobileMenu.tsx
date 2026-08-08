"use client";

import { useState } from "react";
import Link from "next/link";
import { X, Droplets, Wind, Flame, AlertTriangle, Waves, CloudLightning, Zap } from "lucide-react";
import { SERVICES } from "@/data/services";
import { PhoneLink } from "@/components/ui/PhoneLink";
import { cn } from "@/lib/utils";

const SERVICE_ICONS: Record<string, React.ElementType> = {
  Droplets,
  Wind,
  Flame,
  AlertTriangle,
  Waves,
  CloudLightning,
  Zap,
};

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/locations", label: "Locations" },
  { href: "/about", label: "About" },
  { href: "/reviews", label: "Reviews" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [servicesExpanded, setServicesExpanded] = useState(false);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-[min(320px,100vw)] bg-white shadow-2xl",
          "transform transition-transform duration-300 ease-in-out md:hidden",
          "flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <span className="text-[#0f3460] font-bold text-lg tracking-tight">Menu</span>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-5 py-4">
          <ul className="space-y-1">
            {NAV_LINKS.slice(0, 1).map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block px-3 py-2.5 rounded-lg text-gray-800 font-medium hover:bg-[#0f3460]/5 hover:text-[#0f3460] transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}

            {/* Services accordion */}
            <li>
              <button
                onClick={() => setServicesExpanded((v) => !v)}
                className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-gray-800 font-medium hover:bg-[#0f3460]/5 hover:text-[#0f3460] transition-colors"
                aria-expanded={servicesExpanded}
              >
                Services
                <svg
                  className={cn("w-4 h-4 transition-transform duration-200", servicesExpanded && "rotate-180")}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Services list */}
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  servicesExpanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <ul className="mt-1 ml-3 border-l-2 border-[#0f3460]/10 pl-3 space-y-0.5">
                  {SERVICES.map((service) => {
                    const Icon = SERVICE_ICONS[service.icon] ?? Droplets;
                    return (
                      <li key={service.slug}>
                        <Link
                          href={`/services/${service.slug}`}
                          onClick={onClose}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-[#0f3460]/5 hover:text-[#0f3460] transition-colors"
                        >
                          <Icon className="w-4 h-4 text-[#0f3460] shrink-0" />
                          <span className="text-sm font-medium leading-tight">{service.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>

            {NAV_LINKS.slice(1).map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block px-3 py-2.5 rounded-lg text-gray-800 font-medium hover:bg-[#0f3460]/5 hover:text-[#0f3460] transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Emergency notice */}
          <div className="mt-6 px-3 py-3 bg-red-50 rounded-xl border border-red-100">
            <p className="text-xs font-semibold text-red-700 uppercase tracking-wider mb-1">24/7 Emergency</p>
            <p className="text-xs text-red-600">We answer live — no voicemail, no wait.</p>
          </div>
        </nav>

        {/* Bottom CTA */}
        <div className="px-5 py-5 border-t border-gray-100 bg-gray-50 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
          {/* PhoneLink: GA4 tracked, DNI-ready, fires phone_click conversion */}
          <PhoneLink
            variant="header"
            source="mobile_menu"
            label="(864) 734-5702 — Tap to Call"
            showIcon={true}
            className="!w-full !justify-center !rounded-xl !py-3.5 !px-5 !text-base !min-h-0"
          />
          <Link
            href="/contact"
            onClick={onClose}
            className="flex items-center justify-center w-full mt-3 border-2 border-[#0f3460] text-[#0f3460] font-bold py-3 px-5 rounded-xl hover:bg-[#0f3460]/5 transition-colors"
          >
            Get Free Quote
          </Link>
        </div>
      </div>
    </>
  );
}
