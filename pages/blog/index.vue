<template>
	<div class="space-y-8">
		<h1 class="text-4xl font-bold">
			The Blog
		</h1>
		<p class="text-lg text-muted-foreground">
			Articles:
		</p>

		<div v-if="pending">
			Loading articles...
		</div>
		<div v-else-if="error">
			Could not load articles.
		</div>

		<div
			v-else-if="posts"
			class="grid gap-6"
		>
			<div
				v-for="post in posts"
				:key="post.slug"
			>
				<NuxtLink :to="`/blog/${post.slug}`">
					<Card class="transition-all hover:border-primary hover:shadow-lg">
						<CardHeader>
							<CardTitle>{{ post.title }}</CardTitle>
							<CardDescription class="pt-2">{{ post.summary }}</CardDescription>
						</CardHeader>
					</Card>
				</NuxtLink>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const { data: posts, pending, error } = await useAsyncData("blog-list", () =>
	$fetch<Array<{ slug: string; title: string; summary: string }>>("/api/template", {
		query: { type: "blog-list" },
	}),
);
</script>
