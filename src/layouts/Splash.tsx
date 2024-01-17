import './Splash.css';
import { useCookies } from 'react-cookie';
import { Outlet } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import bootupText from '../data/bootup_text.js';
import LogoAnimation from './LogoAnimation';

const cookieName = 'splashed';

export default function Splash() {

  const [cookies, setCookie,] = useCookies([cookieName]);
  const [bootupPos, setBootupPos] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);

  const setSplashedCookie = useCallback((value: boolean) => {
    setCookie(cookieName, value, { sameSite: 'strict' });
  }, [setCookie]);

  const powerOn = useCallback(() => {
    setStartTime(new Date().getTime());
    setBootupPos(1);
  }, [setStartTime, setBootupPos]);

  const powerOff = useCallback(() => {
    setBootupPos(0);
    setSplashedCookie(false);
  }, [setBootupPos, setSplashedCookie]);

  useEffect(() => {
    if (startTime && bootupPos > 0 && bootupPos < bootupText.length) {
      const intervalId = setInterval(() => setBootupPos(new Date().getTime() - startTime), 1);
      return () => clearInterval(intervalId);
    }
  }, [startTime, bootupPos, setBootupPos]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSplashedCookie(true);
      }
    }

    if (!cookies[cookieName]) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [cookies, setSplashedCookie]);

  return (
    cookies[cookieName] ?
    <>
      <Outlet />
      <button className="splash power-off-button" onClick={powerOff}>
        {/* Adapted from: https://commons.wikimedia.org/wiki/File:Power.svg */}
        <svg viewBox="0 0 300 300" width="300" height="300" className="w-100 h-100">
          <path fill="currentcolor" d=" M 244.802 61.643 C 234.168 50.875 224.661 42.297 210.837 35.523 C 202.151 31.261 191.669 34.934 187.47 43.717 C 183.243 52.501 186.889 63.072 195.566 67.334 C 205.86 72.375 212.776 77.95 220.72 85.992 C 259.717 125.427 259.717 189.586 220.72 229.011 C 201.83 248.125 176.694 258.624 149.984 258.624 C 123.266 258.624 98.138 248.116 79.247 229.011 C 40.251 189.586 40.251 125.427 79.247 85.992 C 87.218 77.941 95.099 72.384 104.885 67.352 C 113.15 63.081 116.608 52.519 112.597 43.726 C 108.584 34.952 99.952 31.341 91.482 35.487 C 78.051 42.082 65.844 50.875 55.184 61.643 C 2.901 114.498 2.901 200.488 55.184 253.352 C 81.33 279.775 115.662 293 149.994 293 C 184.334 293 218.666 279.784 244.803 253.352 C 297.104 200.506 297.104 114.507 244.802 61.643 Z  M 149.984 174 C 159.849 174 167.855 165.993 167.855 156.129 L 167.882 24.871 C 167.882 15.007 159.876 7 150.011 7 C 140.145 7 132.139 15.007 132.139 24.871 L 132.139 78.486 L 132.112 156.128 C 132.112 166.002 140.118 174 149.984 174 Z "/>
        </svg>
      </button>
    </> :
    <div className="splash page-container primary">
      {bootupPos <= 0 &&
      <div className="button-wrapper">
        <button className="splash power-on-button" onClick={powerOn}>
          {/* Adapted from: https://commons.wikimedia.org/wiki/File:Power.svg */}
          <svg viewBox="0 0 300 300" width="300" height="300" className="w-100">
            <path fill="currentcolor" d=" M 244.802 61.643 C 234.168 50.875 224.661 42.297 210.837 35.523 C 202.151 31.261 191.669 34.934 187.47 43.717 C 183.243 52.501 186.889 63.072 195.566 67.334 C 205.86 72.375 212.776 77.95 220.72 85.992 C 259.717 125.427 259.717 189.586 220.72 229.011 C 201.83 248.125 176.694 258.624 149.984 258.624 C 123.266 258.624 98.138 248.116 79.247 229.011 C 40.251 189.586 40.251 125.427 79.247 85.992 C 87.218 77.941 95.099 72.384 104.885 67.352 C 113.15 63.081 116.608 52.519 112.597 43.726 C 108.584 34.952 99.952 31.341 91.482 35.487 C 78.051 42.082 65.844 50.875 55.184 61.643 C 2.901 114.498 2.901 200.488 55.184 253.352 C 81.33 279.775 115.662 293 149.994 293 C 184.334 293 218.666 279.784 244.803 253.352 C 297.104 200.506 297.104 114.507 244.802 61.643 Z  M 149.984 174 C 159.849 174 167.855 165.993 167.855 156.129 L 167.882 24.871 C 167.882 15.007 159.876 7 150.011 7 C 140.145 7 132.139 15.007 132.139 24.871 L 132.139 78.486 L 132.112 156.128 C 132.112 166.002 140.118 174 149.984 174 Z "/>
          </svg>
        </button>
      </div>}
      {bootupPos > 0 && bootupPos < bootupText.length &&
      <div className="bootup-wrapper">
        <div className={`bootup-text ${bootupPos >= bootupText.length / 2 ? 'monospace' : ''}`}>
          {bootupText.substr(0, bootupPos).split('\n').map((line, i) => <p key={i}>{line}</p>)}
        </div>
      </div>}
      <LogoAnimation play={bootupPos > 0 && bootupPos >= bootupText.length} onEnded={() => setSplashedCookie(true)} />
      <button className="skip-button" onClick={() => setSplashedCookie(true)}>Click here or 'Esc' to skip.</button>
    </div>
  );
}
