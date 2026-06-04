# Portfolio — Gentle AI project supplement

> ⚠️ This file is a Pi/Gentle AI supplement. Canonical docs: `README.md` (humans) and `AGENTS.md` (AI agents).
> This file exists only for Pi harness automation (work routing, review budget, etc.).

## Project identity

- **Name**: portfolio
- **Primary language**: TypeScript, Astro
- **Framework**: Astro 5 (static)
- **Test command**: none (portfolio site)
- **Lint/check**: `npx astro check`

## Read contract

Before any Pi subagent reads project files, it must read:
1. `README.md` — project overview and conventions
2. `src/content/config.ts` — content schemas
3. `src/styles/global.css` — theme variables

## Write contract

- Content changes → edit `src/content/*.md`
- Style changes → edit `src/styles/global.css` or Tailwind classes
- Structural changes → edit `.astro` components in `src/components/`
- Interactive features → edit React islands in `src/components/ui/`

## Skill resolution

See `.atl/skill-registry.md` for skill-to-trigger mapping.
