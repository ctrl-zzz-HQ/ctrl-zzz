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
                    <Link to="/" className="menu-group-item">&gt; Mission I</Link>
                  </div>
                  <div className="menu-group">
                    <span className="menu-group-header">AGENTS</span>
                    <Link to="/" className="menu-group-item">&gt; I [xxx]</Link>
                    <Link to="/" className="menu-group-item">&gt; II [xxx]</Link>
                    <Link to="/" className="menu-group-item">&gt; III [xxx]</Link>
                  </div>
                  <div className="menu-group">
                    <span className="menu-group-header">TARGETS</span>
                    <Link to="/" className="menu-group-item">&gt; I [xxx]</Link>
                    <Link to="/" className="menu-group-item">&gt; II [xxx]</Link>
                    <Link to="/" className="menu-group-item">&gt; III [xxx]</Link>
                  </div>
                  <div className="menu-group">
                    <Link to="/" className="menu-group-header">DREAM LOG</Link>
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
