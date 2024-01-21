import './MissionLayout.css';
import { Outlet } from 'react-router-dom';
import missionsJson from '@data/missions.json';
import Footer from '@components/Footer';
import { DesktopLinks } from '@components/PageLinks';
import { Mission } from '@types';

export default function MissionLayout() {

  const missions: Mission[] = missionsJson;
  missions.forEach(mission => mission.label = `${mission.code} [${mission.status}]`);

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
                  <Outlet />
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
