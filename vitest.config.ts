import { defineVitestConfig } from "@nuxt/test-utils/config";
import path from "path";

export default defineVitestConfig({
	test: {
		globals: true,
		environment: "nuxt",
		include: ["tests/**/*.spec.ts"],
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "."),
			"~": path.resolve(__dirname, "."),
		},
	},
});
