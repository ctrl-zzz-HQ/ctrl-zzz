import './DreamLogLayout.css';
import { Link, Outlet, useLocation } from 'react-router-dom';
import dreamLogs from '../data/dream-logs.json';
import Footer from './Footer';

export default function DreamLogLayout() {

  const location = useLocation();

  const isActive = function(index) {
    return location.pathname && location.pathname.endsWith(`/${index}`);
  }

  return (
    <div className="dream-log-layout page-container">
      <div className="dream-log-layout table-container">
        <table className="dream-log-layout">
          <tbody>
            <tr>
              <td>
                {
                  dreamLogs.map((dreamLog, index) =>
                    <Link to={`${index}`} className={`menu-group-item ${isActive(index) ? 'active' : ''}`} key={index}>
                      &gt; {dreamLog.code} [{dreamLog.timestamp}]
                    </Link>
                  )
                }
              </td>
              <td>
                <div className="page-content">
                  <Outlet key={location.pathname}/>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan="2" className="h-0"><Footer/></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
