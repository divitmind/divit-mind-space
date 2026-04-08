"use client";

import { useState } from "react";
import Image from "next/image";
import { PortableText } from "next-sanity";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuthorBioProps {
  author: {
    name: string;
    title?: string;
    bio?: any;
    image?: string;
    social?: {
      twitter?: string;
      linkedin?: string;
      github?: string;
    };
  };
}

export function AuthorBio({ author }: AuthorBioProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!author) return null;

  return (
    <div className="mt-8 p-4 md:p-6 bg-white rounded-2xl border border-gray-100 shadow-sm transition-all duration-300">
      <div className="flex items-start gap-4">
        {/* Author Avatar */}
        {author.image && (
          <div className="relative w-12 h-12 md:w-16 md:h-16 flex-shrink-0">
            <Image
              src={author.image}
              alt={author.name}
              fill
              className="rounded-full object-cover border-2 border-green/10"
            />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-green leading-tight">
              {author.name}
            </h3>
            
            {author.bio && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={cn(
                  "flex items-center justify-center w-6 h-6 rounded-full transition-all duration-200",
                  isExpanded 
                    ? "bg-purple text-white shadow-md rotate-0" 
                    : "bg-green/5 text-green hover:bg-green/10"
                )}
                aria-label={isExpanded ? "Collapse bio" : "Expand bio"}
              >
                {isExpanded ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>

          {author.title && (
            <p className="text-sm text-purple font-medium mt-1 leading-relaxed">
              {author.title}
            </p>
          )}

          {/* Collapsible Content */}
          <div
            className={cn(
              "grid transition-all duration-300 ease-in-out overflow-hidden",
              isExpanded ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
            )}
          >
            <div className="min-h-0">
              <div className="pt-4 border-t border-gray-50">
                <div className="text-sm text-green/80 leading-relaxed prose prose-sm prose-green max-w-none">
                  <PortableText value={author.bio} />
                </div>

                {author.social && (
                  <div className="mt-4 flex gap-4">
                    {author.social.linkedin && (
                      <a
                        href={author.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-green hover:text-purple transition-colors flex items-center gap-1"
                      >
                        LinkedIn
                      </a>
                    )}
                    {author.social.twitter && (
                      <a
                        href={author.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-green hover:text-purple transition-colors flex items-center gap-1"
                      >
                        Twitter
                      </a>
                    )}
                    {author.social.github && (
                      <a
                        href={author.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-green hover:text-purple transition-colors flex items-center gap-1"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
