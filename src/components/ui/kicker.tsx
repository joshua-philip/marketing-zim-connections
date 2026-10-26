/**
 * @module components/ui/kicker
 * @meta Renders the shared eyebrow primitive for slide headings and presenter panels.
 */

import * as m from 'motion/react-m';
import type { PropsWithChildren } from 'react';

import type { Direction } from '../../lib/navigation';
import { sharedTransition, copyTransition, COPY_EXIT_SECONDS } from '../motion/motion-presets';

export function Kicker({
  children,
  layoutId,
  direction = 1,
  active = true,
}: PropsWithChildren<{ layoutId?: string; direction?: Direction; active?: boolean }>) {
  return (
    <div className="kicker">
      <m.span layoutId={layoutId} transition={sharedTransition} />
      <m.div
        initial={layoutId ? { opacity: 0, y: direction * -16 } : false}
        animate={{ opacity: active ? 1 : 0, y: 0 }}
        exit={{ opacity: 0, transition: { duration: COPY_EXIT_SECONDS } }}
        transition={active ? copyTransition : { duration: COPY_EXIT_SECONDS }}
      >
        {children}
      </m.div>
    </div>
  );
}
