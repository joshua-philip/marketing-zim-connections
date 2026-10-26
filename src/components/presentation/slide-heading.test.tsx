/**
 * @module components/presentation/slide-heading.test
 * @meta Regression coverage for components / presentation / slide-heading.
 */

import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { slideContent } from '../../content/slides';
import { render } from '../../test/render';
import { SlideProvider } from './slide-context';
import { SlideHeading } from './slide-heading';

describe('shared slide heading', () => {
  it('reads its eyebrow from metadata without introducing a second slide number', () => {
    const slide = slideContent['the-product'];
    const { rerender } = render(
      <SlideProvider slide={slide} index={2}>
        <SlideHeading>Example headline</SlideHeading>
      </SlideProvider>,
    );
    expect(screen.getByText('THE PROPOSED PRODUCT')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Example headline');
    rerender(
      <SlideProvider slide={slide} index={5}>
        <SlideHeading>Example headline</SlideHeading>
      </SlideProvider>,
    );
    expect(screen.getAllByText('THE PROPOSED PRODUCT')).toHaveLength(1);
    expect(screen.queryByText(/\d{2} \/ THE PROPOSED PRODUCT/)).not.toBeInTheDocument();
  });

  it('keeps the opening label unnumbered', () => {
    render(
      <SlideProvider slide={slideContent['the-proposition']} index={0}>
        <SlideHeading>Opening headline</SlideHeading>
      </SlideProvider>,
    );
    expect(screen.getByText('THE LAUNCH PROPOSAL / 2027')).toBeInTheDocument();
  });
});
