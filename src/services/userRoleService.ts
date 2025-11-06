// src/services/userRoleService.ts
// -----------------------------------------------------------------------------
// Servicio encargado de gestionar las relaciones entre usuarios y roles.
// Define las operaciones CRUD sobre la entidad UserRole y adapta la llamada
// al endpoint que expone el backend para crear relaciones user-role.
// -----------------------------------------------------------------------------

import api from "../interceptors/axiosInterceptor";
import { UserRole } from "../models/UserRole";

// Clase principal del servicio UserRoleService
class UserRoleService {
  // Obtiene todas las relaciones usuario-rol del sistema
  async getUserRoles(): Promise<UserRole[]> {
    const res = await api.get("/api/user-roles");
    return res.data;
  }

  // Obtiene una relación usuario-rol por su ID
  async getUserRoleById(id: string | number): Promise<UserRole> {
    const res = await api.get(`/api/user-roles/${id}`);
    return res.data;
  }

  // Obtiene todas las relaciones de roles asociadas a un usuario específico
  async getUserRolesByUser(userId: number): Promise<UserRole[]> {
    const res = await api.get(`/api/user-roles/user/${userId}`);
    return res.data;
  }

  // Crea una relación entre un usuario y un rol.
  // El backend expone el endpoint: POST /api/user-roles/user/<user_id>/role/<role_id>
  async createUserRole(payload: Partial<UserRole>): Promise<UserRole> {
    const userId = (payload as any).userId ?? (payload as any).user_id;
    const roleId = (payload as any).roleId ?? (payload as any).role_id;

    if (!userId || !roleId) {
      throw new Error("userId and roleId are required to create a UserRole");
    }

    // Construye el body con campos opcionales si fueron enviados
    const body: any = {};
    if ((payload as any).startAt) body.startAt = (payload as any).startAt;
    if ((payload as any).endAt) body.endAt = (payload as any).endAt;

    const res = await api.post(`/api/user-roles/user/${userId}/role/${roleId}`, body);
    return res.data;
  }

  // Actualiza una relación usuario-rol existente
  async updateUserRole(id: string | number, payload: Partial<UserRole>): Promise<UserRole> {
    const res = await api.put(`/api/user-roles/${id}`, payload);
    return res.data;
  }

  // Elimina una relación usuario-rol existente
  async deleteUserRole(id: string | number): Promise<void> {
    await api.delete(`/api/user-roles/${id}`);
  }
}

// Exportación de la instancia del servicio
export const userRoleService = new UserRoleService();
