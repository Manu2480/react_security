import api from "../interceptors/axiosInterceptor";
import { Answer } from "../models/Answer";

class AnswerService {
  // Obtener todas las respuestas
  async getAnswers(): Promise<Answer[]> {
    const res = await api.get("/api/answers");
    return res.data;
  }

  // Obtener una respuesta por ID
  async getAnswerById(id: number): Promise<Answer> {
    const res = await api.get(`/api/answers/${id}`);
    return res.data;
  }

  // Obtener respuestas de un usuario específico
  async getAnswersByUser(userId: number): Promise<Answer[]> {
    const res = await api.get(`/api/answers/user/${userId}`);
    return res.data;
  }

  // Obtener respuestas por pregunta de seguridad
  async getAnswersByQuestion(questionId: number): Promise<Answer[]> {
    const res = await api.get(`/api/answers/question/${questionId}`);
    return res.data;
  }

  // Crear una nueva respuesta para un usuario y pregunta
  async createAnswer(userId: number, questionId: number, payload: Partial<Answer>): Promise<Answer> {
    const res = await api.post(`/api/answers/user/${userId}/question/${questionId}`, payload);
    return res.data;
  }

  // Actualizar una respuesta
  async updateAnswer(id: number, payload: Partial<Answer>): Promise<Answer> {
    const res = await api.put(`/api/answers/${id}`, payload);
    return res.data;
  }

  // Eliminar una respuesta
  async deleteAnswer(id: number): Promise<void> {
    await api.delete(`/api/answers/${id}`);
  }
}

export const answerService = new AnswerService();
