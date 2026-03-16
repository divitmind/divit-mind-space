import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { services, getServiceBySlug } from "@/lib/services-data";
import { WhatsAppConsultationLink } from "@/components/whatsapp-consultation-link";
import { Check, Clock, MapPin } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  const serviceUrl = `https://divitmindspace.com/services/${service.slug}`;

  return {
    title: `${service.title} | Divit MindSpace`,
    description: service.description,
    openGraph: {
      title: service.title,
      description: service.description,
      type: "website",
      url: serviceUrl,
      siteName: "Divit MindSpace",
    },
    twitter: {
      card: "summary_large_image",
      title: service.title,
      description: service.description,
    },
    alternates: {
      canonical: serviceUrl,
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: "Divit MindSpace",
      url: "https://divitmindspace.com",
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    serviceType: "Healthcare/Education",
    url: `https://divitmindspace.com/services/${service.slug}`,
  };

  const categoryLabels: Record<string, string> = {
    assessments: "Assessment",
    therapy: "Therapy",
    guidance: "Guidance",
    programs: "Program",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-purple/10 text-purple text-xs font-bold uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-purple" />
                {categoryLabels[service.category]}
              </div>

              {/* Title */}
              <h1
                className="text-3xl md:text-4xl lg:text-5xl font-serif text-green mb-4 leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
              >
                {service.title}
              </h1>

              {/* Description */}
              <p className="text-lg text-green/70 mb-6 max-w-3xl">
                {service.description}
              </p>

              {/* Quick Info */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                {service.content.duration && (
                  <div className="flex items-center gap-2 text-sm text-green/70">
                    <Clock className="w-4 h-4" />
                    <span>{service.content.duration}</span>
                  </div>
                )}
                {service.content.format && (
                  <div className="flex items-center gap-2 text-sm text-green/70">
                    <MapPin className="w-4 h-4" />
                    <span>{service.content.format}</span>
                  </div>
                )}
              </div>

              {/* CTA */}
              <WhatsAppConsultationLink className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-green text-white font-semibold hover:bg-green/90 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Book This Service
              </WhatsAppConsultationLink>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 lg:py-16 bg-cream">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Overview */}
              <div className="mb-12">
                <h2
                  className="text-2xl lg:text-3xl font-serif text-green mb-4"
                  style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
                >
                  Overview
                </h2>
                <p className="text-green/80 leading-relaxed">
                  {service.content.overview}
                </p>
              </div>

              {/* Benefits */}
              <div className="mb-12 bg-white rounded-2xl p-6 lg:p-8 border border-green/10">
                <h2
                  className="text-2xl lg:text-3xl font-serif text-green mb-6"
                  style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
                >
                  What You'll Gain
                </h2>
                <ul className="space-y-3">
                  {service.content.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-green" />
                      </div>
                      <span className="text-green/80">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What to Expect */}
              <div className="mb-12">
                <h2
                  className="text-2xl lg:text-3xl font-serif text-green mb-6"
                  style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
                >
                  What to Expect
                </h2>
                <div className="space-y-4">
                  {service.content.whatToExpect.map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-purple/10 flex items-center justify-center flex-shrink-0 text-purple font-semibold text-sm">
                        {index + 1}
                      </div>
                      <p className="text-green/80 pt-1">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Who Is It For */}
              <div className="mb-12 bg-white rounded-2xl p-6 lg:p-8 border border-green/10">
                <h2
                  className="text-2xl lg:text-3xl font-serif text-green mb-6"
                  style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
                >
                  Is This Right for Your Child?
                </h2>
                <ul className="space-y-3">
                  {service.content.whoIsItFor.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-yellow/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-yellow-700" />
                      </div>
                      <span className="text-green/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-12 lg:py-16 bg-[#FAF9F5]">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center bg-white rounded-2xl p-8 lg:p-10 border border-green/10 shadow-sm">
              <h2
                className="text-2xl lg:text-3xl font-serif text-green mb-4"
                style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
              >
                Ready to Get Started?
              </h2>
              <p className="text-green/70 mb-6">
                Book a free consultation to discuss if {service.title} is right for your child.
              </p>
              <WhatsAppConsultationLink className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-green text-white font-semibold hover:bg-green/90 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Book Free Consultation
              </WhatsAppConsultationLink>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
