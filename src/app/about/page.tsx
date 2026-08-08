import type { Metadata } from "next";
import { JsonLd } from "@/components/schema/JsonLd";
import { buildLocalBusinessSchema, buildBreadcrumbSchema } from "@/lib/schema";
import { BUSINESS } from "@/data/business";
import { cn } from "@/lib/utils";
import { Phone, MapPin, Clock, Star } from "lucide-react";

/* ============================================================
   Metadata
   ============================================================ */

export const metadata: Metadata = {
  title: "About Royal Water Damage | Fort Myers Water Damage Experts",
  description:
    "Learn about Royal Water Damage — Fort Myers' 24/7 emergency restoration company. Serving Lee and Collier counties with water damage, mold, fire, and storm recovery services.",
  alternates: {
    canonical: "https://royalwaterdamagefortmyers.com/about",
  },
  openGraph: {
    title: "About Royal Water Damage | Fort Myers Water Damage Experts",
    description:
      "Royal Water Damage is Fort Myers' trusted emergency restoration company. 5.0 stars, 24/7 availability Sunday–Friday, serving all of Southwest Florida.",
    url: "https://royalwaterdamagefortmyers.com/about",
  },
};

/* ============================================================
   Data
   ============================================================ */

const COMPANY_FACTS = [
  { term: "Business Name", detail: "Royal Water Damage" },
  { term: "Location", detail: "Fort Myers, FL (Lee County)" },
  {
    term: "Service Area",
    detail:
      "Fort Myers, Cape Coral, Estero, Bonita Springs, Lehigh Acres, Naples",
  },
  {
    term: "Hours",
    detail: "Open 24 hours daily, Sunday–Friday. Closed Saturdays.",
  },
  { term: "Phone", detail: BUSINESS.phoneDisplay },
  {
    term: "Rating",
    detail: `${BUSINESS.rating.value} stars (${BUSINESS.rating.count} Google reviews)`,
  },
  {
    term: "Services",
    detail:
      "Water Damage Restoration, Mold Remediation, Fire Damage Restoration, Sewage Cleanup, Basement & Flood Cleanup, Storm & Hurricane Damage Restoration, Emergency Water Extraction",
  },
  {
    term: "License",
    detail: BUSINESS.license /* [NEEDS CLIENT INPUT — License #] */,
  },
  {
    term: "Insurance",
    detail: BUSINESS.insurance /* [NEEDS CLIENT INPUT — Insurance #] */,
  },
  {
    term: "Year Founded",
    detail: String(BUSINESS.yearFounded) /* [NEEDS CLIENT INPUT — verify] */,
  },
] as const;

const VALUES = [
  {
    title: "Urgency",
    icon: "⚡",
    description:
      "We keep response-ready crews available every day because water damage does not wait for business hours. In Fort Myers' climate, the difference between a manageable repair and a months-long mold remediation project is measured in hours — and we treat every call that way.",
  },
  {
    title: "Transparency",
    icon: "🔍",
    description:
      "We provide written estimates before work begins, explain every step of the process, and communicate directly with your insurance adjuster so there are no billing surprises. You will always know what we're doing and why.",
  },
  {
    title: "Craftsmanship",
    icon: "🏆",
    description:
      "Our technicians follow IICRC industry standards — not the minimum required, but the full protocol. Every job is documented, every moisture reading is logged, and we don't call a job complete until your home meets the standards we'd want for our own families.",
  },
] as const;

/* ============================================================
   Page Component
   ============================================================ */

