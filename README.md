# alexandre-gaubert.fr

Personal site of Alexandre Gaubert: one page in English at `/`, in French at `/fr/`.

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

The social preview images `public/og-en.png` and `public/og-fr.png` are committed; regenerate them
by hand when the hero changes.
