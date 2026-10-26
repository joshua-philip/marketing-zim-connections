/**
 * @module slides/conversion-slide
 * @meta Individual purchase flow, capped organiser credit and concept landing page.
 */

import { ArrowDown, ArrowUpRight, Check } from 'lucide-react';

import { BrowserChrome } from '../components/mockups/browser-chrome';
import { TravellerAvatars } from '../components/mockups/traveller-avatars';
import { CountUp } from '../components/motion/count-up';
import { FlowBlock } from '../components/motion/flow-content';
import { MorphSurface } from '../components/motion/morph-surface';
import { SharedElement } from '../components/motion/shared-element';
import { SlideHeading } from '../components/presentation/slide-heading';
import { CampaignTrail } from '../components/ui/campaign-trail';
export function ConversionSlide() {
  return (
    <div className="two-col">
      <div>
        <SlideHeading>
          ONE ORGANISER.
          <br />
          <em>
            THREE OR
            <br />
            MORE SALES.
          </em>
        </SlideHeading>
        <CampaignTrail />
        <FlowBlock className="conversion-steps">
          {[
            'Instagram CTA: “Create your Squad”',
            'Destination, dates and compatibility check',
            'Create a trip. Send unique invitations.',
            'Everyone chooses and pays separately.',
            'Opt-in readiness. Timely reminders.',
          ].map((step, index) => (
            <div key={step}>
              <span>0{index + 1}</span>
              <span>{step}</span>
            </div>
          ))}
        </FlowBlock>
        <FlowBlock className="reward">
          <strong>
            <CountUp value={4} prefix="£" />
          </strong>
          <span>
            Proposed organiser credit after 3 qualifying purchases.
            <br />
            First 500 only. £2,000 maximum.
          </span>
        </FlowBlock>
      </div>
      <MorphSurface depth className="landing">
        <BrowserChrome />
        <div className="landing-page">
          <div className="landing-nav">
            <img src="/brand/zim-logo.svg" alt="Zim" width="87" height="42" />
            <span>SQUAD / CONCEPT</span>
          </div>
          <span className="micro">THE GROUP CHAT CAN RELAX NOW.</span>
          <h2>
            Your trip.
            <br />
            Your people.
            <br />
            <em>All connected.</em>
          </h2>
          <div className="form-field">
            DESTINATION
            <span>
              <span>
                <SharedElement id="trip-city" />, Spain
              </span>{' '}
              <ArrowDown size={13} />
            </span>
          </div>
          <div className="form-field">
            TRAVEL DATES
            <span className="form-date">
              <SharedElement id="trip-departure" /> - <SharedElement id="trip-return" /> 2027
            </span>
          </div>
          <div className="landing-squad">
            <TravellerAvatars />
            <span>Your people. Their own plans.</span>
          </div>
          <div className="compatibility">
            <Check size={15} /> Check each traveller’s phone before purchase
          </div>
          <div className="fake-button">
            Create your Squad <ArrowUpRight size={16} />
          </div>
          <p>
            Choose your own plan. Pay separately.
            <br />
            See total pricing and support terms before checkout.
          </p>
          <span className="concept">ILLUSTRATIVE LANDING PAGE · NO LIVE CHECKOUT</span>
        </div>
      </MorphSurface>
    </div>
  );
}
