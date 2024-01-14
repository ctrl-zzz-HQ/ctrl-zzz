import './MemberLayout.css';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import members from '../data/members.json';
import Footer from './Footer';

export default function MemberLayout() {

  const location = useLocation();
  const currIndex = useMemo(() => {
    const splitPath = location.pathname.split('/');
    for (let i = splitPath.length - 1; i >= 0; i--) {
      if (splitPath[i].length > 0) {
        return splitPath[i] * 1;
      }
    }
  }, [location]);

  return (
    <div className="member-layout page-container">
      <div className="member-layout table-container">
        <table className="member-layout">
          <tbody>
            <tr>
              <td className="desktop">
                {
                  members.map((member, index) =>
                    <Link to={`${index}`} className={`menu-group-item ${index === currIndex ? 'active' : ''}`} key={index}>
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
            <tr className="mobile">
              <td colSpan="2" className="h-0">
                <div className="d-flex flex-row justify-space-between">
                  <Link to={`${currIndex - 1}`} className={currIndex <= 0 ? 'v-hidden' : ''}>&lt; previous</Link>
                  <Link to={`${currIndex + 1}`} className={currIndex >= members.length - 1 ? 'v-hidden' : ''}>next &gt;</Link>
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
