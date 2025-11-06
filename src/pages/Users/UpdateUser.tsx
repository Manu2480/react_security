// src/pages/Users/UpdateUser.tsx
// -----------------------------------------------------------------------------
// Página de edición de usuarios.
// Carga los datos del usuario desde el backend usando su ID (desde la URL),
// muestra el formulario con valores prellenados y permite guardar los cambios.
// -----------------------------------------------------------------------------

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Breadcrumb from "../../components/Breadcrumb";
import GenericForm from "../../components/Form/GenericForm";
import { userService } from "../../services/userService";

const UpdateUser: React.FC = () => {
  // Se obtiene el parámetro `id` desde la ruta (por ejemplo /users/update/3)
  const { id } = useParams<{ id: string }>();

  // Hook para navegación programática
  const navigate = useNavigate();

  // Estado para almacenar los datos del usuario cargado desde el backend
  const [user, setUser] = useState<any | null>(null);

  // ---------------------------------------------------------------------------
  // Efecto: carga el usuario al montar el componente o cuando cambia el ID
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!id) return; // si no hay ID, no hace nada
    userService
      .getUserById(Number(id))
      .then((data) => {
        console.log("Usuario cargado:", data);
        setUser(data);
      })
      .catch((err) => {
        console.error("Error cargando usuario:", err);
        Swal.fire("Error", "No fue posible cargar el usuario", "error");
        navigate("/users/list");
      });
  }, [id]);

  // ---------------------------------------------------------------------------
  // Función de actualización: envía los nuevos datos al backend
  // ---------------------------------------------------------------------------
  const handleUpdate = async (values: any) => {
    try {
      await userService.updateUser(Number(id), values);
      Swal.fire("Éxito", "Usuario actualizado correctamente", "success");
      navigate("/users/list");
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      Swal.fire("Error", "No fue posible actualizar el usuario", "error");
    }
  };

  // ---------------------------------------------------------------------------
  // Render: muestra mensaje de carga o formulario
  // ---------------------------------------------------------------------------
  if (!user) return <div>Cargando usuario...</div>;

  return (
    <div>
      <Breadcrumb pageName="Actualizar Usuario" />
      <GenericForm
        mode={2} // modo edición
        data={user} // datos del usuario precargado
        handleUpdate={handleUpdate} // función para guardar cambios
      />
    </div>
  );
};

export default UpdateUser;
