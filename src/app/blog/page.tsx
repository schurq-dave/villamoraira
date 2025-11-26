import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { navigationData } from "@/lib/data/navigation"
import { generatePageMetadata } from "@/lib/seo/metadata"
import { generateBreadcrumbSchema, generateOrganizationSchema } from "@/lib/seo/jsonld"
import { footerData } from "@/lib/data/footer"
import { BlogCard } from "@/components/cards/BlogCard"
import { HeroSection } from "@/components/sections/HeroSection"
import { FeaturedPostCard } from "@/components/blog/FeaturedPostCard"
import { CategoryBadge } from "@/components/blog/CategoryBadge"
import { blogPosts } from "@/lib/data/blog/posts"
import { uiText } from "@/lib/data/site-config"
import { blogPageData } from "@/lib/data/pages/blog"

export async function generateMetadata() {
  return generatePageMetadata({
    title: blogPageData.seo.metaTitle,
    description: blogPageData.seo.metaDescription,
    keywords: blogPageData.seo.keywords,
    path: `/${blogPageData.seo.slug}`,
  })
}

export default function BlogPage() {
  const featuredPost = blogPosts.find((post) => post.featured)
  const regularPosts = blogPosts.filter((post) => !post.featured)

  const organizationSchema = generateOrganizationSchema()
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: uiText.common.home, url: "/" },
    { name: uiText.blog.breadcrumbBlog, url: "/blog" },
  ])

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Navigation
        items={navigationData.mainNav}
        languages={navigationData.languages}
        siteName={navigationData.siteName}
        uiText={uiText}
      />

      <HeroSection
        badge={blogPageData.hero.badge}
        title={blogPageData.hero.title}
        description={blogPageData.hero.description}
      />

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-12">
              <h2 className="text-3xl font-light mb-2">{uiText.blog.featuredHeading}</h2>
              <p className="text-muted-foreground">{uiText.blog.featuredDescription}</p>
            </div>

            <FeaturedPostCard
              slug={featuredPost.slug}
              title={featuredPost.title}
              excerpt={featuredPost.excerpt}
              category={featuredPost.category}
              author={featuredPost.author}
              date={featuredPost.date}
              readTime={featuredPost.readTime}
              image={featuredPost.image}
              uiText={uiText}
            />
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-3xl font-light mb-2">{uiText.blog.latestHeading}</h2>
            <p className="text-muted-foreground">{uiText.blog.latestDescription}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <BlogCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                category={post.category}
                date={post.date}
                readTime={post.readTime}
                image={post.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-3xl font-light mb-6">{uiText.blog.categoriesHeading}</h2>
            <p className="text-muted-foreground">{uiText.blog.categoriesDescription}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {blogPageData.categories.map((category) => (
              <Button key={category.slug} variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent">
                <CategoryBadge category={category.name} />
                <span className="text-sm font-medium">{category.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      <Footer config={footerData} uiText={uiText} />
    </div>
  )
}
