import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import GenericTable from "../../components/Table/GenericTable";
import { addressService } from "../../services/addressService";
import { useLibreria } from "../../context/LibreriaContext";
import Breadcrumb from "../../components/Breadcrumb";

const ListAddress: React.FC = () => {
  const [addresses, setAddresses] = useState<any[]>([]);
  const navigate = useNavigate();
  const { userId } = useParams(); // El ID del usuario viene desde la URL
  const { libreria } = useLibreria();
  const didFetch = useRef(false);

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await addressService.getAddressesByUser(Number(userId));
      setAddresses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al obtener direcciones:", error);
      Swal.fire("Error", "No fue posible obtener direcciones.", "error");
    }
  };

  const handleAction = async (action: string, item: any) => {
    if (action === "edit") navigate(`/address/update/${item.id}`);
    if (action === "delete") await deleteAddress(item);
  };

  const deleteAddress = async (item: any) => {
    const result = await Swal.fire({
      title: "Eliminación",
      text: "¿Está seguro de eliminar esta dirección?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No",
    });

    if (!result.isConfirmed) return;

    try {
      await addressService.deleteAddress(item.id);
      Swal.fire("Eliminado", "Dirección eliminada correctamente", "success");
      fetchData();
    } catch (error) {
      Swal.fire("Error", "No fue posible eliminar la dirección.", "error");
    }
  };

  const renderBotonCrear = () => {
    const onCrear = () => navigate(`/address/create/${userId}`);

    if (libreria === "bootstrap") {
      return (
        <button className="btn btn-primary" onClick={onCrear}>
          + Crear Dirección
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
          + Crear Dirección
        </button>
      );
    }
    return (
      <button
        onClick={onCrear}
        className="bg-primary text-white rounded-md px-4 py-2 hover:bg-opacity-90"
      >
        + Crear Dirección
      </button>
    );
  };

  return (
    <div className="p-4">
      <Breadcrumb pageName="Direcciones del Usuario" />

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Listado de Direcciones</h2>
        {renderBotonCrear()}
      </div>

      <GenericTable
        data={addresses}
        actions={[
          { name: "edit", label: "Editar" },
          { name: "delete", label: "Eliminar" },
        ]}
        onAction={handleAction}
      />
    </div>
  );
};

export default ListAddress;
