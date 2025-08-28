<script setup lang="ts">
const { data: posts } = await useAsyncData("posts", () =>
	queryCollection("posts")
		.select("path", "title", "date")
		.order("date", "DESC")
		.all(),
);
</script>

<template>
	<section class="space-y-4">
		<h1 class="text-2xl font-bold">
			Blog (ISR 300s)
		</h1>
		<ul class="space-y-2">
			<li
				v-for="p in posts"
				:key="p.path"
			>
				<NuxtLink
					:to="p.path"
					class="underline"
				>{{ p.title }}</NuxtLink>
				<span class="ml-2 text-xs opacity-60">{{ p.date }}</span>
			</li>
		</ul>
	</section>
</template>
