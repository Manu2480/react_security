// src/pages/Users/ListUsers.tsx
// -----------------------------------------------------------------------------
// Página que muestra el listado de usuarios en una tabla dinámica.
// Permite realizar acciones como editar, eliminar, ver direcciones,
// cambiar contraseñas, abrir el perfil y ver sesiones activas.
// -----------------------------------------------------------------------------

import React, { useEffect, useState, useRef } from "react";
import ProfileModal from "../Profile/ProfileModal";
import SessionsModal from "./SessionsModal";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import GenericTable from "../../components/Table/GenericTable";
import { userService } from "../../services/userService";

const ListUsers: React.FC = () => {
  // Lista de usuarios cargada desde la API
  const [users, setUsers] = useState<any[]>([]);

  // Controla los modales de perfil y sesiones
  const [selectedUser, setSelectedUser] = useState<{ id: number; name?: string } | null>(null);
  const [selectedSessionsUser, setSelectedSessionsUser] = useState<{ id: number; name?: string } | null>(null);

  // Hook para redirecciones de rutas
  const navigate = useNavigate();

  // Evita que la carga se repita múltiples veces
  const didFetch = useRef(false);

  // ---------------------------------------------------------------------------
  // Carga inicial de datos de usuarios (solo una vez al montar el componente)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;
    fetchData();
  }, []);

  // ---------------------------------------------------------------------------
  // Obtiene la lista de usuarios desde el servicio userService
  // ---------------------------------------------------------------------------
  const fetchData = async () => {
    try {
      const data = await userService.getUsers();
      console.log("Usuarios obtenidos:", data);
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching users:", error);
      Swal.fire("Error", "No fue posible obtener usuarios.", "error");
    }
  };

  // ---------------------------------------------------------------------------
  // Maneja las acciones seleccionadas desde la tabla
  // ---------------------------------------------------------------------------
  const handleAction = async (action: string, item: any) => {
    if (action === "edit") navigate(`/users/update/${item.id}`);
    if (action === "delete") await deleteUser(item);
    if (action === "address") navigate(`/addresses/list/${item.id}`);
    if (action === "password") navigate(`/passwords/list/${item.id}`);
    if (action === "profile") setSelectedUser({ id: item.id, name: item.name });
    if (action === "sessions") setSelectedSessionsUser({ id: item.id, name: item.name });
  };

  // ---------------------------------------------------------------------------
  // Elimina un usuario con confirmación mediante SweetAlert
  // ---------------------------------------------------------------------------
  const deleteUser = async (item: any) => {
    const result = await Swal.fire({
      title: "Eliminación",
      text: "¿Está seguro de querer eliminar el registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No",
    });

    if (!result.isConfirmed) return;

    try {
      await userService.deleteUser(item.id);
      Swal.fire("Eliminado", "Usuario eliminado correctamente", "success");
      fetchData(); // refresca el listado
    } catch (error: any) {
      Swal.fire("Error", "No fue posible eliminar el usuario.", "error");
    }
  };

  // ---------------------------------------------------------------------------
  // Renderiza el botón superior para crear un nuevo usuario
  // ---------------------------------------------------------------------------
  const renderBotonCrear = () => {
    const onCrear = () => navigate("/users/create");

    return (
      <button
        onClick={onCrear}
        className="![background-color:rgb(79,70,229)] ![color:white] !rounded-md !px-4 !py-2 ![box-shadow:0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_0_rgba(0,0,0,0.06)] hover:![background-color:rgb(67,56,202)] active:![background-color:rgb(55,48,163)] !font-medium !transition-all !duration-150 hover:![transform:translateY(-1px)] active:![transform:translateY(0)] focus:!outline-none focus:![box-shadow:0_0_0_2px_rgba(99,102,241,0.25)]"
      >
        <span className="![display:inline-flex] ![align-items:center] ![gap:0.5rem] ![color:white]">
          + Crear Usuario
        </span>
      </button>
    );
  };

  // ---------------------------------------------------------------------------
  // Render principal: tabla de usuarios y modales condicionales
  // ---------------------------------------------------------------------------
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Listado de Usuarios</h2>
        {renderBotonCrear()}
      </div>

      {/* Tabla genérica con acciones dinámicas */}
      <GenericTable
        data={users}
        actions={[
          { name: "edit", label: "Editar" },
          { name: "delete", label: "Eliminar" },
          { name: "address", label: "Direcciones" },
          { name: "password", label: "Contraseñas" },
          { name: "profile", label: "Perfil" },
          { name: "sessions", label: "Sesiones" },
        ]}
        onAction={handleAction}
      />

      {/* Modal de perfil del usuario */}
      {selectedUser && (
        <ProfileModal
          userId={selectedUser.id}
          userName={selectedUser.name}
          onClose={() => setSelectedUser(null)}
          onSaved={() => fetchData()}
        />
      )}

      {/* Modal de sesiones del usuario */}
      {selectedSessionsUser && (
        <SessionsModal
          userId={selectedSessionsUser.id}
          userName={selectedSessionsUser.name}
          onClose={() => setSelectedSessionsUser(null)}
          onChanged={() => fetchData()}
        />
      )}
    </div>
  );
};

export default ListUsers;
