import { Link, Outlet } from 'react-router-dom';
import agents from '../data/agents.json';
import targets from '../data/targets.json';
import missions from '../data/missions.json';

export default function Missions() {
  return (
    <div className="table-container w-100 h-100">
      <table className="w-100 h-100">
        <tbody>
          <tr>
            <td>
              <div className="left-menu">
                <div className="menu-group">
                  {
                    missions.map(mission =>
                      <Link to={`/mission/${mission.code}`} className="menu-group-item" key={mission.code}>
                        &gt; {mission.code} [{mission.status}]
                      </Link>
                    )
                  }
                </div>
              </div>
            </td>
            <td>
              <div className="page-content">
                <Outlet />
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan="2">Footer</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
