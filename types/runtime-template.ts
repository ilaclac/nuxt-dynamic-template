import { z } from "zod";
import type { VNodeChild } from "vue";

export const CardScopeSchema = z.object({
	title: z.string(),
	description: z.string().optional(),
	accent: z.enum(["neutral", "info", "success", "warning", "danger"]).optional().default("neutral"),
	cta: z.object({ label: z.string(), href: z.string() }).nullable().optional(),
	links: z.array(z.object({ label: z.string(), href: z.string() })).optional().default([]),
	stats: z.array(z.object({ label: z.string(), value: z.union([z.string(), z.number()]) })).optional().default([]),
});

export type CardScope = z.infer<typeof CardScopeSchema>;

export const HeroScopeSchema = z.object({
	title: z.string(),
	subtitle: z.string().optional(),
	image: z.object({
		src: z.string().url(),
		alt: z.string().optional(),
		width: z.number().optional(),
		height: z.number().optional(),
	}).nullable().optional(),
});

export type HeroScope = z.infer<typeof HeroScopeSchema>;

export const BadgeScopeSchema = z.object({
	text: z.string(),
	icon: z.string().optional(),
});

export type BadgeScope = z.infer<typeof BadgeScopeSchema>;

export type TemplateKind = "card" | "hero" | "badge";

export type TemplateResponse = | { kind: "card"; template: string; scope: CardScope }
	| { kind: "hero"; template: string; scope: HeroScope }
	| { kind: "badge"; template: string; scope: BadgeScope };

export type RenderFn = (
	ctx: unknown,
	cache?: unknown,
	$props?: unknown,
	$setup?: unknown,
	$data?: unknown,
	$options?: unknown
) => VNodeChild;
