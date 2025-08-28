import type { RUNTIME_TPL_CACHE_KEY } from "~/lib/constants";
import type { RenderFn } from "~/types/runtime-template";

type CachedRenderFunction = (Vue: typeof import("vue")) => RenderFn;

declare global {
	var __RUNTIME_TPL_CACHE__: Map<string, CachedRenderFunction> | undefined;

	interface Window {
		[RUNTIME_TPL_CACHE_KEY]?: Map<string, CachedRenderFunction>;
	}
}
