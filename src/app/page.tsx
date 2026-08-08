import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS } from "@/data/business";
import { SERVICES } from "@/data/services";
import { LOCATIONS } from "@/data/locations";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { ReviewCard } from "@/components/ui/ReviewCard";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { LeadForm } from "@/components/ui/LeadForm";
import { JsonLd } from "@/components/schema/JsonLd";
import {
  buildLocalBusinessSchema,
  buildFaqSchema,
  buildWebSiteSchema,
  buildOrganizationSchema,
} from "@/lib/schema";
import { cn } from "@/lib/utils";

/* ============================================================
   Page-level Metadata
   ============================================================ */
export const metadata: Metadata = {
  title:
    "Fort Myers' Most Trusted 24/7 Water Damage Restoration | Royal Water Damage",
  description:
    "Royal Water Damage responds to flood, sewage, and storm emergencies across Fort Myers 24 hours a day. IICRC-certified crews arrive in 60 minutes or less. 5.0 stars · (864) 734-5702.",
  keywords: [
    "water damage restoration Fort Myers FL",
    "emergency water damage Fort Myers",
    "flood cleanup Fort Myers",
    "mold remediation Fort Myers",
    "sewage cleanup Fort Myers",
    "storm damage restoration Lee County",
    "24/7 water damage Fort Myers",
  ],
  alternates: {
    canonical: "https://royalwaterdamagefortmyers.com",
  },
  openGraph: {
    title:
      "Fort Myers' Most Trusted 24/7 Water Damage Restoration | Royal Water Damage",
    description:
      "IICRC-certified crews, 60-minute response, 5.0 Google stars. Serving Fort Myers, Cape Coral, Estero, Bonita Springs & Southwest Florida.",
    url: "https://royalwaterdamagefortmyers.com",
    type: "website",
  },
};

/* ============================================================
   FAQ data — homepage-specific questions
   ============================================================ */
const HOME_FAQS = [
  {
    question: "Is Royal Water Damage open on weekends?",
    answer:
      "Royal Water Damage is available 24/7 Sunday through Friday. We are closed on Saturdays. For Sunday through Friday emergencies — including overnight and holidays — we respond immediately.",
  },
  {
    question: "How quickly can you respond to a water damage emergency in Fort Myers?",
    answer:
      "In most cases, our team arrives within 60 minutes of your call. Fort Myers' compact layout and our local base allow for fast dispatch across the city and into Cape Coral, Estero, and Bonita Springs.",
  },
  {
    question: "How much does water damage restoration cost in Fort Myers?",
    answer:
      "Costs vary by damage severity, affected area size, and materials involved. A typical water damage job in Fort Myers ranges from $1,500 to $15,000+. We provide a free on-site assessment before any work begins. Most homeowner insurance policies cover water damage restoration — we'll help you document the damage for your claim.",
  },
  {
    question: "Does water damage always lead to mold?",
    answer:
      "Not always — but in Fort Myers' warm, humid climate, mold can begin growing within 24–48 hours of water exposure. Fast extraction and professional drying equipment dramatically reduce mold risk. We use industrial dehumidifiers and air movers to dry structures to IICRC standards.",
  },
  {
    question: "Do you work with insurance companies?",
    answer:
      "Yes. We document all damage thoroughly with photos, moisture readings, and detailed reports. We work directly with most major insurance carriers and can help you understand your claim process. [NEEDS CLIENT INPUT — confirm preferred insurance partners]",
  },
];

/* ============================================================
   Service areas to display in the map section
   (uses first 6 LOCATIONS entries)
   ============================================================ */
const DISPLAY_LOCATIONS = LOCATIONS.slice(0, 6);

/* ============================================================
   Page Component
   ============================================================ */
