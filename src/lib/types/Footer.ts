export interface FooterLink {
  label: string
  href: string
}

export interface FooterSection {
  title: string
  links?: FooterLink[]
  items?: string[]
}

export interface FooterContact {
  address: string
  phone: string
  email: string
}

export interface FooterSocial {
  facebook?: string
  instagram?: string
  twitter?: string
}

export interface FooterConfig {
  companyName: string
  companyDescription: string
  social: FooterSocial
  quickLinks: FooterLink[]
  services: string[]
  contact: FooterContact
  copyright: string
  legalLinks: FooterLink[]
}
