import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Breadcrumb from "../../components/Breadcrumb";
import GenericForm from "../../components/Form/GenericForm";
import { userService } from "../../services/userService";

const UpdateUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    if (!id) return;
    userService.getUserById(Number(id))
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

  const handleUpdate = async (values: any) => {
    try {
      await userService.updateUser(Number(id), values);
      Swal.fire("Éxito", "Usuario actualizado correctamente", "success");
      navigate("/users/list");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No fue posible actualizar el usuario", "error");
    }
  };

  if (!user) return <div>Cargando usuario...</div>;

  return (
    <div>
      <Breadcrumb pageName="Actualizar Usuario" />
      <GenericForm mode={2} data={user} handleUpdate={handleUpdate} />
    </div>
  );
};

export default UpdateUser;
