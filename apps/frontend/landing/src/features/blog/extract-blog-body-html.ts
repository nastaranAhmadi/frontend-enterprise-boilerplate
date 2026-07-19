/**
 * Next.js shell adapters for CMS HTML documents.
 *
 * These helpers do NOT model CMS content. They only:
 * 1. Unwrap `<body>` (and any `<style>` from `<head>`) so a full document can
 *    embed inside the app layout without nesting `<html>` / `<head>`.
 * 2. Preserve `<body>` class/dir on a wrapper so CMS CSS variables still apply.
 * 3. Read `<title>` / meta description for `generateMetadata`.
 */

/** Pulls CMS `<style>` + `<body>` so embedded documents keep their own CSS. */
export const extractBlogBodyHtml = (content: string): string => {
  const trimmed = content.trim();
  const styles = [...trimmed.matchAll(/<style\b[^>]*>[\s\S]*?<\/style>/gi)]
    .map((match) => match[0])
    .join('\n');

  const bodyTagMatch = /<body([^>]*)>([\s\S]*?)<\/body>/i.exec(trimmed);
  let body = bodyTagMatch?.[2]
    ? bodyTagMatch[2].trim()
    : trimmed
        .replace(/<\/?html[^>]*>/gi, '')
        .replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '')
        .trim();

  if (bodyTagMatch?.[1]) {
    const attrs = bodyTagMatch[1];
    const classMatch = /\bclass\s*=\s*["']([^"']*)["']/i.exec(attrs);
    const dirMatch = /\bdir\s*=\s*["']([^"']*)["']/i.exec(attrs);
    const className = classMatch?.[1]?.trim() || 'cms-blog';
    const dir = dirMatch?.[1]?.trim();
    const dirAttr = dir ? ` dir="${dir}"` : '';
    body = `<div class="${className}"${dirAttr}>\n${body}\n</div>`;
  }

  return styles ? `${styles}\n${body}` : body;
};

export const extractHtmlTitle = (content: string, fallback = 'Blog'): string => {
  const match = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(content);
  const title = match?.[1]?.replace(/\s+/g, ' ').trim();
  return title || fallback;
};

export const extractHtmlDescription = (content: string, fallback = ''): string => {
  const metaMatch =
    /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["'][^>]*>/i.exec(content) ??
    /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["'][^>]*>/i.exec(content);

  return metaMatch?.[1]?.trim() || fallback;
};
