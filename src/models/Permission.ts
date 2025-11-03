// Permission.ts
import { Role } from "./Role";
import { RolePermission } from "./RolePermission";

export class Permission {
  id!: number;
  url!: string;
  method!: string;

  roles: Role[] = [];
  rolePermissions: RolePermission[] = [];
}
