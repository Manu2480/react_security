// User.ts
import { Address } from "./Address";
import { Profile } from "./Profile";
import { Role } from "./Role";
import { Session } from "./Session";
import { Password } from "./Password";
import { Device } from "./Device";
import { Answer } from "./Answer";
import { DigitalSignature } from "./DigitalSignature";
import { UserRole } from "./UserRole";

export class User {
  id!: number;
  name!: string;
  email!: string;
  password!: string;

  // Relaciones bidireccionales
  address?: Address;
  profile?: Profile;
  roles: Role[] = [];
  sessions: Session[] = [];
  passwords: Password[] = [];
  devices: Device[] = [];
  answers: Answer[] = [];
  digitalSignature?: DigitalSignature;
  serRoles: UserRole[] = []; // <--- nueva relación n a n
}
