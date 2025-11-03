import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // 👈 ahora usamos el AuthContext
import UserOne from "../images/user/user-01.png";

const DropdownUser = () => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  const displayName = user?.displayName || user?.email || "Usuario";
  const photoURL = user?.photoURL || UserOne;

  // cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // cerrar si se presiona ESC
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const handleLogout = async () => {
    await logout();
    navigate("/auth/signin");
  };

  return (
    <div className="relative">
      <button
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-3"
      >
        {/* Información del usuario */}
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {displayName}
          </span>
        </span>

        {/* Imagen de perfil */}
        <span className="h-10 w-10 rounded-full overflow-hidden">
          <img
            src={photoURL}
            alt="User"
            className="object-cover h-full w-full border border-gray-300 dark:border-strokedark"
          />
        </span>

        {/* Icono flecha */}
        <svg
          className={`hidden fill-current sm:block transition-transform duration-200 ${
            dropdownOpen ? "rotate-180" : ""
          }`}
          width="12"
          height="8"
          viewBox="0 0 12 8"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
            fill="currentColor"
          />
        </svg>
      </button>

      {/* Dropdown */}
      <div
        ref={dropdown}
        className={`absolute right-0 mt-4 w-56 flex-col rounded-md border border-stroke bg-white shadow-md dark:border-strokedark dark:bg-boxdark transition-all duration-150 ${
          dropdownOpen ? "flex" : "hidden"
        }`}
      >
        <ul className="flex flex-col border-b border-stroke px-5 py-4 dark:border-strokedark">
          <li>
            <Link
              to="/profile"
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-primary dark:text-white duration-200"
            >
              <i className="bi bi-person" /> Mi Perfil
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-primary dark:text-white duration-200"
            >
              <i className="bi bi-gear" /> Configuración
            </Link>
          </li>
        </ul>

        <button
          onClick={handleLogout}
          className="w-full text-left flex items-center gap-2 px-5 py-3 text-sm font-medium text-red-600 hover:bg-gray-100 dark:hover:bg-strokedark"
        >
          <i className="bi bi-box-arrow-right" /> Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default DropdownUser;
