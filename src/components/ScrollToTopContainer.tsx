import styles from '../pages/Page.module.css';
import { useEffect, useRef, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTopContainer({ children }: Props) {

  const { pathname } = useLocation();
  const scrollDiv = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollDiv.current) scrollDiv.current.scrollTop = 0;
  }, [pathname, scrollDiv.current]);

  return (
    <div ref={scrollDiv} className={styles.scrollBody}>
      {children}
    </div>
  );
}

interface Props {
  children: ReactNode;
}
