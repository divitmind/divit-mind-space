import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { SINGLE_SERVICE_QUERY, ALL_SERVICE_SLUGS_QUERY, RELATED_SERVICES_QUERY } from "@/sanity/lib/queries";
import { WhatsAppConsultationLink } from "@/components/whatsapp-consultation-link";
import { ServiceExperts } from "@/components/services/service-experts";
import { ServiceFAQ } from "@/components/services/service-faq";
import { Check } from "lucide-react";
import type { Specialist } from "@/sanity/types";
import { ORGANIZATION_REF, SITE_URL, MEDICAL_CONTENT_REVIEW_BLOCK, MEDICAL_CONTENT_LAST_REVIEWED, MEDICAL_CONTENT_REVIEWER_UI } from "@/lib/seo";
import { ContentReviewBadge } from "@/components/content-review-badge";
import { CONDITION_PIVOTS, LOCATION_PIVOTS } from "@/lib/seo-pivots";
import { HOWTO_ARTICLES, SERVICE_TO_HOWTO } from "@/lib/howto";

// Force dynamic rendering - always fetch fresh data from Sanity
export const dynamic = "force-dynamic";

interface ServiceData {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  category: string;
  image?: {
    asset?: { url: string };
    alt?: string;
  };
  overview?: string;
  benefits?: string[];
  whatToExpect?: string[];
  whoIsItForTitle?: string;
  whoIsItFor?: string[];
  duration?: string;
  format?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
  faqs?: { question: string; answer: string }[];
  ctaOverride?: {
    title?: string;
    description?: string;
    buttonText?: string;
  };
  onDemand?: boolean;
  specialists?: Specialist[];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { data: slugs } = await sanityFetch({
    query: ALL_SERVICE_SLUGS_QUERY,
    tags: ["services"],
  }) as { data: { slug: string }[] | null };

  return (slugs || []).map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const { data: service } = await sanityFetch({
    query: SINGLE_SERVICE_QUERY,
    params: { slug },
    tags: ["services"],
  }) as { data: ServiceData | null };

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  const serviceUrl = `https://divitmindspace.com/services/${service.slug.current}`;
  const title = service.seo?.metaTitle || service.title;
  const description = service.seo?.metaDescription || service.description;
  // Prefer the service's own image as the OG preview — much higher social/LLM
  // click-through than a generic logo. Fall back to logo only if unset.
  const ogImage = service.image?.asset?.url || "https://divitmindspace.com/divit-mindspace-logo.png";
  const ogAlt = service.image?.alt || `${service.title} at Divit MindSpace`;

