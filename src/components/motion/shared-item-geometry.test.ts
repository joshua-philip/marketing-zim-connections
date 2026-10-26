/**
 * @module components/motion/shared-item-geometry.test
 * @meta Protects text-sized geometry against viewport fitting and transient rotated copy entrances.
 */

import { afterEach, describe, expect, it, vi } from 'vitest';

import { measureSharedItem } from './shared-item-geometry';

function fixture() {
  const stage = document.createElement('div');
  const canvas = document.createElement('div');
  const surface = document.createElement('div');
  const copy = document.createElement('div');
  const node = document.createElement('span');
  stage.append(canvas);
  canvas.append(surface);
  surface.append(copy);
  copy.append(node);
  surface.dataset.morph = 'story-surface';
  Object.defineProperties(node, { offsetWidth: { value: 80 }, offsetHeight: { value: 20 } });
  node.style.fontSize = '18px';
  node.style.lineHeight = '20px';
  node.style.letterSpacing = '2px';
  vi.spyOn(stage, 'getBoundingClientRect').mockReturnValue(new DOMRect(10, 20, 500, 400));
  return { stage, canvas, surface, copy, node };
}

afterEach(() => vi.unstubAllGlobals());

describe('shared item coordinates', () => {
  it('uses physical font size and dimensions rather than a text-scaling transform', () => {
    const { stage, canvas, node } = fixture();
    canvas.dataset.fitScale = '0.5';
    vi.spyOn(node, 'getBoundingClientRect').mockReturnValue(new DOMRect(100, 120, 40, 10));
    const geometry = measureSharedItem(node, stage);
    expect(geometry).toMatchObject({
      x: 90,
      y: 100,
      width: 40,
      height: 10,
      fontSize: 9,
      lineHeight: '10px',
      letterSpacing: 1,
      rotate: 0,
    });
    expect(geometry).not.toHaveProperty('scale');
  });

  it('targets the final position of a rotated ticket instead of its temporary copy offset', () => {
    const { stage, canvas, surface, copy, node } = fixture();
    canvas.dataset.fitScale = '0.5';
    surface.style.transform = 'matrix(0, 1, -1, 0, 0, 0)';
    copy.style.translate = '0px -18px';
    vi.stubGlobal(
      'DOMMatrixReadOnly',
      class {
        a = 0;
        b = 1;
      },
    );
    vi.spyOn(node, 'getBoundingClientRect').mockReturnValue(new DOMRect(100, 120, 10, 40));
    const geometry = measureSharedItem(node, stage);
    expect(geometry.x).toBeCloseTo(66);
    expect(geometry.y).toBeCloseTo(115);
    expect(geometry.rotate).toBeCloseTo(90);
  });

  it('ignores the temporary entrance of a strategic copy block when targeting its shared label', () => {
    const { stage, copy, node } = fixture();
    copy.dataset.flowContent = 'true';
    copy.style.transform = 'matrix(1, 0, 0, 1, 0, -28)';
    node.style.borderTopLeftRadius = '5px';
    vi.stubGlobal(
      'DOMMatrixReadOnly',
      class {
        a = 1;
        b = 0;
        f = -28;
      },
    );
    vi.spyOn(node, 'getBoundingClientRect').mockReturnValue(new DOMRect(100, 92, 80, 20));
    expect(measureSharedItem(node, stage)).toMatchObject({ x: 90, y: 100, borderRadius: 5 });
  });
});
