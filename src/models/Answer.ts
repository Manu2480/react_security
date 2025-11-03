// Answer.ts
import { User } from "./User";
import { SecurityQuestion } from "./SecurityQuestion";

export class Answer {
  id!: number;
  content!: string;

  user?: User;
  securityQuestion?: SecurityQuestion;
}
