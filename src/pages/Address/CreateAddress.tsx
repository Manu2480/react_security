import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import GenericForm from "../../components/Form/GenericForm";
import { addressService } from "../../services/addressService";

const CreateAddress: React.FC = () => {
  const [template, setTemplate] = useState<any | null>(null);
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>(); // ID del usuario al que pertenece la dirección

  useEffect(() => {
    // Generar un template base dinámico (según la estructura del backend o un esquema mínimo)
    (async () => {
      try {
        const data = await addressService.getAddresses();
        if (Array.isArray(data) && data.length > 0) {
          // Creamos un objeto vacío basado en el primer registro recibido
          const base = Object.keys(data[0]).reduce((acc, key) => {
            acc[key] = "";
            return acc;
          }, {} as any);

          // Eliminamos campos no editables o automáticos
          delete base.id;
          delete base.created_at;
          delete base.updated_at;
          delete base.user_id;

          setTemplate(base);
        } else {
          // Si no hay datos, usamos una estructura mínima esperada por el backend
          setTemplate({
            street: "",
            number: "",
            latitude: "",
            longitude: "",
          });
        }
      } catch (error) {
        console.error("Error al generar template dinámico:", error);
        setTemplate({
          street: "",
          number: "",
          latitude: "",
          longitude: "",
        });
      }
    })();
  }, []);

  // Maneja la creación del registro
  const handleCreate = async (values: any) => {
    try {
      if (!userId) {
        Swal.fire("Error", "No se encontró el ID del usuario.", "error");
        return;
      }

      // Convertimos los valores numéricos antes de enviar
      const payload = {
        ...values,
        latitude: parseFloat(values.latitude),
        longitude: parseFloat(values.longitude),
      };

      await addressService.createAddress(Number(userId), payload);

      await Swal.fire({
        title: "Éxito",
        text: "Dirección creada correctamente",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate(`/addresses/list/${userId}`);
    } catch (error: any) {
      console.error("Error creando dirección:", error);
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.detail ||
        error?.message ||
        "No fue posible crear la dirección";
      Swal.fire("Error", message, "error");
    }
  };

  if (!template) return <div>Cargando...</div>;

  return (
    <div>
      <Breadcrumb pageName="Crear Dirección" />
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Nueva Dirección</h2>

        {/* 
          GenericForm adapta su diseño a la librería activa (bootstrap, tailwind, etc.)
          mode={1} => modo creación
        */}
        <GenericForm mode={1} data={template} handleCreate={handleCreate} />
      </div>
    </div>
  );
};

export default CreateAddress;
