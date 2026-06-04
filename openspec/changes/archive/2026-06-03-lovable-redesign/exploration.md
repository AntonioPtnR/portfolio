# Exploration: lovable-redesign — Portfolio Codebase vs Lovable Spec

## Current State

Astro 5 static site with single-page layout (`src/pages/index.astro`) comprising 5 sections: Hero, Timeline (Formación), Timeline (Experiencia), Projects, Contact. Stack: Tailwind CSS 4 via `@tailwindcss/vite`, React 19 islands (ThemeToggle, ContactForm), Astro Content Collections (3 collections: education, experience, projects) with Zod schemas. Theming via CSS custom properties + `data-theme` attribute + anti-FOUC inline script. No test runner, no animation library, no grid background. Build passing (0 errors/warnings).

## Affected Areas

Every source file except `tsconfig.json`, `astro.config.mjs`, and `package.json` is affected to some degree. The scale ranges from palette value tweaks in `global.css` to full rewrites of `Hero.astro` and net-new component creation (`About.astro`).

| File | Impact | Effort |
|---|---|---|
| `src/styles/global.css` | Palette overhaul, new CSS vars, glow keyframes, grid bg, focus styles, animations, reduced-motion | High |
| `src/components/layout/Header.astro` | Height 56→72px, logo rewrite, new "Sobre Mí" link, CV button | Medium |
| `src/components/sections/Hero.astro` | Full rewrite: 2-col layout, 96px name, glow, terminal card, tech badges | High |
| `src/components/sections/About.astro` | **NEW** — avatar, bio, 4 metric cards, 2-col layout | Medium |
| `src/components/sections/Timeline.astro` | Extend for alternating L/R cards (current: right-only), enhance card styling | Medium |
| `src/components/sections/Projects.astro` | Add filter bar (Todos/Frontend/Backend/Full Stack/DevOps), hover animations, image placeholders | High |
| `src/components/sections/Contact.astro` | Swap column order, update copy, add description | Low |
| `src/components/ui/ThemeToggle.tsx` | Minor visual refresh (optional) | Low |
| `src/components/ui/ContactForm.tsx` | Minor style refresh, Formspree endpoint update | Low |
| `src/components/layout/Footer.astro` | Text update | Trivial |
| `src/layouts/MainLayout.astro` | Grid bg, skip-to-content link, meta update, max-w-7xl wrapper | Medium |
| `src/pages/index.astro` | Add About section import, smooth scroll update, possibly new data fetching | Medium |
| `src/content/config.ts` | Extend project schema (+category), extend education schema (+tags/credential) | Low |
| `src/content/education/*.md` | Add 2 entries (AWS Certified, Cloud Architect), update existing dates | Low |
| `src/content/experience/*.md` | Update with real data, add Java/Spring/Angular entries | Low |
| `src/content/projects/*.md` | Add category field, add more projects | Low |
| `src/components/ui/TerminalCard.astro` | **NEW** — terminal-style card for Hero right column | Medium |

---

## Gap Analysis by Category

### 1. PALETTE (global.css)

| What Spec Says | Current Reality | Gap | Action |
|---|---|---|---|
| Dark bg primary: #050A14 | Dark surface: #0F172A | 4 tones too light | Change `--color-surface` in dark mode to `#050A14` |
| Dark bg secondary: #0F172A | Dark surface-alt: #1E293B | Current "alt" is lighter than target secondary | Change `--color-surface-alt` in dark to `#0F172A` |
| Dark text primary: #FFFFFF | Dark text: #F1F5F9 | Minor difference (~4% luminance) | Change to `#FFFFFF` |
| Dark text secondary: #CBD5E1 | Dark text-secondary: #94A3B8 | Current maps to spec tertiary, not secondary | Add `--color-text-tertiary: #94A3B8`, set secondary to `#CBD5E1` |
| Dark borders: rgba(148,163,184,0.15) | Dark border: #334155 (solid) | Current is much more opaque, solid | Change to `rgba(148,163,184,0.15)` |
| Light bg: #F8FAFC | Light surface-alt: #F8FAFC | Current alt is same color — swap roles | `--color-surface: #F8FAFC`, `--color-surface-alt: #FFFFFF` in light |
| Primary color: #3B82F6 dark, #2563EB light | Primary-500: #3B82F6 (both modes) | Same dark value, light needs adjustment | Change primary-500 in light mode to #2563EB |
| Card background (light): #FFFFFF | Not explicitly defined | Missing var | Add `--color-card` var |

