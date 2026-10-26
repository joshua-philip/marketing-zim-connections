/**
 * @module slides/decision-slide
 * @meta Proposed targets, financial sensitivities and the approval request.
 */

import { TravellerAvatars } from '../components/mockups/traveller-avatars';
import { CountUp } from '../components/motion/count-up';
import { FlowBlock } from '../components/motion/flow-content';
import { MorphSurface } from '../components/motion/morph-surface';
import { SharedElement } from '../components/motion/shared-element';
import { PlanningFunnel } from '../components/presentation/planning-funnel';
import { SlideHeading } from '../components/presentation/slide-heading';
import { campaignTargets } from '../content/campaign';
import { campaignPhases } from '../content/shared-elements';
export function DecisionSlide() {
  return (
    <div className="decision">
      <SlideHeading>
        LET’S GET THE
        <br />
        <em>WHOLE GROUP READY.</em>
      </SlideHeading>
      <MorphSurface className="targets">
        {campaignTargets.map(({ value, suffix, description }, index) => (
          <div key={value}>
            <SharedElement
              id={`phase-${campaignPhases[index] ?? 'conversion'}`}
              className="phase-marker"
            />
            <strong>
              <CountUp value={value} suffix={suffix} />
            </strong>
            <span>{description}</span>
          </div>
        ))}
      </MorphSurface>
      <PlanningFunnel />
      <FlowBlock className="financial">
        <div>
          <strong>
            <CountUp value={42000} prefix="£" />
          </strong>
          <span>3,000 orders × £14 assumed average</span>
        </div>
        <div>
          <strong>
            <CountUp value={2.1} decimals={1} suffix="×" />
          </strong>
          <span>Gross revenue / marketing spend</span>
        </div>
        <div>
          <strong>
            <CountUp value={6.67} decimals={2} prefix="£" />
          </strong>
          <span>Marketing spend per order</span>
        </div>
        <div>
          <strong>
            <CountUp value={47.6} decimals={1} prefix=">" suffix="%" />
          </strong>
          <span>Contribution margin needed to recover spend</span>
        </div>
      </FlowBlock>
      <FlowBlock className="ask">
        <TravellerAvatars />
        <p>
          Approve a feasibility-gated pilot and this <SharedElement id="campaign-investment" />{' '}
          launch plan.
          <span>Subject to validating demand, the group workflow and unit economics.</span>
        </p>
      </FlowBlock>
      <span className="micro">
        PROPOSED TARGETS BY 31 AUG 2027 · ILLUSTRATIVE FINANCIALS · REVENUE IS NOT PROFIT
      </span>
    </div>
  );
}
