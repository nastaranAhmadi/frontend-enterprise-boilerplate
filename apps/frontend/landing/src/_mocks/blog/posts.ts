/**
 * Simulated blog API responses (`{ content, lastModified }` only).
 *
 * Editorial HTML + embedded CSS mimic what the CMS will return.
 * Delete with mock datasource when the real API is live —
 * see docs/architecture/ADR-002-data-flow.md
 */

import 'server-only';

import type { Locale } from '@/config/site';
import type { BlogPageResponse } from '@/repositories/blog/blog.types';

import { blogCmsStyles } from './cms-styles';

const lastModified = '2026-07-18T10:30:00Z';

const img = {
  salad:
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
  bowl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
  brunch:
    'https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&w=800&q=80',
  grilled:
    'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80',
  pasta:
    'https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=800&q=80',
  table:
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
  feast:
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
  chef: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=900&q=80',
  hero: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1400&q=80',
} as const;

/** Packages a full HTML document the way the CMS API will. */
const cmsPage = (input: {
  title: string;
  description: string;
  dir?: 'ltr' | 'rtl';
  body: string;
}): BlogPageResponse => ({
  lastModified,
  content: `
<html>
  <head>
    <meta charset="utf-8" />
    <title>${input.title}</title>
    <meta name="description" content="${input.description}" />
    <style>${blogCmsStyles}</style>
  </head>
  <body class="cms-blog" dir="${input.dir ?? 'ltr'}">
    <div class="cms-wrap">
${input.body}
    </div>
  </body>
</html>
`.trim(),
});

