import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/live";
import { SPECIALISTS_QUERY } from "@/sanity/lib/queries";
import type { Specialist } from "@/sanity/types";
import { ORGANIZATION_REF, SITE_URL, SITE_LANGUAGE, WEBSITE_ID } from "@/lib/seo";
import { InlineCtaBlock } from "@/components/inline-cta-block";
import { ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Specialists & Team | Divit MindSpace Bangalore",
  description:
    "Meet the licensed clinical psychologists, occupational therapists, speech-language pathologists, behavioral therapists, and physiotherapists at Divit MindSpace — serving Sarjapur Road, Kasavanahalli, HSR Layout, Bellandur, and Bengaluru.",
  keywords: [
    "clinical psychologist Bangalore",
    "occupational therapist Sarjapur Road",
    "speech therapist Kasavanahalli",
    "behavioral therapist Bangalore",
    "child psychologist HSR Layout",
    "autism specialist Bellandur",
    "ADHD specialist Bangalore",
    "physiotherapist Kasavanahalli",
    "Divit MindSpace team",
    "Divit MindSpace specialists",
  ],
  alternates: { canonical: `${SITE_URL}/specialists` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/specialists`,
    title: "Our Specialists & Team | Divit MindSpace Bangalore",
    description:
      "Licensed clinical psychologists, occupational therapists, speech-language pathologists, and physiotherapists at Divit MindSpace Bangalore.",
    images: [
      {
        url: "/divit-mindspace-logo.png",
        width: 1200,
        height: 630,
        alt: "Divit MindSpace Specialists",
      },
    ],
    siteName: "Divit MindSpace",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Specialists & Team | Divit MindSpace Bangalore",
    description: "Meet the team behind Divit MindSpace.",
    images: ["/divit-mindspace-logo.png"],
  },
  robots: { index: true, follow: true },
};

export default async function SpecialistsListPage() {
  const { data } = await sanityFetch({
    query: SPECIALISTS_QUERY,
    tags: ["specialist"],
  });

  const raw = (data as Specialist[] | null) ?? [];
  // Dedupe (Sanity can return draft+published pairs when queried with a token).
  const specialists = Array.from(
    new Map(
      raw
        .filter((s) => s?.slug?.current)
        .map((s) => [s.slug!.current, s]),
    ).values(),
  );

  // Person schema per specialist; each references canonical Organization via @id.
  const personSchemas = specialists.map((s) => {
    const slug = s.slug?.current as string;
    const url = `${SITE_URL}/specialists/${slug}`;
    return {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${url}#person`,
      name: s.name,
      url,
      jobTitle: s.title,
      description: s.teaser,
      image: s.image?.asset?.url,
      worksFor: ORGANIZATION_REF,
      knowsAbout: s.specialties || [],
      ...(s.experience && {
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "Experience",
          name: `${s.experience} of professional experience`,
        },
      }),
    };
  });

  // ItemList schema — aggregates all specialists as an ordered list (SEO pattern for
  // team/staff pages). Gives Google + LLMs a single entity they can parse.
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}/specialists#list`,
    name: "Divit MindSpace Specialists & Team",
    description:
      "Clinical psychologists, occupational therapists, speech-language pathologists, behavioral therapists, and physiotherapists at Divit MindSpace Bangalore.",
    inLanguage: SITE_LANGUAGE,
    isPartOf: { "@id": WEBSITE_ID },
    numberOfItems: specialists.length,
    itemListElement: specialists.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/specialists/${s.slug?.current}`,
      name: s.name,
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Specialists", item: `${SITE_URL}/specialists` },
    ],
  };

  const pageGraph = {
    "@context": "https://schema.org",
    "@graph": [itemListJsonLd, breadcrumbJsonLd, ...personSchemas].map((s) => {
      const clone: Record<string, unknown> = { ...(s as Record<string, unknown>) };
      delete clone["@context"];
      return clone;
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageGraph) }}
      />

      <div className="bg-[#FAF9F5] min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-cream/50 border-b border-green/10">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center gap-2 text-sm text-green/60">
              <Link href="/" className="hover:text-green transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-green font-medium">Specialists</span>
            </nav>
          </div>
        </div>

        <section className="pt-8 pb-6 lg:pt-12 lg:pb-10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-black/5 text-black text-[10px] font-bold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7A9A7D]" />
                Our Team
              </div>
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-serif text-black mb-6 leading-tight italic"
                style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
              >
                Meet Our Specialists
              </h1>
              <p className="text-lg text-black/70 max-w-2xl mx-auto font-medium">
                Licensed clinical psychologists, occupational therapists, speech-language
                pathologists, behavioral therapists, and physiotherapists serving families
                across Sarjapur Road, Kasavanahalli, HSR Layout, Bellandur, and Bengaluru.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-10 lg:pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {specialists.map((s) => {
                const slug = s.slug?.current as string;
                const imageUrl = s.image?.asset?.url;
                return (
                  <Link
                    key={slug}
                    href={`/specialists/${slug}`}
                    className="group flex flex-col bg-white rounded-[2rem] border border-black/5 shadow-xl shadow-black/[0.02] overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all"
                  >
                    {imageUrl && (
                      <div className="relative w-full aspect-[4/5]">
                        <Image
                          src={imageUrl}
                          alt={s.image?.alt || s.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    )}
                    <div className="flex-1 p-6 flex flex-col">
                      <h2 className="text-2xl font-serif italic text-black mb-2 leading-tight group-hover:text-[#7A9A7D] transition-colors">
                        {s.name}
                      </h2>
                      <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest mb-4 line-clamp-2">
                        {s.title}
                      </p>
                      {s.specialties && s.specialties.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {s.specialties.slice(0, 3).map((sp) => (
                            <span
                              key={sp}
                              className="px-2 py-0.5 rounded-full bg-[#7A9A7D]/10 text-[10px] font-semibold text-[#7A9A7D]"
                            >
                              {sp}
                            </span>
                          ))}
                        </div>
                      )}
                      <p className="text-sm text-black/70 font-medium line-clamp-3 mb-4">
                        {s.teaser}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-1 text-[10px] font-bold text-[#7A9A7D] uppercase tracking-widest">
                        View Profile
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="pb-12 lg:pb-16">
          <div className="container mx-auto px-4">
            <InlineCtaBlock />
          </div>
        </section>
      </div>
    </>
  );
}
