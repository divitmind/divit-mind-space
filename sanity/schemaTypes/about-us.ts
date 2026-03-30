import { defineField, defineType } from "sanity";
import { ImageWithPreview } from "../components/ImageWithPreview";

export const aboutUsType = defineType({
  name: "aboutUs",
  title: "About Us Page",
  type: "document",
  groups: [
    { name: "hero", title: "1. Hero Section", default: true },
    { name: "philosophy", title: "2. Why Us Section" },
    { name: "story", title: "3. Our Story" },
  ],
  initialValue: {
    hero: {
      title: "Empowering Every Neurodivergent Child to Thrive",
      description: "We provide expert assessments, therapy, and family support—helping children build confidence and independence in a nurturing environment.",
    },
    philosophy: {
      title: "Why Families Choose Us",
      description: "What sets Divit MindSpace apart from other centers",
      points: [
        {
          _type: "object",
          _key: "1",
          icon: "Brain",
          title: "Expert-Led Care",
          description: "Our team includes licensed psychologists, speech therapists, occupational therapists, and special educators.",
        },
        {
          _type: "object",
          _key: "2",
          icon: "Heart",
          title: "Child-First Approach",
          description: "We focus on each child's unique strengths, not just their challenges. Every plan is personalized.",
        },
        {
          _type: "object",
          _key: "3",
          icon: "Users",
          title: "Family Involvement",
          description: "Parents are partners in therapy. We equip you with strategies that work at home too.",
        },
        {
          _type: "object",
          _key: "4",
          icon: "Shield",
          title: "Safe & Nurturing",
          description: "A warm, sensory-friendly environment where children feel comfortable and supported.",
        },
        {
          _type: "object",
          _key: "5",
          icon: "Sparkles",
          title: "Holistic Development",
          description: "We address communication, motor skills, behavior, academics, and social skills together.",
        },
        {
          _type: "object",
          _key: "6",
          icon: "Clock",
          title: "Early Intervention Focus",
          description: "The earlier we start, the better the outcomes. We work with children as young as 18 months.",
        },
      ],
    },
    story: {
      title: "Our Story",
      paragraphs: [
        "Divit MindSpace was born from a deeply personal journey. Our founder's experience raising a neurodivergent child revealed the gaps in accessible, compassionate care.",
        "What started as a search for answers became a mission: to create a space where every child is seen for their potential, not their diagnosis.",
        "Today, we combine clinical expertise with genuine understanding—because we've walked this path ourselves. Every family that comes to us is treated like our own.",
      ],
    },
  },
  fields: [
    // ============================================================
    // HERO SECTION - Top of the About Us page
    // ============================================================
    defineField({
      name: "hero",
      title: "Hero Section",
      type: "object",
      group: "hero",
      description: "The top section of the About Us page with title, description, and images",
      fields: [
        defineField({
          name: "title",
          title: "📝 [EDIT] Main Title",
          type: "string",
          description: "Main headline on the About Us page",
        }),
        defineField({
          name: "italicSubtitle",
          title: "📝 [EDIT] Italic Highlight (Optional)",
          type: "string",
          description: "Text shown in purple italic after the title. e.g., 'with Care & Expertise'",
        }),
        defineField({
          name: "description",
          title: "📝 [EDIT] Description",
          type: "text",
          rows: 3,
          description: "Subtitle paragraph below the headline",
        }),
        defineField({
          name: "images",
          title: "🖼️ [EDIT] Hero Images (3 images)",
          type: "array",
          of: [
            {
              type: "image",
              options: { hotspot: true },
              fields: [
                {
                  name: "alt",
                  type: "string",
                  title: "Alt Text",
                  description: "Describe what's in the image for accessibility",
                },
              ],
              components: {
                input: ImageWithPreview,
              },
            },
          ],
          description: "📐 Upload 3 images: 1st = large (1200×675px, 16:9), 2nd & 3rd = square (600×600px). Click image → Edit → drag hotspot to faces!",
          validation: (rule) => rule.max(3),
        }),
      ],
    }),

    // ============================================================
    // PHILOSOPHY SECTION - Why Us / Our Approach
    // ============================================================
    defineField({
      name: "philosophy",
      title: "Why Us Section",
      type: "object",
      group: "philosophy",
      description: "Shows 6 cards with reasons why families choose Divit MindSpace",
      fields: [
        defineField({
          name: "title",
          title: "📝 [EDIT] Section Title",
          type: "string",
          description: "e.g., 'Why Families Choose Us'",
        }),
        defineField({
          name: "description",
          title: "📝 [EDIT] Section Description",
          type: "text",
          rows: 2,
          description: "Brief intro paragraph for this section",
        }),
        defineField({
          name: "points",
          title: "📝 [EDIT] Key Points (6 cards)",
          type: "array",
          description: "6 key differentiators shown as cards. Each has title, description, and icon.",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "title",
                  title: "Point Title",
                  type: "string",
                  description: "e.g., 'Expert-Led Care'",
                },
                {
                  name: "description",
                  title: "Point Description",
                  type: "text",
                  rows: 2,
                  description: "1-2 sentences explaining this point",
                },
                {
                  name: "icon",
                  title: "🔧 [OPTIONAL] Icon Name",
                  type: "string",
                  description: "Lucide icon: Heart, Brain, Users, Shield, Sparkles, Clock",
                },
              ],
              preview: {
                select: { title: "title", subtitle: "description" },
              },
            },
          ],
          validation: (rule) => rule.max(6),
        }),
      ],
    }),

    // ============================================================
    // STORY SECTION - Our Journey
    // ============================================================
    defineField({
      name: "story",
      title: "Our Story Section",
      type: "object",
      group: "story",
      description: "Tell the Divit MindSpace story with image on left, text on right",
      fields: [
        defineField({
          name: "title",
          title: "📝 [EDIT] Story Title",
          type: "string",
          description: "e.g., 'Our Story' or 'Our Journey'",
        }),
        defineField({
          name: "paragraphs",
          title: "📝 [EDIT] Story Content",
          type: "array",
          of: [{ type: "text", rows: 4 }],
          description: "2-4 paragraphs telling the Divit MindSpace story",
        }),
        defineField({
          name: "image",
          title: "🖼️ [EDIT] Story Image",
          type: "image",
          options: { hotspot: true },
          description: "📐 RECOMMENDED: 800×600px (4:3 ratio). Shows alongside the story text. Click image → Edit → drag hotspot to faces!",
          components: {
            input: ImageWithPreview,
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "About Us Page Content",
        subtitle: "Edit hero, philosophy & story sections",
      };
    },
  },
});
