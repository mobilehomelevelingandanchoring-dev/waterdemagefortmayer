import Link from "next/link";
import { Phone, Droplets, Wind, Flame, AlertTriangle, Waves, CloudLightning, Zap } from "lucide-react";
import { SERVICES } from "@/data/services";
import { MobileMenuToggle } from "./MobileMenuToggle";
import { HeaderPhone } from "@/components/ui/PhoneLink";
import { cn } from "@/lib/utils";

// Icon lookup for all 7 services
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
  { href: "/locations", label: "Locations" },
  { href: "/about", label: "About" },
  { href: "/reviews", label: "Reviews" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

function WaterDropIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 2C12 2 4 10.5 4 15a8 8 0 0 0 16 0c0-4.5-8-13-8-13z"
        fill="#0f3460"
        stroke="#0f3460"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 16.5c0 1.657 1.343 3 3 3"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ServicesDropdown() {
  return (
    <div className="relative group">
      <button
        className={cn(
          "flex items-center gap-1 py-1 text-gray-700 font-medium text-sm",
          "hover:text-[#0f3460] transition-colors duration-150",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f3460] rounded"
        )}
        aria-haspopup="true"
      >
        Services
        <svg
          className="w-3.5 h-3.5 mt-0.5 transition-transform duration-200 group-hover:rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Mega dropdown */}
      <div
        className={cn(
          "absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[640px]",
          "bg-white rounded-2xl shadow-2xl border border-gray-100",
          "opacity-0 invisible translate-y-1",
          "group-hover:opacity-100 group-hover:visible group-hover:translate-y-0",
          "transition-all duration-200 ease-out",
          "z-50 p-5"
        )}
        role="menu"
      >
        {/* Caret arrow */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-100 rotate-45" />

        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 ml-1">
          Our Services
        </p>
        <div className="grid grid-cols-2 gap-1.5">
          {SERVICES.map((service) => {
            const Icon = SERVICE_ICONS[service.icon] ?? Droplets;
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className={cn(
                  "flex items-start gap-3 p-3 rounded-xl",
                  "hover:bg-[#0f3460]/5 transition-colors duration-150",
                  "group/item"
                )}
                role="menuitem"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#0f3460]/10 shrink-0 mt-0.5 group-hover/item:bg-[#0f3460]/15 transition-colors">
                  <Icon className="w-4 h-4 text-[#0f3460]" />
                </span>
                <div className="min-w-0">
                  <span className="block text-sm font-semibold text-gray-800 group-hover/item:text-[#0f3460] transition-colors leading-tight">
                    {service.title}
                  </span>
                  <span className="block text-xs text-gray-500 mt-0.5 leading-snug line-clamp-1">
                    {service.tagline}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <Link
            href="/services"
            className="text-sm font-semibold text-[#0f3460] hover:underline"
          >
            View all services →
          </Link>
          <HeaderPhone className="!bg-[#e94560] !rounded-full !px-4 !py-1.5 !text-sm !font-semibold !min-h-0 !gap-1.5 hover:!bg-[#e94560]/90" />
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[4.5rem]">
          {/* Logo / Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f3460] rounded"
            aria-label="Royal Water Damage — Home"
          >
            <WaterDropIcon className="w-8 h-8 sm:w-9 sm:h-9" />
            <span
              className="font-bold text-[#0f3460] text-base sm:text-lg leading-tight"
              style={{ fontFamily: "'Raleway', 'Arial', sans-serif" }}
            >
              Royal Water Damage
            </span>
          </Link>

          {/* Desktop nav — center */}
          <nav
            className="hidden lg:flex items-center gap-6 xl:gap-8"
            aria-label="Main navigation"
          >
            <Link
              href="/"
              className="text-gray-700 font-medium text-sm hover:text-[#0f3460] transition-colors"
            >
              Home
            </Link>
            <ServicesDropdown />
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 font-medium text-sm hover:text-[#0f3460] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: phone + emergency badge + hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* 24/7 Emergency badge */}
            <span
              className="hidden sm:flex items-center gap-1.5 bg-[#e94560]/10 text-[#e94560] font-semibold text-xs px-3 py-1.5 rounded-full border border-[#e94560]/20"
              aria-label="Available 24/7 Emergency"
            >
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e94560] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e94560]" />
              </span>
              24/7 Emergency
            </span>

            {/* Phone CTA — PhoneLink fires GA4 phone_click + supports DNI */}
            <HeaderPhone className="hidden md:inline-flex" />

            {/* Mobile hamburger — client component */}
            <MobileMenuToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
