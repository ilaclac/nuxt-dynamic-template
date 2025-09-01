<template>
	<Card class="text-center">
		<CardContent class="pt-6">
			<Avatar class="mx-auto h-24 w-24 border-2 border-primary/20">
				<AvatarImage
					:src="avatarUrl"
					:alt="name"
				/>
				<AvatarFallback>{{ name.charAt(0) }}</AvatarFallback>
			</Avatar>
			<h3 class="mt-4 text-xl font-semibold">
				{{ name }}
			</h3>
			<p class="mt-1 text-primary">
				{{ role }}
			</p>
			<p class="mt-3 text-sm text-muted-foreground">
				{{ bio }}
			</p>
		</CardContent>
		<CardFooter
			v-if="socials?.length"
			class="justify-center gap-2"
		>
			<Button
				v-for="social in socials"
				:key="social.href"
				as-child
				variant="outline"
				size="icon"
			>
				<NuxtLink
					:to="social.href"
					target="_blank"
				>
					<Icon
						:name="social.icon"
						class="h-4 w-4"
					/>
				</NuxtLink>
			</Button>
		</CardFooter>
	</Card>
</template>

<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

defineProps<{
	name: string;
	role: string;
	avatarUrl: string;
	bio: string;
	socials?: Array<{ icon: string; href: string }>;
}>();
</script>
