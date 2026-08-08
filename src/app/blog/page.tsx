import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/data/blog";
import { BUSINESS } from "@/data/business";
import { JsonLd } from "@/components/schema/JsonLd";
import { buildLocalBusinessSchema, buildBreadcrumbSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";

/* ============================================================
   Page Metadata
   ============================================================ */
export const metadata: Metadata = {
  title: "Water Damage Blog | Royal Water Damage Fort Myers",
  description:
    "Expert water damage restoration tips, mold prevention guides, and insurance claim advice for Fort Myers homeowners.",
  alternates: {
    canonical: `${BUSINESS.website}/blog`,
  },
  openGraph: {
    title: "Water Damage Blog | Royal Water Damage Fort Myers",
    description:
      "Expert water damage restoration tips, mold prevention guides, and insurance claim advice for Fort Myers homeowners.",
    url: `${BUSINESS.website}/blog`,
    type: "website",
  },
};

/* ============================================================
   Helpers
   ============================================================ */
function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(iso));
}

const CATEGORY_COLORS: Record<string, string> = {
  "Water Damage": "bg-blue-100 text-blue-800",
  Mold: "bg-green-100 text-green-800",
  Insurance: "bg-amber-100 text-amber-800",
};

function categoryBadgeClass(category: string): string {
  return CATEGORY_COLORS[category] ?? "bg-gray-100 text-gray-800";
}

/* ============================================================
   Page Component
   ============================================================ */
export default function BlogIndexPage() {
  const schemas = [
    buildLocalBusinessSchema(),
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Blog", url: "/blog" },
    ]),
  ];

  return (
    <>
      <JsonLd schema={schemas} />

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="bg-[#0f3460] text-white py-16 md:py-20">
        <div className="container-page">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-blue-200">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-blue-300">
                /
              </li>
              <li aria-current="page" className="text-white font-medium">
                Blog
              </li>
            </ol>
          </nav>

          <h1 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-6 text-balance">
            Water Damage Restoration Tips &amp; Local Guides — Fort Myers, FL
          </h1>

          {/* AEO block */}
          <div className="max-w-3xl bg-white/10 border border-white/20 rounded-xl px-6 py-5">
            <p className="text-blue-100 text-base md:text-lg leading-relaxed">
              Our blog covers water damage prevention, mold remediation,
              insurance claim guidance, and storm preparedness for Fort Myers
              and Southwest Florida homeowners.
            </p>
          </div>
        </div>
      </section>

      {/* ── Article Cards Grid ──────────────────────────────── */}
      <section className="py-14 md:py-20 bg-[#f0f4f8]">
        <div className="container-page">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.map((post) => (
              <article
                key={post.slug}
                className={cn(
                  "bg-white rounded-2xl shadow-md overflow-hidden",
                  "flex flex-col",
                  "hover:shadow-lg transition-shadow duration-200",
                )}
              >
                {/* Card header */}
                <div className="px-6 pt-6 pb-4 flex flex-col flex-1 gap-3">
                  {/* Category badge */}
                  <span
                    className={cn(
                      "inline-block self-start text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full",
                      categoryBadgeClass(post.category),
                    )}
                  >
                    {post.category}
                  </span>

                  {/* Title — h2 semantically, styled as h3 visually */}
                  <h2 className="text-lg font-bold text-[#0f3460] leading-snug">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-[#e94560] transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm leading-relaxed flex-1">
                    {post.excerpt}
                  </p>
                </div>

                {/* Card footer */}
                <div className="px-6 pb-6 flex items-center justify-between gap-4 border-t border-gray-100 pt-4 mt-auto">
                  <div className="flex flex-col gap-0.5 text-xs text-gray-500">
                    <span>{post.readTime}</span>
                    <time dateTime={post.publishDate}>
                      {formatDate(post.publishDate)}
                    </time>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className={cn(
                      "text-sm font-semibold text-[#0f3460]",
                      "hover:text-[#e94560] transition-colors",
                      "whitespace-nowrap",
                    )}
                    aria-label={`Read article: ${post.title}`}
                  >
                    Read Article →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ──────────────────────────────────────── */}
      <section className="bg-[#e94560] py-12">
        <div className="container-page text-center">
          <p className="text-white text-xl font-bold mb-4">
            Dealing with water damage right now?
          </p>
          <a
            href={`tel:${BUSINESS.phone}`}
            className={cn(
              "inline-flex items-center gap-2",
              "bg-white text-[#e94560] font-bold text-lg",
              "px-8 py-4 rounded-full shadow-lg",
              "hover:bg-gray-50 transition-colors",
            )}
          >
            Call {BUSINESS.phoneDisplay} — Available 24/7
          </a>
        </div>
      </section>
    </>
  );
}
