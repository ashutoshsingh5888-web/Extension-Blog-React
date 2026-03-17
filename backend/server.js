import { createServer } from 'http'
import path from 'path'
import { promises as fs } from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = Number(process.env.PORT || 4000)
const DATA_DIR = path.join(__dirname, 'data')
const UPLOADS_DIR = path.join(__dirname, 'uploads')
const POSTS_FILE = path.join(DATA_DIR, 'posts.json')

const sendJson = (res, statusCode, payload) => {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  })
  res.end(JSON.stringify(payload))
}

const ensureStorage = async () => {
  await fs.mkdir(DATA_DIR, { recursive: true })
  await fs.mkdir(UPLOADS_DIR, { recursive: true })

  try {
    await fs.access(POSTS_FILE)
  } catch {
    await fs.writeFile(POSTS_FILE, '[]', 'utf8')
  }
}

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

const readPosts = async () => {
  const content = await fs.readFile(POSTS_FILE, 'utf8')
  return JSON.parse(content)
}

const writePosts = async (posts) => {
  await fs.writeFile(POSTS_FILE, JSON.stringify(posts, null, 2), 'utf8')
}

const readBody = async (req) => {
  const chunks = []
  for await (const chunk of req) {
    chunks.push(chunk)
  }

  const raw = Buffer.concat(chunks).toString('utf8')
  return raw ? JSON.parse(raw) : {}
}

const maybeSaveBase64Image = async (coverImageBase64, coverImageName = 'cover-image.png') => {
  if (!coverImageBase64) {
    return null
  }

  const match = coverImageBase64.match(/^data:(.+);base64,(.+)$/)
  const base64Payload = match ? match[2] : coverImageBase64
  const safeName = slugify(path.parse(coverImageName).name || 'cover-image')
  const extension = path.extname(coverImageName) || '.png'
  const fileName = `${Date.now()}-${safeName}${extension}`
  const outputPath = path.join(UPLOADS_DIR, fileName)

  const imageBuffer = Buffer.from(base64Payload, 'base64')
  if (imageBuffer.length > 5 * 1024 * 1024) {
    throw new Error('coverImage must be <= 5MB')
  }

  await fs.writeFile(outputPath, imageBuffer)
  return `/uploads/${fileName}`
}

const server = createServer(async (req, res) => {
  if (!req.url) {
    sendJson(res, 404, { error: 'Not found' })
    return
  }

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    })
    res.end()
    return
  }

  if (req.method === 'GET' && req.url === '/api/health') {
    sendJson(res, 200, { status: 'ok' })
    return
  }

  if (req.method === 'GET' && req.url === '/api/posts') {
    const posts = await readPosts()
    sendJson(res, 200, posts)
    return
  }

  if (req.method === 'POST' && req.url === '/api/posts') {
    try {
      const body = await readBody(req)
      const {
        title,
        excerpt,
        content,
        author = 'Anonymous',
        category = 'General',
        subcategory = 'General',
        tags = '',
        publishedAt,
        slug,
        coverImageBase64,
        coverImageName,
      } = body

      if (!title || !excerpt || !content) {
        sendJson(res, 400, {
          error: 'title, excerpt, and content are required fields',
        })
        return
      }

      const posts = await readPosts()
      const baseSlug = slug ? slugify(slug) : slugify(title)

      let uniqueSlug = baseSlug
      let count = 1
      while (posts.some((post) => post.slug === uniqueSlug)) {
        uniqueSlug = `${baseSlug}-${count}`
        count += 1
      }

      const normalizedTags = Array.isArray(tags)
        ? tags
        : String(tags)
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean)

      const parsedContent = Array.isArray(content)
        ? content
        : String(content)
            .split(/\n+/)
            .map((paragraph) => paragraph.trim())
            .filter(Boolean)

      const coverImage = await maybeSaveBase64Image(coverImageBase64, coverImageName)

      const newPost = {
        id: posts.length ? Math.max(...posts.map((post) => post.id)) + 1 : 1,
        title: title.trim(),
        slug: uniqueSlug,
        excerpt: excerpt.trim(),
        content: parsedContent,
        category,
        subcategory,
        tags: normalizedTags,
        author,
        publishedAt: publishedAt || new Date().toISOString().slice(0, 10),
        coverImage,
      }

      posts.unshift(newPost)
      await writePosts(posts)
      sendJson(res, 201, newPost)
      return
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unexpected server error'
      const code = message.includes('<= 5MB') ? 400 : 500
      sendJson(res, code, { error: message })
      return
    }
  }

  if (req.method === 'GET' && req.url.startsWith('/uploads/')) {
    const fileName = req.url.replace('/uploads/', '')
    const safePath = path.join(UPLOADS_DIR, path.basename(fileName))

    try {
      const file = await fs.readFile(safePath)
      res.writeHead(200, { 'Access-Control-Allow-Origin': '*' })
      res.end(file)
    } catch {
      sendJson(res, 404, { error: 'File not found' })
    }
    return
  }

  sendJson(res, 404, { error: 'Not found' })
})

ensureStorage().then(() => {
  server.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`)
  })
})
