import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import GenericTable from "../../components/Table/GenericTable";
import { addressService } from "../../services/addressService";
import { Address } from "../../models/Address";

const ListAddress: React.FC = () => {
  const { userId } = useParams<{ userId: string }>(); // id del usuario desde la URL
  const [addresses, setAddresses] = useState<Address[]>([]);
  const navigate = useNavigate();

  // Cargar direcciones cuando se monta el componente
  useEffect(() => {
    if (userId) fetchData(Number(userId));
  }, [userId]);

  const fetchData = async (id: number) => {
    try {
      const data = await addressService.getAddressesByUser(id);
      if (Array.isArray(data)) {
        setAddresses(data);
        console.log("Direcciones obtenidas:", data);
      } else {
        setAddresses([]);
      }
    } catch (error: any) {
      // Si el backend devuelve 404, significa que no hay direcciones para ese usuario
      if (error.response?.status === 404) {
        console.log(`El usuario ${id} no tiene direcciones registradas.`);
        setAddresses([]);
      } else {
        console.error("Error al obtener direcciones:", error);
        Swal.fire("Error", "No fue posible obtener direcciones.", "error");
      }
    }
  };

  // Acciones desde la tabla
  const handleAction = async (action: string, item: Address) => {
    if (action === "edit") navigate(`/addresses/update/${item.id}`);
    if (action === "delete") await deleteAddress(item);
  };

  // Eliminar dirección
  const deleteAddress = async (item: Address) => {
    const result = await Swal.fire({
      title: "Eliminar dirección",
      text: "¿Está seguro de eliminar esta dirección?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No",
    });

    if (!result.isConfirmed) return;

    try {
      await addressService.deleteAddress(item.id!);
      Swal.fire("Eliminado", "Dirección eliminada correctamente.", "success");
      if (userId) fetchData(Number(userId));
    } catch {
      Swal.fire("Error", "No fue posible eliminar la dirección.", "error");
    }
  };

  // Botón para crear nueva dirección
  const renderBotonCrear = () => {
    const onCrear = () => navigate(`/addresses/create/${userId}`);

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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Direcciones del Usuario {userId}</h2>
        {renderBotonCrear()}
      </div>

      {addresses.length === 0 ? (
        <div className="text-gray-500 italic">No hay direcciones registradas para este usuario.</div>
      ) : (
        <GenericTable
          data={addresses}
          actions={[
            { name: "edit", label: "Editar" },
            { name: "delete", label: "Eliminar" },
          ]}
          onAction={handleAction}
        />
      )}
    </div>
  );
};

export default ListAddress;
