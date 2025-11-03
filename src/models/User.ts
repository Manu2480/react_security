import { Address } from "./Address";
import { Profile } from "./Profile";
import { Role } from "./Role";
import { Session } from "./Session";
import { Password } from "./Password";
import { Device } from "./Device";
import { Answer } from "./Answer";
import { DigitalSignature } from "./DigitalSignature";
import { UserRole } from "./UserRole";

/**
 * Representa un usuario del sistema.
 * Contiene relaciones con roles, contraseñas, direcciones, etc.
 */
export class User {
  id!: number;
  name!: string;
  email!: string;
  password!: string;

  // Relaciones 1:1
  address?: Address; // Dirección principal del usuario
  profile?: Profile; // Información de perfil extendida
  digitalSignature?: DigitalSignature; // Firma digital

  // Relaciones 1:n o n:n
  roles: Role[] = [];
  sessions: Session[] = [];
  passwords: Password[] = []; // Relación 1:n con contraseñas
  devices: Device[] = [];
  answers: Answer[] = [];
  userRoles: UserRole[] = []; // Relación intermedia para roles múltiples

}
