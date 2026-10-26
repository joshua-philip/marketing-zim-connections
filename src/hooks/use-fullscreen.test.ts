/**
 * @module hooks/use-fullscreen.test
 * @meta Regression coverage for hooks / use-fullscreen.
 */

import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useFullscreen } from './use-fullscreen';

describe('fullscreen', () => {
  it('handles a rejected request without an unhandled promise', async () => {
    const request = vi.fn<() => Promise<void>>().mockRejectedValue(new Error('Permission denied'));
    Object.defineProperty(document.documentElement, 'requestFullscreen', {
      configurable: true,
      value: request,
    });
    const { result } = renderHook(() => useFullscreen());
    await act(() => result.current.toggleFullscreen());
    expect(request).toHaveBeenCalledOnce();
    expect(result.current.isFullscreen).toBe(false);
    expect(result.current.fullscreenError).toContain('could not be opened');
    Reflect.deleteProperty(document.documentElement, 'requestFullscreen');
  });

  it('tracks the browser fullscreen state and exits when active', async () => {
    const exit = vi.fn<() => Promise<void>>().mockResolvedValue(undefined);
    Object.defineProperty(document, 'exitFullscreen', { configurable: true, value: exit });
    const { result } = renderHook(() => useFullscreen());
    act(() => {
      Object.defineProperty(document, 'fullscreenElement', {
        configurable: true,
        value: document.documentElement,
      });
      document.dispatchEvent(new Event('fullscreenchange'));
    });
    expect(result.current.isFullscreen).toBe(true);
    await act(() => result.current.toggleFullscreen());
    expect(exit).toHaveBeenCalledOnce();
    Object.defineProperty(document, 'fullscreenElement', { configurable: true, value: null });
  });
});
