/**
 * @module slides/product-slide
 * @meta Proposed service levels, separate payments and consent-based readiness.
 */

import { SquadPreview } from '../components/mockups/squad-preview';
import { FlowBlock, FlowText } from '../components/motion/flow-content';
import { SlideHeading } from '../components/presentation/slide-heading';
import { productSteps } from '../content/campaign';
export function ProductSlide() {
  return (
    <div className="two-col">
      <div>
        <SlideHeading>
          GROUP CONNECTIVITY.
          <br />
          <em>
            INDIVIDUAL
            <br />
            FREEDOM.
          </em>
        </SlideHeading>
        <FlowText className="lede">
          A shared preparation workflow.
          <br />
          Everyone chooses and pays for their own eSIM.
        </FlowText>
        <FlowBlock className="text-rows">
          {productSteps.map(({ number, title, description }) => (
            <div key={number}>
              <span>{number}</span>
              <div>
                <b>{title}</b>
                <p>{description}</p>
              </div>
            </div>
          ))}
        </FlowBlock>
        <span className="pill">PROPOSED LINE EXTENSION</span>
      </div>
      <div>
        <SquadPreview />
        <div className="under-note product-levels">
          Core: less organiser stress · Actual: trip + checkout + readiness
          <br />
          Augmented: compatibility guides, reminders and support.
        </div>
      </div>
    </div>
  );
}
