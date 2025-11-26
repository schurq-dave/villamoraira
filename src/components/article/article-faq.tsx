import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { ArticleFAQ as FAQType } from "@/lib/types/Article"
import type { UIText } from "@/lib/types/UIText"

interface ArticleFAQProps {
  faqs: FAQType[]
  uiText: UIText
}

export function ArticleFAQ({ faqs, uiText }: ArticleFAQProps) {
  return (
    <section className="mt-16">
      <h2 className="text-3xl font-light mb-8">{uiText.article.faqHeading}</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
