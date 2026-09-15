# Tasks: Lovable Redesign

## Review Workload Forecast

| Field | Value |
|---|---|
| Estimated changed lines | 720-980 |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | Shell → Hero/About → Timeline/Portfolio → Contact/content |
| Delivery strategy | exception-ok |
| Chain strategy | size-exception |

Decision needed before apply: No
Chained PRs recommended: Yes
Chain strategy: size-exception
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|---|---|---|---|
| 1 | Foundation shell + nav/footer | PR 1 | Best rollback boundary |
| 2 | Hero + About | PR 2 | Depends on Unit 1 |
| 3 | Timeline + Portfolio | PR 3 | Depends on Unit 1 |
| 4 | Contact + content finalisation | PR 4 | Depends on Units 1-3 |

## Phase 1: Foundation

| ID | Reqs | Files | Outcome / Verify | Size | Depends |
|---|---|---|---|---|---|
| [x] T-001 | PAL-001, LAY-001 | `src/styles/global.css`, `src/layouts/MainLayout.astro` | Add semantic tokens, `.site-shell`, decorative grid, skip link, focus styles, anti-FOUC-safe dark default. Verify first paint stays dark and shell caps at 1280px. | L | — |
| [x] T-002 | ANI-001, ACC-001 | `src/styles/global.css`, `src/pages/index.astro` | Add fade/hover/reduced-motion utilities and smooth-scroll offset that respects sticky header. Verify reduced-motion removes non-essential animation and anchor targets stay visible. | M | T-001 |

## Phase 2: Navbar + Footer

| ID | Reqs | Files | Outcome / Verify | Size | Depends |
|---|---|---|---|---|---|
| [x] T-003 | NAV-001, FOO-001, ACC-001 | `src/components/layout/Header.astro`, `src/components/layout/Footer.astro`, `src/components/ui/ThemeToggle.tsx` | Build 72px sticky blurred nav with mobile disclosure, active-link observer, theme toggle styling, CV CTA, and minimal footer. Verify keyboard flow, `aria-expanded`, sticky behaviour, and footer contrast. | L | T-001, T-002 |

## Phase 3: Hero

| ID | Reqs | Files | Outcome / Verify | Size | Depends |
|---|---|---|---|---|---|
| [x] T-004 | HER-001, ANI-001 | `src/components/sections/Hero.astro`, `src/components/ui/TerminalCard.astro` | Create two-column hero, responsive clamp heading, CTA/badge layout, and static terminal card with no mobile overflow. Verify 360px and desktop layouts plus hover/entry motion. | L | T-001, T-002, T-003 |

## Phase 4: About

| ID | Reqs | Files | Outcome / Verify | Size | Depends |
|---|---|---|---|---|---|
| [x] T-005 | ABO-001 | `src/components/sections/About.astro`, `src/pages/index.astro` | Add About section with avatar frame, profile copy, and four responsive metric cards wired into page order. Verify card reflow at mobile/tablet widths and correct section anchor. | M | T-001, T-003 |

## Phase 5: Timeline

| ID | Reqs | Files | Outcome / Verify | Size | Depends |
|---|---|---|---|---|---|
| [x] T-006 | EDU-001, EXP-001, ANI-001 | `src/components/sections/Timeline.astro`, `src/pages/index.astro` | Extend reusable timeline with alternating/stacked variants, left-rail mobile fallback, and readable badge treatment. Verify education alternation on desktop and single-column order on mobile. | L | T-001, T-002 |
| [x] T-007 | EDU-001, EXP-001 | `src/content/config.ts`, `src/content/education/*.md`, `src/content/experience/*.md` | Add schema metadata needed by timelines and refresh education/experience entries with consistent chronology and tech tags. Verify `npm run build` catches no schema/frontmatter errors. | M | T-006 |

## Phase 6: Portfolio

| ID | Reqs | Files | Outcome / Verify | Size | Depends |
|---|---|---|---|---|---|
| [x] T-008 | POR-001, ACC-001, ANI-001 | `src/components/sections/Projects.astro`, `src/pages/index.astro` | Build 3-column premium card grid, inline vanilla filters, active pressed states, and hover lift/shadow treatment. Verify each filter shows only matching cards and remains keyboard operable. | L | T-001, T-002 |
| [x] T-009 | POR-001 | `src/content/config.ts`, `src/content/projects/*.md` | Extend project schema with category/image metadata and update entries to cover Todos/Frontend/Backend/Full Stack/DevOps filtering. Verify categories derive correctly and build passes. | M | T-008 |

## Phase 7: Contact

| ID | Reqs | Files | Outcome / Verify | Size | Depends |
|---|---|---|---|---|---|
| [x] T-010 | CON-001, ACC-001 | `src/components/sections/Contact.astro`, `src/components/ui/ContactForm.tsx` | Restyle contact into two columns, keep form logic unchanged, preserve React 19 inferred event typing, and improve labelled field states. Verify mobile reading order, form usability, and visible focus on all controls. | M | T-001, T-002, T-003 |

---

## Completion Summary

**Status**: ✅ ALL 10 TASKS COMPLETE
**Final build**: `npm run build` — 0 errors, 0 warnings, 0 hints
**Completed**: 2026-06-03
**Mode**: Standard (strict_tdd: false)
**Delivery**: exception-ok (size-exception)
