# Photography Blog — Alessandro Sebastianelli

A Jekyll-based photography blog + gallery with a travel map. Deployed via GitHub Pages.

---

## Project Structure

```
photography-blog/
│
├── _config.yml              ← Site-wide settings (baseurl, author, social links)
│
├── _data/
│   ├── gallery.yml          ← ✏️ ADD PHOTOS HERE — one entry per image
│   └── locations.yml        ← ✏️ ADD TRAVEL LOCATIONS HERE — drives the map
│
├── _layouts/
│   ├── default.html         ← Shell: nav + footer + lightbox for every page
│   └── post.html            ← Individual blog post template
│
├── _includes/
│   ├── footer.html          ← Site footer
│   └── lightbox.html        ← Lightbox overlay (auto-included in default)
│
├── _pages/
│   ├── blog.html            ← /blog/ — filterable post list
│   ├── gallery.html         ← /gallery/ — masonry photo grid with lightbox
│   ├── map.html             ← /map/ — interactive Leaflet travel map
│   └── about.html           ← /about/ — bio, gear list
│
├── _posts/
│   └── YYYY-MM-DD-title.md  ← ✏️ ADD BLOG POSTS HERE (Markdown)
│
├── assets/
│   ├── css/main.css         ← All design tokens + shared styles
│   └── js/main.js           ← Nav, lightbox, filters, drag-scroll, scroll-reveal
│
├── images/
│   ├── fulls/               ← Full-resolution images (1.jpg, 2.jpg, …)
│   └── thumbs/              ← Thumbnail images (same filenames)
│
└── index.html               ← Homepage
```

---

## Setup

```bash
# 1. Install dependencies
gem install bundler
bundle install

# 2. Run locally
bundle exec jekyll serve

# 3. Visit http://localhost:4000/photography/
```

---

## Adding Content

### New blog post
Create a file in `_posts/` named `YYYY-MM-DD-your-title.md`:

```markdown
---
layout: post
title: "Your Post Title"
date: 2025-06-01
tags: [travel, iceland]          # used for filtering
location: "Reykjavík, Iceland"   # shown in post header
cover_image: /images/fulls/1.jpg # hero image
excerpt: "Short description shown in blog list."
read_time: 5                     # minutes
featured: true                   # show as hero on homepage (optional)
---

Your content here in **Markdown**.
```

### New photo
1. Add `images/fulls/XX.jpg` and `images/thumbs/XX.jpg`
2. Add an entry to `_data/gallery.yml`:

```yaml
- id: "XX"
  ext: jpg
  title: "Caption shown in lightbox"
  location: "Place, Country"
  tags: [landscape, italy]
  date: "2025-06-01"
```

### New map location
Add an entry to `_data/locations.yml`:

```yaml
- name: "City, Country"
  lat: 41.9028
  lng: 12.4964
  country: "Italy"
  cover: "/images/thumbs/XX.jpg"
  posts:
    - "2025-06-01-your-post-slug"  # slug = filename without date
  gallery_tag: "italy"
```

---

## Deployment (GitHub Pages)

1. Set `baseurl: "/photography"` in `_config.yml` (or `""` if at root)
2. Push to GitHub
3. Enable GitHub Pages in repo Settings → Pages → source: `master` branch
