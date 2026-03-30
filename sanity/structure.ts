import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Pages Section - Singleton pages
      S.listItem()
        .title('📄 Pages')
        .child(
          S.list()
            .title('Site Pages')
            .items([
              // About Us Page - Singleton
              S.listItem()
                .title('About Us Page')
                .id('aboutUs')
                .child(
                  S.document()
                    .schemaType('aboutUs')
                    .documentId('aboutUs')
                    .title('About Us Page')
                ),
            ])
        ),

      S.divider(),

      // Blog & News
      S.listItem()
        .title('📝 Blog & News')
        .child(
          S.list()
            .title('Blog & News')
            .items([
              S.documentTypeListItem('post').title('Blog Posts'),
              S.documentTypeListItem('news').title('News & Announcements'),
              S.documentTypeListItem('author').title('Authors'),
            ])
        ),

      // Services
      S.documentTypeListItem('services').title('🛠️ Services'),

      // Gallery
      S.listItem()
        .title('🖼️ Gallery')
        .child(
          S.list()
            .title('Gallery')
            .items([
              S.documentTypeListItem('gallery').title('Gallery Images'),
              S.documentTypeListItem('galleryCategory').title('Gallery Categories'),
            ])
        ),

      // Team
      S.documentTypeListItem('specialist').title('👥 Team / Specialists'),

      // Reviews
      S.documentTypeListItem('review').title('⭐ Reviews'),

      // Careers
      S.documentTypeListItem('career').title('💼 Careers'),

      S.divider(),

      // Settings
      S.listItem()
        .title('⚙️ Settings')
        .child(
          S.list()
            .title('Settings')
            .items([
              S.documentTypeListItem('promowebsite').title('Announcements Banner'),
            ])
        ),
    ])
