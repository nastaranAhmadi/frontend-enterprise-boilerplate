/**
 * Simulated About API responses (`{ content, lastModified }` only).
 * HTML-driven CMS mock — delete when real API is live (see ADR-002).
 */

import 'server-only';

import type { Locale } from '@/config/site';
import type { AboutPageResponse } from '@/repositories/about/about.types';

import { aboutCmsStyles } from './cms-styles';

const lastModified = '2026-07-18T10:30:00Z';

const img = {
  hero1:
    'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1200&q=80',
  hero2:
    'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80',
  hero3:
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80',
  thumb1:
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=200&q=80',
  thumb2:
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=200&q=80',
  chef1:
    'https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=600&q=80',
  chef2:
    'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=600&q=80',
  chef3:
    'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80',
  chef4:
    'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?auto=format&fit=crop&w=600&q=80',
} as const;

const cmsPage = (input: {
  title: string;
  description: string;
  dir?: 'ltr' | 'rtl';
  body: string;
}): AboutPageResponse => ({
  lastModified,
  content: `
<html>
  <head>
    <meta charset="utf-8" />
    <title>${input.title}</title>
    <meta name="description" content="${input.description}" />
    <style>${aboutCmsStyles}</style>
  </head>
  <body class="about-cms" dir="${input.dir ?? 'ltr'}">
${input.body}
  </body>
</html>
`.trim(),
});

const chefsTrack = (cards: string) => `
      <div class="about-chefs-viewport" aria-hidden="false">
        <div class="about-chefs-track">
          ${cards}
          ${cards}
        </div>
      </div>
`;

const enChefs = `
          <article class="about-chef-card">
            <div class="about-chef-media"><img src="${img.chef1}" alt="Chef Aya" width="480" height="600" /></div>
            <div class="about-chef-body"><h3>Aya Mori</h3><p>Executive chef — fermentation, fire, restraint.</p></div>
          </article>
          <article class="about-chef-card">
            <div class="about-chef-media"><img src="${img.chef2}" alt="Chef Jonas" width="480" height="600" /></div>
            <div class="about-chef-body"><h3>Jonas Berg</h3><p>Pastry & grain — quiet sweetness, seasonal flour.</p></div>
          </article>
          <article class="about-chef-card">
            <div class="about-chef-media"><img src="${img.chef3}" alt="Chef Leila" width="480" height="600" /></div>
            <div class="about-chef-body"><h3>Leila Farhadi</h3><p>Herb garden & cold kitchen — brightness on every plate.</p></div>
          </article>
          <article class="about-chef-card">
            <div class="about-chef-media"><img src="${img.chef4}" alt="Chef Marco" width="480" height="600" /></div>
            <div class="about-chef-body"><h3>Marco Silva</h3><p>Service lead — the pass as hospitality, not theater.</p></div>
          </article>
`;

