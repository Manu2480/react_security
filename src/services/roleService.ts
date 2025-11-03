import api from "../interceptors/axiosInterceptor";

export interface Role {
  id?: number;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

class RoleService {
  /**
   * 🟢 Obtener todos los roles
   */
  async getRoles(): Promise<Role[]> {
    try {
      const res = await api.get("/api/roles");
      return res.data;
    } catch (error: any) {
      console.error("❌ Error obteniendo roles:", error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * 🔵 Obtener un rol por ID
   */
  async getRoleById(id: number): Promise<Role> {
    try {
      const res = await api.get(`/api/roles/${id}`);
      return res.data;
    } catch (error: any) {
      console.error(`❌ Error obteniendo rol con ID ${id}:`, error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * 🟣 Crear un nuevo rol
   */
  async createRole(payload: Partial<Role>): Promise<Role> {
    try {
      const res = await api.post("/api/roles", payload);
      console.log("✅ Rol creado:", res.data);
      return res.data;
    } catch (error: any) {
      console.error("❌ Error creando rol:", error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * 🟠 Actualizar un rol existente
   */
  async updateRole(id: number, payload: Partial<Role>): Promise<Role> {
    try {
      const res = await api.put(`/api/roles/${id}`, payload);
      console.log("📝 Rol actualizado:", res.data);
      return res.data;
    } catch (error: any) {
      console.error(`❌ Error actualizando rol ${id}:`, error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * 🔴 Eliminar un rol
   */
  async deleteRole(id: number): Promise<boolean> {
    try {
      const res = await api.delete(`/api/roles/${id}`);
      console.log("🗑️ Rol eliminado:", res.status);
      return res.status === 200 || res.status === 204;
    } catch (error: any) {
      console.error(`❌ Error eliminando rol ${id}:`, error.response?.data || error.message);
      throw error;
    }
  }
}

export const roleService = new RoleService();
