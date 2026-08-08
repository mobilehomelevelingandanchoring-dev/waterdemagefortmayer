import type { Metadata } from "next";
import { JsonLd } from "@/components/schema/JsonLd";
import { buildLocalBusinessSchema, buildBreadcrumbSchema } from "@/lib/schema";
import { BUSINESS } from "@/data/business";
import { cn } from "@/lib/utils";
import { Star, Phone, ExternalLink } from "lucide-react";

/* ============================================================
   Metadata
   ============================================================ */

export const metadata: Metadata = {
  title: "Customer Reviews | Royal Water Damage Fort Myers",
  description:
    "Royal Water Damage has a 5.0-star rating from 7 Google reviews. Read what Fort Myers homeowners say about our emergency water damage restoration services.",
  alternates: {
    canonical: "https://royalwaterdamagefortmyers.com/reviews",
  },
  openGraph: {
    title: "Customer Reviews | Royal Water Damage Fort Myers",
    description:
      "5.0 stars · 7 Google reviews. Fort Myers homeowners trust Royal Water Damage for fast, professional water damage restoration. Read their stories.",
    url: "https://royalwaterdamagefortmyers.com/reviews",
  },
};

/* ============================================================
   Review data — placeholder cards
   ============================================================ */

const REVIEWS = [
  {
    author: "James T.",
    rating: 5,
    date: "2024-01-15",
    /* [NEEDS CLIENT INPUT — Real Google review] */
    text: "[NEEDS CLIENT INPUT — Real Google review from James T.]",
  },
  {
    author: "Maria S.",
    rating: 5,
    date: "2024-02-08",
    /* [NEEDS CLIENT INPUT — Real Google review] */
    text: "[NEEDS CLIENT INPUT — Real Google review from Maria S.]",
  },
  {
    author: "Robert K.",
    rating: 5,
    date: "2024-03-22",
    /* [NEEDS CLIENT INPUT — Real Google review] */
    text: "[NEEDS CLIENT INPUT — Real Google review from Robert K.]",
  },
  {
    author: "Linda M.",
    rating: 5,
    date: "2024-04-10",
    /* [NEEDS CLIENT INPUT — Real Google review] */
    text: "[NEEDS CLIENT INPUT — Real Google review from Linda M.]",
  },
  {
    author: "Carlos R.",
    rating: 5,
    date: "2024-05-03",
    /* [NEEDS CLIENT INPUT — Real Google review] */
    text: "[NEEDS CLIENT INPUT — Real Google review from Carlos R.]",
  },
  {
    author: "Jennifer W.",
    rating: 5,
    date: "2024-06-17",
    /* [NEEDS CLIENT INPUT — Real Google review] */
    text: "[NEEDS CLIENT INPUT — Real Google review from Jennifer W.]",
  },
  {
    author: "David P.",
    rating: 5,
    date: "2024-07-29",
    /* [NEEDS CLIENT INPUT — Real Google review] */
    text: "[NEEDS CLIENT INPUT — Real Google review from David P.]",
  },
] as const;

/* ============================================================
   Sub-components
   ============================================================ */

