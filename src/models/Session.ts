// Session.ts
import { User } from "./User";

export class Session {
  id!: string;
  token!: string;
  expiration!: Date;
  FACode!: string;
  state!: string;

  user?: User;
}
