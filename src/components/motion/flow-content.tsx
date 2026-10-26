/**
 * @module components/motion/flow-content
 * @meta Moves supporting copy downward between scenes while shared surfaces remain independently visible.
 */

import { useReducedMotion } from 'motion/react';
import type { HTMLMotionProps } from 'motion/react';
import * as m from 'motion/react-m';

import { useSlideMetadata } from '../presentation/slide-context';
import { flowVariants } from './motion-presets';

export function FlowBlock(props: HTMLMotionProps<'div'>) {
  const { direction, isActive } = useSlideMetadata();
  const reduced = useReducedMotion();
  return (
    <m.div
      {...props}
      data-flow-content="true"
      initial={reduced ? false : 'enter'}
      animate={isActive ? 'center' : 'exit'}
      custom={direction}
      variants={reduced ? {} : flowVariants}
    />
  );
}

export function FlowText(props: HTMLMotionProps<'p'>) {
  const { direction, isActive } = useSlideMetadata();
  const reduced = useReducedMotion();
  return (
    <m.p
      {...props}
      data-flow-content="true"
      initial={reduced ? false : 'enter'}
      animate={isActive ? 'center' : 'exit'}
      custom={direction}
      variants={reduced ? {} : flowVariants}
    />
  );
}

export function FlowLabel(props: HTMLMotionProps<'span'>) {
  const { direction, isActive } = useSlideMetadata();
  const reduced = useReducedMotion();
  return (
    <m.span
      {...props}
      data-flow-content="true"
      style={{ display: 'inline-block', ...props.style }}
      initial={reduced ? false : 'enter'}
      animate={isActive ? 'center' : 'exit'}
      custom={direction}
      variants={reduced ? {} : flowVariants}
    />
  );
}
