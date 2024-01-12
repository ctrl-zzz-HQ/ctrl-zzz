import './NavLayout.css';
import { Outlet, Link } from 'react-router-dom';

export default function NavLayout() {

  return (
    <div className="d-flex flex-row nav-layout page-container">
      <div className="left-menu">
        <div className="menu-group">
          <span className="menu-group-header">MISSIONS</span>
          <Link to="/" className="menu-group-item">Mission I</Link>
        </div>
        <div className="menu-group">
          <span className="menu-group-header">AGENTS</span>
          <Link to="/" className="menu-group-item">I (codename: xxx)</Link>
          <Link to="/" className="menu-group-item">II (codename: xxx)</Link>
          <Link to="/" className="menu-group-item">III (codename: xxx)</Link>
        </div>
        <div className="menu-group">
          <span className="menu-group-header">TARGETS</span>
          <Link to="/" className="menu-group-item">I (codename: xxx)</Link>
          <Link to="/" className="menu-group-item">II (codename: xxx)</Link>
          <Link to="/" className="menu-group-item">III (codename: xxx)</Link>
        </div>
        <div className="menu-group">
          <Link to="/" className="menu-group-header">DREAM LOG</Link>
        </div>
      </div>
      <div className="page-content">
        <Outlet />
      </div>
    </div>
  );
}
