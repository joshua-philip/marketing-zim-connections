/**
 * @module hooks/use-slide-gestures
 * @meta Throttles wheel navigation and preserves scrolling inside long slides.
 */

import { useRef } from 'react';
import type { TouchEvent, WheelEvent } from 'react';

const WHEEL_COOLDOWN_MS = 420;
const WHEEL_THRESHOLD = 20;
const SWIPE_THRESHOLD = 60;

interface GestureOptions {
  onNext: () => void;
  onPrevious: () => void;
  disabled: boolean;
}

export function useSlideGestures({ onNext, onPrevious, disabled }: GestureOptions) {
  const lastWheelAt = useRef(-Infinity);
  const lastWheelDirection = useRef(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const onWheel = (event: WheelEvent<HTMLElement>) => {
    if (disabled || event.ctrlKey || Math.abs(event.deltaY) < WHEEL_THRESHOLD) return;
    // Long slides scroll normally on smaller screens. Navigate only at their boundaries.
    const atTop = window.scrollY <= 1;
    const atBottom =
      window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1;
    if ((event.deltaY < 0 && !atTop) || (event.deltaY > 0 && !atBottom)) return;
    const now = Date.now();
    const direction = Math.sign(event.deltaY);
    if (direction === lastWheelDirection.current && now - lastWheelAt.current < WHEEL_COOLDOWN_MS)
      return;
    lastWheelDirection.current = direction;
    lastWheelAt.current = now;
    if (event.deltaY > 0) onNext();
    else onPrevious();
  };

  const onTouchStart = (event: TouchEvent<HTMLElement>) => {
    const touch = event.touches[0];
    touchStart.current = touch ? { x: touch.clientX, y: touch.clientY } : null;
  };

  const onTouchEnd = (event: TouchEvent<HTMLElement>) => {
    const start = touchStart.current;
    touchStart.current = null;
    const end = event.changedTouches[0];
    if (disabled || !start || !end) return;
    const deltaY = start.y - end.clientY;
    const deltaX = start.x - end.clientX;
    if (Math.abs(deltaY) <= SWIPE_THRESHOLD || Math.abs(deltaX) >= Math.abs(deltaY)) return;
    const atTop = window.scrollY <= 1;
    const atBottom =
      window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1;
    if (deltaY > 0 && atBottom) onNext();
    if (deltaY < 0 && atTop) onPrevious();
  };

  const onTouchCancel = () => {
    touchStart.current = null;
  };
  return { onWheel, onTouchStart, onTouchEnd, onTouchCancel };
}
