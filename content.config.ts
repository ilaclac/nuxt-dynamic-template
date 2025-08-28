import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
	collections: {
		posts: defineCollection({
			type: "page",
			source: "posts/*",
			schema: z.object({
				title: z.string(),
				date: z.string().optional(),
			}),
		}),
	},
});
