/**
 * @module components/motion/shared-element-context
 * @meta Maintains one persistent visual per identity while keyed slides supply invisible layout anchors.
 */

import { Plane } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import * as m from 'motion/react-m';
import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { PropsWithChildren, RefObject } from 'react';

import { sharedElements } from '../../content/shared-elements';
import type { SharedElementId } from '../../content/shared-elements';
import { CountUp } from './count-up';
import { COPY_EXIT_SECONDS, sharedTransition } from './motion-presets';
import { measureSharedItem } from './shared-item-geometry';
import type { SharedItemGeometry } from './shared-item-geometry';

interface SharedElementContextValue {
  enabled: boolean;
  ready: boolean;
  register: (id: SharedElementId, node: HTMLElement) => () => void;
  refresh: () => void;
}
interface SharedVisual {
  id: SharedElementId;
  geometry: SharedItemGeometry;
  present: boolean;
}
const SharedElementContext = createContext<SharedElementContextValue | null>(null);

export function SharedElementProvider({
  children,
  stageRef,
}: PropsWithChildren<{
  stageRef: RefObject<HTMLDivElement | null>;
}>) {
  const reduced = useReducedMotion();
  const layerRef = useRef<HTMLDivElement>(null);
  const anchors = useRef(new Map<SharedElementId, HTMLElement>());
  const observer = useRef<ResizeObserver | null>(null);
  const [visuals, setVisuals] = useState<SharedVisual[]>([]);
  const refresh = useCallback(() => {
    const stage = stageRef.current ?? layerRef.current?.parentElement;
    if (!stage) return;
    const current = new Map(
      Array.from(anchors.current)
        .filter(([, node]) => node.offsetWidth > 0 && node.offsetHeight > 0)
        .map(([id, node]) => [id, measureSharedItem(node, stage)] as const),
    );
    setVisuals((previous) => {
      const next = previous.map((item) => ({
        ...item,
        present: current.has(item.id),
        geometry: current.get(item.id) ?? item.geometry,
      }));
      for (const [id, geometry] of current) {
        if (!next.some((item) => item.id === id)) next.push({ id, geometry, present: true });
      }
      return JSON.stringify(previous) === JSON.stringify(next) ? previous : next;
    });
  }, [stageRef]);

  const attachLayer = useCallback(
    (node: HTMLDivElement | null) => {
      layerRef.current = node;
      if (node) refresh();
    },
    [refresh],
  );

  const register = useCallback(
    (id: SharedElementId, node: HTMLElement) => {
      anchors.current.set(id, node);
      // The returned cleanup belongs to SharedElement's layout effect; the provider also disconnects on unmount.
      // react-doctor-disable-next-line react-doctor/effect-needs-cleanup
      observer.current?.observe(node);
      refresh();
      return () => {
        observer.current?.unobserve(node);
        if (anchors.current.get(id) === node) anchors.current.delete(id);
        // The next scene registers its anchors in the same commit; the parent refreshes after fitting.
      };
    },
    [refresh],
  );

  useLayoutEffect(() => {
    const stage = stageRef.current ?? layerRef.current?.parentElement;
    if (!stage) return;
    refresh();
    const resize = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(refresh);
    observer.current = resize;
    resize?.observe(stage);
    for (const node of anchors.current.values()) resize?.observe(node);
    window.addEventListener('resize', refresh);
    document.fonts?.addEventListener('loadingdone', refresh);
    return () => {
      resize?.disconnect();
      observer.current = null;
      window.removeEventListener('resize', refresh);
      document.fonts?.removeEventListener('loadingdone', refresh);
    };
  }, [refresh, stageRef]);

  const ready = visuals.length > 0;
  const value = useMemo(
    () => ({ enabled: !reduced, ready, register, refresh }),
    [reduced, ready, register, refresh],
  );
  return (
    <SharedElementContext.Provider value={value}>
      {children}
      {!reduced && (
        <div ref={attachLayer} className="shared-element-layer" aria-hidden="true">
          {visuals.map(({ id, geometry, present }) => {
            const { fontFamily, fontWeight, ...target } = geometry;
            const item = sharedElements[id];
            return (
              <m.span
                key={id}
                data-shared-visual={id}
                className={`shared-visual shared-visual--${item.kind}`}
                initial={false}
                animate={{ ...target, opacity: present ? 1 : 0 }}
                transition={{
                  ...sharedTransition,
                  opacity: { duration: present ? 0.18 : COPY_EXIT_SECONDS },
                }}
                style={{ fontFamily, fontWeight }}
              >
                {item.kind === 'plane' ? (
                  <span className="flight-plane">
                    <Plane />
                  </span>
                ) : 'count' in item ? (
                  <CountUp {...item.count} active={present} />
                ) : (
                  item.text
                )}
              </m.span>
            );
          })}
        </div>
      )}
    </SharedElementContext.Provider>
  );
}

export function useSharedElementContext() {
  return useContext(SharedElementContext);
}
