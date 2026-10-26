/**
 * @module components/ui/dialog.test
 * @meta Regression coverage for components / ui / dialog.
 */

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { render } from '../../test/render';
import { Dialog } from './dialog';

describe('presentation dialog', () => {
  it('keeps focus inside, excludes disabled controls and restores the trigger on close', async () => {
    const user = userEvent.setup();
    const root = document.createElement('div');
    root.id = 'root';
    const trigger = document.createElement('button');
    trigger.textContent = 'Open panel';
    root.append(trigger);
    document.body.append(root);
    trigger.focus();
    const { unmount } = render(
      <Dialog label="Test panel">
        <button>Close panel</button>
        <button disabled>Unavailable</button>
        <button>Next</button>
      </Dialog>,
    );
    const close = screen.getByRole('button', { name: 'Close panel' });
    expect(close).toHaveFocus();
    expect(root.inert).toBe(true);
    expect(document.body.style.overflow).toBe('hidden');
    await user.tab({ shift: true });
    expect(screen.getByRole('button', { name: 'Next' })).toHaveFocus();
    await user.tab();
    expect(close).toHaveFocus();
    unmount();
    expect(trigger).toHaveFocus();
    expect(root.inert).toBe(false);
    expect(document.body.style.overflow).toBe('');
    root.remove();
  });
});
