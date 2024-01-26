import { useEffect, useCallback, useRef, useMemo } from 'react';

export default function Pager({ text, width, height, padding, scrollTop, onEndIndexCalculated, onScrollHeightCalculated }: PagerProps) {

  const bodyRef = useRef<HTMLDivElement>(null);
  const heightRef = useCallback((node: HTMLDivElement) => {
    if (node) {
      onScrollHeightCalculated(node.scrollHeight - padding[0] * 2);
    }
  }, [text, width, height, padding]);

  const bodyStyle = useMemo(() => {
    return {
      width: width + 'px',
      height: height + 'px',
      padding: `${padding[0]}px ${padding[1]}px`,
    };
  }, [width, height, padding]);

  const convertLineToHTML = useCallback((line: string) => {
    if (line.trim().length === 0) {
      return '<br/>';
    } else {
      return `<p>${line}</p>`;
    }
  }, []);

  useEffect(() => {
    if (!bodyRef.current) return;
    bodyRef.current.innerHTML = '';

    let endIndex = 0;
    let nextPageScroll = 0;

    // First go line by line
    const lines = text.split('\n');
    let linesHTML = '';
    let lineIndex = 0;
    while (lineIndex < lines.length) {
      linesHTML = bodyRef.current.innerHTML;
      bodyRef.current.innerHTML += convertLineToHTML(lines[lineIndex]);
      if (bodyRef.current.scrollHeight > scrollTop + bodyRef.current.clientHeight) {
        nextPageScroll = bodyRef.current.scrollHeight - padding[0] * 2;
        endIndex--; // remove the extra newline at the end
        break;
      }
      endIndex += lines[lineIndex].length + 1; // +1 to account for the newline after each line
      lineIndex++;
    }
    if (lineIndex === 0) return;
    if (lineIndex === lines.length) {
      onEndIndexCalculated(endIndex, Math.max(nextPageScroll, 0));
      return;
    }

    // Next go word by word
    const words = lines[lineIndex].split(' ');
    let wordIndex = 0;
    while (wordIndex < words.length) {
      bodyRef.current.innerHTML = `${linesHTML}<p>${words.slice(0, wordIndex + 1).join(' ')}</p>`;
      if (bodyRef.current.scrollHeight > scrollTop + bodyRef.current.clientHeight) {
        nextPageScroll = bodyRef.current.scrollHeight - padding[0] * 2;
        break;
      }
      endIndex += words[wordIndex].length + 1; // +1 to account for the space or newline before each word
      wordIndex++;
    }

    onEndIndexCalculated(endIndex, Math.max(nextPageScroll, 0));
  }, [text, width, height, padding, scrollTop, padding]);

  return (
    <>
      <div style={{
        position: 'absolute',
        overflow: 'scroll',
        visibility: 'hidden',
        // background: 'red',
        ...bodyStyle,
      }} ref={heightRef}>
        {text.split('\n').map((line, index) => {
          if (line.trim().length === 0) {
            return <br key={index}></br>;
          } else {
            return <p key={index}>{line}</p>;
          }
        })}
      </div>
      <div style={{
        position: 'absolute',
        overflow: 'scroll',
        visibility: 'hidden',
        // background: 'red',
        ...bodyStyle,
      }} ref={bodyRef}>
      </div>
    </>
  );
}

export interface PagerProps {
  text: string;
  width: number;
  height: number;
  padding: [number, number];
  scrollTop: number;
  onEndIndexCalculated: (endIndex: number, nextPageScroll: number) => void;
  onScrollHeightCalculated: (scrollHeight: number) => void;
}
