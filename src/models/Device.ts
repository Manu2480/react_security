export interface Device {
  id: number;
  user_id: number;
  name: string;
  ip: string;
  operating_system?: string;
  created_at?: string;
  updated_at?: string;
}
