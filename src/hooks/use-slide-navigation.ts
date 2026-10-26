/**
 * @module hooks/use-slide-navigation
 * @meta Keeps bounded navigation and reload state while leaving the public URL free of slide numbers.
 */

import { useCallback, useEffect, useLayoutEffect, useReducer, useRef } from 'react';

import { clampSlideIndex, navigationReducer, parseSlideHash } from '../lib/navigation';

function initialIndex(slideCount: number) {
  if (window.location.hash) return parseSlideHash(window.location.hash, slideCount) ?? 0;
  const saved: unknown = window.history.state?.zimSlideIndex;
  return typeof saved === 'number' && Number.isInteger(saved) && saved >= 0 && saved < slideCount
    ? saved
    : 0;
}

function rememberSlide(index: number) {
  window.history.replaceState(
    { ...window.history.state, zimSlideIndex: index },
    '',
    window.location.pathname + window.location.search,
  );
}

export function useSlideNavigation(slideCount: number) {
  const [state, dispatch] = useReducer(navigationReducer, undefined, () => ({
    index: initialIndex(slideCount),
    direction: 1 as const,
  }));

  useLayoutEffect(() => {
    rememberSlide(state.index);
    // A long phone slide must hand off to the next slide's beginning, not its old scroll offset.
    if (window.scrollY > 0) window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [state.index]);

  const currentIndex = useRef(state.index);

  const goTo = useCallback(
    (index: number) => {
      const nextIndex = clampSlideIndex(index, slideCount);
      currentIndex.current = nextIndex;
      dispatch(nextIndex);
    },
    [slideCount],
  );

  useEffect(() => {
    const syncHash = () => {
      const index = parseSlideHash(window.location.hash, slideCount);
      if (index !== null) {
        currentIndex.current = index;
        dispatch(index);
      }
      // Accept old shared links, then remove the fragment even when the selected slide is unchanged.
      rememberSlide(currentIndex.current);
    };
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, [slideCount]);

  const next = useCallback(() => goTo(currentIndex.current + 1), [goTo]);
  const previous = useCallback(() => goTo(currentIndex.current - 1), [goTo]);

  return { ...state, goTo, next, previous };
}