const indexEn = cmsPage({
  title: 'Kitchen journal | SHINSEI',
  description: 'Stories from the counter — community, menu, events, and heritage.',
  body: `
      <div class="cms-filter-root">
        <input class="cms-filter-input" type="radio" name="cms-cat" id="cms-cat-all" checked />
        <input class="cms-filter-input" type="radio" name="cms-cat" id="cms-cat-community" />
        <input class="cms-filter-input" type="radio" name="cms-cat" id="cms-cat-seasonal" />
        <input class="cms-filter-input" type="radio" name="cms-cat" id="cms-cat-events" />
        <input class="cms-filter-input" type="radio" name="cms-cat" id="cms-cat-heritage" />
        <input class="cms-filter-input" type="radio" name="cms-cat" id="cms-cat-share" />
        <input class="cms-filter-input" type="radio" name="cms-cat" id="cms-cat-kindness" />

        <header class="cms-hero">
          <span class="cms-kicker">SHINSEI kitchen journal</span>
          <h1>A journal made for curious eaters</h1>
          <p>Seasonal plates, guest formulas, counter nights, and the quiet craft behind every service.</p>
          <nav class="cms-chips" aria-label="Filter topics">
            <label class="cms-chip" for="cms-cat-all">All</label>
            <label class="cms-chip" for="cms-cat-community">Community</label>
            <label class="cms-chip" for="cms-cat-seasonal">Seasonal</label>
            <label class="cms-chip" for="cms-cat-events">Events</label>
            <label class="cms-chip" for="cms-cat-heritage">Heritage</label>
            <label class="cms-chip" for="cms-cat-share">Share</label>
            <label class="cms-chip" for="cms-cat-kindness">Kindness</label>
          </nav>
        </header>

        <article class="cms-featured cms-item" data-cat="share community">
          <div class="cms-featured-media">
            <span class="cms-featured-badge">Featured story</span>
            <img src="${img.salad}" alt="Seasonal salad bowl" width="900" height="700" />
          </div>
          <div class="cms-featured-copy">
            <span class="cms-kicker">Community</span>
            <h2>Share your taste, reimagined</h2>
            <div class="cms-meta"><span>8 min read</span><span>Jul 18, 2026</span></div>
            <p>Offer a formula. If chefs plate it and guests order it, you unlock future discounts — and a quiet credit on our board.</p>
            <div>
              <a class="cms-btn cms-btn-solid" href="/en/blog/share-your-taste">View story →</a>
            </div>
            <p class="cms-byline">By the SHINSEI kitchen</p>
          </div>
        </article>

        <div class="cms-section-head" id="latest">
          <h2>Latest from the counter</h2>
          <label class="cms-btn" for="cms-cat-all">View all</label>
        </div>

        <section class="cms-grid" aria-label="Latest stories">
          <a class="cms-card cms-item" data-cat="community" href="/en/blog/share-your-orders">
            <div class="cms-card-media">
              <img src="${img.table}" alt="" width="640" height="480" />
              <span class="cms-time">6 min</span>
            </div>
            <div class="cms-card-body">
              <span class="cms-kicker">Community</span>
              <h3>Share your orders</h3>
              <p>Capture your table — friends who reorder with your code earn rewards for both of you.</p>
            </div>
          </a>
          <a class="cms-card cms-item" data-cat="kindness" href="/en/blog/buy-2-share-1">
            <div class="cms-card-media">
              <img src="${img.bowl}" alt="" width="640" height="480" />
              <span class="cms-time">5 min</span>
            </div>
            <div class="cms-card-body">
              <span class="cms-kicker">Kindness</span>
              <h3>Buy 2, share 1</h3>
              <p>A gentle discount on two plates — the second quietly feeds someone in need.</p>
            </div>
          </a>
          <a class="cms-card cms-item" data-cat="seasonal" href="/en/blog/new-on-the-menu">
            <div class="cms-card-media">
              <img src="${img.brunch}" alt="" width="640" height="480" />
              <span class="cms-time">4 min</span>
            </div>
            <div class="cms-card-body">
              <span class="cms-kicker">Seasonal</span>
              <h3>New on the menu</h3>
              <p>Seasonal arrivals and chef notes from this week’s board.</p>
            </div>
          </a>
          <a class="cms-card cms-item" data-cat="events" href="/en/blog/events">
            <div class="cms-card-media">
              <img src="${img.grilled}" alt="" width="640" height="480" />
              <span class="cms-time">5 min</span>
            </div>
            <div class="cms-card-body">
              <span class="cms-kicker">Gatherings</span>
              <h3>Events at the counter</h3>
              <p>Counter nights and tastings worth clearing your calendar.</p>
            </div>
          </a>
          <a class="cms-card cms-item" data-cat="heritage" href="/en/blog/culinary-heritage">
            <div class="cms-card-media">
              <img src="${img.feast}" alt="" width="640" height="480" />
              <span class="cms-time">9 min</span>
            </div>
            <div class="cms-card-body">
              <span class="cms-kicker">Heritage</span>
              <h3>Culinary heritage</h3>
              <p>National dishes, their stories, and the nutrition behind each tradition.</p>
            </div>
          </a>
          <a class="cms-card cms-item" data-cat="share" href="/en/blog/share-your-taste">
            <div class="cms-card-media">
              <img src="${img.pasta}" alt="" width="640" height="480" />
              <span class="cms-time">8 min</span>
            </div>
            <div class="cms-card-body">
              <span class="cms-kicker">Share</span>
              <h3>Nourish the plant-powered way</h3>
              <p>How guest formulas become plates — and why the kitchen stays open to new memory.</p>
            </div>
          </a>
        </section>
      </div>

      <section class="cms-newsletter" aria-label="Newsletter">
        <div>
          <h2>Sign up for weekly notes from the counter</h2>
          <p>New plates, events, and guest formulas — short emails, no noise.</p>
        </div>
        <form class="cms-newsletter-form" action="/en/contact" method="get">
          <input type="email" name="email" placeholder="Email address" aria-label="Email address" />
          <button class="cms-btn cms-btn-light" type="submit">Subscribe</button>
        </form>
      </section>

      <section class="cms-about" aria-label="About the kitchen">
        <div class="cms-about-media">
          <img src="${img.chef}" alt="Chef at the pass" width="800" height="600" />
        </div>
        <div class="cms-about-copy">
          <span class="cms-kicker">About the kitchen</span>
          <h2>Chefs who love to experiment with memory</h2>
          <p>SHINSEI is a counter for plant-forward cooking — seasonal produce, shared tables, and formulas that start as someone else’s story.</p>
          <p>We plate what guests invent, host intimate nights, and keep the board honest about what the market gives us this week.</p>
          <a class="cms-btn cms-btn-solid" href="/en/about">About us</a>
          <div class="cms-press">
            <span>Kitchen notes</span>
            <span>Guest formulas</span>
            <span>Counter nights</span>
          </div>
        </div>
      </section>
`,
});
const indexFa = cmsPage({
  title: 'ژورنال آشپزخانه | SHINSEI',
  description: 'داستان‌هایی از پیشخوان — جامعه، منو، رویدادها و میراث.',
  dir: 'rtl',
  body: `
      <div class="cms-filter-root">
        <input class="cms-filter-input" type="radio" name="cms-cat" id="cms-cat-all" checked />
        <input class="cms-filter-input" type="radio" name="cms-cat" id="cms-cat-community" />
        <input class="cms-filter-input" type="radio" name="cms-cat" id="cms-cat-seasonal" />
        <input class="cms-filter-input" type="radio" name="cms-cat" id="cms-cat-events" />
        <input class="cms-filter-input" type="radio" name="cms-cat" id="cms-cat-heritage" />
        <input class="cms-filter-input" type="radio" name="cms-cat" id="cms-cat-share" />
        <input class="cms-filter-input" type="radio" name="cms-cat" id="cms-cat-kindness" />

      <header class="cms-hero">
        <span class="cms-kicker">ژورنال آشپزخانه SHINSEI</span>
        <h1>ژورنالی برای کنجکاوان طعم</h1>
        <p>بشقاب‌های فصلی، فرمول مهمانان، شب‌های پیشخان و هنر آرام پشت هر سرویس.</p>
                  <nav class="cms-chips" aria-label="فیلتر موضوعات">
            <label class="cms-chip" for="cms-cat-all">همه</label>
            <label class="cms-chip" for="cms-cat-community">جامعه</label>
            <label class="cms-chip" for="cms-cat-seasonal">فصلی</label>
            <label class="cms-chip" for="cms-cat-events">رویدادها</label>
            <label class="cms-chip" for="cms-cat-heritage">میراث</label>
            <label class="cms-chip" for="cms-cat-share">اشتراک</label>
            <label class="cms-chip" for="cms-cat-kindness">مهربانی</label>
          </nav>
      </header>

      <article class="cms-featured cms-item" data-cat="share community">
        <div class="cms-featured-media">
          <span class="cms-featured-badge">داستان ویژه</span>
          <img src="${img.salad}" alt="" width="900" height="700" />
        </div>
        <div class="cms-featured-copy">
          <span class="cms-kicker">جامعه</span>
          <h2>طعم خود را به اشتراک بگذارید</h2>
          <div class="cms-meta"><span>۸ دقیقه</span><span>۱۸ ژوئیه ۲۰۲۶</span></div>
          <p>فرمول خود را بفرستید. اگر سرآشپزها آن را بپذیرند و سفارش بگیرد، تخفیف بعدی مال شماست.</p>
          <div>
            <a class="cms-btn cms-btn-solid" href="/fa/blog/share-your-taste">مشاهده داستان ←</a>
          </div>
          <p class="cms-byline">از آشپزخانه SHINSEI</p>
        </div>
      </article>

      <div class="cms-section-head" id="latest">
        <h2>تازه‌های پیشخوان</h2>
        <label class="cms-btn" for="cms-cat-all">همه</label>
      </div>

      <section class="cms-grid" aria-label="مقالات">
        <a class="cms-card cms-item" data-cat="community" href="/fa/blog/share-your-orders">
          <div class="cms-card-media">
            <img src="${img.table}" alt="" width="640" height="480" />
            <span class="cms-time">۶ دقیقه</span>
          </div>
          <div class="cms-card-body">
            <span class="cms-kicker">جامعه</span>
            <h3>سفارش خود را به اشتراک بگذارید</h3>
            <p>از میز خود عکس بگیرید. دوستان با کد شما سفارش دهند تا هر دو امتیاز بگیرید.</p>
          </div>
        </a>
        <a class="cms-card cms-item" data-cat="kindness" href="/fa/blog/buy-2-share-1">
          <div class="cms-card-media">
            <img src="${img.bowl}" alt="" width="640" height="480" />
            <span class="cms-time">۵ دقیقه</span>
          </div>
          <div class="cms-card-body">
            <span class="cms-kicker">مهربانی</span>
            <h3>دو بخر، یکی هدیه</h3>
            <p>تخفیف روی دو پرس — پرس دوم بی‌نام به کسی که نیاز دارد می‌رسد.</p>
          </div>
        </a>
        <a class="cms-card cms-item" data-cat="seasonal" href="/fa/blog/new-on-the-menu">
          <div class="cms-card-media">
            <img src="${img.brunch}" alt="" width="640" height="480" />
            <span class="cms-time">۴ دقیقه</span>
          </div>
          <div class="cms-card-body">
            <span class="cms-kicker">فصلی</span>
            <h3>تازه‌های منو</h3>
            <p>آیتم‌های فصلی و یادداشت‌های سرآشپز در این هفته.</p>
          </div>
        </a>
        <a class="cms-card cms-item" data-cat="events" href="/fa/blog/events">
          <div class="cms-card-media">
            <img src="${img.grilled}" alt="" width="640" height="480" />
            <span class="cms-time">۵ دقیقه</span>
          </div>
          <div class="cms-card-body">
            <span class="cms-kicker">گردهمایی</span>
            <h3>رویدادها</h3>
            <p>شب‌های پیشخان و چشیدن‌هایی که ارزش رزرو دارند.</p>
          </div>
        </a>
        <a class="cms-card cms-item" data-cat="heritage" href="/fa/blog/culinary-heritage">
          <div class="cms-card-media">
            <img src="${img.feast}" alt="" width="640" height="480" />
            <span class="cms-time">۹ دقیقه</span>
          </div>
          <div class="cms-card-body">
            <span class="cms-kicker">میراث</span>
            <h3>میراث آشپزی</h3>
            <p>غذاهای ملی، داستان‌شان و ارزش غذایی هر سنت.</p>
          </div>
        </a>
        <a class="cms-card cms-item" data-cat="share" href="/fa/blog/share-your-taste">
          <div class="cms-card-media">
            <img src="${img.pasta}" alt="" width="640" height="480" />
            <span class="cms-time">۸ دقیقه</span>
          </div>
          <div class="cms-card-body">
            <span class="cms-kicker">ویژه</span>
            <h3>تغذیه گیاهی</h3>
            <p>چگونه فرمول مهمان به بشقاب تبدیل می‌شود.</p>
          </div>
        </a>
      </section>

      </div>

      <section class="cms-newsletter" aria-label="خبرنامه">
        <div>
          <h2>یادداشت‌های هفتگی از پیشخوان</h2>
          <p>بشقاب‌های تازه، رویدادها و فرمول‌های مهمان — کوتاه و بدون شلوغی.</p>
        </div>
        <form class="cms-newsletter-form" action="/fa/contact" method="get">
          <input type="email" name="email" placeholder="ایمیل" aria-label="ایمیل" />
          <button class="cms-btn cms-btn-light" type="submit">عضویت</button>
        </form>
      </section>

      <section class="cms-about" aria-label="درباره آشپزخانه">
        <div class="cms-about-media">
          <img src="${img.chef}" alt="" width="800" height="600" />
        </div>
        <div class="cms-about-copy">
          <span class="cms-kicker">درباره آشپزخانه</span>
          <h2>سرآشپزهایی که با خاطره آزمایش می‌کنند</h2>
          <p>SHINSEI پیشخوانی برای آشپزی گیاه‌محور است — محصول فصل، میزهای مشترک و فرمول‌هایی که از داستان دیگران آغاز می‌شوند.</p>
          <a class="cms-btn cms-btn-solid" href="/fa/about">درباره ما</a>
        </div>
      </section>
`,
});

