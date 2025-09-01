# Nuxt 3 – Dynamic Template Demo

This project demonstrates a robust and scalable architecture for building CMS-driven pages in Nuxt 3. 

It fetches Vue template strings and associated data from a Nitro API endpoint, rendering them with full Server-Side Rendering (SSR) and Incremental Static Regeneration (ISR) support.

The core challenge was to render dynamic templates from an API without sacrificing performance, SEO, or developer experience, and avoiding client-side hydration errors.

### Live Demo:

https://nuxt-dynamic-template.vercel.app/

### Key Architectural Features

1. **SSR/ISR Dynamic Rendering**
   The application's core is the `DynamicPageRenderer.vue` component. It acts as a universal host that takes a query, fetches the corresponding template and data from the API, and renders the result. This process happens on the server for the initial load and on the client for subsequent navigations, ensuring fast performance and correct hydration.
2. **CMS-Driven Architecture**
   The Nitro API (`server/api/template.get.ts`) simulates a real-world headless CMS. It returns a { template, data } payload, cleanly separating the page structure (the Vue template string) from its content (the data object). This allows non-technical users to build complex pages using a predefined set of "safe" Vue components.
3. **Efficient Component Reuse & Reactivity**
   To showcase a real-world optimization, the blog post navigation (`/blog/[slug]`) uses `definePageMeta({ key: '...' })`. This instructs Nuxt to reuse the page component instance when navigating between posts. The `DynamicPageRenderer` is designed to be reactive; it watches for changes to its query prop and automatically re-fetches the new content without unmounting and remounting the entire component tree, providing a smoother user experience and better performance.
4. **Server-Side Data Validation with Zod**
   The Nitro API endpoint uses `Zod` schemas to validate all mock data before sending it to the frontend. This ensures data integrity, prevents bugs, and makes the system more robust and maintainable.
5. **Showcase of Unit Testing**
   The `DynamicPageRenderer` is unit-tested using `Vitest` and `@nuxt/test-utils`.

### Pages Overview & Demonstrations

**/ (Home), /about, /contact**: These pages demonstrate the basic functionality of the renderer for distinct, static-like pages.

**/blog**: A blog index page that fetches a list of articles from the API.
**/blog/[slug]**: Dynamic blog post pages that are rendered with ISR. These pages showcase the "Next/Previous" navigation, proving the component reuse and reactivity model.

**/posts**: Another blog index page that fetches a list of articles from `@nuxt/content` - this page is using SSG.
**/posts/[slug]**: Rendered with SSG using `@nuxt/content`.

### Getting Started

```
npm install
npm run dev
```

### Tests

Unit tests run in the Nuxt test runtime:

```
npm run test
```

### Helpful scripts:

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