import { User } from "./User";

/**
 * Representa una contraseña asociada a un usuario.
 */
export class Password {
  id!: number;
  content!: string;
  startAt!: string;
  endAt!: string;

  userId!: number; // clave foránea
  user?: User;     // relación opcional (inversa)
}
