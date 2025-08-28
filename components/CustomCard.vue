<!-- components/CustomCard.vue -->
<template>
	<Card :class="accentClass">
		<CardHeader class="pb-2">
			<div class="flex items-start justify-between gap-3">
				<div>
					<CardTitle class="text-xl">
						{{ title }}
					</CardTitle>
					<CardDescription
						v-if="description"
						class="mt-1"
					>
						{{ description }}
					</CardDescription>
				</div>

				<Button
					v-if="cta"
					as-child
					size="sm"
				>
					<NuxtLink :to="cta.href">{{ cta.label }}</NuxtLink>
				</Button>
			</div>
		</CardHeader>

		<CardContent class="space-y-4">
			<div
				v-if="stats?.length"
				class="grid grid-cols-2 sm:grid-cols-3 gap-3"
			>
				<div
					v-for="(stat, i) in stats"
					:key="i"
					class="rounded-md border px-3 py-2 text-sm"
				>
					<div class="opacity-60">
						{{ stat.label }}
					</div>
					<div class="font-medium">
						{{ stat.value }}
					</div>
				</div>
			</div>

			<div
				v-if="links?.length"
				class="flex flex-wrap gap-2"
			>
				<Button
					v-for="(link, i) in links"
					:key="i"
					as-child
					variant="outline"
					size="sm"
				>
					<NuxtLink :to="link.href">{{ link.label }}</NuxtLink>
				</Button>
			</div>
		</CardContent>

		<CardFooter>
			<slot name="footer">
				<span class="text-xs opacity-70">Default footer</span>
			</slot>
		</CardFooter>
	</Card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Accent = "neutral" | "info" | "success" | "warning" | "danger";

const props = defineProps<{
	title: string;
	description?: string;
	cta?: { label: string; href: string } | null;
	links?: Array<{ label: string; href: string }>;
	stats?: Array<{ label: string; value: string | number }>;
	accent?: Accent;
}>();

const accentClass = computed(() => {
	switch (props.accent) {
		case "info": return "border-l-4 pl-[calc(theme(spacing.6)-1rem)] border-ring";
		case "success": return "border-l-4 pl-[calc(theme(spacing.6)-1rem)] border-green-500/60";
		case "warning": return "border-l-4 pl-[calc(theme(spacing.6)-1rem)] border-yellow-500/60";
		case "danger": return "border-l-4 pl-[calc(theme(spacing.6)-1rem)] border-red-500/60";
		default: return "";
	}
});
</script>
