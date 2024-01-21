import './DreamLogLayout.css';
import { Outlet } from 'react-router-dom';
import dreamLogsJson from '@data/dream-logs';
import Footer from '@components/Footer';
import { DesktopLinks } from '@components/PageLinks';
import { DreamLog } from '@types';

export default function DreamLogLayout() {

  const dreamLogs: DreamLog[] = dreamLogsJson;
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
                <div className="scrollable page-content">
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
