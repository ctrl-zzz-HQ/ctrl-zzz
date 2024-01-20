import { cookies } from 'next/headers';
import Splash from './Splash';

const cookieName = 'splashed';

export default function SplashLayout({ children }: LayoutProps) {

  const cookieStore = cookies();
  const splashed = !!cookieStore.get(cookieName)?.value;

  return (
    <>
      {children}
      <Splash initialSplashed={splashed}></Splash>
    </>
  );
}
