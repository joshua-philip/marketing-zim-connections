/**
 * @module components/presentation/slide-overview
 * @meta Builds the modal chapter picker from slide metadata and durations.
 */

import { ArrowUpRight, X } from 'lucide-react';

import { formatSlideNumber } from '../../lib/navigation';
import type { SlideDefinition } from '../../slides/registry';
import { Dialog } from '../ui/dialog';
import { Kicker } from '../ui/kicker';

interface SlideOverviewProps {
  slides: readonly SlideDefinition[];
  index: number;
  onSelect: (index: number) => void;
  onClose: () => void;
}

export function SlideOverview({ slides, index, onSelect, onClose }: SlideOverviewProps) {
  return (
    <Dialog
      label="Slide overview"
      className="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="overlay-head">
        <div>
          <Kicker>THE PRESENTATION</Kicker>
          <h2>Choose a chapter.</h2>
        </div>
        <button className="icon-button" onClick={onClose} aria-label="Close overview">
          <X />
        </button>
      </div>
      <div className="overview-grid">
        {slides.map((slide, slideIndex) => (
          <button
            key={slide.id}
            className={slideIndex === index ? 'current' : ''}
            onClick={() => onSelect(slideIndex)}
            aria-current={slideIndex === index ? 'step' : undefined}
          >
            <span>{formatSlideNumber(slideIndex)}</span>
            <h3>{slide.title}</h3>
            <small>
              {slide.duration} <ArrowUpRight size={14} />
            </small>
          </button>
        ))}
      </div>
    </Dialog>
  );
}
