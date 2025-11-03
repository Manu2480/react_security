import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Breadcrumb from "../../components/Breadcrumb";
import GenericForm from "../../components/Form/GenericForm";
import { Role } from "../../models/Role";
import { roleService } from "../../services/roleService";

const CreateRole: React.FC = () => {
  const navigate = useNavigate();
  const [template, setTemplate] = useState<Partial<Role> | null>(null);

  useEffect(() => {
    setTemplate({
      name: "",
      description: "",
    });
  }, []);

  const handleCreate = async (values: any) => {
    try {
      await roleService.createRole(values);
      await Swal.fire({
        title: "Éxito",
        text: "Rol creado correctamente",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/roles/list");
    } catch (error: any) {
      console.error("Error creando rol:", error);
      Swal.fire("Error", "No fue posible crear el rol.", "error");
    }
  };

  if (!template) return <div>Cargando formulario...</div>;

  return (
    <div className="p-4">
      <Breadcrumb pageName="Crear Rol" />
      <h2 className="text-xl font-semibold mb-4">Nuevo Rol</h2>
      <GenericForm mode={1} data={template} handleCreate={handleCreate} />
    </div>
  );
};

export default CreateRole;
