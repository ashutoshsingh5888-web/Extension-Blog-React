export const posts = [
  {
    id: 1,
    slug: 'best-productivity-extensions-for-developers',
    title: 'Best Productivity Extensions for Developers in 2026',
    excerpt:
      'A curated list of browser extensions that speed up debugging, note-taking, and workflow automation for modern dev teams.',
    content: [
      'Developer productivity extensions can remove repetitive work and reduce context switching. In this guide, we evaluate tools based on speed impact, UX quality, and privacy practices.',
      'Our top picks include extensions for AI summaries, JSON formatting, and tab management. Each extension is tested across Chromium-based browsers to ensure compatibility.',
      'Before installing, audit requested permissions and start with a minimal set of extensions to avoid browser bloat.',
    ],
    category: 'Productivity',
    subcategory: 'Developers',
    tags: ['workflow', 'developer-tools', 'automation'],
    author: 'Admin',
    publishedAt: '2026-01-10',
    readingTime: '6 min read',
  },
  {
    id: 2,
    slug: 'privacy-focused-extensions-guide',
    title: 'Privacy-Focused Extensions: Complete Beginner Guide',
    excerpt:
      'Understand tracker blockers, DNS security helpers, and cookie management tools to secure your daily browsing.',
    content: [
      'Privacy extensions can significantly reduce third-party tracking by blocking requests and isolating storage.',
      'Choose extensions with transparent open-source repositories and clear update logs. Avoid overlapping extensions that duplicate functionality.',
      'Run monthly audits and remove unused tools to keep your browser secure and fast.',
    ],
    category: 'Security',
    subcategory: 'Privacy',
    tags: ['privacy', 'security', 'beginner'],
    author: 'Admin',
    publishedAt: '2026-01-18',
    readingTime: '5 min read',
  },
  {
    id: 3,
    slug: 'seo-extensions-for-content-teams',
    title: 'SEO Extensions Every Content Team Should Use',
    excerpt:
      'Practical extension stack for keyword discovery, on-page audits, and search intent analysis.',
    content: [
      'SEO browser extensions can provide immediate insights on title tags, heading hierarchy, and schema markup.',
      'Pair technical audit extensions with keyword research tools to improve both ranking opportunities and content relevance.',
      'Create a repeatable audit checklist so every article is optimized before publishing.',
    ],
    category: 'Marketing',
    subcategory: 'SEO',
    tags: ['seo', 'content-marketing', 'analytics'],
    author: 'Admin',
    publishedAt: '2026-02-02',
    readingTime: '7 min read',
  },
  {
    id: 4,
    slug: 'extensions-for-designers-and-ux-researchers',
    title: 'Top Extensions for Designers and UX Researchers',
    excerpt:
      'A hands-on setup for capturing design inspiration, accessibility checks, and rapid user feedback.',
    content: [
      'Design teams can leverage browser extensions for color extraction, spacing analysis, and contrast validation.',
      'UX researchers benefit from lightweight annotation tools that capture user friction during testing sessions.',
      'Consolidating tools into category-based sets keeps your workflow focused and less distracting.',
    ],
    category: 'Design',
    subcategory: 'UX Research',
    tags: ['design', 'ux', 'accessibility'],
    author: 'Admin',
    publishedAt: '2026-02-14',
    readingTime: '4 min read',
  },
]

export const categories = [...new Set(posts.map((post) => post.category))]

export const subcategoriesByCategory = posts.reduce((acc, post) => {
  if (!acc[post.category]) acc[post.category] = new Set()
  acc[post.category].add(post.subcategory)
  return acc
}, {})

Object.keys(subcategoriesByCategory).forEach((category) => {
  subcategoriesByCategory[category] = [...subcategoriesByCategory[category]]
})

export const allTags = [...new Set(posts.flatMap((post) => post.tags))]
