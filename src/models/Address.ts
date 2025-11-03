// src/models/Address.ts
import { User } from "./User";

export class Address {
  id!: number;
  street!: string;
  number!: string;
  latitude!: number;
  longitude!: number;

  // Campo clave foránea (según API)
  userId!: number;

  // Relación opcional con User (no siempre viene en la respuesta)
  user?: User;
}
