/**
 * @module hooks/use-slide-gestures.test
 * @meta Regression coverage for hooks / use-slide-gestures.
 */

import { fireEvent, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { render } from '../test/render';
import { useSlideGestures } from './use-slide-gestures';

const initialScrollY = Object.getOwnPropertyDescriptor(window, 'scrollY');
const initialScrollHeight = Object.getOwnPropertyDescriptor(
  document.documentElement,
  'scrollHeight',
);

function setScroll(scrollY: number, scrollHeight: number) {
  Object.defineProperty(window, 'scrollY', { configurable: true, value: scrollY });
  Object.defineProperty(document.documentElement, 'scrollHeight', {
    configurable: true,
    value: scrollHeight,
  });
}

function GestureSurface({
  onNext,
  onPrevious,
  disabled = false,
}: {
  onNext: () => void;
  onPrevious: () => void;
  disabled?: boolean;
}) {
  const gestures = useSlideGestures({ onNext, onPrevious, disabled });
  return <main aria-label="Gesture surface" {...gestures} />;
}

afterEach(() => {
  if (initialScrollY) Object.defineProperty(window, 'scrollY', initialScrollY);
  if (initialScrollHeight)
    Object.defineProperty(document.documentElement, 'scrollHeight', initialScrollHeight);
  else Reflect.deleteProperty(document.documentElement, 'scrollHeight');
});

describe('slide gestures', () => {
  it('advances once for a burst of wheel events, then permits the next gesture', () => {
    const onNext = vi.fn<() => void>(),
      onPrevious = vi.fn<() => void>();
    setScroll(0, window.innerHeight);
    const clock = vi.spyOn(Date, 'now').mockReturnValue(1000);
    render(<GestureSurface onNext={onNext} onPrevious={onPrevious} />);
    const surface = screen.getByRole('main');
    fireEvent.wheel(surface, { deltaY: 100 });
    fireEvent.wheel(surface, { deltaY: 100 });
    expect(onNext).toHaveBeenCalledOnce();
    clock.mockReturnValue(2200);
    fireEvent.wheel(surface, { deltaY: -100 });
    expect(onPrevious).toHaveBeenCalledOnce();
  });

  it('allows a reversal during cooldown and a new forward gesture before the morph completes', () => {
    const onNext = vi.fn<() => void>();
    const onPrevious = vi.fn<() => void>();
    setScroll(0, window.innerHeight);
    const clock = vi.spyOn(Date, 'now').mockReturnValue(1000);
    render(<GestureSurface onNext={onNext} onPrevious={onPrevious} />);
    const surface = screen.getByRole('main');
    fireEvent.wheel(surface, { deltaY: 100 });
    clock.mockReturnValue(1450);
    fireEvent.wheel(surface, { deltaY: 100 });
    clock.mockReturnValue(1460);
    fireEvent.wheel(surface, { deltaY: -100 });
    fireEvent.wheel(surface, { deltaY: -100 });
    expect(onNext).toHaveBeenCalledTimes(2);
    expect(onPrevious).toHaveBeenCalledOnce();
  });

  it('lets a tall slide scroll before navigating at its bottom edge', () => {
    const onNext = vi.fn<() => void>(),
      onPrevious = vi.fn<() => void>();
    render(<GestureSurface onNext={onNext} onPrevious={onPrevious} />);
    const surface = screen.getByRole('main');
    setScroll(100, 2000);
    fireEvent.wheel(surface, { deltaY: 100 });
    fireEvent.wheel(surface, { deltaY: -100 });
    expect(onNext).not.toHaveBeenCalled();
    expect(onPrevious).not.toHaveBeenCalled();
    setScroll(2000 - window.innerHeight, 2000);
    fireEvent.wheel(surface, { deltaY: 100 });
    expect(onNext).toHaveBeenCalledOnce();
  });

  it('ignores zoom, small movement and gestures while a panel is open', () => {
    const onNext = vi.fn<() => void>(),
      onPrevious = vi.fn<() => void>();
    setScroll(0, window.innerHeight);
    const { rerender } = render(<GestureSurface onNext={onNext} onPrevious={onPrevious} />);
    const surface = screen.getByRole('main');
    fireEvent.wheel(surface, { deltaY: 100, ctrlKey: true });
    fireEvent.wheel(surface, { deltaY: 5 });
    rerender(<GestureSurface disabled onNext={onNext} onPrevious={onPrevious} />);
    fireEvent.wheel(surface, { deltaY: 100 });
    expect(onNext).not.toHaveBeenCalled();
  });

  it('supports vertical swipes and discards horizontal and cancelled gestures', () => {
    const onNext = vi.fn<() => void>(),
      onPrevious = vi.fn<() => void>();
    setScroll(0, window.innerHeight);
    render(<GestureSurface onNext={onNext} onPrevious={onPrevious} />);
    const surface = screen.getByRole('main');
    fireEvent.touchStart(surface, { touches: [{ clientX: 10, clientY: 200 }] });
    fireEvent.touchEnd(surface, { changedTouches: [{ clientX: 10, clientY: 100 }] });
    expect(onNext).toHaveBeenCalledOnce();
    fireEvent.touchStart(surface, { touches: [{ clientX: 10, clientY: 100 }] });
    fireEvent.touchEnd(surface, { changedTouches: [{ clientX: 200, clientY: 200 }] });
    expect(onPrevious).not.toHaveBeenCalled();
    fireEvent.touchStart(surface, { touches: [{ clientX: 10, clientY: 100 }] });
    fireEvent.touchCancel(surface);
    fireEvent.touchEnd(surface, { changedTouches: [{ clientX: 10, clientY: 200 }] });
    expect(onPrevious).not.toHaveBeenCalled();
  });
});
