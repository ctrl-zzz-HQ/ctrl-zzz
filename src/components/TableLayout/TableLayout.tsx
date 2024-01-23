import styles from './TableLayout.module.css';
import { Outlet } from 'react-router-dom';
import Footer from '@components/Footer';
import { DesktopLinks, MobileLinks } from '@components/PageLinks';

export default function TableLayout({ data }: Props) {

  return (
    <div className={styles.tableContainer}>
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
            <div className="d-flex flex-row justify-space-between">
              <MobileLinks data={data} />
            </div>
          </div>
        </div>
        <div className={`${styles.row} ${styles.fitHeight}`}>
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
