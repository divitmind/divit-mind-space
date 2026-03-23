import { defineArrayMember, defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "contentType",
      title: "Content Type",
      type: "string",
      options: {
        list: [
          { title: "Blog", value: "blog" },
          { title: "News", value: "news" },
        ],
        layout: "radio",
      },
      initialValue: "blog",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "")
            .slice(0, 96),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      description: "Short summary of the post for previews and SEO",
      rows: 3,
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          validation: (rule) => rule.required(),
        },
        {
          name: "caption",
          type: "string",
          title: "Caption",
        },
      ],
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
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
      name: "featured",
      title: "Featured Post",
      type: "boolean",
      description: "Highlight this post at the top of the blog or news page",
      initialValue: false,
    }),
    defineField({
      name: "postFormat",
      title: "Post Format",
      type: "string",
      options: {
        list: [
          { title: "Standard (Internal Article)", value: "standard" },
          { title: "External (Press/Media Link)", value: "external" },
          { title: "Event / Announcement", value: "event" },
        ],
        layout: "radio",
      },
      initialValue: "standard",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "externalUrl",
      title: "External URL",
      type: "url",
      description: "The full link to the external article or event page",
      hidden: ({ document }) => document?.postFormat === "standard",
    }),
    defineField({
      name: "sourceName",
      title: "Source / Organization Name",
      type: "string",
      description: "e.g., Indian Express, Bishop Cotton Girls School",
      hidden: ({ document }) => document?.postFormat === "standard",
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
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
                  {
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (rule) => rule.required(),
                  },
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative text",
              validation: (rule) => rule.required(),
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "readTime",
      title: "Read Time (minutes)",
      type: "number",
      description: "Estimated read time in minutes",
      validation: (rule) => rule.min(1).integer(),
    }),
    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "object",
      fields: [
        {
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
          description:
            "Override the title for SEO (leave empty to use post title)",
          validation: (rule) => rule.max(60),
        },
        {
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          description:
            "Override the excerpt for SEO (leave empty to use post excerpt)",
          rows: 3,
          validation: (rule) => rule.max(160),
        },
        {
          name: "ogImage",
          title: "Open Graph Image",
          type: "image",
          description:
            "Override the main image for social sharing (leave empty to use main image)",
          options: {
            hotspot: true,
          },
        },
      ],
      options: {
        collapsed: true,
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return {
        ...selection,
        subtitle: author ? `by ${author}` : "No author",
      };
    },
  },
  orderings: [
    {
      title: "Published Date, New",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Published Date, Old",
      name: "publishedAtAsc",
      by: [{ field: "publishedAt", direction: "asc" }],
    },
  ],
});
