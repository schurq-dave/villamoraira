import { groq } from 'next-sanity'

// =============================================================================
// DOCUMENT-LEVEL INTERNATIONALIZATION QUERIES
// =============================================================================
// With document-level i18n, each language version is a separate document.
// The plugin creates documents with IDs like: villa__i18n_en (for English)
// Use the 'language' field to filter by language.
//
// Pattern: Always filter by language to get the correct version
// Example: *[_type == "villa" && language == $language]
// =============================================================================

// -----------------------------------------------------------------------------
// SITE SETTINGS
// -----------------------------------------------------------------------------
export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings" && language == $language][0]{
    _id,
    siteName,
    "slug": slug.current,
    siteTagline,
    siteUrl,
    "logoUrl": logo.asset->url,
    contact,
    social,
    defaultSeo{
      metaTitle,
      metaDescription,
      keywords,
      "ogImageUrl": ogImage.asset->url
    }
  }
`

// -----------------------------------------------------------------------------
// NAVIGATION
// -----------------------------------------------------------------------------
export const NAVIGATION_QUERY = groq`
  *[_type == "navigation" && language == $language][0]{
    _id,
    "slug": slug.current,
    mainNav[]{
      label,
      href,
      children[]{
        label,
        href,
        description
      }
    },
    ctaButton,
    languageLabels
  }
`

// -----------------------------------------------------------------------------
// FOOTER
// -----------------------------------------------------------------------------
export const FOOTER_QUERY = groq`
  *[_type == "footer" && language == $language][0]{
    _id,
    "slug": slug.current,
    tagline,
    columns[]{
      title,
      links[]{
        label,
        href
      }
    },
    contactSection,
    bottomBar{
      copyright,
      links[]{
        label,
        href
      }
    },
    newsletterSection
  }
`

// -----------------------------------------------------------------------------
// PAGES
// -----------------------------------------------------------------------------
export const HOME_PAGE_QUERY = groq`
  *[_type == "homePage" && language == $language][0]{
    _id,
    "slug": slug.current,
    seo{
      metaTitle,
      metaDescription,
      keywords,
      "ogImageUrl": ogImage.asset->url
    },
    hero{
      title,
      description,
      "imageUrl": image.asset->url,
      imageAlt,
      ctaText,
      ctaLink
    },
    featuredVillas{
      title,
      description,
      viewAllText,
      viewAllLink
    },
    features{
      title,
      description,
      items[]{
        icon,
        title,
        description
      }
    },
    morairaSection{
      title,
      description,
      bulletPoints,
      ctaText,
      ctaLink,
      "imageUrl": image.asset->url,
      imageAlt
    }
  }
`

export const ABOUT_PAGE_QUERY = groq`
  *[_type == "aboutPage" && language == $language][0]{
    _id,
    title,
    "slug": slug.current,
    seo{
      metaTitle,
      metaDescription,
      keywords,
      "ogImageUrl": ogImage.asset->url
    },
    hero{
      badge,
      title,
      description,
      "imageUrl": image.asset->url,
      imageAlt
    },
    story{
      title,
      paragraphs,
      "imageUrl": image.asset->url,
      imageAlt,
      ctaText,
      ctaLink
    },
    values{
      title,
      description,
      items[]{
        _key,
        icon,
        title,
        description
      }
    },
    testimonials{
      title,
      description,
      items[]{
        _key,
        name,
        date,
        rating,
        text
      }
    },
    cta{
      title,
      description,
      buttons[]{
        _key,
        label,
        href,
        variant
      }
    }
  }
`

export const CONTACT_PAGE_QUERY = groq`
  *[_type == "contactPage" && language == $language][0]{
    _id,
    title,
    "slug": slug.current,
    seo{
      metaTitle,
      metaDescription,
      keywords,
      "ogImageUrl": ogImage.asset->url
    },
    hero{
      badge,
      title,
      description
    },
    contactInfo{
      phoneLabel,
      emailLabel,
      locationLabel
    },
    mapSection{
      title,
      description,
      placeholder{
        title,
        description
      }
    },
    faq[]{
      _key,
      question,
      answer
    },
    formLabels
  }
`

export const VILLAS_PAGE_QUERY = groq`
  *[_type == "villasPage" && language == $language][0]{
    _id,
    title,
    "slug": slug.current,
    seo{
      metaTitle,
      metaDescription,
      keywords,
      "ogImageUrl": ogImage.asset->url
    },
    hero{
      title,
      subtitle,
      "imageUrl": image.asset->url,
      imageAlt
    },
    introduction,
    filterLabels,
    sortOptions[]{
      value,
      label
    }
  }
