/**
 * @module components/motion/motion-features
 * @meta Supplies the existing full Motion feature set synchronously, including shared layout projection.
 */

import { domMax, LazyMotion } from 'motion/react';
import type { PropsWithChildren } from 'react';

export function MotionFeatures({ children }: PropsWithChildren) {
  return (
    <LazyMotion features={domMax} strict>
      {children}
    </LazyMotion>
  );
}
