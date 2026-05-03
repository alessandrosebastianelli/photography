# Photography Blog — Alessandro Sebastianelli

Jekyll-based photography blog + gallery + travel map, with EN/IT bilingual support.

---

## Project Structure

```
photography-blog/
│
├── _config.yml              ← Site settings (baseurl, author, social)
│
├── _data/
│   ├── i18n.yml             ← ALL UI strings in EN + IT
│   ├── gallery.yml          ← ✏️ Add photos here
│   └── locations.yml        ← ✏️ Add map pins here
│
├── _layouts/
│   ├── default.html         ← Nav + footer shell (all pages)
│   └── post.html            ← Individual blog post
│
├── _includes/
│   ├── footer.html
│   ├── lightbox.html
│   └── lang-switcher.html   ← Language toggle in nav
│
├── _pages/
│   ├── blog.html            ← /blog/    (EN)
│   ├── gallery.html         ← /gallery/ (EN)
│   ├── map.html             ← /map/     (EN)
│   ├── about.html           ← /about/   (EN)
│   └── it/
│       ├── blog.html        ← /it/blog/    (IT)
│       ├── gallery.html     ← /it/gallery/ (IT)
│       ├── map.html         ← /it/map/     (IT)
│       └── about.html       ← /it/about/   (IT)
│
├── _posts/
│   ├── YYYY-MM-DD-slug.md      ← EN post  (lang: en, ref: slug)
│   └── YYYY-MM-DD-slug.it.md  ← IT post  (lang: it, ref: slug)
│
├── assets/css/main.css      ← Design tokens + shared styles
├── assets/js/main.js        ← Nav, lightbox, filters, drag-scroll
├── images/fulls/            ← Full-res photos
├── images/thumbs/           ← Thumbnail photos
└── index.html               ← Homepage (EN)
```

---

## Setup

```bash
bundle install
bundle exec jekyll serve
# → http://localhost:4000/photography/
```

---

## Adding a Blog Post

Create `_posts/YYYY-MM-DD-your-slug.md`:

```markdown
---
layout: post
title: "Your Title"
date: 2025-06-01
lang: en
ref: your-slug          # must match the IT counterpart
tags: [travel, italy]
location: "Rome, Italy"
cover_image: /images/fulls/XX.jpg
excerpt: "Short preview text."
read_time: 5
featured: true          # optional — shows as hero on homepage
---

Your content in Markdown.
```

For the Italian version, create `_posts/YYYY-MM-DD-your-slug.it.md` with `lang: it` and the same `ref: your-slug`. The language switcher in the nav will automatically link them.

**You don't have to translate every post.** The Italian blog list only shows posts with `lang: it`. Untranslated posts simply don't appear there.

---

## Adding a Photo

1. Drop `images/fulls/XX.jpg` and `images/thumbs/XX.jpg`
2. Add to `_data/gallery.yml`:

```yaml
- id: "XX"
  ext: jpg
  title: "English caption"
  title_it: "Didascalia italiana"
  location: "Place, Country"
  tags: [landscape, italy]
  date: "2025-06-01"
```

---

## Adding a Map Location

Add to `_data/locations.yml`:

```yaml
- name: "City, Country"
  name_it: "Città, Paese"
  lat: 41.9028
  lng: 12.4964
  country: "Italy"
  country_it: "Italia"
  cover: "/images/thumbs/XX.jpg"
  posts:
    - "your-post-slug"    # matches the ref: field in your post
  gallery_tag: "italy"
```

---

## Adding/Editing UI Strings

All interface text lives in `_data/i18n.yml`. Edit any value there — no template changes needed.

---

## Deployment

Set `baseurl: "/photography"` in `_config.yml` (or `""` if deploying at root). Push to GitHub and enable Pages in repo Settings.
