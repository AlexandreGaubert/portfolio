import type { ReactNode } from 'react';
import { CV, EMAIL, LINKEDIN, OFFER, SITE_URL, content, freelance, type Lang } from './content';

export type PageId = 'home' | 'freelance';

const other = (lang: Lang): Lang => (lang === 'en' ? 'fr' : 'en');

// What the <head> and the language switch need from each page.
function meta(page: PageId, lang: Lang) {
  const c = page === 'home' ? content[lang] : freelance[lang];
  return { path: c.path, title: c.title, description: c.description, role: c.role };
}

export const pathOf = (page: PageId, lang: Lang) => meta(page, lang).path;

// "AI-first" must not break after its hyphen.
function keepHyphenated(text: string) {
  return text.split(/(\S+-\S+)/).map((part, i) => (i % 2 ? <span className="nowrap" key={i}>{part}</span> : part));
}

function person(lang: Lang) {
  return {
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: 'Alexandre Gaubert',
    jobTitle: 'Senior Product Engineer',
    url: SITE_URL + content[lang].path,
    image: `${SITE_URL}/photo.jpg`,
    email: EMAIL,
    sameAs: [LINKEDIN],
    knowsAbout: ['React', 'TypeScript', 'Python', 'Fullstack engineering', 'AI agents'],
    address: { '@type': 'PostalAddress', addressLocality: 'Rennes', addressRegion: 'Bretagne', addressCountry: 'FR' },
  };
}

function jsonLd(page: PageId, lang: Lang): string {
  const data =
    page === 'home'
      ? { '@context': 'https://schema.org', ...person(lang) }
      : {
          '@context': 'https://schema.org',
          '@graph': [
            person(lang),
            {
              '@type': 'Service',
              name: freelance[lang].role,
              description: freelance[lang].description,
              url: SITE_URL + freelance[lang].path,
              provider: { '@id': `${SITE_URL}/#person` },
              areaServed: { '@type': 'Country', name: 'France' },
              offers: {
                '@type': 'Offer',
                availabilityStarts: OFFER.availableFrom,
                priceSpecification: {
                  '@type': 'UnitPriceSpecification',
                  price: OFFER.dayRate,
                  priceCurrency: OFFER.currency,
                  unitCode: 'DAY',
                  valueAddedTaxIncluded: false,
                },
              },
            },
          ],
        };
  // A "</script>" inside a string would close the tag early.
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function Document({ page, lang, css }: { page: PageId; lang: Lang; css: string }) {
  const c = content[lang];
  const m = meta(page, lang);
  const url = SITE_URL + m.path;
  const og = page === 'home' ? `og-${lang}.png` : `og-freelance-${lang}.png`;
  return (
    <html lang={c.htmlLang}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{m.title}</title>
        <meta name="description" content={m.description} />
        <link rel="canonical" href={url} />
        <link rel="alternate" hrefLang="en" href={SITE_URL + pathOf(page, 'en')} />
        <link rel="alternate" hrefLang="fr" href={SITE_URL + pathOf(page, 'fr')} />
        <link rel="alternate" hrefLang="x-default" href={SITE_URL + pathOf(page, 'en')} />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preload" href="/fonts/instrument-sans.woff2" as="font" type="font/woff2" crossOrigin="" />
        <meta name="theme-color" content="#ffffff" />
        <meta property="og:type" content="profile" />
        <meta property="og:site_name" content="Alexandre Gaubert" />
        <meta property="og:title" content={m.title} />
        <meta property="og:description" content={m.description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={`${SITE_URL}/${og}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={`Alexandre Gaubert · ${m.role}`} />
        <meta property="og:locale" content={c.ogLocale} />
        <meta property="og:locale:alternate" content={content[other(lang)].ogLocale} />
        <meta property="profile:first_name" content="Alexandre" />
        <meta property="profile:last_name" content="Gaubert" />
        <meta name="twitter:card" content="summary_large_image" />
        <style dangerouslySetInnerHTML={{ __html: css }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(page, lang) }} />
      </head>
      <body>{page === 'home' ? <Home lang={lang} /> : <Freelance lang={lang} />}</body>
    </html>
  );
}

// The header, the hero and the contact block are shared by both pages; each
// page gives its own sections, status line and main button.
function Header({ page, lang, sections }: { page: PageId; lang: Lang; sections: [string, string][] }) {
  const alt = other(lang);
  return (
    <>
      <a className="skip" href="#main">{lang === 'en' ? 'Skip to content' : 'Aller au contenu'}</a>
      <header className="wrap top">
        <a className="name" href={content[lang].path}>Alexandre Gaubert</a>
        <nav aria-label="Sections">
          {sections.map(([id, label]) => (
            <a href={`#${id}`} key={id}>{label}</a>
          ))}
          <a className="lang" href={pathOf(page, alt)} hrefLang={alt}>
            <span className={lang === 'en' ? 'on' : undefined}>EN</span>
            <span className={lang === 'fr' ? 'on' : undefined}>FR</span>
            <span className="sr" lang={alt}>{content[lang].nav.switchLabel}</span>
          </a>
        </nav>
      </header>
    </>
  );
}

