import { z } from "zod";

export const CardDataSchema = z.object({
	title: z.string().optional(),
	description: z.string().optional(),
	accent: z.enum(["neutral", "info", "success", "warning", "danger"]).optional().default("neutral"),
	cta: z.object({ label: z.string(), href: z.string() }).nullable().optional(),
	links: z.array(z.object({ label: z.string(), href: z.string() })).optional().default([]),
	stats: z.array(z.object({ label: z.string(), value: z.union([z.string(), z.number()]) })).optional().default([]),
});

export const TeamMemberSchema = z.object({
	name: z.string(),
	role: z.string(),
	avatarUrl: z.string().url(),
	bio: z.string(),
	socials: z.array(z.object({ icon: z.string(), href: z.string() })).optional(),
});

export const AccordionItemSchema = z.object({
	value: z.string(),
	title: z.string(),
	content: z.string(),
});
