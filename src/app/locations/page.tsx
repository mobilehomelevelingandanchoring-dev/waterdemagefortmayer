import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS } from "@/data/business";
import { LOCATIONS } from "@/data/locations";
import { JsonLd } from "@/components/schema/JsonLd";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import {
  buildLocalBusinessSchema,
  buildFAQSchema,
  buildBreadcrumbSchema,
} from "@/lib/schema";
import { cn } from "@/lib/utils";

/* ============================================================
   generateMetadata
   ============================================================ */
export const metadata: Metadata = {
  title:
    "Water Damage Restoration Service Areas in Southwest Florida | Royal Water Damage",
  description:
    "Royal Water Damage serves Fort Myers, Cape Coral, Estero, Bonita Springs, Lehigh Acres, and Naples, FL. 24/7 emergency response across Lee and Collier Counties. Call (864) 734-5702.",
  keywords: [
    "water damage restoration Southwest Florida",
    "water damage service areas Lee County",
    "water damage Fort Myers Cape Coral",
    "water damage Estero Bonita Springs",
    "water damage Lehigh Acres Naples FL",
    "emergency water restoration Southwest Florida",
  ],
  alternates: {
    canonical: `${BUSINESS.website}/locations`,
  },
  openGraph: {
    title:
      "Water Damage Restoration Service Areas in Southwest Florida | Royal Water Damage",
    description:
      "Serving Fort Myers, Cape Coral, Estero, Bonita Springs, Lehigh Acres, and Naples with 24/7 water damage restoration. IICRC certified. (864) 734-5702.",
    url: `${BUSINESS.website}/locations`,
    type: "website",
  },
};

/* ============================================================
   Service Areas FAQ — index page specific
   ============================================================ */
const SERVICE_AREA_FAQS = [
  {
    question: "What cities does Royal Water Damage serve in Southwest Florida?",
    answer:
      "Royal Water Damage provides water damage restoration, mold remediation, and emergency water extraction services throughout Fort Myers, Cape Coral, Estero, Bonita Springs, Lehigh Acres, and Naples. We cover all of Lee County and extend into Collier County for Naples and the surrounding area. If you're outside these cities, call us — we may still be able to assist.",
  },
  {
    question: "How quickly can Royal Water Damage reach my city?",
    answer:
      "Response times vary by location. We aim to reach Fort Myers within 60 minutes, Cape Coral and Estero within 30–45 minutes, Bonita Springs within 35–50 minutes, Lehigh Acres within 45–75 minutes (depending on your location within the community), and Naples within 40–55 minutes. We dispatch immediately upon your call.",
  },
  {
    question:
      "Do you charge extra for service calls to Cape Coral or Naples versus Fort Myers?",
    answer:
      "Pricing is based on the scope of work, not the city. We do not add a travel surcharge for calls within our standard service area — Fort Myers, Cape Coral, Estero, Bonita Springs, Lehigh Acres, and Naples are all treated as primary service locations. Get a free assessment by calling us.",
  },
  {
    question:
      "Does Royal Water Damage serve areas outside the listed cities?",
    answer:
      "Yes — we occasionally serve communities adjacent to our core service area throughout Lee and Collier Counties. If you're in a community not listed here, call us at (864) 734-5702 and we'll let you know if we can dispatch to your location. We cover all of Southwest Florida when possible.",
  },
  {
    question: "Is Royal Water Damage available 24/7 in all service areas?",
    answer:
      "Yes — we maintain 24/7 availability Sunday through Friday for all six cities in our service area: Fort Myers, Cape Coral, Estero, Bonita Springs, Lehigh Acres, and Naples. We are closed on Saturdays. Our live dispatch line is always answered by a real person, never a voicemail system.",
  },
];

/* ============================================================
   Page Component
   ============================================================ */
