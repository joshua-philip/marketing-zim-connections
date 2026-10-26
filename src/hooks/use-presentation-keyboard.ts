/**
 * @module hooks/use-presentation-keyboard
 * @meta Maps deck shortcuts while preserving editing and browser controls.
 */

import { useEffect } from 'react';

interface KeyboardOptions {
  onNext: () => void;
  onPrevious: () => void;
  onFirst: () => void;
  onLast: () => void;
  onOverview: () => void;
  onFullscreen: () => void;
  onClose: () => void;
  overviewOpen: boolean;
}

export function usePresentationKeyboard(options: KeyboardOptions) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
      const target = event.target;
      if (
        target instanceof Element &&
        target.closest('input, textarea, select, [contenteditable]')
      ) {
        return;
      }
      if (event.key === ' ' && target instanceof Element && target.closest('button, a')) return;

      const key = event.key.toLowerCase();
      const shortcuts: Record<string, () => void> = {
        g: options.onOverview,
        f: options.onFullscreen,
        escape: options.onClose,
      };
      if (!options.overviewOpen) {
        Object.assign(shortcuts, {
          arrowdown: options.onNext,
          arrowright: options.onNext,
          pagedown: options.onNext,
          ' ': options.onNext,
          arrowup: options.onPrevious,
          arrowleft: options.onPrevious,
          pageup: options.onPrevious,
          home: options.onFirst,
          end: options.onLast,
        });
      }
      const action = shortcuts[key];
      if (action) {
        event.preventDefault();
        action();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [options]);
}
