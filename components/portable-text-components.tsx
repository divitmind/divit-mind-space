import { PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

export const portableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold text-green mt-8 mb-4 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold text-green mt-6 mb-3 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold text-green mt-5 mb-2 leading-tight">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-base text-green/80 leading-relaxed mb-4">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-green pl-4 py-2 my-4 bg-cream/50 italic text-green/70">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside ml-6 my-4 space-y-2 text-green/80">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ul className="list-disc list-outside ml-6 my-4 space-y-2 text-green/80">
        {children}
      </ul>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-base leading-relaxed">{children}</li>
    ),
    number: ({ children }) => (
      <li className="text-base leading-relaxed">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-green">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic">{children}</em>
    ),
    underline: ({ children }) => (
      <u className="underline">{children}</u>
    ),
    link: ({ value, children }) => {
      const target = (value?.href || "").startsWith("http") ? "_blank" : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          className="text-green underline hover:text-green-lite transition-colors"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-6">
          <Image
            src={urlFor(value).width(800).height(450).url() || ""}
            alt={value.alt || "Image"}
            width={800}
            height={450}
            className="rounded-xl w-full h-auto"
          />
          {value.caption && (
            <figcaption className="text-sm text-green/60 text-center mt-2 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};
