import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Breadcrumb from "../../components/Breadcrumb";
import GenericForm from "../../components/Form/GenericForm";
import { roleService } from "../../services/roleService";

const UpdateRole: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    if (!id) {
      Swal.fire("Error", "No se proporcionó ID de rol", "error");
      navigate("/roles/list");
      return;
    }

    (async () => {
      try {
        const role = await roleService.getRoleById(Number(id));
        if (!role) throw new Error("No se encontró el rol");
        setData(role);
      } catch (error) {
        console.error("Error obteniendo rol:", error);
        Swal.fire("Error", "No fue posible obtener el rol", "error");
        navigate("/roles/list");
      }
    })();
  }, [id]);

  const handleUpdate = async (values: any) => {
    try {
      await roleService.updateRole(Number(id), values);
      await Swal.fire({
        title: "Éxito",
        text: "Rol actualizado correctamente",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/roles/list");
    } catch (error) {
      console.error("Error actualizando rol:", error);
      Swal.fire("Error", "No fue posible actualizar el rol", "error");
    }
  };

  if (!data) return <div>Cargando...</div>;

  return (
    <div>
      <Breadcrumb pageName="Actualizar Rol" />
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Editar Rol</h2>
        <GenericForm mode={2} data={data} handleUpdate={handleUpdate} />
      </div>
    </div>
  );
};

export default UpdateRole;
