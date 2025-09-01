<template>
	<div
		v-if="pending"
		class="grid min-h-[400px] place-items-center"
	>
		<div class="text-center">
			<div
				class="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-primary/30 border-t-primary"
				aria-hidden="true"
			/>
			<p class="text-lg font-medium">
				Loading Page…
			</p>
			<p class="mt-1 text-sm opacity-60">
				Fetching dynamic template from CMS
			</p>
		</div>
	</div>

	<div
		v-else-if="error"
		class="rounded-md border border-red-300 bg-red-50 p-4 text-red-800"
	>
		<h3 class="font-semibold">
			Error Fetching Page
		</h3>
		<p>Could not load the template for query: "{{ JSON.stringify(query) }}". Please try again later.</p>
		<pre class="mt-2 text-sm">{{ error.message }}</pre>
	</div>

	<component
		:is="dynamicComponent"
		v-else-if="dynamicComponent"
	/>
</template>

<script setup lang="ts">
import { defineComponent, markRaw, watch, computed } from "vue";
import CustomBadge from "~/components/CustomBadge.vue";
import CustomCard from "~/components/CustomCard.vue";
import CustomHero from "~/components/CustomHero.vue";
import TeamMemberCard from "~/components/TeamMemberCard.vue";
import ContentTimeline from "~/components/ContentTimeline.vue";
import ContentTimelineItem from "~/components/ContentTimelineItem.vue";
import InteractiveAccordion from "~/components/InteractiveAccordion.vue";
import BlogPostNavigation from "~/components/BlogPostNavigation.vue";
import type { DynamicPageQuery } from "~/types/api";

const props = defineProps<{
	query: DynamicPageQuery;
}>();

const uniqueKey = computed(() => `page-template-${JSON.stringify(props.query)}`);

const { data, pending, error, refresh } = await useAsyncData<{ template: string; data: Record<string, unknown> }>(
	uniqueKey.value,
	() => $fetch("/api/template", {
		query: props.query,
	}),
);

watch(uniqueKey, () => {
	refresh();
});

const dynamicComponent = computed(() => {
	if (!data.value?.template) {
		return null;
	}

	return markRaw(defineComponent({
		components: {
			CustomBadge,
			CustomCard,
			CustomHero,
			TeamMemberCard,
			ContentTimeline,
			ContentTimelineItem,
			InteractiveAccordion,
			BlogPostNavigation,
		},
		setup() {
			return data.value?.data || {};
		},
		template: data.value.template,
	}));
});
</script>
