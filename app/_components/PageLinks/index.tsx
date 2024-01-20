'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

const getLastNumberInPath = function(path: string): number|undefined {
  const splitPath = path.split('/');
  for (let i = splitPath.length - 1; i >= 0; i--) {
    if (splitPath[i].length > 0) {
      return +splitPath[i];
    }
  }
}

export function MobileLinks({ data }: Props) {

  const pathname = usePathname();
  const currIndex = useMemo<number|undefined>(() => getLastNumberInPath(pathname), [pathname]);

  return (
    !currIndex ? null :
    <>
      <Link href={`${currIndex - 1}`} className={currIndex <= 0 ? 'v-hidden' : ''}>&lt; previous</Link>
      <Link href={`${currIndex + 1}`} className={currIndex >= data.length - 1 ? 'v-hidden' : ''}>next &gt;</Link>
    </>
  );
}

export function DesktopLinks({ data }: Props) {

  const pathname = usePathname();
  const currIndex = useMemo<number|undefined>(() => getLastNumberInPath(pathname), [pathname]);

  return (
    !currIndex ? null :
    <>
      {data.map((item, index) =>
        <Link href={`${index}`} className={`menu-group-item ${index === currIndex ? 'active' : ''}`} key={index}>
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
