import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Breadcrumb from "../../components/Breadcrumb";
import GenericForm from "../../components/Form/GenericForm";
import { userRoleService } from "../../services/userRoleService";
import { roleService } from "../../services/roleService";
import { userService } from "../../services/userService";
import { UserRole } from "../../models/UserRole";
import { User } from "../../models/User";
import { Role } from "../../models/Role";

const CreateUserRole: React.FC = () => {
  const [template, setTemplate] = useState<any | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersData, rolesData] = await Promise.all([
          userService.getUsers(),
          roleService.getRoles(),
        ]);

        setUsers(usersData || []);
        setRoles(rolesData || []);

        setTemplate({
          userId: "",
          roleId: "",
          startAt: "",
          endAt: "",
        });
      } catch (error) {
        console.error("Error al obtener usuarios o roles:", error);
        Swal.fire("Error", "No fue posible obtener usuarios o roles.", "error");
      }
    };
    fetchData();
  }, []);

  const formatDateTime = (date: string): string => {
    // Si la fecha ya viene en formato correcto, se devuelve igual
    if (!date) return "";
    const d = new Date(date);
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  };

  const handleCreate = async (values: any) => {
    try {
      const userId = Number(values.userId);
      const roleId = Number(values.roleId);

      if (!userId || !roleId) {
        Swal.fire("Error", "Debe seleccionar un usuario y un rol.", "error");
        return;
      }

      const payload: Partial<UserRole> = {
        userId,
        roleId,
        startAt: formatDateTime(values.startAt),
        endAt: values.endAt ? formatDateTime(values.endAt) : undefined,
      };

      console.log("Creando relación usuario-rol:", payload);
      await userRoleService.createUserRole(payload);

      await Swal.fire({
        title: "Éxito",
        text: "Rol asignado correctamente al usuario.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/userroles/list");
    } catch (error: any) {
      console.error("Error creando UserRole:", error);
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.detail ||
        error?.message ||
        "No fue posible asignar el rol al usuario.";
      Swal.fire("Error", message, "error");
    }
  };

  if (!template) return <div>Cargando formulario...</div>;

  const dynamicTemplate = {
    ...template,
    userId: {
      type: "select",
      label: "Usuario",
      options: users.map((u) => ({ value: String(u.id), label: u.name })),
    },
    roleId: {
      type: "select",
      label: "Rol",
      options: roles.map((r) => ({ value: String(r.id), label: r.name })),
    },
  };

  return (
    <div>
      <Breadcrumb pageName="Asignar Rol a Usuario" />
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Asignar nuevo rol</h2>
        <GenericForm mode={1} data={dynamicTemplate} handleCreate={handleCreate} />
      </div>
    </div>
  );
};

export default CreateUserRole;
