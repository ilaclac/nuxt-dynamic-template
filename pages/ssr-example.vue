<template>
	<section>
		<h1 class="text-2xl font-bold">
			SSR example
		</h1>
		<p class="opacity-70">
			This page always renders on the server.
		</p>
	</section>
</template>

<script setup lang="ts">
definePageMeta({ ssr: true });
</script>
