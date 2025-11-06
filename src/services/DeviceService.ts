// src/services/DeviceService.ts
import api from "../interceptors/axiosInterceptor";
import { Device } from "../models/Device";

class DeviceService {
  // Obtener todos los dispositivos
  async getDevices(): Promise<Device[]> {
    const res = await api.get("/api/devices");
    return res.data;
  }

  // Obtener un dispositivo por ID
  async getDeviceById(id: number): Promise<Device> {
    const res = await api.get(`/api/devices/${id}`);
    return res.data;
  }

  // Obtener los dispositivos de un usuario específico
  async getDevicesByUser(userId: number): Promise<Device[]> {
    const res = await api.get(`/api/devices/user/${userId}`);
    return res.data;
  }

  // Crear un nuevo dispositivo asociado a un usuario
  async createDevice(userId: number, payload: Partial<Device>): Promise<Device> {
    const res = await api.post(`/api/devices/user/${userId}`, payload);
    return res.data;
  }

  // Actualizar un dispositivo existente
  async updateDevice(id: number, payload: Partial<Device>): Promise<Device> {
    const res = await api.put(`/api/devices/${id}`, payload);
    return res.data;
  }

  // Eliminar un dispositivo
  async deleteDevice(id: number): Promise<void> {
    await api.delete(`/api/devices/${id}`);
  }
}

export const deviceService = new DeviceService();
