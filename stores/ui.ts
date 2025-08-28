import { defineStore } from "pinia";

type Theme = "light" | "dark";

export const useUiStore = defineStore("ui", {
	state: () => ({ theme: "light" as Theme }),
	getters: { isDark: state => state.theme === "dark" },
	actions: {
		applyToDOM() {
			if (!import.meta.client) return;
			const root = document.documentElement;
			root.classList.toggle("dark", this.isDark);
			root.setAttribute("data-theme", this.isDark ? "dark" : "light");
			document.cookie = `theme=${this.theme}; Path=/; Max-Age=31536000; SameSite=Lax`;
		},
		toggleTheme() {
			this.theme = this.isDark ? "light" : "dark";
			this.applyToDOM();
		},
		setTheme(t: Theme) {
			this.theme = t;
			this.applyToDOM();
		},
	},
});
