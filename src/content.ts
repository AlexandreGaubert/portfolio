// Every word of the site, in both languages. Published under Alexandre's name:
// nothing internal to a former employer, nothing that his CV does not say.

export type Lang = 'en' | 'fr';

export const SITE_URL = 'https://alexandre-gaubert.fr';
export const EMAIL = 'alexandre2.gaubert@gmail.com';
export const LINKEDIN = 'https://www.linkedin.com/in/alexandre-gaubert';

// The CV link stays hidden until Alexandre validates his new CV; then set the
// path of each PDF (put in public/) and the buttons appear.
export const CV: Record<Lang, string | null> = { en: null, fr: null };

type Work = { title: string; text: string; stack: string };
type Job = { when: string; title: string; text: string };
type Article = { title: string; url: string; meta: string };

export type Content = {
  path: string;
  htmlLang: string;
  ogLocale: string;
  title: string;
  description: string;
  nav: { work: string; experience: string; writing: string; contact: string; switchLabel: string };
  role: string;
  lede: string;
  status: string;
  emailMe: string;
  downloadCv: string;
  work: { heading: string; sub: string; items: Work[] };
  experience: { heading: string; jobs: Job[] };
  skills: string[];
  agents: { heading: string; paragraphs: string[] };
  writing: { heading: string; sub: string; read: string; articles: Article[] };
  contact: { heading: string };
  photoAlt: string;
};

const articles = {
  support: 'https://www.linkedin.com/pulse/lia-devait-remplacer-le-support-client-elle-est-en-train-gaubert-i7ihe/',
  providers: 'https://www.linkedin.com/pulse/les-fournisseurs-dia-vont-perdre-leurs-meilleurs-clients-gaubert-eilde/',
};

const skills = ['React', 'TypeScript', 'TanStack Query', 'TanStack Router', 'Vite', 'Playwright', 'Vitest'];
const support = "L'IA devait remplacer le support client. Elle est en train de le rendre invivable.";

// French typography: a narrow no-break space before « : ; ! ? » and inside « 157 k ».
function frenchSpaces<T>(value: T): T {
  if (typeof value === 'string') return value.replace(/ ([:;!?])/g, '\u202f$1').replace(/(\d) k\b/g, '$1\u202fk') as T;
  if (Array.isArray(value)) return value.map(frenchSpaces) as T;
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, frenchSpaces(v)])) as T;
  return value;
}

