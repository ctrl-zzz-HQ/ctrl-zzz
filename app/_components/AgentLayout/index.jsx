import './AgentLayout.css';
import Link from 'next/link';
import agents from '/public/data/agents.json';
import Footer from '/app/_components/Footer';
import { MobileLinks, DesktopLinks } from '/app/_components/PageLinks';

export default function AgentLayout({ children }) {

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
                  {children}
                </div>
              </td>
            </tr>
            <tr className="mobile">
              <td colSpan="2" className="fit-height">
                <div className="d-flex flex-row justify-space-between">
                  <MobileLinks data={agents} />
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
