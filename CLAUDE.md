# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Dev Commands

- **Package manager:** Bun (not npm/yarn)
- `bun run dev` — Start Astro dev server
- `bun run build` — Build static site to `dist/`
- `bun run preview` — Preview built site locally
- `bun run deploy` — Build and deploy to Cloudflare Pages via Wrangler

## Architecture

Astro 5 static site with Tailwind CSS v4 + DaisyUI v5. Pure frontend, no SSR. Deployed to Cloudflare Pages. Content is in Traditional Chinese (zh-Hant).

### Content Collections

Five collections defined in `src/content.config.ts`:

- **astrology, psychology, mbti, tarot** — Markdown blog posts in `src/data/{collection}/` using glob loader. All share the same Zod schema (title, description, pubDate, tags, draft, etc.).
- **tools** — JSON data in `src/data/tools.json` using file loader. External links to AI utilities hosted on subdomains.

Posts with `draft: true` are filtered out at query time via `getCollection()` callbacks.

### Routing

Each blog collection has two page files in `src/pages/{collection}/`:
- `index.astro` — Category listing page
- `[...id].astro` — Dynamic post route using `getStaticPaths()` + `render()` from `astro:content`

The homepage (`src/pages/index.astro`) aggregates the 6 most recent posts across all collections plus all tools.

### Layouts & Components

- `BaseLayout.astro` — HTML shell with navbar, footer, global CSS import, and inline theme-flash-prevention script in `<head>`
- `PostLayout.astro` — Wraps BaseLayout, adds `prose` typography styling for rendered markdown
- Components are stateless and prop-driven: `PostCard`, `ToolCard`, `CardGrid`, `Navbar`, `ThemeToggle`, `Footer`

### Theming

DaisyUI themes configured in `src/styles/global.css`: **dim** (dark, default) and **cupcake** (light). Theme toggle persists to `localStorage` and sets `data-theme` on `<html>`. An inline script in BaseLayout's `<head>` prevents flash of wrong theme on page load.

## Adding Content

**New blog post:** Create a `.md` file in the appropriate `src/data/{collection}/` directory with frontmatter matching the post schema (title, description, pubDate required).

**New tool:** Add an entry to `src/data/tools.json` with id, name, description, url.

**New collection:** Define in `src/content.config.ts`, create `src/data/{name}/` directory, and add `index.astro` + `[...id].astro` under `src/pages/{name}/`. Update the nav items array in `Navbar.astro` and the `collectionPathMap` in `src/pages/index.astro`.
