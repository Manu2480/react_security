import api from "../interceptors/axiosInterceptor";

class UserRoleService {
  async getUserRoles(): Promise<any[]> {
    const res = await api.get("/api/user-roles");
    return res.data;
  }

  async getRolesByUserId(userId: number): Promise<any[]> {
    const res = await api.get(`/api/user-roles/user/${userId}`);
    return res.data;
  }

  async getUsersByRoleId(roleId: number): Promise<any[]> {
    const res = await api.get(`/api/user-roles/role/${roleId}`);
    return res.data;
  }

  async createUserRole(userId: number, roleId: number): Promise<any> {
    const res = await api.post(`/api/user-roles/user/${userId}/role/${roleId}`, {
      startAt: new Date().toISOString(),
      endAt: null,
    });
    return res.data;
  }

  async deleteUserRole(userRoleId: string): Promise<void> {
    await api.delete(`/api/user-roles/${userRoleId}`);
  }
}

// 👇 ESTA LÍNEA ES LA IMPORTANTE
export const userRoleService = new UserRoleService();
