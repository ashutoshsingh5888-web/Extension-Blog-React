import { useMemo, useState } from 'react'
import { Route, Routes, useParams } from 'react-router-dom'
import Header from './components/Header'
import Filters from './components/Filters'
import PostCard from './components/PostCard'
import Seo from './components/Seo'
import { allTags, categories, posts, subcategoriesByCategory } from './data/posts'

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSubcategory, setSelectedSubcategory] = useState('')
  const [selectedTag, setSelectedTag] = useState('')

  const availableSubcategories = useMemo(() => {
    if (!selectedCategory) {
      return [...new Set(Object.values(subcategoriesByCategory).flat())]
    }
    return subcategoriesByCategory[selectedCategory] || []
  }, [selectedCategory])

  const filteredPosts = useMemo(
    () =>
      posts.filter((post) => {
        if (selectedCategory && post.category !== selectedCategory) return false
        if (selectedSubcategory && post.subcategory !== selectedSubcategory) return false
        if (selectedTag && !post.tags.includes(selectedTag)) return false
        return true
      }),
    [selectedCategory, selectedSubcategory, selectedTag],
  )

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Extension Insights',
    description: 'A blog covering the best browser extensions by category, subcategory, and use case.',
    blogPost: filteredPosts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      datePublished: post.publishedAt,
      author: {
        '@type': 'Person',
        name: post.author,
      },
      keywords: post.tags.join(', '),
      articleSection: `${post.category} > ${post.subcategory}`,
      url: `https://your-domain.com/post/${post.slug}`,
    })),
  }

  return (
    <>
      <Seo
        title="Extension Insights | Browser Extension Blog"
        description="Discover extension guides by category, subcategory, and tags with SEO-ready content and structured data."
        canonicalPath="/"
        schema={blogSchema}
      />
      <Header />
      <main className="container">
        <section className="hero">
          <h1>Extension Blog for Growth, Security, and Productivity</h1>
          <p>
            Browse curated extension guides with advanced filtering and clean SEO foundations.
          </p>
        </section>

        <div id="categories" className="chips">
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              onClick={() => {
                setSelectedCategory(category)
                setSelectedSubcategory('')
              }}
              className={selectedCategory === category ? 'active' : ''}
            >
              {category}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('')
              setSelectedSubcategory('')
              setSelectedTag('')
            }}
          >
            Reset
          </button>
        </div>

        <Filters
          categories={categories}
          subcategories={availableSubcategories}
          tags={allTags}
          selectedCategory={selectedCategory}
          selectedSubcategory={selectedSubcategory}
          selectedTag={selectedTag}
          onCategoryChange={(value) => {
            setSelectedCategory(value)
            setSelectedSubcategory('')
          }}
          onSubcategoryChange={setSelectedSubcategory}
          onTagChange={setSelectedTag}
        />

        <section id="latest-posts">
          <div className="section-head">
            <h2>Latest Posts</h2>
            <p>{filteredPosts.length} result(s)</p>
          </div>
          <div className="post-grid">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>

        <section id="tags" className="tag-cloud">
          <h2>Popular Tags</h2>
          <div className="chips">
            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={selectedTag === tag ? 'active' : ''}
              >
                #{tag}
              </button>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}

const PostPage = () => {
  const { slug } = useParams()
  const post = posts.find((entry) => entry.slug === slug)

  if (!post) {
    return (
      <main className="container post-page">
        <h1>Post not found</h1>
      </main>
    )
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    datePublished: post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    keywords: post.tags.join(', '),
    articleSection: `${post.category} > ${post.subcategory}`,
    description: post.excerpt,
    url: `https://your-domain.com/post/${post.slug}`,
  }

  return (
    <>
      <Seo
        title={`${post.title} | Extension Insights`}
        description={post.excerpt}
        canonicalPath={`/post/${post.slug}`}
        schema={schema}
      />
      <Header />
      <main className="container post-page">
        <p className="breadcrumbs">
          {post.category} / {post.subcategory}
        </p>
        <h1>{post.title}</h1>
        <img
          className="post-hero-image"
          src={post.previewImageUrl}
          alt={`${post.title} preview`}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src = post.imageUrl
          }}
        />
        <p>{post.excerpt}</p>
        <p>
          <a className="extension-link" href={post.extensionUrl} target="_blank" rel="noreferrer">
            Install / Open Extension ↗
          </a>
        </p>
        {post.content.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <div className="tag-list">
          {post.tags.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </div>
      </main>
    </>
  )
}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/post/:slug" element={<PostPage />} />
    </Routes>
  )
}

export default App
