<script setup lang="ts">
import * as VueRuntime from "vue";
import { compile, type CompilerOptions } from "@vue/compiler-dom";
import {
	defineComponent,
	shallowRef,
	watch,
	markRaw,
	type Component,
} from "vue";
import { RUNTIME_TPL_CACHE_KEY } from "~/lib/constants";
import type { RenderFn } from "~/types/runtime-template";

type Scope = Record<string, unknown>;
type RenderFactory = (Vue: typeof import("vue")) => RenderFn;

const props = withDefaults(defineProps<{
	template: string;
	scope?: Scope;
	components?: Record<string, Component>;
	cache?: boolean;
}>(), {
	cache: true,
});

const global = globalThis as Record<string, unknown>;
if (!(RUNTIME_TPL_CACHE_KEY in global)) {
	global[RUNTIME_TPL_CACHE_KEY] = new Map<string, RenderFactory>();
}
const CACHE = global[RUNTIME_TPL_CACHE_KEY] as Map<string, RenderFactory>;

const runtimeComp = shallowRef<Component | null>(null);
const errorMsg = shallowRef<string | null>(null);

const compilerOptions: CompilerOptions = {
	mode: "function",
	whitespace: "condense",
	onError(err) {
		console.error("[RuntimeTemplate compile error]", err);
	},
};

function compileTemplate(templateData: string, useCache: boolean) {
	if (useCache) {
		const cached = CACHE.get(templateData);
		if (cached) return cached;
	}

	const { code } = compile(templateData, compilerOptions);

	const renderFactory = new Function("Vue", `${code}; return render`) as RenderFactory;

	if (useCache) CACHE.set(templateData, renderFactory);
	return renderFactory;
}

function buildComponent(templateData: string) {
	if (import.meta.server) return;

	if (!templateData) {
		runtimeComp.value = null;
		errorMsg.value = null;
		return;
	}

	try {
		errorMsg.value = null;

		const renderFactory = compileTemplate(templateData, props.cache);
		const render = renderFactory(VueRuntime);

		const Host = defineComponent({
			name: "RuntimeRender",
			components: props.components ?? {},
			props: {
				scope: { type: Object, default: () => ({}) },
			},
			setup(props) {
				const cache: unknown[] = [];

				return () => {
					return render(props.scope, cache);
				};
			},
		});

		runtimeComp.value = markRaw(Host);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	catch (e: any) {
		console.error("[RuntimeTemplate build error]", e);
		errorMsg.value = e?.message || String(e);
		runtimeComp.value = null;
	}
}

// Only rebuild when the template string or allow-list changes.
// (Scope updates are handled via a prop into the host component.)
if (import.meta.client) {
	watch(
		() => [props.template, props.components],
		() => buildComponent(props.template),
		{ immediate: true },
	);
}
</script>

<template>
	<div>
		<div
			v-if="errorMsg"
			class="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-800"
		>
			Runtime template error: {{ errorMsg }}
		</div>

		<component
			:is="runtimeComp"
			v-else-if="runtimeComp"
			:scope="props.scope"
		/>

		<div
			v-else
			class="text-sm opacity-60"
		>
			No template
		</div>
	</div>
</template>
