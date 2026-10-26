/**
 * @module components/mockups/group-chat-preview
 * @meta Illustrates the coordination problem in a detailed, explicitly fictional messaging interface.
 */

import { ArrowLeft, CheckCheck, Mic, Phone, Plus, Smile, Video } from 'lucide-react';

import { MorphSurface } from '../motion/morph-surface';
import { SharedElement } from '../motion/shared-element';
import { DeviceStatusBar } from './device-status-bar';
import { TravellerAvatars } from './traveller-avatars';

export function GroupChatPreview() {
  return (
    <MorphSurface depth className="chat">
      <DeviceStatusBar />
      <div className="chat-head">
        <ArrowLeft className="chat-back" aria-hidden="true" />
        <div className="chat-group-avatar" aria-hidden="true">
          <TravellerAvatars cluster />
        </div>
        <div className="chat-details">
          <b>barcelona or nothing</b>
          <span>Sophie, James, Amira, Max</span>
        </div>
        <span className="chat-call-icons" aria-hidden="true">
          <Video />
          <Phone />
        </span>
      </div>
      <div className="chat-pinned">
        <SharedElement id="trip-plane" className="shared-flight-icon" />
        <div>
          <span className="chat-pinned-label">
            <SharedElement id="trip-code" /> / THE PLAN
          </span>
          <b>
            <SharedElement id="trip-city" /> · <SharedElement id="trip-departure" />–
            <SharedElement id="trip-return" />
          </b>
        </div>
      </div>
      <div className="chat-body">
        <div className="chat-date">TODAY</div>
        <p className="chat-system">You created this group. The trip is officially happening.</p>
        <ol className="chat-messages" aria-label="Fictional group conversation">
          <li className="bubble">
            <small className="sender-james">James</small>
            <p>Flights booked. Barcelona, here we come ✈️</p>
            <span className="message-meta">10:42</span>
          </li>
          <li className="bubble">
            <small className="sender-amira">Amira</small>
            <p>Apartment is sorted too 🙌</p>
            <span className="message-meta">10:43</span>
          </li>
          <li className="bubble mine">
            <small>You</small>
            <p>Okay, last thing… has everyone sorted their data?</p>
            <span className="message-meta">
              10:44 <CheckCheck aria-hidden="true" />
            </span>
          </li>
        </ol>
        <div className="chat-typing">
          <span className="typing-avatar" aria-hidden="true">
            M
          </span>
          <span className="typing" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <small>Max is typing…</small>
        </div>
      </div>
      <div className="chat-composer" aria-hidden="true">
        <Plus />
        <span>
          Message
          <Smile />
        </span>
        <Mic />
      </div>
      <div className="concept">FICTIONAL CONVERSATION · NO LIVE MESSAGING</div>
    </MorphSurface>
  );
}
