/**
 * @module app/app
 * @meta Composes presentation state, navigation chrome and the chapter overview.
 */

import { AnimatePresence, MotionConfig } from 'motion/react';
import * as m from 'motion/react-m';
import { useRef, useState } from 'react';

import { MotionFeatures } from '../components/motion/motion-features';
import { SlideStage } from '../components/motion/slide-stage';
import { PresentationFooter } from '../components/presentation/presentation-footer';
import { PresentationHeader } from '../components/presentation/presentation-header';
import { SlideNavigation } from '../components/presentation/slide-navigation';
import { SlideOverview } from '../components/presentation/slide-overview';
import { useFullscreen } from '../hooks/use-fullscreen';
import { useIdleAnimationClock } from '../hooks/use-idle-animation-clock';
import { usePresentationKeyboard } from '../hooks/use-presentation-keyboard';
import { useSlideGestures } from '../hooks/use-slide-gestures';
import { useSlideNavigation } from '../hooks/use-slide-navigation';
import { formatSlideNumber } from '../lib/navigation';
import { slides } from '../slides/registry';

export function App() {
  const { index, direction, goTo, next, previous } = useSlideNavigation(slides.length);
  const { isFullscreen, toggleFullscreen, fullscreenError } = useFullscreen();
  const [overviewOpen, setOverviewOpen] = useState(false);
  const [idleMotionPaused, setIdleMotionPaused] = useState(false);
  const appRef = useRef<HTMLDivElement>(null);
  useIdleAnimationClock(appRef, idleMotionPaused || overviewOpen, index);
  const slide = slides[index];
  const goHome = () => goTo(0);
  const closeOverview = () => setOverviewOpen(false);
  const toggleOverview = () => setOverviewOpen((open) => !open);
  const selectSlide = (slideIndex: number) => {
    goTo(slideIndex);
    closeOverview();
  };
  const gestures = useSlideGestures({
    onNext: next,
    onPrevious: previous,
    disabled: overviewOpen,
  });

  usePresentationKeyboard({
    onNext: next,
    onPrevious: previous,
    onFirst: goHome,
    onLast: () => goTo(slides.length - 1),
    onOverview: toggleOverview,
    onFullscreen: () => void toggleFullscreen(),
    onClose: closeOverview,
    overviewOpen,
  });

  if (!slide) return null;
  return (
    <MotionFeatures>
      <MotionConfig reducedMotion="user">
        <div
          ref={appRef}
          className="app"
          data-idle-motion={idleMotionPaused || overviewOpen ? 'paused' : 'playing'}
        >
          <PresentationHeader
            onHome={goHome}
            onFullscreen={() => void toggleFullscreen()}
            isFullscreen={isFullscreen}
            idleMotionPaused={idleMotionPaused}
            onToggleIdleMotion={() => setIdleMotionPaused((paused) => !paused)}
          />
          <main {...gestures}>
            <div className="section-meta">
              <span>
                {formatSlideNumber(index)} <span className="slash">/</span>{' '}
                {slide.title.toUpperCase()}
              </span>
              <span>
                ZIM CONNECTIONS <span className="slash">/</span> STRATEGY & CREATIVE
              </span>
            </div>
            <SlideStage slide={slide} index={index} direction={direction} />
            <div className="source">{slide.source}</div>
          </main>
          <SlideNavigation slides={slides} activeIndex={index} onSelect={selectSlide} />
          <PresentationFooter
            index={index}
            slideCount={slides.length}
            onOverview={toggleOverview}
            onNext={next}
            onPrevious={previous}
          />
          <div className="progress">
            <m.div
              style={{ width: '100%', transformOrigin: '0 50%' }}
              animate={{ scaleX: (index + 1) / slides.length }}
              transition={{ duration: 0.7 }}
            />
          </div>
          <AnimatePresence mode="wait">
            {overviewOpen && (
              <SlideOverview
                key="overview"
                slides={slides}
                index={index}
                onSelect={selectSlide}
                onClose={closeOverview}
              />
            )}
          </AnimatePresence>
          <div className="sr-only" aria-live="polite">
            Slide {index + 1} of {slides.length}: {slide.title}
          </div>
          {fullscreenError && <output className="fullscreen-error">{fullscreenError}</output>}
        </div>
      </MotionConfig>
    </MotionFeatures>
  );
}
