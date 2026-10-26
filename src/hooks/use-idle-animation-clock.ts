/**
 * @module hooks/use-idle-animation-clock
 * @meta Seeks new scene loops to a deck-wide clock without a render loop or changing slide morphs.
 */

import { useLayoutEffect, useRef, type RefObject } from 'react';

import {
  createIdleClock,
  elapsedIdleTime,
  setIdleClockPaused,
  synchronizeIdleAnimations,
  type IdleClock,
} from '../lib/idle-animation-clock';

export function useIdleAnimationClock(
  root: RefObject<HTMLDivElement | null>,
  paused: boolean,
  sceneKey: number,
): void {
  const clock = useRef<IdleClock | null>(null);
  const seen = useRef(new WeakSet<Animation>());

  useLayoutEffect(() => {
    const now = performance.now();
    const previous = clock.current ?? createIdleClock(now);
    const pauseChanged = previous.paused !== paused;
    clock.current = setIdleClockPaused(previous, paused, now);

    // Scene retention and shared anchors settle in layout effects. Seek after those commits,
    // before the next paint, including CSS animations on divider pseudo-elements.
    const frame = requestAnimationFrame(() => {
      const element = root.current;
      if (!element?.getAnimations || !clock.current) return;
      synchronizeIdleAnimations(
        element.getAnimations({ subtree: true }),
        seen.current,
        elapsedIdleTime(clock.current, performance.now()),
        pauseChanged,
      );
    });
    return () => cancelAnimationFrame(frame);
  }, [root, paused, sceneKey]);
}