**Risk**: Changing dark bg from #0F172A to #050A14 dramatically darkens the page. All existing color combos need contrast re-audit. The `text-muted` (#94A3B8) on #050A14 is ~5.13:1 — passes AA. Text-secondary (#CBD5E1) on #050A14 is ~12.55:1 — excellent.

### 2. LAYOUT (MainLayout.astro + all sections)

| Gap | Action |
|---|---|
| Max width 1024px vs spec 1280px | Change all `max-w-5xl` to `max-w-7xl`, `max-w-3xl` to `max-w-4xl` or `max-w-5xl` |
| No grid background | Add CSS grid pattern (2px dots at 40px intervals, opacity ~0.04 dark / ~0.06 light) via `::before` pseudo-element on body or via a fixed overlay div |
| Section spacing | Current `py-20 sm:py-28` is adequate; spec says "ample spacing" — keep as-is |

**Grid background implementation**: Pure CSS, no images. A radial-gradient or repeating-linear-gradient pattern applied to a fixed overlay element with `pointer-events: none`.

**Risk**: Low. Straightforward spacing adjustments.

### 3. NAVBAR (Header.astro)

| Gap | Action |
|---|---|
| Height: ~56px → 72px | Change `py-4` to `py-5` (h-18 = 72px). Ensure content is vertically centered. |
| Logo: "Antonio." → "</> Antonio" | Update text. The `</>` should be in primary-500 color, "Antonio" in text color. |
| Missing "Sobre Mí" nav link | Add `<a href="#sobre-mi">Sobre Mí</a>` between logo and Formación. 5 links total. |
| Missing CV download button | Add button to right side: outline style, "Descargar CV" text, download icon. Should open CV PDF. |
| Blur/transparency | Already has `backdrop-blur-md bg-[var(--color-surface)]/80` — keep. |

**Header.astro needs moderate rework**: 4 changes, none complex.

### 4. HERO (Hero.astro — NEAR TOTAL REWRITE)

| Gap | Action |
|---|---|
| Single column → 2 columns (desktop) | `grid lg:grid-cols-2 gap-12 items-center` |
| Label "Desarrollador Full-Stack" → "HOLA, SOY" blue | Change text, keep uppercase/tracking style, add primary-500 color |
| Name: "Hola, soy Antonio" 3-5xl → "Antonio" 96px weight 900 + blue glow | Custom `text-[96px] font-black leading-none`, CSS `text-shadow: 0 0 40px rgba(59,130,246,0.3)` or `filter: drop-shadow(...)` for glow |
| Subtitle: "Ingeniero de Software" split-color | `<span class="text-[var(--color-text)]">Ingeniero de</span> <span class="text-primary-500">Software</span>` |
| CTA: [Ver Proyectos] [Contactar] buttons (not social links) | Two solid/outline buttons. Remove GitHub/LinkedIn/CV links from here (move to About or Contact). |
| Tech badges: Java, Spring Boot, Angular, React, Docker, AWS | Row of pill badges below description. Hardcoded in Hero.astro (these are personal brand, not CMS-driven). |
| Terminal card (right column): **ENTIRELY MISSING** | New component or inline markup. 420×320px, border `rgba(59,130,246,0.25)`, bg `#0F172A`, blue glow shadow. Content: ">" prompt lines. Needs monospace font. |

