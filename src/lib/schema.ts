import { BUSINESS } from "@/data/business";
import type { Service } from "@/data/services";
import type { BlogPost } from "@/data/blog";

// ---------------------------------------------------------------------------
// Shared return type — every helper returns a plain schema object
// ---------------------------------------------------------------------------

type SchemaObject = Record<string, unknown>;

// ---------------------------------------------------------------------------
// WebSite — enables Google Sitelinks Search Box via SearchAction
// Place on homepage only
// ---------------------------------------------------------------------------

export function buildWebSiteSchema(): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BUSINESS.website}/#website`,
    name: BUSINESS.name,
    url: BUSINESS.website,
    description:
      "24/7 water damage restoration in Fort Myers, FL. IICRC-certified. 60-minute response. (864) 734-5702.",
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BUSINESS.website}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      "@id": `${BUSINESS.website}/#organization`,
      name: BUSINESS.name,
      url: BUSINESS.website,
    },
  };
}

// ---------------------------------------------------------------------------
// Organization — global entity definition, placed on homepage
// ---------------------------------------------------------------------------

export function buildOrganizationSchema(): SchemaObject {
  const sameAs: string[] = [
    `https://www.google.com/maps?cid=${BUSINESS.googleMapsCID}`,
  ];
  if (BUSINESS.socialProfiles.facebook) sameAs.push(BUSINESS.socialProfiles.facebook);
  if (BUSINESS.socialProfiles.instagram) sameAs.push(BUSINESS.socialProfiles.instagram);
  if (BUSINESS.socialProfiles.yelp) sameAs.push(BUSINESS.socialProfiles.yelp);

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BUSINESS.website}/#organization`,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    url: BUSINESS.website,
    logo: {
      "@type": "ImageObject",
      "@id": `${BUSINESS.website}/#logo`,
      url: `${BUSINESS.website}/logo.png`,
      contentUrl: `${BUSINESS.website}/logo.png`,
      width: 512,
      height: 512,
      caption: BUSINESS.name,
    },
    image: `${BUSINESS.website}/og-image.jpg`,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    foundingDate: String(BUSINESS.yearFounded),
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.streetAddress,
      addressLocality: BUSINESS.address.city,
      addressRegion: BUSINESS.address.stateCode,
      postalCode: BUSINESS.address.zip,
      addressCountry: BUSINESS.address.country,
    },
    contactPoint: [
      {
        // Primary: emergency pay-per-call tracking line
        "@type": "ContactPoint",
        telephone: BUSINESS.phone,          // (864) tracking number
        contactType: "emergency",
        availableLanguage: [{ "@type": "Language", name: "English" }],
        areaServed: ["Fort Myers, FL", "Cape Coral, FL", "Lee County, FL"],
        hoursAvailable: [
          { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday",    opens: "00:00", closes: "23:59" },
          { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday",    opens: "00:00", closes: "23:59" },
          { "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday",   opens: "00:00", closes: "23:59" },
          { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "00:00", closes: "23:59" },
          { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday",  opens: "00:00", closes: "23:59" },
          { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday",    opens: "00:00", closes: "23:59" },
        ],
      },
      {
        // Secondary: GBP-matched number for NAP entity consistency
        "@type": "ContactPoint",
        telephone: BUSINESS.phoneGBP,
        contactType: "customer service",
        availableLanguage: [{ "@type": "Language", name: "English" }],
        areaServed: "US",
      },
    ],
    sameAs,
    numberOfEmployees: { "@type": "QuantitativeValue", minValue: 5 },
    slogan: "Fort Myers' 24/7 Emergency Water Damage Experts",
  };
}

// ---------------------------------------------------------------------------
// WebPage — for individual page schema (enhances crawlability)
// ---------------------------------------------------------------------------

export function buildWebPageSchema({
  url,
  name,
  description,
  breadcrumb,
}: {
  url: string;
  name: string;
  description: string;
  breadcrumb?: SchemaObject;
}): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: "en-US",
    isPartOf: { "@type": "WebSite", "@id": `${BUSINESS.website}/#website` },
    about: { "@type": "Organization", "@id": `${BUSINESS.website}/#organization` },
    ...(breadcrumb ? { breadcrumb } : {}),
    dateModified: new Date().toISOString().split("T")[0],
  };
}

// ---------------------------------------------------------------------------
// AggregateRating — sourced from BUSINESS.rating
// Exported separately so LocalBusiness can embed it without duplication.
// ---------------------------------------------------------------------------

export function buildAggregateRatingSchema(): SchemaObject {
  return {
    "@type": "AggregateRating",
    ratingValue: BUSINESS.rating.value,
    reviewCount: BUSINESS.rating.count,
    bestRating: BUSINESS.rating.max,
    worstRating: 1,
  };
}

// ---------------------------------------------------------------------------
// LocalBusiness — full schema with all BUSINESS data
// ---------------------------------------------------------------------------

