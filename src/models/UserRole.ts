import { User } from "./User";
import { Role } from "./Role";

/**
 * Representa la relación N:N entre User y Role.
 * Permite manejar fechas de inicio y fin de asignación.
 */
export class UserRole {
  id!: number;
  startAt!: string; // Se usa string para facilitar el parseo de fechas (evita problemas con JSON)
  endAt!: string;

  // Relaciones bidireccionales
  userId!: number; // FK explícita para claridad
  roleId!: number;

  user?: User;
  role?: Role;
}
