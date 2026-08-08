import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BUSINESS } from "@/data/business";
import { LOCATIONS, getLocationBySlug } from "@/data/locations";
import { SERVICES } from "@/data/services";
import { JsonLd } from "@/components/schema/JsonLd";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import {
  buildLocalBusinessSchema,
  buildFAQSchema,
  buildBreadcrumbSchema,
} from "@/lib/schema";
import { cn } from "@/lib/utils";

/* ============================================================
   Next.js 15 — generateStaticParams
   ============================================================ */
export async function generateStaticParams() {
  return LOCATIONS.map((l) => ({ "city-slug": l.slug }));
}

/* ============================================================
   Next.js 15 — async params
   ============================================================ */
type PageProps = {
  params: Promise<{ "city-slug": string }>;
};

/* ============================================================
   generateMetadata
   ============================================================ */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { "city-slug": slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    return { title: "Location Not Found" };
  }

  return {
    title: location.metaTitle,
    description: location.metaDescription,
    alternates: {
      canonical: `${BUSINESS.website}/locations/${slug}`,
    },
    openGraph: {
      title: location.metaTitle,
      description: location.metaDescription,
      url: `${BUSINESS.website}/locations/${slug}`,
      type: "website",
    },
  };
}

/* ============================================================
   Page Component
   ============================================================ */
export default async function LocationPage({ params }: PageProps) {
  const { "city-slug": slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    notFound();
  }

  const otherLocations = LOCATIONS.filter((l) => l.slug !== slug);

  const localBusinessSchema = buildLocalBusinessSchema();
  const faqSchema = buildFAQSchema(location.faqs);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Locations", url: "/locations" },
    { name: `${location.city}, FL`, url: `/locations/${slug}` },
  ]);

  return (
    <>
      {/* ── JSON-LD Structured Data ── */}
      <JsonLd schema={[localBusinessSchema, faqSchema, breadcrumbSchema]} />

      {/* ── 1. Breadcrumb ── */}
      <BreadcrumbNav city={location.city} slug={slug} />

      {/* ── 2. Hero Section ── */}
      <HeroSection
        headline={location.headline}
        heroDescription={location.heroDescription}
        city={location.city}
        responseTime={location.responseTime}
      />

      {/* ── 3. About This Service Area ── */}
      <AboutSection location={location} />

      {/* ── 4. Services in [City] ── */}
      <ServicesSection city={location.city} citySlug={slug} />

      {/* ── 5. Google Map Embed ── */}
      <MapSection city={location.city} mapEmbed={location.mapEmbed} />

      {/* ── 6. FAQ Section ── */}
      <FaqSection city={location.city} faqs={location.faqs} />

      {/* ── 7. Internal Linking ── */}
      <NearbyAreasSection otherLocations={otherLocations} />

      {/* ── 8. Final CTA ── */}
      <FinalCtaSection city={location.city} responseTime={location.responseTime} />
    </>
  );
}

/* ============================================================
   Section 1 — Breadcrumb
   ============================================================ */
function BreadcrumbNav({ city, slug }: { city: string; slug: string }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="bg-gray-50 border-b border-gray-200"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-3">
        <ol
          className="flex items-center gap-2 text-sm text-gray-500 flex-wrap"
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
              href="/locations"
              className="hover:text-[#0f3460] transition-colors font-medium"
            >
              Locations
            </Link>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li
            className="text-[#0f3460] font-semibold"
            aria-current="page"
          >
            {city}, FL
          </li>
        </ol>
      </div>
    </nav>
  );
}

/* ============================================================
   Section 2 — Hero
   ============================================================ */