export default function LocationsIndexPage() {
  const localBusinessSchema = buildLocalBusinessSchema();
  const faqSchema = buildFAQSchema(SERVICE_AREA_FAQS);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Service Areas", url: "/locations" },
  ]);

  return (
    <>
      {/* ── JSON-LD Structured Data ── */}
      <JsonLd schema={[localBusinessSchema, faqSchema, breadcrumbSchema]} />

      {/* ── 1. Breadcrumb ── */}
      <BreadcrumbNav />

      {/* ── 2. Page Hero ── */}
      <HeroSection />

      {/* ── 3. AEO — Where We Serve ── */}
      <AeoSection />

      {/* ── 4. Location Cards Grid ── */}
      <LocationsGridSection />

      {/* ── 5. Map Section ── */}
      <MapSection />

      {/* ── 6. FAQ ── */}
      <FaqSection />

      {/* ── 7. Final CTA ── */}
      <FinalCtaSection />
    </>
  );
}

/* ============================================================
   Breadcrumb
   ============================================================ */
function BreadcrumbNav() {
  return (
    <nav
      aria-label="Breadcrumb"
      className="bg-gray-50 border-b border-gray-200"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-3">
        <ol
          className="flex items-center gap-2 text-sm text-gray-500"
          role="list"
        >
          <li>
            <Link
              href="/"
              className="hover:text-[#0f3460] transition-colors font-medium"
            >
              Home
            </Link>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li
            className="text-[#0f3460] font-semibold"
            aria-current="page"
          >
            Service Areas
          </li>
        </ol>
      </div>
    </nav>
  );
}

/* ============================================================
   Hero Section
   ============================================================ */
function HeroSection() {
  return (
    <section
      className="relative overflow-hidden bg-[#0f3460]"
      aria-label="Service Areas — Royal Water Damage Southwest Florida"
    >
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#0f3460] via-[#0d2d55] to-[#081d38]"
        aria-hidden="true"
      />

      {/* Decorative glows */}
      <div
        className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[#e94560]/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 -left-20 h-64 w-64 rounded-full bg-[#f5a623]/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 pt-20 pb-28 sm:px-6 lg:px-8 sm:pt-24 lg:pt-28 text-center">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#e94560]/40 bg-[#e94560]/15 px-4 py-1.5 text-sm font-semibold text-[#e94560] tracking-wide uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e94560] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e94560]" />
            </span>
            6 Cities &middot; Lee & Collier Counties
          </span>
        </div>

        {/* H1 */}
        <h1
          className={cn(
            "font-[family-name:var(--font-raleway)]",
            "text-white font-extrabold leading-tight tracking-tight",
            "text-3xl sm:text-5xl lg:text-6xl"
          )}
        >
          Water Damage Restoration{" "}
          <span className="text-[#f5a623]">Service Areas</span> in Southwest
          Florida
        </h1>

        <p className="mt-6 mx-auto max-w-3xl text-white/85 text-lg sm:text-xl leading-relaxed">
          Royal Water Damage provides 24/7 emergency water damage restoration,
          mold remediation, and water extraction across{" "}
          <strong className="text-white">6 cities</strong> in Southwest
          Florida — serving Lee County and Collier County homeowners and
          businesses.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`tel:${BUSINESS.phone}`}
            className={cn(
              "inline-flex items-center gap-3 rounded-full",
              "bg-[#e94560] text-white font-bold text-lg",
              "px-8 py-4",
              "shadow-lg shadow-[#e94560]/30",
              "hover:bg-[#e94560]/90 active:scale-[0.98]",
              "transition-all duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e94560] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f3460]"
            )}
            aria-label={`Call Royal Water Damage: ${BUSINESS.phoneDisplay}`}
          >
            <PhoneIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
            {BUSINESS.phoneDisplay} — Call 24/7
          </a>

          <Link
            href="/contact"
            className={cn(
              "inline-flex items-center gap-2 rounded-full",
              "border-2 border-white/70 text-white font-bold text-lg",
              "px-8 py-4",
              "hover:border-white hover:bg-white/10",
              "active:scale-[0.98] transition-all duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f3460]"
            )}
          >
            Free Assessment
          </Link>
        </div>
      </div>

      {/* Wave decoration */}
      <div
        className="absolute bottom-0 left-0 right-0 leading-none"
        aria-hidden="true"
      >
        <WaveDecoration />
      </div>
    </section>
  );
}

