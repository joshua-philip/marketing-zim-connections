/**
 * @module slides/budget-slide
 * @meta Proposed allocations and totals calculated from structured campaign data.
 */

import { TravellerAvatars } from '../components/mockups/traveller-avatars';
import { CountUp } from '../components/motion/count-up';
import { FlowBlock, FlowText } from '../components/motion/flow-content';
import { MorphSurface } from '../components/motion/morph-surface';
import { SharedElement } from '../components/motion/shared-element';
import { SlideHeading } from '../components/presentation/slide-heading';
import { CampaignTrail } from '../components/ui/campaign-trail';
import { campaignBudget, totalBudget } from '../content/campaign';
export function BudgetSlide() {
  return (
    <div className="two-col budget">
      <div>
        <SlideHeading>
          FOCUSED SPEND.
          <br />
          <em>
            MEASURABLE
            <br />
            INTENT.
          </em>
        </SlideHeading>
        <FlowBlock className="budget-total">
          <SharedElement id="campaign-investment" />
          <span>SIX MONTHS / INSTAGRAM ONLY</span>
        </FlowBlock>
        <div className="squad-continuity">
          <TravellerAvatars />
          <span>Built around the group.</span>
        </div>
        <FlowBlock className="budget-bar">
          {campaignBudget.map(({ label, amount }, index) => (
            <i key={label} style={{ flex: amount, opacity: 1 - index * 0.13 }} />
          ))}
        </FlowBlock>
        <CampaignTrail />
        <FlowText className="under-note">
          Marketing budget only.
          <br />
          Engineering requires a separate business case.
        </FlowText>
      </div>
      <MorphSurface className="budget-table">
        {campaignBudget.map(({ label, description, amount }) => (
          <div key={label}>
            <span>
              <b>{label}</b>
              <small>{description}</small>
            </span>
            <strong>
              <CountUp value={amount} prefix="£" />
            </strong>
          </div>
        ))}
        <div className="total">
          <b>TOTAL</b>
          <strong>
            <CountUp value={totalBudget} prefix="£" />
          </strong>
        </div>
      </MorphSurface>
    </div>
  );
}