const aboutEn = cmsPage({
  title: 'About SHINSEI | Kitchen & chefs',
  description:
    'Our philosophy, our chefs, and the counter where seasonal cooking meets shared tables.',
  body: `
    <section class="about-hero" aria-label="About introduction">
      <div class="about-hero-copy">
        <div>
          <span class="about-kicker">About SHINSEI</span>
          <h1>
            Kitchen
            <span class="about-hero-inline" aria-hidden="true">
              <span><img src="${img.thumb1}" alt="" width="72" height="72" /></span>
            </span>
            &amp; chefs
            <span class="about-hero-inline" aria-hidden="true">
              <span><img src="${img.thumb2}" alt="" width="72" height="72" /></span>
            </span>
          </h1>
          <p class="about-hero-lede">
            A plant-forward counter for curious eaters — seasonal produce, guest formulas,
            and a kitchen that stays open to other people’s memory.
          </p>
          <a class="about-btn" href="#chefs">Meet the chefs</a>
        </div>

        <div class="about-hero-panels">
          <article class="about-panel">
            <h2>Philosophy</h2>
            <p>We cook what the market gives honestly — less spectacle, more appetite, shared tables.</p>
            <a class="about-btn about-btn-ghost" href="#philosophy">Read philosophy</a>
          </article>
          <article class="about-panel">
            <h2>At a glance</h2>
            <ul>
              <li><span>Counter</span><strong>Open kitchen</strong></li>
              <li><span>Focus</span><strong>Plant-forward</strong></li>
              <li><span>City</span><strong>SHINSEI</strong></li>
            </ul>
          </article>
        </div>
      </div>

      <div class="about-hero-media" aria-label="Kitchen gallery">
        <div class="about-media-top">Service · Tue–Sun · Lunch &amp; evening counter</div>
        <div class="about-carousel">
          <div class="about-slide"><img src="${img.hero1}" alt="Chef at the pass" width="1200" height="900" /></div>
          <div class="about-slide"><img src="${img.hero2}" alt="Prep in the kitchen" width="1200" height="900" /></div>
          <div class="about-slide"><img src="${img.hero3}" alt="Shared table" width="1200" height="900" /></div>
        </div>
        <div class="about-media-card">
          <div>
            <h3>Find the counter</h3>
            <p>Walk-ins welcome · Reservations for counter nights</p>
          </div>
          <a class="about-btn" href="/en/contact">Reserve</a>
        </div>
      </div>
    </section>

    <section class="about-section" id="philosophy" aria-labelledby="philosophy-title">
      <div class="about-section-head">
        <div>
          <span class="about-kicker">Philosophy</span>
          <h2 id="philosophy-title">How we cook, and why</h2>
        </div>
        <p>A short introduction to the SHINSEI approach — the same ideas that used to hide behind a nav dropdown, now on the page where they belong.</p>
      </div>
      <div class="about-philosophy-grid">
        <article class="about-philosophy-main">
          <h3>Brief summary</h3>
          <p>SHINSEI is a kitchen journal made edible: we plate seasonal vegetables, grains, and guest formulas with the calm of a neighborhood counter.</p>
          <p>We believe hospitality scales when the second plate feeds someone else, when recipes can arrive from outside the brigade, and when the board tells the truth about the week’s market.</p>
          <a class="about-btn" href="/en/blog">Read the journal</a>
        </article>
        <aside class="about-philosophy-side">
          <h3>What we stand for</h3>
          <ul>
            <li>Season first<span>Menus follow produce, not trends.</span></li>
            <li>Open kitchen<span>You can see the craft — and join it.</span></li>
            <li>Shared tables<span>Community is part of the recipe.</span></li>
          </ul>
        </aside>
      </div>
    </section>

    <section class="about-chefs" id="chefs" aria-labelledby="chefs-title">
      <div class="about-section-head">
        <div>
          <span class="about-kicker">Chefs</span>
          <h2 id="chefs-title">The people behind the pass</h2>
        </div>
        <p>An auto-playing gallery of the brigade — hover to pause. Each chef keeps a quiet lane and a shared standard.</p>
      </div>
      ${chefsTrack(enChefs)}
    </section>
`,
});

const localized = (
  locale: Locale,
  dir: 'ltr' | 'rtl',
  copy: {
    title: string;
    description: string;
    kicker: string;
    h1a: string;
    h1b: string;
    lede: string;
    meetChefs: string;
    philPanel: string;
    philPanelBody: string;
    readPhil: string;
    glance: string;
    hours: string;
    find: string;
    findBody: string;
    reserve: string;
    philKicker: string;
    philTitle: string;
    philIntro: string;
    summary: string;
    summaryP1: string;
    summaryP2: string;
    journal: string;
    stand: string;
    v1: string;
    v1d: string;
    v2: string;
    v2d: string;
    v3: string;
    v3d: string;
    chefsKicker: string;
    chefsTitle: string;
    chefsIntro: string;
    chefs: Array<{ name: string; role: string; img: string }>;
  },
) => {
  const cards = copy.chefs
    .map(
      (chef) => `
          <article class="about-chef-card">
            <div class="about-chef-media"><img src="${chef.img}" alt="${chef.name}" width="480" height="600" /></div>
            <div class="about-chef-body"><h3>${chef.name}</h3><p>${chef.role}</p></div>
          </article>`,
    )
    .join('');

  return cmsPage({
    title: copy.title,
    description: copy.description,
    dir,
    body: `
    <section class="about-hero" aria-label="About">
      <div class="about-hero-copy">
        <div>
          <span class="about-kicker">${copy.kicker}</span>
          <h1>
            ${copy.h1a}
            <span class="about-hero-inline" aria-hidden="true"><span><img src="${img.thumb1}" alt="" width="72" height="72" /></span></span>
            ${copy.h1b}
            <span class="about-hero-inline" aria-hidden="true"><span><img src="${img.thumb2}" alt="" width="72" height="72" /></span></span>
          </h1>
          <p class="about-hero-lede">${copy.lede}</p>
          <a class="about-btn" href="#chefs">${copy.meetChefs}</a>
        </div>
        <div class="about-hero-panels">
          <article class="about-panel">
            <h2>${copy.philPanel}</h2>
            <p>${copy.philPanelBody}</p>
            <a class="about-btn about-btn-ghost" href="#philosophy">${copy.readPhil}</a>
          </article>
          <article class="about-panel">
            <h2>${copy.glance}</h2>
            <ul>
              <li><span>Counter</span><strong>Open kitchen</strong></li>
              <li><span>Focus</span><strong>Plant-forward</strong></li>
              <li><span>SHINSEI</span><strong>Kitchen</strong></li>
            </ul>
          </article>
        </div>
      </div>
      <div class="about-hero-media">
        <div class="about-media-top">${copy.hours}</div>
        <div class="about-carousel">
          <div class="about-slide"><img src="${img.hero1}" alt="" width="1200" height="900" /></div>
          <div class="about-slide"><img src="${img.hero2}" alt="" width="1200" height="900" /></div>
          <div class="about-slide"><img src="${img.hero3}" alt="" width="1200" height="900" /></div>
        </div>
        <div class="about-media-card">
          <div>
            <h3>${copy.find}</h3>
            <p>${copy.findBody}</p>
          </div>
          <a class="about-btn" href="/${locale}/contact">${copy.reserve}</a>
        </div>
      </div>
    </section>

    <section class="about-section" id="philosophy">
      <div class="about-section-head">
        <div>
          <span class="about-kicker">${copy.philKicker}</span>
          <h2 id="philosophy-title">${copy.philTitle}</h2>
        </div>
        <p>${copy.philIntro}</p>
      </div>
      <div class="about-philosophy-grid">
        <article class="about-philosophy-main">
          <h3>${copy.summary}</h3>
          <p>${copy.summaryP1}</p>
          <p>${copy.summaryP2}</p>
          <a class="about-btn" href="/${locale}/blog">${copy.journal}</a>
        </article>
        <aside class="about-philosophy-side">
          <h3>${copy.stand}</h3>
          <ul>
            <li>${copy.v1}<span>${copy.v1d}</span></li>
            <li>${copy.v2}<span>${copy.v2d}</span></li>
            <li>${copy.v3}<span>${copy.v3d}</span></li>
          </ul>
        </aside>
      </div>
    </section>

    <section class="about-chefs" id="chefs">
      <div class="about-section-head">
        <div>
          <span class="about-kicker">${copy.chefsKicker}</span>
          <h2 id="chefs-title">${copy.chefsTitle}</h2>
        </div>
        <p>${copy.chefsIntro}</p>
      </div>
      ${chefsTrack(cards)}
    </section>
`,
  });
};

