import styles from './TableLayout.module.css';
import { Outlet, useNavigate } from 'react-router-dom';
import { useState, useCallback, TouchEvent } from 'react';
import { usePathIndex } from '@/hooks';
import { DesktopLinks, MobileLinks } from '@components/PageLinks';
import Footer from '@components/Footer';

// the required distance between touchStart and touchEnd to be detected as a swipe
const minSwipeDistance = 50

export default function TableLayout({ data }: Props) {

  const navigate = useNavigate();
  const currIndex = usePathIndex();

  // Swipe logic adapted from: https://stackoverflow.com/a/70612770
  const [touchStart, setTouchStart] = useState<number|null>(null)
  const [touchEnd, setTouchEnd] = useState<number|null>(null)

  const onTouchStart = useCallback((e: TouchEvent) => {
    setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX)
  }, [])

  const onTouchMove = useCallback((e: TouchEvent) => setTouchEnd(e.targetTouches[0].clientX), [])

  const onTouchEnd = useCallback(() => {
    if (currIndex === undefined) return;
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    if (!isLeftSwipe && !isRightSwipe) return;

    if (isLeftSwipe) {
      if (currIndex < data.length - 1) navigate(`${currIndex + 1}`);
    } else if (isRightSwipe) {
      if (currIndex > 0) navigate(`${currIndex - 1}`);
    }
  }, [touchStart, touchEnd, currIndex])

  return (
    <div className={styles.tableContainer} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      <div className={styles.table}>
        <div className={`${styles.row} ${styles.fillHeight}`}>
          <div className={`${styles.cell} ${styles.fitWidth} desktop`}>
            <DesktopLinks data={data} />
          </div>
          <div className={`${styles.cell} ${styles.fillWidth}`}>
            <Outlet />
          </div>
        </div>
        <div className={`${styles.row} ${data.length <= 1 ? 'd-none' : ''} mobile`}>
          <div className={`${styles.cell} ${styles.fillWidth}`}>
            <div className="w-100 d-flex flex-row justify-space-between align-baseline">
              <MobileLinks data={data} />
            </div>
          </div>
        </div>
        <div className={`${styles.row} ${styles.fitHeight} desktop`}>
          <div className={`${styles.cell} ${styles.fillWidth}`}>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

interface Props {
  data: Array<{
    label?: string;
  }>;
}
