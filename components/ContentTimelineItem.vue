<template>
	<div class="mb-8">
		<div class="absolute -left-3.5 mt-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary">
			<Icon
				name="lucide:calendar"
				class="h-3.5 w-3.5 text-primary-foreground"
			/>
		</div>
		<div class="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
			<time class="mb-1 text-sm font-normal leading-none text-muted-foreground">{{ year }}</time>
			<h3 class="text-lg font-semibold">
				{{ title }}
			</h3>
			<p class="text-base font-normal text-muted-foreground">
				{{ description }}
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps<{
	year: string | number;
	title: string;
	description: string;
}>();
</script>
