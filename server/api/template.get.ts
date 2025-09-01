import { defineEventHandler, getQuery, createError } from "h3";
import { CardDataSchema, TeamMemberSchema, AccordionItemSchema } from "~/types/schemas";
import { z } from "zod";

function getIndexPage() {
	const rawCardData = {
		stats: [
			{ label: "Region", value: process.env.VERCEL_REGION || "local" },
			{ label: "ISR", value: "60s" },
			{ label: "Rendered", value: new Date().toLocaleTimeString() },
		],
		links: [
			{ label: "About Us", href: "/about" },
			{ label: "SSR Example", href: "/ssr-example" },
		],
	};

	const cardData = CardDataSchema.parse(rawCardData);

	const template = `
    <div class="space-y-8">
      <CustomHero title="Welcome to Nuxt Dynamic UI" subtitle="This application fetches a Vue template string from an API and renders it using ISR." :image="{ src: 'https://picsum.photos/seed/home/640/360', alt: 'Welcome Image' }" />
      <CustomCard
        title="Dynamic Content Showcase"
        description="This card is part of a template string rendered dynamically. The data below is generated on the server."
        accent="info"
        :cta="{ label: 'Read the Blog', href: '/blog' }"
        :stats="cardStats"
        :links="cardLinks"
      >
        <template #footer>
          <CustomBadge text="Footer from a dynamic slot" icon="mdi:star" :meta='{ "source": "CMS" }' />
        </template>
      </CustomCard>
    </div>
  `;

	return {
		template,
		data: {
			cardStats: cardData.stats,
			cardLinks: cardData.links,
		},
	};
}

function getAboutPage() {
	const rawTeamMembers = [
		{ name: "Alex Jordan", role: "CEO & Founder", avatarUrl: "https://i.pravatar.cc/150?img=50", bio: "The visionary leader who started it all.", socials: [{ icon: "mdi:linkedin", href: "#" }, { icon: "mdi:twitter", href: "#" }] },
		{ name: "Ben Carter", role: "Lead Developer", avatarUrl: "https://i.pravatar.cc/150?img=51", bio: "The architect of our technology.", socials: [{ icon: "mdi:github", href: "#" }, { icon: "mdi:linkedin", href: "#" }] },
		{ name: "Tom Davis", role: "Head of Design", avatarUrl: "https://i.pravatar.cc/150?img=52", bio: "The creative force behind our UX.", socials: [{ icon: "mdi:dribbble", href: "#" }, { icon: "mdi:twitter", href: "#" }] },
	];
	const rawAccordionItems = [
		{ value: "item-1", title: "Innovation", content: "We constantly push the boundaries of what's possible." },
		{ value: "item-2", title: "Customer-Centricity", content: "Our customers are at the heart of everything we do." },
		{ value: "item-3", title: "Integrity", content: "We believe in doing the right thing, always." },
	];

	const template = `
    <div class="space-y-16">
      <CustomHero title="About Our Company" subtitle="We are a team of passionate innovators dedicated to creating the future of technology." :image="{ src: 'https://picsum.photos/id/237/640/360', alt: 'Our Team' }" />
      <section>
        <h2 class="mb-8 text-center text-3xl font-bold">Our Core Values</h2>
        <div class="mx-auto max-w-3xl">
          <InteractiveAccordion :items="accordionItems" />
        </div>
      </section>
      <section>
        <h2 class="mb-8 text-center text-3xl font-bold">Meet the Team</h2>
        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
          <TeamMemberCard v-for="member in teamMembers" :key="member.name" :name="member.name" :role="member.role" :avatarUrl="member.avatarUrl" :bio="member.bio" :socials="member.socials" />
        </div>
      </section>
      <section>
        <h2 class="mb-8 text-center text-3xl font-bold">Our Journey</h2>
        <ContentTimeline>
          <ContentTimelineItem year="2021" title="The Idea" description="Our journey began with a simple idea." />
          <ContentTimelineItem year="2023" title="First Product Launch" description="We launched our first product to the public." />
          <ContentTimelineItem year="2025" title="Global Expansion" description="Expanded our operations to serve customers across the globe." />
        </ContentTimeline>
      </section>
    </div>
  `;

	const teamMembers = z.array(TeamMemberSchema).parse(rawTeamMembers);
	const accordionItems = z.array(AccordionItemSchema).parse(rawAccordionItems);

	return {
		template,
		data: {
			teamMembers,
			accordionItems,
		},
	};
}

function getContactPage() {
	const template = `
    <div class="space-y-6">
      <CustomHero
        title="Contact Us"
        subtitle="We'd love to hear from you. Reach out with any questions or feedback."
      />
      <CustomCard
        title="Our Information"
        description="Find us at our headquarters or send us an email."
        accent="success"
        :stats='[
          {"label": "Email", "value": "contact@nuxt-dynamic.com"},
          {"label": "Phone", "value": "+1 (555) 123-4567"},
          {"label": "Location", "value": "Virtual"}
        ]'
      >
        <template #footer>
          <span class="text-sm opacity-80">We typically respond within 24 hours.</span>
        </template>
      </CustomCard>
    </div>
  `;

	return { template };
}

