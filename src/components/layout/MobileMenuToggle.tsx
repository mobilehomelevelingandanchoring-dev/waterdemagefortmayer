"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils";

export function MobileMenuToggle() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "lg:hidden flex items-center justify-center w-9 h-9 rounded-full",
          "text-gray-700 hover:bg-gray-100 transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f3460]"
        )}
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
