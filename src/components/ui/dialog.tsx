/**
 * @module components/ui/dialog
 * @meta Contains modal focus and background isolation through animated entry and exit.
 */

import type { HTMLMotionProps } from 'motion/react';
import * as m from 'motion/react-m';
import { useEffect, useRef } from 'react';
import type { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

type DialogProps = PropsWithChildren<HTMLMotionProps<'div'>> & { label: string };

/**
 * Uses a portal-backed motion div so focus and background isolation survive the full exit animation.
 * This is the scoped exception to Oxlint's native-dialog preference; modal semantics are tested here.
 */
export function Dialog({ label, children, ...props }: DialogProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panel = ref.current;
    if (!panel) return;
    const previousFocus = document.activeElement;
    const root = document.getElementById('root');
    const previousInert = root?.inert ?? false;
    const previousOverflow = document.body.style.overflow;
    if (root) root.inert = true;
    document.body.style.overflow = 'hidden';

    const getControls = () => [
      ...panel.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], [tabindex="0"]'),
    ];
    (getControls()[0] ?? panel).focus();

    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const controls = getControls();
      const first = controls[0];
      const last = controls.at(-1);
      if (!first || !last) {
        event.preventDefault();
        panel.focus();
        return;
      }
      if (
        event.shiftKey &&
        (document.activeElement === first || !panel.contains(document.activeElement))
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        (document.activeElement === last || !panel.contains(document.activeElement))
      ) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', trapFocus);
    return () => {
      document.removeEventListener('keydown', trapFocus);
      if (root) root.inert = previousInert;
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus();
    };
  }, []);

  return createPortal(
    <m.div {...props} ref={ref} role="dialog" aria-modal="true" aria-label={label} tabIndex={-1}>
      {children}
    </m.div>,
    document.body,
  );
}
