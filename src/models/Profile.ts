// Profile.ts
import { User } from "./User";

export class Profile {
  id!: number;
  phone!: string;
  photo!: string;

  user?: User; // relación 1:1 bidireccional
}
