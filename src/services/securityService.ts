// src/services/securityService.ts
import api from "../interceptors/axiosInterceptor";
import type { User } from "../models/User";
import { store } from "../store/store";
import { setUser } from "../store/userSlice";

// Esta clase maneja toda la parte de seguridad y autenticación.
// Aquí se controlan los tokens, el login (con OAuth),
// y se sincroniza la información del usuario con localStorage y Redux.
class SecurityService extends EventTarget {

  // Clave usada para guardar el token en localStorage.
  private readonly KEY = "token";


  // Objeto que guarda los datos del usuario.
  private user: Partial<User> = {};

  // URL base del backend (tomada desde el archivo .env).
  private readonly API_URL = import.meta.env.VITE_API_URL || "";

  constructor() {
    super(); // Llama al constructor de EventTarget.
    // Cuando se crea la clase, intenta leer el usuario/cliente desde localStorage.
    const raw = localStorage.getItem("user");
    if (raw) {
      try {
        // Si hay datos guardados, se convierten de texto a objeto JSON.
        this.user = JSON.parse(raw) as Partial<User>;
      } catch {
        // Si ocurre un error al parsear, se reinicia el usuario.
        this.user = {};
      }
    }
  }

  /**
   * Login con Google (OAuth)
   * Envía el idToken de Firebase al backend /login/google
   */
  async loginWithGoogle(idToken: string) {
    // Login OAuth Google: POST /login/google
    return await this._loginWithOAuth(idToken, "google");
  }

  // Inicia sesión con GitHub (OAuth).
  async loginWithGitHub(idToken: string) {
    // Login OAuth GitHub: POST /login/github
    return await this._loginWithOAuth(idToken, "github");
  }

  /**
   * Login con Microsoft (OAuth)
   * Envía el idToken de Firebase al backend /login/microsoft
   */
  async loginWithMicrosoft(idToken: string) {
    // Login OAuth Microsoft: POST /login/microsoft
    return await this._loginWithOAuth(idToken, "microsoft");
  }

  // -------------------------------------------------------------
  // Función privada usada por loginWithGoogle y loginWithGitHub.
  // Envía el idToken al backend para validar la sesión.
  private async _loginWithOAuth(idToken: string, provider: string) {
    // Método común para /login/{provider}
    try {
      console.log(`Enviando ID token de ${provider} al backend...`);

      const response = await api.post(`/login/${provider}`, { idToken });
      const data = response.data;
      const backendUser = data?.user ?? null;
      const token = data?.token ?? null;

      if (token) this.setToken(token);
      if (backendUser) this.setUserLocal(backendUser);

      console.log(`Login con ${provider} validado en backend:`, data);
      return data;
    } catch (error) {
      console.error(`Error durante login con ${provider}:`, error);
      throw error;
    }
  }

  // -------------------------------------------------------------
  // Guarda o elimina el token en localStorage.
  // Además, lanza un evento para avisar que el token cambió.
  setToken(token: string | null) {
    if (!token) {
      localStorage.removeItem(this.KEY);
    } else {
      localStorage.setItem(this.KEY, token);
    }
    this.dispatchEvent(new CustomEvent("tokenChange", { detail: token }));
  }

  // -------------------------------------------------------------
  // Guarda la información del usuario localmente y en Redux.
  // También lanza un evento para avisar que el usuario cambió.
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

  // -------------------------------------------------------------
  // Devuelve el token actual guardado en localStorage.
  getToken(): string | null {
    return localStorage.getItem(this.KEY);
  }

  // Devuelve los datos del usuario guardado en memoria o en localStorage.
  getUser(): Partial<User> | null {
    const raw = localStorage.getItem("user");
    if (!raw) return this.user || null;
    try {
      return JSON.parse(raw) as Partial<User>;
    } catch {
      return this.user || null;
    }
  }

  // -------------------------------------------------------------
  // Cierra la sesión del usuario.
  // Elimina token, datos del usuario y actualiza Redux.
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

// Se exporta una instancia lista para usar en toda la aplicación.
export default new SecurityService();
