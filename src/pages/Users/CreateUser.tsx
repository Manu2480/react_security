import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import GenericForm from "../../components/Form/GenericForm";
import { userService } from "../../services/userService";

const CreateUser: React.FC = () => {
  const [template, setTemplate] = useState<any | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 🔹 Traemos la estructura base directamente del backend
    // o generamos una vacía a partir de lo que devuelve el API
    (async () => {
      try {
        const data = await userService.getUsers();
        if (Array.isArray(data) && data.length > 0) {
          // ✅ usamos la estructura del primer usuario, pero vacía
          const base = Object.keys(data[0]).reduce((acc, key) => {
            acc[key] = "";
            return acc;
          }, {} as any);

          // Eliminamos id, created_at, updated_at (no editables)
          delete base.id;
          delete base.created_at;
          delete base.updated_at;

          setTemplate(base);
        } else {
          // Si la API está vacía, definimos un esquema mínimo
          setTemplate({ name: "", email: "" });
        }
      } catch (error) {
        console.error("Error al generar template dinámico:", error);
        setTemplate({ name: "", email: "" });
      }
    })();
  }, []);

  const handleCreate = async (values: any) => {
    try {
      console.log("Creando usuario:", values);
      await userService.createUser(values);

      await Swal.fire({
        title: "Éxito",
        text: "Usuario creado correctamente",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/users/list");
    } catch (error: any) {
      console.error("❌ Error creando usuario:", error);
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.detail ||
        error?.message ||
        "No fue posible crear el usuario";
      Swal.fire("Error", message, "error");
    }
  };

  if (!template) return <div>Cargando...</div>;

  return (
    <div>
      <Breadcrumb pageName="Crear Usuario" />
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Nuevo Usuario</h2>
        <GenericForm mode={1} data={template} handleCreate={handleCreate} />
      </div>
    </div>
  );
};

export default CreateUser;
