import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getBlogPostBySlug } from "@/data/blog";
import { BUSINESS } from "@/data/business";
import { JsonLd } from "@/components/schema/JsonLd";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import {
  buildArticleSchema,
  buildFAQSchema,
  buildBreadcrumbSchema,
} from "@/lib/schema";
import { cn } from "@/lib/utils";

/* ============================================================
   Static params — pre-generate all blog posts at build time
   ============================================================ */
export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

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
   Per-page Metadata
   ============================================================ */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: {
      canonical: `${BUSINESS.website}/blog/${slug}`,
    },
    openGraph: {
      type: "article",
      title: post.metaTitle,
      description: post.metaDescription,
      url: `${BUSINESS.website}/blog/${slug}`,
      publishedTime: post.publishDate,
      modifiedTime: post.updatedDate,
    },
  };
}

/* ============================================================
   Page Component
   ============================================================ */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug);

  const schemas = [
    buildArticleSchema(post),
    buildFAQSchema(post.faqs),
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Blog", url: "/blog" },
      { name: post.title, url: `/blog/${slug}` },
    ]),
  ];

  return (
    <>
      <JsonLd schema={schemas} />

      {/* ── Breadcrumb ──────────────────────────────────────── */}
      <div className="bg-[#f0f4f8] border-b border-gray-200 py-3">
        <div className="container-page">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
              <li>
                <Link
                  href="/"
                  className="hover:text-[#0f3460] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-[#0f3460] transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li
                aria-current="page"
                className="text-[#0f3460] font-medium truncate max-w-[200px] md:max-w-none"
              >
                {post.title}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* ── Article Header ──────────────────────────────────── */}
      <header className="bg-white py-10 md:py-14 border-b border-gray-100">
        <div className="container-page max-w-4xl">
          {/* Category badge */}
          <span
            className={cn(
              "inline-block text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full mb-4",
              categoryBadgeClass(post.category),
            )}
          >
            {post.category}
          </span>

          {/* H1 */}
          <h1 className="font-display font-extrabold text-3xl md:text-4xl text-[#1a1a2e] leading-tight mb-6 text-balance">
            {post.title}
          </h1>

          {/* AEO direct-answer block — featured snippet target */}
          <div
            className={cn(
              "mb-7 rounded-xl px-6 py-5",
              "bg-blue-50 border-l-4 border-[#0f3460]",
            )}
          >
            <p className="text-[#0f3460] text-base md:text-lg leading-relaxed font-medium">
              {post.heroDescription}
            </p>
          </div>

          {/* Meta line */}
          <p className="text-sm text-gray-500 flex flex-wrap gap-x-3 gap-y-1 items-center">
            <span className="font-medium text-gray-700">
              By Royal Water Damage
            </span>
            <span aria-hidden="true">·</span>
            <span>
              Published{" "}
              <time dateTime={post.publishDate}>
                {formatDate(post.publishDate)}
              </time>
            </span>
            <span aria-hidden="true">·</span>
            <span>{post.readTime}</span>
            <span aria-hidden="true">·</span>
            <span>
              Updated{" "}
              <time dateTime={post.updatedDate}>
                {formatDate(post.updatedDate)}
              </time>
            </span>
          </p>
        </div>
      </header>

      {/* ── Article Body ────────────────────────────────────── */}
      <div className="bg-white py-10 md:py-14">
        <div className="container-page max-w-4xl">
          <article
            className="prose"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>

      {/* ── FAQ Section ─────────────────────────────────────── */}
      <section className="bg-[#f0f4f8] py-12 md:py-16">
        <div className="container-page max-w-4xl">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-[#0f3460] mb-8">
            Frequently Asked Questions
          </h2>
          <FAQAccordion items={post.faqs} />
        </div>
      </section>

      {/* ── Author Box ──────────────────────────────────────── */}
      <section className="bg-white py-10 border-t border-gray-100">
        <div className="container-page max-w-4xl">
          <div
            className={cn(
              "flex flex-col sm:flex-row items-start gap-5",
              "bg-[#f0f4f8] rounded-2xl px-6 py-6",
            )}
          >
            {/* Icon placeholder */}
            <div
              className={cn(
                "shrink-0 w-14 h-14 rounded-full bg-[#0f3460]",
                "flex items-center justify-center",
              )}
              aria-hidden="true"
            >
              <span className="text-white font-bold text-xl">R</span>
            </div>

            <div>
              <p className="font-bold text-[#1a1a2e] mb-1">
                Written by the Royal Water Damage Team
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Our certified restoration technicians serve Fort Myers and
                Southwest Florida. Questions?{" "}
                <a
                  href={`tel:${BUSINESS.phone}`}
                  className="text-[#0f3460] underline hover:no-underline font-medium"
                >
                  Call {BUSINESS.phoneDisplay}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related Articles ────────────────────────────────── */}
      {relatedPosts.length > 0 && (
        <section className="bg-[#f0f4f8] py-12 md:py-16 border-t border-gray-200">
          <div className="container-page max-w-4xl">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-[#0f3460] mb-8">
              Related Articles
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className={cn(
                    "block bg-white rounded-2xl p-6 shadow-sm",
                    "hover:shadow-md transition-shadow duration-200",
                    "group",
                  )}
                >
                  <span
                    className={cn(
                      "inline-block text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full mb-3",
                      categoryBadgeClass(related.category),
                    )}
                  >
                    {related.category}
                  </span>
                  <p className="font-bold text-[#0f3460] leading-snug group-hover:text-[#e94560] transition-colors text-base">
                    {related.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-2 flex gap-2">
                    <span>{related.readTime}</span>
                    <span aria-hidden="true">·</span>
                    <time dateTime={related.publishDate}>
                      {formatDate(related.publishDate)}
                    </time>
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA Banner ──────────────────────────────────────── */}
      <section className="bg-[#0f3460] py-12 md:py-16">
        <div className="container-page max-w-4xl text-center">
          <p className="text-white font-bold text-xl md:text-2xl mb-2">
            Dealing with water damage right now?
          </p>
          <p className="text-blue-200 mb-7 text-base">
            Call {BUSINESS.phoneDisplay} — we&apos;re available 24/7 Sunday
            through Friday.
          </p>
          <a
            href={`tel:${BUSINESS.phone}`}
            className={cn(
              "inline-flex items-center gap-2",
              "bg-[#e94560] text-white font-bold text-lg",
              "px-10 py-4 rounded-full shadow-lg",
              "hover:bg-[#d43050] transition-colors",
              "animate-pulse-ring",
            )}
          >
            {BUSINESS.phoneDisplay} — Emergency Line
          </a>
        </div>
      </section>
    </>
  );
}
