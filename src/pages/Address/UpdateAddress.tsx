import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import GenericForm from "../../components/Form/GenericForm";
import { addressService } from "../../services/addressService";

/**
 * Página para actualizar una dirección existente.
 * Muestra los datos actuales obtenidos del backend
 * y permite modificarlos usando el formulario genérico.
 */
const UpdateAddress: React.FC = () => {
  const [addressData, setAddressData] = useState<any | null>(null);
  const navigate = useNavigate();
  const { id, userId } = useParams<{ id: string; userId: string }>();

  /**
   * Carga los datos de la dirección actual para prellenar el formulario.
   */
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        if (!id) throw new Error("No se encontró el ID de la dirección.");

        const data = await addressService.getAddressById(Number(id));
        if (data) {
          setAddressData({
            street: data.street ?? "",
            number: data.number ?? "",
            latitude: data.latitude ?? 0,
            longitude: data.longitude ?? 0,
          });
        } else {
          Swal.fire("Error", "No se encontró la dirección especificada.", "error");
          navigate(`/addresses/list/${userId}`);
        }
      } catch (error: any) {
        console.error("Error cargando dirección:", error);
        Swal.fire("Error", "No fue posible obtener la dirección.", "error");
        navigate(`/addresses/list/${userId}`);
      }
    };

    fetchAddress();
  }, [id, userId, navigate]);

  /**
   * Envía los cambios al backend.
   */
  const handleUpdate = async (values: any) => {
    try {
      if (!id) throw new Error("No se encontró el ID de la dirección.");

      // Asegurar tipos numéricos correctos
      const payload = {
        ...values,
        latitude: Number(values.latitude),
        longitude: Number(values.longitude),
      };

      await addressService.updateAddress(Number(id), payload);

      await Swal.fire({
        title: "Éxito",
        text: "Dirección actualizada correctamente",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      // Redirigir al listado de direcciones del usuario
      navigate(`/addresses/list/${userId}`);
    } catch (error: any) {
      console.error("Error actualizando dirección:", error);

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.detail ||
        error?.message ||
        "No fue posible actualizar la dirección.";

      Swal.fire("Error", message, "error");
    }
  };

  if (!addressData) return <div>Cargando dirección...</div>;

  return (
    <div>
      <Breadcrumb pageName="Actualizar Dirección" />
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Editar Dirección</h2>
        <GenericForm mode={2} data={addressData} handleUpdate={handleUpdate} />
      </div>
    </div>
  );
};

export default UpdateAddress;
