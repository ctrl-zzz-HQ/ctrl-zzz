import './MissionLayout.css';
import { Link, Outlet, useLocation } from 'react-router-dom';
import missions from '../../data/missions.json';
import Footer from '../../components/Footer';

export default function MissionLayout() {

  const location = useLocation();

  const isActive = function(index) {
    return location.pathname && location.pathname.endsWith(`/${index}`);
  }

  return (
    <div className="mission-layout page-container">
      <div className="mission-layout table-container">
        <table className="mission-layout">
          <tbody>
            <tr>
              <td className="desktop fit-width">
                <div className="left-menu">
                  <div className="menu-group">
                    {
                      missions.map((mission, index) =>
                        <Link to={`${index}`} className={`menu-group-item ${isActive(index) ? 'active' : ''}`} key={index}>
                          &gt; {mission.code} [{mission.status}]
                        </Link>
                      )
                    }
                  </div>
                </div>
              </td>
              <td>
                <div className="page-content">
                  <Outlet key={location.pathname} />
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan="2" className="fit-height"><Footer/></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
