/**
 * @module hooks/use-presentation-keyboard.test
 * @meta Regression coverage for hooks / use-presentation-keyboard.
 */

import { fireEvent, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { usePresentationKeyboard } from './use-presentation-keyboard';

function createActions() {
  return {
    onNext: vi.fn<() => void>(),
    onPrevious: vi.fn<() => void>(),
    onFirst: vi.fn<() => void>(),
    onLast: vi.fn<() => void>(),
    onOverview: vi.fn<() => void>(),
    onFullscreen: vi.fn<() => void>(),
    onClose: vi.fn<() => void>(),
    overviewOpen: false,
  };
}

describe('presentation keyboard controls', () => {
  it('supports slide controls, panels and fullscreen shortcuts', () => {
    const actions = createActions();
    renderHook(() => usePresentationKeyboard(actions));
    for (const key of ['ArrowDown', 'ArrowRight', 'PageDown', ' '])
      fireEvent.keyDown(window, { key });
    expect(actions.onNext).toHaveBeenCalledTimes(4);
    for (const key of ['ArrowUp', 'ArrowLeft', 'PageUp']) fireEvent.keyDown(window, { key });
    expect(actions.onPrevious).toHaveBeenCalledTimes(3);
    for (const key of ['Home', 'End', 'g', 'f', 'Escape']) fireEvent.keyDown(window, { key });
    for (const callback of [
      actions.onFirst,
      actions.onLast,
      actions.onOverview,
      actions.onFullscreen,
      actions.onClose,
    ])
      expect(callback).toHaveBeenCalledOnce();
  });

  it('does not change slides behind the overview or hijack browser shortcuts', () => {
    const actions = { ...createActions(), overviewOpen: true };
    renderHook(() => usePresentationKeyboard(actions));
    fireEvent.keyDown(window, { key: 'ArrowDown' });
    fireEvent.keyDown(window, { key: 'f', ctrlKey: true });
    expect(actions.onNext).not.toHaveBeenCalled();
    expect(actions.onFullscreen).not.toHaveBeenCalled();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(actions.onClose).toHaveBeenCalledOnce();
  });

  it('leaves typing and native button Space activation alone', () => {
    const actions = createActions();
    renderHook(() => usePresentationKeyboard(actions));
    const input = document.createElement('input');
    const button = document.createElement('button');
    document.body.append(input, button);
    fireEvent.keyDown(input, { key: 'g' });
    fireEvent.keyDown(button, { key: ' ' });
    expect(actions.onOverview).not.toHaveBeenCalled();
    expect(actions.onNext).not.toHaveBeenCalled();
    input.remove();
    button.remove();
  });
});
