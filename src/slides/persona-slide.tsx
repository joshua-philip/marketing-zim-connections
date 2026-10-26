/**
 * @module slides/persona-slide
 * @meta Hypothetical organiser dossier and the behaviours informing campaign tactics.
 */

import { TravellerAvatars } from '../components/mockups/traveller-avatars';
import { FlowBlock } from '../components/motion/flow-content';
import { MorphSurface } from '../components/motion/morph-surface';
import { SlideHeading } from '../components/presentation/slide-heading';
import { personaAttributes } from '../content/campaign';
export function PersonaSlide() {
  return (
    <div className="persona">
      <MorphSurface depth className="persona-card">
        <div className="micro">PERSONA DOSSIER / 001</div>
        <div className="persona-monogram">
          S<span>↗</span>
        </div>
        <div className="persona-name">
          SOPHIE<span>21 / LONDON</span>
        </div>
        <p>
          Student. Part-time job.
          <br />
          Full-time group organiser.
        </p>
        <TravellerAvatars />
        <span className="pill">HYPOTHETICAL PERSONA</span>
      </MorphSurface>
      <div>
        <SlideHeading>
          “HAS EVERYONE
          <br />
          <em>
            SORTED
            <br />
            THEIR DATA?”
          </em>
        </SlideHeading>
        <FlowBlock className="persona-grid">
          {personaAttributes.map(({ label, description }) => (
            <div key={label}>
              <span className="micro">{label}</span>
              <p>{description}</p>
            </div>
          ))}
        </FlowBlock>
      </div>
    </div>
  );
}
