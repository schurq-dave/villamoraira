// Singletons
import siteSettings from './singletons/site-settings'
import contactInfo from './singletons/contact-info'
import navigation from './singletons/navigation'
import footer from './singletons/footer'

// Objects
import portableText from './objects/portable-text'
import seo from './objects/seo'

// Documents
import homePage from './documents/home-page'
import aboutPage from './documents/about-page'
import contactPage from './documents/contact-page'
import villasPage from './documents/villas-page'
import morairaPage from './documents/moraira-page'
import villa from './documents/villa'
import amenity from './documents/amenity'
import review from './documents/review'
import blogPost from './documents/blog-post'
import article from './documents/article'
import author from './documents/author'
import category from './documents/category'

export const schemaTypes = [
  // Singletons
  siteSettings,
  contactInfo,
  navigation,
  footer,

  // Objects (must be before documents that use them)
  portableText,
  seo,

  // Pages
  homePage,
  aboutPage,
  contactPage,
  villasPage,
  morairaPage,

  // Content
  villa,
  amenity,
  review,
  blogPost,
  article,
  author,
  category,
]
