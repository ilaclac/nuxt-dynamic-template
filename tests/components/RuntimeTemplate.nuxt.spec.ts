import { describe, it, expect, beforeEach } from "vitest";
import { defineComponent } from "vue";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import RuntimeTemplate from "~/components/RuntimeTemplate.vue";
import { RUNTIME_TPL_CACHE_KEY } from "~/lib/constants";

beforeEach(() => {
	// reset global cache between tests
	;(globalThis as Record<string, unknown>)[RUNTIME_TPL_CACHE_KEY] = new Map<string, unknown>();
});

describe("RuntimeTemplate (Nuxt env)", () => {
	it("renders \"No template\" when empty", async () => {
		const wrapper = await mountSuspended(RuntimeTemplate, {
			props: { template: "", scope: {} },
		});
		expect(wrapper.text()).toContain("No template");
	});

	it("interpolates from scope", async () => {
		const wrapper = await mountSuspended(RuntimeTemplate, {
			props: { template: `<div data-test="greet">Hello {{ name }}</div>`, scope: { name: "Ivan" } },
		});
		expect(wrapper.get("[data-test=\"greet\"]").text()).toBe("Hello Ivan");
	});

	it("renders allow-listed component and passes inline JSON props", async () => {
		const TestChip = defineComponent({
			name: "TestChip",
			props: {
				label: { type: String, default: "" },
				config: { type: Object, default: () => ({}) },
			},
			template: `<span data-test="chip">{{ label }}-{{ config?.a }}</span>`,
		});

		const wrapper = await mountSuspended(RuntimeTemplate, {
			props: {
				template: `<TestChip :label="'Hi'" :config='{"a":1}' />`,
				scope: {},
				components: { TestChip },
			},
		});

		expect(wrapper.get("[data-test=\"chip\"]").text()).toBe("Hi-1");
	});

	it("updates when scope changes (no recompile)", async () => {
		const wrapper = await mountSuspended(RuntimeTemplate, {
			props: { template: `<div data-test="count">{{ count }}</div>`, scope: { count: 1 } },
		});
		expect(wrapper.get("[data-test=\"count\"]").text()).toBe("1");

		await wrapper.setProps({ scope: { count: 2 } });
		expect(wrapper.get("[data-test=\"count\"]").text()).toBe("2");
	});

	it("rebuilds when the template string changes", async () => {
		const wrapper = await mountSuspended(RuntimeTemplate, {
			props: { template: `<div data-test="msg">A</div>`, scope: {} },
		});
		expect(wrapper.get("[data-test=\"msg\"]").text()).toBe("A");

		await wrapper.setProps({ template: `<div data-test="msg">B</div>` });
		expect(wrapper.get("[data-test=\"msg\"]").text()).toBe("B");
	});

	it("caches compiled templates (same template => one cache entry)", async () => {
		const templateData = `<div>Cached</div>`;
		const w1 = await mountSuspended(RuntimeTemplate, { props: { template: templateData, scope: {} } });
		const w2 = await mountSuspended(RuntimeTemplate, { props: { template: templateData, scope: {} } });

		const cache = (globalThis as Record<string, unknown>)[RUNTIME_TPL_CACHE_KEY] as Map<string, unknown>;
		expect(cache.size).toBe(1);

		w1.unmount();
		w2.unmount();
	});
});
