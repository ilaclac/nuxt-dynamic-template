// Import test utilities from the Nuxt-provided #vitest alias.
// This ensures you're using the Vitest instance configured by Nuxt.
import { describe, it, expect, afterEach, vi } from "#vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import { defineComponent, nextTick } from "vue";
import * as compiler from "@vue/compiler-dom";

// All aliases like `~/` work out-of-the-box.
import RuntimeTemplate from "~/components/RuntimeTemplate.vue";
import { RUNTIME_TPL_CACHE_KEY } from "~/lib/constants";

const MockCustomCard = defineComponent({
	template: `
    <div class="mock-card">
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
    </div>
  `,
	props: {
		title: String,
		description: String,
	},
});

afterEach(() => {
	const global = globalThis as Record<string, unknown>;
	if (global[RUNTIME_TPL_CACHE_KEY]) {
		(global[RUNTIME_TPL_CACHE_KEY] as Map<string, unknown>).clear();
	}
});

describe("RuntimeTemplate.vue", () => {
	it("renders a component from a template string with initial scope", async () => {
		const template = `<MockCustomCard :title="cardTitle" :description="cardDesc" />`;
		const scope = {
			cardTitle: "Hello from Scope",
			cardDesc: "This is a test.",
		};

		const wrapper = await mountSuspended(RuntimeTemplate, {
			props: {
				template,
				scope,
				components: { MockCustomCard },
			},
		});

		expect(wrapper.find("h2").text()).toBe("Hello from Scope");
		expect(wrapper.find("p").text()).toBe("This is a test.");
	});

	it("reacts to changes in the scope prop", async () => {
		const template = `<MockCustomCard :title="title" />`;
		const initialScope = { title: "Initial Title" };

		const wrapper = await mountSuspended(RuntimeTemplate, {
			props: {
				template,
				scope: initialScope,
				components: { MockCustomCard },
			},
		});

		expect(wrapper.find("h2").text()).toBe("Initial Title");

		await wrapper.setProps({ scope: { title: "Updated Title" } });
		await nextTick();
		expect(wrapper.find("h2").text()).toBe("Updated Title");
	});
});