const indexDe = cmsPage({
  title: 'Kitchen journal | SHINSEI',
  description: 'Geschichten vom Counter — Community, Karte, Events und Erbe.',
  body: `
      <div class="cms-filter-root">
        <input class="cms-filter-input" type="radio" name="cms-cat" id="cms-cat-all" checked />
        <input class="cms-filter-input" type="radio" name="cms-cat" id="cms-cat-community" />
        <input class="cms-filter-input" type="radio" name="cms-cat" id="cms-cat-seasonal" />
        <input class="cms-filter-input" type="radio" name="cms-cat" id="cms-cat-events" />
        <input class="cms-filter-input" type="radio" name="cms-cat" id="cms-cat-heritage" />
        <input class="cms-filter-input" type="radio" name="cms-cat" id="cms-cat-share" />
        <input class="cms-filter-input" type="radio" name="cms-cat" id="cms-cat-kindness" />

      <header class="cms-hero">
        <span class="cms-kicker">SHINSEI Kitchen Journal</span>
        <h1>Ein Journal für neugierige Esser</h1>
        <p>Saisonale Teller, Gastformeln, Counter-Abende und die stille Handwerkskunst hinter jedem Service.</p>
                  <nav class="cms-chips" aria-label="Themen filtern">
            <label class="cms-chip" for="cms-cat-all">Alle</label>
            <label class="cms-chip" for="cms-cat-community">Community</label>
            <label class="cms-chip" for="cms-cat-seasonal">Saisonal</label>
            <label class="cms-chip" for="cms-cat-events">Events</label>
            <label class="cms-chip" for="cms-cat-heritage">Erbe</label>
            <label class="cms-chip" for="cms-cat-share">Teilen</label>
            <label class="cms-chip" for="cms-cat-kindness">Freundlichkeit</label>
          </nav>
      </header>

      <article class="cms-featured cms-item" data-cat="share community">
        <div class="cms-featured-media">
          <span class="cms-featured-badge">Featured story</span>
          <img src="${img.salad}" alt="" width="900" height="700" />
        </div>
        <div class="cms-featured-copy">
          <span class="cms-kicker">Community</span>
          <h2>Teile deinen Geschmack</h2>
          <div class="cms-meta"><span>8 Min.</span><span>18. Jul 2026</span></div>
          <p>Schlage eine Formel vor. Wenn Köche sie anrichten und Gäste bestellen, schaltest du künftige Rabatte frei.</p>
          <div>
            <a class="cms-btn cms-btn-solid" href="/de/blog/share-your-taste">Geschichte lesen →</a>
          </div>
          <p class="cms-byline">Von der SHINSEI Küche</p>
        </div>
      </article>

      <div class="cms-section-head" id="latest">
        <h2>Neu vom Counter</h2>
        <label class="cms-btn" for="cms-cat-all">Alle</label>
      </div>

      <section class="cms-grid" aria-label="Artikel">
        <a class="cms-card cms-item" data-cat="community" href="/de/blog/share-your-orders">
          <div class="cms-card-media">
            <img src="${img.table}" alt="" width="640" height="480" />
            <span class="cms-time">6 Min.</span>
          </div>
          <div class="cms-card-body">
            <span class="cms-kicker">Community</span>
            <h3>Teile deine Bestellungen</h3>
            <p>Halte deinen Tisch fest — Freunde mit deinem Code bringen euch beiden Vorteile.</p>
          </div>
        </a>
        <a class="cms-card cms-item" data-cat="kindness" href="/de/blog/buy-2-share-1">
          <div class="cms-card-media">
            <img src="${img.bowl}" alt="" width="640" height="480" />
            <span class="cms-time">5 Min.</span>
          </div>
          <div class="cms-card-body">
            <span class="cms-kicker">Freundlichkeit</span>
            <h3>2 kaufen, 1 teilen</h3>
            <p>Ein sanfter Rabatt auf zwei Teller — der zweite speist still jemanden in Not.</p>
          </div>
        </a>
        <a class="cms-card cms-item" data-cat="seasonal" href="/de/blog/new-on-the-menu">
          <div class="cms-card-media">
            <img src="${img.brunch}" alt="" width="640" height="480" />
            <span class="cms-time">4 Min.</span>
          </div>
          <div class="cms-card-body">
            <span class="cms-kicker">Saisonal</span>
            <h3>Neu auf der Karte</h3>
            <p>Saisonale Neuheiten und Notizen der Köche von dieser Woche.</p>
          </div>
        </a>
        <a class="cms-card cms-item" data-cat="events" href="/de/blog/events">
          <div class="cms-card-media">
            <img src="${img.grilled}" alt="" width="640" height="480" />
            <span class="cms-time">5 Min.</span>
          </div>
          <div class="cms-card-body">
            <span class="cms-kicker">Treffen</span>
            <h3>Events</h3>
            <p>Counter-Abende und Verkostungen, für die sich der Kalender lohnt.</p>
          </div>
        </a>
        <a class="cms-card cms-item" data-cat="heritage" href="/de/blog/culinary-heritage">
          <div class="cms-card-media">
            <img src="${img.feast}" alt="" width="640" height="480" />
            <span class="cms-time">9 Min.</span>
          </div>
          <div class="cms-card-body">
            <span class="cms-kicker">Erbe</span>
            <h3>Kulinarisches Erbe</h3>
            <p>Nationale Gerichte, ihre Geschichten und die Ernährung hinter jeder Tradition.</p>
          </div>
        </a>
        <a class="cms-card cms-item" data-cat="share" href="/de/blog/share-your-taste">
          <div class="cms-card-media">
            <img src="${img.pasta}" alt="" width="640" height="480" />
            <span class="cms-time">8 Min.</span>
          </div>
          <div class="cms-card-body">
            <span class="cms-kicker">Featured</span>
            <h3>Pflanzenkraft auf dem Teller</h3>
            <p>Wie Gastformeln zu Tellern werden — und warum die Küche offen bleibt.</p>
          </div>
        </a>
      </section>

      </div>

      <section class="cms-newsletter" aria-label="Newsletter">
        <div>
          <h2>Wöchentliche Notizen vom Counter</h2>
          <p>Neue Teller, Events und Gastformeln — kurz und ruhig.</p>
        </div>
        <form class="cms-newsletter-form" action="/de/contact" method="get">
          <input type="email" name="email" placeholder="E-Mail" aria-label="E-Mail" />
          <button class="cms-btn cms-btn-light" type="submit">Abonnieren</button>
        </form>
      </section>

      <section class="cms-about" aria-label="Über die Küche">
        <div class="cms-about-media">
          <img src="${img.chef}" alt="" width="800" height="600" />
        </div>
        <div class="cms-about-copy">
          <span class="cms-kicker">Über die Küche</span>
          <h2>Köche, die mit Erinnerung experimentieren</h2>
          <p>SHINSEI ist ein Counter für pflanzenbetontes Kochen — Saison, geteilte Tische und Formeln, die als fremde Geschichte beginnen.</p>
          <a class="cms-btn cms-btn-solid" href="/de/about">Über uns</a>
        </div>
      </section>
`,
});

