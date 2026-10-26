/**
 * @module components/ui/campaign-trail
 * @meta Reuses the same objective labels as the journey, rollout bands and decision targets.
 */

import { campaignPhases } from '../../content/shared-elements';
import { SharedElement } from '../motion/shared-element';

export function CampaignTrail() {
  return (
    <div className="campaign-trail" aria-label="Campaign objectives">
      {campaignPhases.map((phase) => (
        <SharedElement key={phase} id={`phase-${phase}`} className="phase-marker" />
      ))}
    </div>
  );
}
