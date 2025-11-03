import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../images/logo/logo-icon.svg';
import DropdownUser from '../DropdownUser';
import { useLibreria } from '../../context/LibreriaContext';

interface HeaderUIProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
  userName?: string; // 👈 NUEVO
}

const HeaderUI: React.FC<HeaderUIProps> = ({ sidebarOpen, setSidebarOpen, userName }) => {
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
    <header
      style={{
        background: '#ffffff',
        color: '#111827',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
        boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        width: '100%',
      }}
      className="dark:bg-[#1a1a1a] dark:text-white dark:border-strokedark"
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 16px',
        }}
      >
        {/* IZQUIERDA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit',
              gap: 8,
            }}
          >
            <img src={Logo} alt="Logo" style={{ height: 28 }} />
            <span style={{ fontWeight: 600, fontSize: 16 }}>{titulo}</span>
          </Link>
        </div>

        {/* CENTRO */}
        <div style={{ display: 'flex', gap: 8 }}>
          {opciones.map((opt) => {
            const activo = libreria === opt.key;
            return (
              <button
                key={opt.key}
                onClick={() => setLibreria(opt.key)}
                style={{
                  background: activo ? '#2563eb' : '#ffffff',
                  border: activo
                    ? '1px solid #2563eb'
                    : '1px solid rgba(0,0,0,0.15)',
                  color: activo ? '#ffffff' : '#111827',
                  padding: '4px 10px',
                  borderRadius: 6,
                  cursor: 'pointer',
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* DERECHA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontWeight: 500, fontSize: 14 }}> {userName}</span>
          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default HeaderUI;
