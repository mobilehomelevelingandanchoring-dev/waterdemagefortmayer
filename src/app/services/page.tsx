import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/data/services";
import { BUSINESS } from "@/data/business";
import { JsonLd } from "@/components/schema/JsonLd";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { buildLocalBusinessSchema, buildFAQSchema, buildBreadcrumbSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";

/* ============================================================
   Page Metadata
   ============================================================ */
export const metadata: Metadata = {
  title: "Water Damage Restoration Services in Fort Myers, FL | Royal Water Damage",
  description:
    "Royal Water Damage offers 7 certified restoration services in Fort Myers, FL — water damage restoration, mold remediation, fire damage, sewage cleanup, flood cleanup, storm restoration, and emergency water extraction. Available 24/7 except Saturday. Call (864) 734-5702.",
  keywords: [
    "water damage services Fort Myers",
    "restoration services Fort Myers FL",
    "mold remediation Fort Myers",
    "fire damage restoration Fort Myers",
    "sewage cleanup Fort Myers",
    "flood cleanup Fort Myers",
    "emergency water extraction Fort Myers",
    "storm damage restoration Lee County",
  ],
  alternates: {
    canonical: `${BUSINESS.website}/services`,
  },
  openGraph: {
    title: "Water Damage Restoration Services in Fort Myers, FL | Royal Water Damage",
    description:
      "Complete water damage, mold, fire, sewage, flood, and storm restoration services in Fort Myers and Southwest Florida. IICRC certified, 24/7 response.",
    url: `${BUSINESS.website}/services`,
    type: "website",
  },
};

/* ============================================================
   Services Index FAQ
   ============================================================ */
const SERVICES_FAQS = [
  {
    question: "What restoration services does Royal Water Damage offer in Fort Myers?",
    answer:
      "Royal Water Damage provides seven core restoration services throughout Fort Myers and Southwest Florida: water damage restoration, mold remediation, fire and smoke damage restoration, sewage and biohazard cleanup, basement and flood cleanup, storm and hurricane damage restoration, and emergency water extraction. All services are available 24/7 except Saturday.",
  },
  {
    question: "How quickly does Royal Water Damage respond to emergencies?",
    answer:
      "Our target response time for Fort Myers and the immediately surrounding area is 60 minutes or less from the time of your call. For locations throughout Lee County — including Cape Coral, Estero, Bonita Springs, and Lehigh Acres — response typically falls within 45 to 90 minutes depending on location.",
  },
  {
    question: "Are your technicians certified for water and mold restoration?",
    answer:
      "Yes. Our technicians hold IICRC certifications in water damage restoration (WRT) and applied mold remediation (AMRT). We follow the IICRC S500 standard for water damage and the IICRC S520 standard for mold remediation — the same protocols that insurance adjusters and industrial hygienists reference when evaluating completed work.",
  },
  {
    question: "Does Royal Water Damage work directly with insurance companies?",
    answer:
      "Yes — we work directly with all major insurance carriers and provide comprehensive documentation including moisture logs, photo evidence, and detailed scope-of-loss reports. We can coordinate with your adjuster from day one, and we bill insurance directly when your policy covers the loss.",
  },
  {
    question: "Which is the most urgent restoration service — when should I call immediately?",
    answer:
      "Emergency water extraction and sewage cleanup are the most time-critical services. Standing water — especially Category 2 or 3 water from sewage or flooding — causes progressive structural damage and creates mold risk that compounds rapidly in Fort Myers' heat and humidity. If you have standing water in your home right now, call immediately: every hour matters.",
  },
];

/* ============================================================
   Page Component
   ============================================================ */
export default function ServicesIndexPage() {
  const schemas = [
    buildLocalBusinessSchema(),
    buildFAQSchema(SERVICES_FAQS),
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
    ]),
  ];

  return (
    <>
      {/* ── JSON-LD Structured Data ── */}
      <JsonLd schema={schemas} />

      {/* ── 1. Breadcrumb ── */}
      <ServicesPageBreadcrumb />

      {/* ── 2. Hero / Header Section ── */}
      <ServicesHeroSection />

      {/* ── 3. All Services Grid ── */}
      <AllServicesSection />

      {/* ── 4. Comprehensive Approach Copy ── */}
      <ComprehensiveApproachSection />

      {/* ── 5. FAQ Section ── */}
      <ServicesFaqSection />

      {/* ── 6. Final CTA Banner ── */}
      <ServicesFinalCta />
    </>
  );
}

