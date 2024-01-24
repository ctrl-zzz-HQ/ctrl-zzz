import { useState, useEffect } from 'react';

export default function BootupAnimation({ text, play, onEnded }: Props) {

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
    if (startTime && bootupPos > 0 && bootupPos < text.length) {
      const intervalId = setTimeout(() => setBootupPos(new Date().getTime() - startTime), 1);
      return () => clearTimeout(intervalId);
    }
  }, [startTime, bootupPos, setBootupPos]);

  useEffect(() => {
    bootupPos >= text.length && setEnded(true);
  }, [bootupPos, setEnded]);

  useEffect(() => {
    ended && onEnded();
  }, [ended, onEnded]);

  return (
    (!play || ended) ? null :
    <div className="bootup-wrapper">
      <div className={`bootup-text ${bootupPos >= text.length / 2 ? 'monospace' : ''}`}>
        {text.substr(0, bootupPos).split('\n').map((line, i) => <p key={i}>{line}</p>)}
      </div>
    </div>
  );
}

interface Props {
  text: string;
  play: boolean;
  onEnded: () => void;
}
