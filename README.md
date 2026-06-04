# Portfolio

Portfolio personal minimalista construido con Astro, Tailwind CSS y React.

## Características

- **Rendimiento estático** gracias a Astro — solo se carga JS donde hace falta
- **Modo oscuro / claro** con detección del sistema y toggle manual
- **Single-page** con scroll suave entre secciones
- **Contenido gestionado con markdown** — editar sin tocar código

## Secciones

- 👋 **Presentación** — tu nombre, rol y links
- 📚 **Formación** — timeline académico
- 💼 **Experiencia** — timeline profesional
- 🛠️ **Proyectos** — grid de proyectos con links
- 📬 **Contacto** — formulario + datos directos

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # Build estático → dist/
```

## Despliegue

El proyecto genera una carpeta `dist/` con HTML, CSS y JS estático. Se puede desplegar en:

- [Vercel](https://vercel.com) — cero configuración con Astro
- [Cloudflare Pages](https://pages.cloudflare.com) — `npm run build`, output: `dist/`
- [Netlify](https://netlify.com) — arrastrar `dist/` o conectar repo

## Licencia

MIT
