<template>
	<Accordion
		type="single"
		collapsible
		class="w-full"
	>
		<AccordionItem
			v-for="item in items"
			:key="item.value"
			:value="item.value"
		>
			<AccordionTrigger>{{ item.title }}</AccordionTrigger>
			<AccordionContent>
				{{ item.content }}
			</AccordionContent>
		</AccordionItem>
	</Accordion>
</template>

<script setup lang="ts">
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

defineProps<{
	items: Array<{
		value: string;
		title: string;
		content: string;
	}>;
}>();
</script>
