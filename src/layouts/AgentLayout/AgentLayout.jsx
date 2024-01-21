import './AgentLayout.css';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import agents from '../../data/agents.json';
import Footer from '../../components/Footer';

export default function AgentLayout() {

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
    <div className="agent-layout page-container">
      <div className="agent-layout table-container">
        <table className="agent-layout">
          <tbody>
            <tr>
              <td className="desktop fit-width">
                {
                  agents.map((agent, index) =>
                    <Link to={`${index}`} className={`menu-group-item ${index === currIndex ? 'active' : ''}`} key={index}>
                      &gt; {agent.code} [{agent.alias}]
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
              <td colSpan="2" className="fit-height">
                <div className="d-flex flex-row justify-space-between">
                  <Link to={`${currIndex - 1}`} className={currIndex <= 0 ? 'v-hidden' : ''}>&lt; previous</Link>
                  <Link to={`${currIndex + 1}`} className={currIndex >= agents.length - 1 ? 'v-hidden' : ''}>next &gt;</Link>
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
