import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Divit MindSpace",
  description:
    "Read the Privacy Policy for Divit MindSpace. Learn how we collect, use, and protect your personal information in accordance with Indian data privacy laws.",
  alternates: {
    canonical: "https://divitmindspace.com/privacy",
  },
  openGraph: {
    type: "website",
    url: "https://divitmindspace.com/privacy",
    title: "Privacy Policy | Divit MindSpace",
    description:
      "How Divit MindSpace collects, uses, and protects your personal information — neurodivergent care and education in Bangalore.",
    images: [
      {
        url: "/divit-mindspace-logo.png",
        width: 1200,
        height: 630,
        alt: "Divit MindSpace Privacy Policy",
      },
    ],
    siteName: "Divit MindSpace",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | Divit MindSpace",
    description: "How Divit MindSpace collects, uses, and protects your personal information.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
    },
  },
};

const privacyJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Privacy Policy — Divit MindSpace",
  url: "https://divitmindspace.com/privacy",
  description: "Privacy Policy for Divit MindSpace neurodivergent care and education services.",
  about: {
    "@type": "CreativeWork",
    name: "Privacy Policy",
    dateModified: "2026-02-22",
  },
  publisher: {
    "@type": "Organization",
    name: "Divit MindSpace",
    url: "https://divitmindspace.com",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacyJsonLd) }}
      />

      <div className="bg-[#FDFBF7] min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-16">
          {/* Header */}
          <div className="mb-12">
            <p className="text-sm text-green/50 font-medium uppercase tracking-widest mb-3">
              Legal
            </p>
            <h1 className="text-3xl font-bold text-green mb-4">Privacy Policy</h1>
            <p className="text-green/60 text-sm">Last updated: February 22, 2026</p>
          </div>

          <div className="prose-none space-y-10 text-green/80 leading-relaxed">
            {/* Intro */}
            <p>
              Divit MindSpace (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is
              committed to protecting the privacy and security of your personal information. This
              Privacy Policy explains how we collect, use, share, and safeguard information when you
              visit{" "}
              <Link href="/" className="text-green underline underline-offset-2">
                divitmindspace.com
              </Link>{" "}
              or use our services.
            </p>
            <p>
              This policy is compliant with the Information Technology Act, 2000 (India) and the
              applicable rules thereunder. By using our website or services, you consent to the
              practices described in this policy.
            </p>

            {/* 1 */}
            <section>
              <h2 className="text-xl font-semibold text-green mt-10 mb-3">
                1. Information We Collect
              </h2>
              <p>We may collect the following types of information:</p>

              <h3 className="text-base font-semibold text-green mt-5 mb-2">
                Information You Provide
              </h3>
              <ul className="list-disc list-inside space-y-2 text-green/70">
                <li>Full name, phone number, and email address (from our contact form)</li>
                <li>Details about your child or family member you share during consultations</li>
                <li>Assessment-related information provided during clinical sessions</li>
                <li>Newsletter subscription email address</li>
              </ul>

              <h3 className="text-base font-semibold text-green mt-5 mb-2">
                Information Collected Automatically
              </h3>
              <ul className="list-disc list-inside space-y-2 text-green/70">
                <li>Browser type, IP address, and device information</li>
                <li>Pages visited, time spent, and referring URLs</li>
                <li>Cookies and similar tracking technologies (see Section 5)</li>
              </ul>
            </section>

            {/* 2 */}
            <section>
              <h2 className="text-xl font-semibold text-green mt-10 mb-3">
                2. How We Use Your Information
              </h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc list-inside mt-3 space-y-2 text-green/70">
                <li>Respond to your enquiries and provide the services you request</li>
                <li>Schedule and conduct assessments and therapy sessions</li>
                <li>Send appointment reminders and follow-up communications</li>
                <li>Send our newsletter and programme updates (with your consent)</li>
                <li>Improve our website, services, and user experience</li>
                <li>Comply with legal and regulatory obligations</li>
              </ul>
              <p className="mt-3">
                We will not use your personal data for automated decision-making or profiling
                without your explicit consent.
              </p>
            </section>

            {/* 3 */}
            <section>
              <h2 className="text-xl font-semibold text-green mt-10 mb-3">
                3. Information Sharing &amp; Disclosure
              </h2>
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may
                share your information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-2 text-green/70">
                <li>
                  <strong className="text-green">Service Providers:</strong> With trusted partners
                  (e.g., email service providers, website hosting) who assist in operating our
                  website and services under confidentiality obligations
                </li>
                <li>
                  <strong className="text-green">Affiliated Partners:</strong> With our strategic
                  partners such as GD Goenka Healthcare Academy, only as required to deliver
                  jointly offered programmes
                </li>
                <li>
                  <strong className="text-green">Legal Requirements:</strong> When required by
                  applicable law, court order, or government authority
                </li>
                <li>
                  <strong className="text-green">Safety:</strong> To protect the rights, property,
                  or safety of Divit MindSpace, our clients, or the public
                </li>
              </ul>
            </section>

            {/* 4 */}
            <section>
              <h2 className="text-xl font-semibold text-green mt-10 mb-3">4. Data Security</h2>
              <p>
                We implement appropriate technical and organisational security measures to protect
                your personal information against unauthorised access, alteration, disclosure, or
                destruction. These include secure data transmission (HTTPS), access controls, and
                regular security reviews.
              </p>
              <p className="mt-3">
                However, no method of transmission over the internet or electronic storage is
                completely secure. While we strive to use commercially acceptable means to protect
                your data, we cannot guarantee its absolute security.
              </p>
            </section>

            {/* 5 */}
            <section>
              <h2 className="text-xl font-semibold text-green mt-10 mb-3">
                5. Cookies &amp; Tracking
              </h2>
              <p>
                Our website may use cookies and similar technologies to enhance your browsing
                experience. Cookies are small data files stored on your device. We use them to:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-2 text-green/70">
                <li>Remember your preferences and settings</li>
                <li>Analyse website traffic and usage patterns</li>
                <li>Enable certain website features and functionality</li>
              </ul>
              <p className="mt-3">
                You can control cookies through your browser settings. Disabling cookies may affect
                the functionality of certain parts of our website. We do not use cookies for
                targeted advertising.
              </p>
            </section>

            {/* 6 */}
            <section>
              <h2 className="text-xl font-semibold text-green mt-10 mb-3">
                6. Children&apos;s Privacy
              </h2>
              <p>
                Our services are designed to support neurodivergent children and their families.
                We take children&apos;s privacy very seriously. We do not knowingly collect personal
                information directly from children under the age of 18 without the consent of a
                parent or legal guardian.
              </p>
              <p className="mt-3">
                Information about a child shared during consultations or assessments is treated with
                the highest level of confidentiality and is used solely for the purpose of providing
                care and support. Such information is never shared with unauthorised third parties.
              </p>
              <p className="mt-3">
                If you believe we have inadvertently collected information about a child without
                appropriate consent, please{" "}
                <Link href="/contact-us" className="text-green underline underline-offset-2">
                  contact us
                </Link>{" "}
                immediately so we can take corrective action.
              </p>
            </section>

            {/* 7 */}
            <section>
              <h2 className="text-xl font-semibold text-green mt-10 mb-3">7. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc list-inside mt-3 space-y-2 text-green/70">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate or incomplete data</li>
                <li>Request deletion of your personal information, subject to legal obligations</li>
                <li>Withdraw consent to processing at any time (where processing is based on consent)</li>
                <li>Opt out of marketing communications at any time</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, please{" "}
                <Link href="/contact-us" className="text-green underline underline-offset-2">
                  contact us
                </Link>
                . We will respond to your request within a reasonable timeframe.
              </p>
            </section>

            {/* 8 */}
            <section>
              <h2 className="text-xl font-semibold text-green mt-10 mb-3">
                8. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our
                practices or applicable law. We will indicate the date of the latest revision at the
                top of this page. We encourage you to review this policy periodically. Your continued
                use of our services after any changes constitutes your acceptance of the updated
                policy.
              </p>
            </section>

            {/* 9 */}
            <section>
              <h2 className="text-xl font-semibold text-green mt-10 mb-3">9. Contact Us</h2>
              <p>
                If you have any questions, concerns, or requests regarding this Privacy Policy or
                our data practices, please reach out through our{" "}
                <Link href="/contact-us" className="text-green underline underline-offset-2">
                  Contact page
                </Link>
                . We are committed to addressing your privacy concerns promptly and transparently.
              </p>
            </section>

            {/* Footer nav */}
            <div className="pt-10 mt-10 border-t border-green/10 flex flex-wrap gap-6 text-sm">
              <Link href="/terms" className="text-green underline underline-offset-2">
                Terms of Service
              </Link>
              <Link href="/contact-us" className="text-green underline underline-offset-2">
                Contact Us
              </Link>
              <Link href="/" className="text-green underline underline-offset-2">
                Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
