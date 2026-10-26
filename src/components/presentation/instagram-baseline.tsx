/**
 * @module components/presentation/instagram-baseline
 * @meta Presents the public Instagram audit separately from private campaign-performance metrics.
 */

import {
  instagramBaseline,
  recentPostSample,
  recentReelCount,
} from '../../content/instagram-baseline';
import { CountUp } from '../motion/count-up';

export function InstagramBaseline() {
  return (
    <div className="instagram-baseline">
      <div className="baseline-account">
        <a href={instagramBaseline.url} target="_blank" rel="noreferrer">
          @{instagramBaseline.handle}
        </a>
        <time dateTime={instagramBaseline.observedOn}>25 OCT 2026</time>
      </div>
      <dl className="baseline-metrics">
        <div>
          <dt>FOLLOWERS</dt>
          <dd>
            <CountUp value={instagramBaseline.followers} />
          </dd>
        </div>
        <div>
          <dt>POSTS / 28 DAYS</dt>
          <dd>
            <CountUp value={instagramBaseline.posts.length} />
          </dd>
        </div>
        <div>
          <dt>RECENT REELS</dt>
          <dd>
            {recentReelCount} / {recentPostSample.length}
          </dd>
        </div>
      </dl>
      <p>Public feed snapshot · travel humour, product tips &amp; referrals.</p>
    </div>
  );
}
