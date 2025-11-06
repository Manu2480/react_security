// src/services/SecurityQuestionService.ts
import api from "../interceptors/axiosInterceptor";
import { SecurityQuestion } from "../models/SecurityQuestion";

class SecurityQuestionService {
  async getSecurityQuestions(): Promise<SecurityQuestion[]> {
    const res = await api.get("/api/security-questions");
    return res.data;
  }

  async getSecurityQuestionById(id: number): Promise<SecurityQuestion> {
    const res = await api.get(`/api/security-questions/${id}`);
    return res.data;
  }

  async createSecurityQuestion(payload: Partial<SecurityQuestion>): Promise<SecurityQuestion> {
    const res = await api.post("/api/security-questions", payload);
    return res.data;
  }

  async updateSecurityQuestion(id: number, payload: Partial<SecurityQuestion>): Promise<SecurityQuestion> {
    const res = await api.put(`/api/security-questions/${id}`, payload);
    return res.data;
  }

  async deleteSecurityQuestion(id: number): Promise<void> {
    await api.delete(`/api/security-questions/${id}`);
  }
}

export const securityQuestionService = new SecurityQuestionService();
