import { Link } from 'react-router-dom'

const PostCard = ({ post }) => {
  return (
    <article className="post-card">
      <img
        className="post-card-image"
        src={post.imageUrl}
        alt={`${post.title} meta image`}
        loading="lazy"
        onError={(event) => {
          event.currentTarget.src = post.previewImageUrl
        }}
      />
      <img
        className="post-card-logo"
        src={post.logoUrl}
        alt={`${post.title} logo`}
        loading="lazy"
        onError={(event) => {
          event.currentTarget.src = post.imageUrl
        }}
      />
      <div className="post-meta">
        <span>{post.category}</span>
        <span>{post.subcategory}</span>
      </div>
      <h2>
        <Link to={`/post/${post.slug}`}>{post.title}</Link>
      </h2>
      <p>{post.excerpt}</p>
      <a className="extension-link" href={post.extensionUrl} target="_blank" rel="noreferrer">
        View Extension ↗
      </a>
      <div className="post-footer">
        <small>
          {post.publishedAt} • {post.readingTime}
        </small>
        <div className="tag-list">
          {post.tags.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </div>
      </div>
    </article>
  )
}

export default PostCard
