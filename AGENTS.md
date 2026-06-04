# Portfolio — AI Agent Context

## Stack
- **Framework**: Astro 5 (static site generation, output: `static`)
- **CSS**: Tailwind CSS 4 via `@tailwindcss/vite` Vite plugin — NOT `@astrojs/tailwind` (v6 only supports Tailwind 3)
- **Interactive islands**: React 19 — only 2 components: `ThemeToggle.tsx`, `ContactForm.tsx`
- **Content**: Astro Content Collections (markdown + Zod schemas in `src/content/config.ts`)
- **Package manager**: npm
- **Node**: >= 20

## File structure

```
src/
├── components/
│   ├── layout/     → Header, Footer (.astro)
│   ├── sections/   → Hero, Timeline, Projects, Contact (.astro)
│   └── ui/         → ThemeToggle.tsx, ContactForm.tsx (React islands)
├── content/
│   ├── config.ts            → Zod schemas for collections
│   ├── education/*.md       → Academic background
│   ├── experience/*.md      → Work experience
│   └── projects/*.md        → Project portfolio
├── layouts/
│   └── MainLayout.astro     → Base HTML shell, dark mode init script
├── pages/
│   └── index.astro          → Single-page entry point
├── styles/
│   └── global.css           → Tailwind import + CSS custom properties for theming
└── utils/
    └── cn.ts                → Classname helper (if needed)
```

## Commands

```bash
npm install        # Install dependencies
npm run dev        # Dev server at http://localhost:4321
npm run build      # astro check + astro build → dist/
npm run preview    # Preview built output
```

## Architecture decisions

### Tailwind 4 via Vite plugin
`@astrojs/tailwind` v6 only supports Tailwind 3. We use `@tailwindcss/vite` directly in `astro.config.mjs`. The CSS entry point is `src/styles/global.css` with `@import "tailwindcss"`. This file MUST be imported in `MainLayout.astro` for Tailwind to generate.

### Dark mode with CSS custom properties
Instead of Tailwind's `dark:` variant, we use CSS custom properties defined in `@theme` and toggled via `data-theme` attribute:

```css
:root { --color-surface: #ffffff; ... }
[data-theme="dark"] { --color-surface: #0f172a; ... }
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { ... } }
```

Components reference colors as `bg-[var(--color-surface)]`, `text-[var(--color-text)]`, etc.

### Anti-FOUC (flash of unstyled content)
An inline `<script is:inline>` in `MainLayout.astro` runs before first paint:
1. Reads `localStorage` for stored theme preference
2. Falls back to `prefers-color-scheme`
3. Sets `data-theme` attribute
4. Removes `visibility: hidden` that was blocking render

### React event types (React 19 deprecation)
React 19 deprecated `FormEvent`, `FormEventHandler`, and other event type imports. The fix: **inline the handler in JSX** so TypeScript infers the types automatically. Do NOT import event types from React.

```tsx
// ✅ Correct (React 19)
<form onSubmit={async (e) => { e.preventDefault(); ... }}>

// ❌ Wrong (deprecated types)
import { FormEvent } from "react";
const handleSubmit = (e: FormEvent<HTMLFormElement>) => { ... };
```

### Timeline component reuse
Both "Formación" and "Experiencia" sections use the same `Timeline.astro` component with different props (id, title, icon, items). Items come from content collections.

### Content collections
Each collection has a Zod schema in `src/content/config.ts`. To add/edit content, modify the `.md` files in `src/content/<collection>/`. Frontmatter is validated at build time.

## What to change for personalization

| What | Where |
|---|---|
| Name, tagline, role | `Hero.astro` frontmatter |
| Social links (GitHub, LinkedIn, CV) | `Hero.astro` links array |
| Avatar | `Hero.astro` — replace placeholder `<div>` with `<Image>` |
| Contact info (email, location) | `Contact.astro` |
| Form endpoint | `ContactForm.tsx` — replace Formspree URL |
| Education entries | `src/content/education/*.md` |
| Experience entries | `src/content/experience/*.md` |
| Project entries | `src/content/projects/*.md` |
| Colors / theme | `src/styles/global.css` `@theme` block |

## Current status
- ✅ Build passing (0 errors, 0 warnings, 0 hints)
- ✅ Dark/light mode with system preference + toggle
- ✅ All 5 sections rendered with sample data
- ⬜ Replace sample content with real data
- ⬜ Configure real contact form endpoint
- ⬜ Add real avatar and project screenshots
- ⬜ Deploy (Vercel / Cloudflare Pages)
