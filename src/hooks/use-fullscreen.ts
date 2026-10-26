/**
 * @module hooks/use-fullscreen
 * @meta Tracks browser fullscreen changes and handles rejected requests safely.
 */

import { useCallback, useState, useSyncExternalStore } from 'react';

function subscribe(onChange: () => void) {
  document.addEventListener('fullscreenchange', onChange);
  return () => document.removeEventListener('fullscreenchange', onChange);
}
function getSnapshot() {
  return Boolean(document.fullscreenElement);
}

export function useFullscreen() {
  const isFullscreen = useSyncExternalStore(subscribe, getSnapshot, () => false);
  const [error, setError] = useState<string | null>(null);

  const toggleFullscreen = useCallback(async () => {
    setError(null);
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      } else {
        setError('Fullscreen is unavailable in this browser.');
      }
    } catch {
      setError('Fullscreen could not be opened. Please try again from the fullscreen button.');
    }
  }, []);

  return { isFullscreen, toggleFullscreen, fullscreenError: error };
}
