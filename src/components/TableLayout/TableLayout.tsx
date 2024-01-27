import styles from './TableLayout.module.css';
import { Outlet, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { usePathIndex, useSwipe } from '@/hooks';
import { DesktopLinks, MobileLinks } from '@components/PageLinks';
import Footer from '@components/Footer';

export default function TableLayout({ data }: Props) {

  const navigate = useNavigate();
  const currIndex = usePathIndex();
  const swipeHandlers = useSwipe(useCallback(direction => {
    if (currIndex === undefined) return;
    if (direction == 'left') {
      if (currIndex < data.length - 1) navigate(`${currIndex + 1}`);
    } else if (direction == 'right') {
      if (currIndex > 0) navigate(`${currIndex - 1}`);
    }
  }, [data, currIndex, navigate]));

  return (
    <div className={styles.tableContainer} {...swipeHandlers}>
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
