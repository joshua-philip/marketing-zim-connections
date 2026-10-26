/**
 * @module hooks/use-slide-navigation.test
 * @meta Regression coverage for hooks / use-slide-navigation.
 */

import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSlideNavigation } from './use-slide-navigation';

describe('useSlideNavigation', () => {
  it('accepts an old slide link and keeps navigation and reload state without URL fragments', () => {
    window.history.replaceState(null, '', '#9');
    const { result } = renderHook(() => useSlideNavigation(16));
    expect(result.current.index).toBe(8);
    expect(window.location.hash).toBe('');
    act(() => result.current.previous());
    expect(result.current.index).toBe(7);
    expect(result.current.direction).toBe(-1);
    expect(window.location.hash).toBe('');
    expect(window.history.state.zimSlideIndex).toBe(7);
    act(() => result.current.goTo(99));
    expect(result.current.index).toBe(15);
    expect(window.location.hash).toBe('');
    expect(window.history.state.zimSlideIndex).toBe(15);
    act(() => result.current.next());
    expect(result.current.index).toBe(15);
  });

  it('accumulates rapid navigation before React commits and accepts an immediate reversal', () => {
    const { result } = renderHook(() => useSlideNavigation(16));
    act(() => {
      result.current.next();
      result.current.next();
      result.current.next();
      result.current.previous();
    });
    expect(result.current.index).toBe(2);
    expect(result.current.direction).toBe(-1);
    expect(window.location.hash).toBe('');
    expect(window.history.state.zimSlideIndex).toBe(2);
  });

  it('falls back safely for an invalid URL', () => {
    window.history.replaceState(null, '', '#2.5');
    const { result } = renderHook(() => useSlideNavigation(16));
    expect(result.current.index).toBe(0);
    expect(window.location.hash).toBe('');
  });

  it('responds to external hash changes without accepting malformed slide numbers', () => {
    const { result } = renderHook(() => useSlideNavigation(16));
    act(() => {
      window.history.replaceState(null, '', '#12');
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });
    expect(result.current.index).toBe(11);
    expect(window.location.hash).toBe('');
    act(() => {
      window.history.replaceState(null, '', '#-2');
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });
    expect(result.current.index).toBe(11);
    expect(window.location.hash).toBe('');
  });

  it('restores the current slide after remounting while preserving the path, query and other history state', () => {
    window.history.replaceState({ other: 'keep' }, '', '/deck/?preview=true');
    const first = renderHook(() => useSlideNavigation(16));
    act(() => first.result.current.goTo(10));
    first.unmount();
    const second = renderHook(() => useSlideNavigation(16));
    expect(second.result.current.index).toBe(10);
    expect(window.location.pathname + window.location.search + window.location.hash).toBe(
      '/deck/?preview=true',
    );
    expect(window.history.state).toEqual({ other: 'keep', zimSlideIndex: 10 });
  });

  it('rejects malformed saved slide state', () => {
    window.history.replaceState({ zimSlideIndex: 99 }, '', '/');
    const { result } = renderHook(() => useSlideNavigation(16));
    expect(result.current.index).toBe(0);
    expect(window.history.state.zimSlideIndex).toBe(0);
  });
  it('starts the next slide at the top after scrolling a long phone slide', () => {
    const descriptor = Object.getOwnPropertyDescriptor(window, 'scrollY');
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    try {
      Object.defineProperty(window, 'scrollY', { configurable: true, value: 0 });
      const { result } = renderHook(() => useSlideNavigation(16));
      Object.defineProperty(window, 'scrollY', { configurable: true, value: 650 });
      act(() => result.current.next());
      expect(scrollTo).toHaveBeenCalledExactlyOnceWith({ top: 0, left: 0, behavior: 'instant' });
      expect(result.current.index).toBe(1);
    } finally {
      if (descriptor) Object.defineProperty(window, 'scrollY', descriptor);
    }
  });
});
