import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../images/logo/logo.svg';
import { sidebarItems } from './SidebarItems';

interface Props {
  sidebarRef: React.RefObject<any>;
  triggerRef: React.RefObject<any>;
  sidebarOpen: boolean;
  setSidebarOpen: (b: boolean) => void;
  pathname: string;
}

const SidebarBootstrap: React.FC<Props> = ({
  sidebarRef,
  triggerRef,
  sidebarOpen,
  setSidebarOpen,
  pathname,
}) => {
  return (
    <aside
      ref={sidebarRef}
      className={`d-flex flex-column vh-100 ${
        sidebarOpen ? '' : 'd-none d-lg-flex'
      }`}
      style={{ width: 240, background: '#0b0b0b', color: '#fff' }}
    >
      <div
        className="d-flex align-items-center justify-content-between p-3 border-bottom"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <NavLink to="/" className="d-flex align-items-center">
          <img src={Logo} alt="Logo" style={{ height: 32 }} />
        </NavLink>
      </div>

      <nav className="p-2">
        {sidebarItems.map(({ label, path }) => {
          const active = pathname === path || pathname.includes(path.split('/')[1]);
          return (
            <NavLink
              key={path}
              to={path}
              className={`nav-link px-3 ${active ? 'active' : ''}`}
              style={{
                color: active ? '#fff' : 'rgba(255,255,255,0.9)',
                background: active ? 'rgba(255,255,255,0.06)' : 'transparent',
                borderRadius: 6,
                margin: '4px 8px',
              }}
            >
              {label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default SidebarBootstrap;
