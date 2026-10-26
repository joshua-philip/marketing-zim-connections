/**
 * @module lib/slide-fit.test
 * @meta Covers centered fitting at constrained heights without cropping or enlarging slides.
 */

import { describe, expect, it } from 'vitest';

import { calculateSlideFit } from './slide-fit';

describe('slide fitting', () => {
  it('scales a tall slide to exactly the available stage', () => {
    expect(calculateSlideFit(600, 480)).toEqual({ scale: 0.8, top: 0 });
  });
  it('centers short slides without enlarging the typography', () => {
    expect(calculateSlideFit(400, 600)).toEqual({ scale: 1, top: 100 });
  });
  it('keeps the initial unmeasured layout stable', () => {
    expect(calculateSlideFit(0, 0)).toEqual({ scale: 1, top: 0 });
  });
});
