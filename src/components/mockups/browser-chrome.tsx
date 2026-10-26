/**
 * @module components/mockups/browser-chrome
 * @meta Frames the illustrative landing page with browser controls and a reserved example address.
 */

import { ArrowLeft, ArrowRight, LockKeyhole, RotateCw } from 'lucide-react';

export function BrowserChrome() {
  return (
    <div className="mock-browser-chrome" aria-hidden="true">
      <span className="browser-lights">
        <i />
        <i />
        <i />
      </span>
      <span className="browser-arrows">
        <ArrowLeft />
        <ArrowRight />
      </span>
      <span className="browser-address">
        <LockKeyhole />
        zim.example/squad
      </span>
      <RotateCw className="browser-reload" />
    </div>
  );
}
