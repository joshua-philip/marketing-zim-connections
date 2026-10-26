/**
 * @module content/instagram-baseline
 * @meta Dated public-profile observations; engagement and reach are not inferred from follower counts.
 */

export const instagramBaseline = {
  handle: 'zim_connections',
  url: 'https://www.instagram.com/zim_connections/',
  observedOn: '2026-10-25',
  windowStart: '2026-09-28',
  followers: 1446,
  following: 895,
  // Public feed order after excluding three older featured grid items. Includes collaborations.
  posts: [
    { date: '2026-10-22', format: 'reel', path: 'zim_connections/reel/Dey5sDFoUlK/' },
    { date: '2026-10-22', format: 'reel', path: 'zim_connections/reel/Dey7DLQoCDo/' },
    { date: '2026-10-19', format: 'carousel', path: 'zim_connections/p/DerBkYDCEhn/' },
    { date: '2026-10-16', format: 'image', path: 'zim_connections/p/DejnC8CIGdz/' },
    { date: '2026-10-15', format: 'carousel', path: 'zim_connections/p/Degy3DAiok3/' },
    { date: '2026-10-13', format: 'reel', path: 'zim_connections/reel/Deb0NikozbY/' },
    { date: '2026-10-12', format: 'carousel', path: 'zim_connections/p/DeZOtS1CGer/' },
    { date: '2026-10-08', format: 'carousel', path: 'zim_connections/p/DePbNRBCKSa/' },
    { date: '2026-10-01', format: 'reel', path: 'zim_connections/reel/Dd8ohYSoJ4g/' },
    { date: '2026-09-30', format: 'reel', path: 'zim_connections/reel/Dd6LGFOoGvM/' },
    { date: '2026-09-30', format: 'reel', path: 'casabasilico.coliving/reel/Dd63_TkNY3Q/' },
    { date: '2026-09-28', format: 'reel', path: 'zim_connections/reel/Dd1GwP0I6DY/' },
    { date: '2026-09-28', format: 'reel', path: 'siddhammehta/reel/Dd1IU_QMG7H/' },
  ],
} as const;

export const recentPostSample = instagramBaseline.posts.slice(0, 10);
export const recentReelCount = recentPostSample.filter((post) => post.format === 'reel').length;
export const observedPostsPerWeek = instagramBaseline.posts.length / 4;
