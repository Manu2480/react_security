// src/routes/ProtectedRoute.tsx
// -----------------------------------------------------------------------------
// Este componente protege rutas que solo deben ser accesibles por usuarios autenticados.
// Si el usuario no ha iniciado sesión, lo redirige al login.
// Si aún se está verificando el estado de autenticación, muestra un loader temporal.
// -----------------------------------------------------------------------------

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; 
import Loader from "../../common/Loader"; 

const ProtectedRoute = () => {
  // Obtenemos el estado del usuario y el indicador de carga desde el contexto de autenticación.
  const { user, loading } = useAuth();

  // Mientras se verifica si el usuario está autenticado o no, mostramos un loader.
  if (loading) {
    return <Loader />; // También se podría usar un simple <div>Cargando...</div>
  }

  // Si no hay usuario autenticado, se redirige automáticamente al login.
  if (!user) {
    return <Navigate to="/auth/signin" replace />;
  }

  // Si hay un usuario válido, se permite el acceso al contenido protegido.
  // <Outlet> representa el componente hijo de la ruta protegida.
  return <Outlet />;
};

export default ProtectedRoute;
