import type { Metadata } from "next";
import { JsonLd } from "@/components/schema/JsonLd";
import {
  buildLocalBusinessSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
} from "@/lib/schema";
import { BUSINESS } from "@/data/business";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { cn } from "@/lib/utils";
import { Phone } from "lucide-react";

/* ============================================================
   FAQ data
   ============================================================ */

const FAQ_GENERAL = [
  {
    question: "Is Royal Water Damage open 24/7?",
    answer:
      "Royal Water Damage is open 24 hours a day, Sunday through Friday. We are closed on Saturdays. If you have a water emergency on a Saturday, please contact another local provider or call 211 for community resources.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We serve Fort Myers and the surrounding Southwest Florida communities, including Cape Coral, Estero, Bonita Springs, Lehigh Acres, and Naples. Our service area covers Lee County and parts of Collier County. Call us at (864) 734-5702 to confirm service to your specific address.",
  },
  {
    question:
      "How fast can you respond to a water emergency in Fort Myers?",
    answer:
      "Our target response time for Fort Myers and immediately surrounding areas is 60 minutes or less from the time of your call. For communities further out in Lee County, arrival typically occurs within 45 to 90 minutes depending on traffic and crew availability. We provide an honest estimate when you call.",
  },
  {
    question: "Do you offer free estimates?",
    answer:
      "Yes. We provide written estimates before any work begins at no charge. For active water emergencies, we prioritize stopping the damage first — but we will always walk you through the scope and cost before committing to restoration work.",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "Yes. Royal Water Damage carries the appropriate contractor licensing and insurance required to operate in Florida. License: [NEEDS CLIENT INPUT — License #]. Insurance: [NEEDS CLIENT INPUT — Insurance #]. We can provide documentation upon request.",
  },
  {
    question: "What certifications do your technicians hold?",
    answer:
      "Our technicians hold current IICRC certifications, including Water Damage Restoration Technician (WRT) and Applied Microbial Remediation Technician (AMRT) for mold projects. We follow IICRC S500 standards for water damage and IICRC S520 standards for mold remediation on every job.",
  },
];

const FAQ_WATER_DAMAGE = [
  {
    question: "What should I do immediately after water damage?",
    answer:
      "First, if it is safe to do so, shut off the water source (main shutoff valve if needed) and cut electricity to affected rooms at the breaker panel. Move valuables, electronics, and important documents to dry areas. Do not use a household vacuum to remove water — it is not designed for this and can create an electrical hazard. Take photos and video of all damage for your insurance claim. Then call a certified restoration company as quickly as possible, because every hour of water contact increases damage and mold risk in Fort Myers' climate.",
  },
  {
    question: "How long does water damage restoration take?",
    answer:
      "Structural drying typically takes 3 to 5 days in Southwest Florida's heat and humidity. Larger losses involving multiple rooms or significant saturation of structural materials can take longer. After drying is complete, reconstruction work — replacing drywall, flooring, insulation, and cabinetry — adds additional time based on the scope. We provide a timeline estimate after our initial assessment.",
  },
  {
    question: "Can you dry a home without removing flooring?",
    answer:
      "In some cases, yes. Tile over concrete slab can often be dried in place using specialized drying mats that draw moisture through the tile. However, saturated hardwood, laminate, and carpet and pad almost always must be removed to dry the subfloor properly and prevent mold growth underneath. We use moisture meters and thermal cameras to make that determination accurately — rather than defaulting to full removal when it is not necessary.",
  },
  {
    question: "What equipment do you use for drying?",
    answer:
      "We use commercial-grade desiccant and refrigerant dehumidifiers (capable of removing 20–50 gallons of water per day from the air), high-velocity air movers placed in a calculated configuration, floor drying mat systems for slab construction, and HEPA-filtered air scrubbers when contamination is present. All equipment is sized and positioned based on a psychrometric drying plan calibrated to Fort Myers' ambient conditions.",
  },
  {
    question: "How do I know if water damage is covered by insurance?",
    answer:
      "Most standard Florida homeowner's policies cover sudden and accidental water damage — such as a burst pipe, appliance failure, or roof leak during a storm — but exclude flooding from external water sources (rain, storm surge, river overflow), which requires a separate flood policy. The cause of loss determines coverage. We document everything thoroughly and can coordinate directly with your insurance adjuster to support your claim.",
  },
];

