import type { Metadata } from "next";
import Link from "next/link";
import { LOCATION_PIVOTS } from "@/lib/seo-pivots";
import { ORGANIZATION_REF, SITE_URL, SITE_LANGUAGE, WEBSITE_ID } from "@/lib/seo";
import { InlineCtaBlock } from "@/components/inline-cta-block";
import { ArrowRight, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Divit MindSpace Near Me | Bangalore Locations",
  description:
    "Find Divit MindSpace services near you — Sarjapur Road, Kasavanahalli, HSR Layout, Bellandur, Koramangala, Whitefield. Clinical assessments, therapy, counseling, and physiotherapy.",
  keywords: [
    "Divit MindSpace near me",
    "therapy center near me Bangalore",
    "mental health near Sarjapur Road",
    "physiotherapy near Kasavanahalli",
    "therapy near HSR Layout",
    "therapy near Bellandur",
  ],
  alternates: { canonical: `${SITE_URL}/near-me` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/near-me`,
    title: "Divit MindSpace Near Me | Bangalore Locations",
    description: "Find Divit MindSpace services across Bangalore neighborhoods.",
    images: [{ url: "/divit-mindspace-logo.png", width: 1200, height: 630, alt: "Divit MindSpace near me" }],
    siteName: "Divit MindSpace",
  },
  twitter: {
    card: "summary_large_image",
    title: "Divit MindSpace Near Me",
    description: "Find Divit MindSpace services across Bangalore.",
    images: ["/divit-mindspace-logo.png"],
  },
  robots: { index: true, follow: true },
};

export default function NearMeIndex() {
  const pageUrl = `${SITE_URL}/near-me`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Near Me", item: pageUrl },
        ],
      },
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#collection`,
        url: pageUrl,
        name: "Divit MindSpace — Near Me",
        description: "Neighborhood landing pages for Divit MindSpace across Bangalore.",
        inLanguage: SITE_LANGUAGE,
        isPartOf: { "@id": WEBSITE_ID },
        about: ORGANIZATION_REF,
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#locations`,
        numberOfItems: LOCATION_PIVOTS.length,
        itemListElement: LOCATION_PIVOTS.map((l, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${SITE_URL}/near-me/${l.slug}`,
          name: l.name,
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
              <span className="text-green font-medium">Near Me</span>
            </nav>
          </div>
        </div>

        <section className="pt-8 pb-6 lg:pt-12 lg:pb-10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-black/5 text-black text-[10px] font-bold uppercase tracking-widest">
                <MapPin className="w-3 h-3 text-[#7A9A7D]" />
                Find Us
              </div>
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-serif text-black mb-6 leading-tight italic"
                style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
              >
                Divit MindSpace Near Me
              </h1>
              <p className="text-lg text-black/70 max-w-2xl mx-auto font-medium">
                Pick your neighborhood — our Kasavanahalli center (off Sarjapur Road) serves
                families across Bangalore.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-10 lg:pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {LOCATION_PIVOTS.map((l) => (
                <Link
                  key={l.slug}
                  href={`/near-me/${l.slug}`}
                  className="group block p-6 bg-white rounded-2xl border border-black/5 hover:border-[#7A9A7D]/30 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-[#7A9A7D]" />
                    <h2 className="text-lg font-semibold text-black group-hover:text-[#7A9A7D] transition-colors">
                      {l.name}
                    </h2>
                  </div>
                  <p className="text-sm text-black/60 line-clamp-3 mb-3">{l.intro}</p>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#7A9A7D] uppercase tracking-widest">
                    Services &amp; directions
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="pt-4 pb-12 lg:pt-6 lg:pb-16">
          <div className="container mx-auto px-4">
            <InlineCtaBlock />
          </div>
        </section>
      </div>
    </>
  );
}
