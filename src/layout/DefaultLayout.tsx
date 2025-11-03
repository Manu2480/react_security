// Importamos useState, un hook que permite manejar estados locales en componentes funcionales.
import { useState } from 'react';

// Importamos los componentes principales del layout: el encabezado y el menú lateral.
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';

// Importamos Outlet desde react-router-dom.
// Outlet actúa como un “espacio reservado” donde se renderizan las páginas hijas (como Usuarios, Dashboard, etc.)
import { Outlet } from 'react-router-dom';

// Importamos la tienda global de Redux, que manejará el estado global de la aplicación.
import { store } from '../store/store';

// Importamos el Provider de Redux.
// Provider envuelve la aplicación y permite que cualquier componente acceda al estado global.
import { Provider } from 'react-redux';

// ===========================================================
// COMPONENTE PRINCIPAL: DefaultLayout
// Este componente define la estructura base de toda la aplicación.
// Incluye el menú lateral (Sidebar), el encabezado (Header) y el espacio
// donde se cargan las páginas según la ruta actual (Outlet).
// ===========================================================

const DefaultLayout = () => {
  // Estado local que controla si el Sidebar está abierto o cerrado.
  // Inicialmente está cerrado (false).
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    // Provider de Redux:
    // Envuelve todo el layout para que los componentes dentro puedan usar el store global.
    <Provider store={store}>
      
      {/* 
        Contenedor general del layout.
        Se aplican clases de Tailwind para el modo oscuro y los estilos base.
      */}
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        
        {/* ===== Inicio del contenedor principal de la página ===== */}
        <div className="flex h-screen overflow-hidden">
          
          {/* 
            ===== Sidebar (menú lateral) =====
            Se renderiza a la izquierda y recibe el estado para abrir/cerrar.
          */}
          <Sidebar 
            sidebarOpen={sidebarOpen} 
            setSidebarOpen={setSidebarOpen} 
          />
          {/* ===== Fin del Sidebar ===== */}

          {/* 
            ===== Contenido principal =====
            A la derecha del Sidebar se muestra el resto de la aplicación:
            - El Header (barra superior)
            - El contenido dinámico (Outlet)
          */}
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            
            {/* ===== Header (barra superior) ===== */}
            {/* Recibe el estado del Sidebar para poder controlarlo desde el botón hamburguesa. */}
            <Header 
              sidebarOpen={sidebarOpen} 
              setSidebarOpen={setSidebarOpen} 
            />
            {/* ===== Fin del Header ===== */}

            {/* 
              ===== Contenido dinámico =====
              Aquí se cargan las páginas según la ruta actual (usuarios, roles, etc.).
              Outlet actúa como un “placeholder” que React Router reemplaza con la vista activa.
            */}
            <main>
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                <Outlet />
              </div>
            </main>
            {/* ===== Fin del contenido dinámico ===== */}
          
          </div>
          {/* ===== Fin del área principal ===== */}
        
        </div>
        {/* ===== Fin del contenedor general ===== */}
      
      </div>
      {/* ===== Fin del Provider ===== */}
    </Provider>
  );
};

// Exportamos el componente para poder usarlo dentro del archivo App.tsx
export default DefaultLayout;
