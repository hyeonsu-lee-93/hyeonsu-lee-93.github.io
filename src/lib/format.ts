const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Bold the site owner's name (`highlight_author` in content/site.yaml) inside an author string. */
export function highlightAuthors(authors: string, me?: string | null): string {
  const escaped = authors
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  if (!me) return escaped;
  const re = new RegExp(`${escapeRe(me)}(?=[*,\\s†]|$)`, 'g');
  return escaped.replace(re, `<strong>${me}</strong>`);
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

/** "2018-02" -> "Feb 2018"; "" or "present" -> "Present" */
export function formatMonth(s?: string): string {
  if (!s || s === 'present') return 'Present';
  const [y, m] = s.split('-').map(Number);
  if (!m) return String(y);
  return new Date(y, m - 1, 1).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
}

/** Minimal inline Markdown for short titles: *italic* and **bold**. */
export function inlineMd(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');
}
