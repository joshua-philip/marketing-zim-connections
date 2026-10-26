/**
 * @module components/motion/animated-title
 * @meta Moves each complete headline without projecting or duplicating its text.
 */

import { useReducedMotion } from 'motion/react';
import * as m from 'motion/react-m';
import type { PropsWithChildren } from 'react';

import { useSlideMetadata } from '../presentation/slide-context';
import { flowVariants } from './motion-presets';

export function AnimatedTitle({ children }: PropsWithChildren) {
  const { direction, isActive } = useSlideMetadata();
  const reduced = useReducedMotion();
  return (
    <m.h1
      initial={reduced ? false : 'enter'}
      animate={isActive ? 'center' : 'exit'}
      custom={direction}
      variants={reduced ? {} : flowVariants}
    >
      {children}
    </m.h1>
  );
}
