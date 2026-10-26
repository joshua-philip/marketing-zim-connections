/**
 * @module slides/registry.test
 * @meta Regression coverage for slides / registry.
 */

import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { SlideProvider } from '../components/presentation/slide-context';
import { campaignBudget, totalBudget } from '../content/campaign';
import { render } from '../test/render';
import { slides } from './registry';

describe('presentation content integrity', () => {
  it('has unique slides, sources and valid durations without private narration', () => {
    expect(new Set(slides.map((slide) => slide.id)).size).toBe(slides.length);
    for (const slide of slides) {
      expect(slide.source.trim()).not.toBe('');
      expect(slide).not.toHaveProperty('notes');
      expect(slide.duration).toMatch(/^(\d+:\d{2}|-)$/);
    }
  });

  it.each(slides)('renders $title with one primary heading', (slide) => {
    const { Component } = slide;
    const { container } = render(
      <SlideProvider slide={slide} index={slides.indexOf(slide)}>
        <Component />
      </SlideProvider>,
    );
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('heading', { level: 1 }).textContent).not.toBe('');
    expect(container.textContent).not.toMatch(
      /verify at recording|\[student name\]|supplied in brief/i,
    );
    expect(container.querySelectorAll('[data-morph="story-surface"]')).toHaveLength(1);
    const identities = Array.from(container.querySelectorAll('[data-shared-item]'), (node) =>
      node.getAttribute('data-shared-item'),
    );
    expect(new Set(identities).size).toBe(identities.length);
    const activePillars = container.querySelectorAll('[data-pillar-active="true"]');
    expect(
      Array.from(activePillars, (node) => ({
        id: node.getAttribute('data-shared-item'),
        current: node.getAttribute('aria-current'),
      })),
    ).toEqual(slide.pillar ? [{ id: `phase-${slide.pillar}`, current: 'step' }] : []);
  });

  it('keeps the budget within the agreed £20,000 and caps organiser rewards at £2,000', () => {
    expect(totalBudget).toBe(20000);
    expect(campaignBudget.find((item) => item.label === 'Capped organiser rewards')?.amount).toBe(
      2000,
    );
  });
});
