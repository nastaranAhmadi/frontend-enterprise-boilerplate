import { useOptionalDesignSystem } from '../providers/DesignSystemContext';

/**
 * Resolves picker/form locale: explicit prop → DesignSystemProvider → `'en'`.
 */
export const useResolvedLocale = (localeProp?: string): string => {
  const designSystem = useOptionalDesignSystem();
  return localeProp ?? designSystem?.locale ?? 'en';
};
