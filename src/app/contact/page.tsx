import type { Metadata } from "next";
import { JsonLd } from "@/components/schema/JsonLd";
import { buildLocalBusinessSchema, buildBreadcrumbSchema } from "@/lib/schema";
import { BUSINESS } from "@/data/business";
import { LeadForm } from "@/components/ui/LeadForm";
import { cn } from "@/lib/utils";
import { Phone, MapPin, Mail, Clock } from "lucide-react";

/* ============================================================
   Metadata
   ============================================================ */

export const metadata: Metadata = {
  title: "Contact Royal Water Damage | Fort Myers Emergency Line",
  description:
    "Call (864) 734-5702 to reach Royal Water Damage 24/7, Sunday through Friday. Fort Myers water damage emergency line — average response under 60 minutes.",
  alternates: {
    canonical: "https://royalwaterdamagefortmyers.com/contact",
  },
  openGraph: {
    title: "Contact Royal Water Damage | Fort Myers Emergency Line",
    description:
      "Water damage emergency in Fort Myers? Call (864) 734-5702 — we answer live 24/7, Sunday through Friday. Or fill out our form for a callback within 2 hours.",
    url: "https://royalwaterdamagefortmyers.com/contact",
  },
};

/* ============================================================
   Page Component
   ============================================================ */

