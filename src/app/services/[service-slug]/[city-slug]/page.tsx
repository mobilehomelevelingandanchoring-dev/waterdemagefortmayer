/**
 * Programmatic Service + City combo pages
 * e.g. /services/water-damage-restoration/cape-coral
 *
 * 7 services × 6 cities = 42 statically generated pages.
 */

/* [NEEDS HUMAN REVIEW — Ensure combo page content is genuinely unique before indexing] */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICES, getServiceBySlug } from "@/data/services";
import type { Service } from "@/data/services";
import { LOCATIONS, getLocationBySlug } from "@/data/locations";
import type { Location } from "@/data/locations";
import { BUSINESS } from "@/data/business";
import { JsonLd } from "@/components/schema/JsonLd";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import {
  buildLocalBusinessSchema,
  buildServiceSchema,
  buildFAQSchema,
  buildBreadcrumbSchema,
} from "@/lib/schema";
import { cn } from "@/lib/utils";

/* ============================================================
   Static params — pre-generate all 42 combo pages
   ============================================================ */
export async function generateStaticParams() {
  const params: { "service-slug": string; "city-slug": string }[] = [];
  for (const service of SERVICES) {
    for (const location of LOCATIONS) {
      params.push({
        "service-slug": service.slug,
        "city-slug": location.slug,
      });
    }
  }
  return params;
}

/* ============================================================
   Per-page Metadata
   ============================================================ */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ "service-slug": string; "city-slug": string }>;
}): Promise<Metadata> {
  const { "service-slug": serviceSlug, "city-slug": citySlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  const location = getLocationBySlug(citySlug);
  if (!service || !location) return {};

  const title = `${service.title} in ${location.city}, FL | Royal Water Damage`;
  const description =
    `Need ${service.title.toLowerCase()} in ${location.city}, FL? Royal Water Damage responds ` +
    `${location.responseTime.toLowerCase()} with IICRC-certified crews. Call (864) 734-5702 for ` +
    `24/7 emergency service throughout ${location.city} and ${location.county} County.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${BUSINESS.website}/services/${serviceSlug}/${citySlug}`,
    },
    openGraph: {
      title,
      description,
      url: `${BUSINESS.website}/services/${serviceSlug}/${citySlug}`,
      type: "website",
    },
  };
}

/* ============================================================
   Content helpers — these produce genuinely varied text
   per combo using real location + service data
   ============================================================ */

/**
 * Returns a two-paragraph intro block that is unique to each
 * service × city combination. Pulls from real location data
 * (landmarks, neighborhoods, description) and service data
 * (heroDescription, tagline) so text meaningfully differs across
 * all 42 combinations.
 */
