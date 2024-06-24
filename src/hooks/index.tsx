import { useLocation } from 'react-router-dom';
import { useMemo, useState, useCallback, useEffect, TouchEvent } from 'react';

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

export const useKeyDown = function(callback: (event: KeyboardEvent) => void) {
  useEffect(() => {
    document.addEventListener('keydown', callback);
    return () => document.removeEventListener('keydown', callback);
  }, [callback]);
}

// Swipe logic adapted from: https://stackoverflow.com/a/70612770
export const useSwipe = function(
  callback: (swipeDir: direction, e: TouchEvent) => void,
  options?: { swipeDistance?: number }) {

  const swipeDistance = options?.swipeDistance || 25;

  const [touchStart, setTouchStart] = useState<Point|null>(null)

  const onTouchStart = useCallback((e: TouchEvent) => {
    setTouchStart({ x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY })
  }, [])

  const onTouchEnd = useCallback((e: TouchEvent) => {
    // If the event still contains a touch, that means it isn't over yet
    // and must have involved more than one touch.
    // If that happens, nullify touchStart so we don't detect
    // any multi-touch gestures as a swipe.
    if (e.touches.length > 0) {
      setTouchStart(null);
      return;
    }
    if (!touchStart) return;

    const touchEnd = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    const distance: Point = {x: touchStart.x - touchEnd.x, y: touchStart.y - touchEnd.y };
    let swipeDir: direction = 'tap';

    if (Math.abs(distance.x) > Math.abs(distance.y)) {
      if (distance.x > swipeDistance) swipeDir = 'left';
      if (distance.x < -swipeDistance) swipeDir = 'right';
    } else {
      if (distance.y > swipeDistance) swipeDir = 'up';
      if (distance.y < -swipeDistance) swipeDir = 'down';
    }

    callback(swipeDir, e);
  }, [touchStart, callback, swipeDistance]);

  return { onTouchStart, onTouchEnd, onTouchCancel: onTouchEnd };
}

type direction = 'left' | 'right' | 'up' | 'down' | 'tap';
interface Point {
  x: number,
  y: number,
}
