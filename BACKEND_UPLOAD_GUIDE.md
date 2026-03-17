# Backend Post Upload Guide

This project now includes a Node.js backend for uploading and storing blog posts (optionally with a cover image as base64).

## 1) What was added

- `backend/server.js`: API server with post upload endpoint.
- `backend/data/posts.json`: local JSON storage for saved posts.
- `backend/uploads/`: file storage for decoded base64 images.

## 2) Install dependencies

From the project root:

```bash
npm install
```

## 3) Start the backend

```bash
npm run backend
```

The backend runs at:

- `http://localhost:4000`

Health check:

```bash
curl http://localhost:4000/api/health
```

## 4) API overview

### `GET /api/posts`
Returns all saved posts as JSON.

Example:

```bash
curl http://localhost:4000/api/posts
```

### `POST /api/posts`
Creates a new post from JSON.

#### Required fields
- `title`
- `excerpt`
- `content`

#### Optional fields
- `author` (default: `Anonymous`)
- `category` (default: `General`)
- `subcategory` (default: `General`)
- `tags` (comma-separated string or string array)
- `publishedAt` (format `YYYY-MM-DD`; defaults to today)
- `slug` (auto-generated from title if omitted)
- `coverImageBase64` (base64 string or data URL)
- `coverImageName` (e.g. `cover.png`)

## 5) Upload example (text-only)

```bash
curl -X POST http://localhost:4000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Keyboard Shortcuts for Faster Browsing",
    "excerpt": "Boost productivity with extension and browser shortcuts.",
    "content": "Use command palettes.\nMap frequent actions to keys.",
    "author": "Alex",
    "category": "Productivity",
    "subcategory": "Workflows",
    "tags": "shortcuts,productivity"
  }'
```

## 6) Upload with image (base64)

Use `base64` to encode a file and include the output in JSON:

```bash
BASE64_IMAGE=$(base64 -w 0 public/favicon.svg)

curl -X POST http://localhost:4000/api/posts \
  -H "Content-Type: application/json" \
  -d "{
    \"title\": \"How to Choose Browser Extensions\",
    \"excerpt\": \"A practical framework for evaluating extension quality.\",
    \"content\": \"Start by checking permissions.\\nThen inspect reviews and update history.\",
    \"tags\": \"security,privacy,browser\",
    \"coverImageName\": \"favicon.svg\",
    \"coverImageBase64\": \"$BASE64_IMAGE\"
  }"
```

## 7) Data format and storage behavior

- Posts are persisted in `backend/data/posts.json`.
- Decoded images are stored under `backend/uploads/`.
- `content` is normalized into an array of paragraphs.
- `tags` is normalized into an array.
- If a generated slug already exists, `-1`, `-2`, etc. is appended.
- Uploaded image payload limit is 5MB.

## 8) Run frontend + backend together (optional)

Use this command to run both in parallel during development:

```bash
npm run dev:full
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`

## 9) Common errors

- **400 title, excerpt, and content are required fields**  
  You omitted one of the required fields.
- **400 coverImage must be <= 5MB**  
  Uploaded image payload is too large.
- **500 Unexpected server error**  
  Check backend logs and verify write permissions.
