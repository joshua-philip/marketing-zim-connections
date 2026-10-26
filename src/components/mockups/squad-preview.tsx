/**
 * @module components/mockups/squad-preview
 * @meta Presents illustrative trip readiness as a digital travel pass with a perforated ticket stub.
 */

import { Check, Ticket } from 'lucide-react';

import { travellers } from '../../content/trip';
import { MorphSurface } from '../motion/morph-surface';
import { SharedElement } from '../motion/shared-element';
import { TravellerAvatars } from './traveller-avatars';

export function SquadPreview({ compact = false }: { compact?: boolean }) {
  return (
    <MorphSurface
      depth
      className={`squad ${compact ? 'compact' : ''}`}
      style={{ rotate: compact ? -5 : 0 }}
    >
      <div className="squad-top">
        <span className="ticket-brand">
          <img src="/brand/zim-logo.svg" alt="Zim" width="87" height="42" />
          <span>SQUAD</span>
        </span>
        <span className="ticket-badge">
          <Ticket />
          TRIP PASS
        </span>
      </div>
      <div className="ticket-route">
        <div className="ticket-airport">
          <span>YOUR NEXT CHAPTER</span>
          <strong>LHR</strong>
          <small>London Heathrow</small>
        </div>
        <div className="ticket-flight" aria-hidden="true">
          <SharedElement id="trip-plane" className="shared-flight-icon shared-flight-icon--route" />
        </div>
        <div className="ticket-airport ticket-arrival">
          <span>DESTINATION</span>
          <strong>
            <SharedElement id="trip-code" />
          </strong>
          <h3>
            <SharedElement id="trip-city" />, Spain
          </h3>
        </div>
      </div>
      <dl className="ticket-details">
        <div>
          <dt>DEPARTURE</dt>
          <dd>
            <SharedElement id="trip-departure" /> <span>2027</span>
          </dd>
        </div>
        <div>
          <dt>RETURN</dt>
          <dd>
            <SharedElement id="trip-return" /> <span>2027</span>
          </dd>
        </div>
        <div>
          <dt>YOUR SQUAD</dt>
          <dd>
            04 <span>TRAVELLERS</span>
          </dd>
        </div>
      </dl>
      <div className="squad-divider" aria-hidden="true" />
      <div className="squad-bottom">
        <TravellerAvatars />
        <div className="squad-summary">
          <strong>{compact ? 'Your people. Connected.' : '3 of 4 ready to go.'}</strong>
          <span>
            {compact
              ? 'One trip. Everyone on their own plan.'
              : 'Trip readiness · shared by choice'}
          </span>
        </div>
        <span className="status-light" aria-hidden="true" />
      </div>
      {!compact && (
        <ul className="members" aria-label="Squad readiness">
          {travellers.map(({ name, role, ready }) => (
            <li key={name}>
              <span className="member-name">
                <span className="member-initial" aria-hidden="true">
                  {name[0]}
                </span>
                <span>
                  {name}
                  <small>{role}</small>
                </span>
              </span>
              <span className={`member-status ${ready ? 'ready' : 'pending'}`}>
                {ready ? (
                  <>
                    <Check />
                    Ready
                  </>
                ) : (
                  'Setup pending'
                )}
              </span>
            </li>
          ))}
        </ul>
      )}
      <div className="ticket-stub">
        <div>
          <span className="ticket-reference">SQ / BCN / 004</span>
          <span className="ticket-disclaimer">
            CONCEPT PASS · {compact ? 'YOUR NEXT CHAPTER' : 'OPT-IN READINESS'}
          </span>
        </div>
        <span className="ticket-barcode" aria-hidden="true" />
      </div>
    </MorphSurface>
  );
}
