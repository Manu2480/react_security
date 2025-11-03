import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // 👈 nuevo
import { useLibreria } from '../../context/LibreriaContext';

// Variantes
import SidebarTailwind from './SidebarTailwind';
import SidebarBootstrap from './SidebarBootstrap';
import SidebarUI from './SidebarUI';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { user } = useAuth(); // 👈 ahora usamos el contexto global
  const { pathname } = useLocation();
  const { libreria } = useLibreria();

  const triggerRef = useRef<any>(null);
  const sidebarRef = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  useEffect(() => {
    const handler = ({ target }: MouseEvent) => {
      if (!sidebarRef.current || !triggerRef.current) return;
      if (!sidebarOpen) return;
      if (sidebarRef.current.contains(target) || triggerRef.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [sidebarOpen, setSidebarOpen]);

  useEffect(() => {
    const onKey = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [sidebarOpen, setSidebarOpen]);

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) document.body.classList.add('sidebar-expanded');
    else document.body.classList.remove('sidebar-expanded');
  }, [sidebarExpanded]);

  // 🚫 Si no hay usuario, no mostrar sidebar
  if (!user) return null;

  if (libreria === 'bootstrap') {
    return (
      <SidebarBootstrap
        sidebarRef={sidebarRef}
        triggerRef={triggerRef}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        pathname={pathname}
      />
    );
  }

  if (libreria === 'ui') {
    return (
      <SidebarUI
        sidebarRef={sidebarRef}
        triggerRef={triggerRef}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        pathname={pathname}
      />
    );
  }

  return (
    <SidebarTailwind
      sidebarRef={sidebarRef}
      triggerRef={triggerRef}
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      pathname={pathname}
      sidebarExpanded={sidebarExpanded}
      setSidebarExpanded={setSidebarExpanded}
    />
  );
};

export default Sidebar;