`

export const MORAIRA_PAGE_QUERY = groq`
  *[_type == "morairaPage" && language == $language][0]{
    _id,
    title,
    "slug": slug.current,
    seo{
      metaTitle,
      metaDescription,
      keywords,
      "ogImageUrl": ogImage.asset->url
    },
    hero{
      title,
      description,
      "imageUrl": image.asset->url,
      imageAlt
    },
    introduction{
      title,
      paragraphs,
      stats[]{
        icon,
        label
      },
      "imageUrl": image.asset->url,
      imageAlt
    },
    attractions{
      title,
      description,
      items[]{
        _key,
        title,
        description,
        "imageUrl": image.asset->url,
        imageAlt,
        icon,
        distance,
        badge
      }
    },
    activities{
      title,
      description,
      water{
        title,
        items[]{
          _key,
          title,
          description
        }
      },
      land{
        title,
        items[]{
          _key,
          title,
          description
        }
      }
    },
    dining{
      title,
      description,
      options[]{
        _key,
        title,
        description
      }
    },
    transportation{
      title,
      description,
      flight{
        title,
        options[]{
          _key,
          title,
          duration,
          description
        }
      },
      car{
        title,
        options[]{
          _key,
          title,
          duration,
          description
        }
      }
    },
    cta{
      title,
      description,
      buttons[]{
        _key,
        label,
        href,
        variant
      }
    }
  }
`

// -----------------------------------------------------------------------------
// BLOG PAGE (OVERVIEW)
// -----------------------------------------------------------------------------
export const BLOG_PAGE_QUERY = groq`
  *[_type == "blogPage" && language == $language][0]{
    _id,
    title,
    "slug": slug.current,
    seo{
      metaTitle,
      metaDescription,
      keywords,
      "ogImageUrl": ogImage.asset->url
    },
    hero{
      badge,
      title,
      description
    },
    featuredSection{
      title,
      description
    },
    latestSection{
      title,
      description
    },
    categoriesSection{
      title,
      description
    }
  }
`

// -----------------------------------------------------------------------------
// VILLAS
// -----------------------------------------------------------------------------
export const ALL_VILLAS_QUERY = groq`
  *[_type == "villa" && language == $language] | order(order asc, _createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    shortDescription,
    "mainImageUrl": mainImage.asset->url,
    "mainImageAlt": mainImage.alt,
    location{
      address,
      city
    },
    pricing{
      perWeek,
      perNight,
      currency
    },
    capacity{
      guests,
      bedrooms,
      bathrooms
    },
    rating,
    featured,
    availability
  }
`

export const FEATURED_VILLAS_QUERY = groq`
  *[_type == "villa" && language == $language && featured == true] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    shortDescription,
    "mainImageUrl": mainImage.asset->url,
    "mainImageAlt": mainImage.alt,
    location{
      address,
      city
    },
    pricing{
      perWeek,
      perNight,
      currency
    },
    capacity{
      guests,
      bedrooms,
      bathrooms
    },
    rating
  }
`

export const VILLA_BY_SLUG_QUERY = groq`
  *[_type == "villa" && language == $language && slug.current == $slug][0]{
    _id,
    name,
    "slug": slug.current,
    shortDescription,
    fullDescription,
    seo{
      metaTitle,
      metaDescription,
      keywords,
      "ogImageUrl": ogImage.asset->url
    },
    "mainImageUrl": mainImage.asset->url,
    "mainImageAlt": mainImage.alt,
    images[]{
      "url": asset->url,
      alt
    },
    location{
      address,
      city,
      coordinates
    },
    pricing,
    capacity,
    rating,
    amenities[]->{
      _id,
      name,
      icon,
      category
    },
    highlights[]{
      icon,
      title,
      description
    },
    houseRules,
    featured,
    availability
  }
`

// Get all villa slugs for static generation (both languages)
export const VILLA_SLUGS_QUERY = groq`
  *[_type == "villa" && defined(slug.current)]{
    "slug": slug.current,
    language
  }
`

// Minimal query for sitemap generation (both languages)
export const VILLA_SITEMAP_QUERY = groq`
  *[_type == "villa" && defined(slug.current)]{
    "slug": slug.current,
    language,
    _updatedAt
  }
`

// -----------------------------------------------------------------------------
// BLOG POSTS
// -----------------------------------------------------------------------------
export const ALL_BLOG_POSTS_QUERY = groq`
  *[_type == "blogPost" && language == $language] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "mainImageUrl": mainImage.asset->url,
    "mainImageAlt": mainImage.alt,
    author->{
      name,
      "imageUrl": image.asset->url
    },
    categories[]->{
      _id,
      title,
      "slug": slug.current
    },
    publishedAt
  }
