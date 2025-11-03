// Device.ts
import { User } from "./User";

export class Device {
  id!: number;
  name!: string;
  ip!: string;
  operating_system!: string;

  user?: User;
}