function StarRow({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i < count
              ? "fill-[#f5a623] text-[#f5a623]"
              : "fill-gray-200 text-gray-200"
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function ReviewCard({
  author,
  rating,
  text,
  date,
}: {
  author: string;
  rating: number;
  text: string;
  date: string;
}) {
  const displayDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  const isPlaceholder = text.startsWith("[NEEDS CLIENT INPUT");

  return (
    <article
      className={cn(
        "rounded-2xl border bg-white p-6 shadow-sm",
        "flex flex-col gap-3",
        "hover:shadow-md transition-shadow duration-200",
        isPlaceholder ? "border-amber-200 bg-amber-50/30" : "border-gray-200"
      )}
      aria-label={`Review by ${author}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0f3460] text-white font-bold text-base"
          aria-hidden="true"
        >
          {author.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-[#0f3460] text-sm leading-tight">
            {author}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">{displayDate} · via Google</p>
        </div>
        <StarRow count={rating} />
      </div>

      <blockquote className="text-sm text-gray-600 leading-relaxed border-l-2 border-[#e94560]/30 pl-3">
        {isPlaceholder ? (
          <span className="italic text-amber-700 font-medium">{text}</span>
        ) : (
          text
        )}
      </blockquote>
    </article>
  );
}

/* ============================================================
   Page Component
   ============================================================ */

export default function ReviewsPage() {
  return (
    <>
      {/* JSON-LD — LocalBusiness includes aggregateRating */}
      <JsonLd
        schema={[
          buildLocalBusinessSchema(),
          buildBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Reviews", url: "/reviews" },
          ]),
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        aria-label="Reviews page hero"
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
            Google Reviews
          </p>

          <h1 className="font-display text-3xl font-extrabold leading-tight text-white md:text-5xl">
            Customer Reviews —{" "}
            <span className="text-[#f5a623]">
              Royal Water Damage Fort Myers
            </span>
          </h1>

          {/* AEO block */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
            Royal Water Damage has a 5.0-star rating based on{" "}
            {BUSINESS.rating.count} Google reviews. Our customers consistently
            praise our rapid response times, professional technicians, and
            thorough restoration work across Fort Myers and Southwest Florida.
          </p>
        </div>
      </section>

      {/* ── Aggregate Rating Display ─────────────────────── */}
      <section
        aria-label="Overall rating summary"
        className="bg-white py-12 border-b border-gray-100"
      >
        <div className="mx-auto max-w-sm px-4 text-center">
          <div
            className="text-7xl font-extrabold text-[#0f3460] font-mono leading-none mb-2"
            aria-label={`${BUSINESS.rating.value} out of ${BUSINESS.rating.max} stars`}
          >
            {BUSINESS.rating.value.toFixed(1)}
          </div>

          <div className="flex justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-7 w-7 fill-[#f5a623] text-[#f5a623]"
                aria-hidden="true"
              />
            ))}
          </div>

          <p className="text-gray-500 text-sm">
            Based on{" "}
            <strong className="text-[#0f3460]">
              {BUSINESS.rating.count} reviews
            </strong>{" "}
            · via Google
          </p>

          {/* [NEEDS CLIENT INPUT — verify this review link] */}
          <a
            href="https://search.google.com/local/writereview?placeid=ChIJwftNqaQIf0gR838lvDzbsDA"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "mt-5 inline-flex items-center gap-2 rounded-full",
              "border border-[#0f3460] px-6 py-2.5 text-[#0f3460] font-semibold text-sm",
              "hover:bg-[#0f3460] hover:text-white transition-colors"
            )}
          >
            Write a Review on Google
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </section>

      {/* ── Reviews Grid ─────────────────────────────────── */}
      <section
        aria-labelledby="reviews-grid-heading"
        className="mx-auto max-w-5xl px-4 py-16 md:py-24"
      >
        <h2
          id="reviews-grid-heading"
          className="sr-only"
        >
          Individual customer reviews
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((review) => (
            <ReviewCard key={review.author} {...review} />
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 max-w-lg mx-auto">
          <strong>Note for site owner:</strong> Review card text above is
          placeholder copy. Replace with verbatim Google review text from your
          Google Business Profile before publishing.
        </p>
      </section>

      {/* ── Leave a Review CTA ───────────────────────────── */}
      <section
        aria-label="Leave a review call to action"
        className="bg-[#0f3460] py-16 text-center"
      >
        <div className="mx-auto max-w-xl px-4">
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-6 w-6 fill-[#f5a623] text-[#f5a623]"
                aria-hidden="true"
              />
            ))}
          </div>

          <h2 className="font-display text-2xl font-extrabold text-white md:text-3xl">
            Love Our Work?
          </h2>
          <p className="mt-3 text-white/80 text-base">
            Please share your experience on Google. Your review helps Fort
            Myers homeowners find trustworthy restoration help when they need
            it most.
          </p>

          {/* [NEEDS CLIENT INPUT — verify this review link] */}
          <a
            href="https://search.google.com/local/writereview?placeid=ChIJwftNqaQIf0gR838lvDzbsDA"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "mt-6 inline-flex items-center gap-2 rounded-full",
              "bg-[#f5a623] px-8 py-3.5 text-[#0f3460] font-extrabold text-base",
              "hover:bg-[#f5a623]/90 transition-colors shadow-lg"
            )}
          >
            Write a Review on Google
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>

          <div className="mt-10 pt-8 border-t border-white/20">
            <p className="text-white/70 text-sm mb-3">
              Have a question or need help? We&rsquo;re one call away.
            </p>
            <a
              href={`tel:${BUSINESS.phone}`}
              className={cn(
                "inline-flex items-center gap-2 rounded-full",
                "border border-white/30 px-6 py-2.5 text-white font-semibold text-sm",
                "hover:bg-white/10 transition-colors"
              )}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {BUSINESS.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
