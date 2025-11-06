// src/services/userService.ts
// -----------------------------------------------------------------------------
// Servicio que centraliza todas las operaciones relacionadas con los usuarios.
// Implementa la comunicación con la API mediante Axios y aplica buenas prácticas
// de separación de responsabilidades siguiendo principios SOLID.
// -----------------------------------------------------------------------------

import api from "../interceptors/axiosInterceptor";
import { User } from "../models/User";
import { userRoleService } from "./userRoleService";

// -----------------------------------------------------------------------------
// Clase principal del servicio de usuarios.
// Se encarga de realizar las operaciones CRUD (crear, leer, actualizar, eliminar)
// y de manejar relaciones adicionales (como la asignación de roles).
// -----------------------------------------------------------------------------
class UserService {
  
  /**
   * Obtiene todos los usuarios del sistema.
   * @returns Lista de usuarios.
   */
  async getUsers(): Promise<User[]> {
    const res = await api.get("/api/users");
    return res.data;
  }

  /**
   * Obtiene un usuario por su identificador único.
   * @param id - Identificador del usuario.
   * @returns El usuario correspondiente.
   */
  async getUserById(id: number): Promise<User> {
    const res = await api.get(`/api/users/${id}`);
    return res.data;
  }

  /**
   * Crea un nuevo usuario.
   * @param payload - Datos del nuevo usuario.
   * @returns El usuario creado.
   */
  async createUser(payload: Partial<User>): Promise<User> {
    const res = await api.post("/api/users", payload);
    return res.data;
  }

  /**
   * Actualiza un usuario existente.
   * @param id - Identificador del usuario a actualizar.
   * @param payload - Campos a modificar.
   * @returns El usuario actualizado.
   */
  async updateUser(id: number, payload: Partial<User>): Promise<User> {
    const res = await api.put(`/api/users/${id}`, payload);
    return res.data;
  }

  /**
   * Elimina un usuario del sistema.
   * @param id - Identificador del usuario a eliminar.
   */
  async deleteUser(id: number): Promise<void> {
    await api.delete(`/api/users/${id}`);
  }

  /**
   * Crea un usuario y le asigna uno o varios roles.
   * Se realiza en dos pasos:
   *  1. Crea el usuario.
   *  2. Asocia los roles mediante el servicio userRoleService.
   *
   * @param payload - Datos del nuevo usuario.
   * @param roles - Lista de IDs de roles a asignar.
   * @returns El usuario creado junto con sus relaciones de rol.
   */
  async createUserWithRoles(
    payload: Partial<User>,
    roles: number[]
  ): Promise<{ user: User; userRoles: any[] }> {
    // 1. Crear el usuario
    const createdUser = await this.createUser(payload);
    console.log("Usuario creado correctamente:", createdUser);

    // 2. Asignar roles al nuevo usuario (si existen)
    const userRoles: any[] = [];
    for (const roleId of roles) {
      try {
        const relation = await userRoleService.createUserRole({userId: createdUser.id!,roleId: roleId,});

        userRoles.push(relation);
      } catch (error) {
        console.warn(`Error al asignar el rol ${roleId} al usuario ${createdUser.id}`, error);
      }
    }

    return { user: createdUser, userRoles };
  }
}

// Exportamos una instancia del servicio para ser utilizada en toda la aplicación.
export const userService = new UserService();
