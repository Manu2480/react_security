import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import GenericTable from "../../components/Table/GenericTable";
import { userService } from "../../services/userService";
import { useLibreria } from "../../context/LibreriaContext";

const ListUsers: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const navigate = useNavigate();
  const { libreria } = useLibreria();
  const didFetch = useRef(false);

  // Cargar usuarios solo una vez
  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;
    fetchData();
  }, []);

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

  // Acciones de tabla
  const handleAction = async (action: string, item: any) => {
    if (action === "edit") navigate(`/users/update/${item.id}`);
    if (action === "delete") await deleteUser(item);
    if (action === "address") navigate(`/addresses/list/${item.id}`);
    if (action === "password") navigate(`/passwords/list/${item.id}`);
  };

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
      fetchData();
    } catch (error: any) {
      Swal.fire("Error", "No fue posible eliminar el usuario.", "error");
    }
  };

  // Renderizado del botón de creación
  const renderBotonCrear = () => {
    const onCrear = () => navigate("/users/create");

    return (
      <button
        onClick={onCrear}
        className="bg-primary text-white rounded-md px-4 py-2 hover:bg-opacity-90"
      >
        + Crear Usuario
      </button>
    );
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Listado de Usuarios</h2>
        {renderBotonCrear()}
      </div>

      <GenericTable
        data={users}
        actions={[
          { name: "edit", label: "Editar" },
          { name: "delete", label: "Eliminar" },
          { name: "address", label: "Direcciones" },
          { name: "password", label: "Contraseñas" },
        ]}
        onAction={handleAction}
      />
    </div>
  );
};

export default ListUsers;
