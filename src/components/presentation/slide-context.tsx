/**
 * @module components/presentation/slide-context
 * @meta Binds each rendered slide to its metadata and current position, including during exit motion.
 */

import { createContext, useContext, useMemo } from 'react';
import type { PropsWithChildren } from 'react';

import type { SlideContent } from '../../content/slides';
import type { Direction } from '../../lib/navigation';

interface SlideContextValue {
  slide: SlideContent;
  index: number;
  direction: Direction;
  isActive: boolean;
}

const SlideContext = createContext<SlideContextValue | null>(null);

export function SlideProvider({
  children,
  slide,
  index,
  direction = 1,
  isActive = true,
}: PropsWithChildren<
  Omit<SlideContextValue, 'direction' | 'isActive'> & { direction?: Direction; isActive?: boolean }
>) {
  const value = useMemo(
    () => ({ slide, index, direction, isActive }),
    [slide, index, direction, isActive],
  );
  return <SlideContext.Provider value={value}>{children}</SlideContext.Provider>;
}

export function useSlideMetadata(): SlideContextValue {
  const metadata = useContext(SlideContext);
  if (!metadata) throw new Error('Slide content must be rendered inside SlideProvider.');
  return metadata;
}
