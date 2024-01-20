import { cookies } from 'next/headers';
import Splash from './SplashContentLayout';

const cookieName = 'splashed';

export default function SplashLayout({ children }) {

  const cookieStore = cookies();
  const splashed = cookieStore.get(cookieName);

  return (
    <>
      {children}
      <Splash initialSplashed={splashed}></Splash>
    </>
  );
}
