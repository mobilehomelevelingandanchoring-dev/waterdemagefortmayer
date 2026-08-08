import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS } from "@/data/business";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you were looking for could not be found. Royal Water Damage serves Fort Myers, FL 24/7.",
  robots: { index: false, follow: true },
};

/**
 * 404 — Not Found page
 *
 * Shows a friendly message with links back to the homepage and an
 * emergency CTA with the business phone number.
 */
export default function NotFound() {
  return (
    <section
      className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-20 text-center"
      aria-labelledby="not-found-heading"
    >
      {/* Large decorative number */}
      <p
        className="font-display font-extrabold text-[8rem] sm:text-[10rem] leading-none text-brand-blue/10 select-none"
        aria-hidden="true"
      >
        404
      </p>

      {/* Heading */}
      <h1
        id="not-found-heading"
        className="font-display text-3xl sm:text-4xl font-bold text-text-primary mt-2 text-balance"
      >
        Page Not Found
      </h1>

      {/* Description */}
      <p className="mt-4 max-w-md text-text-muted text-lg leading-relaxed">
        Sorry — we couldn&apos;t find the page you were looking for. It may
        have moved, been removed, or the link might be incorrect.
      </p>

      {/* Navigation actions */}
      <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-blue text-white font-semibold px-7 py-3 hover:bg-brand-blue/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
        >
          ← Back to Homepage
        </Link>

        <Link
          href="/services"
          className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-brand-blue text-brand-blue font-semibold px-7 py-3 hover:bg-brand-blue/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
        >
          View Our Services
        </Link>
      </div>

      {/* Emergency CTA */}
      <div className="mt-12 flex flex-col items-center gap-3 rounded-2xl bg-accent/5 border border-accent/20 px-8 py-6 max-w-sm w-full">
        <span
          className="badge-emergency"
          aria-label="24/7 Emergency line available"
        >
          <span aria-hidden="true">●</span> 24/7 Emergency
        </span>

        <p className="text-text-muted text-sm">
          Dealing with a water emergency? We answer live around the clock.
        </p>

        <a
          href={`tel:${BUSINESS.phone}`}
          className="inline-flex items-center justify-center gap-2 w-full rounded-full bg-accent text-white font-bold text-lg py-3 px-6 hover:bg-accent/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          aria-label={`Call ${BUSINESS.name} at ${BUSINESS.phoneDisplay}`}
        >
          {/* Phone icon SVG */}
          <svg
            className="w-5 h-5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
            />
          </svg>
          <span className="font-mono">{BUSINESS.phoneDisplay}</span>
        </a>
      </div>
    </section>
  );
}
