<template>
	<nav class="mt-12 flex items-center justify-between border-t pt-6">
		<div>
			<Button
				v-if="previous"
				as-child
				variant="outline"
			>
				<NuxtLink :to="`/blog/${previous.slug}`">
					<Icon
						name="lucide:arrow-left"
						class="mr-2 h-4 w-4"
					/>
					<div>
						<div class="text-xs text-muted-foreground">Previous Post</div>
						<div class="font-semibold">{{ previous.title }}</div>
					</div>
				</NuxtLink>
			</Button>
		</div>

		<div class="text-right">
			<Button
				v-if="next"
				as-child
				variant="outline"
			>
				<NuxtLink :to="`/blog/${next.slug}`">
					<div>
						<div class="text-xs text-muted-foreground">Next Post</div>
						<div class="font-semibold">{{ next.title }}</div>
					</div>
					<Icon
						name="lucide:arrow-right"
						class="ml-2 h-4 w-4"
					/>
				</NuxtLink>
			</Button>
		</div>
	</nav>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import { Button } from "@/components/ui/button";

type PostLink = {
	slug: string;
	title: string;
};

defineProps({
	previous: {
		type: Object as PropType<PostLink | null>,
		default: null,
	},
	next: {
		type: Object as PropType<PostLink | null>,
		default: null,
	},
});
</script>
