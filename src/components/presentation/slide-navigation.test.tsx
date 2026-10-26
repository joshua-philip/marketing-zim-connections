/**
 * @module components/presentation/slide-navigation.test
 * @meta Protects the single tooltip across pointer gaps, keyboard focus and chapter selection.
 */

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { slides } from '../../slides/registry';
import { render } from '../../test/render';
import { SlideNavigation } from './slide-navigation';

describe('chapter tooltip', () => {
  it('reuses the tooltip when moving across dots and only navigates on selection', async () => {
    const user = userEvent.setup();
    const select = vi.fn<(index: number) => void>();
    render(<SlideNavigation slides={slides} activeIndex={0} onSelect={select} />);
    const first = screen.getByRole('button', { name: 'Slide 1: The proposition' });
    const second = screen.getByRole('button', { name: 'Slide 2: The opportunity' });
    await user.hover(first);
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toHaveTextContent('The proposition');
    await user.unhover(first);
    await user.hover(second);
    expect(screen.getByRole('tooltip')).toBe(tooltip);
    expect(tooltip).toHaveTextContent('The opportunity');
    expect(second).toHaveAttribute('aria-describedby', tooltip.id);
    expect(select).not.toHaveBeenCalled();
    await user.click(second);
    expect(select).toHaveBeenCalledWith(1);
  });

  it('moves the same tooltip with keyboard focus', async () => {
    const user = userEvent.setup();
    render(<SlideNavigation slides={slides} activeIndex={0} onSelect={() => {}} />);
    await user.hover(screen.getByRole('button', { name: 'Slide 1: The proposition' }));
    await user.tab();
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toHaveTextContent('The proposition');
    await user.tab();
    expect(screen.getByRole('tooltip')).toBe(tooltip);
    expect(tooltip).toHaveTextContent('The opportunity');
  });
});