const indexAr = cmsPage({
  title: 'مذكّرات المطبخ | SHINSEI',
  description: 'قصص من الكاونتر — مجتمع وقائمة وفعاليات وتراث.',
  dir: 'rtl',
  body: `
      <div class="cms-filter-root">
        <input class="cms-filter-input" type="radio" name="cms-cat" id="cms-cat-all" checked />
        <input class="cms-filter-input" type="radio" name="cms-cat" id="cms-cat-community" />
        <input class="cms-filter-input" type="radio" name="cms-cat" id="cms-cat-seasonal" />
        <input class="cms-filter-input" type="radio" name="cms-cat" id="cms-cat-events" />
        <input class="cms-filter-input" type="radio" name="cms-cat" id="cms-cat-heritage" />
        <input class="cms-filter-input" type="radio" name="cms-cat" id="cms-cat-share" />
        <input class="cms-filter-input" type="radio" name="cms-cat" id="cms-cat-kindness" />

      <header class="cms-hero">
        <span class="cms-kicker">مذكّرات مطبخ SHINSEI</span>
        <h1>مذكّرات لعشّاق الفضول في الطعم</h1>
        <p>أطباق موسمية ووصفات الضيوف وأمسيات الكاونتر وحرفة هادئة خلف كل خدمة.</p>
                  <nav class="cms-chips" aria-label="تصفية المواضيع">
            <label class="cms-chip" for="cms-cat-all">الكل</label>
            <label class="cms-chip" for="cms-cat-community">مجتمع</label>
            <label class="cms-chip" for="cms-cat-seasonal">موسمي</label>
            <label class="cms-chip" for="cms-cat-events">فعاليات</label>
            <label class="cms-chip" for="cms-cat-heritage">تراث</label>
            <label class="cms-chip" for="cms-cat-share">شارك</label>
            <label class="cms-chip" for="cms-cat-kindness">لطف</label>
          </nav>
      </header>

      <article class="cms-featured cms-item" data-cat="share community">
        <div class="cms-featured-media">
          <span class="cms-featured-badge">قصة مميزة</span>
          <img src="${img.salad}" alt="" width="900" height="700" />
        </div>
        <div class="cms-featured-copy">
          <span class="cms-kicker">مجتمع</span>
          <h2>شارك ذوقك</h2>
          <div class="cms-meta"><span>٨ دقائق</span><span>١٨ يوليو ٢٠٢٦</span></div>
          <p>اقترح وصفة. إذا قدّمها الطهاة وطلبها الضيوف، تفتح خصومات مستقبلية.</p>
          <div>
            <a class="cms-btn cms-btn-solid" href="/ar/blog/share-your-taste">اقرأ القصة ←</a>
          </div>
          <p class="cms-byline">من مطبخ SHINSEI</p>
        </div>
      </article>

      <div class="cms-section-head" id="latest">
        <h2>الأحدث من الكاونتر</h2>
        <label class="cms-btn" for="cms-cat-all">الكل</label>
      </div>

      <section class="cms-grid" aria-label="المقالات">
        <a class="cms-card cms-item" data-cat="community" href="/ar/blog/share-your-orders">
          <div class="cms-card-media">
            <img src="${img.table}" alt="" width="640" height="480" />
            <span class="cms-time">٦ دقائق</span>
          </div>
          <div class="cms-card-body">
            <span class="cms-kicker">مجتمع</span>
            <h3>شارك طلباتك</h3>
            <p>وثّق مائدتك — الأصدقاء الذين يعيدون الطلب برمزك يمنحونكما مكافآت.</p>
          </div>
        </a>
        <a class="cms-card cms-item" data-cat="kindness" href="/ar/blog/buy-2-share-1">
          <div class="cms-card-media">
            <img src="${img.bowl}" alt="" width="640" height="480" />
            <span class="cms-time">٥ دقائق</span>
          </div>
          <div class="cms-card-body">
            <span class="cms-kicker">لطف</span>
            <h3>اشترِ 2 وشارك 1</h3>
            <p>خصم لطيف على طبقين — والثاني يُطعم بهدوء شخصاً بحاجة.</p>
          </div>
        </a>
        <a class="cms-card cms-item" data-cat="seasonal" href="/ar/blog/new-on-the-menu">
          <div class="cms-card-media">
            <img src="${img.brunch}" alt="" width="640" height="480" />
            <span class="cms-time">٤ دقائق</span>
          </div>
          <div class="cms-card-body">
            <span class="cms-kicker">موسمي</span>
            <h3>جديد في القائمة</h3>
            <p>وصولات موسمية وملاحظات الطهاة من لوحة هذا الأسبوع.</p>
          </div>
        </a>
        <a class="cms-card cms-item" data-cat="events" href="/ar/blog/events">
          <div class="cms-card-media">
            <img src="${img.grilled}" alt="" width="640" height="480" />
            <span class="cms-time">٥ دقائق</span>
          </div>
          <div class="cms-card-body">
            <span class="cms-kicker">تجمّعات</span>
            <h3>فعاليات</h3>
            <p>أمسيات الكاونتر وتذوقات تستحق تفريغ يومك.</p>
          </div>
        </a>
        <a class="cms-card cms-item" data-cat="heritage" href="/ar/blog/culinary-heritage">
          <div class="cms-card-media">
            <img src="${img.feast}" alt="" width="640" height="480" />
            <span class="cms-time">٩ دقائق</span>
          </div>
          <div class="cms-card-body">
            <span class="cms-kicker">تراث</span>
            <h3>تراث الطهي</h3>
            <p>أطباق وطنية وقصصها والتغذية خلف كل تقليد.</p>
          </div>
        </a>
        <a class="cms-card cms-item" data-cat="share" href="/ar/blog/share-your-taste">
          <div class="cms-card-media">
            <img src="${img.pasta}" alt="" width="640" height="480" />
            <span class="cms-time">٨ دقائق</span>
          </div>
          <div class="cms-card-body">
            <span class="cms-kicker">مميز</span>
            <h3>تغذية نباتية</h3>
            <p>كيف تتحول وصفات الضيوف إلى أطباق على اللوحة.</p>
          </div>
        </a>
      </section>

      </div>

      <section class="cms-newsletter" aria-label="النشرة">
        <div>
          <h2>ملاحظات أسبوعية من الكاونتر</h2>
          <p>أطباق جديدة وفعاليات ووصفات الضيوف — قصيرة بلا ضجيج.</p>
        </div>
        <form class="cms-newsletter-form" action="/ar/contact" method="get">
          <input type="email" name="email" placeholder="البريد" aria-label="البريد" />
          <button class="cms-btn cms-btn-light" type="submit">اشترك</button>
        </form>
      </section>

      <section class="cms-about" aria-label="عن المطبخ">
        <div class="cms-about-media">
          <img src="${img.chef}" alt="" width="800" height="600" />
        </div>
        <div class="cms-about-copy">
          <span class="cms-kicker">عن المطبخ</span>
          <h2>طهاة يحبّون التجريب مع الذاكرة</h2>
          <p>SHINSEI كاونتر للطهي النباتي — موسم ومائدة مشتركة ووصفات تبدأ كقصة شخص آخر.</p>
          <a class="cms-btn cms-btn-solid" href="/ar/about">من نحن</a>
        </div>
      </section>
`,
});

