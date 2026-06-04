# Skill Registry — portfolio

Last updated: 2026-06-04

## Contract

**Delegator use only.** Pasa rutas exactas de `SKILL.md` a los subagentes bajo `## Skills to load before work`.

## Project skills

| Skill | Trigger | Path |
|---|---|---|
| `i18n-translate` | Cambios en `src/content/*.md`, traducir contenido, actualizar traducciones, i18n | `.atl/skills/i18n-translate/SKILL.md` |

## Global skills (aplicables a este proyecto)

| Skill | Trigger | Path |
|---|---|---|
| `react-19-patterns` | React 19, tipos de eventos deprecados, JSX event handlers, islas React en Astro | `/home/antonio/.config/opencode/skills/nextjs-app-router/SKILL.md` |
| `branch-pr` | Crear PRs, GitHub pull requests | `/home/antonio/.config/opencode/skills/branch-pr/SKILL.md` |
| `chained-pr` | PRs >400 líneas, stacked PRs, review slices | `/home/antonio/.config/opencode/skills/chained-pr/SKILL.md` |
| `cognitive-doc-design` | README, documentación, guías | `/home/antonio/.config/opencode/skills/cognitive-doc-design/SKILL.md` |
| `comment-writer` | Comentarios en PR, feedback, revisiones | `/home/antonio/.config/opencode/skills/comment-writer/SKILL.md` |
| `skill-creator` | Crear nuevas skills, agent instructions | `/home/antonio/.config/opencode/skills/skill-creator/SKILL.md` |
| `work-unit-commits` | Commits, PR splitting, work units | `/home/antonio/.config/opencode/skills/work-unit-commits/SKILL.md` |

## Loading protocol

1. Emparejar el contexto de la tarea contra la columna `Trigger`.
2. Pasar solo las rutas coincidentes al subagente bajo `## Skills to load before work`.
3. Si no hay skill coincidente, proceder sin inyección y reportar `skill_resolution: none`.
