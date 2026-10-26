/**
 * @module components/motion/shared-element
 * @meta Reserves each identity’s authored layout and accessible copy while its sole visual moves above the scenes.
 */

import { Plane } from 'lucide-react';
import { useLayoutEffect, useRef } from 'react';

import { sharedElements } from '../../content/shared-elements';
import type { SharedElementId } from '../../content/shared-elements';
import { useSlideMetadata } from '../presentation/slide-context';
import { useSharedElementContext } from './shared-element-context';

export function SharedElement({ id, className = '' }: { id: SharedElementId; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const context = useSharedElementContext();
  const { isActive, slide } = useSlideMetadata();
  const activePillar = id === `phase-${slide.pillar}`;
  const enabled = context?.enabled ?? false;
  const register = context?.register;
  const item = sharedElements[id];
  useLayoutEffect(() => {
    if (enabled && isActive && ref.current && register) return register(id, ref.current);
  }, [enabled, isActive, id, register]);
  return (
    <span
      ref={ref}
      data-shared-item={id}
      data-pillar-active={activePillar || undefined}
      aria-current={activePillar ? 'step' : undefined}
      data-shared-anchor={(enabled && context?.ready) || undefined}
      className={`shared-element ${className}`}
    >
      {item.kind === 'plane' ? (
        <span className="flight-plane">
          <Plane aria-hidden="true" />
        </span>
      ) : item.kind === 'avatar' ? (
        <span className="traveller-initial">{item.text}</span>
      ) : (
        item.text
      )}
    </span>
  );
}
