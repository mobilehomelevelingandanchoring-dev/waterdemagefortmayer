import { NextResponse } from "next/server";
import { SERVICES } from "@/data/services";
import { LOCATIONS } from "@/data/locations";
import { BLOG_POSTS } from "@/data/blog";

const BASE_URL = "https://royalwaterdamagefortmyers.com";
const INDEX_NOW_KEY = "a7f3c2d1e9b0468a3f7c2d1e9b046852";
const INDEX_NOW_KEY_LOCATION = `${BASE_URL}/${INDEX_NOW_KEY}.txt`;

const INDEXNOW_ENDPOINTS = [
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow",
  "https://search.seznam.cz/indexnow",
  "https://yandex.com/indexnow",
];

function buildUrlList(): string[] {
  const staticPages = [
    BASE_URL,
    `${BASE_URL}/emergency`,
    `${BASE_URL}/services`,
    `${BASE_URL}/locations`,
    `${BASE_URL}/about`,
    `${BASE_URL}/reviews`,
    `${BASE_URL}/faq`,
    `${BASE_URL}/contact`,
    `${BASE_URL}/blog`,
    `${BASE_URL}/privacy-policy`,
    `${BASE_URL}/terms`,
  ];

  const servicePages = SERVICES.map((s) => `${BASE_URL}/services/${s.slug}`);
  const locationPages = LOCATIONS.map((l) => `${BASE_URL}/locations/${l.slug}`);
  const comboPages = SERVICES.flatMap((s) =>
    LOCATIONS.map((l) => `${BASE_URL}/services/${s.slug}/${l.slug}`)
  );
  const blogPages = BLOG_POSTS.map((p) => `${BASE_URL}/blog/${p.slug}`);

  return [...staticPages, ...servicePages, ...locationPages, ...comboPages, ...blogPages];
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  // Basic protection — set INDEXNOW_SECRET env var on Vercel
  const expectedSecret = process.env.INDEXNOW_SECRET;
  if (expectedSecret && secret !== expectedSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const urlList = buildUrlList();
  const payload = {
    host: "royalwaterdamagefortmyers.com",
    key: INDEX_NOW_KEY,
    keyLocation: INDEX_NOW_KEY_LOCATION,
    urlList,
  };

  const results = await Promise.allSettled(
    INDEXNOW_ENDPOINTS.map((endpoint) =>
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload),
      }).then((r) => ({ endpoint, status: r.status, ok: r.ok }))
    )
  );

  const report = results.map((r) =>
    r.status === "fulfilled" ? r.value : { endpoint: "unknown", error: r.reason?.message }
  );

  return NextResponse.json({
    submitted: urlList.length,
    urls: urlList,
    results: report,
  });
}

// Called by Vercel deploy hook or CI after each build
export async function POST() {
  const urlList = buildUrlList();
  const payload = {
    host: "royalwaterdamagefortmyers.com",
    key: INDEX_NOW_KEY,
    keyLocation: INDEX_NOW_KEY_LOCATION,
    urlList,
  };

  const results = await Promise.allSettled(
    INDEXNOW_ENDPOINTS.map((endpoint) =>
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload),
      }).then((r) => ({ endpoint, status: r.status, ok: r.ok }))
    )
  );

  const report = results.map((r) =>
    r.status === "fulfilled" ? r.value : { endpoint: "unknown", error: r.reason?.message }
  );

  return NextResponse.json({ submitted: urlList.length, results: report });
}
