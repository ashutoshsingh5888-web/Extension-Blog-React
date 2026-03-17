# Extension Blog React

A modern React blog starter for extension content with:

- Categories + subcategories
- Tag-based filtering
- Individual SEO-friendly post routes
- Structured data (JSON-LD)
- `robots.txt` and `sitemap.xml`
- Express backend API for uploading posts

## Run locally (frontend only)

```bash
npm install
npm run dev
```

## Run backend API

```bash
npm run backend
```

The backend upload guide is available at [`BACKEND_UPLOAD_GUIDE.md`](./BACKEND_UPLOAD_GUIDE.md).

## Run frontend + backend together

```bash
npm run dev:full
```

## Build

```bash
npm run build
npm run preview
```

## Deploy to Render

- Create a new **Static Site** in Render.
- Build command: `npm run build`
- Publish directory: `dist`
- Set your domain and replace `https://your-domain.com` in:
  - `index.html`
  - `src/components/Seo.jsx`
  - `public/robots.txt`
  - `public/sitemap.xml`
