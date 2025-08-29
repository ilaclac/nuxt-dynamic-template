import { useUiStore } from "~/stores/ui";

type Theme = "light" | "dark";

function readThemeFromCookie(raw: string | undefined): Theme | undefined {
	const themeMatch = /(?:^|;\s*)theme=(dark|light)/.exec(raw || "");
	return themeMatch?.[1] as Theme | undefined;
}

export default defineNuxtPlugin(() => {
	const ui = useUiStore();

	if (import.meta.server) {
		const cookieHeader = useRequestHeaders(["cookie"]).cookie;
		const themeFromCookie = readThemeFromCookie(cookieHeader);
		ui.$patch({ theme: themeFromCookie ?? "light" });
		return;
	}

	// Client: prefer cookie, else fall back to system preference
	const themeFromCookie = readThemeFromCookie(document.cookie);
	const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	const resolved: Theme = themeFromCookie ?? (systemPrefersDark ? "dark" : "light");

	// Sync store
	if (ui.theme !== resolved) ui.$patch({ theme: resolved });

	// Persist cookie on first visit
	if (!themeFromCookie) {
		document.cookie = `theme=${resolved}; Path=/; Max-Age=31536000; SameSite=Lax`;
	}
});
