// SecurityQuestion.ts
import { Answer } from "./Answer";

export class SecurityQuestion {
  id!: number;
  name!: string;
  description!: string;

  answers: Answer[] = [];
}
