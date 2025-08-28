import { setActivePinia, createPinia } from "pinia";
import { useUiStore } from "~/stores/ui";
import { describe, it, expect, beforeEach } from "vitest";

describe("ui store", () => {
	beforeEach(() => setActivePinia(createPinia()));
	it("toggles theme", () => {
		const ui = useUiStore();
		expect(ui.theme).toBeDefined();
		const initial = ui.theme;
		ui.toggleTheme();
		expect(ui.theme).not.toBe(initial);
	});
});