function generateComboIntro(
  service: Service,
  location: Location
): { p1: string; p2: string } {
  const landmark = location.landmarks[0];
  const neighborhood = location.neighborhoods[0];
  const secondNeighborhood =
    location.neighborhoods[1] ?? location.neighborhoods[0];

  // City-specific urgency angle
  const cityUrgency: Record<string, string> = {
    "cape-coral":
      "Cape Coral's extraordinary network of over 400 miles of canals means that storm surge and tidal flooding can reach properties that feel far from the waterfront — and contaminated canal water elevates every flood event to a Category 2 or 3 loss requiring full professional handling.",
    naples:
      "Naples' luxury property market means that a single unaddressed water intrusion can destroy Italian marble, custom millwork, and high-end cabinetry that cost tens of thousands of dollars — making speed and precision equally critical when damage occurs.",
    "lehigh-acres":
      "Lehigh Acres' large stock of homes from the 1970s and 80s carries elevated risk from aging galvanized and polybutylene plumbing that can fail without warning, and the community's sprawling geography means that slow leaks often go undetected for weeks before the damage becomes visible.",
    estero:
      "Estero's master-planned communities and large seasonal population create a specific hazard: properties that sit vacant through Florida's summer storm season, giving slow leaks and storm intrusion weeks or months to cause hidden damage before an owner returns to discover the problem.",
    "bonita-springs":
      "Bonita Springs sits where the Imperial River drains toward Estero Bay, and properties in the Bonita Beach Road corridor and near downtown have historically experienced river flooding during major storms — compounding the coastal surge risk that Gulf-front neighborhoods already face.",
    "fort-myers":
      "Fort Myers' position along the Caloosahatchee River and its aging historic neighborhoods — including McGregor, Dunbar, and Page Park — combine storm surge vulnerability with older plumbing infrastructure that significantly elevates water damage risk compared to newer suburban developments.",
  };

  const urgencyText =
    cityUrgency[location.slug] ??
    `${location.city}'s Southwest Florida climate — with ambient temperatures above 80°F and humidity consistently above 70% — accelerates both material damage and mold onset after any water intrusion event.`;

  // Service-specific value angle
  const serviceValue: Record<string, string> = {
    "water-damage-restoration":
      "water damage restoration stops the damage clock — industrial extraction and structural drying equipment eliminate moisture from walls, floors, and ceilings before secondary damage like mold growth and structural deterioration can take hold",
    "mold-remediation":
      "professional mold remediation uses negative air pressure containment and HEPA filtration to safely eliminate colonies without cross-contaminating other areas of the structure — essential in Florida's climate where mold can spread rapidly through an HVAC system",
    "fire-damage-restoration":
      "fire and smoke restoration is one of the most complex recovery scenarios a homeowner faces — soot chemically bonds to surfaces within hours, smoke penetrates structural cavities, and Florida's humidity accelerates corrosion of metal fixtures, making rapid professional response critical",
    "sewage-cleanup":
      "sewage cleanup is a Category 3 biohazard event — every porous surface contacted by raw sewage must be treated or removed by technicians in full PPE using hospital-grade disinfectants, and attempting DIY cleanup creates serious health risks for anyone in the home",
    "basement-flood-cleanup":
      "flood cleanup in Southwest Florida requires specialized slab drying systems designed for the region's concrete construction — warm floodwater in this climate often carries contamination from storm drains and canals, requiring enhanced disinfection protocols alongside structural drying",
    "storm-damage-restoration":
      "storm and hurricane restoration is a multi-phase process — from emergency board-up and tarping to water extraction, mold prevention treatment, and full reconstruction — and speed is critical because additional rain events can follow within days of a major storm in Southwest Florida",
    "emergency-water-extraction":
      "emergency water extraction with truck-mounted equipment removes hundreds of gallons per hour — a speed that standard household equipment simply cannot match, and every hour of delay in Fort Myers' heat allows water to absorb deeper into structural materials",
  };

  const serviceValueText =
    serviceValue[service.slug] ??
    `${service.title.toLowerCase()} by a certified professional stops damage before it compounds into a larger, costlier loss`;

  const p1 =
    `When ${location.city} homeowners and businesses need ${service.title.toLowerCase()}, ` +
    `Royal Water Damage provides a response measured in minutes — not hours. Our certified crews ` +
    `serve ${neighborhood}, the area near ${landmark}, and every other part of ${location.city} ` +
    `with a target arrival time of ${location.responseTime.toLowerCase()} from your call. ` +
    `We understand that ${serviceValueText}, and that urgency is amplified in ${location.city} specifically.`;

  const p2 =
    `${urgencyText} ` +
    `Royal Water Damage has served the ${location.city} area with IICRC-certified technicians, ` +
    `commercial-grade equipment, and direct insurance billing — so your recovery moves forward ` +
    `without bureaucratic delays. From ${neighborhood} to ${secondNeighborhood}, our team knows ` +
    `${location.city}'s neighborhoods, construction types, and insurance landscape, and we apply ` +
    `that local knowledge to every ${service.title.toLowerCase()} job we take on.`;

  return { p1, p2 };
}

/**
 * Generates 4 FAQs unique to each service × city combination.
 * Uses real location and service data to produce meaningfully
 * different Q&As rather than simple slot-filling templates.
 */
