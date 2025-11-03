// src/pages/users/ListUsers.tsx
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import GenericTable from "../../components/Table/GenericTable";
import { userService } from "../../services/userService";
import { useLibreria } from "../../context/LibreriaContext";

/**
 * Page: ListUsers
 * ---------------------------------------------------------------
 * Esta pagina muestra el listado de usuarios obtenidos desde el backend
 * y permite ejecutar distintas acciones sobre cada usuario:
 * - Ver perfil
 * - Editar información
 * - Eliminar usuario
 * - Gestionar direcciones
 * - Gestionar contraseñas
 * - (Acciones futuras: firma digital, dispositivos, sesiones, etc.)
 */
const ListUsers: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const navigate = useNavigate();
  const { libreria } = useLibreria();
  const didFetch = useRef(false);

  /**
   * Efecto inicial: carga los usuarios una sola vez al montar el componente.
   */
  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;
    fetchData();
  }, []);

  /**
   * Obtiene los usuarios desde la API y los guarda en estado.
   */
  const fetchData = async () => {
    try {
      const data = await userService.getUsers();
      console.log("Usuarios obtenidos desde API:", data);
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching users:", error);
      Swal.fire("Error", "No fue posible obtener usuarios.", "error");
    }
  };

  /**
   * Maneja las distintas acciones disponibles en la tabla.
   * Cada acción se define por nombre en el arreglo `actions` del GenericTable.
   */
  const handleAction = async (action: string, item: any) => {
    switch (action) {
      case "view":
        // Ver detalles del usuario (solo visualización)
        navigate(`/users/view/${item.id}`);
        break;

      case "edit":
        // Editar usuario existente
        navigate(`/users/update/${item.id}`);
        break;

      case "delete":
        // Eliminar usuario con confirmación
        await deleteUser(item);
        break;

      case "address":
        // Aquí va tu implementación: gestionar direcciones del usuario
        // TODO: Crear vista y lógica de direcciones
        navigate(`/users/${item.id}/address`);
        break;

      case "password":
        // Aquí va tu implementación: cambiar o gestionar contraseña
        // TODO: Crear vista para actualización de contraseñas
        navigate(`/users/${item.id}/password`);
        break;

      default:
        console.warn(`Acción no reconocida: ${action}`);
        break;
    }
  };

  /**
   * Elimina un usuario tras confirmación con SweetAlert.
   */
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
      Swal.fire("✅ Eliminado", "Usuario eliminado correctamente", "success");
      fetchData();
    } catch (error: any) {
      console.error("❌ Error eliminando usuario:", error);
      Swal.fire("Error", "No fue posible eliminar el usuario.", "error");
    }
  };

  /**
   * Renderiza el botón para crear un nuevo usuario,
   * adaptándose a la librería UI seleccionada.
   */
  const renderBotonCrear = () => {
    const onCrear = () => navigate("/users/create");

    if (libreria === "bootstrap") {
      return (
        <button className="btn btn-primary" onClick={onCrear}>
          + Crear Usuario
        </button>
      );
    }
    if (libreria === "ui") {
      return (
        <button
          onClick={onCrear}
          style={{
            backgroundColor: "#1976d2",
            color: "white",
            padding: "8px 16px",
            borderRadius: 6,
            border: "none",
          }}
        >
          + Crear Usuario
        </button>
      );
    }
    // Por defecto, estilo tailwind
    return (
      <button
        onClick={onCrear}
        className="bg-primary text-white rounded-md px-4 py-2 hover:bg-opacity-90"
      >
        + Crear Usuario
      </button>
    );
  };

  /**
   * 🧾 Render principal: título + botón crear + tabla genérica.
   */
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Listado de Usuarios</h2>
        {renderBotonCrear()}
      </div>

      <GenericTable
        data={users}
        actions={[
          { name: "view", label: "Ver" },
          { name: "edit", label: "Editar" },
          { name: "delete", label: "Eliminar" },
          { name: "address", label: "Direcciones" }, 
          { name: "password", label: "Contraseña" },
        ]}
        onAction={handleAction}
      />
    </div>
  );
};

export default ListUsers;
