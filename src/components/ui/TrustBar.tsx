import { cn } from "@/lib/utils";
import { BUSINESS } from "@/data/business";

interface TrustItemProps {
  icon: React.ReactNode;
  label: string;
  subLabel?: string;
  className?: string;
}

function TrustItem({ icon, label, subLabel, className }: TrustItemProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 shrink-0",
        "py-2 px-3 rounded-lg",
        className
      )}
    >
      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#0f3460]/10 shrink-0" aria-hidden="true">
        {icon}
      </span>
      <div className="leading-tight">
        <p className="text-sm font-bold text-gray-800 whitespace-nowrap">{label}</p>
        {subLabel && <p className="text-xs text-gray-500">{subLabel}</p>}
      </div>
    </div>
  );
}

function StarIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-[#f5a623]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-[#0f3460]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-[#0f3460]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-[#0f3460]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function AwardIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-[#0f3460]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}

interface TrustBarProps {
  /** Set to true for compact / inline variant (e.g. inside hero) */
  compact?: boolean;
  className?: string;
}

/**
 * TrustBar — horizontal trust signals strip.
 * Scrolls horizontally on mobile; flex row on desktop.
 * Server component — no client interactivity.
 *
 * @example
 * <TrustBar />
 * <TrustBar compact className="my-4" />
 */
export function TrustBar({ compact = false, className }: TrustBarProps) {
  const { rating } = BUSINESS;

  const items = [
    {
      icon: <StarIcon />,
      label: `${rating.value.toFixed(1)} ★ Rating`,
      subLabel: `${rating.count} Google Reviews`,
    },
    {
      icon: <ShieldIcon />,
      label: "Licensed & Insured",
      subLabel: "Fully bonded",
    },
    {
      icon: <ClockIcon />,
      label: "24/7 Availability",
      subLabel: "Live answer — no voicemail",
    },
    {
      icon: <AwardIcon />,
      label: "IICRC Certified",
      subLabel: "[NEEDS CLIENT INPUT]",
    },
    {
      icon: <CheckIcon />,
      label: "60-Min Response",
      subLabel: "Fort Myers area",
    },
  ];

  return (
    <div
      className={cn(
        "w-full",
        compact ? "py-2" : "py-3 border-y border-gray-100 bg-white",
        className
      )}
      aria-label="Trust signals"
      role="region"
    >
      {/* Scroll container — scrolls on mobile, flex-wrap on desktop */}
      <div
        className={cn(
          "flex items-center",
          compact
            ? "gap-1 flex-wrap justify-center"
            : [
                // Mobile: scrollable row
                "overflow-x-auto scrollbar-hide",
                "flex-nowrap gap-1",
                "px-4 sm:px-6 lg:px-8",
                // Desktop: centered, wraps if needed
                "lg:flex-wrap lg:justify-center lg:overflow-visible",
              ]
        )}
      >
        {items.map((item, index) => (
          <TrustItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            subLabel={compact ? undefined : item.subLabel}
            className={cn(
              compact && "px-2 py-1",
              // Visual separator between items on desktop
              !compact && index !== items.length - 1 && "lg:border-r lg:border-gray-200 lg:mr-1"
            )}
          />
        ))}
      </div>
    </div>
  );
}
