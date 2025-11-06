import api from "../interceptors/axiosInterceptor";
import { DigitalSignature } from "../models/DigitalSignature";

class DigitalSignatureService {
  // 🔹 Obtener todas las firmas digitales
  async getDigitalSignatures(): Promise<DigitalSignature[]> {
    const res = await api.get("/api/digital-signatures");
    return res.data;
  }

  // 🔹 Obtener una firma digital por ID
  async getDigitalSignatureById(id: number): Promise<DigitalSignature> {
    const res = await api.get(`/api/digital-signatures/${id}`);
    return res.data;
  }

  // 🔹 Obtener la firma digital asociada a un usuario
  async getDigitalSignatureByUser(userId: number): Promise<DigitalSignature> {
    const res = await api.get(`/api/digital-signatures/user/${userId}`);
    return res.data;
  }

  // 🔹 Crear una nueva firma digital para un usuario
  // Acepta tanto un objeto normal (JSON) como un FormData con imagen
  async createDigitalSignature(
    userId: number,
    payload: Partial<DigitalSignature> | FormData
  ): Promise<DigitalSignature> {
    const isFormData = payload instanceof FormData;

    const res = await api.post(`/api/digital-signatures/user/${userId}`, payload, {
      headers: isFormData
        ? { "Content-Type": "multipart/form-data" }
        : { "Content-Type": "application/json" },
    });

    return res.data;
  }

  // 🔹 Actualizar una firma digital existente (también admite FormData)
  async updateDigitalSignature(
    id: number,
    payload: Partial<DigitalSignature> | FormData
  ): Promise<DigitalSignature> {
    const isFormData = payload instanceof FormData;

    const res = await api.put(`/api/digital-signatures/${id}`, payload, {
      headers: isFormData
        ? { "Content-Type": "multipart/form-data" }
        : { "Content-Type": "application/json" },
    });

    return res.data;
  }

  // 🔹 Eliminar una firma digital
  async deleteDigitalSignature(id: number): Promise<void> {
    await api.delete(`/api/digital-signatures/${id}`);
  }
}

export const digitalSignatureService = new DigitalSignatureService();
