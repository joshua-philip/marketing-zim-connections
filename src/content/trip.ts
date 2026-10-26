/**
 * @module content/trip
 * @meta Defines the fictional trip and stable visual identities reused throughout the mockups.
 */

export const travellers = [
  { id: 'sophie', name: 'Sophie', role: 'Organiser', ready: true },
  { id: 'james', name: 'James', role: 'Traveller', ready: true },
  { id: 'amira', name: 'Amira', role: 'Traveller', ready: true },
  { id: 'max', name: 'Max', role: 'Traveller', ready: false },
] as const;

export const sharedMockupItems = {
  'avatar-sophie': { kind: 'avatar', text: 'S' },
  'avatar-james': { kind: 'avatar', text: 'J' },
  'avatar-amira': { kind: 'avatar', text: 'A' },
  'avatar-max': { kind: 'avatar', text: 'M' },
  'trip-city': { kind: 'text', text: 'Barcelona' },
  'trip-code': { kind: 'text', text: 'BCN' },
  'trip-departure': { kind: 'text', text: '12 Jun' },
  'trip-return': { kind: 'text', text: '16 Jun' },
  'trip-plane': { kind: 'plane', text: '' },
} as const;
export type SharedMockupId = keyof typeof sharedMockupItems;
