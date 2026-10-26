/**
 * @module components/motion/morph-paint
 * @meta Keeps surface paint continuous across scene replacements and cancels interrupted paint tweens.
 */

import { animate, useMotionValue } from 'motion/react';
import type { MotionValue } from 'motion/react';
import { createContext, useCallback, useContext, useMemo, useRef } from 'react';
import type { PropsWithChildren } from 'react';

interface MorphPaint {
  backgroundColor: MotionValue<string>;
  borderColor: MotionValue<string>;
  retarget: (surface: HTMLElement, reduced: boolean) => () => void;
}
const PaintContext = createContext<MorphPaint | null>(null);

export function MorphPaintProvider({ children }: PropsWithChildren) {
  const backgroundColor = useMotionValue('rgba(0,0,0,0)');
  const borderColor = useMotionValue('rgba(0,0,0,0)');
  const initialized = useRef(false);
  const retarget = useCallback(
    (surface: HTMLElement, reduced: boolean) => {
      const style = getComputedStyle(surface);
      const targets: [MotionValue<string>, string][] = [
        [backgroundColor, style.getPropertyValue('--morph-fill').trim() || 'rgba(0,0,0,0)'],
        [borderColor, style.getPropertyValue('--morph-stroke').trim() || '#26292e'],
      ];
      const immediate = reduced || !initialized.current;
      initialized.current = true;
      const controls = targets.map(([value, target]) => {
        if (immediate) {
          value.set(target);
          return null;
        }
        return animate(value, target, { duration: 0.75, ease: [0.22, 0.68, 0, 1] });
      });
      return () => {
        for (const control of controls) control?.stop();
      };
    },
    [backgroundColor, borderColor],
  );
  const value = useMemo(
    () => ({ backgroundColor, borderColor, retarget }),
    [backgroundColor, borderColor, retarget],
  );
  return <PaintContext.Provider value={value}>{children}</PaintContext.Provider>;
}

export function useMorphPaint() {
  return useContext(PaintContext);
}
