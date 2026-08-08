import Link from "next/link";
import { BUSINESS } from "@/data/business";
import { SERVICES } from "@/data/services";
import { LOCATIONS } from "@/data/locations";
import { FooterPhone } from "@/components/ui/PhoneLink";
import { cn } from "@/lib/utils";

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
        fill="white"
        stroke="white"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 16.5c0 1.657 1.343 3 3 3"
        stroke="#0f3460"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer
      role="contentinfo"
      className="bg-[#0f3460] text-white"
      aria-label="Site footer"
    >
      {/* Main 4-column grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Column 1 — Logo + tagline + NAP block */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2.5 mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
              aria-label="Royal Water Damage — Home"
            >
              <WaterDropIcon className="w-9 h-9 shrink-0" />
              <span
                className="font-bold text-white text-lg leading-tight"
                style={{ fontFamily: "'Raleway', 'Arial', sans-serif" }}
              >
                Royal Water Damage
              </span>
            </Link>

            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Fort Myers&apos; trusted 24/7 water damage restoration team. IICRC-certified, fully insured,
              and ready to respond when disaster strikes.
            </p>

            {/* NAP Block — schema-ready */}
            <address
              className="not-italic text-sm text-white/80 space-y-2"
              aria-label="Business contact information"
            >
              <p className="font-semibold text-white text-base">{BUSINESS.name}</p>
              <p>
                <span className="sr-only">Address: </span>
                {BUSINESS.address.streetAddress},{" "}
                {BUSINESS.address.city}, {BUSINESS.address.stateCode}{" "}
                {BUSINESS.address.zip}
              </p>
              <p>
                {/* FooterPhone: GA4 tracked, DNI-ready — styled in amber for NAP block */}
                <FooterPhone />
              </p>
              <p>
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="hover:text-white transition-colors break-all"
                >
                  {BUSINESS.email}
                </a>
              </p>
            </address>
          </div>

          {/* Column 2 — Services */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Our Services
            </h3>
            <ul className="space-y-2.5">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-white/70 text-sm hover:text-[#f5a623] transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="text-[#f5a623]/80 text-sm font-semibold hover:text-[#f5a623] transition-colors"
                >
                  View All Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 — Locations */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Service Areas
            </h3>
            <ul className="space-y-2.5">
              {LOCATIONS.map((location) => (
                <li key={location.slug}>
                  <Link
                    href={`/locations/${location.slug}`}
                    className="text-white/70 text-sm hover:text-[#f5a623] transition-colors"
                  >
                    {location.city}, {location.state}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/locations"
                  className="text-[#f5a623]/80 text-sm font-semibold hover:text-[#f5a623] transition-colors"
                >
                  All Locations →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 — Hours + Map */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Business Hours
            </h3>
            <ul className="space-y-1.5 mb-5">
              {BUSINESS.hoursDisplay.map((entry) => (
                <li key={entry.day} className="flex items-center justify-between gap-2 text-sm">
                  <span className="text-white/70">{entry.day}</span>
                  <span
                    className={cn(
                      "font-semibold tabular-nums",
                      entry.hours === "Open 24 Hours"
                        ? "text-emerald-400"
                        : "text-white/50"
                    )}
                  >
                    {entry.hours}
                  </span>
                </li>
              ))}
            </ul>

            {/* Quick contact — GA4 tracked + DNI-ready */}
            <FooterPhone className="!w-full !justify-center !text-sm !bg-[#e94560] !text-white !py-2.5 !rounded-lg !mb-4 hover:!bg-[#e94560]/90 !transition-colors" />

            {/* Google Map embed */}
            <div className="rounded-lg overflow-hidden border border-white/10">
              <iframe
                src={BUSINESS.googleMapsEmbed}
                width="100%"
                height="160"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Royal Water Damage location on Google Maps"
                aria-label="Map showing Royal Water Damage location in Fort Myers, FL"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 bg-[#0a2447]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
            <p>
              &copy; {currentYear} {BUSINESS.legalName}. All rights reserved.
              &nbsp;&middot;&nbsp;
              <span>Licensed &amp; Insured [{BUSINESS.license}]</span>
            </p>
            <nav aria-label="Footer legal links" className="flex items-center gap-4">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <span aria-hidden="true">&middot;</span>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <span aria-hidden="true">&middot;</span>
              <Link href="/sitemap.xml" className="hover:text-white transition-colors">
                Sitemap
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