**Terminal card design**:
```
┌─────────────────────────────────┐
│ $ whoami                        │
│ Antonio                         │
│ Software Engineer               │
│ Backend • Frontend • Cloud      │
│ Arquitectura • DevOps           │
│                                 │
│ Skills:                         │
│  ✓ 5+ years experience          │
│  ✓ +20 projects delivered       │
│  ✓ Architecture specialist      │
│  ✓ Continuous learning          │
│                                 │
│ $ ▋                             │
└─────────────────────────────────┘
```

**File**: Create `src/components/ui/TerminalCard.astro` — pure Astro, no React needed. Uses `font-mono` (JetBrains Mono or system mono). The blinking cursor can be CSS `@keyframes blink`.

**Risk**: Medium. The 96px name needs responsive scaling (mobile: 48-56px). The glow effect needs cross-browser testing. Terminal card height is fixed (420×320) but content must fit.

### 5. ABOUT / SOBRE MÍ — ENTIRELY NEW SECTION

| What needs creating | Details |
|---|---|
| `src/components/sections/About.astro` | New file. 2-column layout: left=avatar, right=content |
| Avatar | Circular `<img>` (or placeholder) with `border-4 border-primary-500`. Green dot indicator (absolute positioned, `bg-green-500`, `rounded-full`, 12×12px, bottom-right). Size: ~160px. |
| Title | `<h2>Sobre Mí</h2>` matching section title style |
| Description | 2-3 paragraphs about Antonio. Hardcoded or from a markdown content collection. |
| Metric cards | 4 cards in a 2×2 grid or flex row. Each: large number (5+) + small label (Años de experiencia). Style: subtle card bg, primary-500 numbers. |

**Schema decision**: Should About content be hardcoded or a content collection? Hardcoded is simpler (single-portfolio site, one person). No CMS needed for this section. Just edit the .astro file.

**Files**:
- `src/components/sections/About.astro` — NEW
- `src/pages/index.astro` — add `<About />` after Hero, before education Timeline
- `Header.astro` — add `#sobre-mi` nav link

**Risk**: Low. Standard 2-col layout, no complex logic.

### 6. EDUCATION (Timeline + Content)

| Gap | Action |
|---|---|
| Alternating L/R cards | Modify `Timeline.astro` to support an `alternate` prop. Even items float left, odd float right. Requires grid-based or flex-based alternating layout with a centered line. |
| 2 entries → 4 entries | Create `src/content/education/aws-certified.md` and `src/content/education/cloud-architect.md`. Update dates on existing entries (2020 for Grado, 2022 for Máster). |
| Schema: add `tags` field | Optionally extend education schema in `config.ts` to include `tags: z.array(z.string()).default([])` for tech/cert badges. |

**Timeline alternation complexity**: Current implementation is a simple left-border line with absolute-positioned dots. Alternating would require:
- Even cards: padding-left → padding-right, text-align: right, dot on right
- Odd cards: keep current (padding-left, dot on left)
- Both sides share the same center line

Alternative: keep single-side timeline but style cards with a more premium look (glass effect, better typography). The spec says "vertical timeline with alternating cards" explicitly.

**Risk**: Medium. Alternating timeline increases CSS complexity significantly. Must work responsively (collapse to single-side on mobile).

### 7. EXPERIENCE (Timeline + Content)

Same timeline alternation concerns as Education. Current content is sample (TypeScript/React/Node.js) but Hero badges imply Java/Spring/Angular stack. Content must be updated with real experience.

| Gap | Action |
|---|---|
| Content mismatch | Rewrite experience .md files with real data matching Java/Spring/Angular stack |
| Schema already supports `highlights` and `tech` arrays | Keep schema as-is — well aligned with spec |
| Tech badge styling | Already implemented in Timeline.astro — minor color/style refresh |

