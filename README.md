# Alba - Astro Theme for UI/UX and Product Designers

[![Astro 6](https://img.shields.io/badge/Astro-6-FF5D01?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build/)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Configured-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-84cc16?style=for-the-badge)](./LICENSE)

**Preview:** [alba-mocha-iota.vercel.app](https://alba-mocha-iota.vercel.app/)

Alba is a clean Astro portfolio theme for UI/UX designers, product designers, and visual product thinkers.

It includes:

- a polished portfolio homepage
- a dedicated Works page with pagination
- a sample case study page
- About and Resume pages
- self-hosted tool logos on the Resume page
- Privacy, Terms, and 404 pages
- shared header/footer/navigation
- Astro-optimized responsive portfolio images
- MDX support
- sitemap generation
- Open Graph and Twitter meta tags
- structured data defaults
- Netlify and Vercel config

## Tech Stack

- Astro 6
- Tailwind CSS 4 via Vite plugin
- MDX
- `@fontsource-variable/manrope`

## Getting Started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Template Setup

The main template settings live in:

- [site.config.mjs](./site.config.mjs)

Update this file before publishing:

- `siteUrl`
- `name`
- `title`
- `description`
- `email`
- `authorName`
- `authorRole`
- social links

## SEO

The template includes:

- canonical URLs
- meta descriptions
- keyword meta
- Open Graph tags
- Twitter card tags
- sitemap generation
- dynamic `robots.txt`
- JSON-LD structured data defaults
- `noindex` handling for the 404 page

Main SEO files:

- [src/layouts/Layout.astro](./src/layouts/Layout.astro)
- [astro.config.mjs](./astro.config.mjs)
- [src/pages/robots.txt.ts](./src/pages/robots.txt.ts)
- [public/og-image.svg](./public/og-image.svg)

## Content and Pages

Main pages:

- `/`
- `/about`
- `/resume`
- `/work`
- `/work/nextpoint`
- `/privacy`
- `/terms`
- `/404`

## Images and Assets

Portfolio images live in:

- [src/assets/images](./src/assets/images)

Tool logos live in:

- [src/assets/logos](./src/assets/logos)

Notes:

- Portfolio and case study screenshots use Astro's image pipeline for responsive optimized output.
- Tool logos are self-hosted SVGs.
- `public/` is reserved for files that should be served as-is, such as favicons and the Open Graph image.

There is also a starter MDX content example in:

- [src/content/pages/getting-started.mdx](./src/content/pages/getting-started.mdx)

## Deployment

Included config:

- [netlify.toml](./netlify.toml)
- [vercel.json](./vercel.json)

## License

This project is licensed under the [MIT License](./LICENSE).

## Notes

- Replace the example project copy and images with your own work.
- Replace `https://your-domain.com` in [site.config.mjs](./site.config.mjs) before deploying.
- The social share image is a template default and can be replaced with your own branded preview.