const mockBlogPosts = [
	{
		slug: "chocolate-chip-cookies",
		title: "The Ultimate Chocolate Chip Cookies",
		summary: "A classic, foolproof recipe for perfectly soft and chewy chocolate chip cookies every time.",
		template: `
      <div class="prose dark:prose-invert max-w-none">
        <CustomHero :title="title" subtitle="A timeless classic for all ages." />
        <p class="my-4">There's nothing quite like a warm, freshly baked chocolate chip cookie. This recipe is a result of years of tweaking to achieve the perfect balance of soft, chewy, and slightly crispy edges. It's simple enough for beginners and delicious enough for experts.</p>

        <CustomCard
            title="Recipe Information"
            accent="info"
            :stats="recipeInfo.stats"
        />

        <h2 class="mt-6">Ingredients</h2>
        <ul>
          <li>1 cup (220g) packed brown sugar</li>
          <li>1/2 cup (100g) granulated sugar</li>
          <li>1/2 cup (115g) unsalted butter, melted</li>
          <li>1 large egg + 1 egg yolk</li>
          <li>1 tablespoon vanilla extract</li>
          <li>1 1/2 cups (190g) all-purpose flour</li>
          <li>1/2 teaspoon baking soda</li>
          <li>1 teaspoon salt</li>
          <li>1 1/4 cups (225g) semi-sweet chocolate chips</li>
        </ul>

        <p class="my-4">Follow the steps carefully, and you'll be rewarded with the best cookies of your life!</p>

        <BlogPostNavigation :previous="navigation.previous" :next="navigation.next" />
      </div>
    `,
		data: {
			title: "The Ultimate Chocolate Chip Cookies",
			author: { name: "Alexina Jordan", role: "Head Chef" },
			recipeInfo: {
				stats: [
					{ label: "Prep Time", value: "15 mins" },
					{ label: "Cook Time", value: "10 mins" },
					{ label: "Yields", value: "24 cookies" },
				],
			},
		},
	},
	{
		slug: "fluffy-pancakes",
		title: "Easy & Fluffy Buttermilk Pancakes",
		summary: "Start your morning right with this simple recipe for the fluffiest pancakes you've ever had.",
		template: `
      <div class="prose dark:prose-invert max-w-none">
        <CustomHero :title="title" subtitle="The perfect weekend breakfast." />
        <p class="my-4">Forget the boxed mix! This recipe for homemade buttermilk pancakes is surprisingly easy and produces incredibly light and fluffy results. The key is not to overmix the batter.</p>

        <h2 class="mt-6">Steps to Pancake Perfection</h2>
        <ContentTimeline>
          <ContentTimelineItem year="Step 1" title="Mix Dry Ingredients" description="In a large bowl, whisk together the flour, sugar, baking powder, baking soda, and salt." />
          <ContentTimelineItem year="Step 2" title="Whisk Wet Ingredients" description="In a separate medium bowl, whisk together the buttermilk, egg, and melted butter." />
          <ContentTimelineItem year="Step 3" title="Combine & Rest" description="Pour the wet ingredients into the dry and whisk until just combined. Do not overmix! Let the batter rest for 5-10 minutes." />
          <ContentTimelineItem year="Step 4" title="Cook & Flip" description="Heat a lightly oiled griddle or frying pan. Pour 1/4 cup of batter for each pancake. Cook until bubbles appear, then flip and cook until golden brown." />
        </ContentTimeline>

        <CustomCard
            title="Topping Suggestions"
            description="Get creative with your pancake toppings!"
            accent="success"
            :links="toppingLinks"
        />

        <BlogPostNavigation :previous="navigation.previous" :next="navigation.next" />
      </div>
    `,
		data: {
			title: "Easy & Fluffy Buttermilk Pancakes",
			author: { name: "Ben Carter", role: "Breakfast Enthusiast" },
			toppingLinks: [
				{ label: "Classic Maple Syrup", href: "#" },
				{ label: "Fresh Berries & Cream", href: "#" },
				{ label: "Chocolate Sauce", href: "#" },
			],
		},
	},
];

export default defineEventHandler((event) => {
	const { pageName, type, slug } = getQuery(event);

	if (type === "blog-list") {
		return mockBlogPosts.map(post => ({ slug: post.slug, title: post.title, summary: post.summary }));
	}

	if (type === "blog-post" && typeof slug === "string") {
		const postIndex = mockBlogPosts.findIndex(p => p.slug === slug);

		if (postIndex === -1) {
			throw createError({ statusCode: 404, statusMessage: "Blog Post Not Found" });
		}

		const post = mockBlogPosts[postIndex];

		const prevPost = postIndex > 0
			? { slug: mockBlogPosts[postIndex - 1].slug, title: mockBlogPosts[postIndex - 1].title }
			: null;

		const nextPost = postIndex < mockBlogPosts.length - 1
			? { slug: mockBlogPosts[postIndex + 1].slug, title: mockBlogPosts[postIndex + 1].title }
			: null;

		return {
			template: post.template,
			data: {
				...post.data,
				navigation: {
					previous: prevPost,
					next: nextPost,
				},
			},
		};
	}

	switch (pageName) {
		case "about":
			return getAboutPage();
		case "contact":
			return getContactPage();
		case "index":
		default:
			return getIndexPage();
	}
});
