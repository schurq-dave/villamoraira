import type { Locale } from './config'
import type { UIText } from '@/lib/types/UIText'

const uiTextNL: UIText = {
  common: {
    submit: 'Versturen',
    submitting: 'Versturen...',
    back: 'Terug',
    viewAll: 'Bekijk Alles',
    close: 'Sluiten',
    open: 'Openen',
    readTime: 'leestijd',
    home: 'Home',
  },
  pricing: {
    perWeek: 'per week',
    perNight: 'per nacht',
    currency: '€',
  },
  villa: {
    aboutHeading: 'Over deze villa',
    highlightsHeading: 'Kenmerken',
    houseRulesHeading: 'Huisregels',
    reviewsHeading: 'Reviews',
    viewAllPhotos: 'Bekijk Alle Foto\'s',
    backToVillas: 'Terug naar Villa\'s',
    breadcrumbHome: 'Home',
    breadcrumbVillas: 'Villa\'s',
    checkIn: 'Inchecken',
    checkOut: 'Uitchecken',
    noSmoking: 'Niet roken',
    noPets: 'Geen huisdieren toegestaan',
    guests: 'gasten',
    bedrooms: 'slaapkamers',
    bathrooms: 'badkamers',
    viewAllVillas: 'Bekijk Alle Villa\'s',
  },
  article: {
    faqHeading: 'Veelgestelde Vragen',
    relatedHeading: 'Gerelateerde Artikelen',
    authorLabel: 'Geschreven door',
    lastUpdated: 'Laatst bijgewerkt',
    tocTitle: 'Inhoudsopgave',
    breadcrumbArticles: 'Artikelen',
  },
  blog: {
    relatedHeading: 'Gerelateerde Artikelen',
    relatedDescription: 'Ontdek meer over Moraira en villa leven',
    featured: 'UITGELICHT',
    featuredHeading: 'Uitgelicht Artikel',
    featuredDescription: 'Onze top keuze van deze maand',
    latestHeading: 'Laatste Artikelen',
    latestDescription: 'Blijf op de hoogte van onze laatste reisgidsen en villa tips',
    categoriesHeading: 'Blader op Categorie',
    categoriesDescription: 'Vind artikelen die u interesseren',
    notFoundHeading: 'Blog Post Niet Gevonden',
    notFoundDescription: 'De gevraagde blog post kon niet worden gevonden.',
    backToBlog: 'Terug naar Blog',
    shareButton: 'Delen',
    breadcrumbBlog: 'Blog',
  },
  reviews: {
    heading: 'Wat Onze Gasten Zeggen',
    description: 'Neem niet alleen ons woord - hoor van families die de magie van onze villa\'s hebben ervaren',
  },
  contactForm: {
    placeholders: {
      name: 'Volledige naam',
      email: 'Uw e-mailadres',
      category: 'Bericht Categorie (bijv. Boeking)',
      phone: 'Uw telefoonnummer',
      message: 'Uw bericht',
    },
    messages: {
      success: 'Bedankt! We hebben uw bericht ontvangen en nemen binnen 24 uur contact met u op.',
      error: 'Er is iets misgegaan. Probeer het later opnieuw.',
    },
    ariaLabels: {
      name: 'Volledige naam',
      email: 'E-mailadres',
      category: 'Bericht categorie',
      phone: 'Telefoonnummer',
      message: 'Uw bericht',
    },
  },
  navigation: {
    languageLabel: 'Taal',
    menuOpen: 'Menu openen',
    menuClose: 'Menu sluiten',
  },
  footer: {
    quickLinksHeading: 'Snelle Links',
    servicesHeading: 'Diensten',
    contactHeading: 'Contact',
  },
  errorPage: {
    heading: 'Er Is Iets Misgegaan',
    description: 'We zijn een onverwachte fout tegengekomen. Vernieuw de pagina of ga terug naar de homepage.',
    tryAgain: 'Probeer Opnieuw',
    goHome: 'Naar Home',
  },
  notFoundPage: {
    code: '404',
    heading: 'Pagina Niet Gevonden',
    description: 'Sorry, we konden de gevraagde pagina niet vinden. Mogelijk is deze verplaatst of verwijderd.',
    goHome: 'Naar Home',
    browseVillas: 'Bekijk Villa\'s',
  },
  floatingTOC: {
    buttonText: 'Inhoud',
    sheetTitle: 'Inhoudsopgave',
  },
  booking: {
    confirmationMessage: 'Boekingsverzoek verzonden! U ontvangt binnenkort een bevestigingsmail.',
  },
}

