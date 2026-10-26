/**
 * @module slides/registry
 * @meta Connects slide composition to metadata and defines the single presentation order.
 */

import type { ComponentType } from 'react';

import type { SlideContent, SlideId } from '../content/slides';
import { slideContent } from '../content/slides';
import { AudienceSlide } from './audience-slide';
import { AwarenessSlide } from './awareness-slide';
import { BaselineSlide } from './baseline-slide';
import { BudgetSlide } from './budget-slide';
import { ChannelSlide } from './channel-slide';
import { CompetitionSlide } from './competition-slide';
import { ConversionSlide } from './conversion-slide';
import { CreativeSlide } from './creative-slide';
import { DecisionSlide } from './decision-slide';
import { EngagementSlide } from './engagement-slide';
import { OpeningSlide } from './opening-slide';
import { OpportunitySlide } from './opportunity-slide';
import { PersonaSlide } from './persona-slide';
import { ProductSlide } from './product-slide';
import { ReferencesSlide } from './references-slide';
import { TimelineSlide } from './timeline-slide';

export interface SlideDefinition extends SlideContent {
  Component: ComponentType;
}

function defineSlide(id: SlideId, Component: ComponentType): SlideDefinition {
  return { ...slideContent[id], Component };
}

/** This registry is the sole source of presentation order and length. */
export const slides: readonly SlideDefinition[] = [
  defineSlide('the-proposition', OpeningSlide),
  defineSlide('the-opportunity', OpportunitySlide),
  defineSlide('the-product', ProductSlide),
  defineSlide('the-audience', AudienceSlide),
  defineSlide('the-organiser', PersonaSlide),
  defineSlide('the-difference', CompetitionSlide),
  defineSlide('the-foundation', BaselineSlide),
  defineSlide('the-channel', ChannelSlide),
  defineSlide('the-creative-idea', CreativeSlide),
  defineSlide('awareness', AwarenessSlide),
  defineSlide('engagement', EngagementSlide),
  defineSlide('conversion', ConversionSlide),
  defineSlide('the-rollout', TimelineSlide),
  defineSlide('the-investment', BudgetSlide),
  defineSlide('the-decision', DecisionSlide),
  defineSlide('references', ReferencesSlide),
];
