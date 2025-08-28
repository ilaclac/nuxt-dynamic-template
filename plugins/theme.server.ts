export default defineNuxtPlugin(() => {
	const ui = useUiStore();
	const headers = useRequestHeaders(["cookie"]);
	const cookie = headers.cookie || "";
	const m = /(?:^|;\s*)theme=(dark|light)/.exec(cookie);
	const theme = (m?.[1] as "dark" | "light" | undefined) ?? "light";
	ui.setTheme(theme);
});
