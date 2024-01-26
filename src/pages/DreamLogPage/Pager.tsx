import { useEffect, useCallback, useRef, useMemo } from 'react';

export default function Pager({ text, width, height, padding, scrollTop, onEndIndexCalculated }: PagerProps) {

  const bodyRef = useRef<HTMLDivElement>(null);
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

    // update scrollTop
    // TODO this needs to be done after we've reached the point
    // where scrollTop can be set
    bodyRef.current.scrollTop = scrollTop;
    bodyRef.current.innerHTML = '';

    // at what point does adding the next word result in scrollTop + clientHeight < scrollHeight?
    // recalculate when scroll, resize, and page load

    // First go line by line
    let linesHTML = '';
    let endIndex = 0;

    const lines = text.split('\n');
    let lineIndex = 0;
    while (lineIndex < lines.length) {
      linesHTML = bodyRef.current.innerHTML;
      bodyRef.current.innerHTML += convertLineToHTML(lines[lineIndex]);
      if (scrollTop > 0) {
        // Set scrollTop, then check value to see if it "stuck"
        bodyRef.current.scrollTop = scrollTop;
        if (bodyRef.current.scrollTop === scrollTop) {
          endIndex--; // remove the extra newline at the end
          break;
        }
      } else {
        if (bodyRef.current.scrollHeight > bodyRef.current.clientHeight) {
          endIndex--; // remove the extra newline at the end
          break;
        }
      }
      endIndex += lines[lineIndex].length + 1; // +1 to account for the newline after each line
      lineIndex++;
    }
    if (lineIndex === 0) return;

    // Next go word by word
    const words = lines[lineIndex].split(' ');
    let wordIndex = 0;
    while (wordIndex < words.length) {
      bodyRef.current.innerHTML = `${linesHTML}<p>${words.slice(0, wordIndex + 1).join(' ')}</p>`;
      if (scrollTop > 0) {
        // Set scrollTop, then check value to see if it "stuck"
        bodyRef.current.scrollTop = scrollTop;
        if (bodyRef.current.scrollTop === scrollTop) {
          break;
        }
      } else {
        if (bodyRef.current.scrollHeight > bodyRef.current.clientHeight) {
          break;
        }
      }
      endIndex += words[wordIndex].length + 1; // +1 to account for the space or newline before each word
      wordIndex++;
    }

    onEndIndexCalculated(endIndex);
  }, [text, width, height, scrollTop]);

  return (
    <div style={{
      position: 'absolute',
      overflow: 'scroll',
      visibility: 'hidden',
      // background: 'red',
      ...bodyStyle,
    }} ref={bodyRef}>
    </div>
  );
}

export interface PagerProps {
  text: string;
  width: number;
  height: number;
  padding: string;
  scrollTop: number;
  onEndIndexCalculated: (endIndex: number) => void;
}
