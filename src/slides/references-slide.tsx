/**
 * @module slides/references-slide
 * @meta Verified, linked bibliography and dated public-profile audit.
 */

import { ArrowUpRight } from 'lucide-react';

import { TravellerAvatars } from '../components/mockups/traveller-avatars';
import { FlowText } from '../components/motion/flow-content';
import { MorphSurface } from '../components/motion/morph-surface';
import { SlideHeading } from '../components/presentation/slide-heading';
import { CampaignTrail } from '../components/ui/campaign-trail';
import { references } from '../content/references';
export function ReferencesSlide() {
  return (
    <div className="references">
      <SlideHeading>
        THE <em>REFERENCES.</em>
      </SlideHeading>
      <MorphSurface className="reference-grid">
        {references.map(({ author, title, url, publisher, retrieved }, i) => (
          <a key={url} href={url} target="_blank" rel="noreferrer">
            <span>{String(i + 1).padStart(2, '0')}</span>
            <p>
              {author}
              <br />
              <em>{title}</em>
              {publisher && <> {publisher}.</>}
              {retrieved && <span className="reference-retrieval">{retrieved}</span>}
              <small>
                {new URL(url).hostname} <ArrowUpRight size={11} />
              </small>
            </p>
          </a>
        ))}
      </MorphSurface>
      <div className="squad-continuity">
        <TravellerAvatars />
        <span>Connected, from the first idea to the last detail.</span>
      </div>
      <CampaignTrail />
      <FlowText className="under-note">
        Sources checked 25–26 October 2026. Instagram figures are a dated public-profile snapshot.
        Campaign targets and financial figures remain proposed assumptions.
      </FlowText>
    </div>
  );
}
