import './DreamLogLayout.css';
import dreamLogs from '/public/data/dream-logs.json';
import Footer from '/app/_components/Footer';
import { DesktopLinks } from '/app/_components/PageLinks';

export default function DreamLogLayout({ children }) {

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
