import { useLocation } from 'react-router-dom';
import { useMemo, useState, useCallback, TouchEvent } from 'react';

export const usePathIndex = function(): number|undefined {
  const { pathname } = useLocation();
  const currIndex = useMemo<number|undefined>(() => {
    const splitPath = pathname.split('/');
    for (let i = splitPath.length - 1; i >= 0; i--) {
      if (splitPath[i].length > 0) {
        return +splitPath[i];
      }
    }
  }, [pathname]);
  return currIndex;
}

// Swipe logic adapted from: https://stackoverflow.com/a/70612770
export const useSwipe = function(
  callback: (swipeDir: direction) => void,
  options?: { swipeDistance?: number }) {

  let swipeDistance = options?.swipeDistance || 50;

  const [touchStart, setTouchStart] = useState<number|null>(null)
  const [touchEnd, setTouchEnd] = useState<number|null>(null)

  const onTouchStart = useCallback((e: TouchEvent) => {
    setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX)
  }, [])

  const onTouchMove = useCallback((e: TouchEvent) => setTouchEnd(e.targetTouches[0].clientX), [])

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > swipeDistance
    const isRightSwipe = distance < -swipeDistance

    let swipeDir: direction|undefined;

    if (isLeftSwipe) swipeDir = 'left';
    if (isRightSwipe) swipeDir = 'right';

    if (swipeDir) callback(swipeDir);
  }, [touchStart, touchEnd]);

  return { onTouchStart, onTouchMove, onTouchEnd };
}

type direction = 'left' | 'right' | 'up' | 'down';
