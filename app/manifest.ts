import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Divit MindSpace — Mental Health, Neurodevelopment & Physiotherapy Bangalore",
    short_name: "Divit MindSpace",
    description:
      "Expert Clinical Assessments, Therapies, Counseling, Special Education, NIOS Support, Teacher & Parent Training, Physiotherapy and Customized Workshops — off Sarjapur Road (Kasavanahalli), Bangalore.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#FDFBF7",
    theme_color: "#7A9A7D",
    lang: "en-IN",
    dir: "ltr",
    categories: ["health", "medical", "education", "lifestyle"],
    icons: [
      { src: "/divit-mindspace-logo.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/divit-mindspace-logo.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/divit-mindspace-logo.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      {
        name: "Services",
        short_name: "Services",
        description: "Browse all services",
        url: "/services",
      },
      {
        name: "Conditions We Support",
        short_name: "Conditions",
        description: "Autism, ADHD, LD, pain management & more",
        url: "/conditions",
      },
      {
        name: "Contact Us",
        short_name: "Contact",
        description: "Book a free consultation",
        url: "/contact-us",
      },
      {
        name: "FAQs",
        short_name: "FAQs",
        description: "Every answer in one place",
        url: "/faq",
      },
    ],
  };
}
