/**
 * @module components/mockups/traveller-avatars
 * @meta Places persistent traveller identities in strips or the messenger’s contact cluster.
 */

import { travellers } from '../../content/trip';
import { SharedElement } from '../motion/shared-element';

export function TravellerAvatars({ cluster = false }: { cluster?: boolean }) {
  return (
    <div className={`avatars${cluster ? ' avatars--cluster' : ''}`} aria-hidden="true">
      {travellers.map(({ id }) => (
        <SharedElement id={`avatar-${id}`} className="traveller-avatar" key={id} />
      ))}
    </div>
  );
}
