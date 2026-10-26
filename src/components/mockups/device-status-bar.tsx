/**
 * @module components/mockups/device-status-bar
 * @meta Supplies consistent decorative device chrome across phone and messaging concepts.
 */

import { BatteryFull, Signal, Wifi } from 'lucide-react';

export function DeviceStatusBar() {
  return (
    <div className="phone-top" aria-hidden="true">
      <span>9:41</span>
      <div className="island" />
      <span className="device-indicators">
        <Signal />
        <Wifi />
        <BatteryFull />
      </span>
    </div>
  );
}
