import styles from './TableLayout.module.css';
import { Outlet, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { usePathIndex, useSwipe, useKeyDown } from '@/hooks';
import { DesktopLinks, MobileLinks } from '@components/PageLinks';
import Footer from '@components/Footer';

export default function TableLayout({ data }: Props) {

  const navigate = useNavigate();
  const currIndex = usePathIndex();
  const navigateToIndexPlusAmount = useCallback((amount: number) => {
    if (currIndex === undefined) return;
    if ((currIndex + amount >= 0) && (currIndex + amount < data.length)) {
      navigate(`${currIndex + amount}`);
    }
  }, [data, currIndex, navigate]);

  const swipeHandlers = useSwipe(useCallback(direction => {
    if (direction == 'left') {
      navigateToIndexPlusAmount(1);
    } else if (direction == 'right') {
      navigateToIndexPlusAmount(-1);
    }
  }, [navigateToIndexPlusAmount]));

  useKeyDown(useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      navigateToIndexPlusAmount(1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      navigateToIndexPlusAmount(-1);
    }
  }, [navigateToIndexPlusAmount]));

  return (
    <div className={styles.tableContainer} {...swipeHandlers}>
      <div className={styles.table}>
        <div className={`${styles.row} ${styles.fillHeight}`}>
          <div className={`${styles.cell} ${styles.fitWidth} wide`}>
            <DesktopLinks data={data} />
          </div>
          <div className={`${styles.cell} ${styles.fillWidth}`}>
            <Outlet />
          </div>
        </div>
        <div className={`${styles.row} ${styles.fitHeight} ${data.length <= 1 ? 'd-none' : ''} narrow`}>
          <div className={`${styles.cell} ${styles.fillWidth}`}>
            <div className="w-100 d-flex flex-row justify-space-between align-baseline">
              <MobileLinks data={data} />
            </div>
          </div>
        </div>
        <div className={`${styles.row} ${styles.fitHeight} wide tall`}>
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
