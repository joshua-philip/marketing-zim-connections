/**
 * @module slides/opportunity-slide
 * @meta Customer coordination problem, research context and fictional group chat.
 */

import { GroupChatPreview } from '../components/mockups/group-chat-preview';
import { CountUp } from '../components/motion/count-up';
import { FlowBlock, FlowText } from '../components/motion/flow-content';
import { SlideHeading } from '../components/presentation/slide-heading';
export function OpportunitySlide() {
  return (
    <div className="two-col">
      <div>
        <SlideHeading>
          ONE PERSON
          <br />
          PLANS THE TRIP.
          <br />
          <em>
            EVERYONE
            <br />
            NEEDS DATA.
          </em>
        </SlideHeading>
        <FlowText className="lede">
          Individual connectivity is solved.
          <br />
          Getting everyone ready is another story.
        </FlowText>
        <FlowBlock className="stat-inline">
          <strong>
            <CountUp value={60} />
            <span>%</span>
          </strong>
          <p>
            of holidaymakers aged 18–24 felt stressed
            <br />
            organising all the components themselves.
            <small>Broad planning stress, not eSIM demand.</small>
          </p>
        </FlowBlock>
      </div>
      <GroupChatPreview />
    </div>
  );
}
