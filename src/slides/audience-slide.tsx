/**
 * @module slides/audience-slide
 * @meta Target segment, purchase triggers, barriers and group-travel research context.
 */

import { TravellerAvatars } from '../components/mockups/traveller-avatars';
import { CountUp } from '../components/motion/count-up';
import { FlowBlock, FlowText } from '../components/motion/flow-content';
import { MorphSurface } from '../components/motion/morph-surface';
import { SlideHeading } from '../components/presentation/slide-heading';
export function AudienceSlide() {
  return (
    <div className="audience">
      <SlideHeading>
        THE GROUP
        <br />
        <em>ORGANISER.</em>
      </SlideHeading>
      <div className="audience-bottom">
        <div>
          <FlowBlock className="big-age">18-26</FlowBlock>
          <TravellerAvatars />
          <FlowText>
            UK-based students & young adults.
            <br />
            Three to six friends. Short European city breaks.
          </FlowText>
        </div>
        <FlowBlock className="audience-facts">
          <div>
            <span>THE TRIGGER</span>
            <b>Flights booked. Group chat active.</b>
          </div>
          <div>
            <span>THE NEED</span>
            <b>Everyone prepared. Less chasing.</b>
          </div>
          <div>
            <span>THE BARRIERS</span>
            <b>Price. Compatibility. Trust.</b>
          </div>
        </FlowBlock>
        <MorphSurface depth className="research">
          <strong>
            <CountUp value={41} />
            <span>%</span>
          </strong>
          <p>of 18–24s planning holidays in 2025 expected to travel with friends.</p>
          <small>Segment context, not proof of demand.</small>
        </MorphSurface>
      </div>
      <FlowBlock className="audience-evidence">
        <strong>
          38% <span>vs 18%</span>
        </strong>
        <p>UK 18–35s use social media to research holidays, versus all UK adults.</p>
        <small>IPA / Opinium (2026) · 2,000 UK adults · broader age group than our target.</small>
      </FlowBlock>
    </div>
  );
}
