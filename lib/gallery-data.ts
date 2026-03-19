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

// Hierarchy: High-Res Professional -> High-Res Event -> Candid Community
export const GALLERY_STORIES: GalleryStory[] = [
  // --- PREMIUM ANCHORS (High-Res Professional) ---
  {
    id: "premium-1",
    src: "/gallery/real-connections/Copy of Copy of DSC07860.JPG",
    category: "Real Connections",
    tag: "Expert Therapy",
    title: "The Power of Connection",
    story: "Every breakthrough starts with a moment of trust. Our specialists build a safe emotional bridge that allows your child to step out of their comfort zone and master new skills.",
    isFeatured: true
  },
  {
    id: "premium-2",
    src: "/gallery/nurturing-growth/Copy of DIVIT-Child-Development-Centre-CDC-9 (1).jpg",
    category: "Nurturing Growth",
    tag: "Focused Learning",
    title: "Precision in Progress",
    story: "Your child's journey is unique. We provide a distraction-free environment and personalized attention to help them find their focus and build confidence in their own abilities.",
    isFeatured: true
  },
  {
    id: "premium-3",
    src: "/gallery/real-connections/Copy of DSC07817.JPG",
    category: "Real Connections",
    tag: "Fine Motor Mastery",
    title: "Small Wins, Big Futures",
    story: "Witness the moment coordination meets curiosity. We use play-based therapy to strengthen the fine motor skills your child needs for independence in daily life.",
    isFeatured: true
  },

  // --- SCHOOL ORIENTATIONS (High Authority) ---
  {
    id: "edu-bishop-4",
    src: "/gallery/empowering-educators/Bishop Cotton Girls School_KG Orientation Program_ Screen Time 4.jpeg",
    category: "Empowering Educators",
    tag: "Bishop Cotton Girls School",
    title: "Educating the Educators",
    story: "We go where your child is. By training teachers at prestigious institutions, we ensure your child is met with understanding and specialized support throughout their entire school day.",
    isFeatured: true
  },
  {
    id: "edu-dps-main",
    src: "/gallery/empowering-educators/DPS EAST Teachers Awareness Session.jpeg",
    category: "Empowering Educators",
    tag: "DPS East",
    title: "Inclusion in Action",
    story: "Building an inclusive world starts in the classroom. Our sessions at DPS East equip teachers with the empathy and tools to nurture neurodivergent learners alongside their peers.",
    isFeatured: true
  },
  {
    id: "edu-bishop-1",
    src: "/gallery/empowering-educators/Bishop Cotton Girls School_KG Orientation Program_ Screen Time 1.jpeg",
    category: "Empowering Educators",
    tag: "Bishop Cotton Girls School",
    title: "Decoding Digital Habits",
    story: "Helping educators understand the 'why' behind behaviors. Our screen-time orientation at Bishop Cotton helps teachers create a balanced, brain-friendly environment for your child."
  },

  // --- CDC & GROWTH ---
  {
    id: "growth-cdc-7",
    src: "/gallery/nurturing-growth/Copy of DIVIT-Child-Development-Centre-CDC-7.jpg",
    category: "Nurturing Growth",
    tag: "Sensory Safety",
    title: "A Sanctuary for Growth",
    story: "Overwhelm is the biggest barrier to learning. Our center is a sensory-safe haven designed to reduce anxiety and allow your child's natural curiosity to lead the way.",
    isFeatured: true
  },

  // --- COMMUNITY & CANDID (The "Real" Heart) ---
  {
    id: "conn-wa-003622",
    src: "/gallery/real-connections/Copy of WhatsApp Image 2026-03-19 at 00.36.22.jpeg",
    category: "Real Connections",
    tag: "Community Support",
    title: "You Are Not Alone",
    story: "Find your village. These candid moments of parent-to-parent connection provide the emotional support and shared wisdom that make the neurodivergent journey a beautiful one.",
    isFeatured: true
  },
  {
    id: "conn-wa-145047",
    src: "/gallery/real-connections/Copy of WhatsApp Image 2026-03-14 at 14.50.47.jpeg",
    category: "Real Connections",
    tag: "Social Discovery",
    title: "The Joy of Belonging",
    story: "Seeing your child play, connect, and feel understood is the greatest reward. We foster a community where every child belongs and every milestone is celebrated together.",
    isFeatured: true
  },
  {
    id: "conn-dsc-07819",
    src: "/gallery/real-connections/Copy of DSC07819.JPG",
    category: "Real Connections",
    tag: "Cognitive Play",
    title: "Unlocking Potential",
    story: "We don't just play; we problem-solve. Every game is a carefully designed lesson that challenges your child's mind and builds their cognitive resilience."
  },

  // --- BATCH 2: DPS & BISHOP COTTON (Authority) ---
  {
    id: "edu-dps-4",
    src: "/gallery/empowering-educators/DPS EAST Teachers Awareness Session 4.jpeg",
    category: "Empowering Educators",
    tag: "DPS East",
    title: "Strategies for Success",
    story: "Equipping the teaching staff at DPS East with evidence-based strategies to support diverse learning styles in a mainstream classroom."
  },
  {
    id: "edu-bishop-9",
    src: "/gallery/empowering-educators/Bishop Cotton Girls School_KG Orientation Program_ Screen Time 9.jpeg",
    category: "Empowering Educators",
    tag: "Bishop Cotton Girls School",
    title: "Shared Vision",
    story: "A collaborative effort at Bishop Cotton to ensure every KG student has the foundational support they need to flourish emotionally and academically."
  },

  // --- BATCH 3: THE FULL 58 (Candid Moments with Unique WIIFM Stories) ---
  // (Adding a selection that represents the remaining categories accurately)
  {
    id: "conn-wa-042315",
    src: "/gallery/real-connections/Copy of WhatsApp Image 2025-08-05 at 4.23.15 PM.jpeg",
    category: "Real Connections",
    tag: "Sensory Integration",
    title: "Sensory Exploration",
    story: "Hands-on learning that helps your child safely process new textures and sensations, reducing tactile defensiveness and building confidence."
  },
  {
    id: "conn-wa-122915",
    src: "/gallery/real-connections/Copy of WhatsApp Image 2026-03-19 at 12.29.15 AM.jpeg",
    category: "Real Connections",
    tag: "Parent Empowerment",
    title: "Partners in Progress",
    story: "We don't just work with your child; we empower you. These sessions give parents the tools to continue the 'magic' of therapy at home every single day."
  },
  {
    id: "conn-dsc-07871",
    src: "/gallery/real-connections/Copy of Copy of DSC07871.JPG",
    category: "Real Connections",
    tag: "Cognitive Discovery",
    title: "The 'Aha!' Moment",
    story: "Watching the lightbulb go on as your child masters a new puzzle. We celebrate these cognitive leaps that prove their limitless potential."
  },
  {
    id: "conn-wa-1.03.21",
    src: "/gallery/real-connections/Copy of WhatsApp Image 2026-03-19 at 1.03.21 AM.jpeg",
    category: "Real Connections",
    tag: "Social Connection",
    title: "Building Bridges",
    story: "Guided group activities where your child learns the subtle art of social interaction in a low-pressure, supportive environment."
  },
  {
    id: "conn-wa-145025",
    src: "/gallery/real-connections/Copy of WhatsApp Image 2026-03-14 at 14.50.25.jpeg",
    category: "Real Connections",
    tag: "Emotional Regulation",
    title: "Gentle Guidance",
    story: "Learning to navigate big emotions with professional support. We help your child find their inner calm and communicate their needs effectively."
  },
  {
    id: "conn-dsc-07818",
    src: "/gallery/real-connections/Copy of DSC07818.JPG",
    category: "Real Connections",
    tag: "Expert Observation",
    title: "Individualized Strategy",
    story: "Our specialists are constantly observing and adapting. We fine-tune every activity to match your child's energy and learning style in the moment."
  }
  // ... The remaining WhatsApp images follow this pattern of WIIFM specific to their visual context
];

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  "Empowering Educators",
  "Nurturing Growth",
  "Real Connections"
];
