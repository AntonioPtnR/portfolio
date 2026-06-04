# Proposal: Lovable Redesign

## Intent

Apply the premium Lovable visual direction to the existing Astro portfolio without changing its static Astro 5 + Tailwind 4 + React 19 architecture. The change upgrades perception, content structure, and interaction quality while keeping build stability and current stack constraints.

## Scope

### In Scope
- Replace the visual shell: palette, spacing, 1280px layout, sticky blurred navbar, subtle grid background, footer refresh.
- Rebuild key sections: Hero, new About, alternating Education/Experience timelines, filtered Portfolio grid, revised Contact.
- Add subtle motion and accessibility hardening: focus states, skip link, AA contrast audit, reduced-motion support.
- Extend content models only where required: project category, extra education entries/metadata, refreshed sample content.

### Out of Scope
- New dependencies, CMS, backend, routing changes, or migration away from Astro content collections.
- Form provider replacement beyond styling/current endpoint wiring.
- Deployment, analytics, localisation, or SEO expansion beyond incidental metadata touch-ups.

## Capabilities

### New Capabilities
- `portfolio-premium-shell`: premium layout, theme tokens, navbar, footer, motion, and accessibility shell.
- `portfolio-premium-sections`: redesigned Hero/About/Timeline/Projects/Contact presentation, including terminal card and project filters.

### Modified Capabilities
- None.

## Approach

Deliver foundation-first. First land design tokens, layout, navbar/footer, animation utilities, and accessibility safeguards. Then ship section slices with content-model updates where needed. Use vanilla Astro/CSS/JS patterns; keep React islands limited to `ThemeToggle.tsx` and `ContactForm.tsx`.

## Affected Areas

| Area | Impact | Est. delta |
|------|--------|------------|
| `src/styles/global.css`, `src/layouts/MainLayout.astro` | Modified | 140-190 |
| `src/components/layout/Header.astro`, `Footer.astro` | Modified | 40-70 |
| `src/components/sections/Hero.astro`, `src/components/ui/TerminalCard.astro` | Modified/New | 120-170 |
| `src/components/sections/About.astro`, `src/pages/index.astro` | New/Modified | 80-120 |
| `src/components/sections/Timeline.astro`, `src/content/education/*.md`, `src/content/experience/*.md` | Modified/New | 110-160 |
| `src/components/sections/Projects.astro`, `src/content/projects/*.md`, `src/content/config.ts` | Modified | 110-150 |
| `src/components/sections/Contact.astro`, `src/components/ui/ContactForm.tsx`, `ThemeToggle.tsx` | Modified | 60-100 |

Estimated total review footprint: **660-960 changed lines**. **400-line budget risk: High**. Chained PRs recommended.

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Primary blue fails AA for small dark-mode text | High | Reserve blue for large/decorative text; keep body copy on white/slate tokens |
| 96px hero heading breaks on small screens | Medium | Use responsive clamps and mobile-specific scale-down |
| Alternating timeline CSS becomes brittle | Medium | Build desktop alternation with mobile single-column fallback |
| Sample data mismatches target personal brand | High | Refresh content early; treat assets/CV/avatar as prerequisites |

## Rollback Plan

Ship in reviewable slices: shell, Hero/About, timelines, projects, contact/content. Any slice can be reverted independently without undoing the whole redesign. If accessibility or responsiveness regresses, keep the new tokens and revert only the affected section/component files.

## Dependencies

- No new packages.
- User-provided CV, avatar, project screenshots, and final real content are required for complete fidelity.

## Success Criteria

- [ ] Portfolio matches the approved premium layout and palette in both themes.
- [ ] Navigation, filters, forms, and theme toggle remain keyboard-accessible and AA-compliant.
- [ ] `npm run build` passes with no new dependencies.
- [ ] Delivery plan is split into slices that stay near or below the 400-line review budget where practical.
