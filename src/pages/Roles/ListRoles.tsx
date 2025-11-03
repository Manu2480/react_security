import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import GenericTable from "../../components/Table/GenericTable";
import { roleService } from "../../services/roleService";
import { useLibreria } from "../../context/LibreriaContext";

const ListRoles: React.FC = () => {
  const [roles, setRoles] = useState<any[]>([]);
  const navigate = useNavigate();
  const { libreria } = useLibreria();
  const didFetch = useRef(false);

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await roleService.getRoles();
      console.log("📦 Roles obtenidos desde API:", data);
      setRoles(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching roles:", error);
      Swal.fire("Error", "No fue posible obtener los roles", "error");
    }
  };

  const handleAction = async (action: string, item: any) => {
    if (action === "edit") navigate(`/roles/update/${item.id}`);
    else if (action === "delete") await deleteRole(item);
  };

  const deleteRole = async (item: any) => {
    const confirm = await Swal.fire({
      title: "¿Eliminar rol?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No",
    });

    if (!confirm.isConfirmed) return;

    try {
      await roleService.deleteRole(item.id);
      await Swal.fire("Eliminado", "El rol ha sido eliminado", "success");
      fetchData();
    } catch (error) {
      console.error("Error eliminando rol:", error);
      Swal.fire("Error", "No fue posible eliminar el rol", "error");
    }
  };

  const renderBotonCrear = () => {
    const onCrear = () => navigate("/roles/create");

    if (libreria === "bootstrap") {
      return (
        <button type="button" className="btn btn-primary" onClick={onCrear}>
          + Crear Rol
        </button>
      );
    }

    if (libreria === "ui") {
      return (
        <button
          type="button"
          onClick={onCrear}
          style={{
            backgroundColor: "#1976d2",
            color: "white",
            padding: "10px 18px",
            borderRadius: 8,
            border: "none",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          + Crear Rol
        </button>
      );
    }

    return (
      <button
        type="button"
        onClick={onCrear}
        className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary py-3 px-6 text-white hover:bg-opacity-90"
      >
        + Crear Rol
      </button>
    );
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="rounded-sm border border-stroke bg-white shadow-default p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xl font-semibold text-black dark:text-white">Listado de Roles</h4>
          {renderBotonCrear()}
        </div>

        <GenericTable
          data={roles}
          columns={roles.length ? Object.keys(roles[0]) : ["id", "name"]}
          actions={[
            { name: "edit", label: "Editar" },
            { name: "delete", label: "Eliminar" },
          ]}
          onAction={handleAction}
        />
      </div>
    </div>
  );
};

export default ListRoles;
