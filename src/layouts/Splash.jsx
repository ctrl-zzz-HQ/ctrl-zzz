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
    <div className="splash page-container primary">
      <div className="dialog secondary">
        <div className="d-flex flex-column secondary box-border">
          <h1 className="header">CTRL+ZZZ HQ</h1>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" className="primary" onChange={handlePasswordChange}/>
        </div>
      </div>
    </div>
  );
}
