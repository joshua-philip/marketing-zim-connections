/**
 * @module components/motion/slide-stage.test
 * @meta Guards interrupted navigation against retained scenes and copy inside projected shapes.
 */

import { screen, waitFor, within } from '@testing-library/react';
import type * as Motion from 'motion/react';
import { StrictMode } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { sharedMockupItems } from '../../content/trip';
import { slides } from '../../slides/registry';
import { render } from '../../test/render';
import { SlideStage } from './slide-stage';

const motionPreference = vi.hoisted(() => ({ reduced: false }));

vi.mock('motion/react', async (importOriginal) => ({
  ...(await importOriginal<typeof Motion>()),
  useReducedMotion: () => motionPreference.reduced,
}));

describe('interruptible slide stage', () => {
  it('releases observed anchors on scene handoff and disconnects every observer on unmount', () => {
    const subscriptions: Set<Element>[] = [];
    vi.stubGlobal(
      'ResizeObserver',
      class {
        targets = new Set<Element>();
        constructor() {
          subscriptions.push(this.targets);
        }
        observe(target: Element) {
          this.targets.add(target);
        }
        unobserve(target: Element) {
          this.targets.delete(target);
        }
        disconnect() {
          this.targets.clear();
        }
      },
    );
    vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(24);
    vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(18);
    try {
      const first = slides[0];
      const next = slides[6];
      if (!first || !next) throw new Error('Missing observer regression slides');
      const { container, rerender, unmount } = render(
        <StrictMode>
          <SlideStage slide={first} index={0} direction={1} />
        </StrictMode>,
      );
      const original = Array.from(container.querySelectorAll('[data-shared-item]'));
      expect(original).toHaveLength(9);
      for (const anchor of original) {
        expect(subscriptions.some((targets) => targets.has(anchor))).toBe(true);
      }
      rerender(
        <StrictMode>
          <SlideStage slide={next} index={6} direction={1} />
        </StrictMode>,
      );
      for (const anchor of original) {
        expect(subscriptions.some((targets) => targets.has(anchor))).toBe(false);
      }
      unmount();
      expect(subscriptions.length).toBeGreaterThan(0);
      expect(subscriptions.every((targets) => targets.size === 0)).toBe(true);
    } finally {
      vi.unstubAllGlobals();
    }
  });
  it('keeps one accessible slide and clears interrupted exits while full motion is enabled', async () => {
    const first = slides[0];
    if (!first) throw new Error('Missing opening slide');
    const { container, rerender } = render(<SlideStage slide={first} index={0} direction={1} />);
    // Each jump interrupts the previous animation without waiting for completion.
    for (const index of [1, 0, 1, 2, 8, 4, 15, 0, 13, 2]) {
      const slide = slides[index];
      if (!slide) throw new Error('Missing slide');
      rerender(<SlideStage slide={slide} index={index} direction={1} />);
      expect(container.querySelectorAll('.slide')).toHaveLength(2);
      expect(container.querySelectorAll('.slide:not([aria-hidden])')).toHaveLength(1);
      expect(
        container.querySelectorAll('.slide:not([aria-hidden]) [data-morph="story-surface"]'),
      ).toHaveLength(1);
      expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
      expect(
        screen.getByRole('region', { name: `Slide ${index + 1}: ${slide.title}` }),
      ).toBeInTheDocument();
      const shape = container.querySelector('.slide:not([aria-hidden]) .morph-frame');
      expect(shape).toBeEmptyDOMElement();
      expect(shape).toHaveAttribute('aria-hidden', 'true');
      for (const exiting of container.querySelectorAll('.slide[aria-hidden]')) {
        expect(exiting).toHaveAttribute('inert');
      }
    }
    await waitFor(() => expect(container.querySelectorAll('.slide')).toHaveLength(1));
    expect(container.querySelector('[inert]')).toBeNull();
  });
  it('keeps baseline copy mounted and visible after a rapid reversal and outgoing cleanup', async () => {
    const baseline = slides[6];
    const product = slides[2];
    if (!baseline || !product) throw new Error('Missing regression slides');
    const { container, rerender } = render(<SlideStage slide={baseline} index={6} direction={1} />);
    rerender(<SlideStage slide={product} index={2} direction={-1} />);
    rerender(<SlideStage slide={baseline} index={6} direction={1} />);
    const scene = screen.getByRole('region', { name: 'Slide 7: The foundation' });
    const heading = within(scene).getByRole('heading', { level: 1 });
    const list = within(scene).getByRole('list', { name: 'Existing Zim capabilities' });
    expect(
      within(list)
        .getAllByRole('listitem')
        .map((row) => row.textContent),
    ).toEqual(['Consumer travel eSIMs', 'eSIM app', 'Business distribution dashboard']);
    expect(within(scene).getByText('THE COMPANY BASELINE')).toBeInTheDocument();
    expect(within(scene).queryByText(/06 \/ THE COMPANY BASELINE/)).not.toBeInTheDocument();
    await waitFor(() => expect(container.querySelectorAll('.slide')).toHaveLength(1));
    expect(within(scene).getByRole('heading', { level: 1 })).toBe(heading);
    await waitFor(() => expect(heading).toHaveStyle({ opacity: '1' }), { timeout: 1600 });
    expect(list.parentElement).toHaveStyle({ opacity: '1' });
  });
  it('reuses a single visual for each traveller and trip detail through interruptions', async () => {
    // jsdom has no layout; provide nonzero anchor dimensions to exercise the visual handoff.
    vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(24);
    vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(18);
    const first = slides[0];
    if (!first) throw new Error('Missing opening slide');
    const { container, rerender } = render(
      <StrictMode>
        <SlideStage slide={first} index={0} direction={1} />
      </StrictMode>,
    );
    const ids = Object.keys(sharedMockupItems);
    const original = new Map(
      ids.map((id) => [id, container.querySelector(`[data-shared-visual="${id}"]`)]),
    );
    expect(original.size).toBe(9);
    for (const visual of original.values()) expect(visual).not.toBeNull();
    for (const index of [1, 2, 1, 0, 1, 2]) {
      const slide = slides[index];
      if (!slide) throw new Error('Missing connected mockup');
      rerender(
        <StrictMode>
          <SlideStage slide={slide} index={index} direction={1} />
        </StrictMode>,
      );
      for (const id of ids) {
        const visuals = container.querySelectorAll(`[data-shared-visual="${id}"]`);
        expect(visuals).toHaveLength(1);
        expect(visuals[0]).toBe(original.get(id));
        expect(visuals[0]).toHaveStyle({ opacity: '1' });
      }
      expect(
        container.querySelectorAll('.slide:not([aria-hidden]) [data-shared-anchor="true"]'),
      ).toHaveLength(9);
    }
    const baseline = slides[6];
    if (!baseline) throw new Error('Missing baseline slide');
    rerender(
      <StrictMode>
        <SlideStage slide={baseline} index={6} direction={1} />
      </StrictMode>,
    );
    await waitFor(() => {
      for (const [id, visual] of original) {
        expect(visual).toHaveStyle({ opacity: id.startsWith('avatar-') ? '1' : '0' });
      }
    });
  });

  it('renders native copy and avatars with no duplicate layer when motion is reduced', () => {
    motionPreference.reduced = true;
    try {
      const first = slides[0];
      if (!first) throw new Error('Missing opening slide');
      const { container } = render(<SlideStage slide={first} index={0} direction={1} />);
      expect(container.querySelector('.shared-element-layer')).toBeNull();
      expect(container.querySelector('[data-shared-anchor]')).toBeNull();
      expect(container.querySelector('[data-shared-item="trip-city"]')).toHaveTextContent(
        'Barcelona',
      );
      expect(container.querySelectorAll('.traveller-avatar')).toHaveLength(4);
    } finally {
      motionPreference.reduced = false;
    }
  });

  it('carries the same group through every slide and the same objectives through the campaign', () => {
    vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(24);
    vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(18);
    const first = slides[0];
    if (!first) throw new Error('Missing opening slide');
    const { container, rerender } = render(<SlideStage slide={first} index={0} direction={1} />);
    const people = new Map(
      ['sophie', 'james', 'amira', 'max'].map((name) => [
        `avatar-${name}`,
        container.querySelector(`[data-shared-visual="avatar-${name}"]`),
      ]),
    );
    const objectives = new Map<string, Element>();
    for (const index of [...slides.keys(), 14, 13, 12, 11, 7, 15]) {
      const slide = slides[index];
      if (!slide) throw new Error('Missing slide');
      rerender(<SlideStage slide={slide} index={index} direction={1} />);
      for (const [id, visual] of people) {
        expect(container.querySelector(`[data-shared-visual="${id}"]`)).toBe(visual);
        expect(visual).toHaveStyle({ opacity: '1' });
      }
      if (index < 7) continue;
      for (const phase of ['awareness', 'engagement', 'conversion']) {
        const id = `phase-${phase}`;
        const visual = container.querySelector(`[data-shared-visual="${id}"]`);
        expect(visual).not.toBeNull();
        if (visual && !objectives.has(id)) objectives.set(id, visual);
        expect(visual).toBe(objectives.get(id));
        expect(visual).toHaveStyle({ opacity: '1' });
      }
    }
  });
});
