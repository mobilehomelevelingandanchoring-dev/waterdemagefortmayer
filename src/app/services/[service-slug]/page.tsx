import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICES, getServiceBySlug } from "@/data/services";
import { LOCATIONS } from "@/data/locations";
import { BUSINESS } from "@/data/business";
import { JsonLd } from "@/components/schema/JsonLd";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { TrustBar } from "@/components/ui/TrustBar";
import {
  buildServiceSchema,
  buildFAQSchema,
  buildBreadcrumbSchema,
} from "@/lib/schema";
import { cn } from "@/lib/utils";

/* ============================================================
   Static params — pre-generate all 7 service pages
   ============================================================ */
export async function generateStaticParams() {
  return SERVICES.map((s) => ({ "service-slug": s.slug }));
}

/* ============================================================
   Per-page Metadata
   ============================================================ */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ "service-slug": string }>;
}): Promise<Metadata> {
  const { "service-slug": slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: {
      canonical: `${BUSINESS.website}/services/${slug}`,
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `${BUSINESS.website}/services/${slug}`,
      type: "website",
    },
  };
}

/* ============================================================
   Page Component
   ============================================================ */
export default async function ServicePage({
  params,
}: {
  params: Promise<{ "service-slug": string }>;
}) {
  const { "service-slug": slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  // Related services — exclude the current one, take first 3
  const relatedServices = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

  // All 6 locations for the service-area grid
  const displayLocations = LOCATIONS.slice(0, 6);

  const schemas = [
    buildServiceSchema(service),
    buildFAQSchema(service.faqs),
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
      { name: service.title, url: `/services/${service.slug}` },
    ]),
  ];

  return (
    <>
      {/* ── JSON-LD Structured Data ── */}
      <JsonLd schema={schemas} />

      {/* ── 1. Breadcrumb ── */}
      <BreadcrumbNav serviceTitle={service.title} serviceSlug={service.slug} />

      {/* ── 2. Hero Section ── */}
      <HeroSection
        headline={service.headline}
        heroDescription={service.heroDescription}
      />

      {/* ── 3. Service Description Section ── */}
      <ServiceDescriptionSection
        serviceTitle={service.title}
        description={service.description}
        features={service.features}
      />

      {/* ── 4. Our Process Section ── */}
      <ProcessSection
        serviceTitle={service.title}
        process={service.process}
      />

      {/* ── 5. Service Areas ── */}
      <ServiceAreasSection
        serviceTitle={service.title}
        serviceSlug={service.slug}
        locations={displayLocations}
      />

      {/* ── 6. FAQ Section ── */}
      <FaqSection serviceTitle={service.title} faqs={service.faqs} />

      {/* ── 7. Related Services ── */}
      <RelatedServicesSection services={relatedServices} />

      {/* ── 8. Final CTA ── */}
      <FinalCtaSection serviceTitle={service.title} />
    </>
  );
}

/* ============================================================
   1. Breadcrumb Nav
   ============================================================ */
function BreadcrumbNav({
  serviceTitle,
  serviceSlug,
}: {
  serviceTitle: string;
  serviceSlug: string;
}) {
  return (
    <nav
      aria-label="breadcrumb"
      className="bg-gray-50 border-b border-gray-100"
    >
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
          <li>
            <Link
              href="/services"
              className="hover:text-[#0f3460] transition-colors font-medium"
            >
              Services
            </Link>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li aria-current="page" className="font-semibold text-[#0f3460] truncate max-w-[200px] sm:max-w-none">
            {serviceTitle}
          </li>
        </ol>
      </div>
    </nav>
  );
}

/* ============================================================
   2. Hero Section
   ============================================================ */
