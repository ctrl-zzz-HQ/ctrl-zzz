import { cookies } from 'next/headers';
import SplashContentLayout from './SplashContentLayout';

const cookieName = 'splashed';

export default function SplashLayout({ children }) {

  const cookieStore = cookies();
  const splashed = cookieStore.get(cookieName);

  return (
    <SplashContentLayout initialSplashed={splashed}>
      {children}
    </SplashContentLayout>
  );
}
