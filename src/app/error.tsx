"use client";

import { useEffect } from "react";
import Link from "next/link";

interface ErrorPageProps {
  /** The error object passed by Next.js */
  error: Error & { digest?: string };
  /** Callback to attempt re-rendering the segment */
  reset: () => void;
}

/**
 * Error boundary page — catches unhandled runtime errors in the
 * root layout's subtree and gives the user a graceful exit.
 *
 * Must be a client component (`"use client"`) — Next.js requirement.
 */
export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log to an error-reporting service in production
    console.error("[ErrorBoundary]", error);
  }, [error]);

  return (
    <section
      className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-20 text-center"
      aria-labelledby="error-heading"
    >
      {/* Decorative icon */}
      <div
        className="flex items-center justify-center w-20 h-20 rounded-full bg-accent/10 mb-6"
        aria-hidden="true"
      >
        <svg
          className="w-10 h-10 text-accent"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          />
        </svg>
      </div>

      {/* Heading */}
      <h1
        id="error-heading"
        className="font-display text-3xl sm:text-4xl font-bold text-text-primary text-balance"
      >
        Something Went Wrong
      </h1>

      {/* Message */}
      <p className="mt-4 max-w-md text-text-muted text-lg leading-relaxed">
        An unexpected error occurred. Please try again — if the problem
        persists, don&apos;t hesitate to contact us directly.
      </p>

      {/* Error digest for support reference */}
      {error.digest && (
        <p className="mt-2 text-sm text-text-muted font-mono">
          Reference:{" "}
          <span className="text-brand-blue">{error.digest}</span>
        </p>
      )}

      {/* Actions */}
      <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
        {/* Retry button */}
        <button
          onClick={reset}
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-blue text-white font-semibold px-7 py-3 hover:bg-brand-blue/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
        >
          {/* Refresh icon */}
          <svg
            className="w-4 h-4 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
          Try Again
        </button>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-brand-blue text-brand-blue font-semibold px-7 py-3 hover:bg-brand-blue/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
        >
          ← Back to Homepage
        </Link>
      </div>

      {/* Emergency contact strip */}
      <div className="mt-12 flex flex-col items-center gap-2 text-text-muted text-sm">
        <p>Need immediate help with water damage?</p>
        <a
          href="tel:+18647345702"
          className="font-mono font-bold text-accent text-lg hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded"
          aria-label="Call Royal Water Damage at (864) 734-5702"
        >
          (864) 734-5702
        </a>
        <p className="text-xs">Available 24 / 7 — live answer, no voicemail</p>
      </div>
    </section>
  );
}
