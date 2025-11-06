import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import GenericTable from "../../components/Table/GenericTable";
import { permissionService } from "../../services/permissionService";
import { useLibreria } from "../../context/LibreriaContext";

const ListPermissions: React.FC = () => {
  const [permissions, setPermissions] = useState<any[]>([]);
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
      const data = await permissionService.getPermissions();
      console.log("📦 Permisos obtenidos desde API:", data);
      setPermissions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error obteniendo permisos:", error);
      Swal.fire("Error", "No fue posible obtener los permisos", "error");
    }
  };

  const handleAction = async (action: string, item: any) => {
    if (action === "edit") {
      navigate(`/permissions/update/${item.id}`);
    } else if (action === "delete") {
      await deletePermission(item);
    }
  };

  const deletePermission = async (item: any) => {
    const result = await Swal.fire({
      title: "Eliminación",
      text: "¿Está seguro de eliminar este permiso?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No",
    });

    if (!result.isConfirmed) return;

    try {
      await permissionService.deletePermission(item.id);
      await Swal.fire({
        title: "Eliminado",
        text: "El permiso ha sido eliminado correctamente",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      fetchData();
    } catch (err: any) {
      console.error("Error eliminando permiso:", err);
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.detail ||
        err?.message ||
        "Error al eliminar permiso";
      Swal.fire("Error", message, "error");
    }
  };

  const renderBotonCrear = () => {
    const onCrear = () => navigate("/permissions/create");

    if (libreria === "bootstrap") {
      return (
        <button type="button" className="btn btn-primary" onClick={onCrear}>
          <span className="me-2">+</span> Crear Permiso
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
          <span style={{ marginRight: 8 }}>+</span> Crear Permiso
        </button>
      );
    }

    // Tailwind
    return (
      <button
        type="button"
        onClick={onCrear}
        className="![background-color:rgb(79,70,229)] ![color:white] !rounded-md !px-4 !py-2 ![box-shadow:0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_0_rgba(0,0,0,0.06)] hover:![background-color:rgb(67,56,202)] active:![background-color:rgb(55,48,163)] !font-medium !transition-all !duration-150 hover:![transform:translateY(-1px)] active:![transform:translateY(0)] focus:!outline-none focus:![box-shadow:0_0_0_2px_rgba(99,102,241,0.25)]"
      >
        <span className="![display:inline-flex] ![align-items:center] ![gap:0.5rem] ![color:white]">
          <svg
            className="![width:20px] ![height:20px] ![fill:white]"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm5 11h-4v4H9v-4H5V9h4V5h2v4h4v2z"/>
          </svg>
          Crear Permiso
        </span>
      </button>
    );
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between items-center">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Permissions
          </h4>
          {renderBotonCrear()}
        </div>

        <GenericTable
          data={permissions}
          columns={["id", "url", "method"]}
          actions={[
            { name: "edit", label: "Update" },
            { name: "delete", label: "Delete" },
          ]}
          onAction={handleAction}
        />
      </div>
    </div>
  );
};

export default ListPermissions;
