<script setup lang="ts">
const route = useRoute();
const slug = route.params.slug as string;

const { data: post } = await useAsyncData(`post-${slug}`, () =>
	queryCollection("posts")
		.path(`/posts/${slug}`)
		.first(),
);
</script>

<template>
	<article class="prose max-w-none dark:prose-invert">
		<ContentRenderer
			v-if="post"
			:value="post"
		/>
		<p
			v-else
			class="opacity-70"
		>
			Post not found.
		</p>
	</article>
</template>
