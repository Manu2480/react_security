import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { profileService } from "../../services/profileService";

interface Props {
  userId: number;
  userName?: string;
  onClose: () => void;
  onSaved?: () => void;
}

const ProfileModal: React.FC<Props> = ({ userId, userName, onClose, onSaved }) => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<any | null>(null);
  const [identification, setIdentification] = useState("");
  const [phone, setPhone] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await profileService.getProfileByUser(userId);
        setProfile(data);
        setIdentification(data?.identification || "");
        setPhone(data?.phone || "");
      } catch (err) {
        // no profile yet — that's ok
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [userId]);

  // Cuando cambie el profile, resolver la URL de la foto consultando el backend
  useEffect(() => {
    const resolvePhoto = async () => {
      if (!profile?.photo) {
        setPhotoUrl(null);
        return;
      }
      const raw = String(profile.photo);
      // Si ya es URL absoluta, usarla directamente
      if (/^https?:\/\//i.test(raw)) {
        setPhotoUrl(raw);
        return;
      }
      // Construir la URL esperada en el backend
      const parts = raw.split("/");
      const filename = parts.length ? parts[parts.length - 1] : raw;
      const base = import.meta.env.VITE_API_URL || "";
      const candidate = `${base}/api/profiles/${encodeURIComponent(filename)}`;
      // Intentar verificar con HEAD que la ruta existe en backend
      try {
        const resp = await fetch(candidate, { method: "HEAD" });
        if (resp.ok) {
          setPhotoUrl(candidate);
          return;
        }
      } catch (e) {
        // ignore, fallback below
      }
      // Fallback: usar la ruta construida aunque la verificación falló
      setPhotoUrl(candidate);
    };
    resolvePhoto();
  }, [profile]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setPhotoFile(e.target.files[0]);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      if (profile && profile.id) {
        await profileService.updateProfile(profile.id, { identification, phone }, photoFile || undefined);
        Swal.fire("Éxito", "Perfil actualizado", "success");
      } else {
        await profileService.createProfile(userId, { identification, phone }, photoFile || undefined);
        Swal.fire("Éxito", "Perfil creado", "success");
      }
      onSaved && onSaved();
      onClose();
    } catch (error: any) {
      console.error("Error profile save:", error);
      Swal.fire("Error", error?.response?.data?.error || "No se pudo guardar el perfil", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-40" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-lg p-6 z-10 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-3">Perfil de {userName || userId}</h3>

        {loading ? (
          <p>Cargando...</p>
        ) : (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium">Identificación</label>
              <input
                className="w-full border rounded p-2"
                value={identification}
                onChange={(e) => setIdentification(e.target.value)}
                placeholder="Número de identificación"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Teléfono</label>
              <input
                className="w-full border rounded p-2"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+56 9 1234 5678"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Foto</label>
              <input type="file" accept="image/*" onChange={handleFile} />
              {photoUrl && (
                <div className="mt-2">
                  <img src={photoUrl} alt="profile" className="h-24 w-24 object-cover rounded" />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button onClick={onClose} className="px-4 py-2 rounded border">Cancelar</button>
              <button onClick={handleSave} className="px-4 py-2 rounded bg-primary text-white" disabled={loading}>
                {profile ? "Actualizar" : "Crear"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileModal;
