import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Pages Group
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Static Pages')
            .items([
              S.listItem()
                .title('Promo Website (Home Announcement)')
                .child(S.document().schemaType('promowebsite').documentId('promowebsite')),
              S.listItem()
                .title('About Us Page')
                .child(S.document().schemaType('aboutUs').documentId('aboutUs')),
              S.listItem()
                .title('Affiliations Page')
                .child(S.document().schemaType('affiliations').documentId('affiliations')),
              S.listItem()
                .title('Awareness Program Page')
                .child(S.document().schemaType('awarenessProgram').documentId('awarenessProgram')),
              S.listItem()
                .title('Contact Page')
                .child(S.document().schemaType('contact').documentId('contact')),
            ])
        ),
      
      S.divider(),

      // Regular Document Types
      S.documentTypeListItem('post').title('Blog Posts'),
      S.documentTypeListItem('news').title('News / Announcements'),
      S.documentTypeListItem('services').title('Services'),
      S.documentTypeListItem('specialist').title('Specialists / Team'),
      S.documentTypeListItem('review').title('Reviews'),
      S.documentTypeListItem('gallery').title('Gallery'),
      S.documentTypeListItem('career').title('Careers'),
      
      S.divider(),
      
      // Secondary Schemas
      S.documentTypeListItem('author').title('Authors'),
      S.documentTypeListItem('galleryCategory').title('Gallery Categories'),
    ])
