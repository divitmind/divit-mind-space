"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Find all h2 and h3 elements inside the article
    const elements = Array.from(document.querySelectorAll("article h2, article h3"));
    
    const items = elements.map((elem) => ({
      id: elem.id,
      text: elem.textContent || "",
      level: Number(elem.tagName.charAt(1)),
    })).filter(item => item.id); // Only include items with IDs

    setHeadings(items);

    // Set up IntersectionObserver to highlight the active section
    const callback = (entries: IntersectionObserverEntry[]) => {
      // Find the first intersecting entry
      const intersectingEntry = entries.find((entry) => entry.isIntersecting);
      if (intersectingEntry) {
        setActiveId(intersectingEntry.target.id);
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: "-20% 0px -80% 0px", // Trigger near the top of the viewport
    });

    elements.forEach((elem) => observer.observe(elem));

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <div className="sticky top-28 w-full max-h-[calc(100vh-8rem)] overflow-y-auto p-6 bg-white/50 backdrop-blur-sm border border-green/10 rounded-2xl hidden lg:block shadow-sm">
      <h4 className="text-sm font-bold text-green uppercase tracking-widest mb-4">
        In this article
      </h4>
      <nav className="flex flex-col space-y-2">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector(`#${heading.id}`)?.scrollIntoView({
                behavior: "smooth",
              });
              setActiveId(heading.id);
            }}
            className={cn(
              "text-sm transition-all duration-200 border-l-2 py-1",
              heading.level === 3 ? "pl-6 text-green/60" : "pl-3 font-medium",
              activeId === heading.id
                ? "border-green text-green bg-green/5"
                : "border-transparent text-green/70 hover:text-green hover:border-green/30"
            )}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </div>
  );
}
