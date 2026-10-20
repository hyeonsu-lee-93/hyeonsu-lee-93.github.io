import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { parse } from 'yaml';

// YAML list loader that remembers each item's position in the file (`order`),
// so pages can show items exactly in the order they are written.
const ordered = (path: string) =>
  file(path, {
    parser: (text) =>
      (parse(text) as Record<string, unknown>[]).map((item, i) => ({ ...item, order: i })),
  });

// News: one Markdown file per item in src/content/news/
const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().optional(),
  }),
});

// Research topics: one Markdown file per topic in src/content/research/
const research = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/research' }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    period: z.string().optional(),
    image: z.string().optional(),
    caption: z.string().optional(),
    papers: z.array(z.string()).default([]),
  }),
});

// Publications, conferences and patents: all in src/data/publications.yaml
const publications = defineCollection({
  loader: ordered('src/data/publications.yaml'),
  schema: z.object({
    order: z.number(),
    type: z.enum(['journal', 'preprint', 'conference', 'patent']),
    title: z.string(),
    authors: z.string(),
    venue: z.string(),
    abbr: z.string().optional(),
    topic: z.string().optional(),
    year: z.number(),
    doi: z.string().optional(),
    url: z.string().optional(),
    code: z.string().optional(),
    note: z.string().optional(),
    scope: z.enum(['international', 'domestic']).optional(),
    selected: z.boolean().default(false),
    number: z.string().optional(),
    korean: z.string().optional(),
  }),
});

const profile = defineCollection({
  loader: file('src/data/profile.yaml'),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    affiliation: z.string(),
    affiliationUrl: z.string().optional(),
    location: z.string().optional(),
    website: z.string().optional(),
    tagline: z.string().optional(),
    emails: z.array(z.string()),
    links: z.array(z.object({ label: z.string(), url: z.string() })),
    interests: z.array(z.string()),
    skills: z.array(z.string()).default([]),
  }),
});

const education = defineCollection({
  loader: ordered('src/data/education.yaml'),
  schema: z.object({
    start: z.string(),
    end: z.string(),
    order: z.number(),
    degree: z.string(),
    field: z.string(),
    advisor: z.string().optional(),
    extra: z.array(z.string()).default([]),
    institution: z.string(),
    country: z.string().optional(),
  }),
});

const experience = defineCollection({
  loader: ordered('src/data/experience.yaml'),
  schema: z.object({
    start: z.string(),
    end: z.string(),
    order: z.number(),
    position: z.string(),
    advisor: z.string().optional(),
    organization: z.string(),
    bullets: z.array(z.string()).default([]),
  }),
});

const awards = defineCollection({
  loader: ordered('src/data/awards.yaml'),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    awarder: z.string(),
    year: z.number(),
  }),
});

export const collections = { news, research, publications, profile, education, experience, awards };
