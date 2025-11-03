import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import GenericTable from "../../components/Table/GenericTable";
import { Role } from "../../models/Role";
import { roleService } from "../../services/roleService";

const ListRole: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const res = await roleService.getRoles();
      setRoles(res);
    } catch (error) {
      console.error("Error al obtener roles:", error);
      Swal.fire("Error", "No fue posible cargar los roles.", "error");
    }
  };

  const handleAction = async (action: string, item: Role) => {
    switch (action) {
      case "edit":
        navigate(`/roles/update/${item.id}`);
        break;
      case "delete":
        await deleteRole(item);
        break;
    }
  };

  const deleteRole = async (item: Role) => {
    const result = await Swal.fire({
      title: "Eliminar Rol",
      text: `¿Seguro que deseas eliminar el rol "${item.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      await roleService.deleteRole(item.id);
      Swal.fire("Eliminado", "El rol fue eliminado correctamente", "success");
      fetchRoles();
    } catch (error) {
      Swal.fire("Error", "No fue posible eliminar el rol.", "error");
    }
  };

  // Botón para crear un nuevo rol
  const renderBotonCrear = () => (
    <button
      onClick={() => navigate("/roles/create")}
      className="bg-primary text-white rounded-md px-4 py-2 hover:bg-opacity-90"
    >
      + Crear Rol
    </button>
  );

  // Botón para asignar rol (mismo estilo que crear)
  const renderBotonAsignar = () => (
    <button
      onClick={() => navigate("/userroles/list")}
      className="bg-primary text-white rounded-md px-4 py-2 hover:bg-opacity-90"
    >
      + Asignar Rol
    </button>
  );

  return (
    <div className="p-4">
      <Breadcrumb pageName="Roles" />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Gestión de Roles</h2>
        <div className="flex gap-2">
          {renderBotonCrear()}
          {renderBotonAsignar()}
        </div>
      </div>

      <GenericTable
        data={roles}
        actions={[
          { name: "edit", label: "Editar" },
          { name: "delete", label: "Eliminar" },
        ]}
        onAction={handleAction}
      />
    </div>
  );
};

export default ListRole;
