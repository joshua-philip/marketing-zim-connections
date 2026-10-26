/**
 * @module hooks/use-slide-scenes
 * @meta Retains at most one outgoing scene briefly, independently of spring animation completion.
 */

import { useEffect, useState } from 'react';

import type { Direction } from '../lib/navigation';
import type { SlideDefinition } from '../slides/registry';

interface Scene {
  slide: SlideDefinition;
  index: number;
  direction: Direction;
}

// Copy clears in 120 ms; keep its source geometry for a few extra frames, then release it.
export const SCENE_HANDOFF_MS = 180;

export function useSlideScenes(slide: SlideDefinition, index: number, direction: Direction) {
  const [scenes, setScenes] = useState<{ current: Scene; previous: Scene | null }>({
    current: { slide, index, direction },
    previous: null,
  });
  if (scenes.current.slide.id !== slide.id) {
    setScenes({ current: { slide, index, direction }, previous: scenes.current });
  }

  useEffect(() => {
    if (!scenes.previous) return;
    const timer = window.setTimeout(
      () => setScenes((previous) => ({ ...previous, previous: null })),
      SCENE_HANDOFF_MS,
    );
    return () => window.clearTimeout(timer);
  }, [scenes.current, scenes.previous]);

  return scenes;
}
