import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { sanityFetch } from "@/sanity/lib/live";
import {
  SPECIALIST_BY_SLUG_QUERY,
  ALL_SPECIALIST_SLUGS_QUERY,
} from "@/sanity/lib/queries";
import { WhatsAppConsultationLink } from "@/components/whatsapp-consultation-link";
import { InlineCtaBlock } from "@/components/inline-cta-block";
import { ORGANIZATION_REF, SITE_URL } from "@/lib/seo";
import { CONDITION_PIVOTS, LOCATION_PIVOTS } from "@/lib/seo-pivots";
import { ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

interface SpecialistData {
  _id: string;
  name: string;
  slug: string;
  title: string;
  image?: { asset?: { url?: string }; alt?: string };
  experience?: string;
  specialties?: string[];
  teaser: string;
  fullBio?: unknown;
  servicesProvided?: { _id: string; title: string; slug: string; category?: string }[];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { data: slugs } = (await sanityFetch({
    query: ALL_SPECIALIST_SLUGS_QUERY,
    tags: ["specialist"],
  })) as { data: { slug: string }[] | null };
  return (slugs || []).map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data } = (await sanityFetch({
    query: SPECIALIST_BY_SLUG_QUERY,
    params: { slug },
    tags: ["specialist"],
  })) as { data: SpecialistData | null };

  if (!data) return { title: "Specialist Not Found" };

  const specialistUrl = `${SITE_URL}/specialists/${data.slug}`;
  const title = `${data.name} — ${data.title} | Divit MindSpace Bangalore`;
  const description = data.teaser;

  return {
    title,
    description,
    keywords: [
      data.name,
      `${data.name} Bangalore`,
      `${data.name} Sarjapur Road`,
      ...(data.specialties || []).map((s) => `${s} Bangalore`),
      ...(data.specialties || []).map((s) => `${s} Sarjapur Road`),
      data.title,
    ],
    alternates: { canonical: specialistUrl },
    openGraph: {
      type: "profile",
      url: specialistUrl,
      title,
      description,
      images: data.image?.asset?.url
        ? [{ url: data.image.asset.url, width: 1200, height: 630, alt: data.name }]
        : undefined,
      siteName: "Divit MindSpace",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: data.image?.asset?.url ? [data.image.asset.url] : undefined,
    },
    robots: { index: true, follow: true },
  };
}

