/**
 * @module slides/creative-slide
 * @meta Campaign proposition and an illustrative organiser-focused Reel.
 */

import { ArrowRight, Check } from 'lucide-react';

import { InstagramPreview } from '../components/mockups/instagram-preview';
import { TravellerAvatars } from '../components/mockups/traveller-avatars';
import { FlowText, FlowBlock } from '../components/motion/flow-content';
import { SharedElement } from '../components/motion/shared-element';
import { SlideHeading } from '../components/presentation/slide-heading';
import { CampaignTrail } from '../components/ui/campaign-trail';
export function CreativeSlide() {
  return (
    <div className="two-col creative">
      <div>
        <SlideHeading>
          THE TRIP
          <br />
          STARTS IN THE
          <br />
          <em>GROUP CHAT.</em>
        </SlideHeading>
        <FlowText className="lede">
          For that one friend who plans everything.
          <br />
          One last thing they don’t have to chase.
        </FlowText>
        <CampaignTrail />
        <FlowBlock className="formula">
          <span>RELATABLE PROBLEM</span>
          <ArrowRight />
          <span>VISIBLE SOLUTION</span>
          <ArrowRight />
          <span>SHAREABLE CTA</span>
        </FlowBlock>
      </div>
      <InstagramPreview caption="Send this to the friend running your group chat.">
        <div className="reel-scene">
          <div className="reel-destination">
            <SharedElement id="trip-code" />
            <span className="reel-trip-date">
              <SharedElement id="trip-departure" />–<SharedElement id="trip-return" /> / THE GROUP
              TRIP
            </span>
          </div>
          <div className="reel-hook">
            POV: you planned
            <br />
            the entire trip.
            <br />
            <em>Data? One of four.</em>
          </div>
          <div className="reel-check">
            <div>
              <span>Flights</span>
              <Check aria-hidden="true" />
            </div>
            <div>
              <span>Stay</span>
              <Check aria-hidden="true" />
            </div>
            <div>
              <span>Data</span>
              <span>1 / 4</span>
            </div>
          </div>
          <div className="reel-people">
            <TravellerAvatars />
            <span>Your whole group. Ready.</span>
          </div>
          <span className="reel-tag">ZIM SQUAD / CONCEPT</span>
        </div>
      </InstagramPreview>
    </div>
  );
}
