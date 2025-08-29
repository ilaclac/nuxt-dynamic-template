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

		<div class="mb-2 opacity-80">
			Try rendering different components:
		</div>

		<div class="text-xl">
			<div class="flex justify-center">
				<NuxtLink
					to="/"
					:class="[
						'underline mx-4 px-2 py-1 rounded-md border transition-colors',
						kind === 'card'
							? 'bg-primary text-primary-foreground border-transparent'
							: 'border-border hover:bg-accent hover:text-accent-foreground',
					]"
				>
					Card component
				</NuxtLink>

				<NuxtLink
					:to="{ query: { kind: 'hero' } }"
					:class="[
						'underline mx-4 px-2 py-1 rounded-md border transition-colors',
						kind === 'hero'
							? 'bg-primary text-primary-foreground border-transparent'
							: 'border-border hover:bg-accent hover:text-accent-foreground',
					]"
				>
					Hero component
				</NuxtLink>

				<NuxtLink
					:to="{ query: { kind: 'badge' } }"
					:class="[
						'underline mx-4 px-2 py-1 rounded-md border transition-colors',
						kind === 'badge'
							? 'bg-primary text-primary-foreground border-transparent'
							: 'border-border hover:bg-accent hover:text-accent-foreground',
					]"
				>
					Badge component
				</NuxtLink>
			</div>
		</div>

		<div
			class="mt-4"
		>
			<div
				v-if="pending"
				class="grid place-items-center py-20"
			>
				<Card class="w-full max-w-md text-center border">
					<CardContent class="py-10">
						<div
							class="mx-auto mb-4 size-10 rounded-full border-2 border-primary/30 border-t-primary animate-spin"
							aria-hidden="true"
						/>
						<p class="text-lg font-medium">
							Loading template…
						</p>
						<p class="mt-1 text-sm opacity-60">
							Fetching data & compiling on the client
						</p>
					</CardContent>
				</Card>
			</div>

			<div
				v-else-if="error"
				class="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-800"
			>
				Error fetching template: {{ error.message }}
			</div>

			<ClientOnly v-else>
				<RuntimeTemplate
					:template="templateData"
					:scope="scope"
					:components="allowlist"
				/>
				<template #fallback>
					<div class="grid place-items-center py-12">
						<div class="flex items-center gap-3 text-base opacity-80">
							<div class="size-5 rounded-full border-2 border-foreground/30 border-t-foreground animate-spin" />
							<span>Preparing client renderer…</span>
						</div>
					</div>
				</template>
			</ClientOnly>
		</div>
	</section>
</template>
