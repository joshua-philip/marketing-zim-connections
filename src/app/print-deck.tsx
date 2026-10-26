/**
 * @module app/print-deck
 * @meta Renders every registry slide with native text and its own measured stage for PDF export.
 */

import { MotionConfig } from 'motion/react';
import { useRef } from 'react';

import { MotionFeatures } from '../components/motion/motion-features';
import { SlideProvider } from '../components/presentation/slide-context';
import { useSlideFit } from '../hooks/use-slide-fit';
import { formatSlideNumber } from '../lib/navigation';
import { slides } from '../slides/registry';
import type { SlideDefinition } from '../slides/registry';

import '../styles/print-deck.css';

function PrintSlide({ slide, index }: { slide: SlideDefinition; index: number }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const fit = useSlideFit(stageRef, canvasRef);
  const { Component } = slide;
  return (
    <article
      className="print-page"
      data-slide-id={slide.id}
      aria-label={`Slide ${index + 1}: ${slide.title}`}
    >
      <div className="print-brand">
        <img src="/brand/zim-logo.svg" alt="Zim Connections" width="73" height="36" />
        <span className="brand-separator" />
        <span className="brand-squad">SQUAD</span>
        <span className="print-proposal">LAUNCH PROPOSAL · JOSHUA PHILIP</span>
      </div>
      <div className="section-meta">
        <span>
          {formatSlideNumber(index)} / {slide.title.toUpperCase()}
        </span>
        <span>ZIM CONNECTIONS / STRATEGY &amp; CREATIVE</span>
      </div>
      <div className="stage print-stage" ref={stageRef}>
        <div className="slide" style={{ top: fit.top }}>
          <div
            ref={canvasRef}
            className="slide-canvas"
            data-fit-scale={fit.scale}
            style={{ zoom: fit.scale }}
          >
            <SlideProvider slide={slide} index={index}>
              <Component />
            </SlideProvider>
          </div>
        </div>
      </div>
      <div className="source">{slide.source}</div>
      <span className="print-page-number">
        {formatSlideNumber(index)} / {slides.length}
      </span>
    </article>
  );
}

export default function PrintDeck() {
  return (
    <MotionFeatures>
      <MotionConfig reducedMotion="always">
        <div className="print-deck" data-export-page-count={slides.length}>
          {slides.map((slide, index) => (
            <PrintSlide key={slide.id} slide={slide} index={index} />
          ))}
        </div>
      </MotionConfig>
    </MotionFeatures>
  );
}
