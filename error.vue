<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const error = useError();
useHead({ meta: [{ name: "robots", content: "noindex" }] });
useSeoMeta({ title: "Page not found" });

const hasError = computed(() => !!error.value);
const is404 = computed(() => error.value?.statusCode === 404);
const title = computed(() => (is404.value ? "Page not found" : "Something went wrong"));
const detail = computed(() => error.value?.statusMessage || error.value?.message || "An unexpected error occurred.");

const goHome = () => clearError({ redirect: "/" });
const goBlog = () => clearError({ redirect: "/blog" });
</script>

<template>
	<div
		v-if="hasError"
		class="min-h-[70vh] grid place-items-center p-6"
	>
		<Card class="max-w-xl w-full border">
			<CardHeader>
				<CardTitle class="flex items-center gap-3">
					<span class="text-3xl font-bold">{{ error?.statusCode }}</span>
					<span class="text-lg opacity-80">{{ title }}</span>
				</CardTitle>
			</CardHeader>
			<CardContent class="space-y-3">
				<p class="opacity-80">
					{{ detail }}
				</p>
				<pre
					v-if="error?.stack"
					class="mt-2 max-h-48 overflow-auto rounded-md bg-muted p-3 text-xs"
				>{{ error.stack }}</pre>
			</CardContent>
			<CardFooter class="flex gap-2">
				<Button @click="goHome">
					Go home
				</Button>
				<Button
					variant="outline"
					@click="goBlog"
				>
					Open blog
				</Button>
			</CardFooter>
		</Card>
	</div>
</template>
