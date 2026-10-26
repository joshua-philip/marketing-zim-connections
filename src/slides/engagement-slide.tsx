/**
 * @module slides/engagement-slide
 * @meta Illustrative poll, useful sharing prompts and compatibility discussion.
 */

import { ArrowUpRight } from 'lucide-react';

import { InstagramPreview } from '../components/mockups/instagram-preview';
import { TravellerAvatars } from '../components/mockups/traveller-avatars';
import { FlowBlock, FlowText } from '../components/motion/flow-content';
import { SharedElement } from '../components/motion/shared-element';
import { SlideHeading } from '../components/presentation/slide-heading';
import { CampaignTrail } from '../components/ui/campaign-trail';
export function EngagementSlide() {
  return (
    <div className="two-col engagement">
      <div>
        <SlideHeading>
          MAKE IT
          <br />
          <em>
            THE GROUP’S
            <br />
            CONVERSATION.
          </em>
        </SlideHeading>
        <FlowText className="lede">
          A little self-recognition.
          <br />A useful reason to pass it on.
        </FlowText>
        <CampaignTrail />
        <FlowBlock className="text-rows">
          <div>
            <span>01</span>
            <div>
              <b>Let the organiser self-identify.</b>
              <p>Story poll → product explainer → landing link.</p>
            </div>
          </div>
          <div>
            <span>02</span>
            <div>
              <b>Answer the real questions.</b>
              <p>Compatibility, separate payments and setup.</p>
            </div>
          </div>
          <div>
            <span>03</span>
            <div>
              <b>Make sharing useful.</b>
              <p>“Send it to your group before departure.”</p>
            </div>
          </div>
        </FlowBlock>
      </div>
      <InstagramPreview story caption="Illustrative Story poll · No real votes shown">
        <div className="story-progress">
          <i />
          <i />
          <i />
        </div>
        <div className="story-trip">
          <span>
            <SharedElement id="trip-code" /> / <SharedElement id="trip-city" />
          </span>
          <span>
            <SharedElement id="trip-departure" />–<SharedElement id="trip-return" />
          </span>
        </div>
        <span className="micro">BE HONEST.</span>
        <h2>
          Who’s planning
          <br />
          the <em>whole trip?</em>
        </h2>
        <div className="poll">
          <b>Who’s the organiser?</b>
          <span>Me, unfortunately</span>
          <span>The organised friend</span>
        </div>
        <div className="story-next story-next--group">
          <TravellerAvatars />
          <p>
            One last travel detail.
            <br />
            One place to get everyone ready.
          </p>
        </div>
        <div className="story-link">
          See how Squad works <ArrowUpRight size={14} />
        </div>
      </InstagramPreview>
    </div>
  );
}
