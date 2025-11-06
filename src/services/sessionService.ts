// src/services/sessionService.ts
import api from "../interceptors/axiosInterceptor";

class SessionService {
  async getSessionsByUser(userId: number) {
    const res = await api.get(`/api/sessions/user/${userId}`);
    return res.data;
  }

  async getSession(sessionId: string) {
    const res = await api.get(`/api/sessions/${sessionId}`);
    return res.data;
  }

  async createSession(userId: number, payload: any) {
    const res = await api.post(`/api/sessions/user/${userId}`, payload);
    return res.data;
  }

  async updateSession(sessionId: string, payload: any) {
    const res = await api.put(`/api/sessions/${sessionId}`, payload);
    return res.data;
  }

  async deleteSession(sessionId: string) {
    const res = await api.delete(`/api/sessions/${sessionId}`);
    return res.data;
  }
}

export const sessionService = new SessionService();
