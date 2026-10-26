/**
 * @module components/mockups/instagram-preview
 * @meta Frames illustrative Reels and Stories at a consistent phone width.
 */

import { Send, MoreHorizontal, Heart, MessageCircle, Bookmark } from 'lucide-react';
import type { PropsWithChildren } from 'react';

import { MorphSurface } from '../motion/morph-surface';
import { DeviceStatusBar } from './device-status-bar';
export function InstagramPreview({
  story = false,
  children,
  caption,
}: PropsWithChildren<{ story?: boolean; caption: string }>) {
  return (
    <MorphSurface depth className={`phone ${story ? 'story' : ''}`}>
      <DeviceStatusBar />
      <div className="ig-head">
        <div className="ig-avatar">z</div>
        <span>
          zim_connections
          <small>{story ? 'Sponsored · Illustrative' : 'Original audio · Concept creative'}</small>
        </span>
        <MoreHorizontal size={18} />
      </div>
      <div className="phone-content">{children}</div>
      {!story && (
        <div className="ig-actions">
          <Heart />
          <MessageCircle />
          <Send />
          <Bookmark />
        </div>
      )}
      {story && (
        <div className="story-reply" aria-hidden="true">
          <span>Send message</span>
          <Heart />
          <Send />
        </div>
      )}
      <div className="phone-caption">
        {!story && <b>zim_connections </b>}
        {caption}
      </div>
      <div className="home-indicator" />
    </MorphSurface>
  );
}
