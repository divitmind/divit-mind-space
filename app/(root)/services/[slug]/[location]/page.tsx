// Programmatic service × location landing pages. 28 real services × 6 real neighborhoods
// = 168 highly-targeted long-tail URLs like /services/pain-management/hsr-layout.
// Every page is data-driven from Sanity + LOCATION_PIVOTS — zero fabrication.
// Mirrors the pattern competitors (CB Physiotherapy, Cadabams) use to dominate
// "service near neighborhood" queries.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import {
  SINGLE_SERVICE_QUERY,
  ALL_SERVICE_SLUGS_QUERY,
} from "@/sanity/lib/queries";
import { LOCATION_PIVOTS, CONDITION_PIVOTS, type LocationPivot } from "@/lib/seo-pivots";
import {
  ORGANIZATION_REF,
  SITE_URL,
  SITE_LANGUAGE,
  WEBSITE_ID,
  MEDICAL_CONTENT_REVIEW_BLOCK,
} from "@/lib/seo";
import { InlineCtaBlock } from "@/components/inline-cta-block";
import { ArrowRight, MapPin, Phone, Check } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string; location: string }>;
}

interface ServiceData {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  category: string;
  overview?: string;
  benefits?: string[];
  whatToExpect?: string[];
  whoIsItFor?: string[];
  duration?: string;
  format?: string;
  image?: { asset?: { url: string }; alt?: string };
}

