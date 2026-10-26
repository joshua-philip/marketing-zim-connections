/**
 * @module slides/timeline-slide
 * @meta Six-month rollout with concurrent awareness, engagement and conversion.
 */

import { TravellerAvatars } from '../components/mockups/traveller-avatars';
import { FlowBlock, FlowText } from '../components/motion/flow-content';
import { MorphSurface } from '../components/motion/morph-surface';
import { SharedElement } from '../components/motion/shared-element';
import { SlideHeading } from '../components/presentation/slide-heading';
import { campaignMonths, objectiveEmphasis } from '../content/campaign';
import { campaignPhases } from '../content/shared-elements';
export function TimelineSlide() {
  return (
    <div>
      <SlideHeading>
        BUILD MOMENTUM.
        <br />
        <em>KEEP ALL THREE RUNNING.</em>
      </SlideHeading>
      <FlowBlock className="timeline">
        {campaignMonths.map(({ month, title, description }) => (
          <div key={month}>
            <span>
              {month}
              <small>2027</small>
            </span>
            <i />
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        ))}
      </FlowBlock>
      <MorphSurface className="bands">
        {objectiveEmphasis.map(({ objective, weights }, phaseIndex) => (
          <div key={objective}>
            <SharedElement
              id={`phase-${campaignPhases[phaseIndex] ?? 'conversion'}`}
              className="phase-marker"
            />
            {weights.map((weight, index) => (
              <i
                key={campaignMonths[index]?.month}
                style={{ opacity: weight, height: 8 + weight * 11 }}
              />
            ))}
          </div>
        ))}
      </MorphSurface>
      <div className="squad-continuity">
        <TravellerAvatars />
        <span>One group. The whole journey.</span>
      </div>
      <FlowText className="under-note">
        Why March? IPA’s 2026 poll: March led planned holiday bookings; June led planned travel. A
        signal for our 2027 plan, conditional on a working pilot. All three objectives run
        throughout.
      </FlowText>
    </div>
  );
}
