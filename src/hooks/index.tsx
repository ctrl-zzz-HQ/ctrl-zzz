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
    // In this case, reset touchStart until there are no touches left.
    // That way, we won't detect pinches/zooms/multi-touch gestures as swipes.
    if (e.touches.length > 0) {
      setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      return;
    }
    if (!touchStart) return;

    const touchEnd = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    const distance: Point = {x: touchStart.x - touchEnd.x, y: touchStart.y - touchEnd.y };
    let swipeDir: direction|undefined;

    if (Math.abs(distance.x) > Math.abs(distance.y)) {
      if (distance.x > swipeDistance) swipeDir = 'left';
      if (distance.x < -swipeDistance) swipeDir = 'right';
    } else {
      if (distance.y > swipeDistance) swipeDir = 'up';
      if (distance.y < -swipeDistance) swipeDir = 'down';
    }

    if (swipeDir) callback(swipeDir, e);
  }, [touchStart, callback, swipeDistance]);

  return { onTouchStart, onTouchEnd, onTouchCancel: onTouchEnd };
}

type direction = 'left' | 'right' | 'up' | 'down';
interface Point {
  x: number,
  y: number,
}
