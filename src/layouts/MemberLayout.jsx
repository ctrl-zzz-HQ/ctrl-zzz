import './MemberLayout.css';
import { Link, Outlet, useLocation } from 'react-router-dom';
import members from '../data/members.json';
import Footer from './Footer';

export default function MemberLayout() {

  const location = useLocation();

  const isActive = function(index) {
    return location.pathname && location.pathname.endsWith(`/${index}`);
  }

  return (
    <div className="member-layout page-container">
      <div className="member-layout table-container">
        <table className="member-layout">
          <tbody>
            <tr>
              <td>
                {
                  members.map((member, index) =>
                    <Link to={`${index}`} className={`menu-group-item ${isActive(index) ? 'active' : ''}`} key={index}>
                      &gt; {member.code} [{member.alias}]
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
