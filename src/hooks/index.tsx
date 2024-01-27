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
  options?: { minSwipeDistance?: number }) {

  let minSwipeDistance = options?.minSwipeDistance || 50;

  const [touchStart, setTouchStart] = useState<Point|null>(null)
  const [touchEnd, setTouchEnd] = useState<Point|null>(null)

  const onTouchStart = useCallback((e: TouchEvent) => {
    setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
    setTouchStart({ x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY })
  }, [])

  const onTouchMove = useCallback((e: TouchEvent) => {
    // If the gesture involves more than one touch,
    // reset touchStart until there's only one touch.
    // That way, we won't detect pinches/zooms as swipes.
    if (e.touches.length > 1) {
      setTouchStart({ x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY });
    } else {
      setTouchEnd({ x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY });
    }
  }, [])

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;

    const distance: Point = {x: touchStart.x - touchEnd.x, y: touchStart.y - touchEnd.y };
    let swipeDir: direction|undefined;

    if (Math.abs(distance.x) > Math.abs(distance.y)) {
      if (distance.x >= minSwipeDistance) swipeDir = 'left';
      if (distance.x <= -minSwipeDistance) swipeDir = 'right';
    } else {
      if (distance.y >= minSwipeDistance) swipeDir = 'up';
      if (distance.y <= -minSwipeDistance) swipeDir = 'down';
    }

    if (swipeDir) callback(swipeDir);
  }, [touchStart, touchEnd]);

  return { onTouchStart, onTouchMove, onTouchEnd };
}

export const useTap = function(
  callback: () => void,
  options?: { maxTapDuration?: number, maxTapDistance?: number }) {

  let maxTapDuration = options?.maxTapDuration || 500;
  let maxTapDistance = options?.maxTapDistance || 10;

  const [touchStart, setTouchStart] = useState<{x: number, y: number, time: number}|null>(null)

  const onTouchStart = useCallback((e: TouchEvent) => {
    if (e.touches.length > 1) return;
    setTouchStart({ x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY, time: e.timeStamp });
  }, [])

  const onTouchEnd = useCallback((e: TouchEvent) => {
    if (!touchStart || e.changedTouches.length > 1) return;

    const touchEnd = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
      time: e.timeStamp,
    }

    if (touchEnd.time - touchStart.time > maxTapDuration) return;

    const distance: Point = {x: touchStart.x - touchEnd.x, y: touchStart.y - touchEnd.y };
    const distanceMag: number = Math.sqrt(distance.x * distance.x + distance.y * distance.y);
    if (distanceMag > maxTapDistance) return;

    callback();
  }, [touchStart]);

  return { onTouchStart, onTouchEnd };
}

type direction = 'left' | 'right' | 'up' | 'down';
interface Point {
  x: number,
  y: number,
}
