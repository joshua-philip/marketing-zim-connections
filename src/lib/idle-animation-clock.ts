/**
 * @module lib/idle-animation-clock
 * @meta Keeps ambient CSS animation phases continuous across scene mounts and presenter pauses.
 */

export interface IdleClock {
  accumulated: number;
  runningSince: number;
  paused: boolean;
}

export function createIdleClock(now: number): IdleClock {
  return { accumulated: 0, runningSince: now, paused: false };
}

export function elapsedIdleTime(clock: IdleClock, now: number): number {
  return clock.accumulated + (clock.paused ? 0 : now - clock.runningSince);
}

export function setIdleClockPaused(clock: IdleClock, paused: boolean, now: number): IdleClock {
  if (clock.paused === paused) return clock;
  return { accumulated: elapsedIdleTime(clock, now), runningSince: now, paused };
}

/** Seek newly mounted ambient loops only; slide transitions and text entrances retain their timing. */
export function synchronizeIdleAnimations(
  animations: Animation[],
  seen: WeakSet<Animation>,
  elapsed: number,
  resynchronize = false,
): void {
  for (const animation of animations) {
    if (!('animationName' in animation) || typeof animation.animationName !== 'string') continue;
    if (!animation.animationName.startsWith('idle-') && animation.animationName !== 'chat-type') {
      continue;
    }
    if (resynchronize || !seen.has(animation)) animation.currentTime = elapsed;
    seen.add(animation);
  }
}
