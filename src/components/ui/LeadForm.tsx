"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { BUSINESS } from "@/data/business";

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------

const leadFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z
    .string()
    .min(10, "Valid phone number required")
    .regex(/[\d\s\-\(\)\+]+/, "Enter a valid phone number"),
  address: z.string().min(3, "Address or ZIP required"),
  issue: z.string().min(10, "Please describe your issue briefly"),
  urgency: z.enum(["emergency", "same-day", "scheduled"]),
});

type LeadFormValues = z.infer<typeof leadFormSchema>;

// ---------------------------------------------------------------------------
// Urgency options
// ---------------------------------------------------------------------------

const URGENCY_OPTIONS = [
  {
    value: "emergency" as const,
    label: "🚨 Emergency (right now)",
    description: "Active water, sewage, or fire damage",
  },
  {
    value: "same-day" as const,
    label: "⏰ Today / ASAP",
    description: "Urgent but not actively flooding",
  },
  {
    value: "scheduled" as const,
    label: "📅 Schedule Later",
    description: "Inspection, mold check, or future work",
  },
] as const;

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function FieldLabel({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-semibold text-[#0f3460] mb-1"
    >
      {children}
      {required && (
        <span className="text-[#e94560] ml-0.5" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}

function FieldError({ message }: { message: string | undefined }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-1 text-xs text-[#e94560] font-medium">
      {message}
    </p>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export interface LeadFormProps {
  className?: string;
  /** Override the default heading */
  heading?: string;
}

export function LeadForm({ className, heading }: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string>("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      urgency: "same-day",
    },
    mode: "onBlur",
  });

  const urgencyValue = watch("urgency");
  const isEmergency = urgencyValue === "emergency";

  const onSubmit = async (data: LeadFormValues) => {
    setStatus("loading");
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = (await res.json()) as { success: boolean; error?: string };

      if (!res.ok || !json.success) {
        throw new Error(json.error ?? "Submission failed. Please try again.");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setServerError(
        err instanceof Error ? err.message : "Something went wrong. Please call us directly."
      );
    }
  };

  // -------------------------------------------------------------------------
  // Success state
  // -------------------------------------------------------------------------

  if (status === "success") {
    return (
      <div
        className={cn(
          "rounded-2xl border border-green-200 bg-green-50 p-8 text-center",
          className
        )}
        role="status"
        aria-live="polite"
      >
        <div className="text-4xl mb-3">✅</div>
        <h3 className="text-xl font-bold text-[#0f3460] mb-2">
          We received your request!
        </h3>
        <p className="text-gray-600 mb-4">
          Our team will call you within minutes. If this is an active emergency,
          please call us directly right now:
        </p>
        <a
          href={`tel:${BUSINESS.phone}`}
          className={cn(
            "inline-flex items-center gap-2 rounded-full bg-[#e94560] px-7 py-3",
            "text-white font-bold text-lg hover:bg-[#e94560]/90 transition-colors"
          )}
        >
          📞 {BUSINESS.phoneDisplay}
        </a>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // Form state
  // -------------------------------------------------------------------------

  return (
    <div
      className={cn(
        "rounded-2xl border bg-white p-6 md:p-8 shadow-sm",
        isEmergency
          ? "border-[#e94560] ring-2 ring-[#e94560]/30"
          : "border-gray-200",
        className
      )}
    >
      {/* Heading */}
      <h2 className="text-xl font-bold text-[#0f3460] mb-1">
        {heading ?? "Get Free Emergency Assessment"}
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        No commitment — we answer live 24/7.
      </p>

      {/* Server error banner */}
      {status === "error" && serverError && (
        <div
          role="alert"
          aria-live="assertive"
          className="mb-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700"
        >
          <strong className="font-semibold">Error: </strong>
          {serverError}
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        aria-label="Contact form"
      >
        <div className="space-y-5">
          {/* Name */}
          <div>
            <FieldLabel htmlFor="name" required>
              Full Name
            </FieldLabel>
            <input
              id="name"
              type="text"
              autoComplete="name"
              placeholder="Jane Smith"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              {...register("name")}
              className={cn(
                "w-full rounded-lg border px-4 py-2.5 text-sm",
                "placeholder:text-gray-400 text-gray-900",
                "focus:outline-none focus:ring-2 focus:ring-[#0f3460] focus:border-transparent",
                "transition-colors duration-150",
                errors.name
                  ? "border-[#e94560] bg-red-50"
                  : "border-gray-300 bg-white hover:border-gray-400"
              )}
            />
            <FieldError message={errors.name?.message} />
          </div>

          {/* Phone — first after name: highest conversion value */}
          <div>
            <FieldLabel htmlFor="phone" required>
              Phone Number
            </FieldLabel>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder="(239) 555-0100"
              inputMode="tel"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              {...register("phone")}
              className={cn(
                "w-full rounded-lg border px-4 py-2.5 text-sm",
                "placeholder:text-gray-400 text-gray-900",
                "focus:outline-none focus:ring-2 focus:ring-[#0f3460] focus:border-transparent",
                "transition-colors duration-150",
                errors.phone
                  ? "border-[#e94560] bg-red-50"
                  : "border-gray-300 bg-white hover:border-gray-400"
              )}
            />
            <FieldError message={errors.phone?.message} />
          </div>

          {/* Address / ZIP */}
          <div>
            <FieldLabel htmlFor="address" required>
              Address or ZIP Code
            </FieldLabel>
            <input
              id="address"
              type="text"
              autoComplete="street-address"
              placeholder="123 Palm Ave, Fort Myers or 33901"
              aria-invalid={!!errors.address}
              aria-describedby={errors.address ? "address-error" : undefined}
              {...register("address")}
              className={cn(
                "w-full rounded-lg border px-4 py-2.5 text-sm",
                "placeholder:text-gray-400 text-gray-900",
                "focus:outline-none focus:ring-2 focus:ring-[#0f3460] focus:border-transparent",
                "transition-colors duration-150",
                errors.address
                  ? "border-[#e94560] bg-red-50"
                  : "border-gray-300 bg-white hover:border-gray-400"
              )}
            />
            <FieldError message={errors.address?.message} />
          </div>

          {/* Issue description */}
          <div>
            <FieldLabel htmlFor="issue" required>
              Describe the Issue
            </FieldLabel>
            <textarea
              id="issue"
              rows={3}
              placeholder="e.g. Burst pipe in kitchen, water on floor, mold smell in bathroom..."
              aria-invalid={!!errors.issue}
              aria-describedby={errors.issue ? "issue-error" : undefined}
              {...register("issue")}
              className={cn(
                "w-full rounded-lg border px-4 py-2.5 text-sm resize-none",
                "placeholder:text-gray-400 text-gray-900",
                "focus:outline-none focus:ring-2 focus:ring-[#0f3460] focus:border-transparent",
                "transition-colors duration-150",
                errors.issue
                  ? "border-[#e94560] bg-red-50"
                  : "border-gray-300 bg-white hover:border-gray-400"
              )}
            />
            <FieldError message={errors.issue?.message} />
          </div>

          {/* Urgency radio group */}
          <fieldset>
            <legend className="block text-sm font-semibold text-[#0f3460] mb-2">
              How Urgent Is This?{" "}
              <span className="text-[#e94560]" aria-hidden="true">
                *
              </span>
            </legend>
            <div className="space-y-2" role="group" aria-label="Urgency level">
              {URGENCY_OPTIONS.map((option) => {
                const isSelected = urgencyValue === option.value;
                return (
                  <label
                    key={option.value}
                    className={cn(
                      "flex items-start gap-3 rounded-lg border px-4 py-3 cursor-pointer",
                      "transition-all duration-150",
                      isSelected
                        ? option.value === "emergency"
                          ? "border-[#e94560] bg-red-50 ring-1 ring-[#e94560]"
                          : "border-[#0f3460] bg-[#0f3460]/5 ring-1 ring-[#0f3460]"
                        : "border-gray-200 bg-white hover:border-gray-400"
                    )}
                  >
                    <input
                      type="radio"
                      value={option.value}
                      {...register("urgency")}
                      className="mt-0.5 h-4 w-4 accent-[#e94560] shrink-0"
                      aria-describedby={`urgency-desc-${option.value}`}
                    />
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-gray-900">
                        {option.label}
                      </span>
                      <span
                        id={`urgency-desc-${option.value}`}
                        className="block text-xs text-gray-500 mt-0.5"
                      >
                        {option.description}
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
            <FieldError message={errors.urgency?.message} />
          </fieldset>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "loading"}
            className={cn(
              "w-full flex items-center justify-center gap-2 rounded-full",
              "bg-[#e94560] text-white font-bold text-base md:text-lg",
              "py-3.5 px-8",
              "hover:bg-[#e94560]/90 active:scale-[0.99]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e94560] focus-visible:ring-offset-2",
              "transition-all duration-150 select-none",
              "disabled:opacity-70 disabled:pointer-events-none",
              "animate-emergency-pulse"
            )}
            aria-live="polite"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                <span>Sending…</span>
              </>
            ) : (
              "Get Free Emergency Assessment"
            )}
          </button>

          <p className="text-center text-xs text-gray-400">
            No spam. No pressure. We never sell your information.
          </p>
        </div>
      </form>
    </div>
  );
}
