import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Divit MindSpace",
  description:
    "Read the Terms of Service for Divit MindSpace. Learn about the conditions governing your use of our neurodivergent care and education services in Bangalore.",
  alternates: {
    canonical: "https://divitmindspace.com/terms",
  },
  openGraph: {
    type: "website",
    url: "https://divitmindspace.com/terms",
    title: "Terms of Service | Divit MindSpace",
    description:
      "Terms and conditions governing the use of Divit MindSpace services — neurodivergent care and education in Bangalore.",
    images: [
      {
        url: "/divit-mindspace-logo.png",
        width: 1200,
        height: 630,
        alt: "Divit MindSpace Terms of Service",
      },
    ],
    siteName: "Divit MindSpace",
  },
  twitter: {
    card: "summary",
    title: "Terms of Service | Divit MindSpace",
    description: "Terms and conditions for Divit MindSpace services.",
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

const termsJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Terms of Service — Divit MindSpace",
  url: "https://divitmindspace.com/terms",
  description: "Terms of Service for Divit MindSpace neurodivergent care and education services.",
  about: {
    "@type": "CreativeWork",
    name: "Terms of Service",
    dateModified: "2026-02-22",
  },
  publisher: {
    "@type": "Organization",
    name: "Divit MindSpace",
    url: "https://divitmindspace.com",
  },
};

export default function TermsOfServicePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(termsJsonLd) }}
      />

      <div className="bg-[#FDFBF7] min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-16">
          {/* Header */}
          <div className="mb-12">
            <p className="text-sm text-green/50 font-medium uppercase tracking-widest mb-3">
              Legal
            </p>
            <h1 className="text-3xl font-bold text-green mb-4">Terms of Service</h1>
            <p className="text-green/60 text-sm">Last updated: February 22, 2026</p>
          </div>

          <div className="prose-none space-y-10 text-green/80 leading-relaxed">
            {/* Intro */}
            <p>
              Welcome to Divit MindSpace. By accessing or using our website at{" "}
              <Link href="/" className="text-green underline underline-offset-2">
                divitmindspace.com
              </Link>{" "}
              and any services offered through it, you agree to be bound by these Terms of Service.
              Please read them carefully before using our services.
            </p>

            {/* 1 */}
            <section>
              <h2 className="text-xl font-semibold text-green mt-10 mb-3">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing this website, booking a consultation, or engaging with any of our
                services, you confirm that you have read, understood, and agree to be bound by these
                Terms of Service and our{" "}
                <Link href="/privacy" className="text-green underline underline-offset-2">
                  Privacy Policy
                </Link>
                . If you do not agree to these terms, please do not use our website or services.
              </p>
              <p className="mt-3">
                These terms apply to all visitors, clients, and others who access or use our
                services. We reserve the right to update these terms at any time, and continued use
                of the site after changes constitutes acceptance of the revised terms.
              </p>
            </section>

            {/* 2 */}
            <section>
              <h2 className="text-xl font-semibold text-green mt-10 mb-3">
                2. Services Description
              </h2>
              <p>
                Divit MindSpace provides healthcare and special education services for neurodivergent
                individuals and their families, including but not limited to:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-2 text-green/70">
                <li>Educational and psychometric assessments</li>
                <li>Customised special education sessions</li>
                <li>Parent and caregiver training programs</li>
                <li>Teacher and professional training workshops</li>
                <li>Free community awareness sessions</li>
              </ul>
              <p className="mt-3">
                All clinical services are delivered by qualified professionals. The information
                provided on this website is for general informational purposes only and does not
                constitute professional medical, psychological, or educational advice.
              </p>
            </section>

            {/* 3 */}
            <section>
              <h2 className="text-xl font-semibold text-green mt-10 mb-3">
                3. User Responsibilities
              </h2>
              <p>By using our website and services, you agree to:</p>
              <ul className="list-disc list-inside mt-3 space-y-2 text-green/70">
                <li>Provide accurate and complete information when contacting us or booking services</li>
                <li>Not use the website for any unlawful or prohibited purpose</li>
                <li>Not attempt to gain unauthorised access to any part of our systems</li>
                <li>Not reproduce, distribute, or commercially exploit any content from this website without written permission</li>
                <li>Respect the privacy and confidentiality of other clients</li>
              </ul>
            </section>

            {/* 4 */}
            <section>
              <h2 className="text-xl font-semibold text-green mt-10 mb-3">
                4. Intellectual Property
              </h2>
              <p>
                All content on this website — including text, images, logos, graphics, blog posts,
                and educational materials — is the property of Divit MindSpace or its content
                suppliers and is protected under applicable intellectual property laws.
              </p>
              <p className="mt-3">
                You may view and print content for personal, non-commercial use only. Any other
                use, including reproduction, modification, distribution, or republication, requires
                our express prior written consent.
              </p>
            </section>

            {/* 5 */}
            <section>
              <h2 className="text-xl font-semibold text-green mt-10 mb-3">
                5. Disclaimers &amp; Limitation of Liability
              </h2>
              <p>
                The information on this website is provided &ldquo;as is&rdquo; without warranties
                of any kind, either express or implied. Divit MindSpace does not warrant that the
                website will be uninterrupted, error-free, or free of viruses or other harmful
                components.
              </p>
              <p className="mt-3">
                Content on this website is for informational purposes and does not replace professional
                clinical consultation. Decisions about diagnosis, therapy, or educational interventions
                should always be made in consultation with qualified professionals.
              </p>
              <p className="mt-3">
                To the fullest extent permitted by law, Divit MindSpace shall not be liable for any
                indirect, incidental, special, consequential, or punitive damages arising from your
                use of, or inability to use, this website or our services.
              </p>
            </section>

            {/* 6 */}
            <section>
              <h2 className="text-xl font-semibold text-green mt-10 mb-3">6. Privacy</h2>
              <p>
                Your use of our services is also governed by our{" "}
                <Link href="/privacy" className="text-green underline underline-offset-2">
                  Privacy Policy
                </Link>
                , which is incorporated into these Terms of Service by reference. Please review our
                Privacy Policy to understand our practices regarding the collection, use, and
                disclosure of your personal information.
              </p>
            </section>

            {/* 7 */}
            <section>
              <h2 className="text-xl font-semibold text-green mt-10 mb-3">
                7. Changes to Terms
              </h2>
              <p>
                We reserve the right to modify these Terms of Service at any time. We will indicate
                the date of the most recent revision at the top of this page. Your continued use of
                the website following any changes constitutes your acceptance of the new terms. We
                encourage you to review these terms periodically.
              </p>
            </section>

            {/* 8 */}
            <section>
              <h2 className="text-xl font-semibold text-green mt-10 mb-3">8. Governing Law</h2>
              <p>
                These Terms of Service shall be governed by and construed in accordance with the
                laws of India. Any disputes arising under or in connection with these terms shall
                be subject to the exclusive jurisdiction of the courts located in Bangalore,
                Karnataka, India.
              </p>
            </section>

            {/* 9 */}
            <section>
              <h2 className="text-xl font-semibold text-green mt-10 mb-3">9. Contact Us</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us through
                our{" "}
                <Link href="/contact-us" className="text-green underline underline-offset-2">
                  Contact page
                </Link>
                . We will do our best to address your concerns promptly.
              </p>
            </section>

            {/* Footer nav */}
            <div className="pt-10 mt-10 border-t border-green/10 flex flex-wrap gap-6 text-sm">
              <Link href="/privacy" className="text-green underline underline-offset-2">
                Privacy Policy
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
