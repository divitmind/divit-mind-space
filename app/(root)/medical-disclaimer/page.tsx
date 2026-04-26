import type { Metadata } from "next";
import Link from "next/link";
import {
  SITE_URL,
  SITE_LANGUAGE,
  WEBSITE_ID,
  ORGANIZATION_REF,
  MEDICAL_CONTENT_REVIEW_BLOCK,
} from "@/lib/seo";

const pageUrl = `${SITE_URL}/medical-disclaimer`;

export const metadata: Metadata = {
  title: "Medical Disclaimer | Divit MindSpace",
  description:
    "Medical disclaimer for information published on divitmindspace.com. Content is educational and is not a substitute for professional clinical advice, diagnosis, or treatment.",
  alternates: { canonical: pageUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: pageUrl,
    title: "Medical Disclaimer | Divit MindSpace",
    description:
      "Information on divitmindspace.com is educational. It is not a substitute for professional clinical advice, diagnosis, or treatment.",
    siteName: "Divit MindSpace",
  },
};

const disclaimerJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Medical Disclaimer", item: pageUrl },
      ],
    },
    {
      "@type": "MedicalWebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: "Medical Disclaimer",
      description:
        "Medical disclaimer governing the use of health, mental health, and neurodevelopment information on divitmindspace.com.",
      inLanguage: SITE_LANGUAGE,
      isPartOf: { "@id": WEBSITE_ID },
      publisher: ORGANIZATION_REF,
      ...MEDICAL_CONTENT_REVIEW_BLOCK,
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", "h2"],
      },
    },
  ],
};

export default function MedicalDisclaimerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(disclaimerJsonLd) }}
      />
      <main className="min-h-screen bg-[#FAF9F5]">
        <div className="container mx-auto px-4 py-12 lg:py-16">
          <nav className="text-sm text-green/60 mb-6">
            <Link href="/" className="hover:text-green transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-green font-medium">Medical Disclaimer</span>
          </nav>

          <div className="max-w-3xl">
            <h1
              className="text-4xl lg:text-5xl font-serif text-green mb-8"
              style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
            >
              Medical Disclaimer
            </h1>

            <div className="prose prose-lg prose-green space-y-6 text-black/70 font-medium leading-relaxed">
              <p>
                The content published on divitmindspace.com — including articles,
                condition and service pages, how-to guides, FAQ answers, the
                glossary, blog posts, and downloadable resources — is intended for
                general educational and informational purposes only. It is not a
                substitute for professional clinical advice, diagnosis, or treatment.
              </p>

              <h2 className="text-2xl font-serif text-green pt-4" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                Not a clinical consultation
              </h2>
              <p>
                Reading our website does not establish a clinician–patient
                relationship. Always seek the advice of a qualified mental health
                professional, physician, or other licensed healthcare provider with
                any questions you have about a medical, psychological, or
                neurodevelopmental condition — for yourself, your child, or anyone
                you care for.
              </p>
              <p>
                Never disregard professional advice or delay seeking it because of
                something you read on this site. If you believe you or someone you
                care for may have a medical or mental-health emergency, call
                emergency services or a crisis helpline immediately.
              </p>

              <h2 className="text-2xl font-serif text-green pt-4" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                Clinical services versus educational content
              </h2>
              <p>
                Services delivered at our Kasavanahalli center — including clinical
                assessments, therapy sessions, counselling, and physiotherapy — are
                individualized and delivered in-person by licensed clinicians. The
                content on this website describes those services at a high level so
                families can understand what to expect; it does not constitute the
                services themselves.
              </p>

              <h2 className="text-2xl font-serif text-green pt-4" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                Clinical team credentials
              </h2>
              <p>
                Our clinical psychologists are registered with the Rehabilitation
                Council of India (RCI) under the Rehabilitation Council of India
                Act, 1992. Our allied-health staff — including speech-language
                pathologists, occupational therapists and other professionals —
                practice under the frameworks set by the National Commission for
                Allied and Healthcare Professions (NCAHP).
              </p>

              <h2 className="text-2xl font-serif text-green pt-4" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                External links
              </h2>
              <p>
                Links to third-party websites, research, or professional bodies are
                provided as a convenience. Divit MindSpace does not control and is
                not responsible for the content, accuracy, privacy practices, or
                continued availability of those external resources.
              </p>

              <h2 className="text-2xl font-serif text-green pt-4" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                Emergency and crisis resources
              </h2>
              <p>
                If you or someone you care for is in crisis or may be a danger to
                themselves or others, do not rely on this website. Please contact:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>iCall (TISS)</strong> — +91 91529 87821
                </li>
                <li>
                  <strong>Vandrevala Foundation Helpline</strong> — 1860-2662-345
                </li>
                <li>
                  <strong>NIMHANS Helpline</strong> — 080 4611 0007
                </li>
                <li>
                  <strong>Local emergency services</strong> — 112 (India)
                </li>
              </ul>

              <h2 className="text-2xl font-serif text-green pt-4" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                Contact
              </h2>
              <p>
                Questions about this disclaimer or the content on this site can be
                directed to{" "}
                <a href="mailto:divitmindspace@gmail.com" className="text-green underline">
                  divitmindspace@gmail.com
                </a>{" "}
                or +91 99016 66139.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
