import { defineVitestConfig } from "@nuxt/test-utils/config";
import path from "path";
import vue from "@vitejs/plugin-vue";

export default defineVitestConfig({
	plugins: [
		vue(),
	],
	test: {
		globals: true,
		environment: "nuxt",
		include: ["tests/**/*.spec.ts"],
		setupFiles: ["tests/setup.ts"],
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "."),
			"~": path.resolve(__dirname, "."),
		},
	},
});
