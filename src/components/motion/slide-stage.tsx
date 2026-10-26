/**
 * @module components/motion/slide-stage
 * @meta Keeps outgoing copy briefly for a clean handoff while the shared shape completes its own morph.
 */

import { LayoutGroup, useReducedMotion } from 'motion/react';
import * as m from 'motion/react-m';
import { useLayoutEffect, useRef } from 'react';
import type { RefObject } from 'react';

import { useSlideFit } from '../../hooks/use-slide-fit';
import { useSlideScenes } from '../../hooks/use-slide-scenes';
import type { Direction } from '../../lib/navigation';
import type { SlideDefinition } from '../../slides/registry';
import { SlideProvider } from '../presentation/slide-context';
import { MorphPaintProvider } from './morph-paint';
import { sceneVariants } from './motion-presets';
import { SharedElementProvider, useSharedElementContext } from './shared-element-context';

interface SlideStageProps {
  slide: SlideDefinition;
  index: number;
  direction: Direction;
}

function SlideScene({
  slide,
  index,
  direction,
  stageRef,
  active,
}: SlideStageProps & {
  stageRef: RefObject<HTMLDivElement | null>;
  active: boolean;
}) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const fit = useSlideFit(stageRef, canvasRef);
  const refreshShared = useSharedElementContext()?.refresh;
  useLayoutEffect(() => {
    refreshShared?.();
  }, [refreshShared, fit.scale, fit.top, active]);
  const { Component } = slide;
  const reduced = useReducedMotion();
  return (
    <m.section
      custom={direction}
      initial="enter"
      animate={active ? 'center' : 'exit'}
      variants={reduced ? {} : sceneVariants}
      inert={!active}
      aria-hidden={active ? undefined : true}
      className="slide"
      style={{ top: fit.top }}
      aria-label={`Slide ${index + 1}: ${slide.title}`}
    >
      <div
        ref={canvasRef}
        className="slide-canvas"
        style={{ transform: `scale(${fit.scale})`, transformOrigin: '50% 0' }}
        data-fit-scale={fit.scale}
      >
        <SlideProvider slide={slide} index={index} direction={direction} isActive={active}>
          <Component />
        </SlideProvider>
      </div>
    </m.section>
  );
}

export function SlideStage({ slide, index, direction }: SlideStageProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { current, previous } = useSlideScenes(slide, index, direction);
  return (
    <div className="stage" ref={stageRef}>
      <SharedElementProvider stageRef={stageRef}>
        <MorphPaintProvider>
          <LayoutGroup id="deck">
            {(reduced ? [current] : [previous, current]).map(
              (scene) =>
                scene && (
                  <SlideScene
                    key={scene.slide.id}
                    stageRef={stageRef}
                    slide={scene.slide}
                    index={scene.index}
                    direction={direction}
                    active={scene === current}
                  />
                ),
            )}
          </LayoutGroup>
        </MorphPaintProvider>
      </SharedElementProvider>
    </div>
  );
}
