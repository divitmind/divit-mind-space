import { PortableTextComponents } from "@portabletext/react";

export const careerPortableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <div className="flex items-start group mb-4 last:mb-0">
        <span className="w-1.5 h-1.5 rounded-full bg-[#7A9A7D] mr-4 mt-2.5 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
        <div className="text-green/80 text-base leading-relaxed">
          {children}
        </div>
      </div>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="space-y-4 my-4 last:mb-0">
        {children}
      </ul>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start group">
        <span className="w-1.5 h-1.5 rounded-full bg-[#7A9A7D] mr-4 mt-2.5 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
        <span className="text-green/80 text-base leading-relaxed">{children}</span>
      </li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-green">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic">{children}</em>
    ),
  },
};
