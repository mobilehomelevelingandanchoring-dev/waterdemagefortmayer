// ─────────────────────────────────────────────────────────────────────────────
// DUAL-NUMBER PAY-PER-CALL STRATEGY
// ─────────────────────────────────────────────────────────────────────────────
//
//  phoneTracking   → The (864) 734-5702 pay-per-call number displayed on-site.
//                    Routes through your call-tracking platform (CallRail /
//                    WhatConverts / CallTrackingMetrics). Every inbound call
//                    is attributed, recorded, and reported.
//
//  phoneGBP        → Your Google Business Profile's primary number.
//                    MUST match GBP exactly — this is the NAP-consistency
//                    signal Google uses for Local Pack ranking.
//                    [NEEDS CLIENT INPUT — provide your GBP primary number]
//                    Until provided: set equal to phoneTracking so schema
//                    stays valid (no empty field).
//
//  HOW DNI WORKS (Dynamic Number Insertion):
//  ─────────────────────────────────────────
//  1. CallRail / WhatConverts JS snippet runs in the browser.
//  2. It finds elements with data-phone-target="tracking" and swaps the
//     displayed number based on traffic source (organic, paid, referral).
//  3. Organic visitors can be shown a local (239) pool number → cleaner
//     local trust signal, better conversion rate for non-emergency callers.
//  4. Paid/LSA visitors keep the (864) tracking number → full attribution.
//  5. Schema always shows phoneGBP → NAP consistent for crawlers.
//
//  RECOMMENDED NEXT STEPS FOR CLIENT:
//  ────────────────────────────────────
//  1. Provide GBP primary number → update phoneGBP below
//  2. Set up a CallRail "number pool" for organic traffic (local 239 number)
//  3. Add NEXT_PUBLIC_CALLRAIL_ID to .env.local → PhoneLink uses it for DNI
//  4. Set up GA4 goal for phone_click events (PhoneLink fires these)
//  5. Connect Google Ads conversion action to the phone_click GA4 event
// ─────────────────────────────────────────────────────────────────────────────

