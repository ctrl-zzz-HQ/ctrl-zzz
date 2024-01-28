import styles from './SplashLayout.module.css';
import { useCookies } from 'react-cookie';
import { Outlet } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import PowerSymbol from './PowerSymbol';
import LogoAnimation from './LogoAnimation';
import TypingAnimation from '@components/TypingAnimation';
import bootupText from '@data/bootup-text';
import { useKeyDown } from '@/hooks';

const cookieName = 'booted';

export default function Splash() {

  const [cookies, setCookie, deleteCookie] = useCookies([cookieName]);
  const [splashed, setSplashed] = useState<boolean>(cookies[cookieName]);
  const [bootupTrigger, setBootupTrigger] = useState(0);
  const [playLogo, setPlayLogo] = useState(false);

  const powerOn = useCallback(() => setBootupTrigger(prev => prev + 1), []);

  const powerOff = useCallback(() => {
    setBootupTrigger(0);
    setPlayLogo(false);
    setSplashed(false);
  }, []);

  const onTypingEnded = useCallback(() => setPlayLogo(true), []);
  const onSplashEnded = useCallback(() => setSplashed(true), []);

  useEffect(() => {
    if (splashed) {
      setCookie(cookieName, true, { sameSite: 'strict', path: '/' });
    } else {
      deleteCookie(cookieName, { sameSite: 'strict', path: '/' });
    }
  }, [splashed, setCookie, deleteCookie]);

  useKeyDown(useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setSplashed(true);
    }
  }, []));

  return (
    <>
      <Outlet />
      {splashed
      ? <button className={styles.powerOffButton} onClick={powerOff}>
        <PowerSymbol />
      </button>
      : <div className={`${styles.pageContainer} primary`}>
        {bootupTrigger === 0 && !playLogo &&
        <div className={styles.wrapper}>
          <button className={styles.powerOnButton} onClick={powerOn}>
            <PowerSymbol />
          </button>
        </div>}
        {!playLogo &&
          <div className={styles.typingWrapper}>
            <TypingAnimation className={styles.typingText} text={bootupText} playTrigger={bootupTrigger} onEnded={onTypingEnded}/>
          </div>}
        {playLogo &&
          <div className={styles.wrapper}>
            <LogoAnimation play={playLogo} onEnded={onSplashEnded} />
          </div>}
        <button className={`${styles.skipButton} secondary-text`} onClick={onSplashEnded}>Click here or 'Esc' to skip.</button>
      </div>}
    </>
  );
}
