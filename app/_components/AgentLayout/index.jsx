import './AgentLayout.css';
import Link from 'next/link';
import agents from '/public/data/agents.json';
import Footer from '/app/_components/Footer';
import { MobileAgentLinks, DesktopAgentLinks } from './AgentLinks';

export default function AgentLayout({ children }) {

  return (
    <div className="agent-layout page-container">
      <div className="agent-layout table-container">
        <table className="agent-layout">
          <tbody>
            <tr>
              <td className="desktop fit-width">
                <DesktopAgentLinks />
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
                  <MobileAgentLinks />
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