**Risk**: Low. Schema is already adequate. Just content updates + alternating layout (shared with education).

### 8. PORTFOLIO / PROJECTS (Projects.astro)

| Gap | Action |
|---|---|
| No filter buttons | Add filter bar above grid: "Todos", "Frontend", "Backend", "Full Stack", "DevOps". Active state = primary-500 bg. |
| Filter logic | Client-side: vanilla JS `data-category` attributes + `display:none/block` toggle. Or a lightweight React island. Vanilla JS preferred (no new deps). |
| Hover effects | `hover:-translate-y-1.5` (6px), enhanced shadow, blue border `hover:border-primary-500/30`, transition 300ms |
| Image mockups | Replace folder emoji with colored gradient placeholders or actual screenshots. Gradient placeholder: `bg-gradient-to-br from-primary-500/20 to-primary-800/20` with project initials. |
| Schema: add `category` | `category: z.enum(["frontend", "backend", "fullstack", "devops"]).default("fullstack")` |

**Filter implementation**: All projects render to DOM, filtered via CSS class toggling. For 3-10 projects, this is simpler than React state management. Use a `<script>` tag in Projects.astro:

```js
document.querySelectorAll('[data-filter]').forEach(btn => {
  btn.addEventListener('click', () => {
    const cat = btn.dataset.filter;
    document.querySelectorAll('[data-category]').forEach(card => {
      card.style.display = (cat === 'all' || card.dataset.category === cat) ? '' : 'none';
    });
    // Update active button styles
  });
});
```

**Risk**: Medium. Filter logic is simple but needs proper animation (fade out/in). Hover effects need careful `transform` coordination to avoid layout shift.

### 9. CONTACT (Contact.astro)

| Gap | Action |
|---|---|
| Column order: form left, info right → Swap | Move `ContactForm` to right column (lg:col-span-3), info to left (lg:col-span-2) |
| Title: "Contacta conmigo" → "¿Tienes un proyecto en mente?" | Update h2 text |
| Missing description text | Add `<p>` with description of how Antonio works with clients. Hardcoded. |
| Location: "Madrid, España" → "Murcia, España" | Text change |
| Social links: GitHub, LinkedIn, email | Already present — keep, maybe refresh styling |

**Risk**: Low. Mostly copy changes and column swapping.

### 10. FOOTER (Footer.astro)

| Gap | Action |
|---|---|
| "Construido con Astro & Tailwind CSS" → adapt | Change to something like "Hecho con Astro & Tailwind CSS" or keep as-is but more minimal per spec. Spec says "Built with Angular & Spring Boot" but that doesn't match this project — should reflect actual tech. |
| Current footer is already minimal | Minor text update only |

**Risk**: Trivial.

### 11. ANIMATIONS

Current state: NO entry/reveal animations. No scroll-triggered animations. Only `transition-colors` on hover and smooth scroll.

Spec says: "Framer Motion style - fadeUp 300ms, stagger 100ms, hover cards scale(1.02), transitions 200-300ms, very subtle."

| Gap | Action |
|---|---|
| Fade-up entry animations | CSS keyframes: `@keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }`. Apply via class `.animate-fade-up`. |
| Stagger 100ms | CSS `animation-delay: calc(var(--stagger-index) * 100ms)` on children. Set `--stagger-index` via inline style or a small JS loop. |
| Scroll-triggered reveal | Intersection Observer in a small vanilla JS script: add `.animate-fade-up` class when element enters viewport. Or use CSS `animation-timeline: view()` (limited browser support — Chrome/Edge only as of 2026). Intersection Observer is safer. |
| Hover card scale | `hover:scale-[1.02]` with `transition-transform duration-300` |
| Reduced motion | Wrap all animations in `@media (prefers-reduced-motion: no-preference)` |

**Implementation approach**: No external library. Vanilla JS Intersection Observer (deferred in `<script>` in MainLayout or index.astro) + CSS keyframes. This avoids adding `framer-motion` or any new dependency.

