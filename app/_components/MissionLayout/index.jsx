import './MissionLayout.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import missions from '/public/data/missions.json';
import Footer from '/app/_components/Footer';
import { DesktopLinks } from '/app/_components/PageLinks';

export default function MissionLayout({ children }) {

  missions.forEach(mission => mission.label = `${mission.code} [${mission.status}]`)

  return (
    <div className="mission-layout page-container">
      <div className="mission-layout table-container">
        <table className="mission-layout">
          <tbody>
            <tr>
              <td className="desktop fit-width">
                <div className="left-menu">
                  <div className="menu-group">
                    <DesktopLinks data={missions} />
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
