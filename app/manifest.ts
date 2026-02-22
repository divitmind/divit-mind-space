import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Divit MindSpace",
    short_name: "Divit MindSpace",
    description:
      "Neurodivergent Care & Education — diagnostic assessments, customized teaching, and training in Bangalore.",
    start_url: "/",
    display: "standalone",
    background_color: "#FDFBF7",
    theme_color: "#2F3E33",
    icons: [
      {
        src: "/divit-mindspace-logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/divit-mindspace-logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
