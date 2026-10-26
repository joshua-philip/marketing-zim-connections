/**
 * @module components/motion/count-up
 * @meta Counts in place without changing layout width; assistive technology reads the final value once.
 */

import { animate, useMotionValue, useReducedMotion, useTransform } from 'motion/react';
import * as m from 'motion/react-m';
import { useEffect, useMemo } from 'react';

import { COPY_ENTER_DELAY } from './motion-presets';

interface CountUpProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  active?: boolean;
}

export function CountUp({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  active = true,
}: CountUpProps) {
  const reduced = useReducedMotion();
  const number = useMotionValue(reduced ? value : 0);
  const formatter = useMemo(
    () =>
      new Intl.NumberFormat('en-GB', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }),
    [decimals],
  );
  const text = useTransform(number, (current) => `${prefix}${formatter.format(current)}${suffix}`);
  const final = `${prefix}${formatter.format(value)}${suffix}`;

  useEffect(() => {
    if (reduced) {
      number.set(value);
      return;
    }
    if (!active) return;
    const controls = animate(number, value, {
      duration: 1.45,
      delay: COPY_ENTER_DELAY,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [active, number, reduced, value]);

  return (
    <span className="count-up" data-count-up={final}>
      <span className="count-up-reserve">{final}</span>
      <m.span className="count-up-value" aria-hidden="true">
        {text}
      </m.span>
    </span>
  );
}
