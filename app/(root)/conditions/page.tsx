import type { Metadata } from "next";
import Link from "next/link";
import { CONDITION_PIVOTS } from "@/lib/seo-pivots";
import { ORGANIZATION_REF, SITE_URL, SITE_LANGUAGE, WEBSITE_ID } from "@/lib/seo";
import { InlineCtaBlock } from "@/components/inline-cta-block";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Conditions We Support | Divit MindSpace Bangalore",
  description:
    "Divit MindSpace supports Autism, ADHD, Learning Disabilities, Stress, Anxiety, Depression, and Pain Management — for children, teens, and adults — at our Kasavanahalli center off Sarjapur Road, Bangalore.",
  keywords: [
    "conditions treated Divit MindSpace",
    "autism Bangalore",
    "ADHD Bangalore",
    "learning disabilities Bangalore",
    "mental health conditions Bangalore",
    "pain management Bangalore",
  ],
  alternates: { canonical: `${SITE_URL}/conditions` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/conditions`,
    title: "Conditions We Support | Divit MindSpace Bangalore",
    description:
      "Autism, ADHD, Learning Disabilities, Stress & Anxiety, Depression, Pain Management — support across all ages.",
    images: [{ url: "/divit-mindspace-logo.png", width: 1200, height: 630, alt: "Conditions — Divit MindSpace" }],
    siteName: "Divit MindSpace",
  },
  twitter: {
    card: "summary_large_image",
    title: "Conditions We Support | Divit MindSpace Bangalore",
    description: "Conditions supported at Divit MindSpace Bangalore.",
    images: ["/divit-mindspace-logo.png"],
  },
  robots: { index: true, follow: true },
};

export default function ConditionsIndex() {
  const pageUrl = `${SITE_URL}/conditions`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Conditions", item: pageUrl },
        ],
      },
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#collection`,
        url: pageUrl,
        name: "Conditions We Support",
        description:
          "Landing page listing the key conditions supported by Divit MindSpace Bangalore.",
        inLanguage: SITE_LANGUAGE,
        isPartOf: { "@id": WEBSITE_ID },
        about: ORGANIZATION_REF,
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#list`,
        numberOfItems: CONDITION_PIVOTS.length,
        itemListElement: CONDITION_PIVOTS.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${SITE_URL}/conditions/${c.slug}`,
          name: c.name,
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
              <span className="text-green font-medium">Conditions</span>
            </nav>
          </div>
        </div>

        <section className="pt-8 pb-6 lg:pt-12 lg:pb-10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-black/5 text-black text-[10px] font-bold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7A9A7D]" />
                Conditions Supported
              </div>
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-serif text-black mb-6 leading-tight italic"
                style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
              >
                Conditions We Support
              </h1>
              <p className="text-lg text-black/70 font-medium">
                Expert clinical and physiotherapy support for children, teenagers, and adults at
                our Kasavanahalli center off Sarjapur Road, Bangalore.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-10 lg:pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {CONDITION_PIVOTS.map((c) => (
                <Link
                  key={c.slug}
                  href={`/conditions/${c.slug}`}
                  className="group block p-6 bg-white rounded-2xl border border-black/5 hover:border-[#7A9A7D]/30 hover:shadow-lg transition-all"
                >
                  <h2 className="text-xl font-serif italic text-black mb-3 group-hover:text-[#7A9A7D] transition-colors">
                    {c.name}
                  </h2>
                  <p className="text-sm text-black/60 line-clamp-4 mb-4">{c.intro}</p>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#7A9A7D] uppercase tracking-widest">
                    Learn more <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
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
