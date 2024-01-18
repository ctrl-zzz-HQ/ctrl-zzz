'use client'
import { useState, useEffect, useCallback } from 'react';
import bootupText from '/public/data/bootup-text.ts';

export default function BootupAnimation({ play, onEnded }) {

  const [bootupPos, setBootupPos] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    if (play && !ended) {
      setStartTime(new Date().getTime());
      setBootupPos(1);
    }
  }, [play, ended]);

  useEffect(() => {
    if (startTime && bootupPos > 0 && bootupPos < bootupText.length) {
      const intervalId = setInterval(() => setBootupPos(new Date().getTime() - startTime), 1);
      return () => clearInterval(intervalId);
    }
  }, [startTime, bootupPos, setBootupPos]);

  useEffect(() => {
    bootupPos >= bootupText.length && setEnded(true);
  }, [bootupPos, setEnded]);

  useEffect(() => {
    ended && onEnded();
  }, [ended]);

  return (
    play && !ended &&
    <div className="bootup-wrapper">
      <div className={`bootup-text ${bootupPos >= bootupText.length / 2 ? 'monospace' : ''}`}>
        {bootupText.substr(0, bootupPos).split('\n').map((line, i) => <p key={i}>{line}</p>)}
      </div>
    </div>
  );
}