/** Simulated `GET /api/blog?locale=` */
export const blogIndexByLocale: Record<Locale, BlogPageResponse> = {
  en: indexEn,
  fa: indexFa,
  de: indexDe,
  ar: indexAr,
};

const detailEnShareTaste = cmsPage({
  title: 'Share your taste | SHINSEI',
  description:
    'Offer a formula. If chefs plate it and guests order it, you unlock future discounts.',
  body: `
      <a class="cms-back" href="/en/blog">← Kitchen journal</a>

      <header class="cms-article-head">
        <span class="cms-kicker">Community · Jul 18, 2026</span>
        <h1>Share your taste</h1>
        <p class="cms-lede">Bring a formula to the counter. When chefs plate it and guests reorder it, you earn future discounts — and a quiet credit on the board.</p>
        <div class="cms-meta-row">
          <span class="cms-meta-pill">⏱ 8 min</span>
          <span class="cms-meta-pill">🍽 Easy read</span>
          <span class="cms-meta-pill">🌿 Plant-forward</span>
        </div>
      </header>

      <div class="cms-hero-media">
        <img src="${img.hero}" alt="Bright seasonal bowl" width="1400" height="600" />
      </div>

      <div class="cms-article-layout">
        <article class="cms-article-main">
          <h2>How it works</h2>
          <p>Write the dish the way you taste it — produce, heat, texture, and the feeling you want at the table. Our chefs review submissions each week.</p>
          <ul>
            <li><strong>Do:</strong> name the produce, the method, and the finish.</li>
            <li><strong>Do:</strong> keep it cookable for a busy service.</li>
            <li><strong>What not to do:</strong> send unfinished ideas without a clear plate story.</li>
          </ul>
          <h2>What you unlock</h2>
          <p>Accepted formulas that guests order earn you future discounts and a note beside the dish — a shared kitchen, not a closed one.</p>
        </article>
        <aside class="cms-aside">
          <div class="cms-aside-card">
            <h3>Ingredients of the idea</h3>
            <ul>
              <li><span>Seasonal produce</span><strong>Core</strong></li>
              <li><span>Clear method</span><strong>Required</strong></li>
              <li><span>Guest appeal</span><strong>Key</strong></li>
            </ul>
          </div>
          <div class="cms-aside-card">
            <h3>At a glance</h3>
            <ul>
              <li><span>Review cycle</span><strong>Weekly</strong></li>
              <li><span>Reward</span><strong>Discounts</strong></li>
              <li><span>Credit</span><strong>On board</strong></li>
            </ul>
          </div>
        </aside>
      </div>

      <section class="cms-quote">
        <blockquote>
          “The best plates start as someone else’s memory — we just give them a service window.”
          <cite>— SHINSEI chef team</cite>
        </blockquote>
        <div class="cms-quote-media">
          <img src="${img.chef}" alt="Chef at the pass" width="800" height="600" />
        </div>
      </section>

      <section class="cms-related">
        <h2>Similar stories</h2>
        <div class="cms-related-grid">
          <a class="cms-related-card" href="/en/blog/share-your-orders">
            <img src="${img.table}" alt="" width="480" height="320" />
            <h3>Share your orders</h3>
            <p>Capture your table — friends who reorder with your code earn rewards for both of you.</p>
            <span class="cms-btn">View story</span>
          </a>
          <a class="cms-related-card" href="/en/blog/buy-2-share-1">
            <img src="${img.bowl}" alt="" width="480" height="320" />
            <h3>Buy 2, share 1</h3>
            <p>A gentle discount on two plates — the second quietly feeds someone in need.</p>
            <span class="cms-btn">View story</span>
          </a>
          <a class="cms-related-card" href="/en/blog/new-on-the-menu">
            <img src="${img.brunch}" alt="" width="480" height="320" />
            <h3>New on the menu</h3>
            <p>Seasonal arrivals and chef notes from this week’s board.</p>
            <span class="cms-btn">View story</span>
          </a>
        </div>
      </section>

      <section class="cms-subscribe">
        <h2>Join the journal</h2>
        <p>Occasional notes from the counter — new plates, events, and guest formulas worth tasting.</p>
        <form class="cms-subscribe-form" action="/en/contact" method="get">
          <input type="email" name="email" placeholder="Email address" aria-label="Email address" />
          <button class="cms-btn" type="submit">Subscribe</button>
        </form>
      </section>
`,
});

