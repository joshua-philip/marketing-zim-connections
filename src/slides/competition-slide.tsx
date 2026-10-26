/**
 * @module slides/competition-slide
 * @meta Competitor strengths and the proposed coordination positioning hypothesis.
 */

import { TravellerAvatars } from '../components/mockups/traveller-avatars';
import { FlowBlock, FlowText } from '../components/motion/flow-content';
import { MorphSurface } from '../components/motion/morph-surface';
import { SlideHeading } from '../components/presentation/slide-heading';
import { competitors } from '../content/campaign';
export function CompetitionSlide() {
  return (
    <div className="competition">
      <SlideHeading>
        THE DIFFERENCE
        <br />
        IS <em>COORDINATION.</em>
      </SlideHeading>
      <div className="comparison">
        <FlowBlock className="table-head">
          <span>THE PLAYER</span>
          <span>ALREADY DOES WELL</span>
          <span>WHAT SQUAD PROPOSES</span>
        </FlowBlock>
        {competitors.map(({ name, strength, proposal }) => {
          const Row = name === 'ZIM Squad ↗' ? MorphSurface : FlowBlock;
          return (
            <Row className={name === 'ZIM Squad ↗' ? 'highlight' : ''} key={name}>
              <div>
                <h3>{name}</h3>
                {name === 'ZIM Squad ↗' && <TravellerAvatars />}
              </div>
              <p>
                <span className="comparison-label">ALREADY DOES WELL</span>
                {strength}
              </p>
              <p>
                <span className="comparison-label">WHAT SQUAD PROPOSES</span>
                {proposal}
              </p>
            </Row>
          );
        })}
      </div>
      <FlowBlock className="competitor-case">
        <div>
          <span className="micro">REAL CAMPAIGN · HOLAFLY (2026b)</span>
          <h3>Connected Exchange</h3>
          <p>Launched 19 May 2026. Creators swapped destinations and documented everyday life.</p>
        </div>
        <div>
          <span className="micro">THE LESSON</span>
          <p>
            Make connectivity visible through a travel story; creator codes connect interest to
            sales.
          </p>
        </div>
        <div>
          <span className="micro">OUR SME ADAPTATION</span>
          <p>
            One group-trip demo on Instagram, with tracked creator links. No international swaps.
          </p>
        </div>
      </FlowBlock>
      <FlowText className="under-note">
        No uplift figures in the announcements. Squad must still beat sharing eSIM links in a group
        chat.
      </FlowText>
    </div>
  );
}
