/**
 * @module hooks/use-slide-fit
 * @meta Measures each slide against the available stage and refits on content, font or viewport changes.
 */

import { useLayoutEffect, useState } from 'react';
import type { RefObject } from 'react';

import { calculateSlideFit } from '../lib/slide-fit';

export function useSlideFit(
  stageRef: RefObject<HTMLDivElement | null>,
  contentRef: RefObject<HTMLDivElement | null>,
) {
  const [fit, setFit] = useState({ scale: 1, top: 0 });

  useLayoutEffect(() => {
    const content = contentRef.current;
    const stage = stageRef.current ?? content?.closest<HTMLDivElement>('.stage');
    if (!stage || !content) return;
    const media = window.matchMedia('(min-width: 601px)');
    const measure = () => {
      const next = media.matches
        ? // DOM height measurements round to whole pixels; reserve one pixel for fractional scaling.
          calculateSlideFit(content.offsetHeight, stage.clientHeight - 1)
        : { scale: 1, top: 0 };
      setFit((previous) =>
        Math.abs(previous.scale - next.scale) < 0.0001 && Math.abs(previous.top - next.top) < 0.1
          ? previous
          : next,
      );
    };
    measure();
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
    observer?.observe(stage);
    observer?.observe(content);
    window.addEventListener('resize', measure);
    media.addEventListener('change', measure);
    document.fonts?.addEventListener('loadingdone', measure);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', measure);
      media.removeEventListener('change', measure);
      document.fonts?.removeEventListener('loadingdone', measure);
    };
  }, [stageRef, contentRef]);

  return fit;
}
