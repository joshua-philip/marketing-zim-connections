/**
 * @module slides/channel-slide
 * @meta Instagram’s discovery, participation and conversion journey.
 */

import { TravellerAvatars } from '../components/mockups/traveller-avatars';
import { FlowBlock } from '../components/motion/flow-content';
import { SlideHeading } from '../components/presentation/slide-heading';
import { ChannelJourney } from '../components/ui/channel-journey';
export function ChannelSlide() {
  return (
    <div>
      <SlideHeading>
        ONE PLATFORM.
        <br />
        <em>THE WHOLE JOURNEY.</em>
      </SlideHeading>
      <FlowBlock className="channel-evidence">
        <strong>
          51% Instagram <span>/ 59% TikTok</span>
        </strong>
        <p>
          UK Gen Z travel inspiration · Skyscanner (2026). Choose the journey fit, not the largest
          audience figure.
        </p>
      </FlowBlock>
      <ChannelJourney
        items={[
          {
            number: '01',
            title: 'REELS',
            description: 'Discovery through recognisable group-travel stories.',
          },
          {
            number: '02',
            title: 'STORIES + SHARES',
            description: 'Polls, saved ideas and a conversation between friends.',
          },
          {
            number: '03',
            title: 'LINKS + ADS',
            description: 'A clear path to the Squad landing page and checkout.',
          },
        ]}
      />
      <FlowBlock className="bottom-callout">
        <TravellerAvatars />
        <b>Built for the behaviour.</b>
        <span>
          Manual Instagram-only placements. Website checkout is the conversion destination.
        </span>
      </FlowBlock>
    </div>
  );
}
