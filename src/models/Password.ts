// Password.ts
import { User } from "./User";

export class Password {
  id!: number;
  content!: string;
  startAt!: Date;
  endAt!: Date;

  user?: User;
}
