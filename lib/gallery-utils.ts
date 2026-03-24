import type { GalleryItem } from "@/sanity/types";

/**
 * Smart Engine: Enriches gallery items with professional storytelling content
 * if Navami hasn't provided manual titles or stories.
 */
export function enrichGalleryItem(item: GalleryItem): GalleryItem {
  const location = item.locationEvent?.toLowerCase() || "";
  
  // If title and story already exist, return as is (Navami's manual override)
  if (item.title && item.story) return item;

  let enrichedTitle = item.title;
  let enrichedStory = item.story;
  let enrichedTag = item.tag;

  // 1. Bishop Cotton Smart Logic
  if (location.includes("bishop cotton")) {
    enrichedTitle = enrichedTitle || "Impact at Bishop Cotton";
    enrichedStory = enrichedStory || "Training educators to recognize and support neurodivergent learners in mainstream classrooms.";
    enrichedTag = enrichedTag || "School Orientation";
  } 
  // 2. DPS East Smart Logic
  else if (location.includes("dps east") || location.includes("dps")) {
    enrichedTitle = enrichedTitle || "Excellence at DPS East";
    enrichedStory = enrichedStory || "Equipping teachers with practical tools to build inclusive learning environments for every child.";
    enrichedTag = enrichedTag || "Teacher Training";
  }
  // 3. CDC / Center Logic
  else if (location.includes("cdc") || location.includes("development centre") || location.includes("center")) {
    enrichedTitle = enrichedTitle || "Safe Spaces to Grow";
    enrichedStory = enrichedStory || "Our sensory-safe Child Development Centre provides the perfect environment for focused learning and progress.";
    enrichedTag = enrichedTag || "Center Facility";
  }
  // 4. DSC / Therapy Logic
  else if (location.includes("dsc") || location.includes("therapy")) {
    enrichedTitle = enrichedTitle || "Therapy in Action";
    enrichedStory = enrichedStory || "Witness the professional care and trust that form the foundation of our developmental support.";
    enrichedTag = enrichedTag || "Expert Therapy";
  }
  // 5. Default "WhatsApp Moment" / General Connection
  else {
    enrichedTitle = enrichedTitle || "The Heart of Divit";
    enrichedStory = enrichedStory || "Real, raw, and authentic moments of connection and joy from our community journeys.";
    enrichedTag = enrichedTag || "Community Moment";
  }

  return {
    ...item,
    title: enrichedTitle,
    story: enrichedStory,
    tag: enrichedTag
  };
}
