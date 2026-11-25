import { CV, EMAIL, LINKEDIN, SITE_URL, content, type Lang } from './content';

const other = (lang: Lang): Lang => (lang === 'en' ? 'fr' : 'en');

// "AI-first" must not break after its hyphen.
function keepHyphenated(text: string) {
  return text.split(/(\S+-\S+)/).map((part, i) => (i % 2 ? <span className="nowrap" key={i}>{part}</span> : part));
}

function jsonLd(lang: Lang): string {
  const c = content[lang];
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Alexandre Gaubert',
    jobTitle: 'Senior Product Engineer',
    url: SITE_URL + c.path,
    image: `${SITE_URL}/photo.jpg`,
    email: EMAIL,
    sameAs: [LINKEDIN],
    knowsAbout: ['React', 'TypeScript', 'Python', 'Fullstack engineering', 'AI agents'],
    address: { '@type': 'PostalAddress', addressRegion: 'Bretagne', addressCountry: 'FR' },
  };
  // A "</script>" inside a string would close the tag early.
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function Document({ lang, css }: { lang: Lang; css: string }) {
  const c = content[lang];
  const url = SITE_URL + c.path;
  return (
    <html lang={c.htmlLang}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{c.title}</title>
        <meta name="description" content={c.description} />
        <link rel="canonical" href={url} />
        <link rel="alternate" hrefLang="en" href={SITE_URL + content.en.path} />
        <link rel="alternate" hrefLang="fr" href={SITE_URL + content.fr.path} />
        <link rel="alternate" hrefLang="x-default" href={SITE_URL + content.en.path} />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preload" href="/fonts/instrument-sans.woff2" as="font" type="font/woff2" crossOrigin="" />
        <meta name="theme-color" content="#ffffff" />
        <meta property="og:type" content="profile" />
        <meta property="og:site_name" content="Alexandre Gaubert" />
        <meta property="og:title" content={c.title} />
        <meta property="og:description" content={c.description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={`${SITE_URL}/og-${lang}.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={`Alexandre Gaubert · ${c.role}`} />
        <meta property="og:locale" content={c.ogLocale} />
        <meta property="og:locale:alternate" content={content[other(lang)].ogLocale} />
        <meta property="profile:first_name" content="Alexandre" />
        <meta property="profile:last_name" content="Gaubert" />
        <meta name="twitter:card" content="summary_large_image" />
        <style dangerouslySetInnerHTML={{ __html: css }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(lang) }} />
      </head>
      <body>
        <Page lang={lang} />
      </body>
    </html>
  );
}

function Page({ lang }: { lang: Lang }) {
  const c = content[lang];
  const cv = CV[lang];
  const alt = other(lang);
  return (
    <>
      <a className="skip" href="#main">{lang === 'en' ? 'Skip to content' : 'Aller au contenu'}</a>
      <header className="wrap top">
        <a className="name" href={c.path}>Alexandre Gaubert</a>
        <nav aria-label="Sections">
          <a href="#work">{c.nav.work}</a>
          <a href="#experience">{c.nav.experience}</a>
          <a href="#writing">{c.nav.writing}</a>
          <a href="#contact">{c.nav.contact}</a>
          <a className="lang" href={content[alt].path} hrefLang={alt}>
            <span className={lang === 'en' ? 'on' : undefined}>EN</span>
            <span className={lang === 'fr' ? 'on' : undefined}>FR</span>
            <span className="sr" lang={alt}>{c.nav.switchLabel}</span>
          </a>
        </nav>
      </header>

      <div className="hero">
        <div className="wrap">
          <div>
            <h1>
              Alexandre Gaubert{' '}<span className="role">{keepHyphenated(c.role)}</span>
            </h1>
            <p className="lede">{c.lede}</p>
            <p className="status">
              <i aria-hidden="true" />
              {c.status}
            </p>
            <div className="ctas">
              <a className="btn fill" href={`mailto:${EMAIL}`}>{c.emailMe}</a>
              {cv && <a className="btn" href={cv}>{c.downloadCv}</a>}
              <a className="btn" href={LINKEDIN}>LinkedIn</a>
            </div>
            <p className="direct">
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </p>
          </div>
          <img className="photo" src="/photo.jpg" alt={c.photoAlt} width={260} height={260} fetchPriority="high" />
        </div>
      </div>

      <main id="main">
        <section id="work">
          <div className="wrap">
            <h2>{c.work.heading}</h2>
            <p className="sub">{c.work.sub}</p>
            <div className="work">
              {c.work.items.map((w) => (
                <div key={w.title}>
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                  <p className="where">{w.stack}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="experience">
          <div className="wrap split">
            <div>
              <h2>{c.experience.heading}</h2>
              <ol className="jobs">
                {c.experience.jobs.map((j) => (
                  <li className="job" key={j.when}>
                    <p className="when">{j.when}</p>
                    <div>
                      <h3>{j.title}</h3>
                      <p>{j.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <ul className="stack">
                {c.skills.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2>{c.agents.heading}</h2>
              <div className="agents">
                {c.agents.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="writing">
          <div className="wrap">
            <h2>{c.writing.heading}</h2>
            <p className="sub">{c.writing.sub}</p>
            <div className="articles">
              {c.writing.articles.map((a) => (
                <a className="article" href={a.url} key={a.url} hrefLang="fr">
                  <p className="meta">{a.meta}</p>
                  <h3 lang="fr">{a.title}</h3>
                  <span className="read">{c.writing.read}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="wrap">
            <h2>{c.contact.heading}</h2>
            <a className="mail" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <p className="links">
              <a href={LINKEDIN}>LinkedIn</a>
              {cv && <a href={cv}>CV (PDF)</a>}
            </p>
          </div>
        </section>
      </main>
      <footer className="wrap">© {new Date().getFullYear()} Alexandre Gaubert</footer>
    </>
  );
}
