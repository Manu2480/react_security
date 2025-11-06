// src/pages/Users/CreateUser.tsx
// -----------------------------------------------------------------------------
// Página de creación de usuarios.
// Genera un formulario dinámico a partir de la estructura devuelta por la API,
// y permite registrar nuevos usuarios usando el servicio UserService.
// -----------------------------------------------------------------------------

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import GenericForm from "../../components/Form/GenericForm";
import { userService } from "../../services/userService";

const CreateUser: React.FC = () => {
  // Estado que guarda la plantilla base del formulario
  const [template, setTemplate] = useState<any | null>(null);
  const navigate = useNavigate();

  // ---------------------------------------------------------------------------
  // Efecto inicial: obtiene la estructura base del usuario desde la API.
  // Si no hay datos, crea una plantilla mínima con campos básicos.
  // ---------------------------------------------------------------------------
  useEffect(() => {
    (async () => {
      try {
        // Se obtienen los usuarios actuales para deducir la estructura
        const data = await userService.getUsers();

        if (Array.isArray(data) && data.length > 0) {
          // Toma las claves del primer usuario y genera un objeto vacío
          const base = Object.keys(data[0]).reduce((acc, key) => {
            acc[key] = "";
            return acc;
          }, {} as any);

          // Elimina campos que no deben ser editables
          delete base.id;
          delete base.created_at;
          delete base.updated_at;

          setTemplate(base);
        } else {
          // Si la API no devuelve usuarios, se define una plantilla mínima
          setTemplate({ name: "", email: "" });
        }
      } catch (error) {
        console.error("Error al generar template dinámico:", error);
        // En caso de error, se usa una plantilla por defecto
        setTemplate({ name: "", email: "" });
      }
    })();
  }, []);

  // ---------------------------------------------------------------------------
  // Envía los datos al backend para crear un nuevo usuario.
  // Muestra un mensaje de éxito o error según la respuesta.
  // ---------------------------------------------------------------------------
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

      // Redirige al listado de usuarios
      navigate("/users/list");
    } catch (error: any) {
      console.error("Error creando usuario:", error);

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.detail ||
        error?.message ||
        "No fue posible crear el usuario";

      Swal.fire("Error", message, "error");
    }
  };

  // Mientras se genera la plantilla, se muestra un texto de carga
  if (!template) return <div>Cargando...</div>;

  // ---------------------------------------------------------------------------
  // Render del formulario dinámico con su estructura y manejador de creación
  // ---------------------------------------------------------------------------
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
