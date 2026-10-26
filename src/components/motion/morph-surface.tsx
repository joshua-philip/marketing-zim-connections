/**
 * @module components/motion/morph-surface
 * @meta Separates size-changing shape projection from independently animated copy and a bounded text handoff.
 */

import { useReducedMotion } from 'motion/react';
import type { HTMLMotionProps } from 'motion/react';
import * as m from 'motion/react-m';
import { useLayoutEffect, useRef } from 'react';
import type { PropsWithChildren } from 'react';

import { useSlideMetadata } from '../presentation/slide-context';
import { useMorphPaint } from './morph-paint';
import { sharedTransition, copyTransition, COPY_EXIT_SECONDS } from './motion-presets';

export function MorphSurface({
  children,
  depth = false,
  ...props
}: PropsWithChildren<Omit<HTMLMotionProps<'div'>, 'children'> & { depth?: boolean }>) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const paint = useMorphPaint();
  const retarget = paint?.retarget;
  const { isActive, direction } = useSlideMetadata();
  useLayoutEffect(() => {
    if (isActive && ref.current && retarget) return retarget(ref.current, Boolean(reduced));
  }, [isActive, reduced, retarget]);
  return (
    <m.div
      {...props}
      ref={ref}
      data-morph="story-surface"
      data-depth={depth || undefined}
      initial={reduced ? false : { '--surface-ink': 0, '--surface-offset': `${direction * -18}px` }}
      animate={{ '--surface-ink': isActive ? 1 : 0, '--surface-offset': '0px' }}
      transition={
        reduced ? { duration: 0 } : isActive ? copyTransition : { duration: COPY_EXIT_SECONDS }
      }
    >
      <m.span
        className="morph-frame"
        aria-hidden="true"
        layoutId={reduced ? undefined : 'story-surface'}
        initial={false}
        style={{
          visibility: isActive ? 'visible' : 'hidden',
          backgroundColor: paint?.backgroundColor,
          borderColor: paint?.borderColor,
        }}
        transition={reduced ? { duration: 0 } : sharedTransition}
      />
      {children}
    </m.div>
  );
}
