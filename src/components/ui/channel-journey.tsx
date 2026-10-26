/**
 * @module components/ui/channel-journey
 * @meta Lays out discovery, participation and conversion steps from named records.
 */

import { ArrowDown } from 'lucide-react';

import { campaignPhases } from '../../content/shared-elements';
import { FlowBlock } from '../motion/flow-content';
import { MorphSurface } from '../motion/morph-surface';
import { SharedElement } from '../motion/shared-element';
interface JourneyStep {
  number: string;
  title: string;
  description: string;
}

export function ChannelJourney({ items }: { items: readonly JourneyStep[] }) {
  return (
    <div className="journey">
      {items.map(({ number, title, description }, index) => {
        const Step = number === '03' ? MorphSurface : FlowBlock;
        return (
          <Step key={number}>
            <span className="step-num">{number}</span>{' '}
            <SharedElement
              id={`phase-${campaignPhases[index] ?? 'conversion'}`}
              className="phase-marker"
            />
            <h3>{title}</h3>
            <p>{description}</p>
            <ArrowDown size={18} />
          </Step>
        );
      })}
    </div>
  );
}
