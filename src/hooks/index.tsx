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

  const [touchStart, setTouchStart] = useState<Point|null>(null)
  const [touchEnd, setTouchEnd] = useState<Point|null>(null)

  const onTouchStart = useCallback((e: TouchEvent) => {
    setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
    setTouchStart({ x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY })
  }, [])

  const onTouchMove = useCallback((e: TouchEvent) => {
    setTouchEnd({ x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY });
  }, [])

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;

    const distance: Point = {x: touchStart.x - touchEnd.x, y: touchStart.y - touchEnd.y };
    let swipeDir: direction|undefined;

    if (Math.abs(distance.x) > Math.abs(distance.y)) {
      if (distance.x > swipeDistance) swipeDir = 'left';
      if (distance.x < -swipeDistance) swipeDir = 'right';
    } else {
      if (distance.y > swipeDistance) swipeDir = 'up';
      if (distance.y < -swipeDistance) swipeDir = 'down';
    }

    if (swipeDir) callback(swipeDir);
  }, [touchStart, touchEnd]);

  return { onTouchStart, onTouchMove, onTouchEnd };
}

type direction = 'left' | 'right' | 'up' | 'down';
interface Point {
  x: number,
  y: number,
}
