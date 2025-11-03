import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // 👈 ajusta la ruta si es distinta
import Loader from "../../common/Loader"; // 👈 o el spinner que uses

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  // 🕒 Mientras se verifica el estado de autenticación
  if (loading) {
    return <Loader />; // o un simple <div>Cargando...</div>
  }

  // 🔒 Si no hay usuario autenticado, redirige al login
  if (!user) {
    return <Navigate to="/auth/signin" replace />;
  }

  // ✅ Si hay usuario, permite acceso a la ruta protegida
  return <Outlet />;
};

export default ProtectedRoute;
