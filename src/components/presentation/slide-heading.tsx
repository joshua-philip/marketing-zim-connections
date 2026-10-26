/**
 * @module components/presentation/slide-heading
 * @meta Composes metadata-driven chapter labels and animated headlines without duplicating slide chrome.
 */

import { useReducedMotion } from 'motion/react';
import type { PropsWithChildren } from 'react';

import { AnimatedTitle } from '../motion/animated-title';
import { Kicker } from '../ui/kicker';
import { useSlideMetadata } from './slide-context';

export function SlideHeading({ children }: PropsWithChildren) {
  const reduced = useReducedMotion();
  const { slide, direction, isActive } = useSlideMetadata();
  const headline = <AnimatedTitle>{children}</AnimatedTitle>;

  return (
    <>
      <Kicker
        layoutId={reduced ? undefined : 'chapter-rule'}
        direction={direction}
        active={isActive}
      >
        {slide.eyebrow}
      </Kicker>
      {headline}
    </>
  );
}
