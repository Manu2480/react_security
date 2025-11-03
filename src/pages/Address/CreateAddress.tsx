import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import GenericForm from "../../components/Form/GenericForm";
import { addressService } from "../../services/addressService";

/**
 * Página para crear una nueva dirección asociada a un usuario.
 * Usa el formulario genérico para mantener compatibilidad visual
 * con las diferentes librerías (Bootstrap, Material UI, Tailwind, etc.).
 */
const CreateAddress: React.FC = () => {
  const [template, setTemplate] = useState<any | null>(null);
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();

  // Crea una estructura base para el formulario
  useEffect(() => {
    setTemplate({
      street: "",
      number: "",
      latitude: 0,
      longitude: 0,
    });
  }, []);

  /**
   * Envía la solicitud al backend para crear una dirección.
   * Si el backend devuelve un 400 con el mensaje "User already has an address",
   * se muestra la alerta y se redirige automáticamente a la lista.
   */
  const handleCreate = async (values: any) => {
    try {
      if (!userId) throw new Error("No se encontró el ID del usuario.");

      // Convertir los campos de coordenadas a número antes de enviar
      const payload = {
        ...values,
        latitude: Number(values.latitude),
        longitude: Number(values.longitude),
      };

      const created = await addressService.createAddress(Number(userId), payload);

      if (created) {
        await Swal.fire({
          title: "Éxito",
          text: "Dirección creada correctamente",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate(`/addresses/list/${userId}`);
      }
    } catch (error: any) {
      // Detectar error específico del backend
      const backendError = error?.response?.data?.error;

      if (backendError === "User already has an address") {
        // Si el usuario ya tiene dirección, se informa y se redirige a la lista
        await Swal.fire({
          title: "Atención",
          text: "Este usuario ya tiene una dirección registrada.",
          icon: "info",
          confirmButtonText: "Volver al listado",
        });

        navigate(`/addresses/list/${userId}`);
        return;
      }

      // Otros errores genéricos
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.detail ||
        error?.message ||
        "No fue posible crear la dirección.";

      Swal.fire("Error", message, "error");
    }
  };

  if (!template) return <div>Cargando...</div>;

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
