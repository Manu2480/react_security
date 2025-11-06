export interface DigitalSignature {
  id: number;
  user_id: number;
  photo: string; // URL o path de la imagen de la firma
  created_at?: string;
  updated_at?: string;
}