const FAQ_MOLD = [
  {
    question:
      "How fast does mold grow after water damage in Fort Myers?",
    answer:
      "In Fort Myers specifically, mold can begin colonizing wet building materials within 24 to 48 hours. The combination of year-round warmth (often above 80°F) and high ambient humidity — regularly exceeding 70% — creates near-ideal conditions for mold growth. This is significantly faster than drier, cooler climates, which is why rapid professional water extraction and drying is so critical in Southwest Florida.",
  },
  {
    question: "Can you smell mold before you see it?",
    answer:
      "Yes. A musty, earthy, or sour odor in a room — especially in closets, under sinks, in bathrooms, or near exterior walls — is often the first sign of mold growth inside walls or beneath flooring. Mold produces microbial volatile organic compounds (MVOCs) that create that distinctive smell before the colony is large enough to be visible. If you notice the smell but cannot find visible mold, a professional inspection with moisture meters is the appropriate next step.",
  },
  {
    question:
      "Is mold remediation covered by homeowners insurance in Florida?",
    answer:
      "Coverage depends on the cause of the mold. Most Florida homeowner's policies cover mold remediation when it results directly from a covered water loss — for example, mold that grew because of a burst pipe that was promptly reported. They typically exclude mold caused by long-term leaks, condensation, lack of maintenance, or flooding from external water sources. We review the cause of loss with you and help document the claim appropriately for your carrier.",
  },
  {
    question:
      "What's the difference between mold removal and mold remediation?",
    answer:
      "Mold removal typically refers to the surface cleaning of visible mold — which can be done with household products but does not address mold colonies that have penetrated porous materials. Mold remediation is the professional, comprehensive process: containing the affected area to prevent spore spread, removing contaminated materials, HEPA-vacuuming structural surfaces, applying EPA-registered antimicrobial treatments, and conducting post-remediation clearance testing to verify mold counts have returned to acceptable levels. Remediation addresses the root moisture source as well — without that step, mold will return.",
  },
];

const FAQ_INSURANCE = [
  {
    question: "Do you work with insurance adjusters?",
    answer:
      "Yes. We work directly with all major insurance carriers and their adjusters throughout the restoration process. We provide comprehensive documentation from the start — moisture logs, thermal images, scope of loss reports, and itemized estimates — formatted to support your claim. We can also communicate directly with your adjuster to answer technical questions and help move the process forward.",
  },
  {
    question:
      "What does homeowner's insurance typically cover for water damage?",
    answer:
      "Standard Florida homeowner's policies typically cover water damage that is sudden and accidental — burst pipes, appliance failures (washing machines, water heaters, dishwashers), roof leaks caused by a covered storm event, and accidental discharge from plumbing or HVAC systems. They typically exclude gradual leaks discovered after extended time, flood damage from external water sources, sewer backup (unless you have an endorsement), and damage caused by homeowner negligence or lack of maintenance.",
  },
  {
    question: "How do I file a water damage claim in Florida?",
    answer:
      "Report the damage to your insurance company as soon as possible — most policies require prompt notification. Take detailed photos and video before any cleanup begins. Do not delay mitigation waiting for an adjuster — Florida policy language typically includes a duty to mitigate further damage, meaning delays can reduce your claim. Your insurer will assign an adjuster to inspect the property. Having a restoration company on-site with documentation ready when the adjuster arrives strengthens your claim significantly.",
  },
  {
    question: "Will my rates go up if I file a water damage claim?",
    answer:
      "Potentially — this varies by carrier, your claims history, and the nature of the loss. However, Florida law gives homeowners specific protections around claims-related non-renewals. Our recommendation: assess the scope of damage against your deductible before deciding. For smaller losses close to your deductible amount, paying out-of-pocket may be more economical long-term. For significant losses, filing is almost always the right decision. We provide full documentation regardless of how you decide to proceed.",
  },
];

/* ============================================================
   All FAQs combined for schema
   ============================================================ */

const ALL_FAQS = [
  ...FAQ_GENERAL,
  ...FAQ_WATER_DAMAGE,
  ...FAQ_MOLD,
  ...FAQ_INSURANCE,
];

/* ============================================================
   Metadata
   ============================================================ */

export const metadata: Metadata = {
  title: "Water Damage FAQs Fort Myers FL | Royal Water Damage",
  description:
    "Answers to common questions about water damage restoration, mold remediation, insurance claims, and emergency response in Fort Myers and Southwest Florida.",
  alternates: {
    canonical: "https://royalwaterdamagefortmyers.com/faq",
  },
  openGraph: {
    title: "Water Damage Restoration FAQs — Fort Myers, FL",
    description:
      "Get answers about water damage restoration, mold, insurance claims, and emergency response times in Fort Myers, FL. Royal Water Damage — (864) 734-5702.",
    url: "https://royalwaterdamagefortmyers.com/faq",
  },
};

