/**
 * Single shared menu detail mock (slug `"1"`) until per-item detail API exists.
 * Uses Spicy tuna roll so the assemble hover video matches the dish.
 */

import 'server-only';

import { menuItemsByLocale } from '@/_mocks/menu/items';
import type { Locale } from '@/config/site';
import type { MenuDetail, MenuDetailReview } from '@/repositories/menu/menu-detail.types';
import { mockMenuDetailSlug } from '@/repositories/menu/menu-detail.types';

export type { MenuDetail, MenuDetailReview };
export { mockMenuDetailSlug };

const DETAIL_ITEM_CODE = 'MC-005';

const stories: Record<Locale, string> = {
  en: 'Cut to order at the counter: sesame rice wrapped tight, chili mayo ribboned through the center, cool cucumber for lift. Hover the plate to watch it come together — fiery, creamy, finished clean.',
  fa: 'در کانتر برش می‌خورد: برنج کنجدی محکم پیچیده، مایو فلفل در مرکز، خیار خنک برای سبکی. روی بشقاب هاور کنید تا سرهم‌شدنش را ببینید — تند، خامه‌ای، پایان تمیز.',
  de: 'Am Counter frisch gerollt: Sesamreis straff gewickelt, Chili-Mayo in der Mitte, kühle Gurke für Frische. Über den Teller hovern, um den Aufbau zu sehen — scharf, cremig, klar im Abschluss.',
  ar: 'يُلف عند الكاونتر: أرز بالسمسم محكم، مايو حار في الوسط، خيار بارد للانتعاش. مرّر فوق الطبق لترى التجميع — حار، كريمي، ختام نظيف.',
};

const origins: Record<Locale, string> = {
  en: 'Inspired by Tokyo roll counters',
  fa: 'با الهام از کانتر رول‌های توکیو',
  de: 'Inspiriert von Tokioer Roll-Countern',
  ar: 'مستوحى من كاونترات الرول في طوكيو',
};

const reviewCopy: Record<Locale, MenuDetailReview[]> = {
  en: [
    {
      id: 'r1',
      author: 'Maya K.',
      rating: 5,
      body: 'Heat is balanced and the cucumber keeps it fresh. I order this every time I’m near SHINSEI.',
    },
    {
      id: 'r2',
      author: 'Jonas R.',
      rating: 4,
      body: 'Creamy chili mayo without drowning the tuna. Would love an extra-spicy option next visit.',
    },
    {
      id: 'r3',
      author: 'Leila S.',
      rating: 5,
      body: 'Looks exactly like the photos and tastes better. Perfect mid-day roll.',
    },
    {
      id: 'r4',
      author: 'Kenji M.',
      rating: 5,
      body: 'Came for omakase energy, stayed for this roll. Tight wrap, clean cut, great sesame.',
    },
    {
      id: 'r5',
      author: 'Sara P.',
      rating: 4,
      body: 'Beautiful presentation. I asked for less mayo and it was still excellent.',
    },
  ],
  fa: [
    {
      id: 'r1',
      author: 'مایا ک.',
      rating: 5,
      body: 'تندی متعادل است و خیار تازگی می‌دهد. هر بار نزدیک شینسی هستم همین را سفارش می‌دهم.',
    },
    {
      id: 'r2',
      author: 'یوناس ر.',
      rating: 4,
      body: 'مایو فلفل خامه‌ای است بدون اینکه تن را بپوشاند. دفعه بعد نسخه خیلی‌تند می‌خواهم.',
    },
    {
      id: 'r3',
      author: 'لیلا س.',
      rating: 5,
      body: 'دقیقاً مثل عکس‌هاست و طعمش بهتر. رول عالی برای میانه روز.',
    },
    {
      id: 'r4',
      author: 'کنجی م.',
      rating: 5,
      body: 'برای حس اوماکاسه آمدم، برای این رول ماندم. پیچش محکم، برش تمیز، کنجد عالی.',
    },
    {
      id: 'r5',
      author: 'سارا پ.',
      rating: 4,
      body: 'ارائه خیلی قشنگ. مایو کمتر خواستم و باز هم عالی بود.',
    },
  ],
  de: [
    {
      id: 'r1',
      author: 'Maya K.',
      rating: 5,
      body: 'Die Schärfe ist stimmig und die Gurke hält es frisch. Ich bestelle das jedes Mal bei SHINSEI.',
    },
    {
      id: 'r2',
      author: 'Jonas R.',
      rating: 4,
      body: 'Cremiges Chili-Mayo, ohne den Thunfisch zu überdecken. Nächstes Mal gerne noch schärfer.',
    },
    {
      id: 'r3',
      author: 'Leila S.',
      rating: 5,
      body: 'Sieht aus wie auf den Fotos und schmeckt besser. Perfekte Mittagsrolle.',
    },
    {
      id: 'r4',
      author: 'Kenji M.',
      rating: 5,
      body: 'Kam wegen Omakase-Feeling, blieb wegen dieser Rolle. Straff, sauber geschnitten, toller Sesam.',
    },
    {
      id: 'r5',
      author: 'Sara P.',
      rating: 4,
      body: 'Schöne Präsentation. Weniger Mayo gewünscht — immer noch ausgezeichnet.',
    },
  ],
  ar: [
    {
      id: 'r1',
      author: 'مايا ك.',
      rating: 5,
      body: 'الحرارة متوازنة والخيار يبقيها طازجة. أطلبه في كل زيارة لشينسي.',
    },
    {
      id: 'r2',
      author: 'يوناس ر.',
      rating: 4,
      body: 'مايو حار كريمي دون أن يغطي التونة. أود خيارًا أكثر حرارة في الزيارة القادمة.',
    },
    {
      id: 'r3',
      author: 'ليلى س.',
      rating: 5,
      body: 'يطابق الصور وطعمه أفضل. رول مثالي لمنتصف النهار.',
    },
    {
      id: 'r4',
      author: 'كينجي م.',
      rating: 5,
      body: 'جئت لطاقة الأوماكاسي وبقيت من أجل هذا الرول. لف محكم وقطع نظيف وسمسم رائع.',
    },
    {
      id: 'r5',
      author: 'سارة ب.',
      rating: 4,
      body: 'تقديم جميل. طلبت أقل مايونيز وما زال ممتازًا.',
    },
  ],
};

export const getMockMenuDetail = (locale: Locale, slug: string): MenuDetail | null => {
  if (slug !== mockMenuDetailSlug) {
    return null;
  }

  const base = menuItemsByLocale[locale].find((item) => item.code === DETAIL_ITEM_CODE);
  if (!base) {
    return null;
  }

  return {
    ...base,
    slug: mockMenuDetailSlug,
    story: stories[locale],
    origin: origins[locale],
    reviews: reviewCopy[locale],
    assembleVideoSrc: '/menu/sushi/sushi-assemble.mp4',
  };
};
