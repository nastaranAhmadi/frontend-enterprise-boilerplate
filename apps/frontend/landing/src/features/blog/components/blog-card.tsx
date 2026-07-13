import Link from 'next/link';

import type { Locale } from '@/config/site';
import { formatPublishedDate } from '@/lib/i18n/format-date';
import { buildLocalizedBlogPostPath } from '@/lib/seo/alternates';
import type { BlogPost } from '@/repositories/blog/blog.types';

type BlogCardProps = {
  locale: Locale;
  post: BlogPost;
  readMoreLabel: string;
};

export const BlogCard = ({ locale, post, readMoreLabel }: BlogCardProps) => (
  <article className="rounded-lg border border-border bg-background p-lg">
    <time className="text-sm text-muted" dateTime={post.publishedAt}>
      {formatPublishedDate(locale, post.publishedAt)}
    </time>
    <h2 className="mt-sm text-xl font-medium text-foreground">
      <Link
        href={buildLocalizedBlogPostPath(locale, post.slug)}
        className="transition-colors hover:text-primary"
      >
        {post.title}
      </Link>
    </h2>
    <p className="mt-sm text-muted">{post.excerpt}</p>
    <Link
      href={buildLocalizedBlogPostPath(locale, post.slug)}
      className="mt-md inline-flex text-sm font-medium text-primary transition-colors hover:text-foreground"
    >
      {readMoreLabel}
    </Link>
  </article>
);