export default function ContactPage() {
  return (
    <>
      {/* JSON-LD */}
      <JsonLd
        schema={[
          buildLocalBusinessSchema(),
          buildBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Contact", url: "/contact" },
          ]),
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        aria-label="Contact page hero"
        className={cn(
          "relative overflow-hidden",
          "bg-gradient-to-br from-[#0f3460] via-[#0f3460]/95 to-[#0f3460]/80",
          "py-20 md:py-24"
        )}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full border border-white/10"
        />

        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#f5a623]">
            Available 24/7 · Sunday–Friday
          </p>

          <h1 className="font-display text-3xl font-extrabold leading-tight text-white md:text-5xl">
            Contact Royal Water Damage —{" "}
            <span className="text-[#f5a623]">
              Fort Myers Emergency Line
            </span>
          </h1>

          {/* AEO block */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
            Call{" "}
            <a
              href={`tel:${BUSINESS.phone}`}
              className="font-bold text-white underline underline-offset-2 hover:text-[#f5a623] transition-colors"
            >
              {BUSINESS.phoneDisplay}
            </a>{" "}
            to reach Royal Water Damage 24/7 (Sunday through Friday). For
            non-emergency inquiries, use the form below and we&rsquo;ll respond
            within 2 hours during business hours.
          </p>
        </div>
      </section>

      {/* ── Large Contact Info Block ──────────────────────── */}
      <section
        aria-label="Primary contact information"
        className="bg-white border-b border-gray-100 py-10"
      >
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {/* Phone */}
            <div className="flex flex-col items-center text-center rounded-2xl border border-[#e94560]/30 bg-[#e94560]/5 p-6">
              <Phone
                className="h-7 w-7 text-[#e94560] mb-3"
                aria-hidden="true"
              />
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                Emergency Line
              </p>
              <a
                href={`tel:${BUSINESS.phone}`}
                className="font-extrabold text-[#0f3460] text-2xl leading-tight hover:text-[#e94560] transition-colors"
                aria-label={`Call ${BUSINESS.phoneDisplay}`}
              >
                {BUSINESS.phoneDisplay}
              </a>
              <p className="mt-1 text-xs text-gray-400">Click to call</p>
            </div>

            {/* Hours */}
            <div className="flex flex-col items-center text-center rounded-2xl border border-gray-200 bg-gray-50 p-6">
              <Clock
                className="h-7 w-7 text-[#0f3460] mb-3"
                aria-hidden="true"
              />
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                Hours
              </p>
              <p className="font-bold text-[#0f3460] text-sm leading-snug">
                Available 24/7
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Sunday through Friday
              </p>
              <p className="text-xs text-[#e94560] font-semibold mt-0.5">
                Closed Saturday
              </p>
            </div>

            {/* Address */}
            <div className="flex flex-col items-center text-center rounded-2xl border border-gray-200 bg-gray-50 p-6">
              <MapPin
                className="h-7 w-7 text-[#0f3460] mb-3"
                aria-hidden="true"
              />
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                Location
              </p>
              {/* [NEEDS CLIENT INPUT — Street Address] */}
              <address className="not-italic text-sm text-gray-700 font-semibold leading-snug">
                {BUSINESS.address.streetAddress}
                <br />
                {BUSINESS.address.city}, {BUSINESS.address.stateCode}{" "}
                {BUSINESS.address.zip}
              </address>
            </div>

            {/* Email */}
            <div className="flex flex-col items-center text-center rounded-2xl border border-gray-200 bg-gray-50 p-6">
              <Mail
                className="h-7 w-7 text-[#0f3460] mb-3"
                aria-hidden="true"
              />
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                Email
              </p>
              <a
                href={`mailto:${BUSINESS.email}`}
                className="font-semibold text-[#0f3460] text-sm break-all hover:text-[#e94560] transition-colors"
              >
                {BUSINESS.email}
              </a>
              <p className="text-xs text-gray-400 mt-1">
                Response within 2 hrs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Two-column Layout ────────────────────────────── */}
      <section
        aria-label="Contact form and additional information"
        className="mx-auto max-w-6xl px-4 py-16 md:py-24"
      >
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Left — Lead Form */}
          <div>
            <LeadForm heading="Send Us a Message" />
          </div>

          {/* Right — Prefer to call + map + hours */}
          <div className="space-y-8">

            {/* Prefer to call */}
            <div className="rounded-2xl border border-[#e94560]/30 bg-[#e94560]/5 p-7">
              <h2 className="font-display text-xl font-extrabold text-[#0f3460] mb-2">
                Prefer to Call?
              </h2>
              <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                We answer live — no phone trees, no voicemail. One call
                connects you directly with a restoration coordinator who can
                dispatch a crew while you&rsquo;re still on the line.
              </p>
              <a
                href={`tel:${BUSINESS.phone}`}
                className={cn(
                  "flex items-center justify-center gap-3 rounded-full",
                  "bg-[#e94560] px-6 py-4 text-white font-extrabold text-2xl",
                  "hover:bg-[#e94560]/90 transition-colors shadow-md"
                )}
                aria-label={`Call ${BUSINESS.phoneDisplay} now`}
              >
                <Phone className="h-6 w-6 shrink-0" aria-hidden="true" />
                {BUSINESS.phoneDisplay}
              </a>
              <p className="mt-3 text-center text-xs text-gray-500">
                Available 24/7 · Sunday through Friday
              </p>
            </div>

            {/* Business Hours Table */}
            <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
              <div className="bg-[#0f3460] px-5 py-3">
                <h3 className="font-bold text-white text-sm uppercase tracking-wider">
                  Business Hours
                </h3>
              </div>
              <table className="w-full text-sm" aria-label="Business hours">
                <tbody className="divide-y divide-gray-100">
                  {BUSINESS.hoursDisplay.map((row, i) => (
                    <tr
                      key={row.day}
                      className={i % 2 === 0 ? "bg-white" : "bg-gray-50/60"}
                    >
                      <td className="px-5 py-3 font-semibold text-[#0f3460]">
                        {row.day}
                      </td>
                      <td
                        className={cn(
                          "px-5 py-3 text-right font-medium",
                          row.hours === "Closed"
                            ? "text-[#e94560]"
                            : "text-gray-700"
                        )}
                      >
                        {row.hours}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Map */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
              <iframe
                src={BUSINESS.googleMapsEmbed}
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Royal Water Damage location map — Fort Myers, FL"
                aria-label="Google Map showing Royal Water Damage in Fort Myers, Florida"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
