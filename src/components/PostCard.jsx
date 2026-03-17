import { Link } from 'react-router-dom'

const PostCard = ({ post }) => {
  return (
    <article className="post-card">
      <div className="post-meta">
        <span>{post.category}</span>
        <span>{post.subcategory}</span>
      </div>
      <h2>
        <Link to={`/post/${post.slug}`}>{post.title}</Link>
      </h2>
      <p>{post.excerpt}</p>
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