/* ============================================================
   1. Breadcrumb
   ============================================================ */
function ServicesPageBreadcrumb() {
  return (
    <nav aria-label="breadcrumb" className="bg-gray-50 border-b border-gray-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-3">
        <ol
          className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500"
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
          <li aria-current="page" className="font-semibold text-[#0f3460]">
            Services
          </li>
        </ol>
      </div>
    </nav>
  );
}

/* ============================================================
   2. Services Hero Section
   ============================================================ */
function ServicesHeroSection() {
  return (
    <section
      className="relative overflow-hidden bg-[#0f3460]"
      aria-label="Services overview hero"
    >
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#0f3460] via-[#0d2d55] to-[#081d38]"
        aria-hidden="true"
      />
      {/* Decorative glows */}
      <div
        className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-[#e94560]/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 -left-16 h-60 w-60 rounded-full bg-[#f5a623]/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-16 pb-24 sm:pt-20 lg:pt-24 text-center">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#e94560]/40 bg-[#e94560]/15 px-4 py-1.5 text-sm font-semibold text-[#e94560] tracking-wide uppercase">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e94560] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e94560]" />
            </span>
            IICRC Certified · 24/7 Emergency Response
          </span>
        </div>

        {/* H1 */}
        <h1
          className={cn(
            "font-[family-name:var(--font-raleway)]",
            "text-white font-extrabold leading-tight",
            "text-3xl sm:text-4xl lg:text-5xl xl:text-6xl",
            "tracking-tight"
          )}
        >
          Water Damage Restoration Services{" "}
          <span className="text-[#f5a623]">in Fort Myers, FL</span>
        </h1>

        {/* AEO direct-answer block */}
        <p className="mt-6 mx-auto max-w-3xl text-white/85 text-lg sm:text-xl leading-relaxed">
          Royal Water Damage provides certified water damage restoration, mold
          remediation, fire and smoke damage cleanup, sewage removal, flood
          extraction, storm restoration, and emergency water extraction
          throughout Fort Myers and Southwest Florida. Our IICRC-certified crews
          respond 24 hours a day — every day except Saturday — and arrive on
          site in 60 minutes or less across Lee County.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`tel:${BUSINESS.phone}`}
            className={cn(
              "inline-flex items-center gap-3 rounded-full",
              "bg-[#e94560] text-white font-bold text-lg",
              "px-8 py-4 shadow-lg shadow-[#e94560]/30",
              "hover:bg-[#e94560]/90 active:scale-[0.98]",
              "transition-all duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e94560] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f3460]"
            )}
            aria-label={`Call Royal Water Damage — ${BUSINESS.phoneDisplay}`}
          >
            <PhoneIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
            Call {BUSINESS.phoneDisplay}
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
            Get Free Assessment
          </Link>
        </div>

        {/* Trust signals */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-medium text-white/70">
          <TrustSignal icon="⭐" text="5.0 Stars" />
          <TrustDivider />
          <TrustSignal icon="✓" text="IICRC Certified" />
          <TrustDivider />
          <TrustSignal icon="✓" text="Licensed & Insured" />
          <TrustDivider />
          <TrustSignal icon="✓" text="60-Min Response" />
          <TrustDivider />
          <TrustSignal icon="✓" text="Direct Insurance Billing" />
        </div>
      </div>

      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0 leading-none" aria-hidden="true">
        <svg
          viewBox="0 0 1440 60"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="block w-full h-12 sm:h-16"
        >
          <path
            d="M0,40 C360,65 720,10 1080,40 C1260,52 1380,45 1440,42 L1440,60 L0,60 Z"
            fill="white"
            opacity="0.06"
          />
          <path
            d="M0,48 C240,28 480,60 720,48 C960,36 1200,58 1440,48 L1440,60 L0,60 Z"
            style={{ fill: "rgb(249 250 251)" }}
          />
        </svg>
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
  return (
    <span className="hidden sm:block text-white/30" aria-hidden="true">
      ·
    </span>
  );
}

/* ============================================================
   3. All Services Grid
   ============================================================ */
function AllServicesSection() {
  return (
    <section
      className="bg-gray-50 py-16 sm:py-20 lg:py-24"
      aria-labelledby="all-services-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2
            id="all-services-heading"
            className={cn(
              "font-[family-name:var(--font-raleway)]",
              "text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0f3460] leading-tight"
            )}
          >
            Our Complete Restoration Service Menu
          </h2>
          <p className="mt-3 text-gray-500 text-lg max-w-2xl mx-auto">
            From emergency extraction to full rebuild — one call covers
            everything for Fort Myers homeowners and businesses.
          </p>
        </div>

        {/* Services grid — 3 col desktop, 2 tablet, 1 mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.slug}
              slug={service.slug}
              title={service.title}
              tagline={service.tagline}
              icon={service.icon}
              featured={index === 0}
            />
          ))}
        </div>

        {/* Quick-answer blurbs for each service — SEO value */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.slug}
              className="flex gap-4 rounded-2xl bg-white border border-gray-100 p-5 shadow-sm"
            >
              <div
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#0f3460]/10 shrink-0"
                aria-hidden="true"
              >
                <CheckmarkIcon className="h-5 w-5 text-[#0f3460]" />
              </div>
              <div className="min-w-0">
                <Link
                  href={`/services/${service.slug}`}
                  className="font-[family-name:var(--font-raleway)] font-bold text-[#0f3460] hover:text-[#e94560] transition-colors text-base leading-snug"
                >
                  {service.title}
                </Link>
                <p className="mt-1 text-sm text-gray-500 leading-relaxed line-clamp-2">
                  {service.tagline}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   4. Comprehensive Approach Section
   ============================================================ */
const APPROACH_PILLARS = [
  {
    title: "One Call — All Services",
    description:
      "Water damage rarely comes alone. A burst pipe brings water intrusion; water intrusion can lead to mold; storm damage can cause fire hazards. Royal Water Damage handles every phase of recovery under one roof so you don't coordinate between multiple contractors.",
  },
  {
    title: "Certified to Industry Standards",
    description:
      "Every service we offer is performed to the applicable IICRC standard — S500 for water damage, S520 for mold, and the relevant guidelines for fire and sewage losses. These aren't internal standards; they're the same benchmarks your insurance adjuster uses to evaluate the work.",
  },
  {
    title: "Insurance Coordination Built In",
    description:
      "We document every job with moisture logs, photo records, and scope-of-loss reports structured for insurance review. We work directly with your adjuster and bill your carrier whenever your policy covers the loss — reducing your out-of-pocket time and stress.",
  },
  {
    title: "Fort Myers Local Knowledge",
    description:
      "Southwest Florida's climate, hurricane history, and construction patterns create specific restoration challenges that out-of-area companies don't fully understand. Slab-on-grade drying, accelerated mold timelines in summer heat, storm surge recovery — we've handled all of it locally, since 2020.",
  },
] as const;

function ComprehensiveApproachSection() {
  return (
    <section
      className="bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="approach-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left — headline + intro */}
          <div>
            <h2
              id="approach-heading"
              className={cn(
                "font-[family-name:var(--font-raleway)]",
                "text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0f3460] leading-tight mb-5"
              )}
            >
              Royal Water Damage&apos;s Comprehensive Approach to Restoration
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
              Fort Myers homeowners dealing with water damage, mold, or storm
              damage don&apos;t need a patchwork of different contractors — they
              need one certified team that can handle every phase of the job,
              coordinate with their insurance company, and bring the property
              back to pre-loss condition without gaps or delays.
            </p>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Since 2020, Royal Water Damage has served Lee County with exactly
              that capability — full-service restoration, IICRC-certified
              technicians, and a 60-minute emergency response commitment that
              reflects the urgency that Southwest Florida&apos;s climate demands.
            </p>

            <div className="mt-8">
              <a
                href={`tel:${BUSINESS.phone}`}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full",
                  "bg-[#e94560] text-white font-bold text-base",
                  "px-7 py-3.5",
                  "shadow-lg shadow-[#e94560]/20",
                  "hover:bg-[#e94560]/90 active:scale-[0.98]",
                  "transition-all duration-150",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e94560] focus-visible:ring-offset-2"
                )}
                aria-label={`Call Royal Water Damage: ${BUSINESS.phoneDisplay}`}
              >
                <PhoneIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
                Call {BUSINESS.phoneDisplay} — 24/7
              </a>
            </div>
          </div>

          {/* Right — pillars */}
          <div className="flex flex-col gap-5">
            {APPROACH_PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className={cn(
                  "flex gap-4 rounded-2xl bg-gray-50 border border-gray-100 p-5",
                  "hover:shadow-sm transition-shadow duration-200"
                )}
              >
                <div
                  className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#0f3460]/10 shrink-0"
                  aria-hidden="true"
                >
                  <CheckmarkIcon className="h-4.5 w-4.5 text-[#0f3460]" />
                </div>
                <div>
                  <h3
                    className={cn(
                      "font-[family-name:var(--font-raleway)]",
                      "font-bold text-[#0f3460] text-base mb-1"
                    )}
                  >
                    {pillar.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   5. FAQ Section
   ============================================================ */
function ServicesFaqSection() {
  return (
    <section
      className="bg-gray-50 py-16 sm:py-20 lg:py-24"
      aria-labelledby="services-faq-heading"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2
            id="services-faq-heading"
            className={cn(
              "font-[family-name:var(--font-raleway)]",
              "text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0f3460] leading-tight"
            )}
          >
            Frequently Asked Questions About Our Services
          </h2>
          <p className="mt-3 text-gray-500 text-lg">
            What Fort Myers homeowners commonly want to know before calling a
            restoration company.
          </p>
        </div>

        <FAQAccordion items={SERVICES_FAQS} />

        <div className="mt-10 text-center">
          <p className="text-gray-500">
            Have a specific question?{" "}
            <a
              href={`tel:${BUSINESS.phone}`}
              className="text-[#e94560] font-semibold hover:underline"
            >
              Call {BUSINESS.phoneDisplay}
            </a>{" "}
            and speak with a live technician any hour except Saturday.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   6. Final CTA
   ============================================================ */
function ServicesFinalCta() {
  return (
    <section
      className="relative overflow-hidden py-16 sm:py-20"
      aria-labelledby="services-cta-heading"
      style={{
        background:
          "linear-gradient(135deg, #e94560 0%, #c0303f 40%, #0f3460 100%)",
      }}
    >
      <div
        className="absolute -top-20 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-white/5 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2
          id="services-cta-heading"
          className={cn(
            "font-[family-name:var(--font-raleway)]",
            "text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight"
          )}
        >
          Need a Restoration Service Now?{" "}
          <span className="text-[#f5a623]">We Answer 24/7.</span>
        </h2>

        <p className="mt-5 text-white/85 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          Call now or request a free assessment online. Our IICRC-certified crew
          responds across Fort Myers and Southwest Florida — 24 hours a day,
          every day except Saturday.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`tel:${BUSINESS.phone}`}
            className={cn(
              "inline-flex items-center gap-3 rounded-full",
              "bg-white text-[#e94560] font-extrabold text-xl",
              "px-10 py-5 shadow-xl shadow-black/20",
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
            Get Free Assessment
          </Link>
        </div>

        <p className="mt-5 text-white/60 text-sm">
          Or use our online form — we&apos;ll call you back within 5 minutes.
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

function CheckmarkIcon({ className }: { className?: string }) {
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
