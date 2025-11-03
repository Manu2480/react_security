import api from "../interceptors/axiosInterceptor";

class PermissionService {
  async getPermissions(): Promise<any[]> {
    const res = await api.get("/api/permissions");
    return res.data;
  }

  async getPermissionById(id: number): Promise<any> {
    const res = await api.get(`/api/permissions/${id}`);
    return res.data;
  }

  async createPermission(payload: any): Promise<any> {
    console.log("➡️ Enviando permiso al backend:", payload);
    const res = await api.post("/api/permissions", payload);
    return res.data;
  }

  async updatePermission(id: number, payload: any): Promise<any> {
    const res = await api.put(`/api/permissions/${id}`, payload);
    return res.data;
  }

  async deletePermission(id: number): Promise<boolean> {
    const res = await api.delete(`/api/permissions/${id}`);
    return res.status === 200 || res.status === 204;
  }
}

export const permissionService = new PermissionService();
