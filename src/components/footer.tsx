import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"
import type { FooterConfig } from "@/lib/types/Footer"
import type { UIText } from "@/lib/types/UIText"

export function Footer({ config, uiText }: { config: FooterConfig; uiText: UIText }) {
  return (
    <footer className="bg-muted border-t border-border" role="contentinfo">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" aria-label="Villa Moraira home">
              <Image
                src="/images/villa-moraira-logo.svg"
                alt="Villa Moraira"
                width={160}
                height={53}
                className="w-auto mb-4 h-16 bg-transparent"
              />
            </Link>

            <p className="text-sm text-muted-foreground">{config.companyDescription}</p>
            <div className="flex space-x-4" role="list" aria-label="Social media links">
              {config.social.facebook && (
                <Link
                  href={config.social.facebook}
                  className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary rounded"
                  aria-label="Visit our Facebook page"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="h-5 w-5" aria-hidden="true" />
                </Link>
              )}
              {config.social.instagram && (
                <Link
                  href={config.social.instagram}
                  className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary rounded"
                  aria-label="Visit our Instagram page"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-5 w-5" aria-hidden="true" />
                </Link>
              )}
              {config.social.twitter && (
                <Link
                  href={config.social.twitter}
                  className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary rounded"
                  aria-label="Visit our Twitter page"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="h-5 w-5" aria-hidden="true" />
                </Link>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <nav className="space-y-4" aria-label="Quick links">
            <h3 className="text-lg font-light text-foreground">{uiText.footer.quickLinksHeading}</h3>
            <ul className="space-y-2">
              {config.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-light text-foreground">{uiText.footer.servicesHeading}</h3>
            <ul className="space-y-2" aria-label="Our services">
              {config.services.map((service) => (
                <li key={service} className="text-sm text-muted-foreground">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <address className="space-y-4 not-italic">
            <h3 className="text-lg font-light text-foreground">{uiText.footer.contactHeading}</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" aria-hidden="true" />
                <span className="text-sm text-muted-foreground">{config.contact.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" aria-hidden="true" />
                <a
                  href={`tel:${config.contact.phone}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary rounded"
                  aria-label={`Call us at ${config.contact.phone}`}
                >
                  {config.contact.phone}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" aria-hidden="true" />
                <a
                  href={`mailto:${config.contact.email}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary rounded"
                  aria-label={`Email us at ${config.contact.email}`}
                >
                  {config.contact.email}
                </a>
              </div>
            </div>
          </address>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">{config.copyright}</p>
            <nav className="flex space-x-6 mt-4 md:mt-0" aria-label="Legal links">
              {config.legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary rounded"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
