import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface StarRatingProps {
  /** Numeric rating value (e.g. 4.7) */
  rating: number;
  /** Maximum possible rating. Defaults to 5. */
  maxRating?: number;
  /** Render the numeric rating label next to the stars. */
  showNumber?: boolean;
  /** Optionally display a review count after the rating number. */
  reviewCount?: number;
  /** Controls star size. Defaults to "md". */
  size?: "sm" | "md" | "lg";
  /** Additional class names applied to the root element. */
  className?: string;
}

// ---------------------------------------------------------------------------
// Size map
// ---------------------------------------------------------------------------

const SIZE_MAP = {
  sm: { star: 14, gap: "gap-0.5", text: "text-xs" },
  md: { star: 18, gap: "gap-1", text: "text-sm" },
  lg: { star: 24, gap: "gap-1.5", text: "text-base" },
} as const;

// ---------------------------------------------------------------------------
// Individual star SVG
// ---------------------------------------------------------------------------

type StarFill = "full" | "partial" | "empty";

interface StarProps {
  fill: StarFill;
  size: number;
  /** 0–1 fraction of fill when fill === "partial" */
  fraction?: number;
  index: number;
}

function Star({ fill, size, fraction = 0, index }: StarProps) {
  const gradientId = `star-partial-${index}-${Math.round(fraction * 100)}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      {fill === "partial" && (
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
            <stop offset={`${fraction * 100}%`} stopColor="#f59e0b" />
            <stop offset={`${fraction * 100}%`} stopColor="#d1d5db" />
          </linearGradient>
        </defs>
      )}
      <polygon
        points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
        fill={
          fill === "full"
            ? "#f59e0b"
            : fill === "partial"
              ? `url(#${gradientId})`
              : "#d1d5db"
        }
        stroke={fill === "empty" ? "#d1d5db" : "none"}
        strokeWidth={fill === "empty" ? "1" : "0"}
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// StarRating — server component
// ---------------------------------------------------------------------------

export function StarRating({
  rating,
  maxRating = 5,
  showNumber = true,
  reviewCount,
  size = "md",
  className,
}: StarRatingProps) {
  const { star: starSize, gap, text } = SIZE_MAP[size];

  // Clamp rating to valid range
  const clampedRating = Math.min(Math.max(rating, 0), maxRating);

  // Build array of fill types for each star position
  const stars: { fill: StarFill; fraction: number }[] = Array.from(
    { length: maxRating },
    (_, i) => {
      const position = i + 1;
      if (clampedRating >= position) {
        return { fill: "full", fraction: 1 };
      } else if (clampedRating > i) {
        return { fill: "partial", fraction: clampedRating - i };
      }
      return { fill: "empty", fraction: 0 };
    }
  );

  // Format rating to one decimal place, removing trailing .0 if whole
  const ratingLabel =
    Number.isInteger(clampedRating)
      ? String(clampedRating)
      : clampedRating.toFixed(1);

  return (
    <div
      className={cn("inline-flex items-center", gap, className)}
      role="img"
      aria-label={`${ratingLabel} out of ${maxRating} stars${reviewCount != null ? `, based on ${reviewCount} reviews` : ""}`}
    >
      {/* Stars */}
      <span className={cn("inline-flex items-center", gap)}>
        {stars.map((s, i) => (
          <Star
            key={i}
            index={i}
            fill={s.fill}
            fraction={s.fraction}
            size={starSize}
          />
        ))}
      </span>

      {/* Numeric label */}
      {showNumber && (
        <span
          className={cn("font-semibold text-gray-800 leading-none", text)}
          aria-hidden="true"
        >
          {ratingLabel}
          {reviewCount != null && (
            <span className="font-normal text-gray-500 ml-1">
              ({reviewCount.toLocaleString()})
            </span>
          )}
        </span>
      )}
    </div>
  );
}
