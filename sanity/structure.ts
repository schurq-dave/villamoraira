import type { StructureBuilder, DefaultDocumentNodeResolver } from 'sanity/structure'
import { DocumentsIcon, CogIcon, HomeIcon, EarthGlobeIcon, UsersIcon, EnvelopeIcon, DocumentTextIcon, TagIcon, UserIcon, StarIcon } from '@sanity/icons'

// Default language - documents without a language field are treated as this language
const DEFAULT_LANGUAGE = 'nl'

// Configure the default document node to show translations
export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, { schemaType }) => {
  return S.document()
}

// Helper to create a filtered document list that shows all language versions
const createTranslatableList = (S: StructureBuilder, schemaType: string, title: string) => {
  return S.documentTypeList(schemaType)
    .title(title)
    .filter('_type == $type')
    .params({ type: schemaType })
    .defaultOrdering([{ field: 'language', direction: 'asc' }, { field: '_createdAt', direction: 'desc' }])
}

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Settings Group
      S.listItem()
        .title('Settings')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Settings')
            .items([
              S.listItem()
                .title('Site Settings')
                .icon(CogIcon)
                .child(createTranslatableList(S, 'siteSettings', 'Site Settings')),
              S.listItem()
                .title('Navigation')
                .icon(DocumentsIcon)
                .child(createTranslatableList(S, 'navigation', 'Navigation')),
              S.listItem()
                .title('Footer')
                .icon(DocumentsIcon)
                .child(createTranslatableList(S, 'footer', 'Footer')),
              S.listItem()
                .title('Contact Info')
                .icon(EnvelopeIcon)
                .child(
                  S.document()
                    .schemaType('contactInfo')
                    .documentId('contactInfo')
                ),
            ])
        ),
      S.divider(),
      // Pages Group
      S.listItem()
        .title('Pages')
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem()
                .title('Home Page')
                .icon(HomeIcon)
                .child(createTranslatableList(S, 'homePage', 'Home Page')),
              S.listItem()
                .title('Villas Page')
                .icon(HomeIcon)
                .child(createTranslatableList(S, 'villasPage', 'Villas Page')),
              S.listItem()
                .title('About Page')
                .icon(UsersIcon)
                .child(createTranslatableList(S, 'aboutPage', 'About Page')),
              S.listItem()
                .title('Moraira Page')
                .icon(EarthGlobeIcon)
                .child(createTranslatableList(S, 'morairaPage', 'Moraira Page')),
              S.listItem()
                .title('Contact Page')
                .icon(EnvelopeIcon)
                .child(createTranslatableList(S, 'contactPage', 'Contact Page')),
              S.listItem()
                .title('Blog Page')
                .icon(DocumentTextIcon)
                .child(createTranslatableList(S, 'blogPage', 'Blog Page')),
            ])
        ),
      S.divider(),
      // Villas
      S.listItem()
        .title('Villas')
        .icon(HomeIcon)
        .child(
          S.list()
            .title('Villas')
            .items([
              S.listItem()
                .title('All Villas')
                .icon(HomeIcon)
                .child(createTranslatableList(S, 'villa', 'All Villas')),
              S.listItem()
                .title('Amenities')
                .icon(TagIcon)
                .child(S.documentTypeList('amenity')),
              S.listItem()
                .title('Reviews')
                .icon(StarIcon)
                .child(S.documentTypeList('review')),
            ])
        ),
      S.divider(),
      // Blog & Articles
      S.listItem()
        .title('Content')
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .title('Content')
            .items([
              S.listItem()
                .title('Blog Posts')
                .icon(DocumentTextIcon)
                .child(createTranslatableList(S, 'blogPost', 'Blog Posts')),
              S.listItem()
                .title('Articles')
                .icon(DocumentTextIcon)
                .child(createTranslatableList(S, 'article', 'Articles')),
              S.divider(),
              S.listItem()
                .title('Authors')
                .icon(UserIcon)
                .child(S.documentTypeList('author')),
              S.listItem()
                .title('Categories')
                .icon(TagIcon)
                .child(S.documentTypeList('category')),
            ])
        ),
    ])
