import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../images/logo/logo-icon.svg';
import DropdownUser from '../DropdownUser';
import { useLibreria } from '../../context/LibreriaContext';

const HeaderTailwind = ({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}) => {
  const { libreria, setLibreria } = useLibreria();

  const opciones = [
    { key: 'tailwind', label: 'Tailwind' },
    { key: 'bootstrap', label: 'Bootstrap' },
    { key: 'ui', label: 'UI' },
  ] as const;

  const titulo =
    libreria === 'bootstrap'
      ? 'Sistema de Seguridad (Bootstrap)'
      : libreria === 'ui'
      ? 'Sistema de Seguridad (UI)'
      : 'Sistema de Seguridad (Tailwind)';

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md dark:bg-boxdark dark:shadow-none">
      <div className="mx-4 md:mx-6 lg:mx-8">
        <div className="flex items-center justify-between py-3">

          {/* IZQUIERDA: Solo Logo */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              aria-controls="sidebar"
              onClick={(e) => {
                e.stopPropagation();
                setSidebarOpen(!sidebarOpen);
              }}
              className="lg:hidden rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <Link to="/" className="flex items-center gap-2">
              <img src={Logo} alt="Logo" className="h-8 w-8 flex-shrink-0" />
              {/* 🔹 Se elimina el nombre de proyecto o texto adicional */}
            </Link>
          </div>

          {/* CENTRO: Botones de librería */}
          <div className="flex-1 flex items-center justify-center px-2">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {opciones.map((opt) => {
                const activo = libreria === opt.key;
                return (
                  <button
                    key={opt.key}
                    onClick={() => setLibreria(opt.key)}
                    className={`px-3 py-1 text-sm rounded-md border transition-all duration-150 whitespace-nowrap ${
                      activo
                        ? 'bg-primary text-white border-primary shadow-sm'
                        : 'bg-white border-gray-300 text-black hover:bg-gray-100 dark:bg-boxdark dark:text-white dark:border-strokedark'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* DERECHA: Usuario */}
          <div className="flex items-center gap-3 min-w-0">
            <DropdownUser />
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderTailwind;
