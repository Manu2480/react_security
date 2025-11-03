import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Breadcrumb from "../../components/Breadcrumb";
import GenericForm from "../../components/Form/GenericForm";
import { permissionService } from "../../services/permissionService";
import { useNavigate } from "react-router-dom";

const CreatePermission: React.FC = () => {
  const navigate = useNavigate();
  const [template, setTemplate] = useState<any | null>(null);

  // Cargar estructura inicial del permiso
  useEffect(() => {
    setTemplate({
      url: "",
      method: "",
      option: "",
    });
  }, []);

  const handleCreate = async (values: any) => {
    try {
      console.log("Creando permiso:", values);
      await permissionService.createPermission(values);
      await Swal.fire({
        title: "Permiso creado",
        text: "El permiso se ha creado correctamente",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/permissions/list");
    } catch (error: any) {
      console.error("Error creando permiso:", error);
      Swal.fire(
        "Error",
        error?.response?.data?.error || "No fue posible crear el permiso",
        "error"
      );
    }
  };

  if (!template) return <div>Cargando...</div>;

  return (
    <div>
      <Breadcrumb pageName="Crear Permiso" />
      <GenericForm mode={1} data={template} handleCreate={handleCreate} />
    </div>
  );
};

export default CreatePermission;
