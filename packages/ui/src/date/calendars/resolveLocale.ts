export const resolveDayjsLocale = (locale: string): string => {
  const language = locale.toLowerCase().split('-')[0];
  if (language === 'fa') {
    return 'fa';
  }

  return 'en';
};
