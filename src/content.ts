// Every word of the site, in both languages. Published under Alexandre's name:
// nothing internal to a former employer, nothing that his CV does not say.

import { articles as siteArticles } from './articles';
import { frenchSpaces } from './typography';

export type Lang = 'en' | 'fr';

export const SITE_URL = 'https://alexandre-gaubert.fr';
export const EMAIL = 'alexandre2.gaubert@gmail.com';
export const LINKEDIN = 'https://www.linkedin.com/in/alexandre-gaubert';

// The CV Alexandre validated, one PDF per language, in public/. Set an entry to
// null to hide its buttons.
export const CV: Record<Lang, string | null> = { en: '/Alexandre-Gaubert-CV-EN.pdf', fr: '/Alexandre-Gaubert-CV-FR.pdf' };

type Work = { title: string; text: string; stack: string };
type Job = { when: string; title: string; text: string };
type Article = { title: string; url: string; meta: string; read?: string };

export type Content = {
  path: string;
  htmlLang: string;
  ogLocale: string;
  title: string;
  description: string;
  nav: { work: string; experience: string; writing: string; contact: string; switchLabel: string };
  role: string;
  lede: string;
  // The status line, with a link to the freelance page in the middle.
  status: { before: string; link: string; after: string };
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

// The article published on this site, in French; src/articles.ts holds its text.
const [onSite] = siteArticles;

const skills = ['React', 'TypeScript', 'Python', 'TanStack Query', 'TanStack Router', 'Playwright', 'Vitest'];
const support = "L'IA devait remplacer le support client. Elle est en train de le rendre invivable.";


export const content: Record<Lang, Content> = {
  en: {
    path: '/',
    htmlLang: 'en',
    ogLocale: 'en_US',
    title: 'Alexandre Gaubert · Senior Product Engineer, Fullstack React, TypeScript & Python',
    description:
      'Fullstack engineer: 7 years of React and TypeScript, backend experience at Mergify with Python and APIs, AI agent orchestration. Open to fullstack and product engineering roles, full remote or hybrid in Rennes.',
    nav: { work: 'Work', experience: 'Experience', writing: 'Writing', contact: 'Contact', switchLabel: 'Lire en français' },
    role: 'Senior Product Engineer, AI-first',
    lede: 'Fullstack engineer with 7 years of React and TypeScript on SaaS products, from frontend architecture to test strategy. Backend experience at Mergify with Python and APIs. As a personal project, I designed an engineering system where a fleet of AI agents plans, codes, tests and ships in parallel, within automated guardrails.',
    status: { before: 'Open to fullstack and product engineering roles, or to a ', link: 'freelance contract', after: ' · Full remote, hybrid possible in Rennes' },
    emailMe: 'Email me',
    downloadCv: 'Download CV (PDF)',
    work: {
      heading: 'Selected work',
      sub: 'Four years at Mergify, building the dashboard engineering teams use to merge code safely.',
      items: [
        {
          title: 'TypeScript and TanStack Router in the React dashboard',
          text: 'Introduced TypeScript to the dashboard and migrated it to TanStack Router.',
          stack: 'TypeScript, TanStack Router',
        },
        {
          title: "The dashboard's end-to-end tests",
          text: "Wrote the dashboard's end-to-end tests, first in Cypress, then Playwright.",
          stack: 'Cypress, Playwright',
        },
        {
          title: 'Worked across the product',
          text: 'Shipped features across the merge queue and CI Insights.',
          stack: 'React, TanStack Query, ECharts',
        },
      ],
    },
    experience: {
      heading: 'Experience',
      jobs: [
        { when: '2022 – 2026', title: 'Senior Frontend Engineer · Mergify', text: 'Merge queue and CI tooling for engineering teams. Delivered product-focused backend projects end to end; Python development and API work.' },
        { when: '2019 – 2022', title: 'Frontend Engineer · Cegid', text: 'Tax management applications for businesses, in React, TypeScript and Redux.' },
        { when: '2015 – 2018', title: 'EPITECH · education', text: 'Computer science studies.' },
      ],
    },
    skills: [...skills, 'AI agents'],
    agents: {
      heading: 'AI agent orchestration cockpit',
      paragraphs: [
        'Personal project, 2026 – present',
        'Desktop app · Electron, React, TypeScript, Claude Agent SDK',
        'Runs a fleet of Claude Code agents in parallel: manager agents split each project into workstreams and launch workers, each in its own git worktree and branch.',
        "A single queue surfaces only the human's decisions (plans, product trade-offs, release calls), with options and a recommendation; orphaned requests are relaunched, pull requests verified in production.",
        'Guardrails: scope set before any code by an agent blind to the implementation; adversarial review by a separate agent; a test only counts once seen failing; Claude Code hooks block destructive git commands.',
        'Operations: incidents shared across agents, then fixed in the tooling; token cost measured per session.',
      ],
    },
    writing: {
      heading: 'Writing',
      sub: 'On LinkedIn: 5 articles and 19 posts on AI (mostly in French), 530k impressions in total, up to 231k for one article',
      read: 'Read on LinkedIn',
      articles: [
        { title: onSite.title, url: onSite.path, meta: `${onSite.publishedLabelEn} · in French`, read: 'Read the article' },
        { title: "Les fournisseurs d'IA vont perdre leurs meilleurs clients", url: articles.providers, meta: '157k impressions' },
        { title: support, url: articles.support, meta: '231k impressions' },
      ],
    },
    contact: { heading: 'Contact' },
    photoAlt: 'Portrait of Alexandre Gaubert',
  },
  fr: frenchSpaces({
    path: '/fr/',
    htmlLang: 'fr',
    ogLocale: 'fr_FR',
    title: 'Alexandre Gaubert · Senior Product Engineer, Fullstack React, TypeScript & Python',
    description:
      'Ingénieur fullstack : 7 ans de React et TypeScript, expérience backend chez Mergify en Python et sur l\'API, orchestration d\'agents IA. Ouvert à un poste fullstack ou product engineering, full remote ou hybride à Rennes.',
    nav: { work: 'Réalisations', experience: 'Parcours', writing: 'Articles', contact: 'Contact', switchLabel: 'Read in English' },
    role: 'Senior Product Engineer, AI-first',
    lede: "Ingénieur fullstack, 7 ans de React et TypeScript sur des produits SaaS, de l'architecture front à la stratégie de test. Expérience backend chez Mergify, en Python et sur l'API. En projet personnel, j'ai conçu un système d'ingénierie où une flotte d'agents IA planifie, code, teste et livre en parallèle, encadrée par des garde-fous automatisés.",
    status: { before: 'Ouvert à un poste fullstack ou product engineering, ou à une ', link: 'mission freelance', after: ' · Full remote, hybride possible à Rennes' },
    emailMe: "M'écrire",
    downloadCv: 'Télécharger mon CV (PDF)',
    work: {
      heading: 'Réalisations',
      sub: "Quatre ans chez Mergify, sur le dashboard que les équipes d'ingénierie utilisent pour merger leur code sans risque.",
      items: [
        {
          title: 'TypeScript et TanStack Router dans le dashboard React',
          text: "J'ai introduit TypeScript dans le dashboard, puis l'ai migré vers TanStack Router.",
          stack: 'TypeScript, TanStack Router',
        },
        {
          title: 'Les tests end-to-end du dashboard',
          text: "J'ai écrit les tests end-to-end du dashboard, avec Cypress puis Playwright.",
          stack: 'Cypress, Playwright',
        },
        {
          title: "Sur l'ensemble du produit",
          text: "Des fonctionnalités livrées sur la merge queue et CI Insights.",
          stack: 'React, TanStack Query, ECharts',
        },
      ],
    },
    experience: {
      heading: 'Parcours',
      jobs: [
        { when: '2022 – 2026', title: 'Senior Frontend Engineer · Mergify', text: "Merge queue et outils de CI pour les équipes d'ingénierie. Livraison de bout en bout de projets backend orientés produit ; développement Python et interventions sur l'API." },
        { when: '2019 – 2022', title: 'Frontend Engineer · Cegid', text: 'Applications de gestion fiscale pour les entreprises, en React, TypeScript et Redux.' },
        { when: '2015 – 2018', title: 'EPITECH · formation', text: 'Études en informatique.' },
      ],
    },
    skills: [...skills, 'Agents IA'],
    agents: {
      heading: "Cockpit d'orchestration d'agents\u00a0IA",
      paragraphs: [
        'Projet personnel, depuis 2026',
        'App desktop · Electron, React, TypeScript, Claude Agent SDK',
        "Orchestre en parallèle une flotte d'agents Claude Code : des agents managers découpent chaque projet en chantiers et lancent des workers, chacun dans son worktree git et sa branche.",
        "Une file unique ne remonte à l'humain que ses décisions (plans, arbitrages produit, mises en production), avec options et recommandation ; demandes orphelines relancées, pull requests vérifiées en production.",
        "Garde-fous : périmètre fixé avant le code par un agent qui ignore l'implémentation ; revue adverse par un agent séparé ; un test ne compte qu'une fois vu échouer ; des hooks Claude Code bloquent les commandes git destructrices.",
        'Exploitation : incidents partagés entre agents puis corrigés dans l\'outillage ; coût en tokens mesuré par session.',
      ],
    },
    writing: {
      heading: 'Articles',
      sub: "Sur LinkedIn : 5 articles et 19 posts sur l'IA, 530 k impressions au total, jusqu'à 231 k pour un article",
      read: 'Lire sur LinkedIn',
      articles: [
        { title: onSite.title, url: onSite.path, meta: onSite.publishedLabel, read: "Lire l'article" },
        { title: "Les fournisseurs d'IA vont perdre leurs meilleurs clients", url: articles.providers, meta: '157 k impressions' },
        { title: support, url: articles.support, meta: '231 k impressions' },
      ],
    },
    contact: { heading: 'Contact' },
    photoAlt: "Portrait d'Alexandre Gaubert",
  }),
};

// The freelance page, /freelance/ and /fr/freelance/: what a recruiter or a
// client needs before proposing a contract. The day rate and the start date
// are the ones Alexandre announces everywhere else.
type Mission = { title: string; text: string; stack: string };

export type FreelanceContent = {
  path: string;
  title: string;
  description: string;
  nav: { missions: string; experience: string; contact: string };
  role: string;
  lede: string;
  status: string;
  propose: string;
  mailSubject: string;
  missions: { heading: string; sub: string; items: Mission[] };
  experience: { heading: string; jobs: Job[] };
  agents: { heading: string; intro: string; points: string[]; more: { before: string; link: string; href: string } };
  contact: { heading: string; sub: string };
};

// The offer, written once: the visible text and the structured data both read it.
export const OFFER = { dayRate: 450, currency: 'EUR', availableFrom: '2027-01-04' };
const rate = OFFER.dayRate;

export const freelance: Record<Lang, FreelanceContent> = {
  en: {
    path: '/freelance/',
    title: 'Freelance senior fullstack React developer, Rennes and remote · Alexandre Gaubert',
    description:
      `Freelance senior fullstack React developer: day rate €${rate} excl. VAT, available early January 2027, full remote or hybrid in Rennes. 7 years of React and TypeScript, four of them at Mergify.`,
    nav: { missions: 'Contracts', experience: 'Experience', contact: 'Contact' },
    role: 'Senior fullstack developer, React and TypeScript, freelance',
    lede: "I'm a React and TypeScript product engineer: I ship features end to end, alongside your product team. 7 years on SaaS products, four of them at Mergify.",
    status: `Day rate €${rate} excl. VAT · Available early January 2027 · Full remote or hybrid in Rennes`,
    propose: 'Propose a contract',
    mailSubject: 'Freelance contract – via alexandre-gaubert.fr',
    missions: {
      heading: 'What I do on a contract',
      sub: 'Joining a product team, on an existing React frontend.',
      items: [
        { title: 'Ship features end to end', text: 'Components, state, data fetching and tests on the React side, and the API that goes with them on the backend.', stack: 'React, TypeScript, TanStack Query, Python' },
        { title: 'Modernize an existing frontend', text: 'Bring TypeScript into a JavaScript codebase, migrate the routing or the state management.', stack: 'TypeScript, TanStack Router, Zustand' },
        { title: 'Set up the frontend test strategy', text: 'End-to-end, integration and unit tests, from CI to code review.', stack: 'Playwright, Cypress, Vitest' },
        { title: 'Grow a design system', text: 'Build and evolve the shared components with your UX designer.', stack: 'React, TypeScript' },
      ],
    },
    experience: {
      heading: 'Experience',
      jobs: [
        { when: '2022 – 2026', title: 'Senior Frontend Engineer · Mergify', text: 'Features across the merge queue and CI Insights, design system, frontend test strategy, backend projects in Python.' },
        content.en.experience.jobs[1],
      ],
    },
    agents: {
      heading: 'With AI agents',
      intro: 'As a personal project, I designed an engineering system where a fleet of AI agents plans, codes, tests and ships in parallel, within automated guardrails:',
      points: [
        'a second agent tries to refute every non-trivial change;',
        'a test only counts once seen failing;',
        'Claude Code hooks block destructive git commands.',
      ],
      more: { before: 'How it works, in French: ', link: onSite.title, href: onSite.path },
    },
    contact: { heading: 'A React or TypeScript contract?', sub: 'Tell me the context, the length, the location and the start date.' },
  },
  fr: frenchSpaces({
    path: '/fr/freelance/',
    title: 'Développeur fullstack React freelance senior, Rennes et remote · Alexandre Gaubert',
    description:
      `Développeur fullstack React freelance senior : TJM ${rate} € HT, disponible début janvier 2027, full remote ou hybride à Rennes. 7 ans de React et TypeScript, dont quatre chez Mergify.`,
    nav: { missions: 'Missions', experience: 'Parcours', contact: 'Contact' },
    role: 'Développeur fullstack senior, React et TypeScript, en freelance',
    lede: 'Je suis product engineer React et TypeScript : je livre des fonctionnalités de bout en bout, en renfort de votre équipe produit. 7 ans sur des produits SaaS, dont quatre chez Mergify.',
    status: `TJM ${rate} € HT par jour · Disponible début janvier 2027 · Full remote ou hybride à Rennes`,
    propose: 'Proposer une mission',
    mailSubject: 'Mission freelance – via alexandre-gaubert.fr',
    missions: {
      heading: 'Ce que je fais en mission',
      sub: "En renfort d'une équipe produit, sur un front React existant.",
      items: [
        { title: 'Livrer des fonctionnalités de bout en bout', text: "Composants, état, appels et tests côté React, et l'API qui va avec côté backend.", stack: 'React, TypeScript, TanStack Query, Python' },
        { title: 'Moderniser un front existant', text: "Introduire TypeScript dans une base JavaScript, migrer le routing ou la gestion d'état.", stack: 'TypeScript, TanStack Router, Zustand' },
        { title: 'Poser la stratégie de test du front', text: "Tests end-to-end, d'intégration et unitaires, de la CI à la revue de code.", stack: 'Playwright, Cypress, Vitest' },
        { title: 'Faire vivre un design system', text: 'Construire et faire évoluer les composants partagés avec votre UX designer.', stack: 'React, TypeScript' },
      ],
    },
    experience: {
      heading: 'Parcours',
      jobs: [
        { when: '2022 – 2026', title: 'Senior Frontend Engineer · Mergify', text: 'Fonctionnalités sur la merge queue et CI Insights, design system, stratégie de test du front, projets backend en Python.' },
        content.fr.experience.jobs[1],
      ],
    },
    agents: {
      heading: 'Avec des agents IA',
      intro: "En projet personnel, j'ai conçu un système d'ingénierie où une flotte d'agents IA planifie, code, teste et livre en parallèle, encadrée par des garde-fous automatisés :",
      points: [
        'un second agent cherche à réfuter chaque changement non trivial ;',
        "un test ne compte qu'une fois vu échouer ;",
        'des hooks Claude Code bloquent les commandes git destructrices.',
      ],
      more: { before: 'Comment ça marche : ', link: onSite.title, href: onSite.path },
    },
    contact: { heading: 'Une mission React ou TypeScript ?', sub: 'Dites-moi le contexte, la durée, le lieu et la date de démarrage.' },
  }),
};
