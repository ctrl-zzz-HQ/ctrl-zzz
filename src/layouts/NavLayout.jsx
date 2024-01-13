import './NavLayout.css';
import { Outlet, Link } from 'react-router-dom';
import agents from '../data/agents.json';
import targets from '../data/targets.json';
import missions from '../data/missions.json';

export default function NavLayout() {

  return (
    <div className="nav-layout primary page-container">
      <h1>CTRL+ZZZ HQ</h1>
      <div className="table-container w-100 h-100">
        <table className="w-100 h-100">
          <tbody>
            <tr>
              <td>
                <div className="left-menu">
                  <div className="menu-group">
                    <span className="menu-group-header">MISSIONS</span>
                    {
                      missions.map(mission =>
                        <Link to={`/mission/${mission.code}`} className="menu-group-item" key={mission.code}>
                          &gt; {mission.code} [{mission.status}]
                        </Link>
                      )
                    }
                  </div>
                  <div className="menu-group">
                    <span className="menu-group-header">AGENTS</span>
                    {
                      agents.map(agent =>
                        <Link to={`/member/${agent.code}`} className="menu-group-item" key={agent.code}>
                          &gt; {agent.code} [{agent.alias}]
                        </Link>
                      )
                    }
                  </div>
                  <div className="menu-group">
                    <span className="menu-group-header">TARGETS</span>
                    {
                      targets.map(target =>
                        <Link to={`/member/${target.code}`} className="menu-group-item" key={target.code}>
                          &gt; {target.code} [{target.alias}]
                        </Link>
                      )
                    }
                  </div>
                  <div className="menu-group">
                    <Link to="/dream-log" className="menu-group-header">DREAM LOG</Link>
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
    </div>
  );
}
