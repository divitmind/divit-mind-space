import type { Metadata } from "next";
import Link from "next/link";
import { HOWTO_ARTICLES } from "@/lib/howto";
import { ORGANIZATION_REF, SITE_URL, SITE_LANGUAGE, WEBSITE_ID } from "@/lib/seo";
import { InlineCtaBlock } from "@/components/inline-cta-block";
import { ArrowRight, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "How-To Guides | Divit MindSpace Bangalore",
  description:
    "Step-by-step guides for preparing for assessments and making good clinical decisions — from Divit MindSpace Bangalore.",
  keywords: ["how to prepare for assessment", "therapy preparation guides", "Divit MindSpace guides"],
  alternates: { canonical: `${SITE_URL}/howto` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/howto`,
    title: "How-To Guides | Divit MindSpace Bangalore",
    description: "Practical guides for clinical preparation and decisions.",
    images: [{ url: "/divit-mindspace-logo.png", width: 1200, height: 630, alt: "How-To Guides" }],
    siteName: "Divit MindSpace",
  },
  twitter: {
    card: "summary_large_image",
    title: "How-To Guides | Divit MindSpace Bangalore",
    description: "Practical guides.",
    images: ["/divit-mindspace-logo.png"],
  },
  robots: { index: true, follow: true },
};

export default function HowToIndex() {
  const pageUrl = `${SITE_URL}/howto`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "How-To", item: pageUrl },
        ],
      },
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#collection`,
        url: pageUrl,
        name: "How-To Guides",
        inLanguage: SITE_LANGUAGE,
        isPartOf: { "@id": WEBSITE_ID },
        about: ORGANIZATION_REF,
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#list`,
        numberOfItems: HOWTO_ARTICLES.length,
        itemListElement: HOWTO_ARTICLES.map((a, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${SITE_URL}/howto/${a.slug}`,
          name: a.title,
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-[#FAF9F5] min-h-screen">
        <div className="bg-cream/50 border-b border-green/10">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center gap-2 text-sm text-green/60">
              <Link href="/" className="hover:text-green transition-colors">Home</Link>
              <span>/</span>
              <span className="text-green font-medium">How-To</span>
            </nav>
          </div>
        </div>

        <section className="pt-8 pb-6 lg:pt-12 lg:pb-10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-black/5 text-black text-[10px] font-bold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7A9A7D]" />
                How-To Guides
              </div>
              <h1
                className="text-4xl md:text-5xl font-serif text-black mb-6 leading-tight italic"
                style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
              >
                Practical Step-by-Step Guides
              </h1>
              <p className="text-lg text-black/70 font-medium">
                Short, clear walkthroughs — what to gather, what to expect, and how to decide —
                for the most common decisions families and adults face.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-10 lg:pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              {HOWTO_ARTICLES.map((a) => (
                <Link
                  key={a.slug}
                  href={`/howto/${a.slug}`}
                  className="group block p-6 bg-white rounded-2xl border border-black/5 hover:border-[#7A9A7D]/30 hover:shadow-lg transition-all"
                >
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#7A9A7D] uppercase tracking-widest mb-3">
                    <Clock className="w-3 h-3" />
                    {a.totalTimeLabel}
                  </div>
                  <h2 className="text-xl font-serif italic text-black mb-3 group-hover:text-[#7A9A7D] transition-colors">
                    {a.title}
                  </h2>
                  <p className="text-sm text-black/60 line-clamp-3 mb-4">{a.lead}</p>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#7A9A7D] uppercase tracking-widest">
                    Read guide <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="pt-2 pb-2 lg:pt-4 lg:pb-4 bg-[#FAF9F5]">
          <div className="container mx-auto px-4">
            <InlineCtaBlock />
          </div>
        </section>      </div>
    </>
  );
}
