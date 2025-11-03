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
  sidebarExpanded?: boolean;
  setSidebarExpanded?: (b: boolean) => void;
}

const SidebarTailwind: React.FC<Props> = ({
  sidebarRef,
  triggerRef,
  sidebarOpen,
  setSidebarOpen,
  pathname,
}) => {
  return (
    <aside
      ref={sidebarRef}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/">
          <img src={Logo} alt="Logo" />
        </NavLink>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <ul className="mb-6 flex flex-col gap-1.5">
            {sidebarItems.map(({ label, path }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname === path || pathname.includes(path.split('/')[1])
                      ? 'bg-graydark dark:bg-meta-4'
                      : ''
                  }`}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default SidebarTailwind;
