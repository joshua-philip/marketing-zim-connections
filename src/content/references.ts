/**
 * @module content/references
 * @meta Primary-source bibliography checked on 25–26 October 2026.
 */

export interface Reference {
  author: string;
  title: string;
  url: string;
  publisher?: string;
  retrieved?: string;
}

export const references: readonly Reference[] = [
  {
    author: 'Airalo. (n.d.).',
    title: 'Refer friends. Get Airmoney.',
    url: 'https://www.airalo.com/refer-and-earn',
  },
  {
    author: 'British Airways. (2025).',
    title: 'Travel trends 2025.',
    url: 'https://www.britishairways.com/content/travel-guide/travel-trends-2025',
  },
  {
    author: 'Em [@emsbudgettravel]. (n.d.).',
    title: 'Posts [Instagram profile].',
    retrieved: 'Retrieved October 26, 2026, from Instagram.',
    url: 'https://www.instagram.com/emsbudgettravel/',
  },
  {
    author: 'Holafly. (2026a, October 13).',
    title:
      'Holafly launches Ultra, bringing health and wellbeing support to its global eSIM subscription.',
    url: 'https://esim.holafly.com/inside/media-hub/holafly-launches-ultra-bringing-health-and-wellbeing-support-to-global-esim-subscription/',
  },
  {
    author: 'Holafly. (2026b, May 19).',
    title:
      'Holafly turns “The Holiday” into reality: Its new global campaign swaps lives between creators.',
    url: 'https://esim.holafly.com/inside/media-hub/holafly-turns-the-holiday-into-reality-with-connected-exchange/',
  },
  {
    author: 'Holafly. (2026c, October 24).',
    title: 'How does eSIM and trip transfer work in Holafly?',
    url: 'https://esim.holafly.com/faq/esim-setup-guide/how-to-transfer-esim/',
  },
  {
    author: 'Institute of Practitioners in Advertising. (2026, February 19).',
    title: 'Packed and raring to go: New IPA research reveals UK adults’ 2026 holiday plans.',
    url: 'https://ipa.co.uk/news/holiday-booking-plans-2026/',
  },
  {
    author: 'Lungu, D. [@doinalungu_]. (n.d.).',
    title: 'Posts [Instagram profile].',
    retrieved: 'Retrieved October 26, 2026, from Instagram.',
    url: 'https://www.instagram.com/doinalungu_/',
  },
  {
    author: 'Meta. (n.d.).',
    title: 'Instagram & Facebook Reels: Create short video ads.',
    url: 'https://www.facebook.com/business/ads/facebook-instagram-reels-ads',
  },
  {
    author: 'Skyscanner. (2026, January 28).',
    title: 'Gen Z travel statistics and trends.',
    url: 'https://www.skyscanner.net/destinations/advice/gen-z-travel-statistics',
  },
  {
    author: 'Towey, R. (2026, January 20).',
    title: 'How much does influencer marketing cost in the UK? (With real examples).',
    publisher: 'Awin',
    url: 'https://www.awin.com/gb/sector-insights/uk-influencer-marketing-cost',
  },
  {
    author: 'Zim Connections. (n.d.-a).',
    title: 'eSIM for business.',
    url: 'https://www.zimconnections.com/business/',
  },
  {
    author: 'Zim Connections. (n.d.-b).',
    title: 'International eSIM data plans & phone numbers.',
    url: 'https://www.zimconnections.com/',
  },
  {
    author: 'Zim Connections [@zim_connections]. (n.d.-c).',
    title: 'Posts [Instagram profile].',
    retrieved: 'Retrieved October 25, 2026, from Instagram.',
    url: 'https://www.instagram.com/zim_connections/',
  },
];