export default async function SpecialistPage({ params }: PageProps) {
  const { slug } = await params;
  const { data } = (await sanityFetch({
    query: SPECIALIST_BY_SLUG_QUERY,
    params: { slug },
    tags: ["specialist"],
  })) as { data: SpecialistData | null };

  if (!data) notFound();

  const specialistUrl = `${SITE_URL}/specialists/${data.slug}`;
  const imageUrl = data.image?.asset?.url;

  // Conditions this specialist supports — derived from their specialties matching condition pivot tags.
  const specialtyLower = (data.specialties || []).map((s) => s.toLowerCase());
  const treatedConditions = CONDITION_PIVOTS.filter((c) =>
    c.specialtyTags.some((tag) => {
      const t = tag.toLowerCase();
      return specialtyLower.some((sp) => sp.includes(t) || t.includes(sp));
    }),
  );

  // Person schema — references canonical Organization by @id.
  // medicalSpecialty mirrors the specialties tag list (LLMs match these to query intent).
  // Languages default to the Organization's declared availableLanguage set.
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${specialistUrl}#person`,
    name: data.name,
    url: specialistUrl,
    jobTitle: data.title,
    description: data.teaser,
    image: imageUrl,
    worksFor: ORGANIZATION_REF,
    knowsAbout: data.specialties || [],
    knowsLanguage: ["English", "Hindi", "Kannada"],
    ...(data.specialties && data.specialties.length > 0 && {
      medicalSpecialty: data.specialties,
    }),
    ...(data.experience && {
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Experience",
        name: `${data.experience} of professional experience`,
      },
    }),
    // Dedicated contact channel — same number they'll reach on clicking "Book".
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-99016-66139",
      contactType: "appointments",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi", "Kannada"],
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "About Us", item: `${SITE_URL}/about-us` },
      { "@type": "ListItem", position: 3, name: data.name, item: specialistUrl },
    ],
  };

  const pageGraph = {
    "@context": "https://schema.org",
    "@graph": [personJsonLd, breadcrumbJsonLd].map((s) => {
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
              <Link href="/about-us" className="hover:text-green transition-colors">
                About Us
              </Link>
              <span>/</span>
              <span className="text-green font-medium">{data.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="pt-8 pb-6 lg:pt-12 lg:pb-10">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 md:gap-12 items-start">
              {/* Photo */}
              {imageUrl && (
                <div className="relative w-full max-w-[280px] aspect-[4/5] rounded-[2rem] overflow-hidden border-8 border-white shadow-2xl mx-auto">
                  <Image
                    src={imageUrl}
                    alt={data.image?.alt || data.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 280px, 280px"
                    priority
                  />
                </div>
              )}

              {/* Intro */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-black/5 text-black text-[10px] font-bold uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7A9A7D]" />
                  Our Team
                </div>
                <h1
                  className="text-4xl lg:text-5xl font-serif text-black mb-4 leading-tight"
                  style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
                >
                  {data.name}
                </h1>
                <p className="text-base text-[#7A9A7D] font-semibold mb-4">{data.title}</p>
                <p className="text-lg text-black/70 font-medium leading-relaxed mb-6">
                  {data.teaser}
                </p>

                {data.experience && (
                  <p className="text-sm text-black/60 font-medium mb-4">
                    <span className="font-semibold text-black/80">Experience:</span>{" "}
                    {data.experience}
                  </p>
                )}

                {data.specialties && data.specialties.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {data.specialties.map((sp) => (
                      <span
                        key={sp}
                        className="px-3 py-1.5 rounded-full bg-white border border-black/5 text-[11px] font-semibold text-black/70 shadow-sm shadow-black/[0.02] tracking-wide"
                      >
                        {sp}
                      </span>
                    ))}
                  </div>
                )}

                <WhatsAppConsultationLink className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full bg-[#7A9A7D] text-white text-sm font-semibold hover:bg-[#6b8a6e] transition-colors">
                  Book a Free Consultation
                  <ArrowRight className="w-4 h-4" />
                </WhatsAppConsultationLink>
              </div>
            </div>
          </div>
        </section>

        {/* Full bio */}
        {Array.isArray(data.fullBio) && data.fullBio.length > 0 && (
          <section className="pb-8 lg:pb-12">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto bg-white rounded-[2rem] border border-black/5 shadow-xl shadow-black/[0.02] p-8 lg:p-12">
                <h2
                  className="text-2xl lg:text-3xl font-serif text-black mb-6"
                  style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
                >
                  About {data.name.split(" ")[0]}
                </h2>
                <div className="prose prose-lg text-black/70 font-medium max-w-none">
                  <PortableText value={data.fullBio as never} />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Conditions supported — condition-first search intent */}
        {treatedConditions.length > 0 && (
          <section className="pb-8 lg:pb-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2
                  className="text-2xl lg:text-3xl font-serif text-black mb-6 text-center"
                  style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
                >
                  Conditions {data.name.split(" ")[0]} Supports
                </h2>
                <div className="flex flex-wrap justify-center gap-3">
                  {treatedConditions.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/conditions/${c.slug}`}
                      className="px-4 py-2 rounded-full bg-white border border-black/5 text-sm font-semibold text-black/70 hover:bg-[#7A9A7D] hover:text-white hover:border-[#7A9A7D] transition-all"
                    >
                      {c.name} →
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Services provided (internal linking for SEO + LLM entity chain) */}
        {data.servicesProvided && data.servicesProvided.length > 0 && (
          <section className="pb-8 lg:pb-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2
                  className="text-2xl lg:text-3xl font-serif text-black mb-6 text-center"
                  style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
                >
                  Services {data.name.split(" ")[0]} Provides
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {data.servicesProvided.map((svc) => (
                    <Link
                      key={svc._id}
                      href={`/services/${svc.slug}`}
                      className="block p-5 bg-white rounded-2xl border border-black/5 hover:border-[#7A9A7D]/30 hover:shadow-lg transition-all group"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="font-semibold text-black group-hover:text-[#7A9A7D] transition-colors">
                          {svc.title}
                        </span>
                        <ArrowRight className="w-4 h-4 text-black/40 group-hover:text-[#7A9A7D] group-hover:translate-x-1 transition-all shrink-0" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Where this specialist practices — closes specialist ↔ location entity graph */}
        <section className="pb-8 lg:pb-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2
                className="text-2xl lg:text-3xl font-serif text-black mb-6 text-center"
                style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
              >
                Where {data.name.split(" ")[0]} Practices
              </h2>
              <p className="text-black/60 font-medium text-center mb-6 max-w-2xl mx-auto">
                Our Kasavanahalli center (off Sarjapur Road) serves families across Bangalore.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {LOCATION_PIVOTS.map((l) => (
                  <Link
                    key={l.slug}
                    href={`/near-me/${l.slug}`}
                    className="px-4 py-2 rounded-full bg-white border border-black/5 text-sm font-semibold text-black/70 hover:bg-[#7A9A7D] hover:text-white hover:border-[#7A9A7D] transition-all"
                  >
                    {l.name} →
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA — shared voice */}
        <section className="pt-4 pb-12 lg:pt-6 lg:pb-16">
          <div className="container mx-auto px-4">
            <InlineCtaBlock heading={`Work with ${data.name.split(" ")[0]}`} />
          </div>
        </section>
      </div>
    </>
  );
}
