/**
 * @module main
 * @meta Mounts the React presentation and imports styles in cascade order.
 */

import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app/app';

import './styles/index.css';

const root = document.getElementById('root');
if (!root) throw new Error('The presentation root element is missing.');
const PrintDeck = lazy(() => import('./app/print-deck'));
const printMode = new URLSearchParams(window.location.search).has('print');

createRoot(root).render(
  <StrictMode>
    {printMode ? (
      <Suspense fallback={null}>
        <PrintDeck />
      </Suspense>
    ) : (
      <App />
    )}
  </StrictMode>,
);
