import './AgentLayout.css';
import { Outlet } from 'react-router-dom';
import agentsJson from '../../data/agents.json';
import Footer from '../../components/Footer';
import { MobileLinks, DesktopLinks } from '../../components/PageLinks';
import { Agent } from '../../types/types.ts';

export default function AgentLayout() {

  const agents: Agent[] = agentsJson;
  agents.forEach(agent => agent.label = `${agent.code} [${agent.alias}]`)

  return (
    <div className="agent-layout page-container">
      <div className="agent-layout table-container">
        <table className="agent-layout">
          <tbody>
            <tr>
              <td className="desktop fit-width">
                <DesktopLinks data={agents} />
              </td>
              <td>
                <div className="page-content">
                  <Outlet />
                </div>
              </td>
            </tr>
            <tr className="mobile">
              <td colSpan={2} className="fit-height">
                <div className="d-flex flex-row justify-space-between">
                  <MobileLinks data={agents} />
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="fit-height"><Footer/></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
