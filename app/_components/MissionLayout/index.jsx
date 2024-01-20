import './MissionLayout.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import missions from '/public/data/missions.json';
import Footer from '/app/_components/Footer';
import { DesktopMissionLinks } from './MissionLinks';

export default function MissionLayout({ children }) {

  return (
    <div className="mission-layout page-container">
      <div className="mission-layout table-container">
        <table className="mission-layout">
          <tbody>
            <tr>
              <td className="desktop fit-width">
                <div className="left-menu">
                  <div className="menu-group">
                    <DesktopMissionLinks />
                  </div>
                </div>
              </td>
              <td>
                <div className="page-content">
                  {children}
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
