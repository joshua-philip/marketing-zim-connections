/**
 * @module content/campaign
 * @meta Stores proposed campaign tables, creative examples and financial assumptions.
 */

/** Proposed campaign assumptions and illustrative creative supplied in the brief. */
import { planningCase } from './campaign-funnel';

export const campaignMonths = [
  {
    month: 'MAR',
    title: 'Launch & test',
    description: '3 hooks. First creators. Reels, polls and conversion ads.',
  },
  {
    month: 'APR',
    title: 'Learn',
    description: 'Cut weak hooks. Improve compatibility FAQs and landing page.',
  },
  {
    month: 'MAY',
    title: 'Expand',
    description: 'More creators. Shareable Stories. Retarget eligible visitors.',
  },
  {
    month: 'JUN',
    title: 'Convert',
    description: 'Summer urgency. Invite reminders. Optimise Squad CPA.',
  },
  {
    month: 'JUL',
    title: 'Scale winners',
    description: 'Back the best Reels and creators. Keep engagement active.',
  },
  {
    month: 'AUG',
    title: 'Evaluate',
    description: 'Final summer push. Sales, cohort quality and next-phase decision.',
  },
] as const;

export const objectiveEmphasis = [
  {
    objective: 'Awareness',
    weights: [1, 0.9, 0.8, 0.65, 0.65, 0.55],
  },
  {
    objective: 'Engagement',
    weights: [0.6, 0.7, 0.8, 0.8, 0.8, 0.75],
  },
  {
    objective: 'Monetisation',
    weights: [0.4, 0.5, 0.65, 0.85, 1, 1],
  },
] as const;

export const personaAttributes = [
  {
    label: 'DISCOVERS',
    description: 'Saves and shares travel Reels.',
  },
  {
    label: 'WANTS',
    description: 'Clear total price. A demo before committing.',
  },
  {
    label: 'FRUSTRATION',
    description: 'Chasing four friends for one last detail.',
  },
  {
    label: 'TRIGGER',
    description: 'Destination confirmed. Flights booked.',
  },
  {
    label: 'OBJECTION',
    description: 'Will it work with everyone’s phone?',
  },
  {
    label: 'CAMPAIGN JOURNEY',
    description: 'Try one trip first → invite friends after seeing the demo.',
  },
] as const;

/** Initial candidates from public bios; audience suitability, fees and availability are unverified. */
export const creatorCandidates = [
  {
    name: 'Doina Lungu',
    handle: 'doinalungu_',
    url: 'https://www.instagram.com/doinalungu_/',
    fit: 'London/student + UK travel angle.',
  },
  {
    name: 'Em’s Budget Travel',
    handle: 'emsbudgettravel',
    url: 'https://www.instagram.com/emsbudgettravel/',
    fit: 'Affordable travel around a full-time job.',
  },
] as const;

export const competitors = [
  {
    name: 'Airalo',
    strength: 'Global eSIM buying and referral rewards.',
    proposal: 'Organiser-led readiness and individual member status.',
  },
  {
    name: 'Holafly',
    strength: 'Ultra launch · 13 Oct 2026: data + wellbeing support.',
    proposal: 'A focused group workflow, rather than a larger perks bundle.',
  },
  {
    name: 'ZIM Squad ↗',
    strength: 'Existing Zim plans as the foundation.',
    proposal: 'A shared preparation workflow. Separate payments.',
  },
] as const;

export const reelStoryboard = [
  {
    time: '00-02 SEC',
    label: 'THE HOOK',
    copy: 'POV: you’re the friend who planned everything.',
    frame: '01',
  },
  {
    time: '03-12 SEC',
    label: 'THE TENSION',
    copy: 'Flights booked. Stay booked. Data? One of four.',
    frame: '02',
  },
  {
    time: '13-18 SEC',
    label: 'THE REVEAL',
    copy: 'One trip overview. Everyone gets ready.',
    frame: '03',
  },
  {
    time: 'THE FINAL FRAME',
    label: 'THE ACTION',
    copy: 'Send this to your trip planner.',
    frame: '↗',
  },
] as const;

export const productSteps = [
  {
    number: '01',
    title: 'Create a trip',
    description: 'Invite your friends with one trip link.',
  },
  {
    number: '02',
    title: 'Choose your own plan',
    description: 'Personal checkout. Individual data allowance.',
  },
  {
    number: '03',
    title: 'See who’s ready',
    description: 'Consent-based status. Less chasing.',
  },
] as const;

export const campaignTargets = [
  {
    value: 500,
    suffix: 'k',
    description: 'Unique Instagram accounts reached',
  },
  {
    value: 10,
    suffix: 'k',
    description: 'Reel saves + shares · 2 actions / 100 reached',
  },
  {
    value: planningCase.completed,
    suffix: '',
    description: 'Completed Squads · ≥3,000 paid eSIM orders',
  },
] as const;

export const campaignBudget = [
  {
    label: 'Instagram media',
    description: 'Reels, Stories and retargeting',
    amount: 9000,
  },
  {
    label: 'Micro-creators',
    description: '8 × indicative £600',
    amount: 4800,
  },
  {
    label: 'Production & editing',
    description: 'Organic and paid creative',
    amount: 2200,
  },
  {
    label: 'Landing page & attribution',
    description: 'Measure the actual Squad funnel',
    amount: 1000,
  },
  {
    label: 'Capped organiser rewards',
    description: '500 × £4 maximum',
    amount: 2000,
  },
  {
    label: 'Contingency',
    description: 'Room to test and adapt',
    amount: 1000,
  },
] as const;
export const totalBudget = campaignBudget.reduce((total, item) => total + item.amount, 0);
