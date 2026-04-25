import type { GalleryItem } from "@/sanity/types";

/**
 * Smart Engine: Enriches gallery items with professional storytelling content
 * if Navami hasn't provided manual titles or stories.
 * 
 * Uses the WIIFM (What's In It For Me) framework focused on parents and schools.
 */
export function enrichGalleryItem(item: GalleryItem): GalleryItem {
  // Clean the location: Remove file extensions like .jpeg, .jpg, .png
  let location = item.locationEvent || "";
  location = location.replace(/\.(jpg|jpeg|png|webp|gif)$/i, "").trim();
  
  const searchLocation = location.toLowerCase();
  
  // FIXED: If the title/story matches the bulk-upload defaults, we treat them as "empty"
  const isDefaultTitle = item.title === "The Heart of Divit" || item.title === "Impact at Bishop Cotton" || item.title === "Excellence at DPS East";
  const isDefaultStory = item.story?.includes("Real, raw, and authentic moments") || item.story?.includes("Training educators");

  let enrichedTitle = (item.title && !isDefaultTitle) ? item.title : "";
  let enrichedStory = (item.story && !isDefaultStory) ? item.story : "";
  let enrichedTag = item.tag;

  // If Navami has written a GENUINE manual override (not a default), we respect it.
  if (enrichedTitle && enrichedStory) return { ...item, locationEvent: location };

  // Simple stable hash based on ID to pick a variety for each item
  const hash = item._id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const pick = (arr: string[]) => arr[hash % arr.length];

  // Logic Groups based on cleaned location name
  // 1. Schools
  if (searchLocation.includes("bishop cotton") || searchLocation.includes("ryan") || searchLocation.includes("tisb") || searchLocation.includes("school") || searchLocation.includes("shlok")) {
    const titles = ["Strengthening School Support", "Impact in the Classroom", "Empowering Every Student", "Inclusion in Action", "Supportive Learning Spaces"];
    const stories = [
      "Ensuring your child is understood and supported in their classroom through our specialized educator training and school awareness programs.",
      "We partner with leading institutions like this one to build environments where neurodivergent students don't just attend, but actually thrive.",
      "Transforming classrooms into inclusive spaces where every child's unique learning style is recognized and celebrated.",
      "Our school programs bridge the gap between clinical expertise and everyday classroom success for your child.",
      "Creating a ripple effect of inclusion by training the teachers who interact with your child every single day."
    ];
    enrichedTitle = enrichedTitle || pick(titles);
    enrichedStory = enrichedStory || pick(stories);
    enrichedTag = enrichedTag || "Inclusive Education";
  } 
  // 2. Training/University
  else if (searchLocation.includes("dps") || searchLocation.includes("college") || searchLocation.includes("university") || searchLocation.includes("training")) {
    const titles = ["Empowered Educators, Better Outcomes", "Building Professional Bridges", "Expertise Shared Locally", "Leading with Understanding", "The Future of Special Education"];
    const stories = [
      "Equipping the professionals who work with your child with the latest expert strategies to build a truly inclusive learning environment.",
      "When teachers are empowered with the right tools, your child's potential becomes limitless in every academic setting.",
      "We share our deep clinical insights with educators to ensure a consistent, supportive experience for families everywhere.",
      "Creating a ripple effect of inclusion by training the next generation of teachers in neurodiversity-affirming practices.",
      "A dedicated session focused on practical, evidence-based tools that teachers can use to support your child's growth."
    ];
    enrichedTitle = enrichedTitle || pick(titles);
    enrichedStory = enrichedStory || pick(stories);
    enrichedTag = enrichedTag || "Professional Growth";
  }
  // 3. Center
  else if (searchLocation.includes("cdc") || searchLocation.includes("center") || searchLocation.includes("session")) {
    const titles = ["A Space Built for Progress", "Focused Growth, Every Day", "Nurturing Breakthroughs", "Designed for Your Child", "Safety and Skill Building"];
    const stories = [
      "Your child's journey is accelerated in our sensory-safe environment, designed to reduce overwhelm and maximize every therapeutic session.",
      "Every corner of our center is thoughtfully designed to provide the safety and focus your child needs to master new skills.",
      "Where specialized care meets a warm, community environment—creating the perfect foundation for your child's development.",
      "Witnessing the daily victories and small steps that lead to life-changing independence for our young learners.",
      "Our facility is more than just a center; it's a launchpad for your child's confidence and social development."
    ];
    enrichedTitle = enrichedTitle || pick(titles);
    enrichedStory = enrichedStory || pick(stories);
    enrichedTag = enrichedTag || "Safe Learning Space";
  }
  // 4. Default / Unknown / Heart of Divit
  else {
    const titles = ["The Heart of Your Journey", "Authentic Connections", "Moments of Pure Joy", "Our Community in Action", "Building a Brighter Future"];
    const stories = [
      "Real moments of connection and joy that show the progress possible when a family is supported by a community that truly cares.",
      "Beyond the clinical sessions, we are a family. These moments capture the resilience and heart of the Divit MindSpace community.",
      "Celebrating the unique milestones and authentic smiles that make every day in our community so deeply rewarding.",
      "Providing a safe space for parents and children to connect, share, and grow together on this unique developmental path.",
      "Every authentic smile represents a family feeling more confident and a child feeling more understood."
    ];
    enrichedTitle = enrichedTitle || pick(titles);
    enrichedStory = enrichedStory || pick(stories);
    enrichedTag = enrichedTag || "Community & Connection";
  }

  return {
    ...item,
    locationEvent: location || "Unknown Moment",
    title: enrichedTitle,
    story: enrichedStory,
    tag: enrichedTag
  };
}
