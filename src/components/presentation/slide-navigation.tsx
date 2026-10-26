/**
 * @module components/presentation/slide-navigation
 * @meta Builds accessible chapter navigation from the ordered registry.
 */

import { useReducedMotion } from 'motion/react';
import * as m from 'motion/react-m';
import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';

import type { SlideDefinition } from '../../slides/registry';

interface SlideNavigationProps {
  slides: readonly SlideDefinition[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export function SlideNavigation({ slides, activeIndex, onSelect }: SlideNavigationProps) {
  const nav = useRef<HTMLElement>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipId = useId();
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState<number | null>(null);
  const [focused, setFocused] = useState<number | null>(null);
  const [lastIndex, setLastIndex] = useState<number | null>(null);
  const [y, setY] = useState(0);
  const targetIndex = hovered ?? focused ?? lastIndex ?? activeIndex;
  const visible = hovered !== null || focused !== null;

  useEffect(
    () => () => {
      if (leaveTimer.current !== null) clearTimeout(leaveTimer.current);
    },
    [],
  );

  useLayoutEffect(() => {
    const element = nav.current;
    const button = element?.querySelectorAll('button')[targetIndex];
    if (!element || !button) return;
    const measure = () => setY(button.offsetTop + button.offsetHeight / 2);
    measure();
    // The active dot changes row heights; follow that layout as well as pointer movement.
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
    observer?.observe(element);
    for (const row of element.querySelectorAll('button')) observer?.observe(row);
    return () => observer?.disconnect();
  }, [activeIndex, targetIndex]);

  return (
    <aside ref={nav} className="side-nav" aria-label="Slide navigation">
      {slides.map((slide, index) => (
        <button
          key={slide.id}
          className={index === activeIndex ? 'active' : ''}
          onClick={() => onSelect(index)}
          onPointerEnter={() => {
            if (leaveTimer.current !== null) clearTimeout(leaveTimer.current);
            setHovered(index);
            setLastIndex(index);
          }}
          onPointerLeave={() => {
            leaveTimer.current = setTimeout(() => {
              setHovered(null);
              if (!nav.current?.querySelector(':focus-visible')) setFocused(null);
            }, 100);
          }}
          onFocus={(event) => {
            if (event.currentTarget.matches(':focus-visible')) setHovered(null);
            setFocused(index);
            setLastIndex(index);
          }}
          onBlur={() => setFocused(null)}
          aria-label={`Slide ${index + 1}: ${slide.title}`}
          aria-current={index === activeIndex ? 'step' : undefined}
          aria-describedby={visible && targetIndex === index ? tooltipId : undefined}
        >
          <i />
        </button>
      ))}
      <m.div
        id={tooltipId}
        role="tooltip"
        aria-hidden={!visible}
        className="nav-tooltip"
        initial={false}
        animate={{ y, opacity: visible ? 1 : 0 }}
        transition={
          reduced
            ? { duration: 0 }
            : {
                type: 'spring',
                stiffness: 340,
                damping: 32,
                mass: 0.8,
                opacity: { duration: 0.16, delay: visible ? 0 : 0.08 },
              }
        }
      >
        <span>{slides[targetIndex]?.title}</span>
      </m.div>
    </aside>
  );
}
