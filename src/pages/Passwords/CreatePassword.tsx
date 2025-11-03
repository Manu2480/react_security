import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Breadcrumb from "../../components/Breadcrumb";
import GenericForm from "../../components/Form/GenericForm";
import { passwordService } from "../../services/passwordService";
import { Password } from "../../models/Password";

const CreatePassword: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [template, setTemplate] = useState<Partial<Password> | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTemplate({
      content: "",
      startAt: "",
      endAt: "",
    });
  }, []);

  const handleCreate = async (values: any) => {
    try {
      if (!userId) {
        Swal.fire("Error", "No se encontró el usuario asociado a la contraseña.", "error");
        return;
      }

      const payload = {
        ...values,
        startAt: values.startAt,
        endAt: values.endAt,
      };

      await passwordService.createPassword(Number(userId), payload);

      await Swal.fire({
        title: "Éxito",
        text: "Contraseña creada correctamente",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate(`/passwords/list/${userId}`);
    } catch (error: any) {
      console.error("Error creando contraseña:", error);

      const message =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        error?.message ||
        "No fue posible crear la contraseña";

      if (message.includes("User already has a password")) {
        await Swal.fire({
          title: "Aviso",
          text: "Este usuario ya tiene una contraseña activa.",
          icon: "info",
          confirmButtonText: "Volver al listado",
        });
        navigate(`/passwords/list/${userId}`);
        return;
      }

      Swal.fire("Error", message, "error");
    }
  };

  if (!template) return <div>Cargando formulario...</div>;

  return (
    <div>
      <Breadcrumb pageName="Crear Contraseña" />
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Nueva Contraseña</h2>
        <GenericForm mode={1} data={template} handleCreate={handleCreate} />
      </div>
    </div>
  );
};

export default CreatePassword;
