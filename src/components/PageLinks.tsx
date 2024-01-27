import { Link } from 'react-router-dom';
import { usePathIndex } from '@/hooks';

export function MobileLinks({ data }: Props) {

  const currIndex = usePathIndex();

  return (
    currIndex === undefined ? null :
    <>
      <Link to={`${currIndex - 1}`} className={currIndex <= 0 ? 'v-hidden' : ''}>&lt; prev</Link>
      <p className="secondary-text touch">[or swipe]</p>
      <p className="secondary-text no-touch">[or use arrow keys]</p>
      <Link to={`${currIndex + 1}`} className={currIndex >= data.length - 1 ? 'v-hidden' : ''}>next &gt;</Link>
    </>
  );
}

export function DesktopLinks({ data }: Props) {

  const currIndex = usePathIndex();

  return (
    currIndex === undefined ? null :
    <>
      {data.map((item, index) =>
        <Link to={`${index}`} className={index === currIndex ? 'active' : ''} style={{marginBottom: '.25rem'}} key={index}>
          &gt; {item.label}
        </Link>
      )}
      <p className={`${data.length <= 1 ? 'd-none' : ''} secondary-text`}>
        [
          <span className="touch">swipe </span>
          <span className="no-touch">arrow keys </span>
        to navigate]
      </p>
    </>
  );
}

interface Props {
  data: Array<{
    label?: string;
  }>
}
