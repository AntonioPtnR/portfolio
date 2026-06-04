---
name: i18n-translate
description: "Trigger: cambios en src/content/*.md, traducir contenido, actualizar traducciones, i18n, translations. Auto-genera archivos .en.md y .ca.md cuando se modifica el contenido en español del portfolio."
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## Activation Contract

Activa esta skill cuando:
- Se modifica, crea o elimina cualquier archivo `src/content/**/*.md` que NO tenga sufijo de idioma (`.en.md`, `.ca.md`)
- El usuario pide "traduce el contenido", "actualiza las traducciones", "sync translations" o similar
- Tras un cambio en un `.md` español, regenerar sus traducciones

## Hard Rules

- El español (`lang: es`) es el idioma fuente. Los archivos sin sufijo (ej: `grado-informatica.md`) equivalen a `grado-informatica.es.md`.
- Las traducciones se generan como archivos independientes con sufijo: `.en.md` para inglés, `.ca.md` para catalán.
- **NUNCA** modificar el archivo fuente español al traducir.
- Mantener la estructura del frontmatter exactamente igual, cambiando solo los campos de texto.
- Los campos técnicos (`order`, `tech`, `featured`, `demoUrl`, `repoUrl`, `category`, `tags`) se copian sin modificar.
- Los campos de texto (`title`, `description`, `role`, `company`, `institution`, `highlights`, `period`) se traducen.
- La traducción debe ser natural, no literal — adaptar expresiones idiomáticas al idioma destino.
- El `period` se adapta al formato del idioma destino (ej: "2022 — Presente" → "2022 — Present" en inglés, "2022 — Present" en catalán).
- Si el archivo traducido ya existe, sobrescribirlo con la nueva traducción.

## Decision Gates

| Situación | Acción |
|-----------|--------|
| Archivo español cambiado | Leer el español → regenerar `.en.md` y `.ca.md` |
| Archivo `.en.md` o `.ca.md` cambiado manualmente | No hacer nada (el usuario lo editó a propósito) |
| Archivo español eliminado | Eliminar también `.en.md` y `.ca.md` correspondientes |
| Nuevo archivo español creado | Generar `.en.md` y `.ca.md` desde cero |
| Usuario pide "traduce todo" | Recorrer todos los `.md` españoles y regenerar sus traducciones |

## Execution Steps

1. Identificar los archivos fuente (español): `glob("src/content/**/*.md")` filtrando los que NO terminan en `.en.md` ni `.ca.md`.
2. Para cada archivo fuente:
   a. Leer el frontmatter y contenido.
   b. Detectar el tipo de colección por el directorio (`education`, `experience`, `projects`).
   c. Traducir solo los campos de texto del frontmatter y el body markdown.
   d. Escribir `{nombre}.en.md` y `{nombre}.ca.md` en el mismo directorio.
3. Si solo cambió un archivo, traducir solo ese.
4. Ejecutar `npm run build` para validar que las traducciones no rompen el schema.

## Output Contract

- Lista de archivos `.en.md` y `.ca.md` creados o actualizados.
- Resultado de `npm run build`.
- Si hay errores de schema, corregirlos antes de reportar éxito.

## Translation Reference

### Patrones de traducción recurrentes

| Español | English | Català |
|---------|---------|--------|
| Ingeniero de Software | Software Engineer | Enginyer de Software |
| Ingeniería Informática | Computer Science | Enginyeria Informàtica |
| Universidad de Castilla-La Mancha | University of Castilla-La Mancha | Universitat de Castella-La Manxa |
| Grado en | Bachelor's Degree in | Grau en |
| Presente | Present | Present |
| Software Engineer | Software Engineer | Software Engineer |
| Full Stack | Full Stack | Full Stack |
| SaaS integral para | Comprehensive SaaS for | SaaS integral per a |
| Cuaderno de campo | Field notebook | Quadern de camp |
| Portfolio Personal | Personal Portfolio | Portfolio Personal |
| Derechos reservados | All rights reserved | Tots els drets reservats |
| Proyectos activos | Active projects | Projectes actius |
| Compromiso | Commitment | Compromís |

### Campos que se traducen (por colección)

**Education**: `title`, `institution`, `description`, `period`
**Experience**: `role`, `company`, `description`, `highlights[]`, `period`
**Projects**: `title`, `description`

### Campos que se copian sin traducir

**Todos**: `order`, `tech`, `tags`, `featured`, `demoUrl`, `repoUrl`, `category`, `image`, `imageAlt`, `lang`
