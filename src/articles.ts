// Articles published on the site, in French only. Each one is a Markdown file in
// src/articles/, read at build time. Only a small subset is supported: one title
// (# ), sections (## ), paragraphs (consecutive lines join), lists (- ) and links
// [text](url). Anything else fails the build rather than going live as raw text.
import { frenchSpaces } from './typography';
import agentsIaGoulot from './articles/agents-ia-goulot.md?raw';

export type Inline = string | { text: string; href: string };
export type Block = { kind: 'h2'; text: Inline[] } | { kind: 'p'; text: Inline[] } | { kind: 'ul'; items: Inline[][] };

export type ArticleContent = {
  slug: string;
  path: string;
  title: string;
  description: string;
  // ISO date for the structured data, and the month shown with the title.
  published: string;
  publishedLabel: string;
  publishedLabelEn: string;
  blocks: Block[];
  words: number;
};

const unsupported = /^(#{3,}\s|>|\d+[.)]\s|[*+]\s|```|\||<)|\*\*|__|!\[/;

function inline(text: string): Inline[] {
  return text
    .split(/(\[[^\]]+\]\([^)\s]+\))/)
    .filter(Boolean)
    .map((part) => {
      const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
      return link ? { text: frenchSpaces(link[1]), href: link[2] } : frenchSpaces(part);
    });
}

const plain = (parts: Inline[]) => parts.map((p) => (typeof p === 'string' ? p : p.text)).join('');

function parse(slug: string, markdown: string): { title: string; blocks: Block[] } {
  let title = '';
  const blocks: Block[] = [];
  let paragraph: string[] = [];
  const flush = () => {
    if (paragraph.length) blocks.push({ kind: 'p', text: inline(paragraph.join(' ')) });
    paragraph = [];
  };
  markdown.split('\n').forEach((raw, i) => {
    const line = raw.trim();
    if (unsupported.test(line)) throw new Error(`${slug}.md line ${i + 1}: unsupported Markdown: ${line.slice(0, 60)}`);
    if (!line) return flush();
    if (line.startsWith('# ')) {
      if (title) throw new Error(`${slug}.md line ${i + 1}: a second "# " title`);
      flush();
      title = frenchSpaces(line.slice(2));
    } else if (line.startsWith('## ')) {
      flush();
      blocks.push({ kind: 'h2', text: inline(line.slice(3)) });
    } else if (line.startsWith('- ')) {
      flush();
      const last = blocks[blocks.length - 1];
      if (last?.kind === 'ul') last.items.push(inline(line.slice(2)));
      else blocks.push({ kind: 'ul', items: [inline(line.slice(2))] });
    } else paragraph.push(line);
  });
  flush();
  if (!title) throw new Error(`${slug}.md: an article needs a "# " title`);
  return { title, blocks };
}

function countWords(title: string, blocks: Block[]): number {
  const texts = [title, ...blocks.flatMap((b) => (b.kind === 'ul' ? b.items.map(plain) : [plain(b.text)]))];
  return texts.join(' ').split(/\s+/).filter((w) => /\p{L}|\d/u.test(w)).length;
}

type Meta = { description: string; published: string; publishedLabel: string; publishedLabelEn: string };

function article(slug: string, markdown: string, meta: Meta): ArticleContent {
  const { title, blocks } = parse(slug, markdown);
  return { ...meta, slug, path: `/fr/articles/${slug}/`, title, blocks, words: countWords(title, blocks), description: frenchSpaces(meta.description) };
}

export const articles: ArticleContent[] = [
  article('agents-ia-goulot', agentsIaGoulot, {
    description:
      "Avec des agents IA qui codent en parallèle, le goulot n'est plus le code mais les décisions : une file unique, un périmètre fixé avant le code, des garde-fous déterministes.",
    published: '2026-11-25',
    publishedLabel: 'Novembre 2026',
    publishedLabelEn: 'November 2026',
  }),
];
