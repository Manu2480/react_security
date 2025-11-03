// UserRole.ts
import { User } from "./User";
import { Role } from "./Role";

export class UserRole {
  id!: string;
  startAt!: Date;
  endAt!: Date;

  // Relaciones bidireccionales
  user?: User;
  role?: Role;
}