const detailBody = (
  locale: Locale,
  copy: {
    back: string;
    kicker: string;
    title: string;
    lede: string;
    meta: [string, string, string];
    howTitle: string;
    howP: string;
    bullets: [string, string, string];
    unlockTitle: string;
    unlockP: string;
    aside1Title: string;
    aside2Title: string;
    quote: string;
    cite: string;
    relatedTitle: string;
    subscribeTitle: string;
    subscribeP: string;
    subscribeCta: string;
    viewStory: string;
    related: Array<{ slug: string; title: string; excerpt: string; image: string }>;
  },
) => `
      <a class="cms-back" href="/${locale}/blog">${copy.back}</a>

      <header class="cms-article-head">
        <span class="cms-kicker">${copy.kicker}</span>
        <h1>${copy.title}</h1>
        <p class="cms-lede">${copy.lede}</p>
        <div class="cms-meta-row">
          <span class="cms-meta-pill">${copy.meta[0]}</span>
          <span class="cms-meta-pill">${copy.meta[1]}</span>
          <span class="cms-meta-pill">${copy.meta[2]}</span>
        </div>
      </header>

      <div class="cms-hero-media">
        <img src="${img.hero}" alt="" width="1400" height="600" />
      </div>

      <div class="cms-article-layout">
        <article class="cms-article-main">
          <h2>${copy.howTitle}</h2>
          <p>${copy.howP}</p>
          <ul>
            <li>${copy.bullets[0]}</li>
            <li>${copy.bullets[1]}</li>
            <li>${copy.bullets[2]}</li>
          </ul>
          <h2>${copy.unlockTitle}</h2>
          <p>${copy.unlockP}</p>
        </article>
        <aside class="cms-aside">
          <div class="cms-aside-card">
            <h3>${copy.aside1Title}</h3>
            <ul>
              <li><span>Focus</span><strong>Kitchen</strong></li>
              <li><span>Tone</span><strong>Warm</strong></li>
              <li><span>Pace</span><strong>Editorial</strong></li>
            </ul>
          </div>
          <div class="cms-aside-card">
            <h3>${copy.aside2Title}</h3>
            <ul>
              <li><span>Format</span><strong>HTML</strong></li>
              <li><span>Source</span><strong>CMS</strong></li>
              <li><span>Render</span><strong>Raw</strong></li>
            </ul>
          </div>
        </aside>
      </div>

      <section class="cms-quote">
        <blockquote>
          “${copy.quote}”
          <cite>— ${copy.cite}</cite>
        </blockquote>
        <div class="cms-quote-media">
          <img src="${img.chef}" alt="" width="800" height="600" />
        </div>
      </section>

      <section class="cms-related">
        <h2>${copy.relatedTitle}</h2>
        <div class="cms-related-grid">
          ${copy.related
            .map(
              (item) => `
          <a class="cms-related-card" href="/${locale}/blog/${item.slug}">
            <img src="${item.image}" alt="" width="480" height="320" />
            <h3>${item.title}</h3>
            <p>${item.excerpt}</p>
            <span class="cms-btn">${copy.viewStory}</span>
          </a>`,
            )
            .join('')}
        </div>
      </section>

      <section class="cms-subscribe">
        <h2>${copy.subscribeTitle}</h2>
        <p>${copy.subscribeP}</p>
        <form class="cms-subscribe-form" action="/${locale}/contact" method="get">
          <input type="email" name="email" placeholder="Email" aria-label="Email" />
          <button class="cms-btn" type="submit">${copy.subscribeCta}</button>
        </form>
      </section>
`;

// Remaining EN details + localized details use the same editorial shell.
const enRelated = [
  {
    slug: 'share-your-orders',
    title: 'Share your orders',
    excerpt: 'Friends who reorder with your code earn rewards for both of you.',
    image: img.table,
  },
  {
    slug: 'events',
    title: 'Events',
    excerpt: 'Counter nights and tastings worth clearing your calendar.',
    image: img.grilled,
  },
  {
    slug: 'culinary-heritage',
    title: 'Culinary heritage',
    excerpt: 'National dishes, their stories, and the nutrition behind each tradition.',
    image: img.feast,
  },
];

