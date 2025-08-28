<template>
	<div class="flex items-center gap-2">
		<span class="text-xs opacity-60">Light</span>
		<Switch
			:key="checked ? 'dark' : 'light'"
			v-model="checked"
			aria-label="Toggle dark mode"
		/>
		<span class="text-xs opacity-60">Dark</span>
	</div>
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
