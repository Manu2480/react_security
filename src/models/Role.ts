// Role.ts
import { User } from "./User";
import { Permission } from "./Permission";
import { UserRole } from "./UserRole";
import { RolePermission } from "./RolePermission";

export class Role {
  id!: number;
  name!: string;
  description!: string;

  users: User[] = [];
  permissions: Permission[] = [];
  userRoles: UserRole[] = [];
  rolePermissions: RolePermission[] = [];
}
