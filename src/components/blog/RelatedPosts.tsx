import { BlogCard } from "@/components/cards/BlogCard"
import type { UIText } from "@/lib/types/UIText"

interface RelatedPost {
  slug: string
  title: string
  excerpt?: string
  category: string
  date?: string
  readTime?: string
  image: string
}

interface RelatedPostsProps {
  posts: RelatedPost[]
  uiText: UIText
}

export function RelatedPosts({ posts, uiText }: RelatedPostsProps) {
  return (
    <section className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-3xl font-light mb-2">{uiText.blog.relatedHeading}</h2>
          <p className="text-muted-foreground">{uiText.blog.relatedDescription}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard
              key={post.slug}
              slug={post.slug}
              title={post.title}
              excerpt={post.excerpt || ""}
              category={post.category}
              date={post.date || ""}
              readTime={post.readTime || ""}
              image={post.image}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
