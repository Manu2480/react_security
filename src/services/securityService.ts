// src/services/securityService.ts
import api from "../interceptors/axiosInterceptor";
import type { User } from "../models/User";
import { store } from "../store/store";
import { setUser } from "../store/userSlice";

/**
 * SecurityService
 * - Centraliza manejo de token y usuario en localStorage.
 * - Permite login normal y login OAuth (Google/GitHub) con backend.
 * - Diseñado para coexistir con autenticación de Firebase sin conflictos.
 */
class SecurityService extends EventTarget {
  private readonly KEY = "token";
  private user: Partial<User> = {};
  private readonly API_URL = import.meta.env.VITE_API_URL || "";

  constructor() {
    super();
    const raw = localStorage.getItem("user");
    if (raw) {
      try {
        this.user = JSON.parse(raw) as Partial<User>;
      } catch {
        this.user = {};
      }
    }
  }

  /**
   * 🔹 Login clásico (usuario y contraseña)
   */
  async login(payload: { email?: string; password?: string }) {
    // Login clásico: POST /login
    const res = await api.post("/login", payload, {
      headers: { "Content-Type": "application/json" },
    });
    const data = res.data;
    const backendUser = data?.user ?? null;
    const token = data?.token ?? null;

    if (token) this.setToken(token);
    if (backendUser) this.setUserLocal(backendUser);

    return data;
  }

  /**
   * 🔹 Login con Google (OAuth)
   * Envía el idToken de Firebase al backend /login/google
   */
  async loginWithGoogle(idToken: string) {
    // Login OAuth Google: POST /login/google
    return await this._loginWithOAuth(idToken, "google");
  }

  /**
   * 🔹 Login con GitHub (OAuth)
   * Envía el idToken de Firebase al backend /login/github
   */
  async loginWithGitHub(idToken: string) {
    // Login OAuth GitHub: POST /login/github
    return await this._loginWithOAuth(idToken, "github");
  }

  /**
   * 🔹 Login con Microsoft (OAuth)
   * Envía el idToken de Firebase al backend /login/microsoft
   */
  async loginWithMicrosoft(idToken: string) {
    // Login OAuth Microsoft: POST /login/microsoft
    return await this._loginWithOAuth(idToken, "microsoft");
  }

  /**
   * 🔸 Función privada reutilizada para ambos proveedores OAuth
   */
  private async _loginWithOAuth(idToken: string, provider: string) {
    // Método común para /login/{provider}
    try {
      console.log(`📡 Enviando ID token de ${provider} al backend...`);
      const response = await api.post(`/login/${provider}`, { idToken });

      const data = response.data;
      const backendUser = data?.user ?? null;
      const token = data?.token ?? null;

      if (token) this.setToken(token);
      if (backendUser) this.setUserLocal(backendUser);

      console.log(`✅ Login con ${provider} validado en backend:`, data);
      return data;
    } catch (error) {
      console.error(`❌ Error durante login con ${provider}:`, error);
      throw error;
    }
  }

  // ===================================================================

  setToken(token: string | null) {
    if (!token) {
      localStorage.removeItem(this.KEY);
    } else {
      localStorage.setItem(this.KEY, token);
    }
    this.dispatchEvent(new CustomEvent("tokenChange", { detail: token }));
  }

  setUserLocal(u: Partial<User> | null) {
    if (u) {
      try {
        localStorage.setItem("user", JSON.stringify(u));
        this.user = u;
      } catch {
        this.user = u;
      }
    } else {
      localStorage.removeItem("user");
      this.user = {};
    }

    try {
      store.dispatch(setUser((u as unknown as User) ?? null));
    } catch {}

    this.dispatchEvent(new CustomEvent("userChange", { detail: u }));
  }

  getToken(): string | null {
    return localStorage.getItem(this.KEY);
  }

  getUser(): Partial<User> | null {
    const raw = localStorage.getItem("user");
    if (!raw) return this.user || null;
    try {
      return JSON.parse(raw) as Partial<User>;
    } catch {
      return this.user || null;
    }
  }

  logout() {
    try {
      localStorage.removeItem(this.KEY);
      localStorage.removeItem("user");
    } catch {}
    this.user = {};
    try {
      store.dispatch(setUser(null));
    } catch {}
    this.dispatchEvent(new CustomEvent("userChange", { detail: null }));
  }
}

export default new SecurityService();
