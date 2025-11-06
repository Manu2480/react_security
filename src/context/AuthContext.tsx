// src/context/AuthContext.tsx
// -----------------------------------------------------------------------------
// Contexto global de autenticación con Firebase y proveedores externos.
// Administra el login, logout y persistencia del usuario y token.
// -----------------------------------------------------------------------------

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  getIdToken,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { auth, googleProvider, githubProvider, microsoftProvider } from "../firebaseConfig";
import SecurityService from "../services/securityService";
import { User } from "../models/User";
import { ClientUser, AuthContextType } from "../models/Auth";

// -----------------------------------------------------------------------------
// Creación del contexto con valores iniciales
// -----------------------------------------------------------------------------
const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  loading: true,
  loginWithGoogle: async () => {},
  loginWithGitHub: async () => {},
  loginWithMicrosoft: async () => {},
  logout: async () => {},
});

// Hook personalizado para acceder al contexto de autenticación
export const useAuth = () => useContext(AuthContext);

// -----------------------------------------------------------------------------
// AuthProvider: componente que envuelve toda la aplicación y gestiona la autenticación
// -----------------------------------------------------------------------------
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<ClientUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Escucha los cambios en el estado de autenticación (login/logout)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Si hay un usuario autenticado, se obtiene su token de Firebase
        const idToken = await getIdToken(firebaseUser, true);

        // Se construye un objeto de usuario simplificado
        const minimalUser: ClientUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email ?? undefined,
          displayName: firebaseUser.displayName ?? undefined,
          photoURL: firebaseUser.photoURL ?? undefined,
        };

        // Se actualiza el estado local
        setUser(minimalUser);
        setToken(idToken);

        // Se guarda la información en el servicio de seguridad (localStorage)
        SecurityService.setToken(idToken);
        SecurityService.setUserLocal(minimalUser as unknown as Partial<User>);

        console.log("Usuario autenticado desde Firebase:", firebaseUser);
      } else {
        // Si no hay usuario autenticado
        console.log("Usuario cerró sesión o no está autenticado.");
        setUser(null);
        setToken(null);
        SecurityService.logout();
      }
      setLoading(false);
    });

    // Se cancela la suscripción al desmontar el componente
    return () => unsubscribe();
  }, []);

  // ---------------------------------------------------------------------------
  // Login con Google
  // ---------------------------------------------------------------------------
  const loginWithGoogle = async () => {
    // Login OAuth Google → luego SecurityService.setToken/setUserLocal
    const result = await signInWithPopup(auth, googleProvider);
    const idToken = await result.user.getIdToken();

    const minimalUser: ClientUser = {
      uid: result.user.uid,
      email: result.user.email ?? undefined,
      displayName: result.user.displayName ?? undefined,
      photoURL: result.user.photoURL ?? undefined,
    };

    setUser(minimalUser);
    setToken(idToken);
    SecurityService.setToken(idToken);
    SecurityService.setUserLocal(minimalUser as unknown as Partial<User>);

    console.log("Login con Google exitoso:", result.user);
  };

  // ---------------------------------------------------------------------------
  // Login con GitHub
  // ---------------------------------------------------------------------------
  const loginWithGitHub = async () => {
    // Login OAuth GitHub → procesa idToken
    const result = await signInWithPopup(auth, githubProvider);
    const idToken = await result.user.getIdToken();

    const minimalUser: ClientUser = {
      uid: result.user.uid,
      email: result.user.email ?? undefined,
      displayName: result.user.displayName ?? undefined,
      photoURL: result.user.photoURL ?? undefined,
    };

    setUser(minimalUser);
    setToken(idToken);
    SecurityService.setToken(idToken);
    SecurityService.setUserLocal(minimalUser as unknown as Partial<User>);

    console.log("Login con GitHub exitoso:", result.user);
  };

  // ---------------------------------------------------------------------------
  // Login con Microsoft
  // ---------------------------------------------------------------------------
  const loginWithMicrosoft = async () => {
    // Login OAuth Microsoft → usa microsoftProvider (firebaseConfig)
    // Backend posteriormente valida vía SecurityService._loginWithOAuth("/login/microsoft")
    try {
      const result = await signInWithPopup(auth, microsoftProvider);
      const idToken = await result.user.getIdToken();

      const minimalUser: ClientUser = {
        uid: result.user.uid,
        email: result.user.email ?? undefined,
        displayName: result.user.displayName ?? undefined,
        photoURL: result.user.photoURL ?? undefined,
      };

      setUser(minimalUser);
      setToken(idToken);
      SecurityService.setToken(idToken);
      SecurityService.setUserLocal(minimalUser as unknown as Partial<User>);

      console.log("Login con Microsoft exitoso:", result.user.email);
    } catch (error: any) {
      // Este error ocurre cuando el correo ya está registrado con otro proveedor
      if (error.code === "auth/account-exists-with-different-credential") {
        const email = error.customData?.email;
        if (email) {
          const methods = await fetchSignInMethodsForEmail(auth, email);
          alert(
            `La cuenta ${email} ya está registrada con otro método: ${methods.join(
              ", "
            )}. Inicia sesión con ese proveedor.`
          );
        } else {
          alert("Esta cuenta ya existe con otro método de autenticación.");
        }
      } else {
        console.error("Error en login con Microsoft:", error);
        alert("Error al iniciar sesión con Microsoft. Intenta de nuevo.");
      }
    }
  };

  // ---------------------------------------------------------------------------
  // Logout general
  // ---------------------------------------------------------------------------
  const logout = async () => {
    console.log("Cerrando sesión...");
    await signOut(auth);
    setUser(null);
    setToken(null);
    SecurityService.logout();
  };

  // ---------------------------------------------------------------------------
  // Retorno del contexto con las funciones y estados disponibles
  // ---------------------------------------------------------------------------
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        loginWithGoogle,
        loginWithGitHub,
        loginWithMicrosoft,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
