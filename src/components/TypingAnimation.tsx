import { useState, useEffect } from 'react';

export default function TypingAnimation({ className, style, speed=0, text, playTrigger, onEnded }: Props) {

  const [bootupPos, setBootupPos] = useState(0);

  useEffect(() => {
    if (playTrigger !== 0) {
      setBootupPos(1);
    }
  }, [playTrigger]);

  useEffect(() => {
    if (bootupPos > 0 && bootupPos < text.length) {
      const intervalId = setTimeout(() => setBootupPos(prev => prev + 1), speed);
      return () => clearTimeout(intervalId);
    } else if (bootupPos >= text.length) {
      onEnded && onEnded();
    }
  }, [bootupPos, text, speed]);

  return (
    <div style={style} className={className}>
      {text.substr(0, bootupPos).split('\n').map((line, i) => {
        if (line.trim().length === 0) {
          return <br key={i}></br>;
        } else {
          return <p key={i}>{line}</p>;
        }
      })}
    </div>
  );
}

interface Props {
  className?: string;
  style?: object;
  speed?: number;
  text: string;
  /**
   * When this prop changes, animation will be triggered from the beginning,
   * unless equal to 0.
   */
  playTrigger: number;
  onEnded?: () => void;
}
