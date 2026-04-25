import { defineField, defineType } from "sanity";

export const galleryCategoryType = defineType({
  name: "galleryCategory",
  title: "Gallery Categories",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Category Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").slice(0, 96),
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});