function HeroSection({
  headline,
  heroDescription,
}: {
  headline: string;
  heroDescription: string;
}) {
  return (
    <section
      className="relative overflow-hidden bg-[#0f3460]"
      aria-label={`${headline} — hero`}
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

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-16 pb-24 sm:pt-20 lg:pt-24">
        {/* Emergency badge */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#e94560]/40 bg-[#e94560]/15 px-4 py-1.5 text-sm font-semibold text-[#e94560] tracking-wide uppercase">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e94560] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e94560]" />
            </span>
            24/7 Emergency Response
          </span>
        </div>

        {/* H1 */}
        <h1
          className={cn(
            "font-[family-name:var(--font-raleway)]",
            "text-center text-white font-extrabold leading-tight",
            "text-3xl sm:text-4xl lg:text-5xl xl:text-6xl",
            "tracking-tight"
          )}
        >
          {headline}
        </h1>

        {/* AEO direct-answer block */}
        <p className="mt-6 mx-auto max-w-3xl text-center text-white/85 text-lg sm:text-xl leading-relaxed">
          {heroDescription}
        </p>

        {/* CTA buttons */}
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
            aria-label={`Call Royal Water Damage now — ${BUSINESS.phoneDisplay}`}
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

        {/* Trust bar — compact variant inline */}
        <div className="mt-10">
          <TrustBar compact className="text-white/80" />
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

/* ============================================================
   3. Service Description Section
   ============================================================ */
function ServiceDescriptionSection({
  serviceTitle,
  description,
  features,
}: {
  serviceTitle: string;
  description: string;
  features: readonly string[];
}) {
  return (
    <section
      className="bg-gray-50 py-16 sm:py-20 lg:py-24"
      aria-labelledby="service-description-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left — description */}
          <div>
            <h2
              id="service-description-heading"
              className={cn(
                "font-[family-name:var(--font-raleway)]",
                "text-2xl sm:text-3xl font-extrabold text-[#0f3460] leading-tight mb-5"
              )}
            >
              About Our {serviceTitle} Service in Fort Myers
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              {description}
            </p>

            {/* Inline CTA */}
            <div className="mt-8">
              <a
                href={`tel:${BUSINESS.phone}`}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full",
                  "bg-[#0f3460] text-white font-bold text-base",
                  "px-7 py-3.5",
                  "hover:bg-[#0f3460]/90 active:scale-[0.98]",
                  "transition-all duration-150",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f3460] focus-visible:ring-offset-2"
                )}
                aria-label={`Need ${serviceTitle}? Call now: ${BUSINESS.phoneDisplay}`}
              >
                <PhoneIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
                Need {serviceTitle}? Call Now: {BUSINESS.phoneDisplay}
              </a>
            </div>
          </div>

          {/* Right — feature checklist */}
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6 md:p-8">
            <h3
              className={cn(
                "font-[family-name:var(--font-raleway)]",
                "text-lg font-bold text-[#0f3460] mb-5"
              )}
            >
              What&apos;s Included
            </h3>
            <ul className="space-y-3.5" role="list">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-gray-700 text-sm sm:text-base leading-relaxed"
                >
                  <GreenCheckIcon
                    className="h-5 w-5 shrink-0 mt-0.5 text-emerald-500"
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   4. Our Process Section
   ============================================================ */
function ProcessSection({
  serviceTitle,
  process,
}: {
  serviceTitle: string;
  process: readonly { step: number; title: string; description: string }[];
}) {
  return (
    <section
      className="bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="process-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2
            id="process-heading"
            className={cn(
              "font-[family-name:var(--font-raleway)]",
              "text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0f3460] leading-tight"
            )}
          >
            Our {serviceTitle} Process
          </h2>
          <p className="mt-3 text-gray-500 text-lg max-w-2xl mx-auto">
            A systematic, certified approach — from the first call to final
            inspection.
          </p>
        </div>

        {/* 4-step grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {process.map((step) => (
            <div
              key={step.step}
              className={cn(
                "relative flex flex-col gap-4",
                "rounded-2xl bg-gray-50 border border-gray-100",
                "p-6 hover:shadow-md hover:-translate-y-0.5",
                "transition-all duration-200"
              )}
            >
              {/* Step number circle */}
              <div
                className={cn(
                  "flex items-center justify-center",
                  "w-11 h-11 rounded-full shrink-0",
                  "bg-[#0f3460] text-white",
                  "font-[family-name:var(--font-raleway)] font-extrabold text-lg"
                )}
                aria-label={`Step ${step.step}`}
              >
                {step.step}
              </div>

              <h3
                className={cn(
                  "font-[family-name:var(--font-raleway)]",
                  "text-base font-bold text-[#0f3460] leading-snug"
                )}
              >
                {step.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed flex-1">
                {step.description}
              </p>

              {/* Connector line between steps (hidden on last) */}
              {step.step < process.length && (
                <span
                  className="hidden lg:block absolute top-[2.75rem] left-full w-8 h-px bg-gray-200 -translate-y-px"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   5. Service Areas Section
   ============================================================ */
function ServiceAreasSection({
  serviceTitle,
  serviceSlug,
  locations,
}: {
  serviceTitle: string;
  serviceSlug: string;
  locations: typeof LOCATIONS;
}) {
  return (
    <section
      className="bg-gray-50 py-16 sm:py-20 lg:py-24"
      aria-labelledby="service-areas-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2
            id="service-areas-heading"
            className={cn(
              "font-[family-name:var(--font-raleway)]",
              "text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0f3460] leading-tight"
            )}
          >
            We Provide {serviceTitle} Across Southwest Florida
          </h2>
          <p className="mt-3 text-gray-500 text-lg max-w-2xl mx-auto">
            From Fort Myers to Naples — our certified crew responds fast across
            Lee and Collier counties.
          </p>
        </div>

        {/* 6-city grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {locations.map((location) => (
            <Link
              key={location.slug}
              href={`/services/${serviceSlug}/${location.slug}`}
              className={cn(
                "group flex flex-col gap-1.5",
                "rounded-2xl bg-white border border-gray-100",
                "p-5 hover:border-[#0f3460]/30 hover:shadow-md hover:-translate-y-0.5",
                "transition-all duration-200"
              )}
            >
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    "font-[family-name:var(--font-raleway)]",
                    "font-bold text-[#0f3460] text-base group-hover:text-[#e94560]",
                    "transition-colors duration-150"
                  )}
                >
                  {location.city}, FL
                </span>
                <span className="text-xs font-medium text-gray-400 bg-gray-50 rounded-full px-2.5 py-1">
                  {location.county} County
                </span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                {serviceTitle} in {location.city}
              </p>
              <span className="mt-1 inline-flex items-center text-xs font-semibold text-[#0f3460] group-hover:text-[#e94560] transition-colors">
                View service area
                <span
                  className="ml-1 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>

        {/* Phone fallback */}
        <div className="mt-10 text-center">
          <p className="text-gray-500 text-sm">
            Don&apos;t see your city?{" "}
            <a
              href={`tel:${BUSINESS.phone}`}
              className="text-[#e94560] font-semibold hover:underline"
            >
              Call {BUSINESS.phoneDisplay}
            </a>{" "}
            — we likely cover your area throughout Southwest Florida.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   6. FAQ Section
   ============================================================ */
function FaqSection({
  serviceTitle,
  faqs,
}: {
  serviceTitle: string;
  faqs: readonly { question: string; answer: string }[];
}) {
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
              "text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0f3460] leading-tight"
            )}
          >
            Frequently Asked Questions About {serviceTitle} in Fort Myers
          </h2>
          <p className="mt-3 text-gray-500 text-lg">
            Answers to what homeowners ask us most about {serviceTitle.toLowerCase()} in Southwest Florida.
          </p>
        </div>

        {/* FAQ Accordion — client component */}
        <FAQAccordion items={faqs as { question: string; answer: string }[]} />

        <div className="mt-10 text-center">
          <p className="text-gray-500">
            Still have questions?{" "}
            <a
              href={`tel:${BUSINESS.phone}`}
              className="text-[#e94560] font-semibold hover:underline"
            >
              Call {BUSINESS.phoneDisplay}
            </a>{" "}
            and speak with a live technician — any hour, any day except Saturday.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   7. Related Services Section
   ============================================================ */
function RelatedServicesSection({
  services,
}: {
  services: typeof SERVICES;
}) {
  return (
    <section
      className="bg-gray-50 py-16 sm:py-20 lg:py-24"
      aria-labelledby="related-services-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2
            id="related-services-heading"
            className={cn(
              "font-[family-name:var(--font-raleway)]",
              "text-2xl sm:text-3xl font-extrabold text-[#0f3460] leading-tight"
            )}
          >
            Related Services
          </h2>
          <p className="mt-3 text-gray-500 text-base max-w-xl mx-auto">
            Royal Water Damage offers a full range of restoration services across
            Fort Myers and Southwest Florida.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.slug}
              slug={service.slug}
              title={service.title}
              tagline={service.tagline}
              icon={service.icon}
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/services"
            className={cn(
              "inline-flex items-center gap-2 rounded-full",
              "border-2 border-[#0f3460] text-[#0f3460] font-bold text-base",
              "px-7 py-3",
              "hover:bg-[#0f3460] hover:text-white",
              "transition-all duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f3460] focus-visible:ring-offset-2"
            )}
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   8. Final CTA Banner
   ============================================================ */
function FinalCtaSection({ serviceTitle }: { serviceTitle: string }) {
  return (
    <section
      className="relative overflow-hidden py-16 sm:py-20"
      aria-labelledby="final-cta-heading"
      style={{
        background:
          "linear-gradient(135deg, #e94560 0%, #c0303f 40%, #0f3460 100%)",
      }}
    >
      {/* Decorative glow */}
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
          Ready to Get Started?{" "}
          <span className="text-[#f5a623]">We&apos;re Standing By.</span>
        </h2>

        <p className="mt-5 text-white/85 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          Call now or request a free {serviceTitle.toLowerCase()} assessment
          online. Our certified crew responds across Fort Myers and Southwest
          Florida — 24 hours a day, every day except Saturday.
        </p>

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

function GreenCheckIcon({ className }: { className?: string }) {
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
