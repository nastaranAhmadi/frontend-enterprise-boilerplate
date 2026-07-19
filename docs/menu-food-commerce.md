# Menu Food Commerce — Vision & Roadmap

**Status:** Active  
**App:** `apps/frontend/landing`  
**Routes:** `/[locale]/menu` (browse), `/[locale]/menu/[slug]` (detail — Phase 2)  
**Brand:** SHINSEI (sage / teal / warm canvas — not a generic delivery-app look)

## Vision

The Menu is not a static PDF or a simple list of dishes. It is a **premium food commerce experience** inspired by Apple product pages, Airbnb discovery, Uber Eats ordering clarity, and Michelin Guide editorial quality.

Guests should be able to discover, understand, customize, and order food — including cooked service, raw ingredients, and DIY cooking kits — with luxurious UI, strong accessibility, and smooth motion.

## Principles

- **Brand first** — SHINSEI visual language; large photography; calm spacing.
- **One job per surface** — browse, detail, customize, and fulfillment are distinct steps.
- **Component-driven** — reusable cards, filters, and wizards under `features/menu/`.
- **API-ready** — repository pattern (mock → API); UI does not hard-code fetch logic.
- **Accessible** — keyboard navigation, ARIA labels, contrast, RTL (fa/ar).
- **Motion with purpose** — CSS first in early phases; Framer Motion when complex choreography lands.

## Information architecture

```text
Menu home (/menu)
  ├─ AI Food Assistant (FAB + chat shell; logic later)
  ├─ Category tabs
  ├─ Product cards → Product detail (/menu/[slug])
  │     ├─ Large hero + image gallery (optional 360 later)
  │     ├─ Description, story, origin, taste profile
  │     ├─ Prep time, calories, nutrition facts
  │     ├─ Ingredient chips + interactive assemble (desktop)
  │     ├─ Dietary badges, allergens, suitable for
  │     ├─ Chef recommendation
  │     ├─ Customer reviews
  │     ├─ AI Food Guide
  │     ├─ Upsells: frequently together, drinks, desserts
  │     └─ CTA → Customize → Order type (Phase 3)
  ├─ Social: favorite, compare, share (Phase 4)
  └─ Post-order tracking (Phase 4)
```

## Product capabilities (full backlog)

### Discovery