  return {
    title: `${title} | Divit MindSpace`,
    description: description,
    openGraph: {
      title: title,
      description: description,
      type: "website",
      url: serviceUrl,
      siteName: "Divit MindSpace",
      images: [{ url: ogImage, alt: ogAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [ogImage],
    },
    alternates: {
      canonical: serviceUrl,
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;

  const { data: service } = await sanityFetch({
    query: SINGLE_SERVICE_QUERY,
    params: { slug },
    tags: ["services"],
  }) as { data: ServiceData | null };

  if (!service) {
    notFound();
  }

  // Sibling services from the same category — powers the internal-linking entity graph.
  const { data: relatedData } = (await sanityFetch({
    query: RELATED_SERVICES_QUERY,
    params: { category: service.category, currentSlug: service.slug.current },
    tags: ["services"],
  })) as { data: { _id: string; title: string; slug: string; description: string; category: string }[] | null };
  const related = relatedData ?? [];

  // Find condition-pivot pages that list this service — powers "Conditions this addresses"
  // internal linking + closes the bidirectional entity graph (condition ↔ service).
  const addressedConditions = CONDITION_PIVOTS.filter((c) =>
    c.serviceSlugs.includes(service.slug.current),
  );

  // Matching preparation guide — rendered as a "Preparation Guide" callout on service pages.
  const howtoSlug = SERVICE_TO_HOWTO[service.slug.current];
  const howtoArticle = howtoSlug
    ? HOWTO_ARTICLES.find((a) => a.slug === howtoSlug)
    : undefined;

  const serviceUrl = `${SITE_URL}/services/${service.slug.current}`;

  // Map category → richest schema type. Physiotherapy and therapies are MedicalTherapy;
  // assessments are MedicalProcedure; guidance/workshops are Service; programs are
  // EducationalOccupationalProgram. Using the most specific type improves LLM matching.
  const serviceTypeByCategory: Record<string, string> = {
    assessments: "MedicalProcedure",
    therapy: "MedicalTherapy",
    physiotherapy: "MedicalTherapy",
    guidance: "Service",
    programs: "EducationalOccupationalProgram",
  };
  const schemaType = serviceTypeByCategory[service.category] || "MedicalService";

  // Per-service medical-schema enrichment for YMYL E-E-A-T.
  // medicineSystem: the broad discipline (Google uses this to classify healthcare results).
  // relevantSpecialty: maps to schema.org MedicalSpecialty enum where a match exists.
  // recognizingAuthority: the Indian regulatory or professional body that certifies providers.
  const SERVICE_MEDICAL_META: Record<
    string,
    {
      medicineSystem: string;
      relevantSpecialty?: string;
      recognizingAuthority?: { name: string; url: string };
    }
  > = {
    // Therapies
    "speech-therapy": {
      medicineSystem: "Speech-Language Pathology",
      recognizingAuthority: { name: "Rehabilitation Council of India (RCI)", url: "https://www.rehabcouncil.nic.in/" },
    },
    "occupational-therapy": {
      medicineSystem: "Occupational Therapy",
      relevantSpecialty: "OccupationalTherapy",
      recognizingAuthority: { name: "All India Occupational Therapists' Association (AIOTA)", url: "https://www.aiota.org/" },
    },
    "behavioral-therapy": {
      medicineSystem: "Behavioral Health",
      relevantSpecialty: "Psychiatric",
      recognizingAuthority: { name: "Rehabilitation Council of India (RCI)", url: "https://www.rehabcouncil.nic.in/" },
    },
    "cognitive-therapy": {
      medicineSystem: "Clinical Psychology",
      relevantSpecialty: "Psychiatric",
      recognizingAuthority: { name: "Rehabilitation Council of India (RCI)", url: "https://www.rehabcouncil.nic.in/" },
    },
    "play-therapy": {
      medicineSystem: "Child Psychology",
      relevantSpecialty: "Pediatric",
      recognizingAuthority: { name: "Rehabilitation Council of India (RCI)", url: "https://www.rehabcouncil.nic.in/" },
    },
    "group-therapy-sessions": {
      medicineSystem: "Behavioral Health",
      relevantSpecialty: "Psychiatric",
      recognizingAuthority: { name: "Rehabilitation Council of India (RCI)", url: "https://www.rehabcouncil.nic.in/" },
    },
    "sensory-integration-program": {
      medicineSystem: "Occupational Therapy",
      relevantSpecialty: "OccupationalTherapy",
      recognizingAuthority: { name: "All India Occupational Therapists' Association (AIOTA)", url: "https://www.aiota.org/" },
    },
    "brain-gym": { medicineSystem: "Neurodevelopmental Therapy" },
    // Assessments
    "psychometric-assessments": {
      medicineSystem: "Clinical Psychology",
      relevantSpecialty: "Psychiatric",
      recognizingAuthority: { name: "Rehabilitation Council of India (RCI)", url: "https://www.rehabcouncil.nic.in/" },
    },
    "psychoeducational-assessments": {
      medicineSystem: "Educational Psychology",
      relevantSpecialty: "Pediatric",
      recognizingAuthority: { name: "Rehabilitation Council of India (RCI)", url: "https://www.rehabcouncil.nic.in/" },
    },
    // Counselling
    counselling: {
      medicineSystem: "Clinical Psychology",
      relevantSpecialty: "Psychiatric",
      recognizingAuthority: { name: "Rehabilitation Council of India (RCI)", url: "https://www.rehabcouncil.nic.in/" },
    },
    // Physiotherapy
    "pain-management": {
      medicineSystem: "Physical Therapy",
      relevantSpecialty: "PhysicalTherapy",
      recognizingAuthority: { name: "Indian Association of Physiotherapists (IAP)", url: "https://physiotherapyindia.org/" },
    },
    "pain-modalities": {
      medicineSystem: "Physical Therapy",
      relevantSpecialty: "PhysicalTherapy",
      recognizingAuthority: { name: "Indian Association of Physiotherapists (IAP)", url: "https://physiotherapyindia.org/" },
    },
    "post-surgical-rehabilitation": {
      medicineSystem: "Physical Therapy",
      relevantSpecialty: "PhysicalTherapy",
      recognizingAuthority: { name: "Indian Association of Physiotherapists (IAP)", url: "https://physiotherapyindia.org/" },
    },
    "gym--sports-injury-sessions": {
      medicineSystem: "Sports Medicine",
      relevantSpecialty: "SportsMedicine",
      recognizingAuthority: { name: "Indian Association of Physiotherapists (IAP)", url: "https://physiotherapyindia.org/" },
    },
    "assistive-devices": { medicineSystem: "Rehabilitation Medicine" },
    "wheelchair-training": { medicineSystem: "Rehabilitation Medicine" },
  };
  const medicalMeta = SERVICE_MEDICAL_META[service.slug.current];

  // Main Service/Therapy/Procedure schema — provider references canonical Organization via @id.
  // Medical service types get lastReviewed/reviewedBy to meet YMYL signals Google weighs
  // heavily for healthcare content.
  const isMedicalType =
    schemaType === "MedicalTherapy" || schemaType === "MedicalProcedure" || schemaType === "MedicalService";
  const serviceJsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": schemaType,
    "@id": `${serviceUrl}#service`,
    name: service.title,
    description: service.description,
    url: serviceUrl,
    image: service.image?.asset?.url,
    provider: ORGANIZATION_REF,
    ...(isMedicalType ? MEDICAL_CONTENT_REVIEW_BLOCK : {}),
    // YMYL enrichment — medicineSystem/relevantSpecialty/recognizingAuthority signal
    // to Google and LLMs that this is a bona-fide healthcare service under a recognized
    // Indian regulatory body. Only emitted when we have trusted mapping data for the slug.
    ...(isMedicalType && medicalMeta
      ? {
          medicineSystem: medicalMeta.medicineSystem,
          ...(medicalMeta.relevantSpecialty && { relevantSpecialty: medicalMeta.relevantSpecialty }),
          ...(medicalMeta.recognizingAuthority && {
            recognizingAuthority: {
              "@type": "Organization",
              name: medicalMeta.recognizingAuthority.name,
              url: medicalMeta.recognizingAuthority.url,
            },
          }),
        }
      : {}),
    areaServed: [
      { "@type": "City", name: "Bangalore" },
      { "@type": "City", name: "Bengaluru" },
      { "@type": "Place", name: "Sarjapur Road" },
      { "@type": "Place", name: "Kasavanahalli" },
      { "@type": "Place", name: "HSR Layout" },
      { "@type": "Place", name: "Bellandur" },
      { "@type": "Place", name: "Koramangala" },
      { "@type": "Place", name: "Whitefield" },
      { "@type": "Place", name: "Electronic City" },
    ],
    ...(service.duration && { termsOfService: service.duration }),
    ...(service.format && {
      availableChannel: {
        "@type": "ServiceChannel",
        serviceLocation: { "@type": "Place", name: service.format },
      },
    }),
    // For programs / educational entries, add audience hint.
    ...(schemaType === "EducationalOccupationalProgram" && {
      educationalProgramMode: "onsite",
    }),
    // Cross-link sibling services in same category — entity graph signal for LLMs
    // ("what else does Divit MindSpace offer in this area?").
    ...(related.length > 0 && {
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `Related ${service.category} services`,
        itemListElement: related.map((r) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: r.title,
            url: `${SITE_URL}/services/${r.slug}`,
          },
        })),
      },
    }),
  };

  // Dedicated FAQPage schema — Google recommends separate block over nesting in mainEntity.
  const faqPageJsonLd =
    service.faqs && service.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: service.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  const categoryLabels: Record<string, string> = {
    assessments: "Assessment",
    therapy: "Therapy",
    guidance: "Counselling",
    programs: "Program",
    physiotherapy: "Physiotherapy",
  };

  // Breadcrumb
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
      { "@type": "ListItem", position: 3, name: service.title, item: serviceUrl },
    ],
  };

  return (
    <>
      {/* Single @graph — Google recommends this over multiple independent blocks. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              ...[serviceJsonLd, breadcrumbJsonLd, ...(faqPageJsonLd ? [faqPageJsonLd] : [])].map(
                (s) => {
                  const clone: Record<string, unknown> = { ...(s as Record<string, unknown>) };
                  delete clone["@context"];
                  return clone;
                },
              ),
            ],
          }),
        }}
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
              <Link href="/services" className="hover:text-green transition-colors">
                Services
              </Link>
              <span>/</span>
              <span className="text-green font-medium">{service.title}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="pt-8 pb-4 lg:pt-10 lg:pb-6">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Category Badge */}
              {service.category && (
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-purple/10 text-purple text-xs font-bold uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-purple" />
                  {categoryLabels[service.category] || service.category}
                </div>
              )}

              {/* Title */}
              <h1
                className="text-3xl md:text-4xl lg:text-5xl font-serif text-green mb-4 leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
              >
                {service.title}
              </h1>

              {/* Description */}
              <p className="text-lg text-black/70 mb-4 max-w-3xl font-medium">
                {service.description}
              </p>
              {isMedicalType && (
                <ContentReviewBadge
                  lastReviewedDate={MEDICAL_CONTENT_LAST_REVIEWED}
                  reviewer={MEDICAL_CONTENT_REVIEWER_UI}
                  compact
                />
              )}
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-6 lg:py-8 bg-cream">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Overview */}
              {service.overview && (
                <div className="mb-8">
                  <h2
                    className="text-2xl lg:text-3xl font-serif text-green mb-4"
                    style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
                  >
                    Overview
                  </h2>
                  <p className="text-black/70 leading-relaxed font-medium">
                    {service.overview}
                  </p>
                </div>
              )}

              {/* Benefits */}
              {service.benefits && service.benefits.length > 0 && (
                <div className="mb-8 bg-white rounded-2xl p-6 lg:p-8 border border-green/10">
                  <h2
                    className="text-2xl lg:text-3xl font-serif text-green mb-6"
                    style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
                  >
                    What You&apos;ll Gain
                  </h2>
                  <ul className="space-y-3">
                    {service.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-green/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-green" />
                        </div>
                        <span className="text-black/70 font-medium">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* What to Expect */}
              {service.whatToExpect && service.whatToExpect.length > 0 && (
                <div className="mb-8">
                  <h2
                    className="text-2xl lg:text-3xl font-serif text-green mb-6"
                    style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
                  >
                    What to Expect
                  </h2>
                  <div className="space-y-4">
                    {service.whatToExpect.map((item, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-purple/10 flex items-center justify-center flex-shrink-0 text-purple font-semibold text-sm">
                          {index + 1}
                        </div>
                        <p className="text-black/70 pt-1 font-medium">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Who Is It For */}
              {service.whoIsItFor && service.whoIsItFor.length > 0 && (
                <div className="mb-0 bg-white rounded-2xl p-6 lg:p-8 border border-green/10">
                  <h2
                    className="text-2xl lg:text-3xl font-serif text-green mb-6"
                    style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
                  >
                    {service.whoIsItForTitle || "Is This Right for You or Your Loved Ones?"}
                  </h2>
                  <ul className="space-y-3">
                    {service.whoIsItFor.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-yellow/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-yellow-700" />
                        </div>
                        <span className="text-black/70 font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Dynamic Experts Section */}
        <ServiceExperts 
          specialists={service.specialists || []} 
          onDemand={service.onDemand} 
        />

        {/* Dynamic FAQ Section */}
        <ServiceFAQ faqs={service.faqs || []} />

        {/* Preparation guide (if a matching HowTo article exists) — closes service ↔ HowTo graph */}
        {howtoArticle && (
          <section className="py-6 lg:py-8 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <Link
                  href={`/howto/${howtoArticle.slug}`}
                  className="group flex items-center justify-between gap-4 p-6 rounded-2xl bg-[#FAF9F5] border border-green/10 hover:border-green/30 hover:shadow-lg transition-all"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-green/60 text-[10px] uppercase tracking-widest mb-2">
                      Preparation Guide
                    </div>
                    <div className="font-semibold text-green group-hover:text-green/80 transition-colors mb-1">
                      {howtoArticle.title}
                    </div>
                    <p className="text-sm text-black/60 line-clamp-2">{howtoArticle.lead}</p>
                  </div>
                  <span className="text-green text-sm font-semibold whitespace-nowrap">
                    Read guide →
                  </span>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Conditions this service addresses — internal linking for condition-first search intent */}
        {addressedConditions.length > 0 && (
          <section className="py-8 lg:py-10 bg-[#FAF9F5]">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2
                  className="text-2xl lg:text-3xl font-serif text-green mb-6 text-center"
                  style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
                >
                  Conditions This Helps With
                </h2>
                <div className="flex flex-wrap justify-center gap-3">
                  {addressedConditions.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/conditions/${c.slug}`}
                      className="px-4 py-2 rounded-full bg-white border border-green/10 text-sm font-semibold text-green hover:bg-green hover:text-white transition-all"
                    >
                      {c.name} →
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Available near — closes service ↔ location entity graph */}
        <section className="py-8 lg:py-10 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2
                className="text-2xl lg:text-3xl font-serif text-green mb-6 text-center"
                style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
              >
                Available for families near
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {LOCATION_PIVOTS.map((l) => (
                  <Link
                    key={l.slug}
                    href={`/near-me/${l.slug}`}
                    className="px-4 py-2 rounded-full bg-[#FAF9F5] border border-black/5 text-sm font-semibold text-black/70 hover:bg-green hover:text-white hover:border-green transition-all"
                  >
                    {l.name} →
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related services — internal linking boost for SEO + entity graph for LLMs */}
        {related.length > 0 && (
          <section className="py-8 lg:py-10 bg-cream">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2
                  className="text-2xl lg:text-3xl font-serif text-green mb-6 text-center"
                  style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
                >
                  Related {categoryLabels[service.category] || "Services"}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {related.map((r) => (
                    <Link
                      key={r._id}
                      href={`/services/${r.slug}`}
                      className="block p-5 bg-white rounded-2xl border border-green/10 hover:border-green/30 hover:shadow-lg transition-all group"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-green group-hover:text-green/80 transition-colors mb-1">
                            {r.title}
                          </h3>
                          <p className="text-sm text-black/60 line-clamp-2">{r.description}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <section className="pt-6 pb-8 lg:pt-8 lg:pb-10 bg-[#FAF9F5]">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center bg-white rounded-2xl p-8 lg:p-10 border border-green/10 shadow-sm">
              <h2
                className="text-2xl lg:text-3xl font-serif text-green mb-4"
                style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
              >
                {service.ctaOverride?.title || "Take the Next Step Toward Your Wellbeing"}
              </h2>
              <p className="text-green/70 mb-6 font-medium">
                {service.ctaOverride?.description || 
                  `Book a free consultation to explore how ${service.title} can help you achieve your clinical goals. Our multidisciplinary experts provide the clarity and support needed for individuals of all ages.`}
              </p>
              <WhatsAppConsultationLink className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-green text-white font-semibold hover:bg-green/90 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {service.ctaOverride?.buttonText || "Book Free Consultation"}
              </WhatsAppConsultationLink>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
