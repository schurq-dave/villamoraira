import type { BlogPost } from "@/lib/types/BlogPost"

export const blogPosts: BlogPost[] = [
  {
    slug: "top-10-beaches-moraira",
    title: "Top 10 Beaches to Visit in Moraira",
    excerpt:
      "Discover the most beautiful beaches and hidden coves along Moraira's stunning coastline, from the popular El Portet to secluded gems.",
    category: "Travel Guide",
    author: "Maria Rodriguez",
    date: "March 15, 2024",
    readTime: "8 min read",
    image: "/beautiful-moraira-coastline-with-castle-and-medite.jpg",
    featured: true,
    seo: {
      metaTitle: "Top 10 Beaches to Visit in Moraira | Villa Moraira",
      metaDescription: "Discover the most beautiful beaches and hidden coves along Moraira's stunning coastline, from the popular El Portet to secluded gems.",
      slug: "/blog/top-10-beaches-moraira",
      keywords: ["moraira beaches", "el portet beach", "costa blanca beaches"],
    },
    content: `
      <p>Moraira, nestled along Spain's stunning Costa Blanca, is renowned for its pristine beaches and crystal-clear Mediterranean waters. Whether you're seeking a family-friendly beach with amenities or a secluded cove for peaceful relaxation, Moraira offers an incredible variety of coastal experiences.</p>

      <h2>1. Playa El Portet</h2>
      <p>El Portet is arguably Moraira's most famous beach, and for good reason. This horseshoe-shaped bay features calm, shallow waters perfect for families with young children. The beach is well-equipped with sun loungers, parasols, and nearby restaurants serving fresh seafood.</p>

      <h2>2. Playa L'Ampolla</h2>
      <p>Located in the heart of Moraira, L'Ampolla beach offers easy access to the town's shops, restaurants, and amenities. The beach features a mix of sand and pebbles, with clear waters ideal for swimming and snorkeling. The promenade is perfect for evening strolls.</p>

      <h2>3. Cala Cap Blanc</h2>
      <p>For those seeking a more secluded experience, Cala Cap Blanc is a hidden gem. This small cove requires a short walk down steps, but rewards visitors with pristine waters and fewer crowds. It's an excellent spot for snorkeling and underwater photography.</p>

      <h2>4. Playa Les Platgetes</h2>
      <p>This charming beach is divided into several small coves, each offering its own unique character. The rocky formations create natural pools that are perfect for children to explore safely. The beach has a more local feel and is less crowded than the main beaches.</p>

      <h2>5. Cala Llebeig</h2>
      <p>Adventure seekers will love Cala Llebeig, accessible only by a challenging hiking trail or by boat. The dramatic cliffs and turquoise waters make it one of the most photographed spots in the region. Bring plenty of water and sun protection for the hike.</p>

      <h2>6. Playa Andrago</h2>
      <p>A peaceful pebble beach surrounded by pine trees, Playa Andrago offers a tranquil escape from busier beaches. The clear waters are excellent for snorkeling, and the natural shade from the trees provides relief from the midday sun.</p>

      <h2>7. Cala Portitxol</h2>
      <p>This picturesque cove features traditional fishermen's huts carved into the rock face, creating a unique and authentic atmosphere. The small pebble beach is perfect for a quiet day by the sea, and the nearby restaurant serves excellent local cuisine.</p>

      <h2>8. Playa Moraig</h2>
      <p>Known for its underwater cave, Cova dels Arcs, Playa Moraig is a favorite among divers and snorkelers. The beach itself is a mix of sand and pebbles, with clear waters and stunning coastal views. Arrive early to secure parking during peak season.</p>

      <h2>9. Cala Baladrar</h2>
      <p>A small, intimate cove with crystal-clear waters and interesting rock formations. Cala Baladrar is ideal for couples seeking a romantic beach experience. The beach is relatively undeveloped, so bring your own supplies.</p>

      <h2>10. Playa La Fustera</h2>
      <p>Located between Moraira and Calpe, La Fustera is a Blue Flag beach with excellent facilities. The fine sand and gentle slope make it perfect for families, while the nearby promenade offers restaurants and beach bars for refreshments.</p>

      <h2>Tips for Beach Visits</h2>
      <ul>
        <li>Arrive early during July and August to secure parking and good spots on popular beaches</li>
        <li>Bring water shoes for rocky beaches and coves</li>
        <li>Pack snorkeling gear to explore the rich marine life</li>
        <li>Apply reef-safe sunscreen to protect the Mediterranean ecosystem</li>
        <li>Check local weather and sea conditions before visiting secluded coves</li>
      </ul>

      <p>Each of these beaches offers something unique, from family-friendly amenities to adventurous hiking trails. During your stay at one of our luxury villas, you'll have the perfect base to explore all of Moraira's coastal treasures at your own pace.</p>
    `,
  },
  {
    slug: "luxury-villa-amenities-guide",
    title: "Essential Amenities for Your Luxury Villa Stay",
    excerpt:
      "Learn what to look for when booking a luxury villa in Moraira, from infinity pools to smart home technology and concierge services.",
    category: "Villa Tips",
    author: "Carlos Martinez",
    date: "March 12, 2024",
    readTime: "6 min read",
    image: "/luxury-lounge-villa-with-modern-design-and-pool-in.jpg",
    featured: false,
    seo: {
      metaTitle: "Luxury Villa Amenities Guide | Villa Moraira Huren",
      metaDescription:
        "Essential amenities to look for when booking a luxury villa in Moraira. Expert tips and advice.",
      slug: "luxury-villa-amenities-guide",
      keywords: ["luxury villa amenities", "villa booking tips", "moraira villas"],
    },
  },
]

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getFeaturedBlogPost(): BlogPost | undefined {
  return blogPosts.find((post) => post.featured)
}

export function getRegularBlogPosts(): BlogPost[] {
  return blogPosts.filter((post) => !post.featured)
}

export function getRelatedPosts(
  currentSlug: string,
  limit = 3,
): { slug: string; title: string; category: string; image: string }[] {
  return blogPosts
    .filter((post) => post.slug !== currentSlug)
    .slice(0, limit)
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      category: post.category,
      image: post.image,
    }))
}