`

export const BLOG_POST_BY_SLUG_QUERY = groq`
  *[_type == "blogPost" && language == $language && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    seo{
      metaTitle,
      metaDescription,
      keywords,
      "ogImageUrl": ogImage.asset->url
    },
    "mainImageUrl": mainImage.asset->url,
    "mainImageAlt": mainImage.alt,
    body,
    author->{
      name,
      bio,
      "imageUrl": image.asset->url
    },
    categories[]->{
      _id,
      title,
      "slug": slug.current
    },
    publishedAt
  }
`

// Get all blog post slugs for static generation (both languages)
export const BLOG_POST_SLUGS_QUERY = groq`
  *[_type == "blogPost" && defined(slug.current)]{
    "slug": slug.current,
    language
  }
`

// -----------------------------------------------------------------------------
// ARTICLES
// -----------------------------------------------------------------------------
export const ALL_ARTICLES_QUERY = groq`
  *[_type == "article" && language == $language] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "mainImageUrl": mainImage.asset->url,
    "mainImageAlt": mainImage.alt,
    author->{
      name,
      "imageUrl": image.asset->url
    },
    categories[]->{
      _id,
      title,
      "slug": slug.current
    },
    publishedAt,
    featured
  }
`

export const ARTICLE_BY_SLUG_QUERY = groq`
  *[_type == "article" && language == $language && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    seo{
      metaTitle,
      metaDescription,
      keywords,
      "ogImageUrl": ogImage.asset->url
    },
    "mainImageUrl": mainImage.asset->url,
    "mainImageAlt": mainImage.alt,
    body,
    author->{
      name,
      bio,
      "imageUrl": image.asset->url
    },
    categories[]->{
      _id,
      title,
      "slug": slug.current
    },
    publishedAt
  }
`

// Get all article slugs for static generation (both languages)
export const ARTICLE_SLUGS_QUERY = groq`
  *[_type == "article" && defined(slug.current)]{
    "slug": slug.current,
    language
  }
`

// -----------------------------------------------------------------------------
// REVIEWS
// -----------------------------------------------------------------------------
export const ALL_REVIEWS_QUERY = groq`
  *[_type == "review"] | order(date desc) {
    _id,
    name,
    location,
    rating,
    text,
    date,
    "imageUrl": image.asset->url,
    villa->{
      name,
      "slug": slug.current
    }
  }
`

export const VILLA_REVIEWS_QUERY = groq`
  *[_type == "review" && villa._ref == $villaId] | order(date desc) {
    _id,
    name,
    location,
    rating,
    text,
    date
  }
`

// -----------------------------------------------------------------------------
// AMENITIES & CATEGORIES
// -----------------------------------------------------------------------------
export const ALL_AMENITIES_QUERY = groq`
  *[_type == "amenity"] | order(category, name) {
    _id,
    name,
    icon,
    category
  }
`

export const ALL_CATEGORIES_QUERY = groq`
  *[_type == "category"] | order(title) {
    _id,
    title,
    "slug": slug.current,
    description
  }
`

// -----------------------------------------------------------------------------
// TRANSLATION HELPERS
// -----------------------------------------------------------------------------
// Get the translated document via translation.metadata
// This uses the proper translation links created by the documentInternationalization plugin
export const GET_TRANSLATED_DOCUMENT_QUERY = groq`
  *[_type == "translation.metadata" && references($documentId)][0]{
    "translations": translations[]{
      _key,
      "doc": value->{
        _id,
        _type,
        language,
        "slug": slug.current,
        title,
        name
      }
    }
  }
`

// Get all translations by finding the translation.metadata that contains a document with the given slug
export const GET_TRANSLATIONS_BY_SLUG_QUERY = groq`
  *[_type == "translation.metadata" && $schemaType in schemaTypes]{
    "translations": translations[]{
      _key,
      "doc": value->{
        _id,
        _type,
        language,
        "slug": slug.current,
        title,
        name
      }
    }
  }[translations[].doc.slug match $slug][0]
`

// Get the slug for a specific language given a document ID
export const GET_LANGUAGE_SLUG_QUERY = groq`
  *[_type == "translation.metadata" && references($documentId)][0]{
    "targetDoc": translations[_key == $targetLanguage][0].value->{
      "slug": slug.current,
      language
    }
  }.targetDoc
`

// Get alternate language URLs for a page given the current document ID
export const GET_ALTERNATE_URLS_QUERY = groq`
  *[_type == "translation.metadata" && references($documentId)][0]{
    "alternates": translations[]{
      "language": _key,
      "slug": value->slug.current,
      "type": value->_type
    }
  }.alternates
`