export const content: Record<Lang, Content> = {
  en: {
    path: '/',
    htmlLang: 'en',
    ogLocale: 'en_US',
    title: 'Alexandre Gaubert · Senior Product Engineer, React & TypeScript',
    description:
      'Senior Product Engineer, 7 years of React and TypeScript. I ship features end to end with AI agents. Open to senior frontend roles, remote or near Rennes.',
    nav: { work: 'Work', experience: 'Experience', writing: 'Writing', contact: 'Contact', switchLabel: 'Lire en français' },
    role: 'Senior Product Engineer, AI-first',
    lede: 'Seven years of React and TypeScript on SaaS products. I ship features end to end with AI agents writing much of the code, under my review.',
    status: 'Open to senior frontend and product engineering roles · remote, or hybrid near Rennes',
    emailMe: 'Email me',
    downloadCv: 'Download CV (PDF)',
    work: {
      heading: 'Selected work',
      sub: 'Four years at Mergify, building the dashboard engineering teams use to merge code safely.',
      items: [
        {
          title: 'Shipped an LLM feature to every user',
          text: 'Built the first version of Fix with Mergify: it repairs an invalid configuration file and opens the fix as a pull request. Released in 2026.',
          stack: 'React, TypeScript, Python',
        },
        {
          title: 'Moved the React dashboard to TypeScript and TanStack Router',
          text: 'Introduced TypeScript to the dashboard, then led its migration to TanStack Router.',
          stack: 'TypeScript, TanStack Router',
        },
        {
          title: 'Brought end-to-end testing to the dashboard',
          text: 'Introduced end-to-end tests with Cypress, then did most of the move to Playwright.',
          stack: 'Cypress, Playwright',
        },
        {
          title: 'Worked across the product',
          text: 'Merge queue, CI Insights, Test Engine and workflow automation, from the dashboard to the browser extension.',
          stack: 'React, TanStack Query, ECharts',
        },
      ],
    },
    experience: {
      heading: 'Experience',
      jobs: [
        { when: '2022 – 2026', title: 'Senior Frontend Engineer · Mergify', text: 'Merge queue and CI tooling for engineering teams.' },
        { when: '2019 – 2022', title: 'Frontend Engineer · Cegid', text: 'Tax management applications for businesses, in React, TypeScript and Redux.' },
        { when: '2015 – 2018', title: 'EPITECH · education', text: 'Computer science studies.' },
      ],
    },
    skills: [...skills, 'AI agents'],
    agents: {
      heading: 'How I work with agents',
      paragraphs: [
        'For my own projects I built a tool that runs several agents in parallel, each in its own git worktree. Every plan, mockup and draft pull request comes back to me as a decision.',
      ],
    },
    writing: {
      heading: 'Writing',
      sub: 'Articles on AI, published on LinkedIn, in French.',
      read: 'Read on LinkedIn',
      articles: [
        { title: "Les fournisseurs d'IA vont perdre leurs meilleurs clients", url: articles.providers, meta: '157k impressions on the post' },
        { title: support, url: articles.support, meta: '231k impressions on the post' },
      ],
    },
    contact: { heading: 'Contact' },
    photoAlt: 'Portrait of Alexandre Gaubert',
  },
  fr: frenchSpaces({
    path: '/fr/',
    htmlLang: 'fr',
    ogLocale: 'fr_FR',
    title: 'Alexandre Gaubert · Senior Product Engineer, React et TypeScript',
    description:
      'Senior Product Engineer, 7 ans de React et TypeScript. Je livre des fonctionnalités avec des agents IA. Ouvert à un poste frontend senior, remote ou Rennes.',
    nav: { work: 'Réalisations', experience: 'Parcours', writing: 'Articles', contact: 'Contact', switchLabel: 'Read in English' },
    role: 'Senior Product Engineer, AI-first',
    lede: "Sept ans de React et TypeScript sur des produits SaaS. Je livre des fonctionnalités de bout en bout avec des agents IA qui écrivent une grande partie du code, sous ma relecture.",
    status: 'Ouvert à un poste senior en frontend ou product engineering · remote, ou hybride près de Rennes',
    emailMe: "M'écrire",
    downloadCv: 'Télécharger mon CV (PDF)',
    work: {
      heading: 'Réalisations',
      sub: "Quatre ans chez Mergify, sur le dashboard que les équipes d'ingénierie utilisent pour merger leur code sans risque.",
      items: [
        {
          title: 'Une fonctionnalité LLM livrée à tous les utilisateurs',
          text: "J'ai construit la première version de Fix with Mergify : elle répare un fichier de configuration invalide et propose la correction en pull request. Sortie en 2026.",
          stack: 'React, TypeScript, Python',
        },
        {
          title: 'TypeScript et TanStack Router dans le dashboard React',
          text: "J'ai introduit TypeScript dans le dashboard, puis mené sa migration vers TanStack Router.",
          stack: 'TypeScript, TanStack Router',
        },
        {
          title: 'Des tests end-to-end au quotidien',
          text: "J'ai introduit les tests end-to-end avec Cypress, puis fait l'essentiel du passage à Playwright.",
          stack: 'Cypress, Playwright',
        },
        {
          title: "Sur l'ensemble du produit",
          text: "Merge queue, CI Insights, Test Engine et automatisation des workflows, du dashboard jusqu'à l'extension navigateur.",
          stack: 'React, TanStack Query, ECharts',
        },
      ],
    },
    experience: {
      heading: 'Parcours',
      jobs: [
        { when: '2022 – 2026', title: 'Senior Frontend Engineer · Mergify', text: "Merge queue et outils de CI pour les équipes d'ingénierie." },
        { when: '2019 – 2022', title: 'Frontend Engineer · Cegid', text: 'Applications de gestion fiscale pour les entreprises, en React, TypeScript et Redux.' },
        { when: '2015 – 2018', title: 'EPITECH · formation', text: 'Études en informatique.' },
      ],
    },
    skills: [...skills, 'Agents IA'],
    agents: {
      heading: 'Comment je travaille avec les agents',
      paragraphs: [
        "Pour mes projets personnels, j'ai construit un outil qui fait travailler plusieurs agents en parallèle, chacun dans son propre worktree git. Chaque plan, maquette et pull request en draft me revient sous forme de décision.",
      ],
    },
    writing: {
      heading: 'Articles',
      sub: "Des articles sur l'IA, publiés sur LinkedIn.",
      read: 'Lire sur LinkedIn',
      articles: [
        { title: "Les fournisseurs d'IA vont perdre leurs meilleurs clients", url: articles.providers, meta: '157 k impressions sur le post' },
        { title: support, url: articles.support, meta: '231 k impressions sur le post' },
      ],
    },
    contact: { heading: 'Contact' },
    photoAlt: "Portrait d'Alexandre Gaubert",
  }),
};
