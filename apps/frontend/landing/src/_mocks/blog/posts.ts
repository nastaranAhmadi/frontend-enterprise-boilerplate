import 'server-only';

import type { Locale } from '@/config/site';
import type { BlogPost } from '@/repositories/blog/blog.types';

export const blogPostsByLocale: Record<Locale, BlogPost[]> = {
  en: [
    {
      slug: 'launching-the-platform',
      title: 'Launching the platform',
      excerpt: 'Why we invested in a server-first landing architecture.',
      content:
        'We started with a clear goal: ship a landing experience that teams can extend without fighting the framework. Server Components keep the default path fast, while repositories isolate mock and API data sources behind one interface.\n\nFeature ownership keeps UI close to the product surface it serves. Shared chrome stays in app components; blog-specific cards stay inside the blog feature. That boundary makes reviews predictable and prevents a global components folder from becoming a junk drawer.\n\nThe result is a foundation you can grow into products, blog content, and contact flows without rewriting the shell every time.',
      publishedAt: '2026-07-01',
    },
    {
      slug: 'repository-pattern-in-practice',
      title: 'Repository pattern in practice',
      excerpt: 'How application functions, repositories, and datasources stay decoupled.',
      content:
        'Routes stay thin. Application functions orchestrate reads with React.cache(). Repositories express domain operations like getPosts and getPostBySlug. Datasources implement those operations against mocks or HTTP.\n\nMocks live in _mocks/ and never leak into the API client package. When the backend is ready, only the datasource implementation changes. Features and routes keep the same contracts.\n\nThat separation is what makes the landing app a reference implementation instead of a one-off marketing page.',
      publishedAt: '2026-06-18',
    },
  ],
  fa: [
    {
      slug: 'launching-the-platform',
      title: 'راه‌اندازی پلتفرم',
      excerpt: 'چرا روی معماری سرور-محور برای صفحه فرود سرمایه‌گذاری کردیم.',
      content:
        'با هدف مشخص شروع کردیم: تجربه فرودی بسازیم که تیم‌ها بتوانند بدون مقابله با فریم‌ورک آن را گسترش دهند. کامپوننت‌های سرور مسیر پیش‌فرض را سریع نگه می‌دارند و مخازن داده، منبع mock و API را پشت یک رابط واحد جدا می‌کنند.\n\nمالکیت ویژگی، UI را نزدیک سطح محصولی که به آن خدمت می‌کند نگه می‌دارد. پوسته مشترک در کامپوننت‌های اپ باقی می‌ماند و کارت‌های بلاگ داخل ویژگی بلاگ می‌مانند.\n\nنتیجه یک پایه است که می‌توانید بدون بازنویسی پوسته، آن را به محصولات، محتوای بلاگ و جریان‌های تماس گسترش دهید.',
      publishedAt: '2026-07-01',
    },
    {
      slug: 'repository-pattern-in-practice',
      title: 'الگوی مخزن داده در عمل',
      excerpt: 'چگونه توابع application، مخازن داده و datasourceها جدا می‌مانند.',
      content:
        'مسیرها نازک می‌مانند. توابع application خواندن را با React.cache() هماهنگ می‌کنند. مخازن داده عملیات دامنه مانند getPosts و getPostBySlug را بیان می‌کنند. datasourceها این عملیات را روی mock یا HTTP پیاده‌سازی می‌کنند.\n\nmockها در _mocks/ هستند و هرگز وارد بسته api-client نمی‌شوند. وقتی بک‌اند آماده شد، فقط پیاده‌سازی datasource عوض می‌شود.\n\nاین جداسازی باعث می‌شود اپ فرود مرجع معماری باشد نه یک صفحه بازاریابی یک‌بار مصرف.',
      publishedAt: '2026-06-18',
    },
  ],
};