export const BUSINESS = {
  name: "Royal Water Damage",
  legalName: "Royal Water Damage",

  // ── Pay-per-call tracking number (displayed on site) ──────────────────────
  // This is the number shown in the header, hero, CTAs, mobile bar, etc.
  // Every call through this number is tracked and attributed.
  phone: "+18647345702",
  phoneDisplay: "(864) 734-5702",

  // ── GBP / NAP number (used in schema markup only) ─────────────────────────
  // Must match your Google Business Profile primary phone EXACTLY.
  // Used in LocalBusiness schema telephone field for NAP consistency.
  // [NEEDS CLIENT INPUT — your GBP primary number. If (864) 734-5702 IS your
  //  GBP number, these can remain the same.]
  phoneGBP: "+18647345702",
  phoneGBPDisplay: "(864) 734-5702",

  // ── Local pool number (optional DNI — for organic traffic) ────────────────
  // If using CallRail DNI: add a local (239) number here for organic callers.
  // This number is NOT shown in schema — only swapped in by JS for humans.
  // [NEEDS CLIENT INPUT — optional local Fort Myers (239) pool number]
  phoneLocal: null as string | null,
  phoneLocalDisplay: null as string | null,

  // ── Contact ────────────────────────────────────────────────────────────────
  email: "info@royalwaterdamagefortmyers.com",
  website: "https://royalwaterdamagefortmyers.com",

  // ── Address ───────────────────────────────────────────────────────────────
  address: {
    streetAddress: "[NEEDS CLIENT INPUT — Street Address]",
    city: "Fort Myers",
    state: "FL",
    stateCode: "FL",
    zip: "[NEEDS CLIENT INPUT — ZIP]",
    country: "US",
    countryName: "United States",
  },

  // ── Geo coordinates (from Google Maps embed) ──────────────────────────────
  geo: {
    lat: 26.2736,
    lng: -81.8481,
  },

  // ── Rating ────────────────────────────────────────────────────────────────
  rating: {
    value: 5.0,
    count: 7,
    max: 5,
  },

  // ── Hours (for schema OpeningHoursSpecification) ──────────────────────────
  hours: [
    { dayOfWeek: "Sunday",    opens: "00:00", closes: "23:59" },
    { dayOfWeek: "Monday",    opens: "00:00", closes: "23:59" },
    { dayOfWeek: "Tuesday",   opens: "00:00", closes: "23:59" },
    { dayOfWeek: "Wednesday", opens: "00:00", closes: "23:59" },
    { dayOfWeek: "Thursday",  opens: "00:00", closes: "23:59" },
    { dayOfWeek: "Friday",    opens: "00:00", closes: "23:59" },
    // Saturday: Closed — intentionally omitted from schema hours
  ],

  // ── Hours (human-readable for footer / contact page) ─────────────────────
  hoursDisplay: [
    { day: "Sunday",    hours: "Open 24 Hours" },
    { day: "Monday",    hours: "Open 24 Hours" },
    { day: "Tuesday",   hours: "Open 24 Hours" },
    { day: "Wednesday", hours: "Open 24 Hours" },
    { day: "Thursday",  hours: "Open 24 Hours" },
    { day: "Friday",    hours: "Open 24 Hours" },
    { day: "Saturday",  hours: "Closed" },
  ],

  // ── Google Maps ───────────────────────────────────────────────────────────
  googleMapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1831748.8779542646!2d-84.16633197676681!3d26.27352241567942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487f08a4a94dfbc1%3A0x308ddb3c9be57ff3!2sRoyal%20Water%20Damage!5e0!3m2!1sen!2suk!4v1786185833278!5m2!1sen!2suk",
  googleMapsCID: "0x487f08a4a94dfbc1:0x308ddb3c9be57ff3",

  // ── Business details ──────────────────────────────────────────────────────
  license:     "[NEEDS CLIENT INPUT — Contractor License #]",
  insurance:   "[NEEDS CLIENT INPUT — Insurance Policy #]",
  yearFounded: 2020,
  serviceArea: "Fort Myers, FL and nearby areas",
  priceRange:  "$$",

  categories: [
    "Water Damage Restoration",
    "Mold Remediation",
    "Fire Damage Restoration",
    "Sewage Cleanup",
    "Storm Damage Restoration",
  ],

  // ── Social profiles ───────────────────────────────────────────────────────
  // [NEEDS CLIENT INPUT — add real URLs when profiles exist]
  socialProfiles: {
    facebook:  null as string | null,
    instagram: null as string | null,
    yelp:      null as string | null,
    googleBusiness: `https://www.google.com/maps?cid=0x487f08a4a94dfbc1:0x308ddb3c9be57ff3`,
  },

  // ── Analytics IDs ─────────────────────────────────────────────────────────
  // These are read from env vars at runtime — defined here for documentation.
  // Set in .env.local: NEXT_PUBLIC_GA4_ID, NEXT_PUBLIC_GTM_ID,
  //                    NEXT_PUBLIC_CALLRAIL_ID
  analytics: {
    ga4Id:       process.env.NEXT_PUBLIC_GA4_ID      ?? null,
    gtmId:       process.env.NEXT_PUBLIC_GTM_ID      ?? null,
    callRailId:  process.env.NEXT_PUBLIC_CALLRAIL_ID ?? null,
  },
} as const;

// ── Derived helpers ───────────────────────────────────────────────────────────

/** E.164 format of the tracking number for tel: href attributes */
export const PHONE_TRACKING_HREF = `tel:${BUSINESS.phone}` as const;

/** E.164 format of the GBP number for schema telephone field */
export const PHONE_GBP_HREF = `tel:${BUSINESS.phoneGBP}` as const;

/** Full Google Maps review link (derived from CID) */
export const GOOGLE_REVIEW_URL =
  `https://search.google.com/local/writereview?placeid=ChIJwftNqaQIf0gR838lvDzbsDA` as const;
