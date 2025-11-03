// src/services/axiosInterceptor.ts
import axios from "axios";
import SecurityService from "../services/securityService";

/**
 * axiosInterceptor
 * Configura axios para:
 *  - Leer la URL base desde VITE_API_URL (.env)
 *  - Inyectar automáticamente el token de Firebase (o backend)
 *  - Manejar errores 401 globalmente
 */

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ejemplo: http://localhost:5000
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Interceptor de solicitud: agrega token si existe
api.interceptors.request.use(
  (config) => {
    const token = SecurityService.getToken();

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
      // para depuración:
      console.log("🛰️ Enviando request con token:", token.substring(0, 20) + "...");
    } else {
      console.warn("⚠️ No hay token disponible, se enviará sin autenticación.");
    }

    return config;
  },
  (error) => {
    console.error("❌ Error en configuración de la solicitud:", error);
    return Promise.reject(error);
  }
);

// ✅ Interceptor de respuesta: maneja errores globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        console.warn("🔒 Token inválido o expirado. Cerrando sesión...");
        SecurityService.logout();
        // podrías redirigir al login si usas React Router:
        // window.location.href = "/login";
      } else {
        console.error(`❌ Error HTTP ${status}:`, error.response.data);
      }
    } else if (error.request) {
      console.error("🚨 No se recibió respuesta del servidor:", error.request);
    } else {
      console.error("⚙️ Error en la configuración de Axios:", error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
