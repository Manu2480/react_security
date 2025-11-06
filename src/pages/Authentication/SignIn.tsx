// src/pages/auth/SignIn.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Este componente muestra una pantalla de inicio de sesión
// donde el usuario puede autenticarse usando Google, GitHub o Microsoft.

const SignIn: React.FC = () => {
  // Extraemos las funciones de login del contexto de autenticación.
  // Estas funciones ya están configuradas para conectarse con Firebase o el backend.
  const { loginWithGoogle, loginWithGitHub, loginWithMicrosoft } = useAuth();

  // Hook de React Router para redirigir al usuario después del login.
  const navigate = useNavigate();

  // Estados locales para manejar el efecto hover de cada botón.
  const [hoverGoogle, setHoverGoogle] = useState(false);
  const [hoverGitHub, setHoverGitHub] = useState(false);
  const [hoverMicrosoft, setHoverMicrosoft] = useState(false);

  // Colores que se aplican al pasar el mouse sobre los botones.
  const googleBg = "rgba(244,180,0,0.9)"; // Amarillo Google (#F4B400)
  const githubBg = "rgba(52,168,83,0.9)"; // Verde GitHub (#34A853)
  const microsoftBg = "rgba(0,120,212,0.9)"; // Azul Microsoft (#0078D4)

  // Función para iniciar sesión con Google.
  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle(); // Llama la función de login de Google.
      navigate("/"); // Redirige al home al iniciar sesión correctamente.
    } catch {
      alert("Error al iniciar sesión con Google.");
    }
  };

  // Función para iniciar sesión con GitHub.
  const handleGitHubLogin = async () => {
    try {
      await loginWithGitHub();
      navigate("/");
    } catch {
      alert("Error al iniciar sesión con GitHub.");
    }
  };

  // Función para iniciar sesión con Microsoft.
  const handleMicrosoftLogin = async () => {
    try {
      await loginWithMicrosoft();
      navigate("/");
    } catch {
      alert("Error al iniciar sesión con Microsoft.");
    }
  };

  return (
    // Contenedor principal centrado en pantalla con fondo degradado.
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-4">
      {/* Tarjeta de login */}
      <div className="w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl rounded-2xl overflow-hidden flex flex-col items-center justify-center p-10">
        {/* Título */}
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white text-center mb-8">
          Inicia Sesión
        </h2>

        {/* Contenedor de botones sociales */}
        <div className="flex flex-col gap-4 w-full">
          {/* BOTÓN GOOGLE */}
          <button
            onClick={handleGoogleLogin}
            onMouseEnter={() => setHoverGoogle(true)} // Activa el hover
            onMouseLeave={() => setHoverGoogle(false)} // Desactiva el hover
            style={{
              backgroundColor: hoverGoogle ? googleBg : "#ffffff",
              transition: "background-color 180ms ease",
            }}
            className="flex items-center justify-center gap-3 w-full border border-gray-300 rounded-lg py-2"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              width={22}
            />
            <span className="font-medium text-gray-700">
              Continuar con Google
            </span>
          </button>

          {/* BOTÓN GITHUB */}
          <button
            onClick={handleGitHubLogin}
            onMouseEnter={() => setHoverGitHub(true)}
            onMouseLeave={() => setHoverGitHub(false)}
            style={{
              backgroundColor: hoverGitHub ? githubBg : "#ffffff",
              transition: "background-color 180ms ease",
            }}
            className="flex items-center justify-center gap-3 w-full border border-gray-300 rounded-lg py-2"
          >
            <img
              src="https://www.svgrepo.com/show/475654/github-color.svg"
              alt="GitHub"
              width={22}
            />
            <span className="font-medium text-gray-700">
              Continuar con GitHub
            </span>
          </button>

          {/* BOTÓN MICROSOFT */}
          <button
            onClick={handleMicrosoftLogin}
            onMouseEnter={() => setHoverMicrosoft(true)}
            onMouseLeave={() => setHoverMicrosoft(false)}
            style={{
              backgroundColor: hoverMicrosoft ? microsoftBg : "#ffffff",
              transition: "background-color 180ms ease",
            }}
            className="flex items-center justify-center gap-3 w-full border border-gray-300 rounded-lg py-2"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
              alt="Microsoft"
              width={22}
            />
            <span className="font-medium text-gray-700">
              Continuar con Microsoft
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
