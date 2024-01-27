import styles from './DreamLogPage.module.css';
import dreamLogs from '@data/dream-logs';
import { useMemo, useEffect, useCallback, useRef, useState } from 'react';
import TypingAnimation from '@components/TypingAnimation';
import Pager, { PagerProps } from './Pager';

export default function DreamLog({ index }: Props) {

  const dreamLog = useMemo(() => dreamLogs[index], [index]);
  const [pagerProps, setPagerProps] = useState<PagerProps>({
    text: dreamLog.text,
    padding: [0, 0],
    width: 0,
    height: 0,
    scrollTop: 0,
    onEndIndexCalculated: (index, pageScroll) => {
      setEndIndex(index);
      setNextPageScroll(pageScroll);
    },
    onScrollHeightCalculated: height => setScrollHeight(height),
  });
  const [endIndex, setEndIndex] = useState(0);
  const [nextPageScroll, setNextPageScroll] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [scrollHeight2, setScrollHeight2] = useState(0);
  const bodyRef = useRef<HTMLDivElement>(null);

  const scrollToNextPage = useCallback((e: KeyboardEvent) => {
    const scroll: boolean = /^[A-z0-9 ]$/.test(e.key) && !e.ctrlKey && !e.metaKey && !e.altKey;
    if (!scroll) return;

    if (bodyRef.current) {
      if (nextPageScroll + bodyRef.current.clientHeight > scrollHeight) {
        setScrollHeight2(nextPageScroll + bodyRef.current.clientHeight - pagerProps.padding[0] * 2);
      }
      setTimeout(() => bodyRef.current && (bodyRef.current.scrollTop = nextPageScroll), 0);
    }
  }, [nextPageScroll, pagerProps]);

  useEffect(() => {
    document.addEventListener('keydown', scrollToNextPage);
    return () => document.removeEventListener('keydown', scrollToNextPage);
  }, [scrollToNextPage]);

  useEffect(() => {
    if (!bodyRef.current) return;

    const style = window.getComputedStyle(bodyRef.current);
    const padParts: number[] = style.padding.split(' ')
      .map(part => part.replace('px', ''))
      .map(part => +part);
    let padding: [number, number] = [0, 0];
    if (padParts.length == 1) {
      padding = [padParts[0], padParts[0]];
    } else if (padParts.length == 2) {
      padding = [padParts[0], padParts[1]];
    } else if (padParts.length == 4) {
      padding = [(padParts[0] + padParts[2]) / 2, (padParts[1] + padParts[3]) / 2];
    }
    setPagerProps(prev => {
      return {
        ...prev,
        padding,
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
        DREAM LOG {dreamLog.code}
      </h2>
      <div className={styles.scrollBody} ref={bodyRef}>
        <TypingAnimation text={dreamLog.text.substr(0, endIndex)} playTrigger={1} />
      </div>
      <p className={`${styles.continueText} secondary-text desktop`}>
        [press any key to continue]
      </p>
      <p className={`${styles.continueText} secondary-text mobile`}>
        [tap anywhere to continue]
      </p>
    </>
  );
}

interface Props {
  index: number;
}
