import type { ArticleSection } from "@/lib/types/Article"

interface ArticleContentProps {
  sections: ArticleSection[]
}

export function ArticleContent({ sections }: ArticleContentProps) {
  return (
    <article className="prose prose-lg max-w-none">
      {sections.map((section) => (
        <section key={section.id} id={section.id} className="scroll-mt-24 mb-12">
          <h2 className="text-3xl font-light mb-6 text-foreground">{section.heading}</h2>
          <p className="text-foreground/80 leading-relaxed">{section.content}</p>
        </section>
      ))}
    </article>
  )
}
