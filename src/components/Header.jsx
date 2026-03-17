import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" to="/">
          Extension Insights
        </Link>
        <nav>
          <a href="#latest-posts">Latest Posts</a>
          <a href="#categories">Categories</a>
          <a href="#tags">Tags</a>
        </nav>
      </div>
    </header>
  )
}

export default Header
