import { Link, useLocation } from 'react-router-dom';
import { useMemo } from 'react';

export const getLastNumberInPath = function(path: string): number|undefined {
  const splitPath = path.split('/');
  for (let i = splitPath.length - 1; i >= 0; i--) {
    if (splitPath[i].length > 0) {
      return +splitPath[i];
    }
  }
}

export function MobileLinks({ data }: Props) {

  const { pathname } = useLocation();
  const currIndex = useMemo<number|undefined>(() => getLastNumberInPath(pathname), [pathname]);

  return (
    currIndex === undefined ? null :
    <>
      <Link to={`${currIndex - 1}`} className={currIndex <= 0 ? 'v-hidden' : ''}>&lt; prev</Link>
      <p className="secondary-text">[or swipe]</p>
      <Link to={`${currIndex + 1}`} className={currIndex >= data.length - 1 ? 'v-hidden' : ''}>next &gt;</Link>
    </>
  );
}

export function DesktopLinks({ data }: Props) {

  const { pathname } = useLocation();
  const currIndex = useMemo<number|undefined>(() => getLastNumberInPath(pathname), [pathname]);

  return (
    currIndex === undefined ? null :
    <>
      {data.map((item, index) =>
        <Link to={`${index}`} className={index === currIndex ? 'active' : ''} style={{marginBottom: '.25rem'}} key={index}>
          &gt; {item.label}
        </Link>
      )}
    </>
  );
}

interface Props {
  data: Array<{
    label?: string;
  }>
}
