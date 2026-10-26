/**
 * @module app/print-deck.test
 * @meta Keeps the static export complete and independent of the live shared-element overlay and navigation.
 */

import { within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { references } from '../content/references';
import { slides } from '../slides/registry';
import { render } from '../test/render';
import PrintDeck from './print-deck';

describe('static PDF deck', () => {
  it('renders every slide in registry order with its headline, source and visible fallback identities', () => {
    const { container } = render(<PrintDeck />);
    const pages = Array.from(container.querySelectorAll<HTMLElement>('.print-page'));
    expect(pages.map((page) => page.dataset.slideId)).toEqual(slides.map((slide) => slide.id));
    pages.forEach((page, index) => {
      expect(within(page).getAllByRole('heading', { level: 1 })).toHaveLength(1);
      expect(page.querySelector('.source')).toHaveTextContent(slides[index]?.source ?? '');
    });
    expect(container.querySelector('[data-shared-anchor="true"]')).toBeNull();
    expect(container.querySelector('.shared-element-layer')).toBeNull();
    expect(container.querySelector('button')).toBeNull();
  });

  it('includes final statistics, all baseline metrics and the complete reference list', () => {
    const { container } = render(<PrintDeck />);
    const baseline = container.querySelector('[data-slide-id="the-foundation"]');
    expect(baseline?.querySelector('[data-count-up="1,446"] .count-up-reserve')).toHaveTextContent(
      '1,446',
    );
    expect(baseline).toHaveTextContent('5 / 10');
    expect(container.querySelectorAll('.reference-grid > a')).toHaveLength(references.length);
    expect(container.querySelector('[data-slide-id="the-product"]')).toHaveTextContent(
      'Augmented: compatibility guides, reminders and support.',
    );
    expect(container.querySelector('[data-slide-id="conversion"]')).toHaveTextContent(
      'NO LIVE CHECKOUT',
    );
  });
});
