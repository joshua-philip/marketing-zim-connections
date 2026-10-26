/**
 * @module components/presentation/presentation-header
 * @meta Renders the shared brand, home link, ambient motion toggle and fullscreen control.
 */

import { Maximize, Minimize, Pause, Play } from 'lucide-react';

interface PresentationHeaderProps {
  onHome: () => void;
  onFullscreen: () => void;
  isFullscreen: boolean;
  idleMotionPaused: boolean;
  onToggleIdleMotion: () => void;
}

export function PresentationHeader({
  onHome,
  onFullscreen,
  isFullscreen,
  idleMotionPaused,
  onToggleIdleMotion,
}: PresentationHeaderProps) {
  return (
    <header>
      <a
        className="brand"
        href="./"
        onClick={(event) => {
          event.preventDefault();
          onHome();
        }}
        aria-label="ZIM Squad opening"
      >
        <img
          className="brand-logo"
          src="/brand/zim-logo.svg"
          alt="Zim Connections"
          width="87"
          height="42"
        />
        <span className="brand-separator" />{' '}
        <span className="brand-squad">
          SQUAD
          <span className="brand-dot" />
        </span>
      </a>
      <div className="header-center">A NEW WAY TO GO TOGETHER</div>
      <div className="header-right">
        <span className="proposal">
          <i /> LAUNCH PROPOSAL
        </span>
        <button
          className="icon-button idle-motion-toggle"
          onClick={onToggleIdleMotion}
          aria-label={idleMotionPaused ? 'Resume ambient motion' : 'Pause ambient motion'}
          title={idleMotionPaused ? 'Resume ambient motion' : 'Pause ambient motion'}
        >
          {idleMotionPaused ? <Play size={15} /> : <Pause size={15} />}
        </button>
        <button
          className="icon-button"
          onClick={onFullscreen}
          aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          title="Fullscreen (F)"
        >
          {isFullscreen ? <Minimize size={17} /> : <Maximize size={17} />}
        </button>
      </div>
    </header>
  );
}
