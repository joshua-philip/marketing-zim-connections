/**
 * @module slides/opening-slide
 * @meta Opening campaign proposition and compact trip-readiness concept.
 */

import { SquadPreview } from '../components/mockups/squad-preview';
import { FlowBlock, FlowText } from '../components/motion/flow-content';
import { SlideHeading } from '../components/presentation/slide-heading';
export function OpeningSlide() {
  return (
    <div className="opening">
      <div className="opening-copy">
        <SlideHeading>
          THE TRIP
          <br />
          STARTS IN THE
          <br />
          <em>GROUP CHAT.</em>
        </SlideHeading>
        <FlowText className="lede">One organiser. Your whole group. Connected.</FlowText>
        <FlowBlock className="opening-meta">
          <span>
            A six-month Instagram launch proposal
            <br />
            for Zim Connections.
          </span>
          <span>
            MARCH - AUGUST 2027
            <br />
            £20,000 PROPOSED INVESTMENT
          </span>
        </FlowBlock>
      </div>
      <div className="hero-art">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="orbit orbit-three" />
        <span className="art-label">LESS CHASING. MORE GOING.</span>
        <div className="vertical-word">SQUAD</div>
        <SquadPreview compact />
        <span className="art-caption">
          <span className="status-light" /> THE GROUP TRAVEL CONCEPT
        </span>
      </div>
      <div className="presented">
        Presented by Joshua Philip <span>/</span> Chief Brand Officer (proposed role)
      </div>
    </div>
  );
}
