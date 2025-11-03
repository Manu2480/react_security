import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import GenericTable from "../../components/Table/GenericTable";
import Breadcrumb from "../../components/Breadcrumb";
import { Password } from "../../models/Password";
import { passwordService } from "../../services/passwordService";

const ListPassword: React.FC = () => {
  const [passwords, setPasswords] = useState<Password[]>([]);
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [userId]);

  const fetchData = async () => {
    if (!userId) return;

    try {
      const response = await passwordService.getPasswordsByUser(Number(userId));

      if (Array.isArray(response)) {
        setPasswords(response);
      } else if (response && typeof response === "object") {
        setPasswords([response]);
      } else {
        setPasswords([]);
        console.log(`El usuario ${userId} no tiene contraseñas.`);
      }
    } catch (error: any) {
      if (error?.response?.status === 404) {
        console.log(`El usuario ${userId} no tiene contraseñas registradas.`);
        setPasswords([]);
      } else {
        console.error("Error al obtener contraseñas:", error);
        Swal.fire("Error", "No fue posible obtener las contraseñas.", "error");
      }
    }
  };

  const handleAction = async (action: string, item: Password) => {
    if (action === "delete") {
      await deletePassword(item);
    }
  };

  const deletePassword = async (item: Password) => {
    const result = await Swal.fire({
      title: "Eliminar contraseña",
      text: "¿Está seguro de eliminar esta contraseña?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No",
    });

    if (!result.isConfirmed) return;

    try {
      await passwordService.deletePassword(item.id);
      Swal.fire("Eliminado", "Contraseña eliminada correctamente", "success");
      fetchData();
    } catch (error) {
      console.error("Error eliminando contraseña:", error);
      Swal.fire("Error", "No fue posible eliminar la contraseña.", "error");
    }
  };

  const renderBotonCrear = () => {
    const onCrear = () => navigate(`/passwords/create/${userId}`);
    return (
      <button
        onClick={onCrear}
        className="bg-primary text-white rounded-md px-4 py-2 hover:bg-opacity-90"
      >
        + Crear Contraseña
      </button>
    );
  };

  return (
    <div className="p-4">
      <Breadcrumb pageName="Contraseñas" />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          Contraseñas del usuario {userId}
        </h2>
        {renderBotonCrear()}
      </div>

      <GenericTable
        data={passwords}
        actions={[{ name: "delete", label: "Eliminar" }]}
        onAction={handleAction}
      />
    </div>
  );
};

export default ListPassword;
