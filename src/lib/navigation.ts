/**
 * @module lib/navigation
 * @meta Defines pure URL parsing, boundary and direction rules for the presentation.
 */

export type Direction = 1 | -1;

export interface NavigationState {
  index: number;
  direction: Direction;
}

/** Public URLs are one-based; components use zero-based slide indices. */
export function parseSlideHash(hash: string, slideCount: number): number | null {
  if (!/^#[1-9]\d*$/.test(hash)) return null;
  const number = Number(hash.slice(1));
  return Number.isSafeInteger(number) && number <= slideCount ? number - 1 : null;
}

export function clampSlideIndex(index: number, slideCount: number): number {
  if (!Number.isFinite(index)) return 0;
  return Math.max(0, Math.min(slideCount - 1, Math.trunc(index)));
}

export function navigationReducer(state: NavigationState, index: number): NavigationState {
  if (state.index === index) return state;
  return { index, direction: index > state.index ? 1 : -1 };
}

export function formatSlideNumber(index: number): string {
  return String(index + 1).padStart(2, '0');
}