function generateComboFaqs(
  service: Service,
  location: Location
): { question: string; answer: string }[] {
  // FAQ 1 — cost in this city
  const costContextByCity: Record<string, string> = {
    naples:
      "Naples properties often feature premium materials — natural stone, custom cabinetry, engineered hardwood — that increase restoration costs compared to standard construction. Insurance documentation of replacement values for these materials is essential.",
    "cape-coral":
      "Canal-front Cape Coral properties may face elevated costs when flooding originates from the canal system, as contaminated water is classified Category 2 or 3, requiring more extensive disinfection and material removal than clean-water losses.",
    "bonita-springs":
      "Bonita Springs' many resort-style communities with premium finishes can see higher costs on larger losses, though the scope of your specific property and the water category are the primary cost drivers in any estimate.",
    estero:
      "In Estero's condo communities, costs can be complicated by questions of unit owner versus HOA master policy responsibility — thorough documentation from the start helps ensure costs are assigned to the correct policy.",
    "lehigh-acres":
      "Lehigh Acres properties often have older construction where water damage reveals deferred maintenance, which can expand the scope of restoration work — we identify everything upfront so costs are clear before work begins.",
    "fort-myers":
      "Fort Myers losses vary significantly by neighborhood and construction era — older homes in McGregor or Dunbar may have aging subfloor materials that absorb moisture faster and require more extensive drying than newer construction.",
  };

  const costContext =
    costContextByCity[location.slug] ??
    `${location.city} restoration costs are driven by the affected area size, water contamination category, and how long damage was present before professional response.`;

  const faq1 = {
    question: `How much does ${service.title.toLowerCase()} cost in ${location.city}, FL?`,
    answer:
      `The cost of ${service.title.toLowerCase()} in ${location.city} depends on the scope of damage, ` +
      `the area affected, and the category of water or contamination involved. Minor losses may run ` +
      `$1,500–$3,000 while larger or more complex jobs can reach $10,000 or more. ${costContext} ` +
      `Royal Water Damage provides a detailed written estimate before work begins and bills insurance directly whenever possible.`,
  };

  // FAQ 2 — response time
  const faq2 = {
    question: `How quickly can Royal Water Damage respond to ${service.title.toLowerCase()} emergencies in ${location.city}?`,
    answer:
      `For ${location.city}, our target response time is ${location.responseTime.toLowerCase()} from your call — ` +
      `we maintain crews available across Southwest Florida so that ${location.city} is never treated as a secondary market. ` +
      `When you call, you reach a live person immediately. We assess your situation over the phone while the nearest ` +
      `available crew loads equipment and heads to your ${location.city} property. Speed matters in ${location.city}'s ` +
      `climate because heat and humidity accelerate both material damage and mold onset — every hour of delay ` +
      `compounds the scope and cost of restoration.`,
  };

  // FAQ 3 — rephrase service.faqs[0] to mention this city
  const baseFaq3 = service.faqs[0];
  const faq3 = {
    question: baseFaq3.question.replace("Fort Myers", location.city),
    answer:
      baseFaq3.answer +
      (location.city !== "Fort Myers"
        ? ` In ${location.city} specifically, the same Southwest Florida climate conditions apply — ` +
          `warm temperatures and high ambient humidity mean that timing is just as critical here as anywhere in the region.`
        : ""),
  };

  // FAQ 4 — rephrase location.faqs[0] to mention the service
  const baseFaq4 = location.faqs[0];
  const faq4 = {
    question:
      baseFaq4.question +
      ` (As It Relates to ${service.title})`,
    answer:
      baseFaq4.answer +
      ` When ${service.title.toLowerCase()} is the reason for your call, our team handles both ` +
      `the immediate ${service.title.toLowerCase()} work and any related follow-up — including ` +
      `documentation for your insurance carrier — so you have a single point of contact throughout recovery.`,
  };

  return [faq1, faq2, faq3, faq4];
}

/**
 * Returns a city-specific note to append after Step 1 of the process,
 * adding location-relevant context to the generic process description.
 */
