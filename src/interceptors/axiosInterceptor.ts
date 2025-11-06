// src/services/axiosInterceptor.ts
import axios from "axios";
import SecurityService from "../services/securityService";

// Este archivo configura Axios para que todas las peticiones HTTP
// tengan la misma base URL, envíen automáticamente el token si existe,
// y manejen errores globales como los de autenticación (401).

// En desarrollo usamos una URL base vacía para que el proxy de Vite maneje las peticiones.
// En producción se usa la URL definida en el archivo .env con la variable VITE_API_URL.
const base = import.meta.env.MODE === "development" ? "" : import.meta.env.VITE_API_URL;

// Se crea una instancia personalizada de Axios.
// Esto permite configurar encabezados y comportamiento global.
const api = axios.create({
	baseURL: base,
	headers: {
		"Content-Type": "application/json", // Todas las peticiones enviarán JSON por defecto.
	},
});

// -------------------------------------------------------------
// Interceptor de solicitud (request):
// Este bloque se ejecuta antes de que cada petición salga al servidor.
// Aquí se agrega el token de autenticación si está disponible.
api.interceptors.request.use(
	(config) => {
		const token = SecurityService.getToken(); // Obtiene el token guardado.

		if (token) {
			// Si existe el token, se asegura de que los headers estén definidos.
			config.headers = config.headers || {};
			// Se agrega el token al header Authorization.
			config.headers.Authorization = `Bearer ${token}`;
			// Mensaje de depuración para confirmar que se está enviando el token.
			console.log("Enviando request con token:", token.substring(0, 20) + "...");
		} else {
			// Si no hay token, se avisa que la petición se enviará sin autenticación.
			console.warn("No hay token disponible, la petición se enviará sin autenticación.");
		}

		return config; // Devuelve la configuración para continuar con la solicitud.
	},
	(error) => {
		// Si ocurre un error antes de enviar la solicitud.
		console.error("Error en configuración de la solicitud:", error);
		return Promise.reject(error);
	}
);

// -------------------------------------------------------------
// Interceptor de respuesta (response):
// Este bloque se ejecuta cuando se recibe una respuesta del servidor.
// Sirve para manejar errores globales, como un token expirado o falta de conexión.
api.interceptors.response.use(
	(response) => response, // Si la respuesta es correcta, simplemente se devuelve.
	(error) => {
		if (error.response) {
			// Si el servidor respondió con un código de error HTTP.
			const { status } = error.response;

			if (status === 401) {
				// Si el error es 401, significa que el token es inválido o expiró.
				console.warn("Token inválido o expirado. Cerrando sesión...");
				SecurityService.logout(); // Se cierra sesión automáticamente.

			} else {
				// Otros errores HTTP (como 404, 500, etc.)
				console.error(`Error HTTP ${status}:`, error.response.data);
			}
		} else if (error.request) {
			// Si no se recibió respuesta del servidor.
			console.error("No se recibió respuesta del servidor:", error.request);
		} else {
			// Si hubo un error antes de enviar la solicitud.
			console.error("Error en la configuración de Axios:", error.message);
		}

		// Se rechaza el error para que el componente que hizo la petición lo maneje si lo necesita.
		return Promise.reject(error);
	}
);

// Exportamos la instancia configurada de Axios para usarla en toda la aplicación.
export default api;
