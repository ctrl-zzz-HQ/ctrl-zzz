import styles from './DreamLogPage.module.css';
import dreamLogs from '@data/dream-logs';
import { useMemo, useEffect, useCallback, useRef, useState } from 'react';
import TypingAnimation from '@components/TypingAnimation';
import Pager, { PagerProps } from './Pager';

export default function DreamLog({ index }: Props) {

  const dreamLog = useMemo(() => dreamLogs[index], [index]);
  const [pagerProps, setPagerProps] = useState<PagerProps>({
    text: dreamLog.text,
    padding: '0',
    width: 0,
    height: 0,
    scrollTop: 0,
    onEndIndexCalculated: endIndex => setTypingText(dreamLog.text.substr(0, endIndex)),
    onScrollHeightCalculated: height => setScrollHeight(height),
  });
  const [typingText, setTypingText] = useState('');
  const [scrollHeight, setScrollHeight] = useState(0);
  const bodyRef = useRef<HTMLDivElement>(null);

  const scrollToNextPage = useCallback(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollTop + bodyRef.current.clientHeight;
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', scrollToNextPage);
    return () => document.removeEventListener('keydown', scrollToNextPage);
  }, [scrollToNextPage]);

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
        {dreamLog.timestamp}]
      </h2>
      <div className={styles.scrollBody} ref={bodyRef}>
        <TypingAnimation style={{minHeight: scrollHeight + 'px'}} text={typingText} playTrigger={1} />
      </div>
      <p className={`${styles.continueText} secondary-text desktop`}>
        [press any key to continue]
      </p>
    </>
  );
}

interface Props {
  index: number;
}
