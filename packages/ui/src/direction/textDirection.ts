import type { TooltipPlacement } from '../components/base/Tooltip/Tooltip.position';
import type { TextDirection } from '../locale/locale';

export type { TextDirection };

export interface ResolveTextDirectionOptions {
  dir?: TextDirection;
  providerDir?: TextDirection;
  element?: Element | null;
}

export interface TextDirectionState {
  dir: TextDirection;
  isRtl: boolean;
}

const getDocumentDirection = (): TextDirection => {
  if (typeof document === 'undefined') {
    return 'ltr';
  }

  return document.documentElement.getAttribute('dir') === 'rtl' ? 'rtl' : 'ltr';
};

export const resolveTextDirectionFromElement = (
  element: Element | null | undefined,
): TextDirection => {
  if (!element) {
    return getDocumentDirection();
  }

  const closestDir = element.closest('[dir]')?.getAttribute('dir');
  if (closestDir === 'rtl' || closestDir === 'ltr') {
    return closestDir;
  }

  return getDocumentDirection();
};

export const resolveTextDirection = (
  options: ResolveTextDirectionOptions = {},
): TextDirectionState => {
  const dir =
    options.dir ??
    (options.element ? resolveTextDirectionFromElement(options.element) : undefined) ??
    options.providerDir ??
    getDocumentDirection();

  return { dir, isRtl: dir === 'rtl' };
};

const swapHorizontalPlacementToken = (placement: string): string => {
  return placement
    .replace(/\bleft\b/g, '__RIGHT__')
    .replace(/\bright\b/g, 'left')
    .replace(/__RIGHT__/g, 'right');
};

const swapInlinePlacementToken = (placement: string): string => {
  return placement
    .replace(/-start\b/g, '__END__')
    .replace(/-end\b/g, '-start')
    .replace(/__END__/g, '-end');
};

export const mirrorTooltipPlacementForRtl = (
  placement: TooltipPlacement,
  isRtl: boolean,
): TooltipPlacement => {
  if (!isRtl) {
    return placement;
  }

  const mirrored = swapInlinePlacementToken(swapHorizontalPlacementToken(placement));
  return mirrored as TooltipPlacement;
};

export const getHorizontalNavigationKeys = (
  isRtl: boolean,
): { next: string; previous: string } => ({
  next: isRtl ? 'ArrowLeft' : 'ArrowRight',
  previous: isRtl ? 'ArrowRight' : 'ArrowLeft',
});

export const getVerticalNavigationKeys = (): { next: string; previous: string } => ({
  next: 'ArrowDown',
  previous: 'ArrowUp',
});