**Files**:
- `global.css` — keyframes, animation utility classes, reduced-motion query
- `MainLayout.astro` or `index.astro` — Intersection Observer script
- All section components — add animation classes

**Risk**: Low for CSS keyframes. Medium for Intersection Observer (needs proper cleanup, performance consideration for many elements).

### 12. ACCESSIBILITY

| Gap | Action |
|---|---|
| No global focus-visible style | Add `:focus-visible { outline: 2px solid var(--color-primary-500); outline-offset: 2px; }` in `global.css` |
| No skip-to-content link | Add `<a href="#main-content" class="sr-only focus:not-sr-only ...">Saltar al contenido</a>` as first child of `<body>` in `MainLayout.astro` |
| Contrast audit needed | Verify all text/background pairs. Dark mode text-secondary #CBD5E1 on #050A14 = ~12.55:1 (excellent). Text-tertiary #94A3B8 on #050A14 = ~5.13:1 (passes AA normal, borderline). Primary-500 #3B82F6 on #050A14 = ~4.63:1 (passes AA large text only — use for headings and large text only, not body copy). |
| No text below 70% opacity | Audit all opacity usages. Current `text-[var(--color-text-muted)]` is solid color, not opacity — good. Remove any `opacity-70` or similar from text elements. |
| Form labels properly associated | Already done (`htmlFor` + `id`) — keep. |
| Keyboard navigation | All interactive elements are natively focusable (links, buttons). Tab order follows DOM order — verify after layout changes. |
| `prefers-reduced-motion` | Must be respected for ALL animations. Critical. |