function Hero({ lang, role, lede, status, mail, mainLabel }: { lang: Lang; role: string; lede: string; status: ReactNode; mail: string; mainLabel: string }) {
  const c = content[lang];
  const cv = CV[lang];
  return (
    <div className="hero">
      <div className="wrap">
        <div>
          <h1>
            Alexandre Gaubert{' '}<span className="role">{keepHyphenated(role)}</span>
          </h1>
          <p className="lede">{lede}</p>
          <p className="status">
            <i aria-hidden="true" />
            <span>{status}</span>
          </p>
          <div className="ctas">
            <a className="btn fill" href={mail}>{mainLabel}</a>
            {cv && <a className="btn" href={cv}>{c.downloadCv}</a>}
            <a className="btn" href={LINKEDIN}>LinkedIn</a>
          </div>
          <p className="direct">
            <a href={mail}>{EMAIL}</a>
          </p>
        </div>
        <img className="photo" src="/photo.jpg" alt={c.photoAlt} width={260} height={260} fetchPriority="high" />
      </div>
    </div>
  );
}

function Contact({ lang, heading, sub, mail }: { lang: Lang; heading: string; sub?: string; mail: string }) {
  const cv = CV[lang];
  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <h2>{heading}</h2>
        {sub && <p className="sub">{sub}</p>}
        <a className="mail" href={mail}>{EMAIL}</a>
        <p className="links">
          <a href={LINKEDIN}>LinkedIn</a>
          {cv && <a href={cv}>CV (PDF)</a>}
        </p>
      </div>
    </section>
  );
}

function Jobs({ jobs }: { jobs: { when: string; title: string; text: string }[] }) {
  return (
    <ol className="jobs">
      {jobs.map((j) => (
        <li className="job" key={j.when}>
          <p className="when">{j.when}</p>
          <div>
            <h3>{j.title}</h3>
            <p>{j.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function Footer() {
  return <footer className="wrap">© {new Date().getFullYear()} Alexandre Gaubert</footer>;
}

function Home({ lang }: { lang: Lang }) {
  const c = content[lang];
  const mail = `mailto:${EMAIL}`;
  const status = (
    <>
      {c.status.before}
      <a href={freelance[lang].path}>{c.status.link}</a>
      <span className="keep">{c.status.after}</span>
    </>
  );
  return (
    <>
      <Header page="home" lang={lang} sections={[['work', c.nav.work], ['experience', c.nav.experience], ['writing', c.nav.writing], ['contact', c.nav.contact]]} />
      <Hero lang={lang} role={c.role} lede={c.lede} status={status} mail={mail} mainLabel={c.emailMe} />

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
              <Jobs jobs={c.experience.jobs} />
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

        <Contact lang={lang} heading={c.contact.heading} mail={mail} />
      </main>
      <Footer />
    </>
  );
}

function Freelance({ lang }: { lang: Lang }) {
  const f = freelance[lang];
  // The subject tells Alexandre the mail came from this page.
  const mail = `mailto:${EMAIL}?subject=${encodeURIComponent(f.mailSubject)}`;
  return (
    <>
      <Header page="freelance" lang={lang} sections={[['missions', f.nav.missions], ['experience', f.nav.experience], ['contact', f.nav.contact]]} />
      <Hero lang={lang} role={f.role} lede={f.lede} status={f.status} mail={mail} mainLabel={f.propose} />

      <main id="main">
        <section id="missions">
          <div className="wrap">
            <h2>{f.missions.heading}</h2>
            <p className="sub">{f.missions.sub}</p>
            <div className="work">
              {f.missions.items.map((w) => (
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
              <h2>{f.experience.heading}</h2>
              <Jobs jobs={f.experience.jobs} />
            </div>
            <div>
              <h2>{f.agents.heading}</h2>
              <div className="agents">
                <p>{f.agents.intro}</p>
                <ul>
                  {f.agents.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <Contact lang={lang} heading={f.contact.heading} sub={f.contact.sub} mail={mail} />
      </main>
      <Footer />
    </>
  );
}
