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

const SidebarUI: React.FC<Props> = ({
  sidebarRef,
  sidebarOpen,
  pathname,
}) => {
  return (
    <aside
      ref={sidebarRef}
      className={`flex flex-col ${
        sidebarOpen ? '' : '-translate-x-full lg:translate-x-0'
      }`}
      style={{
        width: 240,
        minWidth: 240,
        maxWidth: 300,
        background: '#0b0b0b',
        color: '#ffffff',
        overflow: 'visible',
        transition: 'transform 0.3s ease',
      }}
    >
      <div
        className="flex items-center justify-between p-4 border-b"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <NavLink to="/" className="flex items-center">
          <img src={Logo} alt="Logo" style={{ height: 28 }} />
        </NavLink>
      </div>

      <nav className="p-3" style={{ color: '#fff' }}>
        <ul style={{ paddingLeft: 0, marginBottom: 12, listStyle: 'none' }}>
          {sidebarItems.map(({ label, path }) => {
            // ✅ Condición corregida:
            const active =
              path === '/'
                ? pathname === '/' // solo activo en "/"
                : pathname.startsWith(path);

            return (
              <li key={path}>
                <NavLink
                  to={path}
                  className="block py-2 px-3 rounded transition-all duration-200"
                  style={{
                    color: active ? '#fff' : 'rgba(255,255,255,0.85)',
                    margin: '4px 2px',
                    whiteSpace: 'normal',
                    textDecoration: 'none',
                    background: active
                      ? 'linear-gradient(90deg, #1e293b 0%, #334155 100%)'
                      : 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (!active)
                      (e.currentTarget.style.background =
                        'rgba(255,255,255,0.08)');
                  }}
                  onMouseLeave={(e) => {
                    if (!active)
                      (e.currentTarget.style.background = 'transparent');
                  }}
                >
                  {label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default SidebarUI;
