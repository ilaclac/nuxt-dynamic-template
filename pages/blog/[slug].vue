<template>
	<DynamicPageRenderer :query="{ type: 'blog-post', slug: slug }" />
</template>

<script setup lang="ts">
import { computed } from "vue";

definePageMeta({
	key: "blog-post-page",
});

const route = useRoute();
const slug = computed(() => route.params.slug as string);
</script>
