# Nuxt 3 – Dynamic Template Demo

Nuxt 3 app that fetches a **Vue template string** from a Nitro API and renders it at runtime. The template includes a **custom component**, **props**, and an **inline JSON prop**. The app is ready for **ISR** and deploys cleanly to **Vercel**.

## What I implemented
- **Runtime renderer**: `components/RuntimeTemplate.vue` compiles a template string on the **client** and renders only **allow-listed** components.
- **API**: `GET /api/template?kind=card|hero|badge` returns `{ template, scope }` with **Zod-typed** scopes.
- **Examples**:
    - `card` → informational `CustomCard` (title/description/CTA/links/stats)
    - `hero` → `CustomHero` using `@nuxt/image`
    - `badge` → `CustomBadge` with **inline JSON prop** (e.g. `:meta='{"track":true}'`)
- **UI/State**: Tailwind v4 + shadcn, Pinia theme toggle with no-flash init.
- **Content**: Blog via `@nuxt/content` (`/blog`, `/posts/:id`).
- **ISR** (in `nuxt.config`): `/` 60s, `/blog` 300s, `/posts/**` 300s; plus SSR/SSG examples.

## Run locally
```
npm install
npm run dev
```

### Tests

Unit tests run in the Nuxt test runtime:

```
npm run test
```

### Helpful scripts

```
{
  "dev": "nuxt dev",
  "build": "nuxt build",
  "preview": "nuxt preview",
  "generate": "nuxt generate",
  "lint": "eslint .",
  "lint:fix": "eslint . --fix",
  "test": "vitest"
}
```

### Live URL: 
To be added.

