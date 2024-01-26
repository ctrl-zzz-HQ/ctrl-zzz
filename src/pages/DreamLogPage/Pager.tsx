import { useEffect, useCallback, useRef, useMemo } from 'react';

export default function Pager({ text, width, height, padding, scrollTop, onEndIndexCalculated, onScrollHeightCalculated }: PagerProps) {

  const bodyRef = useRef<HTMLDivElement>(null);
  const heightRef = useCallback((node: HTMLDivElement) => {
    if (node) {
      const style = window.getComputedStyle(node);
      const paddingTop = +style.paddingTop.replace('px', '');
      const paddingBottom = +style.paddingBottom.replace('px', '');
      onScrollHeightCalculated(node.scrollHeight - paddingTop - paddingBottom);
    }
  }, [text, width, height, padding]);
  const bodyStyle = useMemo(() => {
    return {
      width: width + 'px',
      height: height + 'px',
      padding,
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

    // First go line by line
    const lines = text.split('\n');
    let linesHTML = '';
    let lineIndex = 0;
    while (lineIndex < lines.length) {
      linesHTML = bodyRef.current.innerHTML;
      bodyRef.current.innerHTML += convertLineToHTML(lines[lineIndex]);
      if (bodyRef.current.scrollHeight > scrollTop + bodyRef.current.clientHeight) {
        endIndex--; // remove the extra newline at the end
        break;
      }
      endIndex += lines[lineIndex].length + 1; // +1 to account for the newline after each line
      lineIndex++;
    }
    if (lineIndex === 0) return;
    if (lineIndex === lines.length) {
      onEndIndexCalculated(endIndex);
      return;
    }

    // Next go word by word
    const words = lines[lineIndex].split(' ');
    let wordIndex = 0;
    while (wordIndex < words.length) {
      bodyRef.current.innerHTML = `${linesHTML}<p>${words.slice(0, wordIndex + 1).join(' ')}</p>`;
      if (bodyRef.current.scrollHeight > scrollTop + bodyRef.current.clientHeight) {
        break;
      }
      endIndex += words[wordIndex].length + 1; // +1 to account for the space or newline before each word
      wordIndex++;
    }

    onEndIndexCalculated(endIndex);
  }, [text, width, height, padding, scrollTop]);

  return (
    <>
      <div style={{
        position: 'absolute',
        overflow: 'scroll',
        visibility: 'hidden',
        // background: 'red',
        ...bodyStyle,
      }} ref={heightRef}>
        {text.split('\n').map(line => {
          if (line.trim().length === 0) {
            return <br></br>;
          } else {
            return <p>{line}</p>;
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
  padding: string;
  scrollTop: number;
  onEndIndexCalculated: (endIndex: number) => void;
  onScrollHeightCalculated: (scrollHeight: number) => void;
}
