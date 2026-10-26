/**
 * @module components/motion/count-up.test
 * @meta Verifies final accessible values, reduced motion and delayed activation of persistent counters.
 */

import { waitFor } from '@testing-library/react';
import type * as Motion from 'motion/react';
import { describe, expect, it, vi } from 'vitest';

import { render } from '../../test/render';
import { CountUp } from './count-up';

const preference = vi.hoisted(() => ({ reduced: true }));
vi.mock('motion/react', async (original) => ({
  ...(await original<typeof Motion>()),
  useReducedMotion: () => preference.reduced,
}));

describe('count-up statistics', () => {
  it.each([
    { value: 42000, prefix: '£', expected: '£42,000' },
    { value: 6.67, prefix: '£', decimals: 2, expected: '£6.67' },
    { value: 47.6, prefix: '>', suffix: '%', decimals: 1, expected: '>47.6%' },
  ])('immediately presents $expected with reduced motion', ({ expected, ...props }) => {
    const { container } = render(<CountUp {...props} />);
    expect(container.querySelector('.count-up-reserve')).toHaveTextContent(expected);
    expect(container.querySelector('.count-up-value')).toHaveTextContent(expected);
    expect(container.querySelector('.count-up-value')).toHaveAttribute('aria-hidden', 'true');
    expect(container.querySelector('[aria-live]')).toBeNull();
  });

  it('waits for activation, reaches the target, and does not reset a persistent number on re-entry', async () => {
    preference.reduced = false;
    try {
      const { container, rerender } = render(<CountUp value={41} active={false} />);
      const number = container.querySelector('.count-up-value');
      expect(number).toHaveTextContent('0');
      expect(container.querySelector('.count-up-reserve')).toHaveTextContent('41');
      rerender(<CountUp value={41} active />);
      await waitFor(() => expect(number).toHaveTextContent('41'), { timeout: 2200 });
      rerender(<CountUp value={41} active={false} />);
      rerender(<CountUp value={41} active />);
      expect(container.querySelector('.count-up-value')).toBe(number);
      expect(number).toHaveTextContent('41');
    } finally {
      preference.reduced = true;
    }
  });
});
