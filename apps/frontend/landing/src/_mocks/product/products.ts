import 'server-only';

import type { Locale } from '@/config/site';
import type { Product } from '@/repositories/product/product.types';

export const productsByLocale: Record<Locale, Product[]> = {
  en: [
    {
      id: 'platform-core',
      name: 'Platform Core',
      description: 'Shared design system, routing shell, and repository foundations for new apps.',
      category: 'Platform',
    },
    {
      id: 'i18n-kit',
      name: 'I18n Kit',
      description: 'Locale routing, server dictionaries, and RTL-aware UI primitives.',
      category: 'Toolkit',
    },
    {
      id: 'seo-starter',
      name: 'SEO Starter',
      description: 'Metadata helpers, JSON-LD builders, sitemap routes, and hreflang support.',
      category: 'Toolkit',
    },
    {
      id: 'data-layer',
      name: 'Data Layer',
      description:
        'Repository pattern with mock and API datasource switching via environment config.',
      category: 'Platform',
    },
    {
      id: 'contact-hub',
      name: 'Contact Hub',
      description: 'Accessible contact forms with TanStack Query mutations and validation.',
      category: 'Feature',
    },
    {
      id: 'blog-engine',
      name: 'Blog Engine',
      description: 'Static blog list and article pages with Article schema and locale content.',
      category: 'Feature',
    },
  ],
  fa: [
    {
      id: 'platform-core',
      name: 'هسته پلتفرم',
      description: 'سیستم طراحی مشترک، پوسته مسیریابی و پایه مخازن داده برای اپ‌های جدید.',
      category: 'پلتفرم',
    },
    {
      id: 'i18n-kit',
      name: 'کیت i18n',
      description: 'مسیریابی locale، فرهنگ‌لغت سرور و اجزای UI سازگار با RTL.',
      category: 'ابزار',
    },
    {
      id: 'seo-starter',
      name: 'شروع سئو',
      description: 'کمک‌کننده‌های متادیتا، سازنده JSON-LD، مسیرهای sitemap و پشتیبانی hreflang.',
      category: 'ابزار',
    },
    {
      id: 'data-layer',
      name: 'لایه داده',
      description: 'الگوی مخزن داده با تعویض datasource mock و API از طریق پیکربندی محیط.',
      category: 'پلتفرم',
    },
    {
      id: 'contact-hub',
      name: 'مرکز تماس',
      description: 'فرم‌های تماس دسترس‌پذیر با mutationهای TanStack Query و اعتبارسنجی.',
      category: 'ویژگی',
    },
    {
      id: 'blog-engine',
      name: 'موتور بلاگ',
      description: 'فهرست بلاگ استاتیک و صفحات مقاله با schema Article و محتوای locale.',
      category: 'ویژگی',
    },
  ],
};
