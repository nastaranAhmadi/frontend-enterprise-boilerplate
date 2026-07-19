/**
 * API contract for HTML-driven about page from the admin CMS.
 * Same shape as blog: full HTML document in `content`.
 */
export type AboutPageResponse = {
  content: string;
  lastModified: string;
};
