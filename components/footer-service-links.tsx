"use client";

import * as React from "react";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { POPULAR_SERVICES_QUERY } from "@/sanity/lib/queries";
import type { ServiceNavItem } from "@/sanity/types";

export function FooterServiceLinks() {
  const [serviceItems, setServiceItems] = React.useState<ServiceNavItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchPopularServices() {
      try {
        const services = await client.fetch<ServiceNavItem[]>(POPULAR_SERVICES_QUERY);
        setServiceItems(services || []);
      } catch (error) {
        console.error("Error fetching popular services:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPopularServices();
  }, []);

  return (
    <div>
      <h4 className="font-bold text-[#222222] mb-6">Services</h4>
      {isLoading ? (
        <ul className="space-y-4">
          <li className="text-gray-400 text-sm">Loading...</li>
        </ul>
      ) : serviceItems.length > 0 ? (
        <>
          <ul className="space-y-4">
            {serviceItems.map((item) => (
              <li key={item._id}>
                <Link
                  href={`/services/${item.slug.current}`}
                  className="text-gray-500 hover:text-[#2F3E33] transition-colors font-medium text-sm"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/services"
            className="inline-block mt-4 text-sm font-medium text-[#2F3E33] hover:underline"
          >
            View all services →
          </Link>
        </>
      ) : (
        <ul className="space-y-4">
          <li>
            <Link
              href="/services"
              className="text-gray-500 hover:text-[#2F3E33] transition-colors font-medium text-sm"
            >
              View all services
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
