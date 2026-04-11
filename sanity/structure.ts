import type { StructureResolver } from "sanity/structure";
import { 
  BookOpen, 
  Info, 
  Megaphone, 
  FileText, 
  Layout, 
  Users, 
  GraduationCap, 
  Briefcase, 
  Image as ImageIcon,
  Star
} from "lucide-react";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content Management")
    .items([
      // ============================================================
      // SINGLETON PAGES (Pages that exist only once)
      // ============================================================
      S.listItem()
        .title("Awareness Page")
        .icon(BookOpen)
        .child(
          S.document()
            .schemaType("awareness")
            .documentId("awareness")
        ),
      S.listItem()
        .title("About Us Page")
        .icon(Info)
        .child(
          S.document()
            .schemaType("aboutUs")
            .documentId("aboutUs")
        ),
      S.listItem()
        .title("Promo Website (Announcement)")
        .icon(Megaphone)
        .child(
          S.document()
            .schemaType("promowebsite")
            .documentId("promowebsite")
        ),

      S.divider(),

      // ============================================================
      // LIST TYPES (Collections of documents)
      // ============================================================
      S.listItem()
        .title("Blog Posts")
        .icon(FileText)
        .child(S.documentTypeList("post").title("Blog Posts")),
      
      S.listItem()
        .title("Services")
        .icon(Layout)
        .child(S.documentTypeList("services").title("Services")),
      
      S.listItem()
        .title("Specialists (Our Team)")
        .icon(Users)
        .child(S.documentTypeList("specialist").title("Our Team")),
      
      S.listItem()
        .title("Reviews")
        .icon(Star)
        .child(S.documentTypeList("review").title("Reviews")),

      S.listItem()
        .title("Mind Gym")
        .icon(GraduationCap)
        .child(S.documentTypeList("mindGym").title("Mind Gym Games")),

      S.divider(),

      S.listItem()
        .title("Gallery")
        .icon(ImageIcon)
        .child(
          S.list()
            .title("Gallery Management")
            .items([
              S.listItem()
                .title("Gallery Images")
                .icon(ImageIcon)
                .child(S.documentTypeList("gallery").title("Gallery Images")),
              S.listItem()
                .title("Gallery Categories")
                .icon(Layout)
                .child(S.documentTypeList("galleryCategory").title("Gallery Categories")),
            ])
        ),

      S.listItem()
        .title("Careers")
        .icon(Briefcase)
        .child(S.documentTypeList("career").title("Careers")),
      
      S.listItem()
        .title("Authors")
        .icon(Users)
        .child(S.documentTypeList("author").title("Authors")),

      // ============================================================
      // AUTOMATICALLY INCLUDE REMAINING TYPES
      // ============================================================
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !["mindGym", "awareness", "aboutUs", "promowebsite", "post", "services", "specialist", "review", "gallery", "galleryCategory", "career", "author", "media.tag"].includes(
            listItem.getId() || ""
          )
      ),
    ]);
