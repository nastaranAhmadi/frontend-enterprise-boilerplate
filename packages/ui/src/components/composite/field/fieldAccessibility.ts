export const buildAriaDescribedBy = (...ids: Array<string | undefined>): string | undefined => {
  const value = ids.filter(Boolean).join(' ');
  return value || undefined;
};