export function buildLocalBusinessSchema(): SchemaObject {
  const sameAs: string[] = [
    // Google Maps CID link
    `https://www.google.com/maps?cid=${BUSINESS.googleMapsCID}`,
  ];

  // Append non-null social profiles
  if (BUSINESS.socialProfiles.facebook) sameAs.push(BUSINESS.socialProfiles.facebook);
  if (BUSINESS.socialProfiles.instagram) sameAs.push(BUSINESS.socialProfiles.instagram);
  if (BUSINESS.socialProfiles.yelp) sameAs.push(BUSINESS.socialProfiles.yelp);

  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    // telephone = GBP/NAP-consistent number for Local Pack ranking signal
    // If your GBP uses a different number than the tracking number, update
    // BUSINESS.phoneGBP — schema always reflects the GBP number.
    telephone: BUSINESS.phoneGBP,
    email: BUSINESS.email,
    url: BUSINESS.website,
    image: `${BUSINESS.website}/og-image.jpg`,
    logo: `${BUSINESS.website}/logo.png`,
    foundingDate: String(BUSINESS.yearFounded),
    priceRange: BUSINESS.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.streetAddress,
      addressLocality: BUSINESS.address.city,
      addressRegion: BUSINESS.address.stateCode,
      postalCode: BUSINESS.address.zip,
      addressCountry: BUSINESS.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.geo.lat,
      longitude: BUSINESS.geo.lng,
    },
    openingHoursSpecification: BUSINESS.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${h.dayOfWeek}`,
      opens: h.opens,
      closes: h.closes,
    })),
    aggregateRating: buildAggregateRatingSchema(),
    areaServed: [
      {
        "@type": "City",
        name: "Fort Myers",
        containedInPlace: { "@type": "State", name: "Florida" },
      },
      { "@type": "City", name: "Cape Coral" },
      { "@type": "City", name: "Bonita Springs" },
      { "@type": "City", name: "Estero" },
      { "@type": "City", name: "Lehigh Acres" },
      { "@type": "City", name: "Naples" },
      { "@type": "AdministrativeArea", name: "Lee County, FL" },
    ],
    serviceType: BUSINESS.categories,
    knowsAbout: [
      "Water Damage Restoration",
      "Mold Remediation",
      "Sewage Cleanup",
      "Storm Damage Restoration",
      "Fire Damage Restoration",
      "Emergency Water Extraction",
      "IICRC S500 Standards",
      "IICRC S520 Standards",
      "Structural Drying",
      "Insurance Claims Assistance",
    ],
    description:
      "Royal Water Damage provides 24/7 emergency water damage restoration, mold remediation, sewage cleanup, and storm damage restoration throughout Fort Myers and Southwest Florida. IICRC-certified technicians, 60-minute response time, direct insurance billing.",
    hasMap: `https://www.google.com/maps?cid=${BUSINESS.googleMapsCID}`,
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Check, Credit Card, Insurance",
    availableLanguage: [{ "@type": "Language", name: "English" }],
    // Dual ContactPoint strategy:
    // 1. "emergency" ContactPoint = pay-per-call tracking number (displayed on site)
    // 2. "customer service" ContactPoint = GBP/NAP number (for entity verification)
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: BUSINESS.phone,          // (864) tracking number — pay-per-call
        contactType: "emergency",
        availableLanguage: [{ "@type": "Language", name: "English" }],
        areaServed: [
          "Fort Myers, FL",
          "Cape Coral, FL",
          "Estero, FL",
          "Bonita Springs, FL",
          "Lehigh Acres, FL",
          "Naples, FL",
          "Lee County, FL",
          "Collier County, FL",
        ],
        hoursAvailable: BUSINESS.hours.map((h) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: `https://schema.org/${h.dayOfWeek}`,
          opens: h.opens,
          closes: h.closes,
        })),
        productSupported: "Water Damage Restoration, Mold Remediation, Emergency Water Extraction",
      },
      {
        "@type": "ContactPoint",
        telephone: BUSINESS.phoneGBP,       // GBP-matched number — NAP consistency
        contactType: "customer service",
        availableLanguage: [{ "@type": "Language", name: "English" }],
        areaServed: "US-FL",
      },
    ],
    sameAs,
  };
}

// ---------------------------------------------------------------------------
// Service — links each service page to the LocalBusiness
// ---------------------------------------------------------------------------

export function buildServiceSchema(service: Service): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "LocalBusiness",
      name: BUSINESS.name,
      telephone: BUSINESS.phone,
      url: BUSINESS.website,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Lee County, FL",
    },
    url: `${BUSINESS.website}/services/${service.slug}`,
    serviceType: service.title,
    offers: {
      "@type": "Offer",
      description: service.tagline,
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
      priceRange: BUSINESS.priceRange,
    },
  };
}

// ---------------------------------------------------------------------------
// FAQPage
// ---------------------------------------------------------------------------

/** @deprecated Prefer buildFAQSchema — kept for backwards compat */
export function buildFaqSchema(
  items: { question: string; answer: string }[]
): SchemaObject {
  return buildFAQSchema(items);
}

export function buildFAQSchema(
  faqs: { question: string; answer: string }[]
): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// ---------------------------------------------------------------------------
// BreadcrumbList
// ---------------------------------------------------------------------------

export function buildBreadcrumbSchema(
  items: { name: string; url: string }[]
): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http")
        ? item.url
        : `${BUSINESS.website}${item.url}`,
    })),
  };
}

// ---------------------------------------------------------------------------
// Article (Blog post)
// ---------------------------------------------------------------------------

export function buildArticleSchema(post: BlogPost): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishDate,
    dateModified: post.updatedDate,
    url: `${BUSINESS.website}/blog/${post.slug}`,
    author: {
      "@type": "Organization",
      name: BUSINESS.name,
      url: BUSINESS.website,
    },
    publisher: {
      "@type": "Organization",
      name: BUSINESS.name,
      url: BUSINESS.website,
      logo: {
        "@type": "ImageObject",
        url: `${BUSINESS.website}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BUSINESS.website}/blog/${post.slug}`,
    },
  };
}

// ---------------------------------------------------------------------------
// Review
// ---------------------------------------------------------------------------

export function buildReviewSchema(review: {
  author: string;
  rating: number;
  text: string;
  date: string;
}): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    author: {
      "@type": "Person",
      name: review.author,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating,
      bestRating: BUSINESS.rating.max,
      worstRating: 1,
    },
    reviewBody: review.text,
    datePublished: review.date,
    itemReviewed: {
      "@type": "LocalBusiness",
      name: BUSINESS.name,
    },
  };
}
