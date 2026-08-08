import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base styles
  cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-bold rounded-full transition-all duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "select-none"
  ),
  {
    variants: {
      variant: {
        /** Navy blue bg, white text — primary CTA */
        primary: cn(
          "bg-[#0f3460] text-white",
          "hover:bg-[#0f3460]/90 active:scale-[0.98]",
          "focus-visible:ring-[#0f3460]"
        ),
        /** White bg, navy border + text */
        secondary: cn(
          "bg-white text-[#0f3460] border-2 border-[#0f3460]",
          "hover:bg-[#0f3460]/5 active:scale-[0.98]",
          "focus-visible:ring-[#0f3460]"
        ),
        /** Outline — white bg, navy border */
        outline: cn(
          "bg-white text-[#0f3460] border-2 border-[#0f3460]",
          "hover:bg-[#0f3460] hover:text-white active:scale-[0.98]",
          "focus-visible:ring-[#0f3460]"
        ),
        /** Ghost — transparent bg */
        ghost: cn(
          "bg-transparent text-[#0f3460]",
          "hover:bg-[#0f3460]/10 active:scale-[0.98]",
          "focus-visible:ring-[#0f3460]"
        ),
        /** Emergency — red bg, pulsing ring animation */
        emergency: cn(
          "bg-[#e94560] text-white",
          "hover:bg-[#e94560]/90 active:scale-[0.98]",
          "focus-visible:ring-[#e94560]",
          "animate-emergency-pulse"
        ),
      },
      size: {
        sm: "h-8 px-4 text-xs gap-1.5",
        md: "h-10 px-5 text-sm",
        lg: "h-12 px-7 text-base",
        xl: "h-14 px-9 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render as an anchor tag when href is provided */
  href?: string;
  /** Use Radix Slot to pass button styles to a child element */
  asChild?: boolean;
}

/**
 * Button — versatile branded button component.
 *
 * When `href` is provided, renders as `<a>`.
 * When `asChild` is true, merges styles into the child via Radix Slot.
 * Otherwise renders as a `<button>`.
 *
 * @example
 * // Primary CTA
 * <Button variant="primary" size="lg">Get Free Quote</Button>
 *
 * // Click-to-call emergency
 * <Button variant="emergency" href="tel:+18647345702" size="lg">Call 24/7</Button>
 *
 * // Outline link
 * <Button variant="outline" href="/services">Our Services</Button>
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, href, asChild = false, children, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size }), className);

    // Render as anchor when href is supplied
    if (href) {
      return (
        <a
          href={href}
          className={classes}
          // Forward ref not applicable to anchor, but keep aria props
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }

    // Render as Radix Slot (passes styles to child component)
    if (asChild) {
      return (
        <Slot ref={ref} className={classes} {...props}>
          {children}
        </Slot>
      );
    }

    // Default: render as <button>
    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
