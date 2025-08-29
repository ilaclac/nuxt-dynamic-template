<template>
	<ClientOnly>
		<div class="flex items-center gap-2">
			<span class="text-xs opacity-60">Light</span>
			<Switch
				v-model="checked"
				aria-label="Toggle dark mode"
			/>
			<span class="text-xs opacity-60">Dark</span>
		</div>

		<template #fallback>
			<div class="h-[1.15rem] w-28 opacity-0" />
		</template>
	</ClientOnly>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useUiStore } from "~/stores/ui";

const ui = useUiStore();
const checked = computed({
	get: () => ui.isDark,
	set: (val: boolean) => ui.setTheme(val ? "dark" : "light"),
});
</script>
