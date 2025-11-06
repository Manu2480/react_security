// src/App.tsx
// -----------------------------------------------------------------------------
// Punto de entrada principal de la aplicación React.
// Configura las rutas, el manejo de carga inicial y la protección de rutas.
// También integra el sistema de notificaciones y la carga diferida (lazy loading).
// -----------------------------------------------------------------------------

import { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

import ListUsers from "./pages/Users/ListUser";
import SignIn from "./pages/Authentication/SignIn";
import SignUp from "./pages/Authentication/SignUp";
import Loader from "./common/Loader";
import routes from "./routes";

// Carga diferida del layout principal. Solo se carga cuando se necesita.
const DefaultLayout = lazy(() => import("./layout/DefaultLayout"));

function App() {
  // Estado de carga inicial (se muestra un loader breve al iniciar la app).
  const [loading, setLoading] = useState<boolean>(true);

  // Simula una carga inicial. Esto puede representar la preparación de datos o configuraciones.
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // Si la aplicación aún está cargando, muestra el componente Loader.
  if (loading) {
    return <Loader />;
  }

  // Cuando la carga inicial termina, se renderizan las rutas principales.
  return (
    <>
      {/* Componente de notificaciones globales. */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />

      {/* Configuración de las rutas de la aplicación. */}
      <Routes>
        {/* Rutas públicas: login y registro */}
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />

        {/* Rutas protegidas: requieren usuario autenticado */}
        <Route element={<ProtectedRoute />}>
          {/* Layout principal (sidebar, header, etc.) */}
          <Route element={<DefaultLayout />}>
            {/* Página principal: lista de usuarios */}
            <Route index element={<ListUsers />} />

            {/* Rutas adicionales definidas en el archivo routes.ts */}
            {routes.map((route, index) => {
              const { path, component: Component } = route;
              return (
                <Route
                  key={index}
                  path={path}
                  element={
                    // Suspense permite mostrar un loader mientras se carga un componente de forma diferida.
                    <Suspense fallback={<Loader />}>
                      <Component />
                    </Suspense>
                  }
                />
              );
            })}
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
