/**
 * @module slides/baseline-slide
 * @meta Existing Zim capabilities, proposed workflow and Instagram baseline limits.
 */

import { ArrowRight, Check } from 'lucide-react';

import { TravellerAvatars } from '../components/mockups/traveller-avatars';
import { CountUp } from '../components/motion/count-up';
import { FlowBlock } from '../components/motion/flow-content';
import { MorphSurface } from '../components/motion/morph-surface';
import { InstagramBaseline } from '../components/presentation/instagram-baseline';
import { SlideHeading } from '../components/presentation/slide-heading';
export function BaselineSlide() {
  return (
    <div>
      <SlideHeading>
        ZIM HAS THE CONNECTION.
        <br />
        <em>GIVE IT A NEW USE CASE.</em>
      </SlideHeading>
      <div className="baseline">
        <FlowBlock>
          <span className="micro">EXISTING / VERIFIED COMPANY OFFERING</span>
          <strong>
            <CountUp value={200} />
            <span>+</span>
          </strong>
          <p>destinations on Zim’s website</p>
          <ul className="baseline-list" aria-label="Existing Zim capabilities">
            {['Consumer travel eSIMs', 'eSIM app', 'Business distribution dashboard'].map(
              (capability) => (
                <li key={capability}>
                  <span>{capability}</span>
                  <Check aria-hidden="true" />
                </li>
              ),
            )}
          </ul>
        </FlowBlock>
        <ArrowRight className="baseline-arrow" />
        <MorphSurface>
          <span className="micro">PROPOSED / SUBJECT TO VALIDATION</span>
          <h2>
            From buying data.
            <br />
            To getting the
            <br />
            <em>group ready.</em>
          </h2>
          <p>
            A proposed consumer coordination layer.
            <br />
            Build on Zim’s existing travel-led content.
          </p>
          <TravellerAvatars />
          <InstagramBaseline />
        </MorphSurface>
      </div>
    </div>
  );
}
