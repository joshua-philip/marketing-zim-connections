/**
 * @module components/presentation/slide-controls
 * @meta Provides bounded previous and next controls for the deck and presenter panel.
 */

import { ArrowDown, ArrowUp } from 'lucide-react';

interface SlideControlsProps {
  index: number;
  slideCount: number;
  onPrevious: () => void;
  onNext: () => void;
}

export function SlideControls({ index, slideCount, onPrevious, onNext }: SlideControlsProps) {
  return (
    <>
      <button
        className="nav-button"
        onClick={onPrevious}
        disabled={index === 0}
        aria-label="Previous slide"
      >
        <ArrowUp size={17} />
      </button>
      <button
        className="nav-button next"
        onClick={onNext}
        disabled={index === slideCount - 1}
        aria-label="Next slide"
      >
        <ArrowDown size={17} />
      </button>
    </>
  );
}