function HeroSection({
  headline,
  heroDescription,
  city,
  responseTime,
}: {
  headline: string;
  heroDescription: string;
  city: string;
  responseTime: string;
}) {
  return (
    <section
      className="relative overflow-hidden bg-[#0f3460]"
      aria-label={`Hero — Water Damage Restoration in ${city}, FL`}
    >
      {/* Navy gradient overlay */}
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

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-20 pb-32 sm:px-6 lg:px-8 sm:pt-24 lg:pt-28">
        {/* Emergency badge */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#e94560]/40 bg-[#e94560]/15 px-4 py-1.5 text-sm font-semibold text-[#e94560] tracking-wide uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e94560] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e94560]" />
            </span>
            24/7 Emergency Response — {responseTime} to {city}
          </span>
        </div>

        {/* H1 */}
        <h1
          className={cn(
            "font-[family-name:var(--font-raleway)]",
            "text-center text-white font-extrabold leading-tight",
            "text-3xl sm:text-5xl lg:text-6xl",
            "tracking-tight"
          )}
        >
          {headline}
        </h1>

        {/* AEO direct-answer block */}
        <p className="mt-6 mx-auto max-w-4xl text-center text-white/85 text-lg sm:text-xl leading-relaxed">
          {heroDescription}
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
            aria-label={`Call Royal Water Damage now — ${BUSINESS.phoneDisplay}`}
          >
            <PhoneIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
            {BUSINESS.phoneDisplay} — Call Now
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
            Free Assessment
          </Link>
        </div>

        {/* Trust bar */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-medium text-white/70">
          <TrustSignal icon="⭐" text="5.0 Stars on Google" />
          <TrustDivider />
          <TrustSignal icon="✓" text="IICRC Certified" />
          <TrustDivider />
          <TrustSignal icon="✓" text="Licensed & Insured" />
          <TrustDivider />
          <TrustSignal icon="✓" text={`${responseTime} to ${city}`} />
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
    <span
      className="hidden sm:block text-white/30"
      aria-hidden="true"
    >
      ·
    </span>
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
   Section 3 — About This Service Area
   ============================================================ */
import type { Location } from "@/data/locations";

function AboutSection({ location }: { location: Location }) {
  const countyLabel =
    location.county === "Collier" ? "Collier County" : "Lee County";

  return (
    <section
      className="bg-gray-50 py-16 sm:py-20 lg:py-24"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* H2 */}
        <h2
          id="about-heading"
          className={cn(
            "font-[family-name:var(--font-raleway)]",
            "text-3xl sm:text-4xl font-extrabold text-[#0f3460] leading-tight mb-6"
          )}
        >
          Water Damage Restoration in {location.city}, FL
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-lg leading-relaxed max-w-4xl mb-10">
          {location.description}
        </p>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left — Key local facts */}
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-7">
            <h3
              className={cn(
                "font-[family-name:var(--font-raleway)]",
                "text-xl font-bold text-[#0f3460] mb-5"
              )}
            >
              Key Local Facts
            </h3>
            <dl className="space-y-4">
              <FactRow
                label="Response Time"
                value={location.responseTime}
                highlight
              />
              <FactRow
                label="Distance from HQ"
                value={location.distanceFromHQ}
              />
              <FactRow label="County" value={countyLabel} />
              <FactRow
                label="ZIP Codes Served"
                value={location.zipCodes.join(", ")}
              />
            </dl>
          </div>

          {/* Right — Neighborhoods & Landmarks */}
          <div className="flex flex-col gap-7">
            {/* Neighborhoods */}
            <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-7">
              <h3
                className={cn(
                  "font-[family-name:var(--font-raleway)]",
                  "text-xl font-bold text-[#0f3460] mb-4"
                )}
              >
                Neighborhoods We Serve
              </h3>
              <ul
                className="grid grid-cols-2 gap-2"
                role="list"
              >
                {location.neighborhoods.map((neighborhood) => (
                  <li
                    key={neighborhood}
                    className="flex items-center gap-2 text-gray-600 text-sm"
                  >
                    <CheckSmallIcon
                      className="h-4 w-4 text-[#e94560] shrink-0"
                      aria-hidden="true"
                    />
                    {neighborhood}
                  </li>
                ))}
              </ul>
            </div>

            {/* Landmarks */}
            <div className="rounded-2xl bg-[#0f3460]/5 border border-[#0f3460]/10 p-6">
              <h3 className="font-semibold text-[#0f3460] mb-2 text-base">
                Local Landmarks
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We serve all neighborhoods near{" "}
                {location.landmarks.join(", ")} — and everywhere in between.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FactRow({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex justify-between items-start gap-4 py-2 border-b border-gray-100 last:border-0">
      <dt className="text-gray-500 text-sm font-medium shrink-0">{label}</dt>
      <dd
        className={cn(
          "text-sm font-semibold text-right",
          highlight ? "text-[#e94560]" : "text-[#0f3460]"
        )}
      >
        {value}
      </dd>
    </div>
  );
}

function CheckSmallIcon({ className }: { className?: string }) {
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

/* ============================================================
   Section 4 — Services in [City]
   ============================================================ */
function ServicesSection({
  city,
  citySlug,
}: {
  city: string;
  citySlug: string;
}) {
  return (
    <section
      className="bg-white py-16 sm:py-20 lg:py-24"
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
            Our Services in {city}, FL
          </h2>
          <p className="mt-3 text-gray-500 text-lg max-w-3xl mx-auto">
            Royal Water Damage provides all restoration services to {city}{" "}
            residents and businesses. From emergency water extraction to full
            mold remediation — one call covers everything.
          </p>
        </div>

        {/* Service cards grid — links to /services/[slug]/[city-slug] */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
          {SERVICES.map((service, index) => (
            <LocationServiceCard
              key={service.slug}
              slug={service.slug}
              citySlug={citySlug}
              title={service.title}
              tagline={service.tagline}
              icon={service.icon}
              featured={index === 0}
            />
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-10 text-center">
          <p className="text-gray-500 text-sm">
            Not sure what you need?{" "}
            <a
              href={`tel:${BUSINESS.phone}`}
              className="text-[#e94560] font-semibold hover:underline"
            >
              Call us — we&apos;ll assess your situation over the phone.
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

/* Service card variant that links to /services/[slug]/[city-slug] */
import {
  Droplets,
  Wind,
  Flame,
  AlertTriangle,
  Waves,
  CloudLightning,
  Zap,
} from "lucide-react";

const SERVICE_ICON_MAP: Record<string, React.ElementType> = {
  Droplets,
  Wind,
  Flame,
  AlertTriangle,
  Waves,
  CloudLightning,
  Zap,
};

function LocationServiceCard({
  slug,
  citySlug,
  title,
  tagline,
  icon,
  featured = false,
}: {
  slug: string;
  citySlug: string;
  title: string;
  tagline: string;
  icon: string;
  featured?: boolean;
}) {
  const Icon = SERVICE_ICON_MAP[icon] ?? Droplets;

  return (
    <Link
      href={`/services/${slug}/${citySlug}`}
      className={cn(
        "group relative flex flex-col bg-white rounded-2xl overflow-hidden",
        "border border-gray-100",
        "shadow-sm hover:shadow-lg",
        "transition-all duration-300 ease-out hover:-translate-y-1",
        featured && "ring-2 ring-[#0f3460]/20"
      )}
      aria-label={`${title} in ${citySlug.replace(/-/g, " ")}`}
    >
      {/* Top accent bar */}
      <span
        className={cn(
          "absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-[#0f3460]",
          "transition-all duration-300 group-hover:h-1.5"
        )}
        aria-hidden="true"
      />

      {featured && (
        <span className="absolute top-4 right-4 bg-[#f5a623] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
          Popular
        </span>
      )}

      <div className="flex flex-col flex-1 p-6 pt-7">
        {/* Icon */}
        <div
          className={cn(
            "flex items-center justify-center w-12 h-12 rounded-xl mb-4",
            "bg-[#0f3460]/10 transition-colors duration-200 group-hover:bg-[#0f3460]/15"
          )}
          aria-hidden="true"
        >
          <Icon
            className="w-6 h-6 text-[#0f3460] transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        <h3 className="text-[#0f3460] font-bold text-lg leading-snug mb-2">
          {title}
        </h3>

        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1">
          {tagline}
        </p>

        <div className="mt-5 flex items-center text-[#0f3460] font-semibold text-sm">
          <span className="transition-colors duration-150 group-hover:text-[#e94560]">
            Learn More
          </span>
          <span
            className="ml-1.5 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          >
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ============================================================
   Section 5 — Google Map Embed
   ============================================================ */
function MapSection({
  city,
  mapEmbed,
}: {
  city: string;
  mapEmbed: string;
}) {
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
            Serving {city} and Surrounding Areas
          </h2>
          <p className="mt-3 text-gray-500 text-lg max-w-2xl mx-auto">
            Royal Water Damage dispatches from Fort Myers to reach {city} and
            all surrounding communities rapidly.
          </p>
        </div>

        {/* Map embed */}
        <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100 aspect-video max-h-[480px]">
          <iframe
            src={mapEmbed}
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: "320px" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Royal Water Damage — serving ${city}, FL on Google Maps`}
            className="w-full h-full"
          />
        </div>

        {/* Note */}
        <p className="mt-4 text-center text-xs text-gray-400 italic">
          {/* [NEEDS CLIENT INPUT — city-specific map embed for {city}] */}
          Map showing Royal Water Damage service coverage for {city}, FL and
          surrounding communities.
        </p>
      </div>
    </section>
  );
}

/* ============================================================
   Section 6 — FAQ
   ============================================================ */
function FaqSection({
  city,
  faqs,
}: {
  city: string;
  faqs: { question: string; answer: string }[];
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
              "text-3xl sm:text-4xl font-extrabold text-[#0f3460] leading-tight"
            )}
          >
            Water Damage FAQs for {city} Residents
          </h2>
          <p className="mt-3 text-gray-500 text-lg">
            Answers to the questions {city} homeowners ask us most often.
          </p>
        </div>

        {/* FAQ Accordion — client component */}
        <FAQAccordion items={faqs} />

        <div className="mt-10 text-center">
          <p className="text-gray-500">
            Have a question not answered here?{" "}
            <a
              href={`tel:${BUSINESS.phone}`}
              className="text-[#e94560] font-semibold hover:underline"
            >
              Call {BUSINESS.phoneDisplay}
            </a>{" "}
            and speak with a live technician.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Section 7 — Nearby Areas Internal Linking
   ============================================================ */
function NearbyAreasSection({
  otherLocations,
}: {
  otherLocations: Location[];
}) {
  return (
    <section
      className="bg-gray-50 py-16 sm:py-20"
      aria-labelledby="nearby-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2
            id="nearby-heading"
            className={cn(
              "font-[family-name:var(--font-raleway)]",
              "text-2xl sm:text-3xl font-extrabold text-[#0f3460] leading-tight"
            )}
          >
            Also Serving These Nearby Areas
          </h2>
          <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
            Royal Water Damage covers all of Southwest Florida. View our service
            page for your city.
          </p>
        </div>

        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          role="list"
        >
          {otherLocations.map((loc) => (
            <li key={loc.slug}>
              <Link
                href={`/locations/${loc.slug}`}
                className={cn(
                  "flex items-center justify-between",
                  "rounded-xl border border-gray-100 bg-white px-5 py-4",
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
                    <span className="font-semibold text-[#0f3460] group-hover:text-[#e94560] transition-colors block leading-tight">
                      {loc.city}, FL
                    </span>
                    <span className="text-xs text-gray-400">
                      {loc.county} County &middot; {loc.responseTime}
                    </span>
                  </span>
                </span>
                <ArrowRightIcon
                  className="h-4 w-4 text-gray-300 group-hover:text-[#e94560] transition-colors shrink-0"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ============================================================
   Section 8 — Final CTA
   ============================================================ */
function FinalCtaSection({
  city,
  responseTime,
}: {
  city: string;
  responseTime: string;
}) {
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
          Dealing with water damage in {city}?{" "}
          <span className="text-[#f5a623]">Call us now.</span>
        </h2>

        <p className="mt-5 text-white/85 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          We respond to {city} calls within{" "}
          <strong className="text-white">{responseTime}</strong>. Every minute
          water sits, damage compounds — and in Southwest Florida&apos;s heat,
          mold can begin within 24 hours. Don&apos;t wait.
        </p>

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
            Request Free Assessment
          </Link>
        </div>

        <p className="mt-5 text-white/60 text-sm">
          Available 24/7 Sunday–Friday &middot; Closed Saturday &middot; Live
          answer, no voicemail
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
