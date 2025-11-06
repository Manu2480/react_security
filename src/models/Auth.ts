// src/models/Auth.ts
export interface ClientUser {
  uid: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
}

export interface AuthContextType {
  user: ClientUser | null;
  token: string | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithGitHub: () => Promise<void>;
  loginWithMicrosoft: () => Promise<void>;
  logout: () => Promise<void>;
}
