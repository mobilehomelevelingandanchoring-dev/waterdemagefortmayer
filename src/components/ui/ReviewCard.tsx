import { cn } from "@/lib/utils";

export interface ReviewCardProps {
  author: string;
  /** Star rating 1–5 */
  rating: number;
  text: string;
  /** ISO date string or human-readable date */
  date: string;
  /** Review platform, e.g. "Google" */
  source?: string;
}

/** Renders filled (★) and empty (☆) star characters */
function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  const clamped = Math.min(Math.max(Math.round(rating), 0), max);
  return (
    <span className="flex items-center gap-0.5" aria-label={`${clamped} out of ${max} stars`}>
      {Array.from({ length: max }, (_, i) => (
        <svg
          key={i}
          className={cn(
            "w-4 h-4",
            i < clamped ? "text-[#f5a623]" : "text-gray-200"
          )}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

/** Google "G" logo mark — inline SVG, no external assets */
function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

/**
 * ReviewCard — displays a single customer review.
 * Server component — no client interactivity.
 *
 * @example
 * <ReviewCard
 *   author="Jane D."
 *   rating={5}
 *   text="Royal Water Damage was at my house within the hour. Absolutely professional."
 *   date="June 2024"
 *   source="Google"
 * />
 */
export function ReviewCard({ author, rating, text, date, source = "Google" }: ReviewCardProps) {
  return (
    <article
      className={cn(
        "bg-white rounded-2xl border border-gray-100 shadow-sm",
        "p-6 flex flex-col gap-4",
        "hover:shadow-md transition-shadow duration-200"
      )}
      aria-label={`Review by ${author}`}
    >
      {/* Header: stars + source badge */}
      <div className="flex items-start justify-between gap-3">
        <StarRating rating={rating} />

        {source && (
          <span className="flex items-center gap-1.5 text-xs text-gray-400 font-medium shrink-0">
            <GoogleLogo className="w-3.5 h-3.5" />
            via {source}
          </span>
        )}
      </div>

      {/* Review text */}
      <blockquote className="text-gray-700 text-sm leading-relaxed italic">
        &ldquo;{text}&rdquo;
      </blockquote>

      {/* Footer: author + date */}
      <footer className="flex items-center justify-between gap-2 pt-1 border-t border-gray-50">
        <div className="flex items-center gap-2.5">
          {/* Avatar initials */}
          <span
            className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0f3460]/10 text-[#0f3460] text-xs font-bold uppercase shrink-0"
            aria-hidden="true"
          >
            {author.charAt(0)}
          </span>
          <span className="text-sm font-semibold text-gray-800">{author}</span>
        </div>
        <time
          dateTime={date}
          className="text-xs text-gray-400"
        >
          {date}
        </time>
      </footer>
    </article>
  );
}
