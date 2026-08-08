import type { Metadata } from "next";
import { JsonLd } from "@/components/schema/JsonLd";
import { buildLocalBusinessSchema } from "@/lib/schema";
import { BUSINESS } from "@/data/business";
import { LeadForm } from "@/components/ui/LeadForm";
import { cn } from "@/lib/utils";
import { Phone, AlertTriangle, CheckCircle2 } from "lucide-react";

/* ============================================================
   Metadata
   ============================================================ */

export const metadata: Metadata = {
  title: "24/7 Water Emergency Response Fort Myers | Royal Water Damage",
  description:
    "Flooding right now in Fort Myers? Call Royal Water Damage at (864) 734-5702. We respond 24/7 Sunday–Friday. Average on-site time: 60 minutes.",
  alternates: {
    canonical: "https://royalwaterdamagefortmyers.com/emergency",
  },
  openGraph: {
    title: "Water Emergency in Fort Myers? Call Now — 24/7 Response",
    description:
      "Call (864) 734-5702 — Royal Water Damage answers live. 24/7 emergency response Sunday–Friday. Average on-site: 60 minutes. Fort Myers & Southwest FL.",
    url: "https://royalwaterdamagefortmyers.com/emergency",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/* ============================================================
   Data
   ============================================================ */

const IMMEDIATE_STEPS = [
  {
    number: 1,
    text: "Turn off water at the main shutoff valve to stop the source.",
  },
  {
    number: 2,
    text: "Turn off electricity to affected areas at the breaker panel — only if it is safe to reach the panel without walking through standing water.",
  },
  {
    number: 3,
    text: "Move valuables, electronics, and important documents to dry areas.",
  },
  {
    number: 4,
    text: "Do NOT use a regular household vacuum — it is not rated for water and creates an electrocution hazard.",
  },
  {
    number: 5,
    text: "Take photos and video of all damage before moving or removing anything — this is essential for your insurance claim.",
  },
  {
    number: 6,
    text: "Keep pets and children away from the affected area until the crew arrives.",
  },
] as const;

const WHAT_HAPPENS_NEXT = [
  {
    step: "1",
    title: "We Dispatch Immediately",
    description:
      "The moment you call, a live coordinator gathers your details and dispatches the nearest available crew. You get an honest ETA — typically under 60 minutes for Fort Myers.",
    color: "bg-[#e94560]",
  },
  {
    step: "2",
    title: "We Arrive and Assess",
    description:
      "Our IICRC-certified technicians assess the full scope of damage using moisture meters and thermal cameras — including hidden moisture in walls, floors, and ceilings.",
    color: "bg-[#f5a623]",
  },
  {
    step: "3",
    title: "We Begin Extraction and Drying",
    description:
      "Commercial extraction equipment removes standing water immediately. Drying equipment is deployed in a calculated configuration and monitored daily until your home is dry.",
    color: "bg-[#0f3460]",
  },
] as const;

/* ============================================================
   Page Component
   ============================================================ */

export default function EmergencyPage() {
  return (
    <>
      {/* JSON-LD */}
      <JsonLd schema={buildLocalBusinessSchema()} />

      {/* ── Full-page Emergency Hero ──────────────────────── */}
      <section
        aria-label="Emergency call to action hero"
        className={cn(
          "relative overflow-hidden",
          "bg-[#e94560]",
          "py-20 md:py-28"
        )}
      >
        {/* Background pattern */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.3) 20px, rgba(255,255,255,0.3) 21px)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full border-2 border-white/10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full border border-white/10"
        />

        <div className="relative mx-auto max-w-4xl px-4 text-center">
          {/* Alert badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
            <AlertTriangle
              className="h-4 w-4 text-white animate-pulse"
              aria-hidden="true"
            />
            <span className="text-sm font-bold text-white uppercase tracking-wider">
              24/7 Emergency Response
            </span>
          </div>

          <h1 className="font-display text-4xl font-extrabold leading-tight text-white md:text-6xl lg:text-7xl">
            Water Emergency in Fort Myers?
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-lg text-white/90 leading-relaxed">
            We answer live 24/7 — Sunday through Friday.
            <br />
            Average on-site response:{" "}
            <strong className="text-white">60 minutes.</strong>
          </p>

          {/* THE primary element — largest thing on the page */}
          <div className="mt-8">
            <a
              href={`tel:${BUSINESS.phone}`}
              className={cn(
                "inline-flex flex-col items-center gap-1 rounded-3xl",
                "bg-white px-10 py-6 shadow-2xl",
                "hover:bg-white/95 active:scale-[0.99] transition-all duration-150",
                "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
              )}
              aria-label={`Call Royal Water Damage now at ${BUSINESS.phoneDisplay}`}
            >
              <span className="flex items-center gap-3 text-[#e94560]">
                <Phone
                  className="h-8 w-8 md:h-10 md:w-10 shrink-0"
                  aria-hidden="true"
                />
                <span
                  className="font-extrabold text-4xl md:text-6xl leading-none font-mono tracking-tight"
                  aria-hidden="true"
                >
                  {BUSINESS.phoneDisplay}
                </span>
              </span>
              <span className="text-sm font-semibold text-gray-500 mt-1">
                Tap to call — live answer, no voicemail
              </span>
            </a>
          </div>

          <p className="mt-5 text-white/75 text-sm">
            Sunday through Friday, around the clock.{" "}
            <span className="font-semibold text-white/90">
              Closed Saturday.
            </span>
          </p>
        </div>
      </section>

      {/* ── Immediate Steps ──────────────────────────────── */}
      <section
        aria-labelledby="immediate-steps-heading"
        className="bg-[#0f3460] py-16 md:py-20"
      >
        <div className="mx-auto max-w-3xl px-4">
          <h2
            id="immediate-steps-heading"
            className="font-display text-2xl font-extrabold text-white md:text-3xl mb-2"
          >
            Do This Right Now While You Wait
          </h2>
          <p className="text-white/70 text-sm mb-8">
            Follow these steps to minimize damage and stay safe before our crew
            arrives.
          </p>

          <ol className="space-y-4" aria-label="Immediate steps to take">
            {IMMEDIATE_STEPS.map((item) => (
              <li
                key={item.number}
                className={cn(
                  "flex items-start gap-4 rounded-xl",
                  "bg-white/10 border border-white/15 px-5 py-4",
                  "backdrop-blur-sm"
                )}
              >
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                    "bg-[#f5a623] text-[#0f3460] font-extrabold text-sm"
                  )}
                  aria-hidden="true"
                >
                  {item.number}
                </span>
                <span className="text-white text-base leading-relaxed pt-0.5">
                  {item.text}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Secondary CTA + Lead Form ─────────────────────── */}
      <section
        aria-labelledby="form-cta-heading"
        className="bg-gray-50 py-16 md:py-20"
      >
        <div className="mx-auto max-w-2xl px-4">
          <div className="text-center mb-8">
            <h2
              id="form-cta-heading"
              className="font-display text-2xl font-extrabold text-[#0f3460] md:text-3xl"
            >
              Can&rsquo;t Call Right Now?
            </h2>
            <p className="mt-3 text-gray-600 text-base leading-relaxed">
              Fill out the form below and we&rsquo;ll call you back in under 5
              minutes. Describe your situation and address so we can dispatch
              the right crew.
            </p>
          </div>

          <LeadForm
            heading="Request Emergency Callback"
            className="shadow-lg"
          />
        </div>
      </section>

      {/* ── What Happens Next ────────────────────────────── */}
      <section
        aria-labelledby="what-happens-heading"
        className="mx-auto max-w-5xl px-4 py-16 md:py-24"
      >
        <div className="text-center mb-12">
          <h2
            id="what-happens-heading"
            className="font-display text-2xl font-extrabold text-[#0f3460] md:text-3xl"
          >
            What Happens After You Call
          </h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto text-sm">
            Three steps — from your call to active restoration.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {WHAT_HAPPENS_NEXT.map((phase) => (
            <div
              key={phase.step}
              className="relative rounded-2xl border border-gray-200 bg-white p-7 shadow-sm"
            >
              <div
                className={cn(
                  "mb-4 flex h-11 w-11 items-center justify-center rounded-full",
                  phase.color,
                  "text-white font-extrabold text-xl"
                )}
                aria-hidden="true"
              >
                {phase.step}
              </div>
              <h3 className="font-display text-lg font-bold text-[#0f3460] mb-2">
                {phase.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {phase.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Hours Reminder Banner ────────────────────────── */}
      <section
        aria-label="Hours and Saturday notice"
        className="border-t border-gray-200 bg-white py-10"
      >
        <div className="mx-auto max-w-3xl px-4">
          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left md:gap-6">
            <CheckCircle2
              className="h-10 w-10 shrink-0 text-[#0f3460]"
              aria-hidden="true"
            />
            <div>
              <p className="font-bold text-[#0f3460] text-base">
                Available 24/7 Sunday through Friday.
              </p>
              <p className="text-sm text-gray-500 mt-0.5">
                <span className="font-semibold text-[#e94560]">
                  Closed Saturday.
                </span>{" "}
                For Saturday emergencies, please contact another local
                restoration provider or call{" "}
                <a
                  href="tel:211"
                  className="font-semibold underline underline-offset-2 text-[#0f3460] hover:text-[#e94560] transition-colors"
                >
                  211
                </a>{" "}
                for community emergency resources.
              </p>
            </div>
            <div className="md:ml-auto shrink-0">
              <a
                href={`tel:${BUSINESS.phone}`}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full",
                  "bg-[#e94560] px-6 py-3 text-white font-bold text-sm",
                  "hover:bg-[#e94560]/90 transition-colors"
                )}
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {BUSINESS.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