- AI Food Assistant (taste, diet, calories, allergies, surprise me, offers)
- Search (inside assistant over time)
- Today's offers slider, daily discounts, promotion banners
- Advanced filters (category, cuisine, price, calories, protein, prep time, spicy, dietary flags, chef recommendation, best seller, new, today's special)

### Catalog

- Categories: Breakfast, Snacks, Appetizers, Main Course, Desserts, Drinks, Healthy, Kids, Seasonal, Special Diet
- Main course cuisines: Italian, Chinese, Japanese, Mexican, Persian, Seafood, Steak, Burgers, Pasta, Pizza, etc.
- Each cuisine: cover image, chef photo, short description

### Product card (Phase 1 — shipped)

Corner circular dish photo, title, taste, ingredients line, price, rating, calories / protein / prep chips, spicy tooltip, labels (Best Seller, Chef Choice, New, Limited, Today's Special), favorite, compare (disabled until Phase 4), add affordance.

### Product detail (Phase 2 — next)

Dedicated route (not a modal): `/[locale]/menu/[slug]`.

**Must show**

| Block                                     | Notes                                                                                                 |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Hero image                                | Large, full-bleed or editorial frame; SHINSEI tokens                                                  |
| Image gallery                             | Secondary shots; optional 360 later                                                                   |
| Title, labels, price, rating              | Match card vocabulary                                                                                 |
| Description + taste                       | Card already uses taste; detail also uses full `description`                                          |
| Story behind the dish                     | Editorial copy                                                                                        |
| Country / origin                          | Short line                                                                                            |
| Taste profile                             | Tags or short prose                                                                                   |
| Prep time, calories, nutrition facts      | Chips + optional facts list                                                                           |
| Ingredient chips                          | Same data as card; richer list                                                                        |
| Interactive ingredients                   | Desktop: separated ingredients → hover assemble → final dish (+ steam). Mobile: final food image only |
| Dietary badges / allergens / suitable for | Badges + clear allergen callout                                                                       |
| Chef recommendation                       | Quote or short tip                                                                                    |
| Customer reviews                          | List or summary + sample reviews (mock)                                                               |
| AI Food Guide                             | Flavor, history, country, ingredients, best drink/dessert, health, suitable for                       |
| Upsells                                   | Frequently ordered together, recommended drinks, recommended desserts                                 |
| Primary CTA                               | Add / Customize (Customize opens Phase 3 later; Phase 2 can be Add + link stub)                       |
| Favorite / share                          | Share can be stub; favorite local like browse                                                         |

**Entry points**

- Menu card click / title → detail
- Home seasonal cards → same detail route
- Deep link via slug

**Data (extend beyond browse `MenuItem`)**

Browse fields stay. Detail adds (mock-ready): `slug`, `galleryImageUrls`, `story`, `origin`, `tasteProfile`, `nutritionFacts`, `allergens`, `dietaryBadges`, `suitableFor`, `chefRecommendation`, `reviews`, `aiGuide`, `upsellIds` (or embedded upsell items). Prefer `getMenuItemBySlug(locale, slug)` application use case + repository method; keep list `searchMenu` for browse.

### Commerce flows (Phase 3+)

- Customization (extras, removals, cooking level)
- Order type: Cooked | Raw ingredients | DIY cooking kit
- Cooked: Dine in (table map + reservation) | Take away | Delivery
- Raw / DIY: freshness, weights, recipe options, difficulty, chef secrets
- Cart, upsells, order tracking, favorites / compare / share

## Phased roadmap

### Phase 1 — Browse UI (done)

**Shipped**

- Vision doc (this file)
- `/menu` browse: category tabs, food card grid, FAB AI chat shell
- Menu repository + `searchMenu`; cards reused on home seasonal section
- i18n (en / de / fa / ar) for browse + card labels

**Deferred from original Phase 1 notes**

- In-page search input (replaced by AI FAB shell)
- Quantity stepper on card (removed; Add remains)
- `/api/menu` HTTP route

### Phase 2 — Detail & AI guide (next)

**In scope**

- Route `/[locale]/menu/[slug]` + `generateMetadata`
- `getMenuItemBySlug` (+ 404 when missing)
- Extend mock catalog with detail fields
- Detail page UI: hero, gallery, story/origin/taste, nutrition, ingredients, dietary/allergens, chef tip, reviews, AI Food Guide, upsell rails
- Desktop ingredient hover assemble (CSS / light motion; Framer optional)
- Wire cards (menu + home) to detail links
- i18n for detail chrome (`menuDetail.*` or `menuPage.detail.*`)

**Out of scope for Phase 2**

- Full customize / order-type / table map / delivery / raw / DIY wizards
- Real cart, compare implementation, order tracking
- Live AI recommendations (static AI Guide copy is enough)
- 360 viewer

### Phase 3 — Customize & order type

- Customization modal
- Order type chooser (Cooked / Raw / DIY)
- Cooked: dine-in / takeaway / delivery forms (local state)
- Table map reservation UI (mock availability)
- Raw + DIY kit summary screens

### Phase 4 — Cart, social, tracking

- Cart drawer + session persistence
- Favorites / compare / share
- Order tracking timeline demo
- Wire `/api/menu` (+ cart endpoints when backend exists)
- Framer Motion for complex transitions

### Phase 5 — Backend integration

- Replace mocks with real CMS/API
- Auth-aware favorites and order history
- Payments and production reservation inventory

## Technical approach

Follow existing landing ADRs and the gallery pattern:

| Layer        | Location                                                                                         |
| ------------ | ------------------------------------------------------------------------------------------------ |
| Feature UI   | `apps/frontend/landing/src/features/menu/`                                                       |
| Application  | `apps/frontend/landing/src/application/menu/`                                                    |
| Repository   | `apps/frontend/landing/src/repositories/menu/`                                                   |
| Mocks        | `apps/frontend/landing/src/_mocks/menu/`                                                         |
| Dictionaries | `apps/frontend/landing/src/i18n/dictionaries/{en,de,fa,ar}.json` → `menuPage.*` / `menuDetail.*` |

```text
menu/page.tsx          → MenuPage → MenuExplorer → MenuFoodCard → /menu/[slug]
menu/[slug]/page.tsx   → MenuDetailPage → detail sections
                              ↑
              searchMenu | getMenuItemBySlug (server)
                              ↑
                        menu repository
                              ↑
                     mock datasource ↔ api datasource (later)
```

- **Browse:** server loads catalog via `searchMenu`; client filters by category.
- **Detail:** server loads one item by slug; client owns assemble interaction + local favorite.
- Prefer `@enterprise/ui` primitives and Lucide icons; Tailwind tokens from landing theme overrides.
- Content width: browse/detail shell ~`1280px` (menu) or align with site convention when unified.

## Design notes

- Detail should feel like one editorial composition (Apple product page energy), not a dashboard.
- Hero image dominant; avoid card clutter in the first viewport (brand, title, one lede, price/CTA, hero).
- Interactive ingredients: desktop only; mobile shows final dish.
- Dark mode via existing theme tokens.
- Images: Next `Image` + Unsplash (or CMS) URLs.

## Related

- [ADR-001 Feature ownership](./architecture/ADR-001-feature-ownership.md)
- [ADR-002 Data flow](./architecture/ADR-002-data-flow.md)
- [ADR-003 Repository pattern](./architecture/ADR-003-repository-pattern.md)
- [Internationalization](./internationalization.md)
- [Theme / Tailwind](./theme-tailwind-architecture.md)
