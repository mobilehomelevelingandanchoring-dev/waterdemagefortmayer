import Link from "next/link";
import {
  Droplets,
  Wind,
  Flame,
  AlertTriangle,
  Waves,
  CloudLightning,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

/** Map of all 7 service icon names to Lucide components */
const ICON_MAP: Record<string, React.ElementType> = {
  Droplets,
  Wind,
  Flame,
  AlertTriangle,
  Waves,
  CloudLightning,
  Zap,
};

export interface ServiceCardProps {
  slug: string;
  title: string;
  tagline: string;
  /** Lucide icon name — one of Droplets | Wind | Flame | AlertTriangle | Waves | CloudLightning | Zap */
  icon: string;
  /** Featured cards get extra visual weight */
  featured?: boolean;
}

/**
 * ServiceCard — used in service grids across the site.
 * Server component — no client interactivity.
 *
 * @example
 * <ServiceCard
 *   slug="water-damage-restoration"
 *   title="Water Damage Restoration"
 *   tagline="Fast, certified water damage cleanup — 24/7 response."
 *   icon="Droplets"
 *   featured
 * />
 */
export function ServiceCard({ slug, title, tagline, icon, featured = false }: ServiceCardProps) {
  const Icon = ICON_MAP[icon] ?? Droplets;

  return (
    <Link
      href={`/services/${slug}`}
      className={cn(
        // Base card
        "group relative flex flex-col bg-white rounded-2xl overflow-hidden",
        "border border-gray-100",
        "shadow-sm hover:shadow-lg",
        "transition-all duration-300 ease-out",
        // Hover lift
        "hover:-translate-y-1",
        // Featured outline
        featured && "ring-2 ring-[#0f3460]/20"
      )}
      aria-label={`Learn more about ${title}`}
    >
      {/* Top accent border — grows on hover */}
      <span
        className={cn(
          "absolute top-0 left-0 right-0 h-1 rounded-t-2xl",
          "bg-[#0f3460]",
          "transition-all duration-300 group-hover:h-1.5"
        )}
        aria-hidden="true"
      />

      {/* Featured badge */}
      {featured && (
        <span className="absolute top-4 right-4 bg-[#f5a623] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
          Popular
        </span>
      )}

      <div className="flex flex-col flex-1 p-6 pt-7">
        {/* Icon */}
        <div
          className={cn(
            "flex items-center justify-center w-12 h-12 rounded-xl mb-4",
            "bg-[#0f3460]/10",
            "transition-colors duration-200 group-hover:bg-[#0f3460]/15"
          )}
          aria-hidden="true"
        >
          <Icon
            className={cn(
              "w-6 h-6 text-[#0f3460]",
              "transition-transform duration-300 group-hover:scale-110"
            )}
          />
        </div>

        {/* Title */}
        <h3
          className={cn(
            "text-[#0f3460] font-bold text-lg leading-snug mb-2",
            "transition-colors duration-150 group-hover:text-[#0f3460]"
          )}
        >
          {title}
        </h3>

        {/* Tagline */}
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1">
          {tagline}
        </p>

        {/* CTA */}
        <div className="mt-5 flex items-center text-[#0f3460] font-semibold text-sm">
          <span className="transition-colors duration-150 group-hover:text-[#e94560]">
            Learn More
          </span>
          <span
            className="ml-1.5 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          >
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
