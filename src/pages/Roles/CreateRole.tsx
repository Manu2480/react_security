import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import GenericForm from "../../components/Form/GenericForm";
import { roleService } from "../../services/roleService";

const CreateRole: React.FC = () => {
  const [template, setTemplate] = useState<any | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const data = await roleService.getRoles();
        if (Array.isArray(data) && data.length > 0) {
          const base = Object.keys(data[0]).reduce((acc, key) => {
            acc[key] = "";
            return acc;
          }, {} as any);
          delete base.id;
          delete base.created_at;
          delete base.updated_at;
          setTemplate(base);
        } else {
          setTemplate({ name: "", description: "" });
        }
      } catch (error) {
        console.error("Error generando template de roles:", error);
        setTemplate({ name: "", description: "" });
      }
    })();
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
    } catch (error) {
      console.error("Error creando rol:", error);
      Swal.fire("Error", "No fue posible crear el rol", "error");
    }
  };

  if (!template) return <div>Cargando...</div>;

  return (
    <div>
      <Breadcrumb pageName="Crear Rol" />
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Nuevo Rol</h2>
        <GenericForm mode={1} data={template} handleCreate={handleCreate} />
      </div>
    </div>
  );
};

export default CreateRole;
