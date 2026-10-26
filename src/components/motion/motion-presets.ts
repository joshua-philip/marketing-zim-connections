/**
 * @module components/motion/motion-presets
 * @meta Coordinates a short copy handoff with a longer, interruptible spring morph.
 */

import type { Transition, Variants } from 'motion/react';

import type { Direction } from '../../lib/navigation';

export const COPY_EXIT_SECONDS = 0.12;
export const COPY_ENTER_DELAY = 0.26;
export const sharedTransition: Transition = {
  type: 'spring',
  stiffness: 105,
  damping: 23,
  mass: 0.9,
};
export const copyTransition: Transition = {
  duration: 0.72,
  ease: [0.22, 0.68, 0, 1],
  delay: COPY_ENTER_DELAY,
  opacity: { duration: 0.22, delay: COPY_ENTER_DELAY, ease: 'easeOut' },
  '--surface-ink': { duration: 0.22, delay: COPY_ENTER_DELAY, ease: 'easeOut' },
};
export const flowVariants: Variants = {
  enter: (direction: Direction) => ({ opacity: 0, y: direction * -28 }),
  center: { opacity: 1, y: 0, transition: copyTransition },
  exit: { opacity: 0, transition: { duration: COPY_EXIT_SECONDS } },
};
export const sceneVariants: Variants = {
  enter: { '--scene-ink': 0 },
  center: { '--scene-ink': 1, transition: copyTransition },
  exit: { '--scene-ink': 0, transition: { duration: COPY_EXIT_SECONDS } },
};
