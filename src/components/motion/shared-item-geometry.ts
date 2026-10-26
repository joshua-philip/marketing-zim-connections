/**
 * @module components/motion/shared-item-geometry
 * @meta Resolves shared anchors into stage coordinates without scaling text or following transient copy offsets.
 */

export function measureSharedItem(node: HTMLElement, stage: HTMLElement) {
  const rect = node.getBoundingClientRect();
  const stageRect = stage.getBoundingClientRect();
  const paint = getComputedStyle(node);
  const scale = Number(node.closest<HTMLElement>('[data-fit-scale]')?.dataset.fitScale ?? 1);
  let angle = 0;
  let copyOffset = 0;
  for (
    let parent: HTMLElement | null = node;
    parent && parent !== stage;
    parent = parent.parentElement
  ) {
    const style = getComputedStyle(parent);
    if (typeof DOMMatrixReadOnly !== 'undefined' && style.transform && style.transform !== 'none') {
      const matrix = new DOMMatrixReadOnly(style.transform);
      angle += Math.atan2(matrix.b, matrix.a);
      if (parent.hasAttribute('data-flow-content')) copyOffset += matrix.f;
    }
    if (parent.parentElement?.matches('[data-morph="story-surface"]')) {
      const translate = style.translate?.split(/\s+/);
      copyOffset += Number.parseFloat(translate?.[1] ?? '0') || 0;
    }
  }
  const width = node.offsetWidth * scale;
  const height = node.offsetHeight * scale;
  const fontSize = (Number.parseFloat(paint.fontSize) || 14) * scale;
  return {
    x: rect.left - stageRect.left + (rect.width - width) / 2 + Math.sin(angle) * copyOffset * scale,
    y: rect.top - stageRect.top + (rect.height - height) / 2 - Math.cos(angle) * copyOffset * scale,
    width,
    height,
    rotate: (angle * 180) / Math.PI,
    fontSize,
    lineHeight: `${(Number.parseFloat(paint.lineHeight) || (fontSize / scale) * 1.2) * scale}px`,
    letterSpacing: (Number.parseFloat(paint.letterSpacing) || 0) * scale,
    color: paint.color || '#f3f3f0',
    backgroundColor: paint.backgroundColor || 'rgba(0,0,0,0)',
    borderColor: paint.borderTopColor || 'rgba(0,0,0,0)',
    borderWidth: (Number.parseFloat(paint.borderTopWidth) || 0) * scale,
    borderRadius: (Number.parseFloat(paint.borderTopLeftRadius) || 0) * scale,
    fontFamily: paint.fontFamily,
    fontWeight: paint.fontWeight,
  };
}
export type SharedItemGeometry = ReturnType<typeof measureSharedItem>;
