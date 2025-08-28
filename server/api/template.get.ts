import {
	CardScopeSchema,
	HeroScopeSchema,
	BadgeScopeSchema,
	type TemplateKind,
} from "~/types/runtime-template";

export default defineCachedEventHandler(async (event) => {
	const { kind = "card" } = getQuery(event) as { kind?: TemplateKind };

	if (kind === "hero") {
		const IMG_SRC = "https://images.unsplash.com/photo-1644792863360-40fa85ea52e7?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0";

		const image = IMG_SRC
			? { src: IMG_SRC, alt: "Welcome image", width: 1700, height: 800 }
			: undefined;

		const template = `<CustomHero :title="title" :subtitle="subtitle" :image="image" />`;
		const scope = HeroScopeSchema.parse({
			title: "Welcome to the Dynamic Showcase",
			subtitle: "Rendered from a template string",
			image,
		});

		return { kind: "hero", template, scope };
	}

	if (kind === "badge") {
		const template = `<CustomBadge :text="text" :icon="icon" :meta='{"track":true,"group":"A"}' />`;
		const scope = BadgeScopeSchema.parse({
			text: "Important Badge",
			icon: "lucide:activity",
		});

		return { kind: "badge", template, scope };
	}

	const template = `
    <CustomCard
      :title="title"
      :description="description"
      :accent="accent"
      :cta="cta"
      :links="links"
      :stats="stats"
    >
      <template #footer>
        <span class="text-xs opacity-70">Random footer text</span>
      </template>
    </CustomCard>
  `;

	const bytes = Buffer.byteLength(template, "utf8");
	const region = process.env.VERCEL_REGION || "local";
	const nodeVer = process.versions.node.replace(/^v?(\d+\.\d+).*/, "v$1"); // e.g. v20.11
	const timeISO = new Date().toISOString(); // e.g. 2025-08-28T13:07:41.123Z
	const timeHHMMSS = timeISO.slice(11, 19) + "Z";

	const scope = CardScopeSchema.parse({
		title: "Nuxt 3 Dynamic UI",
		description: "Demo that renders Vue templates fetched from an API endpoint.",
		accent: "info",
		cta: { label: "Read the Blog", href: "/blog" },
		stats: [
			{ label: "Template bytes:", value: bytes },
			{ label: "Region:", value: region },
			{ label: "Node version:", value: nodeVer },
			{ label: "Generated at:", value: timeHHMMSS },
		],
		links: [
			{ label: "SSR example", href: "/ssr-example" },
			{ label: "SSG example", href: "/ssg-example" },
		],
	});

	return { kind: "card", template, scope };
}, { maxAge: 60, swr: true });
