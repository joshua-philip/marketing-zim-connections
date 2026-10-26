/**
 * @module components/presentation/presentation-footer
 * @meta Composes presentation controls and the registry-derived slide counter.
 */

import { ArrowDown, Grid2X2 } from 'lucide-react';

import { formatSlideNumber } from '../../lib/navigation';
import { SlideControls } from './slide-controls';

interface PresentationFooterProps {
  index: number;
  slideCount: number;
  onOverview: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function PresentationFooter({
  index,
  slideCount,
  onOverview,
  onNext,
  onPrevious,
}: PresentationFooterProps) {
  return (
    <footer>
      <div className="footer-left">
        <button onClick={onOverview} className="text-button" title="Slide overview (G)">
          <Grid2X2 size={15} />
          <span>THE DECK</span>
        </button>
      </div>
      <div className="footer-hint">
        SCROLL TO EXPLORE <ArrowDown size={12} />
      </div>
      <div className="footer-right">
        <span className="counter">
          {formatSlideNumber(index)} <span>/ {slideCount}</span>
        </span>
        <SlideControls
          index={index}
          slideCount={slideCount}
          onPrevious={onPrevious}
          onNext={onNext}
        />
      </div>
    </footer>
  );
}