const detailPagesEn: Record<string, BlogPageResponse> = {
  'share-your-taste': detailEnShareTaste,
  'share-your-orders': cmsPage({
    title: 'Share your orders | SHINSEI',
    description:
      'Capture your table. Friends who reorder with your code earn rewards for both of you.',
    body: detailBody('en', {
      back: '← Kitchen journal',
      kicker: 'Community · Jul 18, 2026',
      title: 'Share your orders',
      lede: 'Capture your table. Friends who reorder with your code earn rewards for both of you.',
      meta: ['⏱ 6 min', '🍽 Easy read', '🤝 Shared'],
      howTitle: 'How it works',
      howP: 'Photograph the table, share your code, and let friends reorder the same evening energy.',
      bullets: [
        '<strong>Do:</strong> share while the memory is warm.',
        '<strong>Do:</strong> keep the code with the photo.',
        '<strong>What not to do:</strong> spam empty tables — this is hospitality, not noise.',
      ],
      unlockTitle: 'What you unlock',
      unlockP:
        'Both of you earn rewards when the reorder lands — a loop built for friends, not funnels.',
      aside1Title: 'Ingredients',
      aside2Title: 'At a glance',
      quote: 'A good table wants company — the code is just how we keep the invitation open.',
      cite: 'SHINSEI hospitality',
      relatedTitle: 'Similar stories',
      subscribeTitle: 'Join the journal',
      subscribeP: 'Occasional notes from the counter.',
      subscribeCta: 'Subscribe',
      viewStory: 'View story',
      related: enRelated,
    }),
  }),
  'buy-2-share-1': cmsPage({
    title: 'Buy 2, share 1 | SHINSEI',
    description: 'A gentle discount on two plates — the second quietly feeds someone in need.',
    body: detailBody('en', {
      back: '← Kitchen journal',
      kicker: 'Community · Jul 18, 2026',
      title: 'Buy 2, share 1',
      lede: 'A gentle discount on two plates — the second quietly feeds someone in need.',
      meta: ['⏱ 5 min', '💚 Kindness', '🍽 Two plates'],
      howTitle: 'How it works',
      howP: 'Order two. One lands at your table; one travels quietly to someone who needs a warm plate.',
      bullets: [
        '<strong>Do:</strong> choose the share when you check out.',
        '<strong>Do:</strong> leave the recipient anonymous — dignity first.',
        '<strong>What not to do:</strong> treat generosity like a status post.',
      ],
      unlockTitle: 'Why it matters',
      unlockP:
        'Hospitality scales when the second plate is part of the ritual, not an afterthought.',
      aside1Title: 'On the plate',
      aside2Title: 'At a glance',
      quote: 'Abundance tastes better when it leaves the room with someone else.',
      cite: 'SHINSEI kitchen',
      relatedTitle: 'Similar stories',
      subscribeTitle: 'Join the journal',
      subscribeP: 'Occasional notes from the counter.',
      subscribeCta: 'Subscribe',
      viewStory: 'View story',
      related: enRelated,
    }),
  }),
  'new-on-the-menu': cmsPage({
    title: 'New on the menu | SHINSEI',
    description: 'Seasonal arrivals and chef notes from this week’s board.',
    body: detailBody('en', {
      back: '← Kitchen journal',
      kicker: 'Seasonal · Jul 18, 2026',
      title: 'New on the menu',
      lede: 'Seasonal arrivals and chef notes from this week’s board — bright, brief, and ready to taste.',
      meta: ['⏱ 4 min', '🌿 Seasonal', '📋 Board'],
      howTitle: 'This week',
      howP: 'New produce, a revised sauce, and one dish that only appears while the market holds.',
      bullets: [
        '<strong>Do:</strong> ask the counter what changed today.',
        '<strong>Do:</strong> taste before the window closes.',
        '<strong>What not to do:</strong> expect last month’s plate — seasons move.',
      ],
      unlockTitle: 'Chef notes',
      unlockP:
        'Short annotations on heat, acid, and texture — the same voice you’ll hear at the pass.',
      aside1Title: 'Highlights',
      aside2Title: 'At a glance',
      quote: 'The board is a weather report for appetite.',
      cite: 'SHINSEI chefs',
      relatedTitle: 'Similar stories',
      subscribeTitle: 'Join the journal',
      subscribeP: 'Occasional notes from the counter.',
      subscribeCta: 'Subscribe',
      viewStory: 'View story',
      related: enRelated,
    }),
  }),
  events: cmsPage({
    title: 'Events | SHINSEI',
    description: 'Counter nights, tastings, and gatherings worth clearing your calendar.',
    body: detailBody('en', {
      back: '← Kitchen journal',
      kicker: 'Gatherings · Jul 18, 2026',
      title: 'Events at the counter',
      lede: 'Counter nights, tastings, and gatherings worth clearing your calendar.',
      meta: ['⏱ 5 min', '📅 Calendar', '🕯️ Evening'],
      howTitle: 'What to expect',
      howP: 'Small seatings, longer conversations, and plates designed for the room — not for delivery photos.',
      bullets: [
        '<strong>Do:</strong> reserve early; rooms stay intimate.',
        '<strong>Do:</strong> arrive curious, leave with a story.',
        '<strong>What not to do:</strong> treat it like a rush lunch.',
      ],
      unlockTitle: 'Upcoming rhythm',
      unlockP: 'Monthly counter nights and seasonal tastings — announced first in the journal.',
      aside1Title: 'Evening notes',
      aside2Title: 'At a glance',
      quote: 'A good night at the counter is half plate, half people.',
      cite: 'SHINSEI events',
      relatedTitle: 'Similar stories',
      subscribeTitle: 'Join the journal',
      subscribeP: 'Occasional notes from the counter.',
      subscribeCta: 'Subscribe',
      viewStory: 'View story',
      related: enRelated,
    }),
  }),
  'culinary-heritage': cmsPage({
    title: 'Culinary heritage | SHINSEI',
    description: 'National dishes, their stories, and the nutrition behind each tradition.',
    body: detailBody('en', {
      back: '← Kitchen journal',
      kicker: 'Heritage · Jul 18, 2026',
      title: 'Culinary heritage',
      lede: 'National dishes, their stories, and the nutrition behind each tradition — remembered with care, plated with now.',
      meta: ['⏱ 9 min', '📜 Story', '🥗 Nourish'],
      howTitle: 'Remembering the plate',
      howP: 'We trace a dish to its people, then ask what it needs in this kitchen — not a costume, a conversation.',
      bullets: [
        '<strong>Do:</strong> honor origin and technique.',
        '<strong>Do:</strong> adapt with respect, not novelty for its own sake.',
        '<strong>What not to do:</strong> flatten tradition into a trend label.',
      ],
      unlockTitle: 'On the board',
      unlockP: 'Heritage plates rotate with the season and the story we can tell honestly.',
      aside1Title: 'Tradition',
      aside2Title: 'At a glance',
      quote: 'Heritage is not a museum — it is a recipe that still feeds someone tonight.',
      cite: 'SHINSEI kitchen',
      relatedTitle: 'Similar stories',
      subscribeTitle: 'Join the journal',
      subscribeP: 'Occasional notes from the counter.',
      subscribeCta: 'Subscribe',
      viewStory: 'View story',
      related: enRelated,
    }),
  }),
};

const localizedDetail = (
  locale: Locale,
  dir: 'ltr' | 'rtl',
  slug: string,
  title: string,
  description: string,
  bodyTitle: string,
  lede: string,
): BlogPageResponse =>
  cmsPage({
    title: `${title} | SHINSEI`,
    description,
    dir,
    body: detailBody(locale, {
      back: locale === 'fa' ? '← ژورنال' : locale === 'ar' ? '← المذكّرات' : '← Kitchen journal',
      kicker: description.slice(0, 48),
      title: bodyTitle,
      lede,
      meta: ['⏱', '🍽', '🌿'],
      howTitle:
        locale === 'fa' ? 'چگونه کار می‌کند' : locale === 'ar' ? 'كيف يعمل' : 'How it works',
      howP: lede,
      bullets: [
        `<strong>${locale === 'de' ? 'Do' : 'Do'}:</strong> ${lede}`,
        `<strong>Do:</strong> ${description}`,
        `<strong>What not to do:</strong> rebuild this page in React — CMS owns the HTML.`,
      ],
      unlockTitle: locale === 'fa' ? 'جزئیات' : locale === 'ar' ? 'التفاصيل' : 'Details',
      unlockP: description,
      aside1Title: locale === 'fa' ? 'نکات' : locale === 'ar' ? 'ملاحظات' : 'Notes',
      aside2Title: locale === 'fa' ? 'خلاصه' : locale === 'ar' ? 'لمحة' : 'At a glance',
      quote: lede,
      cite: 'SHINSEI',
      relatedTitle:
        locale === 'fa' ? 'داستان‌های مشابه' : locale === 'ar' ? 'قصص مشابهة' : 'Similar stories',
      subscribeTitle:
        locale === 'fa'
          ? 'عضویت در ژورنال'
          : locale === 'ar'
            ? 'انضم للمذكّرات'
            : 'Join the journal',
      subscribeP: description,
      subscribeCta: locale === 'fa' ? 'عضویت' : locale === 'ar' ? 'اشترك' : 'Subscribe',
      viewStory: locale === 'fa' ? 'مشاهده' : locale === 'ar' ? 'عرض' : 'View story',
      related: [
        {
          slug: 'share-your-taste',
          title: 'Share your taste',
          excerpt: description,
          image: img.salad,
        },
        { slug: 'events', title: 'Events', excerpt: description, image: img.grilled },
        {
          slug: 'culinary-heritage',
          title: 'Culinary heritage',
          excerpt: description,
          image: img.feast,
        },
      ].filter((item) => item.slug !== slug),
    }),
  });

