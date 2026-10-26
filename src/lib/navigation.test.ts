/**
 * @module lib/navigation.test
 * @meta Regression coverage for lib / navigation.
 */

import { describe, expect, it } from 'vitest';

import { clampSlideIndex, navigationReducer, parseSlideHash } from './navigation';

describe('slide URLs', () => {
  it.each([
    ['#1', 0],
    ['#16', 15],
    ['#7', 6],
  ])('reads %s as index %i', (hash, index) => {
    expect(parseSlideHash(hash as string, 16)).toBe(index);
  });

  it.each([
    '',
    '#0',
    '#17',
    '#1.5',
    '#-1',
    '#hello',
    '#Infinity',
    '#1e1',
    '#01',
    '# 1',
    '#9007199254740992',
  ])('rejects invalid hash %s', (hash) => {
    expect(parseSlideHash(hash, 16)).toBeNull();
  });
});

describe('navigation boundaries and direction', () => {
  it('clamps to the available slides and handles non-finite input', () => {
    expect(clampSlideIndex(-10, 16)).toBe(0);
    expect(clampSlideIndex(20, 16)).toBe(15);
    expect(clampSlideIndex(2.8, 16)).toBe(2);
    expect(clampSlideIndex(NaN, 16)).toBe(0);
  });

  it('preserves direction at the boundary and reverses it when moving back', () => {
    const first = { index: 0, direction: 1 as const };
    expect(navigationReducer(first, 0)).toBe(first);
    const forward = navigationReducer(first, 8);
    expect(forward).toEqual({ index: 8, direction: 1 });
    expect(navigationReducer(forward, 2)).toEqual({ index: 2, direction: -1 });
  });
});
