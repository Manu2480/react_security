import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import GenericTable from "../../components/Table/GenericTable";
import { addressService } from "../../services/addressService";
import { Address } from "../../models/Address";
import Breadcrumb from "../../components/Breadcrumb";

const ListAddress: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [userId]);

  const fetchData = async () => {
    if (!userId) return;

    try {
      const response = await addressService.getAddressesByUser(Number(userId));

      if (Array.isArray(response)) {
        setAddresses(response);
      } else if (response && typeof response === "object") {
        // Si devuelve un solo objeto, lo convertimos a array
        setAddresses([response]);
      } else {
        setAddresses([]);
        console.log(`El usuario ${userId} no tiene direcciones.`);
      }
    } catch (error: any) {
      if (error?.response?.status === 404) {
        console.log(`El usuario ${userId} no tiene direcciones.`);
        setAddresses([]);
      } else {
        console.error("Error al obtener direcciones:", error);
        Swal.fire("Error", "No fue posible obtener las direcciones.", "error");
      }
    }
  };

  const handleAction = async (action: string, item: Address) => {
    switch (action) {
      case "edit":
        navigate(`/addresses/update/${item.id}`);
        break;
      case "delete":
        await deleteAddress(item);
        break;
    }
  };

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
      await addressService.deleteAddress(item.id);
      Swal.fire("Eliminado", "Dirección eliminada correctamente", "success");
      fetchData();
    } catch (error: any) {
      Swal.fire("Error", "No fue posible eliminar la dirección.", "error");
    }
  };

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
      <Breadcrumb pageName="Direcciones" />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          Direcciones del usuario {userId}
        </h2>
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
