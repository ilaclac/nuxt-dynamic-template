<script setup lang="ts">
import CustomCard from "~/components/CustomCard.vue";
import CustomHero from "~/components/CustomHero.vue";
import CustomBadge from "~/components/CustomBadge.vue";
import type { TemplateResponse, TemplateKind } from "~/types/runtime-template";

const route = useRoute();

const kind = computed<TemplateKind>(() => (route.query.kind as TemplateKind) ?? "card");

const { data, pending, error } = await useFetch<TemplateResponse>("/api/template", {
	query: computed(() => ({ kind: kind.value })),
	key: computed(() => `template-${kind.value}`),
	watch: [kind],
});

const templateData = computed(() => data.value?.template ?? "");
const scope = computed(() => data.value?.scope ?? ({} as Record<string, unknown>));
const allowlist = { CustomCard, CustomHero, CustomBadge };

const seoTitle = computed(() => ({
	card: "Card demo",
	hero: "Hero demo",
	badge: "Badge demo",
}[kind.value]));

useSeoMeta({
	title: seoTitle,
	description: "Render Vue templates from an API with allow-listed components and typed scope.",
});
</script>

<template>
	<section class="space-y-6">
		<h1 class="text-2xl font-bold caret-orange-600">
			Home (ISR 60s)
		</h1>

		<div
			v-if="pending"
			class="opacity-60"
		>
			Loading template data...
		</div>
		<div
			v-else-if="error"
			class="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-800"
		>
			Error fetching template: {{ error.message }}
		</div>

		<ClientOnly v-else>
			<div class="text-xl ">
				<div class="mb-4 opacity-80">
					Try rendering different components:
				</div>
				<div class="flex justify-center">
					<NuxtLink
						to="/"
						:class="[
							'underline mx-4 px-2 py-1 rounded-md border transition-colors',
							kind === 'card'
								? 'bg-primary text-primary-foreground border-transparent'
								: 'border-border hover:bg-accent hover:text-accent-foreground',
						]"
					>Card component</NuxtLink>

					<NuxtLink
						:to="{ query: { kind: 'hero' } }"
						:class="[
							'underline mx-4 px-2 py-1 rounded-md border transition-colors',
							kind === 'hero'
								? 'bg-primary text-primary-foreground border-transparent'
								: 'border-border hover:bg-accent hover:text-accent-foreground',
						]"
					>Hero component</NuxtLink>

					<NuxtLink
						:to="{ query: { kind: 'badge' } }"
						:class="[
							'underline mx-4 px-2 py-1 rounded-md border transition-colors',
							kind === 'badge'
								? 'bg-primary text-primary-foreground border-transparent'
								: 'border-border hover:bg-accent hover:text-accent-foreground',
						]"
					>Badge component</NuxtLink>
				</div>
			</div>

			<RuntimeTemplate
				:template="templateData"
				:scope="scope"
				:components="allowlist"
			/>
			<template #fallback>
				<div class="opacity-60">
					Loading dynamic template…
				</div>
			</template>
		</ClientOnly>
	</section>
</template>
