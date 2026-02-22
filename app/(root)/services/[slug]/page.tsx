import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "next-sanity";
import { ServiceHeader } from "@/components/services/service-header";
import { sanityFetch } from "@/sanity/lib/live";
import { client } from "@/sanity/lib/client";
import { ALL_SERVICE_SLUGS_QUERY, SINGLE_SERVICE_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import type { Service } from "@/sanity/types";
import { portableTextComponents } from "@/components/portable-text-components";
import { CtaSection } from "@/components/homepage/cta-section";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const services = await client.fetch<{ slug: string }[]>(ALL_SERVICE_SLUGS_QUERY);

  return services?.map((service) => ({
    slug: service.slug,
  })) || [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  const { data: service } = await sanityFetch({
    query: SINGLE_SERVICE_QUERY,
    params: { slug },
    tags: ["services"],
  });

  const serviceData = service as Service;

  if (!serviceData) {
    return {
      title: "Service Not Found",
    };
  }

  const title = serviceData.seo?.metaTitle || serviceData.title;
  const description = serviceData.seo?.metaDescription || serviceData.description || "";
  const ogImage = serviceData.seo?.ogImage || serviceData.image;
  const ogImageUrl = ogImage ? urlFor(ogImage)?.width(1200).height(630).url() : null;
  const serviceUrl = `https://divitmindspace.com/services/${serviceData.slug.current}`;

  return {
    title: `${title} | Divit MindSpace`,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: serviceUrl,
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630, alt: title }] : [],
      siteName: "Divit MindSpace",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImageUrl ? [ogImageUrl] : [],
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
  });

  const serviceData = service as Service;

  if (!serviceData) {
    notFound();
  }

  const mainImageUrl = serviceData.image
    ? urlFor(serviceData.image)?.width(1200).height(600).url()
    : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceData.title,
    description: serviceData.description || "",
    image: mainImageUrl || "",
    provider: {
      "@type": "Organization",
      name: "Divit MindSpace",
      url: "https://divitmindspace.com",
      logo: {
        "@type": "ImageObject",
        url: "https://divitmindspace.com/divit-mindspace-logo.png",
      },
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    serviceType: "Healthcare/Education",
    url: `https://divitmindspace.com/services/${serviceData.slug.current}`,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: serviceData.title,
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: serviceData.title,
            description: serviceData.description || "",
          },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-[#FDFBF7] min-h-screen">
        <div className="bg-cream/50 border-b border-green/10">
          <div className="container mx-auto px-4 py-4 md:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm text-green/60">
              <Link href="/" className="hover:text-green transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/services" className="hover:text-green transition-colors">
                Services
              </Link>
              <span>/</span>
              <span className="text-green font-medium">{serviceData.title}</span>
            </nav>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-4 py-12 md:px-6 lg:px-8 md:py-16">
          <ServiceHeader
            title={serviceData.title}
            description={serviceData.description}
            popular={serviceData.popular}
          />

          {mainImageUrl && (
            <div className="mt-12 overflow-hidden rounded-2xl shadow-xl">
              <Image
                src={mainImageUrl}
                alt={serviceData.image?.alt || serviceData.title}
                width={1200}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
              {serviceData.image?.caption && (
                <p className="mt-3 text-sm text-green/60 text-center italic">
                  {serviceData.image.caption}
                </p>
              )}
            </div>
          )}

          <article className="mt-12 max-w-none">
            {Array.isArray(serviceData.body) && (
              <PortableText 
                value={serviceData.body} 
                components={portableTextComponents}
              />
            )}
          </article>

          <CtaSection />
        </div>
      </div>
    </>
  );
}
