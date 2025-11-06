import api from "../interceptors/axiosInterceptor";

export interface ProfilePayload {
  identification?: string;
  phone?: string;
  // photo se enviará como FormData en create/update
}

class ProfileService {
  async getProfiles(): Promise<any[]> {
    const res = await api.get("/api/profiles");
    return res.data;
  }

  async getProfileByUser(userId: number): Promise<any> {
    const res = await api.get(`/api/profiles/user/${userId}`);
    return res.data;
  }

  async createProfile(userId: number, payload: ProfilePayload, photo?: File): Promise<any> {
    const form = new FormData();
    if (payload.identification) form.append("identification", payload.identification);
    if (payload.phone) form.append("phone", payload.phone);
    if (photo) form.append("photo", photo);

    const res = await api.post(`/api/profiles/user/${userId}`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  }

  async updateProfile(profileId: number | string, payload: ProfilePayload, photo?: File): Promise<any> {
    const form = new FormData();
    if (payload.identification) form.append("identification", payload.identification);
    if (payload.phone) form.append("phone", payload.phone);
    if (photo) form.append("photo", photo);

    const res = await api.put(`/api/profiles/${profileId}`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  }

  async deleteProfile(profileId: number | string): Promise<void> {
    await api.delete(`/api/profiles/${profileId}`);
  }
}

export const profileService = new ProfileService();