function WaveDecoration() {
  return (
    <svg
      viewBox="0 0 1440 80"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className="block w-full h-16 sm:h-20"
    >
      <path
        d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,45 L1440,80 L0,80 Z"
        fill="white"
        opacity="0.06"
      />
      <path
        d="M0,55 C240,25 480,75 720,55 C960,35 1200,70 1440,55 L1440,80 L0,80 Z"
        fill="white"
        opacity="0.08"
      />
      <path
        d="M0,65 C180,45 360,80 540,65 C720,50 900,75 1080,65 C1260,55 1380,70 1440,65 L1440,80 L0,80 Z"
        fill="white"
        opacity="1"
        style={{ fill: "rgb(249 250 251)" }}
      />
    </svg>
  );
}

/* ============================================================
   AEO Block — Where We Serve
   ============================================================ */
function AeoSection() {
  return (
    <section
      className="bg-gray-50 py-14 sm:py-16"
      aria-labelledby="aeo-heading"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-2xl bg-white border-l-4 border-[#0f3460] shadow-sm p-7 md:p-9"
          role="note"
          aria-label="Direct answer: where Royal Water Damage serves"
        >
          <h2
            id="aeo-heading"
            className={cn(
              "font-[family-name:var(--font-raleway)]",
              "text-xl sm:text-2xl font-extrabold text-[#0f3460] mb-4"
            )}
          >
            Where Does Royal Water Damage Serve in Southwest Florida?
          </h2>
          <p className="text-gray-700 text-base leading-relaxed">
            Royal Water Damage serves{" "}
            <strong>
              Fort Myers, Cape Coral, Estero, Bonita Springs, Lehigh Acres, and
              Naples
            </strong>{" "}
            — covering all of Lee County and extending into Collier County for
            Naples-area calls. We dispatch crews 24 hours a day, Sunday through
            Friday, with response times ranging from under 60 minutes in Fort
            Myers to 40–55 minutes for Naples. All six cities receive the same
            level of service with no travel surcharges within our core coverage
            area.
          </p>
          <ul
            className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3"
            role="list"
          >
            {LOCATIONS.map((loc) => (
              <li key={loc.slug}>
                <Link
                  href={`/locations/${loc.slug}`}
                  className={cn(
                    "flex items-center gap-2 text-sm font-semibold text-[#0f3460]",
                    "hover:text-[#e94560] transition-colors"
                  )}
                >
                  <CheckIcon
                    className="h-4 w-4 text-[#e94560] shrink-0"
                    aria-hidden="true"
                  />
                  {loc.city}, FL
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Location Cards Grid
   ============================================================ */
function LocationsGridSection() {
  return (
    <section
      className="bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="locations-grid-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            id="locations-grid-heading"
            className={cn(
              "font-[family-name:var(--font-raleway)]",
              "text-3xl sm:text-4xl font-extrabold text-[#0f3460] leading-tight"
            )}
          >
            Our Service Area Cities
          </h2>
          <p className="mt-3 text-gray-500 text-lg max-w-2xl mx-auto">
            Select your city to see local response times, zip codes served, and
            city-specific water damage information.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {LOCATIONS.map((loc) => (
            <LocationCard key={loc.slug} location={loc} />
          ))}
        </div>
      </div>
    </section>
  );
}

import type { Location } from "@/data/locations";

function LocationCard({ location }: { location: Location }) {
  const countyLabel =
    location.county === "Collier" ? "Collier County" : "Lee County";

  return (
    <Link
      href={`/locations/${location.slug}`}
      className={cn(
        "group relative flex flex-col bg-white rounded-2xl overflow-hidden",
        "border border-gray-100 shadow-sm",
        "hover:shadow-lg hover:-translate-y-1",
        "transition-all duration-300 ease-out"
      )}
      aria-label={`Water damage restoration in ${location.city}, FL`}
    >
      {/* Top accent bar */}
      <span
        className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-[#0f3460] transition-all duration-300 group-hover:h-1.5"
        aria-hidden="true"
      />

      <div className="flex flex-col flex-1 p-6 pt-7">
        {/* City name + county */}
        <div className="flex items-start justify-between gap-2 mb-4">
          <div>
            <h3
              className={cn(
                "font-[family-name:var(--font-raleway)]",
                "text-xl font-bold text-[#0f3460] leading-tight group-hover:text-[#e94560] transition-colors"
              )}
            >
              {location.city}, FL
            </h3>
            <p className="text-xs text-gray-400 font-medium mt-0.5">
              {countyLabel}
            </p>
          </div>
          <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#0f3460]/10 shrink-0">
            <MapPinIcon className="w-5 h-5 text-[#0f3460]" aria-hidden="true" />
          </span>
        </div>

        {/* Response time badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-[#e94560]/10 px-3.5 py-1.5 text-xs font-semibold text-[#e94560] w-fit mb-4">
          <ClockIcon className="h-3.5 w-3.5" aria-hidden="true" />
          Response: {location.responseTime}
        </div>

        {/* ZIP codes */}
        <div className="mb-4">
          <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1.5">
            ZIP Codes Served
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            {location.zipCodes.join(" · ")}
          </p>
        </div>

        {/* Distance from HQ */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-400">
            {location.distanceFromHQ} from HQ
          </span>
          <span className="text-sm font-semibold text-[#0f3460] group-hover:text-[#e94560] transition-colors flex items-center gap-1">
            View details
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ============================================================
   Map Section
   ============================================================ */
function MapSection() {
  return (
    <section
      className="bg-gray-50 py-16 sm:py-20 lg:py-24"
      aria-labelledby="map-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2
            id="map-heading"
            className={cn(
              "font-[family-name:var(--font-raleway)]",
              "text-3xl sm:text-4xl font-extrabold text-[#0f3460] leading-tight"
            )}
          >
            Our Coverage Area — Southwest Florida
          </h2>
          <p className="mt-3 text-gray-500 text-lg max-w-2xl mx-auto">
            Based in Fort Myers, we reach all six service cities across Lee and
            Collier Counties.
          </p>
        </div>

        {/* Two-column: map + city list */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Google Maps embed */}
          <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100 aspect-video lg:aspect-auto lg:h-[420px]">
            <iframe
              src={BUSINESS.googleMapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "300px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Royal Water Damage — Southwest Florida service area on Google Maps"
              className="w-full h-full"
            />
          </div>

          {/* City list */}
          <div className="flex flex-col gap-5">
            <h3
              className={cn(
                "font-[family-name:var(--font-raleway)]",
                "text-xl font-bold text-[#0f3460]"
              )}
            >
              Cities We Serve
            </h3>

            <ul className="space-y-3" role="list">
              {LOCATIONS.map((loc) => (
                <li key={loc.slug}>
                  <Link
                    href={`/locations/${loc.slug}`}
                    className={cn(
                      "flex items-center justify-between",
                      "rounded-xl border border-gray-100 bg-white px-5 py-3.5",
                      "hover:border-[#0f3460]/30 hover:shadow-sm",
                      "transition-all duration-150 group"
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <MapPinIcon
                        className="h-4 w-4 text-[#e94560] shrink-0"
                        aria-hidden="true"
                      />
                      <span>
                        <span className="font-semibold text-[#0f3460] group-hover:text-[#e94560] transition-colors block leading-tight text-sm">
                          {loc.city}, FL
                        </span>
                        <span className="text-xs text-gray-400">
                          {loc.county} County
                        </span>
                      </span>
                    </span>
                    <span className="text-xs text-gray-400 font-medium flex items-center gap-1.5 shrink-0">
                      <ClockIcon
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                      {loc.responseTime}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Don't see your city */}
            <p className="text-sm text-gray-500 bg-[#0f3460]/5 rounded-xl px-5 py-4 border border-[#0f3460]/10">
              <strong className="text-[#0f3460]">
                Don&apos;t see your city?
              </strong>{" "}
              Call us at{" "}
              <a
                href={`tel:${BUSINESS.phone}`}
                className="text-[#e94560] font-semibold hover:underline"
              >
                {BUSINESS.phoneDisplay}
              </a>{" "}
              — we cover all of Lee County and many surrounding Southwest
              Florida communities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FAQ Section
   ============================================================ */
function FaqSection() {
  return (
    <section
      className="bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2
            id="faq-heading"
            className={cn(
              "font-[family-name:var(--font-raleway)]",
              "text-3xl sm:text-4xl font-extrabold text-[#0f3460] leading-tight"
            )}
          >
            Service Area Coverage FAQs
          </h2>
          <p className="mt-3 text-gray-500 text-lg">
            Common questions about where we serve and how quickly we respond.
          </p>
        </div>

        {/* FAQ Accordion — client component */}
        <FAQAccordion items={SERVICE_AREA_FAQS} />

        <div className="mt-10 text-center">
          <p className="text-gray-500">
            More questions?{" "}
            <a
              href={`tel:${BUSINESS.phone}`}
              className="text-[#e94560] font-semibold hover:underline"
            >
              Call {BUSINESS.phoneDisplay}
            </a>{" "}
            — we answer live, any time.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Final CTA
   ============================================================ */
function FinalCtaSection() {
  return (
    <section
      className="relative overflow-hidden py-16 sm:py-20"
      aria-labelledby="final-cta-heading"
      style={{
        background:
          "linear-gradient(135deg, #e94560 0%, #c0303f 40%, #0f3460 100%)",
      }}
    >
      {/* Glow */}
      <div
        className="absolute -top-20 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-white/5 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2
          id="final-cta-heading"
          className={cn(
            "font-[family-name:var(--font-raleway)]",
            "text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight"
          )}
        >
          Water Damage Emergency in Southwest Florida?{" "}
          <span className="text-[#f5a623]">Call Now.</span>
        </h2>

        <p className="mt-5 text-white/85 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          We serve all six cities in our coverage area with the same urgency and
          quality. Live answer, immediate dispatch, and certified technicians
          who show up when it matters most.
        </p>

        {/* City list chips */}
        <div
          className="mt-7 flex flex-wrap items-center justify-center gap-2"
          aria-label="Cities served"
        >
          {LOCATIONS.map((loc) => (
            <span
              key={loc.slug}
              className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90"
            >
              {loc.city}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`tel:${BUSINESS.phone}`}
            className={cn(
              "inline-flex items-center gap-3 rounded-full",
              "bg-white text-[#e94560] font-extrabold text-xl",
              "px-10 py-5",
              "shadow-xl shadow-black/20",
              "hover:bg-white/95 active:scale-[0.98]",
              "transition-all duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#e94560]"
            )}
            aria-label={`Call Royal Water Damage: ${BUSINESS.phoneDisplay}`}
          >
            <PhoneIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
            {BUSINESS.phoneDisplay}
          </a>

          <Link
            href="/contact"
            className={cn(
              "inline-flex items-center gap-2 rounded-full",
              "border-2 border-white/70 text-white font-bold text-lg",
              "px-8 py-4",
              "hover:border-white hover:bg-white/10",
              "active:scale-[0.98] transition-all duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            )}
          >
            Request Free Assessment
          </Link>
        </div>

        <p className="mt-5 text-white/60 text-sm">
          Available 24/7 Sunday–Friday &middot; Closed Saturday &middot; No
          voicemail — live answer every time
        </p>
      </div>
    </section>
  );
}

/* ============================================================
   Shared SVG helpers
   ============================================================ */

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
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z" />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
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
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
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
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
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
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
