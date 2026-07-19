/**
 * CSS the CMS embeds in each blog HTML document.
 * Inspired by editorial food-blog templates (e.g. Veggify) — mock-only payload.
 */
export const blogCmsStyles = `
  .cms-blog {
    --cms-bg: #faf7f2;
    --cms-surface: #ffffff;
    --cms-ink: #161616;
    --cms-muted: #6f6860;
    --cms-forest: #3d5248;
    --cms-forest-soft: #2f5745;
    --cms-leaf: #3d7a5c;
    --cms-line: rgba(30, 58, 47, 0.1);
    --cms-sand: #efe8dc;
    --cms-accent: #d4553a;
    --cms-radius: 1.5rem;
    --cms-radius-lg: 2rem;
    --cms-shadow: 0 22px 60px rgba(22, 22, 22, 0.08);
    --cms-shadow-sm: 0 10px 28px rgba(22, 22, 22, 0.06);
    background:
      radial-gradient(1200px 500px at 10% -10%, rgba(61, 122, 92, 0.08), transparent 55%),
      radial-gradient(900px 400px at 100% 0%, rgba(212, 85, 58, 0.06), transparent 50%),
      var(--cms-bg);
    color: var(--cms-ink);
    font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
    line-height: 1.65;
    padding: 0 0 4rem;
  }

  .cms-blog *,
  .cms-blog *::before,
  .cms-blog *::after { box-sizing: border-box; }

  .cms-blog a { color: inherit; text-decoration: none; }

  .cms-blog a.cms-chip {
    color: var(--cms-forest);
  }

  .cms-blog a.cms-chip:hover,
  .cms-blog a.cms-chip.is-active {
    color: #fff;
  }

  .cms-blog a.cms-btn {
    color: var(--cms-forest);
  }

  .cms-blog a.cms-btn:hover,
  .cms-blog a.cms-btn-solid,
  .cms-blog a.cms-btn-solid:hover,
  .cms-blog a.cms-btn-light,
  .cms-blog button.cms-btn-solid,
  .cms-blog button.cms-btn-solid:hover,
  .cms-blog button.cms-btn-light {
    color: #fff;
  }

  .cms-blog a.cms-btn-light:hover {
    color: var(--cms-forest);
  }

  .cms-wrap {
    width: min(1180px, calc(100% - 2rem));
    margin-inline: auto;
  }

  .cms-hero {
    padding: clamp(2.5rem, 6vw, 4.5rem) 0 2rem;
    text-align: center;
  }

  .cms-hero .cms-kicker {
    justify-content: center;
  }

  .cms-hero h1 {
    margin: 0.75rem auto 1rem;
    max-width: 16ch;
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(2.6rem, 6vw, 4.4rem);
    font-weight: 500;
    line-height: 1.05;
    letter-spacing: -0.02em;
    color: var(--cms-forest);
  }

  .cms-hero p {
    margin: 0 auto;
    max-width: 38rem;
    color: var(--cms-muted);
    font-size: clamp(1.05rem, 2vw, 1.2rem);
  }

  .cms-kicker {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--cms-leaf);
  }

  .cms-chips {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.55rem;
    margin: 1.75rem 0 0;
  }

  .cms-filter-input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
    width: 0;
    height: 0;
  }

  .cms-chip {
    display: inline-flex;
    align-items: center;
    min-height: 2.4rem;
    padding: 0.45rem 1.05rem;
    border-radius: 999px;
    border: 1px solid var(--cms-line);
    background: rgba(255, 255, 255, 0.75);
    color: var(--cms-forest);
    font-size: 0.86rem;
    font-weight: 600;
    cursor: pointer;
    user-select: none;
    transition: background 160ms ease, border-color 160ms ease, color 160ms ease, transform 160ms ease;
  }

  .cms-chip:hover {
    transform: translateY(-1px);
  }

  .cms-blog a.cms-chip,
  .cms-blog label.cms-chip {
    color: var(--cms-forest);
  }

  .cms-filter-root:has(#cms-cat-all:checked) label[for="cms-cat-all"],
  .cms-filter-root:has(#cms-cat-community:checked) label[for="cms-cat-community"],
  .cms-filter-root:has(#cms-cat-seasonal:checked) label[for="cms-cat-seasonal"],
  .cms-filter-root:has(#cms-cat-events:checked) label[for="cms-cat-events"],
  .cms-filter-root:has(#cms-cat-heritage:checked) label[for="cms-cat-heritage"],
  .cms-filter-root:has(#cms-cat-share:checked) label[for="cms-cat-share"],
  .cms-filter-root:has(#cms-cat-kindness:checked) label[for="cms-cat-kindness"] {
    background: var(--cms-forest);
    border-color: var(--cms-forest);
    color: #fff;
  }

  .cms-chip:hover {
    background: var(--cms-forest);
    border-color: var(--cms-forest);
    color: #fff;
    transform: translateY(-1px);
  }

  .cms-filter-root:has(#cms-cat-community:checked) .cms-item:not([data-cat~="community"]),
  .cms-filter-root:has(#cms-cat-seasonal:checked) .cms-item:not([data-cat~="seasonal"]),
  .cms-filter-root:has(#cms-cat-events:checked) .cms-item:not([data-cat~="events"]),
  .cms-filter-root:has(#cms-cat-heritage:checked) .cms-item:not([data-cat~="heritage"]),
  .cms-filter-root:has(#cms-cat-share:checked) .cms-item:not([data-cat~="share"]),
  .cms-filter-root:has(#cms-cat-kindness:checked) .cms-item:not([data-cat~="kindness"]) {
    display: none;
  }

  .cms-filter-empty {
    display: none;
    grid-column: 1 / -1;
    padding: 2rem 1rem;
    text-align: center;
    color: var(--cms-muted);
  }


  .cms-blog label.cms-btn {
    cursor: pointer;
  }
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    min-height: 2.85rem;
    padding: 0.75rem 1.4rem;
    border-radius: 999px;
    border: 1.5px solid var(--cms-forest);
    background: transparent;
    color: var(--cms-forest);
    font-size: 0.84rem;
    font-weight: 700;
    letter-spacing: 0.03em;
    transition: background 160ms ease, color 160ms ease, transform 160ms ease, box-shadow 160ms ease;
  }

  .cms-btn:hover {
    background: var(--cms-forest);
    color: #fff;
    transform: translateY(-1px);
    box-shadow: var(--cms-shadow-sm);
  }

  .cms-btn-solid {
    background: var(--cms-forest);
    color: #fff !important;
  }

  .cms-btn-solid:hover {
    background: var(--cms-forest-soft);
    color: #fff !important;
  }

  .cms-btn-light {
    border-color: #fff;
    color: #fff !important;
  }

  .cms-btn-light:hover {
    background: #fff;
    color: var(--cms-forest) !important;
  }

  .cms-featured {
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    gap: 0;
    overflow: hidden;
    margin: 1.5rem 0 2.75rem;
    background: var(--cms-surface);
    border-radius: var(--cms-radius-lg);
    box-shadow: var(--cms-shadow);
  }

  .cms-featured-media {
    position: relative;
    min-height: 360px;
  }

  .cms-featured-media img,
  .cms-card-media img,
  .cms-hero-media img,
  .cms-related-card img,
  .cms-about-media img,
  .cms-quote-media img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .cms-featured-badge {
    position: absolute;
    top: 1.1rem;
    inset-inline-start: 1.1rem;
    padding: 0.45rem 0.85rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.92);
    color: var(--cms-forest);
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    backdrop-filter: blur(6px);
  }

  .cms-featured-copy {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.95rem;
    padding: clamp(1.75rem, 4vw, 3rem);
  }

  .cms-featured-copy h2 {
    margin: 0;
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(1.9rem, 3.2vw, 2.7rem);
    font-weight: 500;
    line-height: 1.12;
    color: var(--cms-forest);
  }

  .cms-featured-copy .cms-meta,
  .cms-card-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.65rem 1rem;
    color: var(--cms-muted);
    font-size: 0.86rem;
  }

  .cms-featured-copy p {
    margin: 0;
    color: var(--cms-muted);
    font-size: 1.02rem;
  }

  .cms-byline {
    margin-top: 0.25rem;
    font-size: 0.92rem;
    color: var(--cms-ink);
  }

  .cms-section-head {
    display: flex;
    flex-wrap: wrap;
    align-items: end;
    justify-content: space-between;
    gap: 1rem;
    margin: 0 0 1.35rem;
  }

  .cms-section-head h2 {
    margin: 0;
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(1.7rem, 3vw, 2.2rem);
    font-weight: 500;
    color: var(--cms-forest);
  }

  .cms-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.35rem;
  }

  .cms-card {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
    overflow: hidden;
    background: var(--cms-surface);
    border-radius: var(--cms-radius);
    box-shadow: var(--cms-shadow-sm);
    transition: transform 180ms ease, box-shadow 180ms ease;
  }

  .cms-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--cms-shadow);
  }

  .cms-card-media {
    position: relative;
    overflow: hidden;
    aspect-ratio: 4 / 3;
    background: var(--cms-sand);
  }

  .cms-card-media img {
    transition: transform 320ms ease;
  }

  .cms-card:hover .cms-card-media img {
    transform: scale(1.04);
  }

  .cms-time {
    position: absolute;
    bottom: 0.85rem;
    inset-inline-start: 0.85rem;
    padding: 0.35rem 0.7rem;
    border-radius: 999px;
    background: rgba(22, 22, 22, 0.72);
    color: #fff;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.04em;
  }

  .cms-card-body {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
    padding: 0 1.15rem 1.25rem;
  }

  .cms-card-body h3 {
    margin: 0;
    font-size: 1.12rem;
    font-weight: 700;
    line-height: 1.3;
  }

  .cms-card-body p {
    margin: 0;
    color: var(--cms-muted);
    font-size: 0.92rem;
  }

  .cms-newsletter {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 1.5rem;
    align-items: center;
    margin: 3rem 0;
    padding: clamp(1.75rem, 4vw, 2.75rem);
    border-radius: var(--cms-radius-lg);
    background: linear-gradient(135deg, var(--cms-forest) 0%, #274f3d 55%, #1a3329 100%);
    color: #fff;
    box-shadow: var(--cms-shadow);
  }

  .cms-newsletter h2 {
    margin: 0 0 0.55rem;
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(1.6rem, 3vw, 2.15rem);
    font-weight: 500;
    line-height: 1.15;
  }

  .cms-newsletter p {
    margin: 0;
    opacity: 0.88;
  }

  .cms-newsletter-form {
    display: flex;
    flex-wrap: wrap;
    gap: 0.65rem;
  }

  .cms-newsletter-form input,
  .cms-subscribe-form input {
    flex: 1 1 180px;
    min-height: 2.85rem;
    padding: 0.75rem 1.05rem;
    border: 0;
    border-radius: 999px;
    background: #fff;
    color: var(--cms-ink);
  }

  .cms-about {
    display: grid;
    grid-template-columns: 0.9fr 1.1fr;
    gap: 1.75rem;
    align-items: center;
    margin: 2.5rem 0 1rem;
    padding: 1rem;
    background: var(--cms-surface);
    border-radius: var(--cms-radius-lg);
    box-shadow: var(--cms-shadow-sm);
  }

  .cms-about-media {
    overflow: hidden;
    min-height: 280px;
    border-radius: calc(var(--cms-radius-lg) - 0.35rem);
  }

  .cms-about-copy {
    padding: 0.75rem 1.25rem 0.75rem 0.25rem;
  }

  .cms-about-copy h2 {
    margin: 0.4rem 0 0.85rem;
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(1.6rem, 3vw, 2.1rem);
    font-weight: 500;
    color: var(--cms-forest);
  }

  .cms-about-copy p {
    margin: 0 0 0.85rem;
    color: var(--cms-muted);
  }

  .cms-press {
    display: flex;
    flex-wrap: wrap;
    gap: 0.65rem 1.25rem;
    margin-top: 1.25rem;
    color: var(--cms-muted);
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .cms-back {
    display: inline-flex;
    margin: 1.75rem 0 1rem;
    color: var(--cms-forest);
    font-size: 0.92rem;
    font-weight: 600;
  }

  .cms-back:hover { text-decoration: underline; }

  .cms-article-head {
    text-align: center;
    max-width: 48rem;
    margin: 0 auto 1.5rem;
  }

  .cms-article-head h1 {
    margin: 0.55rem 0 0.85rem;
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(2.2rem, 5vw, 3.6rem);
    font-weight: 500;
    line-height: 1.08;
    letter-spacing: -0.02em;
    color: var(--cms-forest);
    text-transform: none;
  }

  .cms-article-head .cms-lede {
    margin: 0 auto;
    max-width: 40rem;
    color: var(--cms-muted);
    font-size: 1.08rem;
  }

  .cms-meta-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.65rem;
    margin: 1.35rem 0 0;
  }

  .cms-meta-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    min-height: 2.15rem;
    padding: 0.35rem 0.85rem;
    border-radius: 999px;
    background: var(--cms-sand);
    color: var(--cms-forest);
    font-size: 0.76rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .cms-hero-media {
    overflow: hidden;
    aspect-ratio: 21 / 9;
    margin: 0 0 2rem;
    border-radius: var(--cms-radius-lg);
    background: var(--cms-sand);
    box-shadow: var(--cms-shadow);
  }

  .cms-article-layout {
    display: grid;
    grid-template-columns: minmax(0, 1.45fr) minmax(250px, 0.7fr);
    gap: 1.75rem;
    align-items: start;
    margin-bottom: 2.5rem;
  }

  .cms-article-main {
    padding: 1.5rem 1.6rem;
    background: var(--cms-surface);
    border-radius: var(--cms-radius);
    box-shadow: var(--cms-shadow-sm);
  }

  .cms-article-main h2 {
    margin: 0 0 0.85rem;
    font-size: 0.82rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--cms-leaf);
  }

  .cms-article-main h2 + h2,
  .cms-article-main p + h2 {
    margin-top: 1.6rem;
  }

  .cms-article-main p {
    margin: 0 0 1rem;
    color: var(--cms-muted);
  }

  .cms-article-main ul {
    margin: 0 0 1.1rem;
    padding-inline-start: 1.15rem;
    color: var(--cms-muted);
  }

  .cms-article-main li + li { margin-top: 0.45rem; }

  .cms-aside {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    position: sticky;
    top: 1rem;
  }

  .cms-aside-card {
    padding: 1.25rem 1.35rem;
    background: var(--cms-surface);
    border: 1px solid var(--cms-line);
    border-radius: var(--cms-radius);
    box-shadow: var(--cms-shadow-sm);
  }

  .cms-aside-card h3 {
    margin: 0 0 0.75rem;
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--cms-forest);
  }

  .cms-aside-card ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .cms-aside-card li {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.5rem 0;
    border-top: 1px solid var(--cms-line);
    font-size: 0.92rem;
    color: var(--cms-muted);
  }

  .cms-aside-card li:first-child {
    border-top: 0;
    padding-top: 0;
  }

  .cms-aside-card strong {
    color: var(--cms-ink);
    font-weight: 600;
  }

  .cms-quote {
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    overflow: hidden;
    margin: 0 0 2.5rem;
    border-radius: var(--cms-radius-lg);
    background: var(--cms-forest);
    color: #fff;
    box-shadow: var(--cms-shadow);
  }

  .cms-quote blockquote {
    margin: 0;
    padding: clamp(1.75rem, 4vw, 3rem);
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(1.35rem, 2.5vw, 1.95rem);
    line-height: 1.35;
  }

  .cms-quote cite {
    display: block;
    margin-top: 1rem;
    font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
    font-size: 0.85rem;
    font-style: normal;
    opacity: 0.75;
  }

  .cms-quote-media { min-height: 240px; }

  .cms-related {
    padding: 1.5rem;
    margin-bottom: 2rem;
    background: var(--cms-surface);
    border-radius: var(--cms-radius-lg);
    box-shadow: var(--cms-shadow-sm);
  }

  .cms-related > h2 {
    margin: 0 0 1.25rem;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 1.5rem;
    font-weight: 500;
    color: var(--cms-forest);
  }

  .cms-related-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
  }

  .cms-related-card {
    display: grid;
    gap: 0.75rem;
  }

  .cms-related-card img {
    aspect-ratio: 16 / 11;
    border-radius: 1rem;
  }

  .cms-related-card h3 {
    margin: 0;
    font-size: 1.02rem;
    line-height: 1.3;
  }

  .cms-related-card p {
    margin: 0;
    color: var(--cms-muted);
    font-size: 0.9rem;
  }

  .cms-subscribe {
    padding: clamp(2rem, 4vw, 3rem);
    border-radius: var(--cms-radius-lg);
    background: linear-gradient(135deg, var(--cms-accent), #b84730);
    color: #fff;
    text-align: center;
  }

  .cms-subscribe h2 {
    margin: 0 0 0.5rem;
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(1.6rem, 3vw, 2.2rem);
    font-weight: 500;
  }

  .cms-subscribe p {
    margin: 0 auto 1.25rem;
    max-width: 36rem;
    opacity: 0.92;
  }

  .cms-subscribe-form {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.65rem;
  }

  .cms-subscribe-form .cms-btn {
    border-color: #fff;
    color: #fff;
  }

  .cms-subscribe-form .cms-btn:hover {
    background: #fff;
    color: var(--cms-accent);
  }

  .cms-blog img {
    max-width: 100%;
  }

  @media (max-width: 1100px) {
    .cms-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .cms-related-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 960px) {
    .cms-blog {
      padding: 0 0 3rem;
    }

    .cms-wrap {
      width: min(1180px, calc(100% - 1.5rem));
    }

    .cms-hero {
      padding: clamp(1.75rem, 5vw, 3rem) 0 1.5rem;
    }

    .cms-hero h1 {
      max-width: 20ch;
    }

    .cms-chips {
      gap: 0.45rem;
      margin-top: 1.35rem;
    }

    .cms-chip {
      min-height: 2.25rem;
      padding: 0.4rem 0.9rem;
      font-size: 0.8rem;
    }

    .cms-featured,
    .cms-newsletter,
    .cms-about,
    .cms-article-layout,
    .cms-quote {
      grid-template-columns: 1fr;
    }

    .cms-featured {
      margin-bottom: 2rem;
    }

    .cms-featured-media {
      order: -1;
      min-height: 0;
      aspect-ratio: 16 / 10;
    }

    .cms-featured-copy {
      padding: 1.35rem 1.25rem 1.5rem;
    }

    .cms-section-head {
      align-items: stretch;
      flex-direction: column;
      gap: 0.75rem;
    }

    .cms-section-head .cms-btn {
      align-self: flex-start;
    }

    .cms-grid,
    .cms-related-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1rem;
    }

    .cms-about-media,
    .cms-quote-media {
      min-height: 0;
      aspect-ratio: 16 / 10;
    }

    .cms-hero-media {
      aspect-ratio: 16 / 10;
      margin-bottom: 1.5rem;
    }

    .cms-newsletter {
      gap: 1.15rem;
      margin: 2.25rem 0;
      text-align: start;
    }

    .cms-newsletter-form,
    .cms-subscribe-form {
      width: 100%;
    }

    .cms-newsletter-form input,
    .cms-newsletter-form .cms-btn,
    .cms-subscribe-form input,
    .cms-subscribe-form .cms-btn {
      flex: 1 1 100%;
      width: 100%;
    }

    .cms-about {
      margin: 2rem 0 1rem;
      padding: 0.75rem;
    }

    .cms-about-copy {
      padding: 0.35rem 0.5rem 1rem;
    }

    .cms-article-main {
      padding: 1.25rem;
    }

    .cms-aside {
      position: static;
    }

    .cms-quote blockquote {
      padding: 1.5rem 1.35rem;
    }

    .cms-related {
      padding: 1.15rem;
    }

    .cms-meta-row {
      gap: 0.5rem;
    }
  }

  @media (max-width: 640px) {
    .cms-wrap {
      width: min(1180px, calc(100% - 1rem));
    }

    .cms-blog {
      padding: 0 0 2.5rem;
      overflow-x: clip;
    }

    .cms-hero h1 {
      max-width: none;
      font-size: clamp(2rem, 9vw, 2.6rem);
    }

    .cms-hero p {
      font-size: 1rem;
    }

    .cms-chips {
      justify-content: flex-start;
      max-width: 100%;
      overflow-x: auto;
      flex-wrap: nowrap;
      padding-bottom: 0.35rem;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: thin;
    }

    .cms-chip {
      flex: 0 0 auto;
    }

    .cms-featured,
    .cms-about,
    .cms-related,
    .cms-newsletter,
    .cms-subscribe,
    .cms-quote,
    .cms-article-main,
    .cms-aside-card {
      border-radius: 1.25rem;
    }

    .cms-featured-copy h2 {
      font-size: clamp(1.45rem, 6vw, 1.85rem);
    }

    .cms-grid,
    .cms-related-grid {
      grid-template-columns: 1fr;
      gap: 0.9rem;
    }

    .cms-card-body {
      padding: 0 1rem 1.1rem;
    }

    .cms-section-head h2 {
      font-size: clamp(1.4rem, 6vw, 1.75rem);
    }

    .cms-article-head {
      margin-bottom: 1.15rem;
      text-align: start;
    }

    .cms-article-head h1 {
      font-size: clamp(1.75rem, 8vw, 2.35rem);
    }

    .cms-article-head .cms-lede {
      font-size: 1rem;
    }

    .cms-meta-row {
      justify-content: flex-start;
    }

    .cms-hero-media {
      aspect-ratio: 4 / 3;
      border-radius: 1.25rem;
    }

    .cms-back {
      margin: 1.15rem 0 0.75rem;
    }

    .cms-btn {
      min-height: 2.65rem;
      padding: 0.65rem 1.15rem;
      font-size: 0.8rem;
    }

    .cms-press {
      gap: 0.5rem 0.85rem;
      font-size: 0.7rem;
    }

    .cms-subscribe,
    .cms-newsletter {
      padding: 1.35rem 1.15rem;
    }
  }

  @media (max-width: 400px) {
    .cms-featured-copy,
    .cms-article-main,
    .cms-aside-card {
      padding-inline: 1rem;
    }

    .cms-chip {
      padding: 0.35rem 0.75rem;
      font-size: 0.76rem;
    }
  }
`.trim();
