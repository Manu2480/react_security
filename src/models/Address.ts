// Address.ts
import { User } from "./User";

export class Address {
  id!: number;
  street!: string;
  number!: string;
  latitude!: number;
  longitude!: number;

  user?: User; // relación 1:1 bidireccional
}
