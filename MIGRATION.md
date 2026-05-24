# Next.js 14 App Router Migration

This document details the migration of the portfolio from React 18 + Vite (SPA) to Next.js 14 App Router (SSG).

## What Changed and Why
The previous architecture used Vite to build a Single Page Application (SPA). While fast, SPAs ship a mostly empty `index.html` and rely on client-side JavaScript to render the content. This is sub-optimal for SEO and first-paint performance.

By migrating to **Next.js 14 App Router** with `output: 'export'`, we have achieved **Static Site Generation (SSG)**.
- Every page and component is pre-rendered to raw HTML at build time.
- Search engine crawlers (Googlebot) and social media scrapers see the full content immediately without needing to execute JavaScript.
- We get native Next.js SEO capabilities (automatic `sitemap.xml` and `robots.txt` generation).
- First-paint metrics are vastly improved because the browser renders HTML before JS even loads.

### Key File Replacements
| Old (Vite) | New (Next.js) | Purpose |
|---|---|---|
| `vite.config.js` | `next.config.js` | Build system configuration. |
| `index.html` + `src/main.jsx` | `app/layout.jsx` | Root HTML structure and metadata. |
| `src/App.jsx` | `app/page.jsx` | Root page component rendering all sections. |
| `src/styles/global.css` | `app/globals.css` | Global stylesheet (moved to standard Next.js location). |

## Server vs. Client Components

Next.js App Router defaults to **Server Components**, which render purely on the server (or at build time for SSG) and ship zero JavaScript to the client.

To maintain our complex interactions, animations, and DOM manipulation (e.g., custom cursor, magnetic buttons, scroll reveals), we explicitly opted interactive components into client-side execution by adding the `'use client';` directive.

**Components marked `'use client'`:**
- `PageClient.jsx`: A new invisible wrapper that initializes global client logic like `useScrollReveal` and the scroll progress bar listener.
- `Cursor.jsx`, `ThemeToggle.jsx`, `AvailabilityBanner.jsx`: Rely on `window`, `localStorage`, `sessionStorage`, and global event listeners.
- `Preloader.jsx`: Relies on `canvas`, `requestAnimationFrame`, and `setTimeout`.
- `Navbar.jsx`: Uses `IntersectionObserver` to track active sections.
- `Hero.jsx`, `Projects.jsx`: Use `useRef`, mouse tracking, and framer-motion.
- `InteractiveGraph.jsx`: Uses `ResizeObserver` and D3 for SVG manipulation.
- `Contact.jsx`: Manages form state and uses `fetch`.
- `GithubContributions.jsx`: Fetches data dynamically from GitHub on the client.

All other wrappers (like `SectionWrapper.jsx`, `Experience.jsx`, `Philosophy.jsx`) remain pure Server Components, contributing exactly 0 bytes to the client-side JS bundle.

## How to Add New Sections
1. Create your component folder in `src/sections/` (e.g., `src/sections/Testimonials/Testimonials.jsx`).
2. Add a `.module.css` file for styling.
3. Import and render the component inside `app/page.jsx`.
4. If the section contains any `useState`, `useEffect`, or DOM events (like `onClick`), add `'use client';` to the very top of its `.jsx` file.

## SEO Automation
- **Sitemap**: Generated automatically by `app/sitemap.js` during the build process, outputting `out/sitemap.xml`.
- **Robots.txt**: Generated automatically by `app/robots.js`, explicitly pointing to the sitemap.
- **Metadata**: Defined in `app/layout.jsx` via the `metadata` export. This automatically injects `og:image`, `twitter:card`, and title/description tags into the `<head>`.
