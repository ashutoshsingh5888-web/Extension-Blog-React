import { Helmet } from 'react-helmet-async'

const Seo = ({ title, description, canonicalPath = '/', schema }) => {
  const baseUrl = 'https://your-domain.com'
  const canonical = `${baseUrl}${canonicalPath}`

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <link rel="canonical" href={canonical} />
      {schema ? <script type="application/ld+json">{JSON.stringify(schema)}</script> : null}
    </Helmet>
  )
}

export default Seo
