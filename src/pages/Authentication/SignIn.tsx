import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SignIn: React.FC = () => {
  const { loginWithGoogle, loginWithGitHub, loginWithMicrosoft } = useAuth();
  const navigate = useNavigate();

  // estados de hover para cada botón
  const [hoverGoogle, setHoverGoogle] = useState(false);
  const [hoverGitHub, setHoverGitHub] = useState(false);
  const [hoverMicrosoft, setHoverMicrosoft] = useState(false);

  // colores de fondo al hacer hover
  const googleBg = "rgba(244,180,0,0.9)"; // #F4B400
  const githubBg = "rgba(52,168,83,0.9)"; // #34A853
  const microsoftBg = "rgba(0,120,212,0.9)"; // #0078D4

  // funciones de login social
  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch {
      alert("Error al iniciar sesión con Google.");
    }
  };

  const handleGitHubLogin = async () => {
    try {
      await loginWithGitHub();
      navigate("/");
    } catch {
      alert("Error al iniciar sesión con GitHub.");
    }
  };

  const handleMicrosoftLogin = async () => {
    try {
      await loginWithMicrosoft();
      navigate("/");
    } catch {
      alert("Error al iniciar sesión con Microsoft.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl rounded-2xl overflow-hidden flex flex-col items-center justify-center p-10">
        {/* Título */}
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white text-center mb-8">
          Inicia Sesión
        </h2>

        {/* Botones de autenticación social */}
        <div className="flex flex-col gap-4 w-full">
          {/* Google */}
          <button
            onClick={handleGoogleLogin}
            onMouseEnter={() => setHoverGoogle(true)}
            onMouseLeave={() => setHoverGoogle(false)}
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
            <span className="font-medium text-gray-700">Continuar con Google</span>
          </button>

          {/* GitHub */}
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
            <span className="font-medium text-gray-700">Continuar con GitHub</span>
          </button>

          {/* Microsoft */}
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
            <span className="font-medium text-gray-700">Continuar con Microsoft</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
