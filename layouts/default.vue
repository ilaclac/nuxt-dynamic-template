<template>
	<div class="min-h-dvh">
		<header class="border-b border-slate-200 dark:border-slate-800">
			<div class="container mx-auto flex items-center justify-between p-4">
				<NuxtLink
					to="/"
					class="font-semibold p-2 hover:underline"
				>Home</NuxtLink>
				<nav class="flex items-center gap-4">
					<Button
						as-child
						variant="outline"
						class="h-8 px-3"
					>
						<NuxtLink
							to="/blog"
							class="hover:underline"
						>Blog</NuxtLink>
					</Button>
					<Button
						as-child
						variant="outline"
						class="h-8 px-3"
					>
						<NuxtLink
							to="/ssr-example"
							class="hover:underline"
						>SSR</NuxtLink>
					</Button>
					<Button
						as-child
						variant="outline"
						class="h-8 px-3"
					>
						<NuxtLink
							to="/ssg-example"
							class="hover:underline"
						>SSG</NuxtLink>
					</Button>

					<ThemeToggle />
				</nav>
			</div>
		</header>
		<main class="container mx-auto p-6">
			<slot />
		</main>
	</div>
</template>

<script setup lang="ts">

</script>
