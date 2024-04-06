import { useState, useEffect } from 'react';
import TextToHtml from '@components/TextToHtml';

export default function BootupAnimation({ className, speed=1, html=false, text, playTrigger, onEnded }: Props) {

  const [bootupPos, setBootupPos] = useState(0);

  useEffect(() => {
    if (playTrigger !== 0) {
      setBootupPos(1);
    }
  }, [playTrigger]);

  useEffect(() => {
    if (bootupPos > 0 && bootupPos < text.length) {
      const intervalId = setTimeout(() => setBootupPos(prev => prev + 4), speed);
      return () => clearTimeout(intervalId);
    } else if (bootupPos >= text.length) {
      onEnded && onEnded();
    }
  }, [bootupPos, text, onEnded, speed]);

  return (
    <div className={className}>
      <TextToHtml text={text.substr(0, bootupPos)} html={html} />
    </div>
  );
}

interface Props {
  className?: string;
  speed?: number;
  html?: boolean;
  text: string;
  /**
   * When this prop changes, animation will be triggered from the beginning,
   * unless equal to 0.
   */
  playTrigger: number;
  onEnded?: () => void;
}
