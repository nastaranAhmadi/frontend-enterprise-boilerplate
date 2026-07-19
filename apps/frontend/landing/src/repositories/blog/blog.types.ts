/**
 * API contract for HTML-driven blog pages.
 *
 * Admin CMS generates a full HTML document. The API returns it as-is.
 * Index (`/blog`) and detail (`/blog/:slug`) share this exact shape.
 *
 * The frontend does not model title, description, topics, cards, or sections —
 * those live inside `content`.
 */
export type BlogPageResponse = {
  content: string;
  lastModified: string;
};
