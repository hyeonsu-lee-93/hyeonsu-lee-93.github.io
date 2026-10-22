// Where every piece of editable text lives. All of it is in the top-level `content/` folder.
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

// content/site.yaml: one file with all short texts (profile, menu, headings, buttons)
const label = (fallback: string) => z.string().default(fallback);
const site = defineCollection({
  loader: file('content/site.yaml', { parser: (text) => ({ site: parse(text) }) }),
  schema: z.object({
    name: z.string(),
    display_name: z.string(),
    role: z.string(),
    affiliation: z.string(),
    affiliation_url: z.string().nullish(),
    location: z.string().nullish(),
    description: z.string().nullish(),
    highlight_author: z.string().nullish(),
    emails: z.array(z.string()).default([]),
    links: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
    interests: z.array(z.string()).default([]),
    skills: z.array(z.string()).default([]),
    google_analytics: z.string().nullish(),
    menu: z
      .object({ home: label('Home'), research: label('Research'), cv: label('CV') })
      .default({}),
    home: z
      .object({ cv_link: label('CV (PDF)'), news_title: label('Recent News') })
      .default({}),
    research: z
      .object({ title: label('Research'), representative_work: label('Representative work') })
      .default({}),
    cv: z
      .object({
        kicker: label('Curriculum Vitae'),
        download_button: label('Download PDF'),
        download_filename: label('CV.pdf'),
        advisor: label('Advisor'),
        research_interests: label('Research Interests'),
        education: label('Education'),
        experience: label('Research Experience'),
        journals: label('Journal Articles'),
        journal_legend: label('* equal contribution, † corresponding author'),
        preprints: label('Preprints'),
        selected_conferences: label('Selected Conference Presentations'),
        patents: label('Patents'),
        conferences: label('Conference Presentations'),
        international: label('International'),
        domestic: label('Domestic'),
        awards: label('Honors and Awards'),
        skills: label('Skills'),
        last_updated: label('Last updated'),
      })
      .default({}),
  }),
});

// content/home.md and content/research.md: longer intro paragraphs
const pages = defineCollection({
  loader: glob({ pattern: '{home,research}.md', base: './content' }),
});

// content/news/: one Markdown file per news item
const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().optional(),
  }),
});

// content/research/: one Markdown file per research topic
const research = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/research' }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    period: z.string().optional(),
    image: z.string().optional(),
    caption: z.string().optional(),
    papers: z.array(z.string()).default([]),
  }),
});

// content/cv/publications.yaml: journals, preprints, conferences and patents
const publications = defineCollection({
  loader: ordered('content/cv/publications.yaml'),
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

const education = defineCollection({
  loader: ordered('content/cv/education.yaml'),
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
  loader: ordered('content/cv/experience.yaml'),
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
  loader: ordered('content/cv/awards.yaml'),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    awarder: z.string(),
    year: z.number(),
  }),
});

export const collections = { site, pages, news, research, publications, education, experience, awards };
