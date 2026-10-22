import { getEntry } from 'astro:content';

/** All short texts from content/site.yaml. */
export async function getSite() {
  return (await getEntry('site', 'site'))!.data;
}
