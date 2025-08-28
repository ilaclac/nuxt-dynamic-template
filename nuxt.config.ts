import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
	modules: [
		"shadcn-nuxt",
		"@nuxt/icon",
		"@vueuse/nuxt",
		"@pinia/nuxt",
		"@nuxt/image",
		"@nuxt/content",
		"@nuxt/eslint",
		"@nuxt/test-utils/module",
	],
	app: {
		head: {
			htmlAttrs: { lang: "en" },
			titleTemplate: "%s - Nuxt Dynamic UI",
			meta: [
				{ name: "viewport", content: "width=device-width, initial-scale=1" },
				{ name: "description", content: "Nuxt app that renders Vue templates fetched from Nitro API." },
				{ property: "og:site_name", content: "Nuxt Dynamic UI" },
				{ property: "og:type", content: "website" },
				{ name: "twitter:card", content: "summary_large_image" },
				{ name: "theme-color", media: "(prefers-color-scheme: light)", content: "#ffffff" },
				{ name: "theme-color", media: "(prefers-color-scheme: dark)", content: "#0b0b0c" },
			],
			link: [
				{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
			],
			script: [
				{
					key: "theme-init",
					src: "/theme-init.js",
					tagPosition: "head",
					defer: false,
				},
			],
		},
	},
	css: ["~/assets/css/tailwind.css"],
	routeRules: {
		"/": { isr: 60 },
		"/blog": { isr: 300 },
		"/posts/**": { isr: 300 },
		"/ssr-example": { ssr: true },
		"/ssg-example": { prerender: true },
	},
	compatibilityDate: "2025-07-15",
	vite: {
		plugins: [
			tailwindcss(),
		],
	},
	eslint: {
		config: {
			stylistic: {
				semi: true,
				quotes: "double",
				commaDangle: "always-multiline",
				indent: "tab",
			},
		},
	},
	image: {
		domains: ["images.unsplash.com"],
	},
	shadcn: {
		prefix: "",
		componentDir: "./components/ui",
	},
});
