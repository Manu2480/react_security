import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Breadcrumb from "../../components/Breadcrumb";
import GenericForm from "../../components/Form/GenericForm";
import { addressService } from "../../services/addressService";
import { Address } from "../../models/Address";

/**
 * Página: Crear dirección para un usuario
 * - Un usuario solo puede tener una dirección
 * - Si ya tiene una, muestra aviso y redirige al listado
 */
const CreateAddress: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [template, setTemplate] = useState<Partial<Address> | null>(null);
  const navigate = useNavigate();

  // Estructura base del formulario
  useEffect(() => {
    setTemplate({
      street: "",
      number: "",
      latitude: 0,
      longitude: 0,
    });
  }, []);

  const handleCreate = async (values: any) => {
    try {
      if (!userId) {
        Swal.fire("Error", "No se encontró el usuario asociado.", "error");
        return;
      }

      const payload = {
        ...values,
        latitude: Number(values.latitude),
        longitude: Number(values.longitude),
      };

      await addressService.createAddress(Number(userId), payload);

      await Swal.fire({
        title: "Éxito",
        text: "Dirección creada correctamente.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate(`/addresses/list/${userId}`);
    } catch (error: any) {
      console.error("Error creando dirección:", error);

      const message =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        error?.message ||
        "No fue posible crear la dirección.";

      // Si ya existe una dirección para el usuario
      if (message.includes("User already has an address")) {
        await Swal.fire({
          title: "Aviso",
          text: "Este usuario ya tiene una dirección registrada.",
          icon: "info",
          confirmButtonText: "Volver al listado",
        });
        navigate(`/addresses/list/${userId}`);
        return;
      }

      Swal.fire("Error", message, "error");
    }
  };

  if (!template) return <div>Cargando formulario...</div>;

  return (
    <div>
      <Breadcrumb pageName="Crear Dirección" />
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Nueva Dirección</h2>
        <GenericForm mode={1} data={template} handleCreate={handleCreate} />
      </div>
    </div>
  );
};

export default CreateAddress;