function getCityProcessNote(service: Service, location: Location): string {
  const notes: Record<string, Record<string, string>> = {
    "cape-coral": {
      "water-damage-restoration":
        "For Cape Coral canal-adjacent properties, we take extra precautions to assess the water source and contamination level before extraction — canal-sourced water is typically Category 2 or higher and requires enhanced disinfection protocols alongside standard drying.",
      "mold-remediation":
        "In Cape Coral's waterfront neighborhoods, we check moisture intrusion paths from seawalls and canal-adjacent foundations — these hidden pathways are a common secondary source of the moisture that sustains mold growth.",
      "fire-damage-restoration":
        "After securing a Cape Coral property post-fire, we account for the salt-air environment near canals and the Gulf, which can accelerate corrosion of exposed metal fixtures and framing — we prioritize these elements in our initial assessment.",
      "sewage-cleanup":
        "Cape Coral's extensive canal network means that sewer line intrusion near canals can complicate Category 3 contamination with additional environmental factors — we assess proximity to the canal system as part of every sewage cleanup safety evaluation.",
      "basement-flood-cleanup":
        "For Cape Coral canal-adjacent properties, we take extra precautions to test the flood water source before extraction — canal overflow carries lawn chemicals, fertilizers, and biological contamination that elevates the cleanup category and disinfection requirements.",
      "storm-damage-restoration":
        "Cape Coral's flat topography and interconnected canal system mean storm surge spreads rapidly across the entire city — we prioritize securing canal-side openings and assess seawall overtopping before beginning interior work.",
      "emergency-water-extraction":
        "For Cape Coral canal-adjacent properties, we assess water source contamination before extraction begins — canal water is typically Category 2 or 3, which changes both extraction protocols and the disinfection requirements that follow.",
    },
    naples: {
      "water-damage-restoration":
        "In Naples, where many properties feature natural stone flooring, custom cabinetry, and imported tile, we use low-temperature drying techniques in Step 1 to begin protecting premium materials from the moment we arrive.",
      "mold-remediation":
        "Naples properties often have premium finishes — natural stone, custom woodwork, specialty plaster — that require adapted containment approaches to prevent cross-contamination while protecting surfaces that can't be replaced with standard materials.",
      "fire-damage-restoration":
        "In Naples' luxury property market, our initial assessment specifically documents premium materials affected by smoke and soot — from natural stone to custom millwork — so your insurance claim reflects true replacement cost, not generic approximations.",
      "sewage-cleanup":
        "For Naples' condo properties, we assess multi-unit contamination pathways immediately — sewage backup in one unit can migrate to adjacent units through shared plumbing chases, and our initial containment plan accounts for the full scope.",
      "basement-flood-cleanup":
        "In Naples' upscale communities, we pay particular attention to the specialized flooring systems common in premium construction — natural stone over concrete slab requires specific low-heat drying protocols to prevent thermal cracking.",
      "storm-damage-restoration":
        "For Naples properties, post-storm assessment includes documenting specialty finishes and imported materials separately from standard construction elements — insurance carriers need this distinction to process full replacement-cost claims accurately.",
      "emergency-water-extraction":
        "In Naples' luxury homes and condos, we take care during extraction to protect premium flooring — hardwood, natural stone, and engineered materials — from equipment that could cause secondary damage if used without proper protective measures.",
    },
    "lehigh-acres": {
      "water-damage-restoration":
        "For Lehigh Acres homes with aging plumbing infrastructure, we use moisture meters during Step 1 to assess how far water has traveled inside walls — polybutylene pipe failures often cause slow leaks that saturate wall cavities long before visible damage appears.",
      "mold-remediation":
        "In Lehigh Acres, where many homes have older ventilation systems and less efficient air conditioning, we assess HVAC involvement early — mold in ductwork can spread throughout a home and requires specialized containment beyond standard room-level remediation.",
      "fire-damage-restoration":
        "Lehigh Acres' older construction often includes materials that produce more complex soot chemistry when burned — including older insulation and framing materials — which we account for in our initial assessment and cleaning method selection.",
      "sewage-cleanup":
        "In Lehigh Acres, where older homes commonly have cast iron or clay lateral sewer lines prone to root intrusion, we coordinate with plumbing professionals during Step 1 to confirm the source is corrected before cleanup proceeds.",
      "basement-flood-cleanup":
        "For older Lehigh Acres properties, we assess flooring systems carefully during Step 1 — original tile over concrete from the 1970s and 80s often has degraded adhesive that allows water to pool under tile, creating hidden moisture pockets that require specialized extraction.",
      "storm-damage-restoration":
        "In Lehigh Acres, where homes are inland and many owners may not have anticipated flood risk, we take time in Step 1 to assess drainage canal proximity and ground slope — these factors determine how quickly water can be expected to recede versus requiring active extraction.",
      "emergency-water-extraction":
        "For Lehigh Acres homes with older plumbing, we always confirm the source is shut off before extraction begins — polybutylene or galvanized pipe failures can be difficult to isolate, and extraction is wasted if active flow continues during the process.",
    },
    estero: {
      "water-damage-restoration":
        "In Estero's condo communities, Step 1 includes assessing whether water has migrated to adjacent units or common areas — multi-unit losses require coordinating with HOA management from the outset so all affected parties are identified and documented.",
      "mold-remediation":
        "For Estero's seasonal properties, we conduct additional moisture baseline testing during Step 1 — homes that have been vacant through summer often have hidden moisture and early-stage mold that isn't immediately visible upon the owner's return.",
      "fire-damage-restoration":
        "In Estero's planned communities, Step 1 includes coordinating with HOA management about shared access points and common area concerns — smoke damage in one unit can affect shared hallways, HVAC systems, and neighboring units that must be assessed and documented.",
      "sewage-cleanup":
        "For Estero condo properties, Step 1 includes immediate notification to building management — sewage backup in multi-story buildings can affect multiple units through shared plumbing systems, and early containment prevents additional claims from neighboring unit owners.",
      "basement-flood-cleanup":
        "In Estero's communities, many properties sit vacant during summer storm season — Step 1 for these properties includes assessing how long water has been present, which directly affects contamination levels and the scope of material removal required.",
      "storm-damage-restoration":
        "For Estero properties near Estero Bay and the Estero River corridor, Step 1 includes evaluating drainage patterns — properties in low-lying areas near these water features may experience continued seepage after the storm, requiring active monitoring during the securing phase.",
      "emergency-water-extraction":
        "In Estero's condo buildings, extraction equipment access can be limited by elevator capacity and hallway clearances — we plan equipment deployment around building access during Step 1 so extraction begins without delays caused by logistics.",
    },
    "bonita-springs": {
      "water-damage-restoration":
        "For Bonita Springs properties near the Imperial River or Bonita Beach Road corridor, Step 1 includes assessing whether water is from river overflow or groundwater rise — the source affects contamination classification and the disinfection protocol that follows extraction.",
      "mold-remediation":
        "In Bonita Springs' resort communities like Pelican Landing and Bonita Bay, we assess the HVAC system first — these communities' well-maintained central air systems can distribute mold spores throughout a property if containment doesn't include HVAC isolation from the start.",
      "fire-damage-restoration":
        "For Bonita Springs vacation properties, Step 1 includes rapid insurance notification and emergency securing — properties that may be unoccupied for weeks after a fire event need board-up and tarping completed the same day to prevent additional weather damage and vandalism.",
      "sewage-cleanup":
        "In Bonita Springs' older downtown corridor near the Imperial River, clay sewer laterals are still common — we coordinate with licensed plumbers during Step 1 to confirm the lateral line is cleared and the source is permanently resolved before cleanup proceeds.",
      "basement-flood-cleanup":
        "For Bonita Springs properties in the Imperial River floodplain, Step 1 includes checking whether groundwater is still rising before extraction — extracting into an actively flooding situation is counterproductive, and we stage equipment safely while monitoring conditions.",
      "storm-damage-restoration":
        "Bonita Springs' coastal location means we prioritize Gulf-side properties for storm response — the combination of surge risk, wind exposure, and saltwater contamination requires specific protocols that differ from inland flooding response.",
      "emergency-water-extraction":
        "In Bonita Springs vacation rental properties, rapid extraction directly protects rental income — we factor this into our Step 1 response priority and can coordinate with property management directly if the owner is not on-site.",
    },
    "fort-myers": {
      "water-damage-restoration":
        "For Fort Myers properties in older neighborhoods like McGregor and Dunbar, Step 1 includes assessing aging plumbing and subfloor systems — galvanized pipe corrosion and original hardwood subfloors absorb moisture differently than newer construction and require adjusted drying strategies.",
      "mold-remediation":
        "In Fort Myers, where post-hurricane Ian mold remediation revealed widespread hidden mold in walls that appeared undamaged on the surface, we conduct thorough moisture mapping during Step 1 using thermal cameras — visible mold is rarely the full extent of the problem.",
      "fire-damage-restoration":
        "For Fort Myers properties, Step 1 assessment accounts for the city's humidity — soot residue absorbs ambient moisture rapidly in Southwest Florida's climate, becoming increasingly difficult to remove the longer it sits, which is why same-day response is critical.",
      "sewage-cleanup":
        "In Fort Myers' older neighborhoods, municipal sewer system overloads during summer thunderstorms are a common cause of backup — Step 1 includes confirming the city system has cleared before containment is removed, so re-contamination risk is eliminated.",
      "basement-flood-cleanup":
        "For Fort Myers properties in low-lying areas near the Caloosahatchee River and its tributaries, Step 1 includes assessing flood water source and contamination level — storm surge and river overflow carry different contamination profiles than rainwater intrusion.",
      "storm-damage-restoration":
        "In Fort Myers, which experienced catastrophic storm surge during Hurricane Ian, Step 1 for post-storm response includes a full exterior perimeter assessment — hidden structural damage from surge can compromise the safety of internal work if not identified before crews enter.",
      "emergency-water-extraction":
        "For Fort Myers properties in flood-prone zones near the river and its tributaries, we bring both truck-mounted and portable extraction units — some Fort Myers properties have access limitations that require portable equipment for certain rooms or outbuildings.",
    },
  };

  const cityNotes = notes[location.slug];
  if (cityNotes) {
    const serviceNote = cityNotes[service.slug];
    if (serviceNote) return serviceNote;
  }

  // Generic fallback that still references real location data
  return (
    `For ${location.city} properties near ${location.landmarks[0]}, ` +
    `we take extra care during this initial phase to assess all potential water pathways — ` +
    `${location.city}'s specific geography and construction patterns can create hidden moisture ` +
    `routes that a standard assessment might miss.`
  );
}

