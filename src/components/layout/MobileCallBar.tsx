import { MobileBarPhone } from "@/components/ui/PhoneLink";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * MobileCallBar — fixed bottom bar for mobile (hidden on md+).
 * Left: PhoneLink with GA4 tracking + DNI support.
 * Right: Get Free Quote → /contact.
 * Height: 56px + safe-area-inset-bottom for iPhone home indicator.
 */
export function MobileCallBar() {
  return (
    <div
      className={cn("fixed bottom-0 left-0 right-0 z-50 md:hidden flex")}
      style={{ height: "calc(56px + env(safe-area-inset-bottom))" }}
      role="navigation"
      aria-label="Quick contact actions"
    >
      {/* Left — Call Now (PhoneLink: GA4 tracked + DNI ready) */}
      <MobileBarPhone className="pb-[env(safe-area-inset-bottom)]" />

      {/* Divider */}
      <div className="w-px bg-white/20" aria-hidden="true" />

      {/* Right — Get Free Quote */}
      <Link
        href="/contact"
        className={cn(
          "flex-1 flex items-center justify-center gap-2",
          "bg-[#e94560] text-white font-bold text-sm",
          "pb-[env(safe-area-inset-bottom)]",
          "hover:bg-[#e94560]/90 active:bg-[#e94560]/80",
          "transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-inset"
        )}
        aria-label="Get a free quote"
      >
        <svg
          className="w-4 h-4 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
          <rect x="9" y="3" width="6" height="4" rx="1" />
          <path d="M9 12h6M9 16h4" />
        </svg>
        <span>Get Free Quote</span>
      </Link>
    </div>
  );
}