/* ============================================================
   Page component
   ============================================================ */

export default function FAQPage() {
  return (
    <>
      {/* JSON-LD */}
      <JsonLd
        schema={[
          buildFAQSchema(ALL_FAQS),
          buildLocalBusinessSchema(),
          buildBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "FAQ", url: "/faq" },
          ]),
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        aria-label="FAQ page hero"
        className={cn(
          "relative overflow-hidden",
          "bg-gradient-to-br from-[#0f3460] via-[#0f3460]/95 to-[#0f3460]/80",
          "py-20 md:py-28"
        )}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full border border-white/10"
        />

        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#f5a623]">
            Common Questions, Straight Answers
          </p>

          <h1 className="font-display text-3xl font-extrabold leading-tight text-white md:text-5xl">
            Water Damage Restoration FAQs —{" "}
            <span className="text-[#f5a623]">Fort Myers, FL</span>
          </h1>

          {/* AEO block */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
            Find answers to the most common questions about water damage
            restoration, mold remediation, insurance claims, and emergency
            response in Fort Myers and Southwest Florida.
          </p>
        </div>
      </section>

      {/* ── FAQ Sections ─────────────────────────────────── */}
      <div className="mx-auto max-w-3xl px-4 py-16 md:py-24 space-y-16">

        {/* Category 1 — General */}
        <section aria-labelledby="faq-general-heading">
          <div className="mb-6">
            <span className="inline-block rounded-full bg-[#0f3460]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#0f3460] mb-2">
              General
            </span>
            <h2
              id="faq-general-heading"
              className="font-display text-xl font-extrabold text-[#0f3460] md:text-2xl"
            >
              About Royal Water Damage
            </h2>
          </div>
          <FAQAccordion items={FAQ_GENERAL} />
        </section>

        {/* Category 2 — Water Damage */}
        <section aria-labelledby="faq-water-heading">
          <div className="mb-6">
            <span className="inline-block rounded-full bg-[#0f3460]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#0f3460] mb-2">
              Water Damage
            </span>
            <h2
              id="faq-water-heading"
              className="font-display text-xl font-extrabold text-[#0f3460] md:text-2xl"
            >
              Water Damage Restoration Questions
            </h2>
          </div>
          <FAQAccordion items={FAQ_WATER_DAMAGE} />
        </section>

        {/* Category 3 — Mold */}
        <section aria-labelledby="faq-mold-heading">
          <div className="mb-6">
            <span className="inline-block rounded-full bg-[#0f3460]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#0f3460] mb-2">
              Mold
            </span>
            <h2
              id="faq-mold-heading"
              className="font-display text-xl font-extrabold text-[#0f3460] md:text-2xl"
            >
              Mold Remediation Questions
            </h2>
          </div>
          <FAQAccordion items={FAQ_MOLD} />
        </section>

        {/* Category 4 — Insurance */}
        <section aria-labelledby="faq-insurance-heading">
          <div className="mb-6">
            <span className="inline-block rounded-full bg-[#0f3460]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#0f3460] mb-2">
              Insurance
            </span>
            <h2
              id="faq-insurance-heading"
              className="font-display text-xl font-extrabold text-[#0f3460] md:text-2xl"
            >
              Insurance &amp; Claims Questions
            </h2>
          </div>
          <FAQAccordion items={FAQ_INSURANCE} />
        </section>
      </div>

      {/* ── CTA Banner ───────────────────────────────────── */}
      <section
        aria-label="Contact call to action"
        className="bg-[#0f3460] py-14 text-center"
      >
        <div className="mx-auto max-w-xl px-4">
          <h2 className="font-display text-2xl font-extrabold text-white md:text-3xl">
            Still Have Questions?
          </h2>
          <p className="mt-3 text-white/80 text-base">
            Our team answers live 24/7 (Sunday through Friday). Call us — no
            hold queues, no voicemail.
          </p>
          <a
            href={`tel:${BUSINESS.phone}`}
            className={cn(
              "mt-6 inline-flex items-center gap-2 rounded-full",
              "bg-[#e94560] px-8 py-3.5 text-white font-extrabold text-lg",
              "hover:bg-[#e94560]/90 transition-colors shadow-lg"
            )}
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
            {BUSINESS.phoneDisplay}
          </a>
        </div>
      </section>
    </>
  );
}
