<template>
	<span class="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs">
		<Icon
			v-if="icon"
			:name="icon"
			class="w-10! h-10!"
			aria-hidden="true"
		/>
		<slot>{{ text }}</slot>
		<span
			v-if="meta"
			class="opacity-60"
		>- {{ shortMeta }}</span>
	</span>
</template>

<script setup lang="ts">
const props = defineProps<{
	text?: string;
	icon?: string;
	meta?: Record<string, unknown>;
}>();

const shortMeta = computed(() => {
	try {
		return JSON.stringify(props.meta);
	}
	catch { return ""; }
});
</script>