/* ============================================================
   Page Component
   ============================================================ */
export default async function ServiceCityPage({
  params,
}: {
  params: Promise<{ "service-slug": string; "city-slug": string }>;
}) {
  const { "service-slug": serviceSlug, "city-slug": citySlug } = await params;

  const service = getServiceBySlug(serviceSlug);
  const location = getLocationBySlug(citySlug);

  if (!service || !location) notFound();

  const comboFaqs = generateComboFaqs(service, location);
  const comboIntro = generateComboIntro(service, location);
  const cityProcessNote = getCityProcessNote(service, location);

  // Related pages — other cities with same service (exclude current)
  const relatedCities = LOCATIONS.filter((l) => l.slug !== location.slug).slice(0, 3);

  // Other services in same city (exclude current)
  const relatedServices = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

  const schemas = [
    buildLocalBusinessSchema(),
    buildFAQSchema(comboFaqs),
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
      { name: service.title, url: `/services/${serviceSlug}` },
      {
        name: location.city,
        url: `/services/${serviceSlug}/${citySlug}`,
      },
    ]),
    buildServiceSchema(service),
  ];

  return (
    <>
      {/* ── JSON-LD Structured Data ── */}
      <JsonLd schema={schemas} />

      {/* ── 1. Breadcrumb ── */}
      <BreadcrumbNav service={service} location={location} />

      {/* ── 2. Hero ── */}
      <HeroSection service={service} location={location} />

      {/* ── 3. Local Intro ── */}
      <LocalIntroSection
        service={service}
        location={location}
        intro={comboIntro}
      />

      {/* ── 4. Process ── */}
      <ProcessSection
        service={service}
        location={location}
        cityProcessNote={cityProcessNote}
      />

      {/* ── 5. Service Areas Within City ── */}
      <NeighborhoodsSection service={service} location={location} />

      {/* ── 6. FAQ ── */}
      <FaqSection service={service} location={location} faqs={comboFaqs} />

      {/* ── 7. Related Pages ── */}
      <RelatedPagesSection
        service={service}
        location={location}
        relatedCities={relatedCities}
        relatedServices={relatedServices}
        serviceSlug={serviceSlug}
        citySlug={citySlug}
      />

      {/* ── 8. CTA Banner ── */}
      <CtaBannerSection service={service} location={location} />
    </>
  );
}

