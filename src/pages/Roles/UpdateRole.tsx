import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Breadcrumb from "../../components/Breadcrumb";
import GenericForm from "../../components/Form/GenericForm";
import { Role } from "../../models/Role";
import { roleService } from "../../services/roleService";

const UpdateRole: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [template, setTemplate] = useState<Role | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) fetchRole(Number(id));
  }, [id]);

  const fetchRole = async (roleId: number) => {
    try {
      const data = await roleService.getRoleById(roleId);
      setTemplate(data);
    } catch (error) {
      console.error("Error al obtener rol:", error);
      Swal.fire("Error", "No fue posible cargar el rol.", "error");
    }
  };

  const handleUpdate = async (values: any) => {
    if (!id) return;
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
      Swal.fire("Error", "No fue posible actualizar el rol.", "error");
    }
  };

  if (!template) return <div>Cargando datos...</div>;

  return (
    <div className="p-4">
      <Breadcrumb pageName="Editar Rol" />
      <h2 className="text-xl font-semibold mb-4">Editar Rol</h2>
      <GenericForm mode={2} data={template} handleUpdate={handleUpdate} />
    </div>
  );
};

export default UpdateRole;
