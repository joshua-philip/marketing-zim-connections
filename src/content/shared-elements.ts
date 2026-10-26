/**
 * @module content/shared-elements
 * @meta Stable identities for the group, campaign objectives and investment carried between scenes.
 */

import { formatCurrency } from '../lib/format';
import { totalBudget } from './campaign';
import { sharedMockupItems } from './trip';

export const campaignPhases = ['awareness', 'engagement', 'conversion'] as const;
export type CampaignPhase = (typeof campaignPhases)[number];
export const sharedElements = {
  ...sharedMockupItems,
  'phase-awareness': { kind: 'text', text: 'AWARENESS' },
  'phase-engagement': { kind: 'text', text: 'ENGAGEMENT' },
  'phase-conversion': { kind: 'text', text: 'CONVERSION' },
  'campaign-investment': {
    kind: 'text',
    text: formatCurrency(totalBudget),
    count: { value: totalBudget, prefix: '£' },
  },
} as const;
export type SharedElementId = keyof typeof sharedElements;
