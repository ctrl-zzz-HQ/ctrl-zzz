import { cookies } from 'next/headers';
import Splash from './Splash';

const cookieName = 'splashed';

export default function CookieHandler({ children }) {

  const cookieStore = cookies();
  const splashed = cookieStore.get(cookieName);

  return (
    <Splash initialSplashed={splashed}>
      {children}
    </Splash>
  );
}
