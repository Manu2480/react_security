// src/services/userService.ts
import api from "../interceptors/axiosInterceptor";
import { User } from "../models/User";
import { userRoleService } from "./userRoleService";

/**
 * Servicio principal de usuarios
 */
class UserService {
  async getUsers(): Promise<User[]> {
    const res = await api.get("/api/users");
    return res.data;
  }

  async getUserById(id: number): Promise<User> {
    const res = await api.get(`/api/users/${id}`);
    return res.data;
  }

  async createUser(payload: Partial<User>): Promise<User> {
    const res = await api.post("/api/users", payload);
    return res.data;
  }

  async updateUser(id: number, payload: Partial<User>): Promise<User> {
    const res = await api.put(`/api/users/${id}`, payload);
    return res.data;
  }

  async deleteUser(id: number): Promise<void> {
    await api.delete(`/api/users/${id}`);
  }

  /**
   * Crea el usuario y le asigna roles (opcional)
   */
  async createUserWithRoles(
    payload: Partial<User>,
    roles: number[]
  ): Promise<{ user: User; userRoles: any[] }> {
    // 1️⃣ Crear el usuario
    const createdUser = await this.createUser(payload);
    console.log("🟢 Usuario creado:", createdUser);

    // 2️⃣ Asignar roles (si hay)
    const userRoles: any[] = [];
    for (const roleId of roles) {
      try {
        const relation = await userRoleService.createUserRole(createdUser.id!, roleId);
        userRoles.push(relation);
      } catch (error) {
        console.warn(`⚠️ Error asignando rol ${roleId} al usuario ${createdUser.id}`, error);
      }
    }

    return { user: createdUser, userRoles };
  }
}

export const userService = new UserService();