**Risk**: Low-Medium. Contrast for primary-500 on dark bg is borderline. Consider using primary-400 (#60a5fa) for body text on dark bg when primary color is needed, reserve #3B82F6 for large text/headings/decorative.

---

## Approaches

**1. Single monolithic PR** — All 12 categories in one change.
- Pros: Everything lands at once, no intermediate states.
- Cons: Massive diff (likely 800-1500 lines), impossible to review carefully, high merge conflict risk, violates review workload guard.

**2. Phased PRs by section** — Each section as a separate PR, starting with foundation (palette/layout).
- Pros: Reviewable chunks, each PR builds on previous, rollback is isolated.
- Cons: More overhead (multiple PRs), groundwork PR must land first.

**3. Foundation PR + Section PRs** — PR #1: Palette, Layout, Navbar, Footer, Animations, Accessibility (the "shell"). PR #2+: One section per PR (Hero, About, Timeline, Portfolio, Contact).
- Pros: Clear dependency chain. Shell provides the design system. Sections are independent after that. Best reviewability.
- Cons: 6+ PRs. Timeline spans both Education and Experience — might need to be one PR.

**Recommendation: Approach 3 — Foundation + Sections**. The shell PR establishes the visual language. Sections can be developed and reviewed independently. This aligns with the chained-PR pattern if needed.

---

## Risks

1. **Dark bg contrast (#050A14)**: Very dark background. Primary blue #3B82F6 on it is only 4.63:1 ratio — fails AA for normal text. Reserve primary blue for large text and decorative elements only. Use lighter blue (#60a5fa) for small text if blue is needed.

2. **96px hero name**: Extreme font size. Must test on mobile (< 400px viewport) to avoid overflow. Needs responsive scaling: ~48px mobile, 64px tablet, 96px desktop.

3. **Terminal card fixed size (420×320)**: On mobile, the 2-col layout collapses to single column. The terminal card might be too wide or tall. Needs `max-w-full` and potentially smaller variant on mobile.

4. **Alternating timeline complexity**: The CSS for alternating L/R cards with a centered line is non-trivial, especially with responsive collapse to single-side. Could take more effort than estimated.

5. **Grid background performance**: A fixed overlay with CSS gradients could impact scroll performance on low-end devices. Test with `will-change: transform` or use a simpler approach (static SVG background).

6. **No animation library**: Using vanilla JS Intersection Observer for scroll-triggered animations is reliable but adds custom JS maintenance burden. If animations become complex, consider `motion` (lightweight, ~5KB) or keep it CSS-only.

7. **Content data mismatch**: Current sample data (Node.js, Python, Go) doesn't match spec's implied stack (Java, Spring Boot, Angular). User must provide real content or approve keeping current stack in content.

---

## Implementation Order (Recommended)

| # | Phase | Files | Effort | Depends on |
|---|---|---|---|---|
| 1 | **Palette + Layout** | `global.css`, `MainLayout.astro` | Medium | None |
| 2 | **Navbar + Footer** | `Header.astro`, `Footer.astro` | Low-Medium | #1 |
| 3 | **Animations + Accessibility** | `global.css`, `MainLayout.astro` | Medium | #1 |
| 4 | **Hero** | `Hero.astro`, `TerminalCard.astro` (new) | High | #1, #3 |
| 5 | **About** | `About.astro` (new), `index.astro`, `Header.astro` | Medium | #1, #2 |
| 6 | **Timeline enhancement** | `Timeline.astro` | Medium | #1, #3 |
| 7 | **Content updates** | All `.md` files in content/, `config.ts` | Low | None (independent) |
| 8 | **Portfolio filters** | `Projects.astro`, `config.ts` | High | #1, #3 |
| 9 | **Contact restructure** | `Contact.astro`, `ContactForm.tsx` | Low | #1 |
| 10 | **Final polish** | All files | Low | All above |

Phases 1-3 form the **Foundation PR**. Phases 4-9 are **Section PRs** (one each). Phase 10 is a **Polish PR**.

---

## What Can Be Reused (Keep as-is or with minor edits)

| Component | File | Reuse level |
|---|---|---|
| ThemeToggle React island | `src/components/ui/ThemeToggle.tsx` | Keep, minor visual refresh |
| ContactForm React island | `src/components/ui/ContactForm.tsx` | Keep, style refresh + endpoint update |
| Anti-FOUC inline script | `MainLayout.astro` (lines 17-29) | Keep exactly |
| CSS custom property theming | `global.css` | Keep pattern, update values |
| Content Collections infrastructure | `config.ts`, content/*.md | Keep, extend schemas + content |
| Smooth scroll script | `index.astro` (lines 53-66) | Keep |
| Astro config | `astro.config.mjs` | No changes needed |
| Package dependencies | `package.json` | No new deps required (all achievable with current stack) |
| Tailwind 4 @theme approach | `global.css` | Keep, expand |

## What Needs Modification (Significant changes)

| File | Changes |
|---|---|
| `global.css` | New palette values, glow keyframes, grid bg, animation keyframes, focus-visible, reduced-motion, new CSS vars (card, tertiary text, border-alpha) |
| `Header.astro` | Height, logo, nav links, CV button |
| `Footer.astro` | Copyright text |
| `Hero.astro` | Full rewrite — 2-col layout, 96px name, terminal column, tech badges |
| `Timeline.astro` | Alternating card layout support |
| `Projects.astro` | Filter bar, hover animations, category support |
| `Contact.astro` | Swap columns, new copy, description |
| `MainLayout.astro` | Grid bg, skip-to-content, max-w-7xl |
| `index.astro` | Add About section, adjust content mapping |
| `config.ts` | Project category, education tags |
| All `.md` content files | Real data updates |

## What Needs Creation (Net new files)

| File | Purpose |
|---|---|
| `src/components/sections/About.astro` | Sobre Mí section with avatar + metrics |
| `src/components/ui/TerminalCard.astro` | Terminal-style card for Hero right column |
| `src/content/education/aws-certified.md` | AWS certification entry |
| `src/content/education/cloud-architect.md` | Cloud architecture specialization entry |
