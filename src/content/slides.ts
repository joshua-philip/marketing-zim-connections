/**
 * @module content/slides
 * @meta Owns stable slide IDs, chapter labels, citations and display durations.
 */

import type { CampaignPhase } from './shared-elements';

export interface SlideContent {
  id: string;
  title: string;
  eyebrow: string;
  duration: string;
  source: string;
  pillar?: CampaignPhase;
}

export const slideContent = {
  'the-proposition': {
    id: 'the-proposition',
    eyebrow: 'THE LAUNCH PROPOSAL / 2027',
    title: 'The proposition',
    duration: '0:25',
    source: 'PROPOSED CONCEPT · NOT AN EXISTING ZIM PRODUCT OR OFFICIAL PARTNERSHIP',
  },
  'the-opportunity': {
    id: 'the-opportunity',
    eyebrow: 'THE OPPORTUNITY',
    title: 'The opportunity',
    duration: '0:45',
    source:
      'British Airways (2025). Planning stress is travel context, not evidence of Squad demand.',
  },
  'the-product': {
    id: 'the-product',
    eyebrow: 'THE PROPOSED PRODUCT',
    title: 'The product',
    duration: '0:35',
    source:
      'Zim Connections (n.d.-a, n.d.-b). Squad is a proposed line extension; technical validation required.',
  },
  'the-audience': {
    id: 'the-audience',
    eyebrow: 'A DELIBERATELY FOCUSED AUDIENCE',
    title: 'The audience',
    duration: '0:40',
    source:
      'British Airways (2025); Institute of Practitioners in Advertising (2026). Survey age bands differ; demand unproven.',
  },
  'the-organiser': {
    id: 'the-organiser',
    eyebrow: 'MEET THE ORGANISER',
    title: 'The organiser',
    duration: '0:50',
    source:
      'Hypothetical persona and adoption hypothesis. Informed by IPA (2026) and Skyscanner (2026); no interview implied.',
  },
  'the-difference': {
    id: 'the-difference',
    eyebrow: 'COMPETITIVE POSITIONING',
    title: 'The difference',
    duration: '0:55',
    source:
      'Airalo (n.d.); Holafly (2026a, 2026b, 2026c). Product/campaign announcements and transfer mechanics; no uplift claimed.',
  },
  'the-foundation': {
    id: 'the-foundation',
    eyebrow: 'THE COMPANY BASELINE',
    title: 'The foundation',
    duration: '0:35',
    source: 'Zim Connections (n.d.-a, n.d.-b, n.d.-c). Public Instagram audit: 25 October 2026.',
  },
  'the-channel': {
    id: 'the-channel',
    eyebrow: 'INSTAGRAM ONLY',
    title: 'The channel',
    duration: '0:40',
    source:
      'Skyscanner (2026); Meta (n.d.). UK Gen Z inspiration, not eSIM conversion; Instagram-only placements.',
  },
  'the-creative-idea': {
    pillar: 'awareness',
    id: 'the-creative-idea',
    eyebrow: 'THE BIG CREATIVE IDEA',
    title: 'The creative idea',
    duration: '0:25',
    source: 'Illustrative campaign creative. Proposed concept.',
  },
  awareness: {
    pillar: 'awareness',
    id: 'awareness',
    eyebrow: 'AWARENESS · UNIQUE REACH',
    title: 'Awareness',
    duration: '0:45',
    source:
      'Em (n.d.); Lungu (n.d.). Public bios checked 26 Oct 2026. Initial candidates only; fees and audience fit unverified.',
  },
  engagement: {
    pillar: 'engagement',
    id: 'engagement',
    eyebrow: 'ENGAGEMENT · SAVES + SHARES',
    title: 'Engagement',
    duration: '0:45',
    source: 'Illustrative Instagram Stories. Use participant content only with consent.',
  },
  conversion: {
    pillar: 'conversion',
    id: 'conversion',
    eyebrow: 'MONETISATION · COMPLETED SQUADS',
    title: 'Conversion',
    duration: '0:45',
    source: 'Concept flow. £4 × first 500 qualifying organisers = £2,000 cap.',
  },
  'the-rollout': {
    id: 'the-rollout',
    eyebrow: 'THE SIX-MONTH ROLLOUT',
    title: 'The rollout',
    duration: '0:45',
    source:
      'Institute of Practitioners in Advertising (2026). UK adults’ 2026 intentions inform proposed March–August 2027 timing.',
  },
  'the-investment': {
    id: 'the-investment',
    eyebrow: 'THE PROPOSED INVESTMENT',
    title: 'The investment',
    duration: '0:35',
    source:
      'Towey (2026). £600 per creator is a planning allowance, not a quote. Product development excluded.',
  },
  'the-decision': {
    id: 'the-decision',
    eyebrow: 'THE DECISION',
    title: 'The decision',
    duration: '1:05',
    source:
      'Illustrative planning and downside cases, not benchmarks. Validate rates, attribution and margins before scaling.',
  },
  references: {
    id: 'references',
    eyebrow: 'SOURCES & EVIDENCE',
    title: 'References',
    duration: '-',
    source:
      'Sources checked 25–26 October 2026. Public-profile observations are dated; campaign outcomes are proposed.',
  },
} satisfies Record<string, SlideContent>;

export type SlideId = keyof typeof slideContent;
