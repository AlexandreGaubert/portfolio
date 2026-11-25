# alexandre-gaubert.fr

Personal site of Alexandre Gaubert: a home page in English at `/` and in French at `/fr/`, and a
freelance page at `/freelance/` and `/fr/freelance/`.

React and TypeScript are used only at build time, as a template engine: the pages are rendered to
static HTML with inline CSS, and no JavaScript reaches the browser. All the text lives in
`src/content.ts`.

```sh
npm install
npm run dev        # serves the site on a free local port, re-rendered on each reload
npm run build      # writes dist/
npm run typecheck
npm run deploy     # build, then deploy dist/ to Google App Engine
```

The social preview images are committed: `public/og-en.png` and `public/og-fr.png` for the home
page, `public/og-freelance-en.png` and `public/og-freelance-fr.png` for the freelance page.
Regenerate them by hand when a hero changes.
