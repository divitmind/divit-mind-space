import { defineArrayMember, defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  groups: [
    { name: "content", title: "1. Content", default: true },
    { name: "media", title: "2. Media" },
    { name: "settings", title: "3. Settings" },
    { name: "seo", title: "4. SEO (Optional)" },
  ],
  fields: [
    // ============================================================
    // CONTENT - Main blog content
    // ============================================================
    defineField({
      name: "title",
      title: "📝 [EDIT] Blog Title",
      type: "string",
      group: "content",
      description: "Main headline for this blog post",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "🔗 [AUTO] URL Slug",
      type: "slug",
      group: "content",
      description: "Auto-generated from title. Click 'Generate'.",
      options: {
        source: "title",
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").slice(0, 96),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "📝 [EDIT] Excerpt / Summary",
      type: "text",
      group: "content",
      rows: 3,
      description: "Short summary for blog cards and SEO (max 200 chars)",
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: "body",
      title: "📝 [EDIT] Blog Content",
      type: "array",
      group: "content",
      description: "Main blog content. Use headings, lists, images as needed.",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Number", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                name: "link",
                title: "External Link",
                type: "object",
                fields: [
                  { name: "href", title: "URL", type: "url", validation: (rule) => rule.required() },
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", type: "string", title: "Alt Text", validation: (rule) => rule.required() },
            { name: "caption", type: "string", title: "Caption" },
          ],
        }),
      ],
    }),

    // ============================================================
    // MEDIA - Images
    // ============================================================
    defineField({
      name: "mainImage",
      title: "🖼️ [EDIT] Featured Image",
      type: "image",
      group: "media",
      description: "📐 RECOMMENDED: 1200×630px (1.91:1 ratio) for best social sharing. MIN: 800×420px. IMPORTANT: Click the image after upload → set HOTSPOT on faces/key area so cropping looks good everywhere.",
      options: { hotspot: true },
      fields: [
        { name: "alt", type: "string", title: "Alt Text", description: "Describe the image for accessibility", validation: (rule) => rule.required() },
        { name: "caption", type: "string", title: "Caption" },
      ],
    }),

    // ============================================================
    // SETTINGS - Publishing options
    // ============================================================
    defineField({
      name: "author",
      title: "👤 [SELECT] Author",
      type: "reference",
      group: "settings",
      description: "Who wrote this blog post",
      to: [{ type: "author" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "categories",
      title: "📂 [SELECT] Categories",
      type: "array",
      group: "settings",
      description: "Select one or more categories",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Parenting Tips", value: "parenting" },
          { title: "Clinical Insights", value: "clinical" },
          { title: "Education Strategies", value: "education" },
          { title: "Adult Support", value: "adult" },
          { title: "Personal Stories", value: "stories" },
          { title: "School Guidance", value: "school" },
        ],
      },
    }),
    defineField({
      name: "publishedAt",
      title: "📅 [EDIT] Published Date",
      type: "datetime",
      group: "settings",
      description: "When this post was published",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "readTime",
      title: "⏱️ [EDIT] Read Time (minutes)",
      type: "number",
      group: "settings",
      description: "Estimated read time (e.g., 5)",
      validation: (rule) => rule.min(1).integer(),
    }),
    defineField({
      name: "featured",
      title: "⭐ [TOGGLE] Featured Post",
      type: "boolean",
      group: "settings",
      description: "Show at top of blog page",
      initialValue: false,
    }),

    // ============================================================
    // SEO - Search engine optimization
    // ============================================================
    defineField({
      name: "seo",
      title: "🔍 SEO Settings",
      type: "object",
      group: "seo",
      description: "Leave blank to use auto-generated SEO from title/excerpt",
      fields: [
        {
          name: "metaTitle",
          title: "✨ [AUTO] Meta Title",
          type: "string",
          description: "Leave blank to use blog title. Custom: 50-60 chars.",
          validation: (rule) => rule.max(60),
        },
        {
          name: "metaDescription",
          title: "✨ [AUTO] Meta Description",
          type: "text",
          rows: 3,
          description: "Leave blank to use excerpt. Custom: 150-160 chars.",
          validation: (rule) => rule.max(160),
        },
        {
          name: "ogImage",
          title: "🖼️ [OPTIONAL] Social Share Image",
          type: "image",
          description: "📐 Use 1200×630px for best results on Facebook/Twitter. Leave blank to use main image.",
          options: { hotspot: true },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
      featured: "featured",
    },
    prepare({ title, author, media, featured }) {
      return {
        title: featured ? `⭐ ${title}` : title,
        subtitle: author ? `by ${author}` : "No author",
        media,
      };
    },
  },
  orderings: [
    { title: "Published Date, New", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] },
    { title: "Published Date, Old", name: "publishedAtAsc", by: [{ field: "publishedAt", direction: "asc" }] },
  ],
});
