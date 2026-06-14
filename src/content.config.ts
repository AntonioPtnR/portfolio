import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const educationCollection = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/education" }),
	schema: z.object({
		title: z.string(),
		institution: z.string(),
		period: z.string(),
		description: z.string().optional(),
		tags: z.array(z.string()).default([]),
		order: z.number().default(99),
		lang: z.enum(["es", "en", "ca"]).default("es"),
	}),
});

const experienceCollection = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/experience" }),
	schema: z.object({
		role: z.string(),
		company: z.string(),
		period: z.string(),
		description: z.string(),
		highlights: z.array(z.string()).default([]),
		tech: z.array(z.string()).default([]),
		order: z.number().default(99),
		lang: z.enum(["es", "en", "ca"]).default("es"),
	}),
});

const projectsCollection = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		tech: z.array(z.string()).default([]),
		category: z.string().optional(),
		demoUrl: z.string().optional(),
		repoUrl: z.string().optional(),
		image: z.string().optional(),
		imageAlt: z.string().optional(),
		featured: z.boolean().default(false),
		order: z.number().default(99),
		lang: z.enum(["es", "en", "ca"]).default("es"),
	}),
});

export const collections = {
	education: educationCollection,
	experience: experienceCollection,
	projects: projectsCollection,
};
