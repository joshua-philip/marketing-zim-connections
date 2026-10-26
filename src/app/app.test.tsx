/**
 * @module app/app.test
 * @meta Regression coverage for app / app.
 */

import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { render } from '../test/render';
import { App } from './app';

describe('presentation experience', () => {
  it('pauses ambient animation independently of navigation and during the overview', async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);
    const app = container.querySelector('.app');
    expect(app).toHaveAttribute('data-idle-motion', 'playing');
    await user.click(screen.getByRole('button', { name: 'Pause ambient motion' }));
    expect(app).toHaveAttribute('data-idle-motion', 'paused');
    fireEvent.keyDown(window, { key: 'ArrowDown' });
    expect(
      await screen.findByRole('region', { name: 'Slide 2: The opportunity' }),
    ).toBeInTheDocument();
    expect(app).toHaveAttribute('data-idle-motion', 'paused');
    await user.click(screen.getByRole('button', { name: 'Resume ambient motion' }));
    expect(app).toHaveAttribute('data-idle-motion', 'playing');
    fireEvent.keyDown(window, { key: 'g' });
    expect(await screen.findByRole('dialog', { name: 'Slide overview' })).toBeInTheDocument();
    expect(app).toHaveAttribute('data-idle-motion', 'paused');
    fireEvent.keyDown(window, { key: 'Escape' });
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(app).toHaveAttribute('data-idle-motion', 'playing');
  });

  it('navigates with the keyboard without exposing private presenter controls', async () => {
    render(<App />);
    expect(screen.getByRole('region', { name: 'Slide 1: The proposition' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Previous slide' })).toBeDisabled();
    fireEvent.keyDown(window, { key: 'ArrowDown' });
    expect(window.location.hash).toBe('');
    expect(
      await screen.findByRole('region', { name: 'Slide 2: The opportunity' }),
    ).toBeInTheDocument();
    fireEvent.keyDown(window, { key: 'n' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /presenter notes/i })).not.toBeInTheDocument();
  });

  it('jumps from the overview to the final slide and prevents advancing past it', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'THE DECK' }));
    const overview = await screen.findByRole('dialog', { name: 'Slide overview' });
    await user.click(within(overview).getByRole('button', { name: /16 References/ }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(window.location.hash).toBe('');
    expect(screen.getByRole('button', { name: 'Next slide' })).toBeDisabled();
    expect(screen.getByRole('region', { name: 'Slide 16: References' })).toBeInTheDocument();
  });
});
