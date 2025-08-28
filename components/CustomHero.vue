<template>
	<section class="rounded-2xl border p-6 grid gap-6 md:grid-cols-[1fr,320px] items-center">
		<div>
			<h2 class="text-2xl font-semibold">
				{{ title }}
			</h2>
			<p
				v-if="subtitle"
				class="opacity-70 mt-2"
			>
				{{ subtitle }}
			</p>
			<div
				v-if="$slots.default"
				class="mt-4"
			>
				<slot />
			</div>
		</div>

		<div
			v-if="image?.src"
			class="justify-self-center"
		>
			<NuxtImg
				:src="image.src"
				:alt="image.alt || title"
				:width="image.width || 640"
				:height="image.height || 360"
				class="rounded-xl border"
				sizes="(max-width: 1920px) 100vw, 1000px"
				format="webp"
				loading="lazy"
			/>
		</div>
	</section>
</template>

<script setup lang="ts">
defineProps<{
	title: string;
	subtitle?: string;
	image?: {
		src: string;
		alt?: string;
		width?: number;
		height?: number;
	} | null;
}>();
</script>
