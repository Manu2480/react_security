import { User } from "./User";
import { Permission } from "./Permission";
import { UserRole } from "./UserRole";
import { RolePermission } from "./RolePermission";

/**
 * Representa un rol dentro del sistema.
 * Un rol puede tener múltiples usuarios (vía UserRole)
 * y múltiples permisos (vía RolePermission).
 */
export class Role {
  id!: number;
  name!: string;
  description!: string;

  // Relaciones n:n y 1:n
  users: User[] = [];                 // Relación indirecta con usuarios (opcional)
  permissions: Permission[] = [];     // Relación indirecta con permisos
  userRoles: UserRole[] = [];         // Unión con usuarios (tabla pivote)
  rolePermissions: RolePermission[] = []; // Unión con permisos (tabla pivote)
}
