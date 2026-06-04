# Design: Lovable Redesign

## Technical Approach

Implement the Lovable redesign as a static Astro refresh: tokens and shell first, then sections, with React kept only for `ThemeToggle.tsx` and `ContactForm.tsx`. Project filtering and nav highlighting use small inline vanilla scripts, avoiding dependencies and preserving Astro 5 SSG, Tailwind 4, content collections, and the existing anti-FOUC pattern.

## Architecture Decisions

| Decision | Choice | Alternatives rejected | Rationale |
|---|---|---|---|
| File structure | Add `About.astro`, `TerminalCard.astro`, optional `AvatarFrame.astro`; modify existing shell/sections/content. No deletes. | Rewrite as React page; add component library. | Keeps islands minimal and follows current Astro component pattern. |
| Tokens/theme | Define semantic CSS variables in `@theme` plus `[data-theme]` overrides: `--color-bg`, `surface`, `surface-muted`, `text`, `muted`, `primary`, `border`, `ring`. | Tailwind `dark:` classes; hard-coded hexes. | Existing project already uses `data-theme`; semantic tokens make contrast and theme changes central. |
| Layout | Use `.site-shell` utility: `mx-auto w-full max-w-[1280px] px-6 sm:px-8 lg:px-10`; body grid background via pseudo/gradient utilities. | Per-section max-widths; background images. | One shell enforces premium alignment and avoids assets. |
| Navbar | `Header.astro` remains sticky 72px with `backdrop-blur`, CV CTA, mobile disclosure button, and JS IntersectionObserver active links. | React nav island; CSS-only active state. | JS is enough for active state; React would add unnecessary hydration. |
| Hero | `Hero.astro` two-column grid and new `TerminalCard.astro` (420×320 desktop, full-width mobile). Heading uses `clamp(3rem,8vw,6rem)`. | Real terminal runtime; fixed 96px everywhere. | Static card is accessible and build-safe; clamp prevents mobile overflow. |
| About | New `About.astro` with avatar frame and static metric cards. | New content collection. | About data is low-volume page copy, so component frontmatter is simpler until real CMS needs appear. |
| Timeline | One reusable `Timeline.astro` with `variant="alternating" | "stacked"`; desktop CSS alternates cards using index parity, mobile collapses to left rail. Tech badges render from `tags`. | Separate education/experience components. | Reuse preserves current data flow and reduces duplicated timeline CSS. |
| Portfolio filters | Static cards with `data-category`; inline script toggles hidden/filter classes and `aria-pressed`. Categories derive from content. | React island; server routes. | Client-side vanilla filtering is tiny and enough for single-page SSG. |
| Motion | CSS `@keyframes fadeUp`, `.animate-fade-up`, stagger via inline `style="--delay"`, hover transforms. | Framer Motion. | Meets visual goal without dependencies; supports reduced motion centrally. |

## Data Flow

```text
src/pages/index.astro
  ├─ getCollection(education) ──→ Timeline(items, variant)
  ├─ getCollection(experience) ─→ Timeline(items with tags)
  ├─ getCollection(projects) ───→ Projects(cards + categories)
  └─ static section props ──────→ Hero/About/Contact
```

## File Changes

| File | Action | Description |
|---|---|---|
| `src/styles/global.css` | Modify | Palette, shell utilities, grid background, focus ring, motion, reduced-motion. |
| `src/layouts/MainLayout.astro` | Modify | Skip link, body background, anti-FOUC retained. |
| `src/components/layout/Header.astro` | Modify | 72px navbar, mobile hamburger, active highlighting script, CV button. |
| `src/components/layout/Footer.astro` | Modify | Minimal premium footer. |
| `src/components/sections/Hero.astro` | Modify | Two-column hero, badges, CTAs, terminal card import. |
| `src/components/ui/TerminalCard.astro` | Create | Static terminal/glow visual. |
| `src/components/sections/About.astro` | Create | Avatar/metrics section. |
| `src/components/sections/Timeline.astro` | Modify | Alternating desktop timeline, mobile fallback, badges. |
| `src/components/sections/Projects.astro` | Modify | Filter controls, 3-col cards, hover states. |
| `src/components/sections/Contact.astro` | Modify | Two-column contact info/form. |
| `src/components/ui/ContactForm.tsx` | Modify | Premium fields/buttons; keep inferred React 19 event types. |
| `src/components/ui/ThemeToggle.tsx` | Modify | Styling only; keep storage/system behaviour. |
| `src/pages/index.astro` | Modify | Add About, map categories/images, smooth scroll offset. |
| `src/content/config.ts` | Modify | Add `category`, optional `imageAlt`, optional education/experience metadata. |
| `src/content/**/*.md` | Modify/Add | Real/sample entries for metrics, tech, categories, screenshots where available. |

## Interfaces / Contracts

```ts
type TimelineItem = { title: string; subtitle: string; period: string; description?: string; highlights?: string[]; tags?: string[] };
type Project = { title: string; description: string; tech: string[]; category: string; image?: string; imageAlt?: string; demoUrl?: string; repoUrl?: string; featured: boolean };
```

## Accessibility and Anti-FOUC

Add a skip link targeting `main`, visible `:focus-visible` rings, `aria-expanded`/`aria-controls` on mobile nav, `aria-pressed` on filters, labelled form controls, and AA contrast checks against both palettes. Use `@media (prefers-reduced-motion: reduce)` to disable animation/scroll behaviour. Keep `html.scripting-enabled`, inline theme script, `data-theme`, and `theme-ready`; only extend tokens, not the boot sequence.

## Testing Strategy

| Layer | What to Test | Approach |
|---|---|---|
| Static/type | Content schema, Astro/React types, build output | `npm run build` |
| Manual responsive | 360/768/1024/1280 layouts, menu, filters, theme toggle | Browser check |
| Accessibility | Keyboard nav, focus order, reduced motion, contrast | Manual audit + browser devtools |

## Migration / Rollout

No data migration required. Markdown frontmatter updates are build-validated. Delivery strategy is exception-ok, but implementation should still land foundation before section changes for rollback clarity.

## Open Questions

- [ ] Final avatar, CV path, contact endpoint, and real project screenshots are still content prerequisites, not design blockers.
