import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { Mock } from "vitest";
import DynamicPageRenderer from "~/components/DynamicPageRenderer.vue";

beforeEach(() => {
	vi.stubGlobal("$fetch", vi.fn());
});

afterEach(() => {
	vi.unstubAllGlobals();
});

describe("DynamicPageRenderer", () => {
	it("renders nothing if the API returns no template", async () => {
		($fetch as unknown as Mock).mockResolvedValue({});

		const wrapper = await mountSuspended(DynamicPageRenderer, {
			props: { query: { pageName: "index" } },
		});

		expect(wrapper.html()).toBe("<!--v-if-->");
	});

	it("renders a simple template and data correctly on success", async () => {
		const mockResponse = {
			template: `<div data-test="greet">Hello, {{ name }}!</div>`,
			data: { name: "Nuxt" },
		};
		($fetch as unknown as Mock).mockResolvedValue(mockResponse);

		const wrapper = await mountSuspended(DynamicPageRenderer, {
			props: { query: { pageName: "index" } },
		});

		const greetDiv = wrapper.find("[data-test='greet']");
		expect(greetDiv.exists()).toBe(true);
		expect(greetDiv.text()).toBe("Hello, Nuxt!");
	});

	it("renders a template containing a custom component", async () => {
		const mockResponse = {
			template: `<CustomCard title="Test Card Title" />`,
			data: {},
		};
		($fetch as unknown as Mock).mockResolvedValue(mockResponse);

		const wrapper = await mountSuspended(DynamicPageRenderer, {
			props: { query: { pageName: "index" } },
		});

		expect(wrapper.text()).toContain("Test Card Title");
	});

	it("renders a list of items from the data scope using v-for", async () => {
		const mockResponse = {
			template: `
        <ul>
          <li v-for="item in items" :key="item.id">{{ item.name }}</li>
        </ul>
      `,
			data: {
				items: [
					{ id: 1, name: "First Item" },
					{ id: 2, name: "Second Item" },
				],
			},
		};
		($fetch as unknown as Mock).mockResolvedValue(mockResponse);

		const wrapper = await mountSuspended(DynamicPageRenderer, {
			props: { query: { pageName: "index" } },
		});

		const listItems = wrapper.findAll("li");
		expect(listItems.length).toBe(2);
		expect(listItems[0].text()).toBe("First Item");
		expect(listItems[1].text()).toBe("Second Item");
	});

	it("displays an error message when the fetch fails", async () => {
		const mockError = new Error("Network Failure: 500");
		($fetch as unknown as Mock).mockRejectedValue(mockError);

		const wrapper = await mountSuspended(DynamicPageRenderer, {
			props: { query: { pageName: "index" } },
		});

		expect(wrapper.text()).toContain("Error Fetching Page");
		expect(wrapper.text()).toContain("Network Failure: 500");
	});
});
