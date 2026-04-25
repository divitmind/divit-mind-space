export type GalleryCategory = "Empowering Educators" | "Nurturing Growth" | "Real Connections";

export interface GalleryStory {
  id: string;
  src: string;
  category: GalleryCategory;
  tag: string;
  title: string;
  story: string;
  isFeatured?: boolean;
}

const getStoryForFilename = (name: string): { category: GalleryCategory; tag: string; title: string; story: string; featured?: boolean } => {
  if (name.includes("Bishop Cotton")) {
    return {
      category: "Empowering Educators",
      tag: "School Orientation",
      title: "Impact at Bishop Cotton",
      story: "Training educators to recognize and support neurodivergent learners in mainstream classrooms.",
      featured: name.includes("4.jpeg")
    };
  }
  if (name.includes("DPS EAST")) {
    return {
      category: "Empowering Educators",
      tag: "Teacher Training",
      title: "Excellence at DPS East",
      story: "Equipping teachers with practical tools to build inclusive learning environments for every child.",
      featured: name === "DPS EAST Teachers Awareness Session.jpeg"
    };
  }
  if (name.includes("CDC")) {
    return {
      category: "Nurturing Growth",
      tag: "Center Facility",
      title: "Safe Spaces to Grow",
      story: "Our sensory-safe Child Development Centre provides the perfect environment for focused learning and progress.",
      featured: true
    };
  }
  if (name.includes("DSC")) {
    return {
      category: "Real Connections",
      tag: "Expert Therapy",
      title: "Therapy in Action",
      story: "Witness the professional care and trust that form the foundation of our developmental support.",
      featured: name.includes("07860")
    };
  }
  // WhatsApp default
  return {
    category: "Real Connections",
    tag: "Community Moment",
    title: "The Heart of Divit",
    story: "Real, raw, and authentic moments of connection and joy from our community journeys.",
    featured: name.includes("00.36.22") || name.includes("14.50.47")
  };
};

const FILE_NAMES = [
  "Bishop Cotton Girls School_KG Orientation Program_ Screen Time 1.jpeg",
  "Bishop Cotton Girls School_KG Orientation Program_ Screen Time 2.jpeg",
  "Bishop Cotton Girls School_KG Orientation Program_ Screen Time 4.jpeg",
  "Bishop Cotton Girls School_KG Orientation Program_ Screen Time 5.jpeg",
  "Bishop Cotton Girls School_KG Orientation Program_ Screen Time 6.jpeg",
  "Bishop Cotton Girls School_KG Orientation Program_ Screen Time 7.jpeg",
  "Bishop Cotton Girls School_KG Orientation Program_ Screen Time 9.jpeg",
  "Copy of Copy of DSC07860.JPG",
  "Copy of Copy of DSC07867.JPG",
  "Copy of Copy of DSC07868.JPG",
  "Copy of Copy of DSC07871.JPG",
  "Copy of DIVIT-Child-Development-Centre-CDC-7.jpg",
  "Copy of DIVIT-Child-Development-Centre-CDC-9 (1).jpg",
  "Copy of DSC07816.JPG",
  "Copy of DSC07817.JPG",
  "Copy of DSC07818.JPG",
  "Copy of DSC07819.JPG",
  "Copy of WhatsApp Image 2025-07-22 at 3.54.31 PM.jpeg",
  "Copy of WhatsApp Image 2025-07-22 at 4.07.32 PM (1).jpeg",
  "Copy of WhatsApp Image 2025-07-22 at 4.07.32 PM (3).jpeg",
  "Copy of WhatsApp Image 2025-08-05 at 4.22.57 PM.jpeg",
  "Copy of WhatsApp Image 2025-08-05 at 4.23.10 PM.jpeg",
  "Copy of WhatsApp Image 2025-08-05 at 4.23.15 PM.jpeg",
  "Copy of WhatsApp Image 2025-08-05 at 4.23.24 PM.jpeg",
  "Copy of WhatsApp Image 2025-08-05 at 4.23.26 PM.jpeg",
  "Copy of WhatsApp Image 2025-08-05 at 4.23.28 PM (1).jpeg",
  "Copy of WhatsApp Image 2026-03-14 at 14.50.21 (2).jpeg",
  "Copy of WhatsApp Image 2026-03-14 at 14.50.22 (1).jpeg",
  "Copy of WhatsApp Image 2026-03-14 at 14.50.25 (1).jpeg",
  "Copy of WhatsApp Image 2026-03-14 at 14.50.25.jpeg",
  "Copy of WhatsApp Image 2026-03-14 at 14.50.28 (2).jpeg",
  "Copy of WhatsApp Image 2026-03-14 at 14.50.28.jpeg",
  "Copy of WhatsApp Image 2026-03-14 at 14.50.47.jpeg",
  "Copy of WhatsApp Image 2026-03-14 at 14.50.50.jpeg",
  "Copy of WhatsApp Image 2026-03-14 at 14.50.51 (2).jpeg",
  "Copy of WhatsApp Image 2026-03-14 at 14.50.51.jpeg",
  "Copy of WhatsApp Image 2026-03-14 at 14.51.19 (1).jpeg",
  "Copy of WhatsApp Image 2026-03-14 at 15.02.22 (4).jpeg",
  "Copy of WhatsApp Image 2026-03-19 at 00.36.20 (2).jpeg",
  "Copy of WhatsApp Image 2026-03-19 at 00.36.21 (2).jpeg",
  "Copy of WhatsApp Image 2026-03-19 at 00.36.22 (1).jpeg",
  "Copy of WhatsApp Image 2026-03-19 at 00.36.22 (2).jpeg",
  "Copy of WhatsApp Image 2026-03-19 at 00.36.22.jpeg",
  "Copy of WhatsApp Image 2026-03-19 at 1.03.20 AM.jpeg",
  "Copy of WhatsApp Image 2026-03-19 at 1.03.21 AM (1).jpeg",
  "Copy of WhatsApp Image 2026-03-19 at 1.03.21 AM.jpeg",
  "Copy of WhatsApp Image 2026-03-19 at 12.29.15 AM.jpeg",
  "DPS EAST Teachers Awareness Session 3.jpeg",
  "DPS EAST Teachers Awareness Session 4.jpeg",
  "DPS EAST Teachers Awareness Session 5.jpeg",
  "DPS EAST Teachers Awareness Session 6(1).jpeg",
  "DPS EAST Teachers Awareness Session 6.jpeg",
  "DPS EAST Teachers Awareness Session 7.jpeg",
  "DPS EAST Teachers Awareness Session 8.jpeg",
  "DPS EAST Teachers Awareness Session 9.jpeg",
  "DPS EAST Teachers Awareness Session(1).jpeg",
  "DPS EAST Teachers Awareness Session.jpeg"
];

export const GALLERY_STORIES: GalleryStory[] = FILE_NAMES.map((name, i) => {
  const meta = getStoryForFilename(name);
  return {
    id: `gallery-img-${i}`,
    src: `/gallery/${name}`,
    category: meta.category,
    tag: meta.tag,
    title: meta.title,
    story: meta.story,
    isFeatured: meta.featured
  };
});

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  "Empowering Educators",
  "Nurturing Growth",
  "Real Connections"
];
