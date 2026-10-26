/**
 * @module slides/awareness-slide
 * @meta Four-frame Reel storyboard, hook testing and proposed creator roles.
 */

import { Check } from 'lucide-react';

import { TravellerAvatars } from '../components/mockups/traveller-avatars';
import { FlowBlock, FlowText, FlowLabel } from '../components/motion/flow-content';
import { MorphSurface } from '../components/motion/morph-surface';
import { SharedElement } from '../components/motion/shared-element';
import { SlideHeading } from '../components/presentation/slide-heading';
import { CampaignTrail } from '../components/ui/campaign-trail';
import { creatorCandidates, reelStoryboard } from '../content/campaign';
export function AwarenessSlide() {
  return (
    <div className="awareness-content">
      <SlideHeading>
        “THAT’S <em>SO YOU.</em>”
      </SlideHeading>
      <FlowText className="lede">
        A 15–20 second Reel that makes the organiser recognise themselves.
      </FlowText>
      <CampaignTrail />
      <div className="storyboard">
        {reelStoryboard.map(({ time, label, copy, frame }) => {
          const Frame = frame === '03' ? MorphSurface : FlowBlock;
          return (
            <div key={label}>
              <FlowLabel className="micro">{time}</FlowLabel>
              <Frame className="frame-art">
                {frame === '03' ? (
                  <div className="mini-status">
                    <SharedElement id="trip-code" /> <TravellerAvatars />
                  </div>
                ) : frame === '02' ? (
                  <div className="frame-checks">
                    FLIGHTS <Check />
                    <br />
                    STAY <Check />
                    <br />
                    DATA <span>?</span>
                  </div>
                ) : (
                  <span>{frame}</span>
                )}
              </Frame>
              <FlowLabel className="micro accent">{label}</FlowLabel>
              <FlowText>{copy}</FlowText>
            </div>
          );
        })}
      </div>
      <FlowBlock className="creator-shortlist">
        <div className="creator-shortlist-heading">
          <h2>Creator shortlist</h2>
          <span>2 of 8 · initial candidates</span>
        </div>
        <ul>
          {creatorCandidates.map(({ name, handle, url, fit }) => (
            <li key={handle}>
              <a href={url} target="_blank" rel="noreferrer">
                <strong>{name}</strong>
                <span className="creator-handle">@{handle}</span>
              </a>
              <p>{fit}</p>
            </li>
          ))}
        </ul>
        <p className="creator-selection-note">
          <strong>Before booking</strong>
          Unconfirmed. Check UK 18–26 audience, genuine engagement, eSIM conflicts, fees and paid
          usage rights. Test 2–3 hooks and label paid partnerships.
        </p>
      </FlowBlock>
    </div>
  );
}
