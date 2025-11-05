import api from "../interceptors/axiosInterceptor";
import { UserRole } from "../models/UserRole";

class UserRoleService {
  async getUserRoles(): Promise<UserRole[]> {
    const res = await api.get("/api/user-roles");
    return res.data;
  }

  async getUserRoleById(id: string | number): Promise<UserRole> {
    const res = await api.get(`/api/user-roles/${id}`);
    return res.data;
  }

  async getUserRolesByUser(userId: number): Promise<UserRole[]> {
    const res = await api.get(`/api/user-roles/user/${userId}`);
    return res.data;
  }

  async createUserRole(payload: Partial<UserRole>): Promise<UserRole> {
    // El backend expone POST /api/user-roles/user/<user_id>/role/<role_id>
    const userId = (payload as any).userId ?? (payload as any).user_id;
    const roleId = (payload as any).roleId ?? (payload as any).role_id;

    if (!userId || !roleId) {
      throw new Error("userId and roleId are required to create a UserRole");
    }

    const body: any = {};
    if ((payload as any).startAt) body.startAt = (payload as any).startAt;
    if ((payload as any).endAt) body.endAt = (payload as any).endAt;

    const res = await api.post(`/api/user-roles/user/${userId}/role/${roleId}`, body);
    return res.data;
  }

  async updateUserRole(id: string | number, payload: Partial<UserRole>): Promise<UserRole> {
    const res = await api.put(`/api/user-roles/${id}`, payload);
    return res.data;
  }

  async deleteUserRole(id: string | number): Promise<void> {
    await api.delete(`/api/user-roles/${id}`);
  }
}

export const userRoleService = new UserRoleService();
