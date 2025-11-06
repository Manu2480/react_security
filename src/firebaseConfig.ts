// src/firebaseConfig.ts
// -----------------------------------------------------------------------------
// Este archivo configura Firebase y define los proveedores de autenticación.
// -----------------------------------------------------------------------------

import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  OAuthProvider,
} from "firebase/auth";

// Configuración del proyecto Firebase (datos del dashboard)
const firebaseConfig = {
  apiKey: "AIzaSyBiFL4itZPllT1LHJ5waFQVyqKtZ1CPP2A",
  authDomain: "security-2025-02.firebaseapp.com",
  projectId: "security-2025-02",
  storageBucket: "security-2025-02.firebasestorage.app",
  messagingSenderId: "675694347977",
  appId: "1:675694347977:web:2b39e2f8740ec17761af18",
  measurementId: "G-KNWTQS3NEN",
};

// Inicializamos Firebase una sola vez
const app = initializeApp(firebaseConfig);

// Obtenemos la instancia de autenticación
const auth = getAuth(app);

// Creamos los proveedores que vamos a usar (Google, GitHub, Microsoft)
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const microsoftProvider = new OAuthProvider("microsoft.com"); // ← Proveedor Microsoft usado en AuthContext

// Exportamos para poder usarlos en otros archivos (AuthContext)
export { auth, googleProvider, githubProvider, microsoftProvider };