/* ============================================================
   1. Breadcrumb Nav
   ============================================================ */
function BreadcrumbNav({
  service,
  location,
}: {
  service: Service;
  location: Location;
}) {
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
          <li>
            <Link
              href={`/services/${service.slug}`}
              className="hover:text-[#0f3460] transition-colors font-medium truncate max-w-[140px] sm:max-w-none inline-block"
            >
              {service.title}
            </Link>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li
            aria-current="page"
            className="font-semibold text-[#0f3460] truncate max-w-[100px] sm:max-w-none"
          >
            {location.city}
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
  service,
  location,
}: {
  service: Service;
  location: Location;
}) {
  const headline = `${service.title} in ${location.city}, FL`;

  // AEO direct-answer block — combines service heroDescription context
  // with city-specific fact (responseTime + landmark)
  const aeoText =
    `Royal Water Damage provides professional ${service.title.toLowerCase()} to ` +
    `${location.city} homeowners and businesses, responding within ` +
    `${location.responseTime.toLowerCase()} of your call. ` +
    `${service.heroDescription.split(".")[0]}. ` +
    `Serving areas near ${location.landmarks[0]} and throughout ${location.county} County, ` +
    `our IICRC-certified crews bring commercial-grade equipment directly to your door — ` +
    `stopping damage before it compounds.`;

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
          {aeoText}
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

        {/* Trust signals */}
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-white/70 text-sm">
          {[
            "IICRC Certified",
            "Direct Insurance Billing",
            "Licensed & Insured",
            `${location.responseTime} Response`,
          ].map((signal) => (
            <span key={signal} className="flex items-center gap-1.5">
              <GreenCheckIcon className="h-4 w-4 text-emerald-400 shrink-0" aria-hidden="true" />
              {signal}
            </span>
          ))}
        </div>
      </div>

      {/* Wave separator */}
      <div
        className="absolute bottom-0 left-0 right-0 leading-none"
        aria-hidden="true"
      >
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
   3. Local Intro Section — KEY UNIQUE CONTENT BLOCK
   ============================================================ */
function LocalIntroSection({
  service,
  location,
  intro,
}: {
  service: Service;
  location: Location;
  intro: { p1: string; p2: string };
}) {
  return (
    <section
      className="bg-gray-50 py-16 sm:py-20 lg:py-24"
      aria-labelledby="local-intro-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left — unique intro copy */}
          <div>
            <h2
              id="local-intro-heading"
              className={cn(
                "font-[family-name:var(--font-raleway)]",
                "text-2xl sm:text-3xl font-extrabold text-[#0f3460] leading-tight mb-5"
              )}
            >
              Why {location.city} Residents Choose Royal Water Damage for{" "}
              {service.title}
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-4">
              {intro.p1}
            </p>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              {intro.p2}
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
                aria-label={`Call for ${service.title} in ${location.city}: ${BUSINESS.phoneDisplay}`}
              >
                <PhoneIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
                Call Now: {BUSINESS.phoneDisplay}
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
              What&apos;s Included with Our {service.title} in {location.city}
            </h3>
            <ul className="space-y-3.5" role="list">
              {service.features.map((feature) => (
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
   4. Our Process in [City] Section
   ============================================================ */
function ProcessSection({
  service,
  location,
  cityProcessNote,
}: {
  service: Service;
  location: Location;
  cityProcessNote: string;
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
            Our {service.title} Process for {location.city} Properties
          </h2>
          <p className="mt-3 text-gray-500 text-lg max-w-2xl mx-auto">
            A systematic, certified approach — from the first call to final
            inspection, tailored for {location.city} conditions.
          </p>
        </div>

        {/* 4-step grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {service.process.map((step) => (
            <div
              key={step.step}
              className={cn(
                "relative flex flex-col gap-4",
                "rounded-2xl bg-gray-50 border border-gray-100",
                "p-6 hover:shadow-md hover:-translate-y-0.5",
                "transition-all duration-200"
              )}
            >
              {/* Step number */}
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

              {/* City-specific note appended after Step 1 */}
              {step.step === 1 && (
                <p className="text-xs text-[#0f3460]/70 bg-[#0f3460]/5 rounded-lg px-3 py-2 leading-relaxed border border-[#0f3460]/10">
                  <span className="font-semibold">{location.city} note:</span>{" "}
                  {cityProcessNote}
                </p>
              )}

              {/* Connector line between steps */}
              {step.step < service.process.length && (
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
   5. Neighborhoods We Serve in [City] Section
   ============================================================ */
function NeighborhoodsSection({
  service,
  location,
}: {
  service: Service;
  location: Location;
}) {
  const firstNeighborhood = location.neighborhoods[0];
  const lastNeighborhood =
    location.neighborhoods[location.neighborhoods.length - 1];

  return (
    <section
      className="bg-gray-50 py-16 sm:py-20 lg:py-24"
      aria-labelledby="neighborhoods-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2
            id="neighborhoods-heading"
            className={cn(
              "font-[family-name:var(--font-raleway)]",
              "text-2xl sm:text-3xl font-extrabold text-[#0f3460] leading-tight"
            )}
          >
            Neighborhoods We Serve in {location.city}
          </h2>
          <p className="mt-3 text-gray-500 text-base max-w-2xl mx-auto">
            From {firstNeighborhood} to {lastNeighborhood}, our team reaches
            all parts of {location.city} for {service.title.toLowerCase()}{" "}
            within {location.responseTime.toLowerCase()}.
          </p>
        </div>

        {/* Neighborhood pill grid */}
        <div className="flex flex-wrap justify-center gap-3">
          {location.neighborhoods.map((neighborhood) => (
            <span
              key={neighborhood}
              className={cn(
                "rounded-full border border-[#0f3460]/20 bg-white",
                "px-4 py-2 text-sm font-semibold text-[#0f3460]",
                "shadow-sm"
              )}
            >
              {neighborhood}
            </span>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Don&apos;t see your neighborhood?{" "}
            <a
              href={`tel:${BUSINESS.phone}`}
              className="text-[#e94560] font-semibold hover:underline"
            >
              Call {BUSINESS.phoneDisplay}
            </a>{" "}
            — we serve all of {location.city} and surrounding{" "}
            {location.county} County.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   6. FAQ Section — UNIQUE per combo
   ============================================================ */
function FaqSection({
  service,
  location,
  faqs,
}: {
  service: Service;
  location: Location;
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
              "text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0f3460] leading-tight"
            )}
          >
            {service.title} FAQs for {location.city} Residents
          </h2>
          <p className="mt-3 text-gray-500 text-base">
            Answers to what {location.city} homeowners ask us most about{" "}
            {service.title.toLowerCase()}.
          </p>
        </div>

        <FAQAccordion items={faqs} />

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
   7. Related Pages Section — internal linking
   ============================================================ */
function RelatedPagesSection({
  service,
  location,
  relatedCities,
  relatedServices,
  serviceSlug,
  citySlug,
}: {
  service: Service;
  location: Location;
  relatedCities: typeof LOCATIONS;
  relatedServices: typeof SERVICES;
  serviceSlug: string;
  citySlug: string;
}) {
  return (
    <section
      className="bg-gray-50 py-16 sm:py-20 lg:py-24"
      aria-labelledby="related-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Also serving nearby areas */}
          <div>
            <h2
              id="related-heading"
              className={cn(
                "font-[family-name:var(--font-raleway)]",
                "text-xl sm:text-2xl font-extrabold text-[#0f3460] leading-tight mb-6"
              )}
            >
              Also Serving Nearby Areas for {service.title}
            </h2>
            <ul className="space-y-3" role="list">
              {relatedCities.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/services/${serviceSlug}/${city.slug}`}
                    className={cn(
                      "group flex items-center justify-between",
                      "rounded-xl border border-gray-100 bg-white",
                      "px-5 py-4",
                      "hover:border-[#0f3460]/30 hover:shadow-sm",
                      "transition-all duration-150"
                    )}
                  >
                    <span className="font-semibold text-[#0f3460] group-hover:text-[#e94560] transition-colors text-sm sm:text-base">
                      {service.title} in {city.city}, FL
                    </span>
                    <span
                      className="ml-2 text-gray-400 group-hover:text-[#e94560] transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Other services in same city */}
          <div>
            <h2
              className={cn(
                "font-[family-name:var(--font-raleway)]",
                "text-xl sm:text-2xl font-extrabold text-[#0f3460] leading-tight mb-6"
              )}
            >
              Other Services in {location.city}
            </h2>
            <ul className="space-y-3" role="list">
              {relatedServices.map((svc) => (
                <li key={svc.slug}>
                  <Link
                    href={`/services/${svc.slug}/${citySlug}`}
                    className={cn(
                      "group flex items-center justify-between",
                      "rounded-xl border border-gray-100 bg-white",
                      "px-5 py-4",
                      "hover:border-[#0f3460]/30 hover:shadow-sm",
                      "transition-all duration-150"
                    )}
                  >
                    <span className="font-semibold text-[#0f3460] group-hover:text-[#e94560] transition-colors text-sm sm:text-base">
                      {svc.title} in {location.city}, FL
                    </span>
                    <span
                      className="ml-2 text-gray-400 group-hover:text-[#e94560] transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </Link>
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
   8. CTA Banner
   ============================================================ */
function CtaBannerSection({
  service,
  location,
}: {
  service: Service;
  location: Location;
}) {
  // Surface-level issue phrasing per service for the banner headline
  const issuePhrase: Record<string, string> = {
    "water-damage-restoration": "water damage",
    "mold-remediation": "mold problems",
    "fire-damage-restoration": "fire or smoke damage",
    "sewage-cleanup": "a sewage backup",
    "basement-flood-cleanup": "flooding",
    "storm-damage-restoration": "storm damage",
    "emergency-water-extraction": "standing water",
  };
  const issue = issuePhrase[service.slug] ?? service.title.toLowerCase();

  return (
    <section
      className="relative overflow-hidden py-16 sm:py-20"
      aria-labelledby="cta-banner-heading"
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
          id="cta-banner-heading"
          className={cn(
            "font-[family-name:var(--font-raleway)]",
            "text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight"
          )}
        >
          Dealing with {issue} in {location.city}?{" "}
          <span className="text-[#f5a623]">Call Now.</span>
        </h2>

        <p className="mt-5 text-white/85 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          Royal Water Damage dispatches IICRC-certified crews to {location.city}{" "}
          {location.responseTime.toLowerCase()} — 24 hours a day, every day
          except Saturday. We handle insurance coordination from day one.
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