const uiTextEN: UIText = {
  common: {
    submit: 'Submit',
    submitting: 'Submitting...',
    back: 'Back',
    viewAll: 'View All',
    close: 'Close',
    open: 'Open',
    readTime: 'read time',
    home: 'Home',
  },
  pricing: {
    perWeek: 'per week',
    perNight: 'per night',
    currency: '€',
  },
  villa: {
    aboutHeading: 'About this villa',
    highlightsHeading: 'Highlights',
    houseRulesHeading: 'House Rules',
    reviewsHeading: 'Reviews',
    viewAllPhotos: 'View All Photos',
    backToVillas: 'Back to Villas',
    breadcrumbHome: 'Home',
    breadcrumbVillas: 'Villas',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    noSmoking: 'No smoking',
    noPets: 'No pets allowed',
    guests: 'guests',
    bedrooms: 'bedrooms',
    bathrooms: 'bathrooms',
    viewAllVillas: 'View All Villas',
  },
  article: {
    faqHeading: 'Frequently Asked Questions',
    relatedHeading: 'Related Articles',
    authorLabel: 'Written by',
    lastUpdated: 'Last updated',
    tocTitle: 'Table of Contents',
    breadcrumbArticles: 'Articles',
  },
  blog: {
    relatedHeading: 'Related Articles',
    relatedDescription: 'Continue exploring Moraira and villa living',
    featured: 'FEATURED',
    featuredHeading: 'Featured Article',
    featuredDescription: 'Our top pick for this month',
    latestHeading: 'Latest Articles',
    latestDescription: 'Stay updated with our latest travel guides and villa tips',
    categoriesHeading: 'Browse by Category',
    categoriesDescription: 'Find articles that interest you most',
    notFoundHeading: 'Blog Post Not Found',
    notFoundDescription: 'The requested blog post could not be found.',
    backToBlog: 'Back to Blog',
    shareButton: 'Share',
    breadcrumbBlog: 'Blog',
  },
  reviews: {
    heading: 'What Our Guests Say',
    description: 'Don\'t just take our word for it - hear from families who have experienced the magic of our villas',
  },
  contactForm: {
    placeholders: {
      name: 'Full name',
      email: 'Your email address',
      category: 'Message Category (e.g. Booking)',
      phone: 'Your phone number',
      message: 'Your message',
    },
    messages: {
      success: 'Thank you! We have received your message and will contact you within 24 hours.',
      error: 'Something went wrong. Please try again later.',
    },
    ariaLabels: {
      name: 'Full name',
      email: 'Email address',
      category: 'Message category',
      phone: 'Phone number',
      message: 'Your message',
    },
  },
  navigation: {
    languageLabel: 'Language',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
  },
  footer: {
    quickLinksHeading: 'Quick Links',
    servicesHeading: 'Services',
    contactHeading: 'Contact',
  },
  errorPage: {
    heading: 'Something Went Wrong',
    description: 'We encountered an unexpected error. Please try refreshing the page or return to the homepage.',
    tryAgain: 'Try Again',
    goHome: 'Go Home',
  },
  notFoundPage: {
    code: '404',
    heading: 'Page Not Found',
    description: 'Sorry, we couldn\'t find the page you\'re looking for. It may have been moved or deleted.',
    goHome: 'Go Home',
    browseVillas: 'Browse Villas',
  },
  floatingTOC: {
    buttonText: 'Contents',
    sheetTitle: 'Table of Contents',
  },
  booking: {
    confirmationMessage: 'Booking request submitted! You will receive a confirmation email shortly.',
  },
}

// UI text translations
export const uiTextTranslations: Record<Locale, UIText> = {
  nl: uiTextNL,
  en: uiTextEN,
}

export function getUiText(locale: Locale): UIText {
  return uiTextTranslations[locale]
}

export type { UIText }
