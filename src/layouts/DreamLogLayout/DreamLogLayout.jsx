import './DreamLogLayout.css';
import { Outlet } from 'react-router-dom';
import dreamLogs from '../../data/dream-logs.json';
import Footer from '../../components/Footer';
import { DesktopLinks } from '../../components/PageLinks';

export default function DreamLogLayout() {

  dreamLogs.forEach(dreamLog => dreamLog.label = `${dreamLog.code} [${dreamLog.timestamp}]`);

  return (
    <div className="dream-log-layout page-container">
      <div className="dream-log-layout table-container">
        <table className="dream-log-layout">
          <tbody>
            <tr>
              <td className="desktop fit-width">
                <DesktopLinks data={dreamLogs} />
              </td>
              <td>
                <div className="page-content">
                  <Outlet />
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
