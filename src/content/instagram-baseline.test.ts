/**
 * @module content/instagram-baseline.test
 * @meta Validates the public-feed sampling window and the format mix presented in the deck.
 */

import { describe, expect, it } from 'vitest';

import {
  instagramBaseline,
  observedPostsPerWeek,
  recentPostSample,
  recentReelCount,
} from './instagram-baseline';

describe('public Instagram audit', () => {
  it('counts unique feed items inside an inclusive 28-day observation window', () => {
    const start = Date.parse(instagramBaseline.windowStart);
    const end = Date.parse(instagramBaseline.observedOn);
    expect((end - start) / 86400000 + 1).toBe(28);
    expect(new Set(instagramBaseline.posts.map((post) => post.path)).size).toBe(13);
    const dates = instagramBaseline.posts.map((post) => Date.parse(post.date));
    expect(dates.every((date) => date >= start && date <= end)).toBe(true);
    expect(dates).toEqual([...dates].sort((a, b) => b - a));
    expect(observedPostsPerWeek).toBe(3.25);
  });

  it('uses the ten most recent dated items for the displayed Reels ratio', () => {
    expect(recentPostSample).toHaveLength(10);
    expect(recentReelCount).toBe(5);
    expect(recentPostSample.filter((post) => post.format === 'carousel')).toHaveLength(4);
    expect(recentPostSample.filter((post) => post.format === 'image')).toHaveLength(1);
  });
});