export default function AboutPage() {
  return (
    <>
      {/* JSON-LD */}
      <JsonLd
        schema={[
          buildLocalBusinessSchema(),
          buildBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "About", url: "/about" },
          ]),
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        aria-label="About page hero"
        className={cn(
          "relative overflow-hidden",
          "bg-gradient-to-br from-[#0f3460] via-[#0f3460]/95 to-[#0f3460]/80",
          "py-20 md:py-28"
        )}
      >
        {/* decorative rings */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full border border-white/10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full border border-white/10"
        />

        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#f5a623]">
            Fort Myers, FL
          </p>

          <h1 className="font-display text-3xl font-extrabold leading-tight text-white md:text-5xl">
            About Royal Water Damage —{" "}
            <span className="text-[#f5a623]">
              Fort Myers&rsquo; Emergency Restoration Experts
            </span>
          </h1>

          {/* AEO block — plain prose for LLM/AI extraction */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
            Royal Water Damage is a Fort Myers-based water damage restoration
            company serving Southwest Florida 24 hours a day, 7 days a week
            (closed Saturdays). We specialize in water damage, mold
            remediation, fire damage, and storm recovery across Lee and Collier
            counties.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={`tel:${BUSINESS.phone}`}
              className={cn(
                "inline-flex items-center gap-2 rounded-full",
                "bg-[#e94560] px-7 py-3 text-white font-bold text-base",
                "hover:bg-[#e94560]/90 transition-colors"
              )}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {BUSINESS.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* ── Our Story ────────────────────────────────────── */}
      <section
        aria-labelledby="our-story-heading"
        className="mx-auto max-w-3xl px-4 py-16 md:py-24"
      >
        <h2
          id="our-story-heading"
          className="font-display text-2xl font-extrabold text-[#0f3460] md:text-3xl"
        >
          Built for Fort Myers —{" "}
          <span className="text-[#e94560]">
            By People Who Know What&rsquo;s at Stake
          </span>
        </h2>

        {/* [NEEDS CLIENT INPUT — Actual founder story and year founded] */}
        <div className="mt-6 space-y-5 text-gray-600 leading-relaxed">
          <p>
            Southwest Florida is one of the most weather-vulnerable regions in
            the United States. Between June and November, tropical systems
            threaten Lee County with storm surge, sustained winds, and rainfall
            measured in feet rather than inches. In the days and weeks after a
            storm, thousands of Fort Myers homeowners are left navigating the
            complicated intersection of property damage, insurance paperwork,
            and the relentless humidity that turns a wet wall into a mold
            problem within 48 hours. Royal Water Damage was founded specifically
            to serve this community — to be the team that picks up the phone at
            2 a.m., drives to a neighborhood that just flooded, and gets to
            work before sunrise.
          </p>
          <p>
            Our team understands that water damage is never just a structural
            problem — it is a life disruption. When a pipe bursts or storm
            surge fills a living room, families are displaced, routines are
            shattered, and the clock starts ticking on mold growth, structural
            deterioration, and insurance deadlines. That reality shapes
            everything about how we operate: we staff crews around the clock,
            we invest in the most capable extraction and drying equipment
            available, and we train our technicians to the IICRC standard
            because Fort Myers homeowners deserve restoration done right, not
            just fast.
          </p>
          <p>
            Serving Fort Myers and the surrounding communities of Cape Coral,
            Estero, Bonita Springs, Lehigh Acres, and Naples, we have built our
            reputation one restored home at a time. Every job we complete is a
            commitment to this community — because we live here too, and we know
            exactly what is at stake when water gets into your home.
          </p>
        </div>
      </section>

      {/* ── Company Facts ────────────────────────────────── */}
      <section
        aria-labelledby="company-facts-heading"
        className="bg-gray-50 py-16 md:py-20"
      >
        <div className="mx-auto max-w-3xl px-4">
          <h2
            id="company-facts-heading"
            className="font-display text-2xl font-extrabold text-[#0f3460] md:text-3xl mb-2"
          >
            Company at a Glance
          </h2>
          <p className="text-gray-500 text-sm mb-8">
            Key facts about Royal Water Damage for quick reference.
          </p>

          <dl className="divide-y divide-gray-200 rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm">
            {COMPANY_FACTS.map((fact, i) => (
              <div
                key={fact.term}
                className={cn(
                  "flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-6 px-5 py-4",
                  i % 2 === 0 ? "bg-white" : "bg-gray-50/60"
                )}
              >
                <dt className="min-w-[160px] text-xs font-bold uppercase tracking-wider text-[#0f3460] pt-0.5">
                  {fact.term}
                </dt>
                <dd className="text-sm text-gray-700 leading-relaxed">
                  {fact.detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Our Values ───────────────────────────────────── */}
      <section
        aria-labelledby="values-heading"
        className="mx-auto max-w-5xl px-4 py-16 md:py-24"
      >
        <div className="text-center mb-12">
          <h2
            id="values-heading"
            className="font-display text-2xl font-extrabold text-[#0f3460] md:text-3xl"
          >
            What Drives Us
          </h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">
            Three values guide every job we take — from a single room water
            extraction to a multi-week hurricane recovery.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {VALUES.map((value) => (
            <div
              key={value.title}
              className={cn(
                "rounded-2xl border border-gray-200 bg-white p-7 shadow-sm",
                "hover:shadow-md hover:border-[#0f3460]/20 transition-all duration-200"
              )}
            >
              <div className="mb-4 text-3xl" aria-hidden="true">
                {value.icon}
              </div>
              <h3 className="font-display text-lg font-bold text-[#0f3460] mb-2">
                {value.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Service Area Map ─────────────────────────────── */}
      <section
        aria-labelledby="service-area-heading"
        className="bg-gray-50 py-16 md:py-20"
      >
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center mb-10">
            <h2
              id="service-area-heading"
              className="font-display text-2xl font-extrabold text-[#0f3460] md:text-3xl"
            >
              Our Service Area
            </h2>
            <p className="mt-3 text-gray-500 flex items-center justify-center gap-1.5">
              <MapPin className="h-4 w-4 text-[#e94560]" aria-hidden="true" />
              Fort Myers, Cape Coral, Estero, Bonita Springs, Lehigh Acres,
              Naples &amp; surrounding communities
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-md">
            <iframe
              src={BUSINESS.googleMapsEmbed}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Royal Water Damage service area map — Fort Myers, FL"
              aria-label="Google Map showing Royal Water Damage service area in Southwest Florida"
            />
          </div>
        </div>
      </section>

      {/* ── Phone CTA Banner ─────────────────────────────── */}
      <section
        aria-label="Call to action"
        className={cn(
          "bg-[#e94560] py-14 md:py-16",
          "text-center"
        )}
      >
        <div className="mx-auto max-w-2xl px-4">
          <div className="flex items-center justify-center gap-1.5 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-5 w-5 fill-[#f5a623] text-[#f5a623]"
                aria-hidden="true"
              />
            ))}
            <span className="ml-1 text-white/90 text-sm font-medium">
              5.0 · 7 Google Reviews
            </span>
          </div>
          <h2 className="font-display text-2xl font-extrabold text-white md:text-3xl">
            Dealing With Water Damage Right Now?
          </h2>
          <p className="mt-3 text-white/85 text-base">
            We answer live 24/7 (Sunday through Friday). One call gets a crew
            moving.
          </p>
          <a
            href={`tel:${BUSINESS.phone}`}
            className={cn(
              "mt-6 inline-flex items-center gap-2 rounded-full",
              "bg-white px-8 py-3.5 text-[#e94560] font-extrabold text-lg",
              "hover:bg-white/90 transition-colors shadow-lg"
            )}
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
            {BUSINESS.phoneDisplay}
          </a>
          <p className="mt-3 text-white/70 text-xs flex items-center justify-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            Available 24/7 · Sunday through Friday · Closed Saturday
          </p>
        </div>
      </section>
    </>
  );
}