export default function HomePage() {
  const localBusinessSchema = buildLocalBusinessSchema();
  const faqSchema = buildFaqSchema(HOME_FAQS);
  const webSiteSchema = buildWebSiteSchema();
  const organizationSchema = buildOrganizationSchema();

  return (
    <>
      {/* ── JSON-LD Structured Data — all injected at page top ── */}
      {/* WebSite schema enables Google Sitelinks Search Box */}
      <JsonLd schema={webSiteSchema} />
      {/* Organization entity — canonical business entity definition */}
      <JsonLd schema={organizationSchema} />
      {/* LocalBusiness — maps/local pack ranking signals */}
      <JsonLd schema={localBusinessSchema} />
      {/* FAQPage — eligible for rich result FAQ snippets */}
      <JsonLd schema={faqSchema} />

      {/* ── 1. Hero Section ── */}
      <HeroSection />

      {/* ── 2. Services Grid ── */}
      <ServicesSection />

      {/* ── 3. Why Choose Us ── */}
      <WhyChooseSection />

      {/* ── 4. Service Area / Map ── */}
      <ServiceAreaSection />

      {/* ── 5. Reviews / Social Proof ── */}
      <ReviewsSection />

      {/* ── 6. Emergency CTA Banner ── */}
      <EmergencyBanner />

      {/* ── 7. FAQ Section ── */}
      <FaqSection />

      {/* ── 8. Final CTA / Lead Form ── */}
      <FinalCtaSection />
    </>
  );
}

/* ============================================================
   Section 1 — Hero
   ============================================================ */
