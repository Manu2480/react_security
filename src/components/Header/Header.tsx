import React from 'react';
import { useLibreria } from '../../context/LibreriaContext';
import { useAuth } from '../../context/AuthContext';

// Variantes visuales
import HeaderTailwind from './HeaderTailwind';
import HeaderBootstrap from './HeaderBootstrap';
import HeaderUI from './HeaderUI';

// 🧩 Interfaz para props
interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

// ✅ Componente principal Header
const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { libreria } = useLibreria();
  const { user } = useAuth();

  // 🚫 Si no hay usuario autenticado, no mostrar el header
  if (!user) return null;

  // 🧠 Obtener nombre del usuario desde Firebase
  const displayName = user?.displayName || user?.email || 'Usuario';

  // 🔀 Renderizar la variante según la librería seleccionada
  switch (libreria) {
    case 'bootstrap':
      return (
        <HeaderBootstrap
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}

        />
      );

    case 'ui':
      return (
        <HeaderUI
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}

        />
      );

    default:
      return (
        <HeaderTailwind
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
   
        />
      );
  }
};

export default Header;
