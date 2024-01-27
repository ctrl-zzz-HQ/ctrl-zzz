import styles from './DreamLogPage.module.css';
import dreamLogs from '@data/dream-logs';
import { useMemo, useEffect, useCallback, useRef, useState } from 'react';
import TypingAnimation from '@components/TypingAnimation';
import Pager, { PagerProps } from './Pager';
import { useTap } from '@/hooks';

export default function DreamLog({ index }: Props) {

  const dreamLog = useMemo(() => dreamLogs[index], [index]);
  const [pagerProps, setPagerProps] = useState<PagerProps>({
    text: dreamLog.text,
    padding: '0',
    width: 0,
    height: 0,
    scrollTop: 0,
    onPageLengthCalculated: (length) => setPage(prev => ({...prev, length})),
  });
  const [page, setPage] = useState<Page>({ start: 0, length: 0 });
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPagerProps(prev => ({
      ...prev,
      text: dreamLog.text.substr(page.start),
    }));
  }, [page.start]);

  const goToNextPage = useCallback(() => {
    setPage(prev => {
      let start = prev.start + prev.length;
      return {
        ...prev,
        start: start < dreamLog.text.length ? start : 0,
      }
    });
  }, [dreamLog.text]);

  const tapHandlers = useTap(goToNextPage);

  useEffect(() => {
    const handleKeyDown = function(e: KeyboardEvent) {
      const scrollKey: boolean = /^[A-z0-9 ]$/.test(e.key) && !e.ctrlKey && !e.metaKey && !e.altKey;
      if (!scrollKey) return;
      goToNextPage();
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [goToNextPage]);

  useEffect(() => {
    if (!bodyRef.current) return;

    const style = window.getComputedStyle(bodyRef.current);
    setPagerProps(prev => {
      return {
        ...prev,
        padding: style.padding,
      }
    });

    const handleResize = () => {
      setPagerProps(prev => {
        if (!bodyRef.current) return prev;
        return {
          ...prev,
          width: bodyRef.current.clientWidth,
          height: bodyRef.current.clientHeight,
        }
      });
    }

    const handleScroll = () => {
      setPagerProps(prev => {
        if (!bodyRef.current) return prev;
        return {
          ...prev,
          scrollTop: bodyRef.current.scrollTop,
        }
      });
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    bodyRef.current.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      bodyRef.current?.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <>
      <Pager {...pagerProps} />
      <h2>
        <span className="desktop">DREAM </span>
        LOG {dreamLog.code} [
          <span className="desktop">timestamp: </span>
          {dreamLog.timestamp}
        ]
      </h2>
      <div className={styles.page} ref={bodyRef} {...tapHandlers}>
        <TypingAnimation text={dreamLog.text.substr(page.start, page.length).trim()} playOnTextChange={true} playTrigger={1} />
      </div>
      <p className={`${styles.footer} secondary-text`} {...tapHandlers}>
        [
          <span className="desktop">press any key or </span>
        tap to {page.start + page.length < dreamLog.text.length ? 'continue' : 'start over'}]
      </p>
    </>
  );
}

interface Props {
  index: number;
}

interface Page {
  start: number;
  length: number;
}
