import './Splash.css';
import { useCookies } from 'react-cookie';
import { Outlet } from 'react-router-dom';
import lottie from 'lottie-web';
import { useState, useRef, useEffect } from 'react';
import bootupText from '../data/bootup_text.js';

export default function Splash() {

  const cookieName = 'splashed';
  const [cookies, setCookie,] = useCookies([cookieName]);
  const logoAnimationRef = useRef(null);
  const [bootupPos, setBootupPos] = useState(0);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    if (startTime && bootupPos > 0 && bootupPos < bootupText.length) {
      const intervalId = setInterval(() => setBootupPos(new Date().getTime() - startTime), 1);
      return () => clearInterval(intervalId);
    }
  }, [startTime, bootupPos, setBootupPos]);

  useEffect(() => {
    if (bootupPos >= bootupText.length) {
      console.log('loading animation');
      const logoAnimation = lottie.loadAnimation({
        container: logoAnimationRef.current,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: '/lottie/logo/data.json',
      });
      setTimeout(() => logoAnimation.play(), 500);
      logoAnimation.addEventListener('complete', () => setCookie(cookieName, true));
      return () => logoAnimation.destroy();
    }
  }, [bootupPos, logoAnimationRef, setCookie]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setCookie(cookieName, true);
      }
    }

    if (!cookies[cookieName]) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [cookies, setCookie]);

  const skipBootupSequence = function(e) {
    setCookie(cookieName, true);
  }

  const powerOn = function(e) {
    setStartTime(new Date().getTime());
    setBootupPos(1);
  }

  return (
    cookies[cookieName] ? <Outlet /> :
    <div className="splash page-container">
      <button className="skip-button" onClick={skipBootupSequence}>Click here or 'Esc' to skip.</button>
      {bootupPos <= 0 &&
      <div className="button-wrapper">
        <button className="power-button" onClick={powerOn}>⏻</button>
      </div>}
      {bootupPos > 0 && bootupPos < bootupText.length &&
      <div className="bootup-wrapper">
        <div className={`bootup-text ${bootupPos >= bootupText.length / 2 ? 'monospace' : ''}`}>
          {bootupText.substr(0, bootupPos).split('\n').map((line, i) => <p key={i}>{line}</p>)}
        </div>
      </div>}
      {bootupPos > 0 && bootupPos >= bootupText.length &&
      <div className="logo-wrapper">
        <div className="logo-animation" ref={logoAnimationRef}></div>
      </div>}
    </div>
  );
}