const sharedChefs = [
  { name: 'Aya Mori', role: 'Executive chef', img: img.chef1 },
  { name: 'Jonas Berg', role: 'Pastry & grain', img: img.chef2 },
  { name: 'Leila Farhadi', role: 'Herb & cold kitchen', img: img.chef3 },
  { name: 'Marco Silva', role: 'Service lead', img: img.chef4 },
];

export const aboutPageByLocale: Record<Locale, AboutPageResponse> = {
  en: aboutEn,
  fa: localized('fa', 'rtl', {
    title: 'درباره SHINSEI | آشپزخانه و سرآشپزها',
    description: 'فلسفه، سرآشپزها و پیشخوانی که آشپزی فصلی را به میز مشترک می‌رساند.',
    kicker: 'درباره SHINSEI',
    h1a: 'آشپزخانه',
    h1b: 'و سرآشپزها',
    lede: 'پیشخوانی گیاه‌محور برای کنجکاوان طعم — محصول فصل، فرمول مهمان و آشپزخانه‌ای باز به خاطره دیگران.',
    meetChefs: 'آشنایی با سرآشپزها',
    philPanel: 'فلسفه',
    philPanelBody: 'آنچه بازار می‌دهد را صادقانه می‌پزیم — کمتر نمایش، بیشتر اشتها.',
    readPhil: 'خواندن فلسفه',
    glance: 'در یک نگاه',
    hours: 'سرویس · سه‌شنبه تا یکشنبه',
    find: 'پیدا کردن پیشخوان',
    findBody: 'ورود آزاد · رزرو برای شب‌های ویژه',
    reserve: 'رزرو',
    philKicker: 'فلسفه',
    philTitle: 'چگونه می‌پزیم و چرا',
    philIntro:
      'مقدمه‌ای کوتاه بر رویکرد SHINSEI — همان عناوینی که پیش‌تر در منوی کشویی بودند، اکنون در خود صفحه.',
    summary: 'خلاصه',
    summaryP1: 'SHINSEI ژورنال آشپزخانه است که می‌توان آن را چشید: سبزی فصل، غلات و فرمول مهمانان.',
    summaryP2:
      'مهمان‌نوازی وقتی معنا دارد که پرس دوم کسی را سیر کند و منو حقیقت بازار هفته را بگوید.',
    journal: 'ژورنال',
    stand: 'ارزش‌ها',
    v1: 'فصل اول',
    v1d: 'منو از محصول پیروی می‌کند.',
    v2: 'آشپزخانه باز',
    v2d: 'حرفه دیده می‌شود — و می‌توانید شریک شوید.',
    v3: 'میز مشترک',
    v3d: 'جامعه بخشی از دستور است.',
    chefsKicker: 'سرآشپزها',
    chefsTitle: 'افراد پشت پاس',
    chefsIntro: 'گالری خودکار تیم — برای توقف، نشانگر را نگه دارید.',
    chefs: sharedChefs,
  }),
  de: localized('de', 'ltr', {
    title: 'Über SHINSEI | Küche & Köche',
    description:
      'Philosophie, Köche und der Counter, an dem saisonales Kochen auf geteilte Tische trifft.',
    kicker: 'Über SHINSEI',
    h1a: 'Küche',
    h1b: '& Köche',
    lede: 'Ein pflanzenbetonter Counter für neugierige Esser — Saison, Gastformeln und eine offene Küche.',
    meetChefs: 'Köche treffen',
    philPanel: 'Philosophie',
    philPanelBody: 'Wir kochen ehrlich, was der Markt gibt — weniger Spektakel, mehr Appetit.',
    readPhil: 'Philosophie lesen',
    glance: 'Auf einen Blick',
    hours: 'Service · Di–So',
    find: 'Counter finden',
    findBody: 'Walk-ins willkommen · Reservierung für Counter-Nights',
    reserve: 'Reservieren',
    philKicker: 'Philosophie',
    philTitle: 'Wie wir kochen — und warum',
    philIntro: 'Kurze Einführung in den SHINSEI-Ansatz — früher Dropdown, jetzt auf der Seite.',
    summary: 'Kurzfassung',
    summaryP1:
      'SHINSEI ist ein essbares Kitchen Journal: saisonales Gemüse, Getreide, Gastformeln.',
    summaryP2:
      'Gastfreundschaft zählt, wenn der zweite Teller jemanden speist und die Karte die Woche erzählt.',
    journal: 'Journal',
    stand: 'Haltung',
    v1: 'Saison zuerst',
    v1d: 'Die Karte folgt dem Produkt.',
    v2: 'Offene Küche',
    v2d: 'Handwerk ist sichtbar.',
    v3: 'Geteilte Tische',
    v3d: 'Community gehört zum Rezept.',
    chefsKicker: 'Köche',
    chefsTitle: 'Menschen hinter dem Pass',
    chefsIntro: 'Autoplay-Galerie — Hover pausiert.',
    chefs: sharedChefs,
  }),
  ar: localized('ar', 'rtl', {
    title: 'عن SHINSEI | المطبخ والطهاة',
    description: 'فلسفتنا وطهاتنا والكاونتر حيث يلتقي الطبخ الموسمي بالمائدة المشتركة.',
    kicker: 'عن SHINSEI',
    h1a: 'مطبخ',
    h1b: 'وطهاة',
    lede: 'كاونتر نباتي لفضوليي الطعم — موسم ووصفات الضيوف ومطبخ مفتوح للذاكرة.',
    meetChefs: 'تعرّف على الطهاة',
    philPanel: 'الفلسفة',
    philPanelBody: 'نطبخ بصدق ما يمنحه السوق — أقل عرضاً وأكثر شهية.',
    readPhil: 'اقرأ الفلسفة',
    glance: 'لمحة',
    hours: 'الخدمة · الثلاثاء–الأحد',
    find: 'اعثر على الكاونتر',
    findBody: 'دخول حر · حجز لأمسيات الكاونتر',
    reserve: 'احجز',
    philKicker: 'الفلسفة',
    philTitle: 'كيف نطبخ ولماذا',
    philIntro: 'مقدمة قصيرة لأسلوب SHINSEI — ما كان في القائمة المنسدلة صار في الصفحة.',
    summary: 'ملخص',
    summaryP1: 'SHINSEI مذكّرات مطبخ تؤكل: خضار موسمية وحبوب ووصفات الضيوف.',
    summaryP2: 'الضيافة حين يُطعم الطبق الثاني غيرك وتصدق اللوحة أسبوع السوق.',
    journal: 'المذكّرات',
    stand: 'قيمنا',
    v1: 'الموسم أولاً',
    v1d: 'القائمة تتبع المنتج.',
    v2: 'مطبخ مفتوح',
    v2d: 'الحرفة مرئية.',
    v3: 'مائدة مشتركة',
    v3d: 'المجتمع جزء من الوصفة.',
    chefsKicker: 'الطهاة',
    chefsTitle: 'من خلف الباس',
    chefsIntro: 'معرض تلقائي — مرّر للإيقاف.',
    chefs: sharedChefs,
  }),
};
