'use client'
import './MissionLayout.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import missions from '/public/data/missions.json';
import Footer from '/app/_components/Footer';

export default function MissionLayout({ children }) {

  const pathname = usePathname();

  const isActive = function(index) {
    return pathname && pathname.endsWith(`/${index}`);
  }

  return (
    <div className="mission-layout page-container">
      <div className="mission-layout table-container">
        <table className="mission-layout">
          <tbody>
            <tr>
              <td className="desktop fit-width">
                <div className="left-menu">
                  <div className="menu-group">
                    {
                      missions.map((mission, index) =>
                        <Link href={`${index}`} className={`menu-group-item ${isActive(index) ? 'active' : ''}`} key={index}>
                          &gt; {mission.code} [{mission.status}]
                        </Link>
                      )
                    }
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