export async function generateStaticParams() {
  const { data: slugs } = (await sanityFetch({
    query: ALL_SERVICE_SLUGS_QUERY,
    tags: ["services"],
  })) as { data: { slug: string }[] | null };
  const serviceSlugs = (slugs || []).map((s) => s.slug);
  const params: { slug: string; location: string }[] = [];
  for (const s of serviceSlugs) {
    for (const l of LOCATION_PIVOTS) {
      params.push({ slug: s, location: l.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, location } = await params;
  const l = LOCATION_PIVOTS.find((x) => x.slug === location);
  if (!l) return { title: "Not Found" };

  const { data: service } = (await sanityFetch({
    query: SINGLE_SERVICE_QUERY,
    params: { slug },
    tags: ["services"],
  })) as { data: ServiceData | null };
  if (!service) return { title: "Not Found" };

  const url = `${SITE_URL}/services/${service.slug.current}/${l.slug}`;
  const title = `${service.title} near ${l.name}, Bangalore | Divit MindSpace`;
  const description = `${service.title} for families near ${l.name}. ${service.description} At our Kasavanahalli center off Sarjapur Road — a short drive from ${l.name}.`;
  const ogImage = service.image?.asset?.url || "/divit-mindspace-logo.png";

  return {
    title,
    description,
    keywords: [
      `${service.title} ${l.name}`,
      `${service.title} near ${l.name}`,
      `${service.title} bangalore`,
      ...l.keywords.slice(0, 3),
    ],
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      images: [{ url: ogImage, alt: `${service.title} at Divit MindSpace near ${l.name}` }],
      siteName: "Divit MindSpace",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
  };
}

// Map service category → richest schema type — mirrors /services/[slug] logic.
const serviceTypeByCategory: Record<string, string> = {
  assessments: "MedicalProcedure",
  therapy: "MedicalTherapy",
  physiotherapy: "MedicalTherapy",
  guidance: "Service",
  programs: "EducationalOccupationalProgram",
};

export default async function ServiceLocationPage({ params }: PageProps) {
  const { slug, location } = await params;
  const l: LocationPivot | undefined = LOCATION_PIVOTS.find((x) => x.slug === location);
  if (!l) notFound();

  const { data: service } = (await sanityFetch({
    query: SINGLE_SERVICE_QUERY,
    params: { slug },
    tags: ["services"],
  })) as { data: ServiceData | null };
  if (!service) notFound();

  const pageUrl = `${SITE_URL}/services/${service.slug.current}/${l.slug}`;
  const schemaType = serviceTypeByCategory[service.category] || "MedicalService";
  const isMedicalType = schemaType === "MedicalTherapy" || schemaType === "MedicalProcedure" || schemaType === "MedicalService";

  // Condition pivots this service addresses — lets us cross-link from location page to condition pages.
  const addressedConditions = CONDITION_PIVOTS.filter((c) => c.serviceSlugs.includes(service.slug.current));

  const graph: Record<string, unknown>[] = [
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
        { "@type": "ListItem", position: 3, name: service.title, item: `${SITE_URL}/services/${service.slug.current}` },
        { "@type": "ListItem", position: 4, name: `Near ${l.name}`, item: pageUrl },
      ],
    },
    {
      "@type": schemaType,
      "@id": `${pageUrl}#service`,
      name: `${service.title} near ${l.name}`,
      description: service.description,
      url: pageUrl,
      image: service.image?.asset?.url,
      provider: ORGANIZATION_REF,
      areaServed: [
        { "@type": "Place", name: l.name },
        ...l.nearby.map((n) => ({ "@type": "Place", name: n })),
        { "@type": "City", name: "Bangalore" },
      ],
      spatialCoverage: {
        "@type": "Place",
        name: l.name,
        containedInPlace: {
          "@type": "City",
          name: "Bangalore",
          containedInPlace: { "@type": "AdministrativeArea", name: "Karnataka" },
        },
      },
      ...(isMedicalType ? MEDICAL_CONTENT_REVIEW_BLOCK : {}),
      ...(service.format && {
        availableChannel: { "@type": "ServiceChannel", serviceLocation: { "@type": "Place", name: service.format } },
      }),
    },
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: `${service.title} near ${l.name}, Bangalore`,
      inLanguage: SITE_LANGUAGE,
      isPartOf: { "@id": WEBSITE_ID },
      mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
    },
  ];
  const jsonLd = { "@context": "https://schema.org", "@graph": graph };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-[#FAF9F5] min-h-screen">
        <div className="bg-cream/50 border-b border-green/10">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-wrap items-center gap-2 text-sm text-green/60">
              <Link href="/" className="hover:text-green transition-colors">Home</Link>
              <span>/</span>
              <Link href="/services" className="hover:text-green transition-colors">Services</Link>
              <span>/</span>
              <Link href={`/services/${service.slug.current}`} className="hover:text-green transition-colors">
                {service.title}
              </Link>
              <span>/</span>
              <span className="text-green font-medium">Near {l.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="pt-8 pb-6 lg:pt-10 lg:pb-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-black/5 text-black text-[10px] font-bold uppercase tracking-widest">
                <MapPin className="w-3 h-3 text-[#7A9A7D]" />
                Serving {l.name}
              </div>
              <h1
                className="text-3xl md:text-4xl lg:text-5xl font-serif text-green mb-4 leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
              >
                {service.title} near {l.name}
              </h1>
              <p className="text-lg text-black/70 max-w-3xl font-medium mb-3">
                {service.description}
              </p>
              <p className="text-sm text-[#7A9A7D] font-bold uppercase tracking-widest mb-4">
                {l.proximity} · Aadeshwar Chambers, Kasavanahalli
              </p>
            </div>
          </div>
        </section>

        {/* Service content */}
        <section className="py-6 lg:py-8 bg-cream">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {service.overview && (
                <div className="mb-8">
                  <h2
                    className="text-2xl lg:text-3xl font-serif text-green mb-4"
                    style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
                  >
                    Overview
                  </h2>
                  <p className="text-black/70 leading-relaxed font-medium">{service.overview}</p>
                </div>
              )}

              {service.benefits && service.benefits.length > 0 && (
                <div className="mb-8 bg-white rounded-2xl p-6 lg:p-8 border border-green/10">
                  <h2
                    className="text-2xl lg:text-3xl font-serif text-green mb-6"
                    style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
                  >
                    What You&apos;ll Gain
                  </h2>
                  <ul className="space-y-3">
                    {service.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-green/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-green" />
                        </div>
                        <span className="text-black/70 font-medium">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Directions */}
        <section className="py-8 lg:py-10 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto bg-[#FAF9F5] rounded-[2rem] border border-black/5 p-6 lg:p-8">
              <h2
                className="text-2xl lg:text-3xl font-serif text-black mb-5 text-center"
                style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
              >
                How to reach us from {l.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
                <div>
                  <div className="font-bold text-[#7A9A7D] text-[10px] uppercase tracking-widest mb-2">Address</div>
                  <p className="text-black/70 font-medium leading-relaxed">
                    Aadeshwar Chambers,<br />
                    Kasavanahalli, Off Sarjapur Road,<br />
                    Bengaluru 560035
                  </p>
                  <a
                    href="https://maps.google.com/?q=Aadeshwar+Chambers+Kasavanahalli+Bengaluru"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-3 text-sm text-[#7A9A7D] font-semibold underline underline-offset-4 decoration-2 decoration-[#7A9A7D]/30"
                  >
                    Get directions <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
                <div>
                  <div className="font-bold text-[#7A9A7D] text-[10px] uppercase tracking-widest mb-2">Hours &amp; Contact</div>
                  <p className="text-black/70 font-medium leading-relaxed mb-3">
                    Monday – Saturday · 9 AM – 6 PM
                  </p>
                  <a href="tel:+919901666139" className="inline-flex items-center gap-2 text-sm text-[#7A9A7D] font-semibold">
                    <Phone className="w-4 h-4" /> +91 99016 66139
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cross-links: conditions this service addresses + nearby neighborhood variants */}
        <section className="py-8 lg:py-10 bg-cream">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {addressedConditions.length > 0 && (
                <div className="mb-8">
                  <h3
                    className="text-xl font-serif text-black mb-4"
                    style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
                  >
                    Conditions this helps with
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {addressedConditions.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/conditions/${c.slug}/${l.slug}`}
                        className="px-3 py-1.5 rounded-full bg-white border border-black/5 text-sm font-semibold text-black/70 hover:bg-[#7A9A7D] hover:text-white hover:border-[#7A9A7D] transition-all"
                      >
                        {c.name} near {l.name} →
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3
                  className="text-xl font-serif text-black mb-4"
                  style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
                >
                  {service.title} near other Bangalore locations
                </h3>
                <div className="flex flex-wrap gap-2">
                  {LOCATION_PIVOTS.filter((loc) => loc.slug !== l.slug).map((loc) => (
                    <Link
                      key={loc.slug}
                      href={`/services/${service.slug.current}/${loc.slug}`}
                      className="px-3 py-1.5 rounded-full bg-white border border-black/5 text-sm font-semibold text-black/70 hover:border-[#7A9A7D]/30 transition-colors"
                    >
                      {loc.name} →
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pt-6 pb-12 lg:pt-8 lg:pb-16">
          <div className="container mx-auto px-4">
            <InlineCtaBlock />
          </div>
        </section>
      </div>
    </>
  );
}
