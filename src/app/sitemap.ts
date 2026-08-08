import type { MetadataRoute } from "next";
import { SERVICES } from "@/data/services";
import { LOCATIONS } from "@/data/locations";
import { BLOG_POSTS } from "@/data/blog";

const BASE_URL = "https://royalwaterdamagefortmyers.com";

// Launch date — used for pages that don't change frequently
const LAUNCH = "2025-08-01T00:00:00.000Z";
// Last structural update — bump this when you update page content
const LAST_UPDATED = "2025-08-08T00:00:00.000Z";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    // Tier 1 — Money pages: crawled daily
    { url: BASE_URL,                         lastModified: LAST_UPDATED, changeFrequency: "daily",   priority: 1.0 },
    { url: `${BASE_URL}/emergency`,          lastModified: LAST_UPDATED, changeFrequency: "daily",   priority: 0.95 },
    // Tier 2 — High-value category pages
    { url: `${BASE_URL}/services`,           lastModified: LAST_UPDATED, changeFrequency: "weekly",  priority: 0.85 },
    { url: `${BASE_URL}/locations`,          lastModified: LAST_UPDATED, changeFrequency: "weekly",  priority: 0.85 },
    { url: `${BASE_URL}/reviews`,            lastModified: LAST_UPDATED, changeFrequency: "weekly",  priority: 0.75 },
    { url: `${BASE_URL}/blog`,               lastModified: LAST_UPDATED, changeFrequency: "weekly",  priority: 0.80 },
    // Tier 3 — Supporting pages
    { url: `${BASE_URL}/about`,              lastModified: LAUNCH,       changeFrequency: "monthly", priority: 0.70 },
    { url: `${BASE_URL}/faq`,                lastModified: LAST_UPDATED, changeFrequency: "monthly", priority: 0.70 },
    { url: `${BASE_URL}/contact`,            lastModified: LAUNCH,       changeFrequency: "monthly", priority: 0.70 },
    // Legal — low priority, still indexed
    { url: `${BASE_URL}/privacy-policy`,     lastModified: LAUNCH,       changeFrequency: "yearly",  priority: 0.30 },
    { url: `${BASE_URL}/terms`,              lastModified: LAUNCH,       changeFrequency: "yearly",  priority: 0.30 },
  ];

  // Service pages — 7 pages, high commercial intent
  const servicePages: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${BASE_URL}/services/${s.slug}`,
    lastModified: LAST_UPDATED,
    changeFrequency: "weekly" as const,
    priority: 0.90,
  }));

  // Location pages — 6 pages, local SEO
  const locationPages: MetadataRoute.Sitemap = LOCATIONS.map((l) => ({
    url: `${BASE_URL}/locations/${l.slug}`,
    lastModified: LAST_UPDATED,
    changeFrequency: "weekly" as const,
    priority: 0.90,
  }));

  // Service × Location combo pages — 42 pages, long-tail local keywords
  const comboPages: MetadataRoute.Sitemap = SERVICES.flatMap((s) =>
    LOCATIONS.map((l) => ({
      url: `${BASE_URL}/services/${s.slug}/${l.slug}`,
      lastModified: LAUNCH,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    }))
  );

  // Blog posts — use real published/updated dates for crawl freshness signals
  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: p.updatedDate ?? p.publishedDate,
    changeFrequency: "monthly" as const,
    priority: 0.80,
  }));

  return [
    ...staticPages,
    ...servicePages,
    ...locationPages,
    ...comboPages,
    ...blogPages,
  ];
}
