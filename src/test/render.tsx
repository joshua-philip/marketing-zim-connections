/**
 * @module test/render
 * @meta Renders isolated components with the same synchronous animation features as the application.
 */

import { render as renderTestingLibrary } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import type { ReactNode } from 'react';

import { MotionFeatures } from '../components/motion/motion-features';

export function render(ui: ReactNode, options?: Omit<RenderOptions, 'wrapper'>) {
  return renderTestingLibrary(ui, { ...options, wrapper: MotionFeatures });
}