const detailFa: Record<string, BlogPageResponse> = {
  'share-your-taste': localizedDetail(
    'fa',
    'rtl',
    'share-your-taste',
    'طعم خود را به اشتراک بگذارید',
    'فرمول خود را بفرستید. اگر سرآشپزها آن را بپذیرند و سفارش بگیرد، تخفیف بعدی مال شماست.',
    'طعم خود را به اشتراک بگذارید',
    'فرمول خود را بفرستید. اگر سرآشپزها آن را بپذیرند و سفارش بگیرد، تخفیف بعدی مال شماست.',
  ),
  'share-your-orders': localizedDetail(
    'fa',
    'rtl',
    'share-your-orders',
    'سفارش خود را به اشتراک بگذارید',
    'از میز خود عکس بگیرید. دوستان با کد شما سفارش دهند تا هر دو امتیاز بگیرید.',
    'سفارش خود را به اشتراک بگذارید',
    'از میز خود عکس بگیرید. دوستان با کد شما سفارش دهند تا هر دو امتیاز بگیرید.',
  ),
  'buy-2-share-1': localizedDetail(
    'fa',
    'rtl',
    'buy-2-share-1',
    'دو بخر، یکی هدیه',
    'تخفیف روی دو پرس — پرس دوم بی‌نام به کسی که نیاز دارد می‌رسد.',
    'دو بخر، یکی هدیه',
    'تخفیف روی دو پرس — پرس دوم بی‌نام به کسی که نیاز دارد می‌رسد.',
  ),
  'new-on-the-menu': localizedDetail(
    'fa',
    'rtl',
    'new-on-the-menu',
    'تازه‌های منو',
    'آیتم‌های فصلی و یادداشت‌های سرآشپز در این هفته.',
    'تازه‌های منو',
    'آیتم‌های فصلی و یادداشت‌های سرآشپز در این هفته.',
  ),
  events: localizedDetail(
    'fa',
    'rtl',
    'events',
    'رویدادها',
    'شب‌های پیشخان، چشیدن و گردهمایی‌هایی که ارزش رزرو دارند.',
    'رویدادها',
    'شب‌های پیشخان، چشیدن و گردهمایی‌هایی که ارزش رزرو دارند.',
  ),
  'culinary-heritage': localizedDetail(
    'fa',
    'rtl',
    'culinary-heritage',
    'میراث آشپزی',
    'غذاهای ملی، داستان‌شان و ارزش غذایی هر سنت.',
    'میراث آشپزی',
    'غذاهای ملی، داستان‌شان و ارزش غذایی هر سنت.',
  ),
};

const detailDe: Record<string, BlogPageResponse> = {
  'share-your-taste': localizedDetail(
    'de',
    'ltr',
    'share-your-taste',
    'Teile deinen Geschmack',
    'Schlage eine Formel vor. Wenn Köche sie anrichten und Gäste bestellen, schaltest du künftige Rabatte frei.',
    'Teile deinen Geschmack',
    'Schlage eine Formel vor. Wenn Köche sie anrichten und Gäste bestellen, schaltest du künftige Rabatte frei.',
  ),
  'share-your-orders': localizedDetail(
    'de',
    'ltr',
    'share-your-orders',
    'Teile deine Bestellungen',
    'Halte deinen Tisch fest. Freunde, die mit deinem Code nachbestellen, bringen euch beiden Vorteile.',
    'Teile deine Bestellungen',
    'Halte deinen Tisch fest. Freunde, die mit deinem Code nachbestellen, bringen euch beiden Vorteile.',
  ),
  'buy-2-share-1': localizedDetail(
    'de',
    'ltr',
    'buy-2-share-1',
    '2 kaufen, 1 teilen',
    'Ein sanfter Rabatt auf zwei Teller — der zweite speist still jemanden in Not.',
    '2 kaufen, 1 teilen',
    'Ein sanfter Rabatt auf zwei Teller — der zweite speist still jemanden in Not.',
  ),
  'new-on-the-menu': localizedDetail(
    'de',
    'ltr',
    'new-on-the-menu',
    'Neu auf der Karte',
    'Saisonale Neuheiten und Notizen der Köche von dieser Woche.',
    'Neu auf der Karte',
    'Saisonale Neuheiten und Notizen der Köche von dieser Woche.',
  ),
  events: localizedDetail(
    'de',
    'ltr',
    'events',
    'Events',
    'Counter-Abende, Verkostungen und Treffen, für die sich der Kalender lohnt.',
    'Events',
    'Counter-Abende, Verkostungen und Treffen, für die sich der Kalender lohnt.',
  ),
  'culinary-heritage': localizedDetail(
    'de',
    'ltr',
    'culinary-heritage',
    'Kulinarisches Erbe',
    'Nationale Gerichte, ihre Geschichten und die Ernährung hinter jeder Tradition.',
    'Kulinarisches Erbe',
    'Nationale Gerichte, ihre Geschichten und die Ernährung hinter jeder Tradition.',
  ),
};

const detailAr: Record<string, BlogPageResponse> = {
  'share-your-taste': localizedDetail(
    'ar',
    'rtl',
    'share-your-taste',
    'شارك ذوقك',
    'اقترح وصفة. إذا قدّمها الطهاة وطلبها الضيوف، تفتح خصومات مستقبلية.',
    'شارك ذوقك',
    'اقترح وصفة. إذا قدّمها الطهاة وطلبها الضيوف، تفتح خصومات مستقبلية.',
  ),
  'share-your-orders': localizedDetail(
    'ar',
    'rtl',
    'share-your-orders',
    'شارك طلباتك',
    'وثّق مائدتك. الأصدقاء الذين يعيدون الطلب برمزك يمنحونكما مكافآت.',
    'شارك طلباتك',
    'وثّق مائدتك. الأصدقاء الذين يعيدون الطلب برمزك يمنحونكما مكافآت.',
  ),
  'buy-2-share-1': localizedDetail(
    'ar',
    'rtl',
    'buy-2-share-1',
    'اشترِ 2 وشارك 1',
    'خصم لطيف على طبقين — والثاني يُطعم بهدوء شخصاً بحاجة.',
    'اشترِ 2 وشارك 1',
    'خصم لطيف على طبقين — والثاني يُطعم بهدوء شخصاً بحاجة.',
  ),
  'new-on-the-menu': localizedDetail(
    'ar',
    'rtl',
    'new-on-the-menu',
    'جديد في القائمة',
    'وصولات موسمية وملاحظات الطهاة من لوحة هذا الأسبوع.',
    'جديد في القائمة',
    'وصولات موسمية وملاحظات الطهاة من لوحة هذا الأسبوع.',
  ),
  events: localizedDetail(
    'ar',
    'rtl',
    'events',
    'فعاليات',
    'أمسيات الكاونتر وتذوقات وتجمعات تستحق تفريغ يومك.',
    'فعاليات',
    'أمسيات الكاونتر وتذوقات وتجمعات تستحق تفريغ يومك.',
  ),
  'culinary-heritage': localizedDetail(
    'ar',
    'rtl',
    'culinary-heritage',
    'تراث الطهي',
    'أطباق وطنية وقصصها والتغذية خلف كل تقليد.',
    'تراث الطهي',
    'أطباق وطنية وقصصها والتغذية خلف كل تقليد.',
  ),
};

/** Simulated `GET /api/blog/:slug?locale=` — keyed by URL slug for the mock datasource only. */
export const blogDetailByLocale: Record<Locale, Record<string, BlogPageResponse>> = {
  en: detailPagesEn,
  fa: detailFa,
  de: detailDe,
  ar: detailAr,
};
