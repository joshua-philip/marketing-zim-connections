/**
 * @module lib/idle-animation-clock.test
 * @meta Covers phase continuity on navigation, remounts and pauses without touching transition animations.
 */

import { describe, expect, it } from 'vitest';

import {
  createIdleClock,
  elapsedIdleTime,
  setIdleClockPaused,
  synchronizeIdleAnimations,
} from './idle-animation-clock';

function loop(animationName: string, currentTime = 0): Animation {
  return { animationName, currentTime } as unknown as CSSAnimation;
}

describe('deck ambient clock', () => {
  it('excludes paused time and resumes without resetting its phase', () => {
    let clock = createIdleClock(100);
    expect(elapsedIdleTime(clock, 2600)).toBe(2500);
    clock = setIdleClockPaused(clock, true, 2600);
    clock = setIdleClockPaused(clock, true, 9000);
    expect(elapsedIdleTime(clock, 10000)).toBe(2500);
    clock = setIdleClockPaused(clock, false, 10000);
    expect(elapsedIdleTime(clock, 11200)).toBe(3700);
  });

  it('joins new and revisited dividers to the running phase without seeking existing loops', () => {
    const seen = new WeakSet<Animation>();
    const persistent = loop('idle-divider');
    synchronizeIdleAnimations([persistent], seen, 2400);
    expect(persistent.currentTime).toBe(2400);
    persistent.currentTime = 3500;
    const next = loop('idle-month-sequence');
    synchronizeIdleAnimations([persistent, next], seen, 3600);
    expect(persistent.currentTime).toBe(3500);
    expect(next.currentTime).toBe(3600);
    const revisited = loop('idle-divider');
    synchronizeIdleAnimations([revisited], seen, 5100);
    expect(revisited.currentTime).toBe(5100);
  });

  it('resynchronizes ambient loops at pause boundaries but leaves text and morphs alone', () => {
    const seen = new WeakSet<Animation>();
    const divider = loop('idle-divider');
    const typing = loop('chat-type');
    const entrance = loop('text-entrance', 100);
    const morph = { currentTime: 160 } as Animation;
    synchronizeIdleAnimations([divider, typing, entrance, morph], seen, 2000);
    synchronizeIdleAnimations([divider, typing, entrance, morph], seen, 2200, true);
    expect(divider.currentTime).toBe(2200);
    expect(typing.currentTime).toBe(2200);
    expect(entrance.currentTime).toBe(100);
    expect(morph.currentTime).toBe(160);
  });
});
