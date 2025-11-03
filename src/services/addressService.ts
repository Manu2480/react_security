// src/services/addressService.ts
import api from "../interceptors/axiosInterceptor";
import { Address } from "../models/Address";

/**
 * Servicio para la gestión de direcciones (1:1 con User)
 */
class AddressService {
  async getAddresses(): Promise<Address[]> {
    const res = await api.get("/api/addresses");
    return res.data;
  }

  async getAddressById(id: number): Promise<Address> {
    const res = await api.get(`/api/addresses/${id}`);
    return res.data;
  }

  async getAddressesByUser(userId: number): Promise<Address[]> {
    const res = await api.get(`/api/users/${userId}/addresses`);
    return res.data;
  }

  async createAddress(userId: number, payload: Partial<Address>): Promise<Address> {
    const res = await api.post(`/api/users/${userId}/addresses`, payload);
    return res.data;
  }

  async updateAddress(id: number, payload: Partial<Address>): Promise<Address> {
    const res = await api.put(`/api/addresses/${id}`, payload);
    return res.data;
  }

  async deleteAddress(id: number): Promise<void> {
    await api.delete(`/api/addresses/${id}`);
  }
}

export const addressService = new AddressService();
