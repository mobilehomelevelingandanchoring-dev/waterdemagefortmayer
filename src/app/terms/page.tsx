import type { Metadata } from "next";
import { BUSINESS } from "@/data/business";

export const metadata: Metadata = {
  title: "Terms of Service | Royal Water Damage Fort Myers",
  description: "Terms of service for Royal Water Damage restoration services in Fort Myers, FL. Read our service agreement, payment terms, warranty, and liability limitations.",
  alternates: { canonical: "https://royalwaterdamagefortmyers.com/terms" },
  robots: { index: true, follow: true },
};

const EFFECTIVE_DATE = "August 1, 2025";

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <h1 className="text-3xl sm:text-4xl font-bold text-[#0f3460] mb-2">Terms of Service</h1>
      <p className="text-sm text-gray-500 mb-10">Effective date: {EFFECTIVE_DATE}</p>

      <div className="prose prose-gray max-w-none space-y-8">

        <section>
          <h2 className="text-xl font-bold text-[#0f3460] mb-3">1. Agreement to Terms</h2>
          <p className="text-gray-700 leading-relaxed">
            By accessing <strong>royalwaterdamagefortmyers.com</strong> or engaging{" "}
            {BUSINESS.legalName} (&ldquo;Royal Water Damage,&rdquo; &ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) for restoration
            services, you agree to be bound by these Terms of Service. If you do not agree, do not
            use our website or services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0f3460] mb-3">2. Services</h2>
          <p className="text-gray-700 leading-relaxed">
            Royal Water Damage provides water damage restoration, mold remediation, fire damage
            restoration, sewage cleanup, storm damage restoration, and related services in Fort Myers
            and Southwest Florida. All services are subject to a signed work authorization form
            prior to commencement. Scope of work, pricing, and timeline are detailed in the written
            estimate provided to you.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0f3460] mb-3">3. Payment Terms</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Emergency mitigation services: payment due upon completion or per agreed schedule</li>
            <li>We accept direct insurance billing — you are responsible for your deductible</li>
            <li>We accept cash, check, and major credit cards</li>
            <li>Invoices unpaid after 30 days accrue interest at 1.5% per month</li>
            <li>You remain personally responsible for payment if your insurance claim is denied</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0f3460] mb-3">4. Insurance Claims</h2>
          <p className="text-gray-700 leading-relaxed">
            We work directly with most major insurance carriers and can assist with documentation.
            We make no guarantee that your insurance company will approve a claim or cover any
            specific amount. Filing false insurance claims is a criminal offense; you are responsible
            for the accuracy of all claim representations made to your insurer.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0f3460] mb-3">5. Warranty</h2>
          <p className="text-gray-700 leading-relaxed">
            Restoration work performed by Royal Water Damage is warranted to be free from defects
            in workmanship for <strong>one (1) year</strong> from the date of completion.
            This warranty does not cover damage caused by subsequent water events, acts of nature,
            structural issues unrelated to our work, or failure to follow our post-service
            maintenance recommendations. Material warranties are subject to the respective
            manufacturer terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0f3460] mb-3">6. Limitation of Liability</h2>
          <p className="text-gray-700 leading-relaxed">
            To the maximum extent permitted by Florida law, Royal Water Damage&apos;s total liability
            for any claim arising from our services shall not exceed the total amount paid by you
            for the specific services giving rise to the claim. We are not liable for indirect,
            incidental, consequential, or punitive damages. Emergency conditions may require
            actions (such as cutting drywall or removing flooring) necessary to stop further
            damage — these are not considered negligence.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0f3460] mb-3">7. Access to Property</h2>
          <p className="text-gray-700 leading-relaxed">
            By signing a work authorization, you grant Royal Water Damage personnel lawful access
            to the affected property during agreed working hours. You confirm you are authorized
            to grant such access (owner, tenant with owner permission, or authorized agent).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0f3460] mb-3">8. Website Use</h2>
          <p className="text-gray-700 leading-relaxed">
            The content on this website is for informational purposes only. We make no warranty
            that information is accurate, complete, or current. You may not scrape, reproduce, or
            redistribute our content without written permission. Phone numbers displayed on this
            site may be tracking numbers routed to our main line.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0f3460] mb-3">9. Governing Law</h2>
          <p className="text-gray-700 leading-relaxed">
            These Terms are governed by the laws of the State of Florida. Any disputes shall be
            resolved in the courts of Lee County, Florida. You waive any objection to jurisdiction
            or venue in Lee County.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0f3460] mb-3">10. Changes to Terms</h2>
          <p className="text-gray-700 leading-relaxed">
            We reserve the right to modify these Terms at any time. Updated Terms are effective
            upon posting. For active service agreements, the Terms in effect at the time of signing
            govern that agreement.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0f3460] mb-3">11. Contact</h2>
          <address className="not-italic text-gray-700 space-y-1">
            <p><strong>{BUSINESS.legalName}</strong></p>
            <p>{BUSINESS.address.streetAddress}, {BUSINESS.address.city}, {BUSINESS.address.stateCode} {BUSINESS.address.zip}</p>
            <p>
              <a href={`tel:${BUSINESS.phone}`} className="text-[#0f3460] underline">{BUSINESS.phoneDisplay}</a>
            </p>
            <p>
              <a href={`mailto:${BUSINESS.email}`} className="text-[#0f3460] underline">{BUSINESS.email}</a>
            </p>
          </address>
        </section>

      </div>
    </div>
  );
}
