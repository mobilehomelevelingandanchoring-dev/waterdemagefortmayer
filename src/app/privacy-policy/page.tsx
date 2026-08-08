import type { Metadata } from "next";
import { BUSINESS } from "@/data/business";

export const metadata: Metadata = {
  title: "Privacy Policy | Royal Water Damage Fort Myers",
  description: "Privacy policy for Royal Water Damage. Learn how we collect, use, and protect your personal information when you contact us for water damage restoration services.",
  alternates: { canonical: "https://royalwaterdamagefortmyers.com/privacy-policy" },
  robots: { index: true, follow: true },
};

const EFFECTIVE_DATE = "August 1, 2025";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <h1 className="text-3xl sm:text-4xl font-bold text-[#0f3460] mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-10">Effective date: {EFFECTIVE_DATE}</p>

      <div className="prose prose-gray max-w-none space-y-8">

        <section>
          <h2 className="text-xl font-bold text-[#0f3460] mb-3">1. Who We Are</h2>
          <p className="text-gray-700 leading-relaxed">
            {BUSINESS.legalName} (&ldquo;Royal Water Damage,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates{" "}
            <strong>royalwaterdamagefortmyers.com</strong> and provides water damage restoration services
            in Fort Myers, FL and Southwest Florida. This Privacy Policy explains how we collect, use,
            disclose, and safeguard your information when you visit our website or contact us for services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0f3460] mb-3">2. Information We Collect</h2>
          <h3 className="font-semibold text-gray-800 mb-2">Information You Provide Directly</h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-1 mb-4">
            <li>Name, phone number, and email address when you submit a contact form or request a quote</li>
            <li>Property address and description of damage when scheduling a service</li>
            <li>Insurance information you voluntarily share</li>
          </ul>
          <h3 className="font-semibold text-gray-800 mb-2">Information Collected Automatically</h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>IP address, browser type, and operating system</li>
            <li>Pages visited, time on page, and referring URL (via Google Analytics)</li>
            <li>Phone call data if you call through our tracking number (via CallRail)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0f3460] mb-3">3. How We Use Your Information</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>To respond to service requests and provide water damage restoration</li>
            <li>To schedule estimates and follow up on open jobs</li>
            <li>To improve our website and marketing effectiveness</li>
            <li>To comply with legal obligations</li>
            <li>To send service-related communications (not marketing emails without consent)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0f3460] mb-3">4. Sharing Your Information</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            We do not sell your personal information. We may share information with:
          </p>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li><strong>Service providers:</strong> Google Analytics, Google Tag Manager, CallRail (call tracking)</li>
            <li><strong>Insurance partners:</strong> only with your explicit consent during the claims process</li>
            <li><strong>Legal authorities:</strong> when required by law or to protect our rights</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0f3460] mb-3">5. Cookies and Tracking</h2>
          <p className="text-gray-700 leading-relaxed">
            We use cookies and similar tracking technologies to analyze site traffic and improve user
            experience. Google Analytics collects anonymized usage data. CallRail may set cookies to
            enable dynamic phone number insertion for call attribution. You can disable cookies in your
            browser settings; some features of the site may not function properly without them.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0f3460] mb-3">6. Data Retention</h2>
          <p className="text-gray-700 leading-relaxed">
            We retain contact form submissions and service records for up to 7 years to comply with
            contractor licensing requirements in Florida. Analytics data is retained per Google&apos;s
            default retention policy (26 months). You may request deletion of your personal data at
            any time by contacting us.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0f3460] mb-3">7. Your Rights</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            Under applicable law (including Florida statutes), you have the right to:
          </p>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data (subject to legal retention requirements)</li>
            <li>Opt out of marketing communications at any time</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-3">
            To exercise these rights, contact us at{" "}
            <a href={`mailto:${BUSINESS.email}`} className="text-[#0f3460] underline">{BUSINESS.email}</a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0f3460] mb-3">8. Security</h2>
          <p className="text-gray-700 leading-relaxed">
            We implement industry-standard technical measures including HTTPS/TLS encryption and
            access controls to protect your information. No method of transmission over the internet
            is 100% secure; we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0f3460] mb-3">9. Children&apos;s Privacy</h2>
          <p className="text-gray-700 leading-relaxed">
            Our services are not directed to children under 13. We do not knowingly collect personal
            information from children. If you believe we have inadvertently collected such information,
            contact us immediately.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0f3460] mb-3">10. Changes to This Policy</h2>
          <p className="text-gray-700 leading-relaxed">
            We may update this policy periodically. The effective date at the top of this page will
            reflect the most recent revision. Continued use of the site after changes constitutes
            acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0f3460] mb-3">11. Contact Us</h2>
          <p className="text-gray-700 leading-relaxed">
            Questions about this Privacy Policy? Contact us:
          </p>
          <address className="not-italic mt-3 text-gray-700 space-y-1">
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
