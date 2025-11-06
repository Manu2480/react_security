// src/firebaseConfig.ts
// -----------------------------------------------------------------------------
// Este archivo configura Firebase y define los proveedores de autenticación
// (Google, GitHub y Microsoft) para que puedan ser usados en toda la app.
// -----------------------------------------------------------------------------

import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  OAuthProvider,
} from "firebase/auth";

// -----------------------------------------------------------------------------
// Configuración de Firebase
// Estos valores se obtienen desde el panel de Firebase (Project Settings).
// Son necesarios para conectar nuestra aplicación con el proyecto Firebase.
// -----------------------------------------------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyBiFL4itZPllT1LHJ5waFQVyqKtZ1CPP2A",
  authDomain: "security-2025-02.firebaseapp.com",
  projectId: "security-2025-02",
  storageBucket: "security-2025-02.firebasestorage.app",
  messagingSenderId: "675694347977",
  appId: "1:675694347977:web:2b39e2f8740ec17761af18",
  measurementId: "G-KNWTQS3NEN",
};

// -----------------------------------------------------------------------------
// Inicializamos Firebase
// La función initializeApp() conecta React con Firebase usando la configuración.
// -----------------------------------------------------------------------------
const app = initializeApp(firebaseConfig);

// -----------------------------------------------------------------------------
// Configuramos la autenticación
// getAuth() devuelve una instancia del servicio de autenticación de Firebase,
// que luego usamos para manejar logins, logouts, etc.
// -----------------------------------------------------------------------------
const auth = getAuth(app);

// Creamos los proveedores que vamos a usar (Google, GitHub, Microsoft)
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const microsoftProvider = new OAuthProvider("microsoft.com");

// Exportamos para poder usarlos en otros archivos (AuthContext)
export { auth, googleProvider, githubProvider, microsoftProvider };
