import api from "../interceptors/axiosInterceptor";
import { UserRole } from "../models/UserRole";

class UserRoleService {
  async getUserRoles(): Promise<UserRole[]> {
    const res = await api.get("/api/user_roles");
    return res.data;
  }

  async getUserRoleById(id: string | number): Promise<UserRole> {
    const res = await api.get(`/api/user_roles/${id}`);
    return res.data;
  }

  async getUserRolesByUser(userId: number): Promise<UserRole[]> {
    const res = await api.get(`/api/user_roles/user/${userId}`);
    return res.data;
  }

  async createUserRole(payload: Partial<UserRole>): Promise<UserRole> {
    const res = await api.post("/api/user_roles", payload);
    return res.data;
  }

  async updateUserRole(id: string | number, payload: Partial<UserRole>): Promise<UserRole> {
    const res = await api.put(`/api/user_roles/${id}`, payload);
    return res.data;
  }

  async deleteUserRole(id: string | number): Promise<void> {
    await api.delete(`/api/user_roles/${id}`);
  }
}

export const userRoleService = new UserRoleService();
