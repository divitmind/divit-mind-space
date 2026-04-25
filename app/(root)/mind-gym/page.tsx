import { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { MIND_GYM_QUERY } from "@/sanity/lib/queries";
import { MindGymQueryResult } from "@/sanity/types";
import { MindGymPage } from "@/components/mind-gym/mind-gym-page";

// Force dynamic rendering - always fetch fresh data from Sanity
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mind Gym | Interactive Brain Games | Divit MindSpace",
  description: "Boost focus, memory, and cognitive flexibility with our interactive brain games. Scientific brain teasers for children, teenagers, and adults.",
  keywords: [
    "brain games",
    "cognitive games",
    "focus games",
    "working memory games",
    "Schulte Table",
    "Stroop Test",
    "neurodiversity tools",
    "interactive learning",
    "Divit MindSpace Mind Gym"
  ],
  alternates: {
    canonical: "https://divitmindspace.com/mind-gym"
  }
};

export default async function MindGymRoute() {
  const mindGymData = await sanityFetch({ 
    query: MIND_GYM_QUERY, 
    tags: ["mindGym"] 
  });
  
  const games = mindGymData.data as MindGymQueryResult;

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Mind Gym - Divit MindSpace",
            "description": "Free cognitive games and brain teasers for all ages.",
            "publisher": {
              "@type": "Organization",
              "name": "Divit MindSpace"
            }
          })
        }}
      />
      <MindGymPage initialGames={games || []} />
    </>
  );
}
