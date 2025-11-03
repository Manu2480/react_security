// RolePermission.ts
import { Role } from "./Role";
import { Permission } from "./Permission";

export class RolePermission {
  id!: string;
  startAt!: Date;
  endAt!: Date;

  // Relaciones bidireccionales
  role?: Role;
  permission?: Permission;
}
