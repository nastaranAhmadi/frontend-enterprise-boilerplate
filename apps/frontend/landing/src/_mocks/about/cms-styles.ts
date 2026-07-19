/**
 * CSS embedded in the About CMS HTML document.
 * Split-panel editorial layout + CSS-only autoplay carousels (no JS required).
 */
export const aboutCmsStyles = `
  .about-cms {
    --ab-bg: #fdf9f0;
    --ab-ink: #1a241e;
    --ab-muted: #5c635c;
    --ab-olive: #2a352c;
    --ab-copper: #a66b26;
    --ab-copper-soft: #c4843d;
    --ab-line: rgba(26, 36, 30, 0.12);
    --ab-surface: #ffffff;
    --ab-radius: 1.25rem;
    --ab-shadow: 0 20px 50px rgba(26, 36, 30, 0.12);
    --ab-max: 1152px;
    width: min(var(--ab-max), 100%);
    margin-inline: auto;
    background: var(--ab-bg);
    color: var(--ab-ink);
    font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
    line-height: 1.65;
  }

  .about-cms *,
  .about-cms *::before,
  .about-cms *::after { box-sizing: border-box; }

  .about-cms a { color: inherit; text-decoration: none; }

  .about-cms img {
    display: block;
    max-width: 100%;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .about-hero {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    min-height: min(92vh, 860px);
  }

  .about-hero-copy {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
    padding: clamp(1.5rem, 4vw, 3rem);
  }

  .about-kicker {
    display: inline-flex;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--ab-copper);
  }

  .about-hero-copy h1 {
    margin: 0.75rem 0 1rem;
    max-width: 12ch;
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(2.8rem, 6vw, 4.6rem);
    font-weight: 600;
    line-height: 0.98;
    letter-spacing: -0.03em;
    color: var(--ab-olive);
  }

  .about-hero-inline {
    display: inline-flex;
    gap: 0.55rem;
    vertical-align: middle;
    margin-inline: 0.35rem;
  }

  .about-hero-inline span {
    display: inline-block;
    width: clamp(3.2rem, 6vw, 4.5rem);
    height: clamp(3.2rem, 6vw, 4.5rem);
    overflow: hidden;
    border-radius: 0.85rem;
    box-shadow: var(--ab-shadow);
  }

  .about-hero-lede {
    margin: 0 0 1.5rem;
    max-width: 34rem;
    color: var(--ab-muted);
    font-size: 1.05rem;
  }

  .about-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 3rem;
    padding: 0.8rem 1.5rem;
    border-radius: 999px;
    border: 0;
    background: var(--ab-copper);
    color: #fff !important;
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    transition: background 160ms ease, transform 160ms ease;
  }

  .about-btn:hover {
    background: var(--ab-copper-soft);
    transform: translateY(-1px);
  }

  .about-btn-ghost {
    background: transparent;
    border: 1.5px solid var(--ab-olive);
    color: var(--ab-olive) !important;
  }

  .about-btn-ghost:hover {
    background: var(--ab-olive);
    color: #fff !important;
  }

  .about-hero-panels {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.85rem;
    margin-top: auto;
  }

  .about-panel {
    padding: 1.15rem 1.2rem;
    border: 1px solid var(--ab-line);
    border-radius: var(--ab-radius);
    background: rgba(255, 255, 255, 0.55);
  }

  .about-panel h2 {
    margin: 0 0 0.55rem;
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ab-olive);
  }

  .about-panel p {
    margin: 0 0 0.9rem;
    color: var(--ab-muted);
    font-size: 0.92rem;
  }

  .about-panel ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .about-panel li {
    display: flex;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 0.45rem 0;
    border-top: 1px solid var(--ab-line);
    font-size: 0.9rem;
  }

  .about-panel li:first-child { border-top: 0; padding-top: 0; }

  .about-panel strong {
    color: var(--ab-copper);
    font-weight: 600;
  }

  .about-hero-media {
    position: relative;
    overflow: hidden;
    min-height: 420px;
    background: #1a241e;
  }

  .about-carousel {
    position: absolute;
    inset: 0;
  }

  .about-slide {
    position: absolute;
    inset: 0;
    opacity: 0;
    animation: about-fade 12s infinite;
  }

  .about-slide:nth-child(1) { animation-delay: 0s; }
  .about-slide:nth-child(2) { animation-delay: 4s; }
  .about-slide:nth-child(3) { animation-delay: 8s; }

  @keyframes about-fade {
    0% { opacity: 0; transform: scale(1.04); }
    6% { opacity: 1; transform: scale(1); }
    30% { opacity: 1; transform: scale(1); }
    36% { opacity: 0; transform: scale(1.02); }
    100% { opacity: 0; transform: scale(1.02); }
  }

  @media (prefers-reduced-motion: reduce) {
    .about-slide {
      animation: none;
      opacity: 0;
    }
    .about-slide:first-child { opacity: 1; }
    .about-chefs-track { animation: none !important; }
  }

  .about-media-top {
    position: absolute;
    top: 1rem;
    inset-inline: 1rem;
    z-index: 2;
    padding: 0.7rem 1rem;
    border-radius: 0.85rem;
    background: rgba(26, 36, 30, 0.72);
    color: #fff;
    font-size: 0.82rem;
    backdrop-filter: blur(8px);
  }

  .about-media-card {
    position: absolute;
    bottom: 1rem;
    inset-inline: 1rem;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    align-items: center;
    padding: 1rem 1.15rem;
    border-radius: var(--ab-radius);
    background: var(--ab-bg);
    box-shadow: var(--ab-shadow);
  }

  .about-media-card h3 {
    margin: 0 0 0.25rem;
    font-size: 1rem;
    color: var(--ab-olive);
  }

  .about-media-card p {
    margin: 0;
    color: var(--ab-muted);
    font-size: 0.86rem;
  }

  .about-section,
  .about-chefs {
    scroll-margin-top: 5.5rem;
  }

  .about-section {
    width: min(var(--ab-max), calc(100% - 2rem));
    margin: 0 auto;
    padding: clamp(2.5rem, 5vw, 4rem) 0;
  }

  .about-section-head {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 1rem;
    align-items: end;
    margin-bottom: 1.5rem;
  }

  .about-section-head h2 {
    margin: 0.35rem 0 0;
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(1.9rem, 3.5vw, 2.6rem);
    font-weight: 500;
    color: var(--ab-olive);
  }

  .about-section-head p {
    margin: 0;
    max-width: 36rem;
    color: var(--ab-muted);
  }

  .about-philosophy-grid {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 1.25rem;
  }

  .about-philosophy-main,
  .about-philosophy-side {
    padding: 1.5rem;
    border-radius: var(--ab-radius);
    background: var(--ab-surface);
    border: 1px solid var(--ab-line);
  }

  .about-philosophy-main h3,
  .about-philosophy-side h3 {
    margin: 0 0 0.75rem;
    font-size: 0.78rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ab-copper);
  }

  .about-philosophy-main p,
  .about-philosophy-side p {
    margin: 0 0 1rem;
    color: var(--ab-muted);
  }

  .about-philosophy-side ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .about-philosophy-side li {
    padding: 0.65rem 0;
    border-top: 1px solid var(--ab-line);
    color: var(--ab-ink);
    font-weight: 600;
  }

  .about-philosophy-side li:first-child { border-top: 0; padding-top: 0; }
  .about-philosophy-side li span {
    display: block;
    margin-top: 0.2rem;
    color: var(--ab-muted);
    font-weight: 400;
    font-size: 0.9rem;
  }

  .about-chefs {
    overflow: hidden;
    border-radius: calc(var(--ab-radius) + 0.25rem);
    background: var(--ab-olive);
    color: #fff;
    padding: 1.25rem 0 1.5rem;
  }

  .about-chefs .about-section-head {
    width: min(var(--ab-max), calc(100% - 2rem));
    margin-inline: auto;
    color: #fff;
  }

  .about-chefs .about-section-head h2 { color: #fff; }
  .about-chefs .about-section-head p { color: rgba(255,255,255,0.78); }
  .about-chefs .about-kicker { color: #e2b27a; }

  .about-chefs-viewport {
    overflow: hidden;
    width: min(var(--ab-max), calc(100% - 2rem));
    margin-inline: auto;
  }

  .about-chefs-track {
    display: flex;
    gap: 1rem;
    width: max-content;
    animation: about-marquee 28s linear infinite;
  }

  .about-chefs-track:hover {
    animation-play-state: paused;
  }

  @keyframes about-marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  [dir="rtl"] .about-chefs-track {
    animation-name: about-marquee-rtl;
  }

  @keyframes about-marquee-rtl {
    from { transform: translateX(0); }
    to { transform: translateX(50%); }
  }

  .about-chef-card {
    flex: 0 0 min(280px, 78vw);
    overflow: hidden;
    border-radius: var(--ab-radius);
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.12);
  }

  .about-chef-card .about-chef-media {
    aspect-ratio: 4 / 5;
  }

  .about-chef-card .about-chef-body {
    padding: 1rem 1.05rem 1.15rem;
  }

  .about-chef-card h3 {
    margin: 0 0 0.25rem;
    font-size: 1.15rem;
  }

  .about-chef-card p {
    margin: 0;
    color: rgba(255, 255, 255, 0.75);
    font-size: 0.9rem;
  }

  .about-chefs {
    margin-bottom: 2rem;
  }

  @media (max-width: 1100px) {
    .about-hero {
      grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
      min-height: min(88vh, 780px);
    }

    .about-hero-copy {
      padding: clamp(1.25rem, 3vw, 2.25rem);
      gap: 1.5rem;
    }

    .about-hero-copy h1 {
      font-size: clamp(2.4rem, 5vw, 3.6rem);
      max-width: 14ch;
    }

    .about-hero-inline span {
      width: clamp(2.6rem, 5vw, 3.6rem);
      height: clamp(2.6rem, 5vw, 3.6rem);
      border-radius: 0.7rem;
    }

    .about-chef-card {
      flex: 0 0 min(240px, 70vw);
    }
  }

  @media (max-width: 960px) {
    .about-cms {
      overflow-x: clip;
    }

    .about-hero {
      grid-template-columns: 1fr;
      min-height: 0;
    }

    .about-hero-media {
      min-height: 0;
      aspect-ratio: 16 / 11;
      max-height: min(52vh, 420px);
      order: -1;
    }

    .about-hero-copy {
      gap: 1.75rem;
      padding: 1.5rem 1.25rem 2rem;
    }

    .about-hero-copy h1 {
      max-width: none;
      font-size: clamp(2.35rem, 7vw, 3.25rem);
    }

    .about-hero-lede {
      max-width: none;
      font-size: 1rem;
      margin-bottom: 1.25rem;
    }

    .about-hero-panels,
    .about-philosophy-grid {
      grid-template-columns: 1fr;
    }

    .about-section-head {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.65rem;
    }

    .about-section-head p {
      max-width: none;
    }

    .about-chefs {
      border-radius: 0;
      margin-inline: 0;
      padding: 1.5rem 0 1.75rem;
    }

    .about-chefs .about-section-head,
    .about-chefs-viewport,
    .about-section {
      width: min(var(--ab-max), calc(100% - 1.5rem));
    }

    .about-media-top {
      font-size: 0.78rem;
      line-height: 1.4;
    }
  }

  @media (max-width: 640px) {
    .about-hero-copy {
      padding: 1.15rem 1rem 1.65rem;
      gap: 1.35rem;
    }

    .about-hero-copy h1 {
      font-size: clamp(2.05rem, 9vw, 2.6rem);
      line-height: 1.05;
      margin: 0.55rem 0 0.85rem;
    }

    .about-hero-inline {
      margin-inline: 0.2rem;
      gap: 0.35rem;
    }

    .about-hero-inline span {
      width: 2.35rem;
      height: 2.35rem;
      border-radius: 0.55rem;
      box-shadow: 0 8px 20px rgba(26, 36, 30, 0.14);
    }

    .about-hero-lede {
      font-size: 0.95rem;
      margin-bottom: 1rem;
    }

    .about-btn {
      width: 100%;
      min-height: 2.85rem;
      padding: 0.7rem 1.15rem;
      font-size: 0.78rem;
    }

    .about-hero-media {
      aspect-ratio: 5 / 4;
      max-height: min(48vh, 360px);
    }

    .about-media-top,
    .about-media-card {
      inset-inline: 0.65rem;
    }

    .about-media-top {
      top: 0.65rem;
      padding: 0.55rem 0.75rem;
      font-size: 0.72rem;
    }

    .about-media-card {
      bottom: 0.65rem;
      flex-direction: column;
      align-items: stretch;
      gap: 0.75rem;
      padding: 0.85rem 0.95rem;
    }

    .about-panel {
      padding: 1rem 1.05rem;
      border-radius: 1rem;
    }

    .about-panel li {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.15rem;
      font-size: 0.86rem;
    }

    .about-philosophy-main,
    .about-philosophy-side {
      padding: 1.15rem 1.1rem;
      border-radius: 1rem;
    }

    .about-section {
      width: min(var(--ab-max), calc(100% - 1rem));
      padding: 2rem 0;
    }

    .about-section-head h2 {
      font-size: clamp(1.55rem, 6.5vw, 2rem);
    }

    .about-chefs {
      padding: 1.25rem 0 1.4rem;
    }

    .about-chefs .about-section-head,
    .about-chefs-viewport {
      width: min(var(--ab-max), calc(100% - 1rem));
    }

    .about-chefs-track {
      gap: 0.75rem;
      animation-duration: 22s;
    }

    .about-chef-card {
      flex: 0 0 min(210px, 72vw);
      border-radius: 1rem;
    }

    .about-chef-card .about-chef-body {
      padding: 0.85rem 0.9rem 1rem;
    }

    .about-chef-card h3 {
      font-size: 1.05rem;
    }
  }

  @media (max-width: 400px) {
    .about-kicker {
      font-size: 0.66rem;
      letter-spacing: 0.12em;
    }

    .about-hero-copy h1 {
      font-size: clamp(1.85rem, 10vw, 2.2rem);
    }

    .about-hero-inline span {
      width: 2rem;
      height: 2rem;
    }

    .about-hero-media {
      aspect-ratio: 1 / 1;
      max-height: 320px;
    }

    .about-media-top {
      inset-inline: 0.5rem;
      top: 0.5rem;
    }

    .about-media-card {
      inset-inline: 0.5rem;
      bottom: 0.5rem;
      padding: 0.75rem 0.8rem;
    }

    .about-media-card h3 {
      font-size: 0.95rem;
    }

    .about-media-card p {
      font-size: 0.8rem;
    }

    .about-chef-card {
      flex: 0 0 min(188px, 78vw);
    }
  }
`.trim();