function HeroSection() {
  return (
    <section
      className="relative overflow-hidden bg-[#0f3460]"
      aria-label="Hero — Royal Water Damage Fort Myers"
    >
      {/* Navy-to-dark-navy gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#0f3460] via-[#0d2d55] to-[#081d38]"
        aria-hidden="true"
      />

      {/* Subtle radial highlight — top-right */}
      <div
        className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[#e94560]/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 -left-20 h-64 w-64 rounded-full bg-[#f5a623]/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-20 pb-32 sm:px-6 lg:px-8 sm:pt-24 lg:pt-28">
        {/* Emergency badge */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#e94560]/40 bg-[#e94560]/15 px-4 py-1.5 text-sm font-semibold text-[#e94560] tracking-wide uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e94560] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e94560]" />
            </span>
            24/7 Emergency Response — Sun–Fri
          </span>
        </div>

        {/* H1 */}
        <h1
          className={cn(
            "font-[family-name:var(--font-raleway)]",
            "text-center text-white font-extrabold leading-tight",
            "text-4xl sm:text-5xl lg:text-6xl xl:text-7xl",
            "tracking-tight"
          )}
        >
          Fort Myers&apos; Most Trusted{" "}
          <span className="text-[#f5a623]">24/7</span>{" "}
          Water Damage Restoration Team
        </h1>

        {/* AEO direct-answer block */}
        <p className="mt-6 mx-auto max-w-3xl text-center text-white/80 text-lg sm:text-xl leading-relaxed">
          Royal Water Damage responds to flood, sewage, and storm emergencies
          across Fort Myers 24 hours a day — except Saturdays. Our certified
          technicians arrive in{" "}
          <strong className="text-white font-semibold">60 minutes or less</strong>{" "}
          to stop damage and begin professional restoration. Post-Hurricane Ian,
          Fort Myers homeowners trust us to show up when it matters most.
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary — emergency call */}
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
            aria-label="Call Royal Water Damage now — (864) 734-5702"
          >
            <PhoneIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
            {BUSINESS.phoneDisplay} — Call 24/7
          </a>

          {/* Secondary — contact form */}
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
            Get Free Assessment
          </Link>
        </div>

        {/* Inline trust signals */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-medium text-white/70">
          <TrustSignal icon="⭐" text="5.0 Stars" />
          <TrustDivider />
          <TrustSignal icon="✓" text={`${BUSINESS.rating.count} Google Reviews`} />
          <TrustDivider />
          <TrustSignal icon="✓" text="Licensed & Insured" />
          <TrustDivider />
          <TrustSignal icon="✓" text="60-Min Response" />
        </div>
      </div>

      {/* Water wave SVG — bottom of hero, fast LCP (no image request) */}
      <div className="absolute bottom-0 left-0 right-0 leading-none" aria-hidden="true">
        <WaveDecoration />
      </div>
    </section>
  );
}

function TrustSignal({ icon, text }: { icon: string; text: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="text-[#f5a623]">{icon}</span>
      <span>{text}</span>
    </span>
  );
}

function TrustDivider() {
  return <span className="hidden sm:block text-white/30" aria-hidden="true">·</span>;
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
        className="text-white fill-white"
        style={{ fill: "rgb(249 250 251)" }}
      />
    </svg>
  );
}

/* ============================================================
   Section 2 — Services Grid
   ============================================================ */
function ServicesSection() {
  return (
    <section
      className="bg-gray-50 py-16 sm:py-20 lg:py-24"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2
            id="services-heading"
            className={cn(
              "font-[family-name:var(--font-raleway)]",
              "text-3xl sm:text-4xl font-extrabold text-[#0f3460] leading-tight"
            )}
          >
            Complete Water Damage Services in Fort Myers
          </h2>
          <p className="mt-3 text-gray-500 text-lg max-w-2xl mx-auto">
            From emergency extraction to full restoration — one call covers everything.
          </p>
        </div>

        {/* Services grid — 3 col desktop, 2 col tablet, 1 col mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.slug}
              slug={service.slug}
              title={service.title}
              tagline={service.tagline}
              icon={service.icon}
              featured={index === 0} /* Water Damage Restoration is the hero service */
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <p className="text-gray-500 text-sm">
            Not sure which service you need?{" "}
            <a
              href={`tel:${BUSINESS.phone}`}
              className="text-[#e94560] font-semibold hover:underline"
            >
              Call us — we&apos;ll walk you through it.
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Section 3 — Why Choose Royal Water Damage
   ============================================================ */
const WHY_FEATURES = [
  {
    icon: <ClockFeatureIcon />,
    title: "60-Minute Response",
    description:
      "We dispatch immediately. Most Fort Myers calls are on-site within the hour, minimizing structural damage and mold risk. In Southwest Florida's heat, every minute counts.",
  },
  {
    icon: <StarFeatureIcon />,
    title: "5.0 Star Rated",
    description:
      "Seven consecutive 5-star reviews and counting. Our reputation is built on showing up fast and doing the job right — every time, for every homeowner.",
  },
  {
    icon: <MoonFeatureIcon />,
    title: "24/7 Availability",
    description:
      "Water damage doesn't keep business hours. We're available every hour of every day except Saturday — ready when disasters strike, including 2 AM and holiday weekends.",
  },
  {
    icon: <CertFeatureIcon />,
    title: "Certified Technicians",
    description:
      "Our team follows IICRC S500 standards for water damage restoration — the industry gold standard for safe, effective remediation. {/* [NEEDS CLIENT INPUT — IICRC cert number] */}",
  },
] as const;

function WhyChooseSection() {
  return (
    <section
      className="bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="why-choose-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2
            id="why-choose-heading"
            className={cn(
              "font-[family-name:var(--font-raleway)]",
              "text-3xl sm:text-4xl font-extrabold text-[#0f3460] leading-tight"
            )}
          >
            Why Fort Myers Homeowners Call Royal Water Damage First
          </h2>
          <p className="mt-3 text-gray-500 text-lg max-w-2xl mx-auto">
            After Hurricane Ian left thousands of Lee County families without a
            dry home, we know what&apos;s at stake. Here&apos;s why locals
            trust us.
          </p>
        </div>

        {/* 4-column feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {WHY_FEATURES.map((feature) => (
            <div
              key={feature.title}
              className={cn(
                "flex flex-col items-start gap-4 rounded-2xl",
                "bg-gray-50 border border-gray-100",
                "p-6 hover:shadow-md transition-shadow duration-200"
              )}
            >
              {/* Icon container */}
              <div
                className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#0f3460]/10"
                aria-hidden="true"
              >
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="font-[family-name:var(--font-raleway)] text-lg font-bold text-[#0f3460] leading-snug">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-500 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Why Choose feature icons ─────────────────────────────────────────────── */

function ClockFeatureIcon() {
  return (
    <svg className="w-6 h-6 text-[#0f3460]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function StarFeatureIcon() {
  return (
    <svg className="w-6 h-6 text-[#f5a623]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function MoonFeatureIcon() {
  return (
    <svg className="w-6 h-6 text-[#0f3460]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function CertFeatureIcon() {
  return (
    <svg className="w-6 h-6 text-[#0f3460]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}

/* ============================================================
   Section 4 — Service Area / Map
   ============================================================ */
function ServiceAreaSection() {
  return (
    <section
      className="bg-gray-50 py-16 sm:py-20 lg:py-24"
      aria-labelledby="service-area-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2
            id="service-area-heading"
            className={cn(
              "font-[family-name:var(--font-raleway)]",
              "text-3xl sm:text-4xl font-extrabold text-[#0f3460] leading-tight"
            )}
          >
            Serving Fort Myers and All of Southwest Florida
          </h2>
          <p className="mt-3 text-gray-500 text-lg max-w-3xl mx-auto">
            We cover Fort Myers, Cape Coral, Estero, Bonita Springs, Lehigh
            Acres, Naples, and surrounding Lee County communities. From the
            Caloosahatchee River corridor to the Gulf Coast — we&apos;re your
            local team.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left — Google Maps embed */}
          <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100 aspect-video lg:aspect-auto lg:h-[420px]">
            <iframe
              src={BUSINESS.googleMapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "300px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Royal Water Damage — Fort Myers, FL location on Google Maps"
              className="w-full h-full"
            />
          </div>

          {/* Right — City list */}
          <div className="flex flex-col gap-6">
            <h3 className="font-[family-name:var(--font-raleway)] text-xl font-bold text-[#0f3460]">
              Cities We Serve
            </h3>

            <ul className="space-y-3" role="list">
              {DISPLAY_LOCATIONS.map((location) => (
                <li key={location.slug}>
                  <Link
                    href={`/locations/${location.slug}`}
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
                      <span className="font-semibold text-[#0f3460] group-hover:text-[#e94560] transition-colors">
                        {location.city}, FL
                      </span>
                    </span>
                    <span className="text-xs text-gray-400 font-medium flex items-center gap-1.5">
                      <ClockSmallIcon className="h-3.5 w-3.5" aria-hidden="true" />
                      {location.responseTime}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* "Don't see your city" note */}
            <p className="text-sm text-gray-500 bg-[#0f3460]/5 rounded-xl px-5 py-4 border border-[#0f3460]/10">
              <strong className="text-[#0f3460]">Don&apos;t see your city?</strong>{" "}
              Call us —{" "}
              <a
                href={`tel:${BUSINESS.phone}`}
                className="text-[#e94560] font-semibold hover:underline"
              >
                {BUSINESS.phoneDisplay}
              </a>{" "}
              — we likely serve your area. We cover all of Lee County and
              surrounding Southwest Florida communities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockSmallIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

/* ============================================================
   Section 5 — Social Proof / Reviews
   ============================================================ */

/*
 * [NEEDS CLIENT INPUT — Replace placeholder review text with real Google review
 * content from the client's Google Business Profile. The author names, text,
 * and dates below are illustrative placeholders ONLY.]
 */
const PLACEHOLDER_REVIEWS = [
  {
    author: "James T.",
    rating: 5,
    /* [NEEDS CLIENT INPUT — Real review text from Google] */
    text: "Called Royal Water Damage at midnight after discovering a burst pipe in my kitchen. They were at my Fort Myers home in under an hour. The crew was professional, thorough, and had industrial drying equipment set up before I even finished talking to my insurance company. Highly recommend.",
    date: "March 2024",
    source: "Google",
  },
  {
    author: "Maria S.",
    rating: 5,
    /* [NEEDS CLIENT INPUT — Real review text from Google] */
    text: "After the flooding from the heavy rains near the Caloosahatchee, I was panicking. Royal Water Damage walked me through every step — from extraction to drying to dealing with my adjuster. They made a nightmare situation manageable. Five stars isn't enough.",
    date: "July 2024",
    source: "Google",
  },
  {
    author: "Robert K.",
    rating: 5,
    /* [NEEDS CLIENT INPUT — Real review text from Google] */
    text: "Sewage backup in my Cape Coral home. Not a fun situation. The team showed up in full gear, handled everything safely and discreetly, and left the space cleaner than before the incident. Professional, fast, and honest about pricing. Will call them again if I ever need to.",
    date: "November 2024",
    source: "Google",
  },
] as const;

function ReviewsSection() {
  return (
    <section
      className="bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="reviews-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2
            id="reviews-heading"
            className={cn(
              "font-[family-name:var(--font-raleway)]",
              "text-3xl sm:text-4xl font-extrabold text-[#0f3460] leading-tight"
            )}
          >
            What Fort Myers Homeowners Say
          </h2>
          <p className="mt-3 text-gray-500 text-lg">
            5.0 stars across all {BUSINESS.rating.count} Google reviews — see what our customers experienced.
          </p>

          {/* AggregateRating badge */}
          <div
            className="mt-5 inline-flex items-center gap-3 rounded-full bg-[#f5a623]/10 border border-[#f5a623]/30 px-5 py-2.5"
            aria-label={`Aggregate rating: 5.0 stars from ${BUSINESS.rating.count} reviews on Google`}
            itemScope
            itemType="https://schema.org/AggregateRating"
          >
            <span className="flex items-center gap-0.5" aria-hidden="true">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} className="w-4 h-4 text-[#f5a623]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </span>
            <span className="font-bold text-[#0f3460] text-sm">
              <span itemProp="ratingValue">{BUSINESS.rating.value.toFixed(1)}</span> ★ —{" "}
              <span itemProp="reviewCount">{BUSINESS.rating.count}</span> Reviews on Google
            </span>
          </div>
        </div>

        {/* Review cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {/* [NEEDS CLIENT INPUT — Replace with real review content from Google Business Profile] */}
          {PLACEHOLDER_REVIEWS.map((review) => (
            <ReviewCard
              key={review.author}
              author={review.author}
              rating={review.rating}
              text={review.text}
              date={review.date}
              source={review.source}
            />
          ))}
        </div>

        {/* Disclaimer note for placeholder content */}
        {/* [NEEDS CLIENT INPUT — Remove this note once real reviews are inserted above] */}
        <p className="mt-6 text-center text-xs text-gray-400 italic">
          Review content above is illustrative placeholder text. Real Google reviews will be inserted when provided by the client.
        </p>
      </div>
    </section>
  );
}

/* ============================================================
   Section 6 — Emergency CTA Banner
   ============================================================ */
function EmergencyBanner() {
  return (
    <section
      className="relative overflow-hidden py-16 sm:py-20"
      aria-labelledby="emergency-banner-heading"
      style={{
        background: "linear-gradient(135deg, #e94560 0%, #c0303f 40%, #0f3460 100%)",
      }}
    >
      {/* Decorative glow */}
      <div
        className="absolute -top-20 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-white/5 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Pulsing alert icon */}
        <div className="flex justify-center mb-6" aria-hidden="true">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 border border-white/20">
            <AlertIcon className="h-7 w-7 text-white" />
          </span>
        </div>

        <h2
          id="emergency-banner-heading"
          className={cn(
            "font-[family-name:var(--font-raleway)]",
            "text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight"
          )}
        >
          Water Emergency Right Now?{" "}
          <span className="text-[#f5a623]">Don&apos;t Wait.</span>
        </h2>

        <p className="mt-5 text-white/85 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          Every minute water sits, damage spreads. Mold can begin growing
          within 24 hours in Fort Myers&apos; heat and humidity. Call us
          immediately — we answer 24/7, every day except Saturday.
        </p>

        {/* Phone CTA */}
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
            aria-label={`Call Royal Water Damage emergency line: ${BUSINESS.phoneDisplay}`}
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
            Get Free Quote
          </Link>
        </div>

        <p className="mt-5 text-white/60 text-sm">
          Or use our online form — we&apos;ll call you back within 5 minutes.
        </p>
      </div>
    </section>
  );
}

function AlertIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

/* ============================================================
   Section 7 — FAQ
   ============================================================ */
function FaqSection() {
  return (
    <section
      className="bg-gray-50 py-16 sm:py-20 lg:py-24"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2
            id="faq-heading"
            className={cn(
              "font-[family-name:var(--font-raleway)]",
              "text-3xl sm:text-4xl font-extrabold text-[#0f3460] leading-tight"
            )}
          >
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-gray-500 text-lg">
            Answers to what Fort Myers homeowners ask us most after a water
            damage event.
          </p>
        </div>

        {/* FAQ Accordion — client component */}
        <FAQAccordion items={HOME_FAQS} />

        {/* Still have questions? */}
        <div className="mt-10 text-center">
          <p className="text-gray-500">
            Still have questions?{" "}
            <a
              href={`tel:${BUSINESS.phone}`}
              className="text-[#e94560] font-semibold hover:underline"
            >
              Call us now — {BUSINESS.phoneDisplay}
            </a>
            {" "}and speak with a live technician.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Section 8 — Final CTA / Lead Form
   ============================================================ */
const WHY_CALL_BULLETS = [
  "Live answer 24/7 — no voicemail, no hold music",
  "60-minute on-site response for Fort Myers area",
  "Free assessment — no obligation, no pressure",
  "Works directly with your insurance company",
  "IICRC-certified technicians and commercial equipment",
  "5.0 stars across 7 Google reviews",
];

function FinalCtaSection() {
  return (
    <section
      className="bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="final-cta-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left — Lead Form */}
          <div>
            <h2
              id="final-cta-heading"
              className={cn(
                "font-[family-name:var(--font-raleway)]",
                "text-3xl sm:text-4xl font-extrabold text-[#0f3460] leading-tight mb-6"
              )}
            >
              Ready to Start Your Recovery?
            </h2>
            <p className="text-gray-500 text-lg mb-8">
              Fill out the form and we&apos;ll call you back within 5 minutes —
              even at 3 AM. Fort Myers homeowners deserve immediate answers, not
              voicemail.
            </p>

            {/* Lead Form — client component */}
            <LeadForm heading="Get Free Emergency Assessment" />
          </div>

          {/* Right — Why Call Us + phone */}
          <div className="flex flex-col gap-8 lg:pt-[88px]">
            {/* "Why Call Us?" card */}
            <div className="rounded-2xl bg-[#0f3460] p-7 md:p-8">
              <h3 className="font-[family-name:var(--font-raleway)] text-xl font-bold text-white mb-5">
                Why Call Royal Water Damage?
              </h3>
              <ul className="space-y-3" role="list">
                {WHY_CALL_BULLETS.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-3 text-white/85 text-sm leading-relaxed"
                  >
                    <CheckCircleIcon
                      className="h-4 w-4 text-[#f5a623] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>

            {/* Emergency phone block */}
            <div className="rounded-2xl border-2 border-[#e94560]/30 bg-[#e94560]/5 p-6 text-center">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Active Emergency? Skip the Form.
              </p>
              <a
                href={`tel:${BUSINESS.phone}`}
                className={cn(
                  "inline-flex items-center gap-3 rounded-full",
                  "bg-[#e94560] text-white font-extrabold text-xl",
                  "px-8 py-4 mt-1",
                  "shadow-lg shadow-[#e94560]/20",
                  "hover:bg-[#e94560]/90 active:scale-[0.98]",
                  "transition-all duration-150",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e94560] focus-visible:ring-offset-2"
                )}
                aria-label={`Call Royal Water Damage: ${BUSINESS.phoneDisplay}`}
              >
                <PhoneIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
                {BUSINESS.phoneDisplay}
              </a>
              <p className="mt-3 text-xs text-gray-400">
                Available 24/7 Sunday–Friday · Closed Saturday
              </p>
            </div>
          </div>
        </div>
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

function CheckCircleIcon({ className }: { className?: string }) {
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
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
