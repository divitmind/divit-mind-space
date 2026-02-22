import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import type { ServiceListItem } from "@/sanity/types";

interface ServiceCardProps {
  service: ServiceListItem;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const imageUrl = service.image?.asset?.url
    ? urlFor(service.image)?.width(500).height(350).url()
    : "/placeholder.svg";

  return (
    <Link
      href={`/services/${service.slug.current}`}
      className="group relative bg-cream overflow-hidden rounded-2xl border-2 border-transparent hover:border-green-lite transition-all duration-300 hover:shadow-xl"
    >
      {/* {service.popular && (
        <div className="absolute top-4 right-4 z-10 bg-yellow px-3 py-1 rounded-full">
          <span className="text-xs font-semibold text-green uppercase tracking-wide">
            Popular
          </span>
        </div>
      )} */}

      <div className="relative h-56 w-full overflow-hidden bg-green-lite/20">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={service.image?.alt || service.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-green/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6 space-y-3">
        <h3 className="text-xl font-semibold text-green leading-tight line-clamp-2 group-hover:text-green-lite transition-colors duration-300">
          {service.title}
        </h3>
        
        {service.description && (
          <p className="text-sm text-green/70 line-clamp-3 leading-relaxed">
            {service.description}
          </p>
        )}

        <div className="pt-2 flex items-center gap-2 text-green group-hover:text-green-lite transition-colors duration-300">
          <span className="text-sm font-medium">Learn more</span>
          <svg
            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>

      <div className="h-1 bg-linear-to-r from-green via-green-lite to-green transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </Link>
  );
}
