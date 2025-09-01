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
			Posts page using @nuxt/content (SSG 300s)
		</h1>
		<ul class="space-y-2">
			<li
				v-for="post in posts"
				:key="post.path"
			>
				<NuxtLink
					:to="post.path"
					class="underline"
				>{{ post.title }}</NuxtLink>
				<span class="ml-2 text-xs opacity-60">{{ post.date }}</span>
			</li>
		</ul>
	</section>
</template>
