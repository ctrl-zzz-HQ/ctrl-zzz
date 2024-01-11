import './Splash.css';
import { useCookies } from 'react-cookie';
import { Outlet } from 'react-router-dom';

export default function Splash() {

  const cookieName = 'splashed';
  const [cookies, setCookie,] = useCookies([cookieName]);

  const handlePasswordChange = function(e) {
    if (e.target.value === 'ctrl+zzz') {
      setCookie(cookieName, true);
    }
  }

  return (
    cookies[cookieName] ? <Outlet /> :
    <div className="d-flex flex-column page-container">
      <div className="d-flex flex-column password-container">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" onChange={handlePasswordChange}/>
      </div>
    </div>
  );
}
