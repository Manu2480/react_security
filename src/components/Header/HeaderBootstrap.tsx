import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../images/logo/logo-icon.svg';
import DropdownUser from '../DropdownUser';
import { useLibreria } from '../../context/LibreriaContext';

const HeaderBootstrap = ({
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

  return (
    <header className="position-sticky top-0 z-3 w-100 bg-light border-bottom shadow-sm">
      <div className="container-fluid py-2 px-3 d-flex align-items-center justify-content-between">
        {/* IZQUIERDA: Solo Logo */}
        <div className="d-flex align-items-center gap-2">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="btn btn-outline-secondary d-lg-none p-1"
          >
            <i className="bi bi-list"></i>
          </button>
          <Link to="/" className="d-flex align-items-center text-decoration-none text-dark">
            <img src={Logo} alt="Logo" style={{ height: 32 }} className="me-2" />
          </Link>
        </div>

        {/* CENTRO: Botones de librería */}
        <div className="d-none d-md-flex gap-2">
          {opciones.map((opt) => {
            const activo = libreria === opt.key;
            return (
              <button
                key={opt.key}
                onClick={() => setLibreria(opt.key)}
                className={`btn btn-sm ${activo ? 'btn-primary' : 'btn-outline-secondary'}`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* DERECHA: Usuario */}
        <DropdownUser />
      </div>
    </header>
  );
};

export default HeaderBootstrap;
