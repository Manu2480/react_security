import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import GenericTable from "../../components/Table/GenericTable";
import { sessionService } from "../../services/sessionService";

interface Props {
  userId: number;
  userName?: string;
  onClose: () => void;
  onChanged?: () => void;
}

const SessionsModal: React.FC<Props> = ({ userId, userName, onClose, onChanged }) => {
  const [sessions, setSessions] = useState<any[]>([]);
  const [creating, setCreating] = useState(false);
  const [expiration, setExpiration] = useState<string>("");
  const [FACode, setFACode] = useState<string>("");
  const [expirationValid, setExpirationValid] = useState<boolean>(true);

  useEffect(() => {
    fetchSessions();
  }, [userId]);

  const fetchSessions = async () => {
    try {
      const data = await sessionService.getSessionsByUser(userId);
      setSessions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching sessions:", error);
      Swal.fire("Error", "No fue posible obtener las sesiones.", "error");
    }
  };

  const validateExpiration = (value: string) => {
    if (!value) {
      setExpirationValid(true);
      return true;
    }
    // value comes from input type datetime-local: 'YYYY-MM-DDTHH:mm'
    const s = value.replace("T", " ");
    const date = new Date(s);
    const now = new Date();
    const valid = date > now;
    setExpirationValid(valid);
    return valid;
  };

  const formatExpirationForBackend = (value: string) => {
    if (!value) return value;
    // value comes from datetime-local input like 'YYYY-MM-DDTHH:mm' or 'YYYY-MM-DDTHH:mm:ss'
    let s = value.replace('T', ' ');
    // If seconds missing, append :00
    if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(s)) {
      s = s + ':00';
    }
    return s;
  };

  const handleDelete = async (item: any) => {
    const result = await Swal.fire({
      title: "Revocar sesión",
      text: "¿Desea revocar esta sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, revocar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      await sessionService.deleteSession(item.id);
      Swal.fire("Revocado", "Sesión revocada correctamente", "success");
      fetchSessions();
      onChanged && onChanged();
    } catch (error) {
      console.error("Error deleting session:", error);
      Swal.fire("Error", "No fue posible revocar la sesión.", "error");
    }
  };

  const handleCreate = async () => {
    setCreating(true);
    try {
      const payload: any = {};
      if (expiration) {
        // validate client-side first
        if (!validateExpiration(expiration)) {
          Swal.fire("Fecha inválida", "La expiración debe ser una fecha futura.", "warning");
          setCreating(false);
          return;
        }
        // backend expects "YYYY-MM-DD HH:mm:ss"
        payload.expiration = formatExpirationForBackend(expiration);
      }
      if (FACode) payload.FACode = FACode;
      await sessionService.createSession(userId, payload);
      Swal.fire("Creada", "Sesión creada correctamente", "success");
      setExpiration("");
      setFACode("");
      fetchSessions();
      onChanged && onChanged();
    } catch (error) {
      console.error("Error creating session:", error);
      const err: any = error as any;
      const msg = (err && (err.response?.data?.error || err.message)) || "No fue posible crear la sesión.";
      Swal.fire("Error", msg, "error");
    } finally {
      setCreating(false);
    }
  };

  const handleAction = (action: string, item: any) => {
    if (action === "delete") handleDelete(item);
  };

  const formattedSessions = sessions.map((s) => {
    const copy: any = { ...s };
    // normalize expiration to readable string
    if (copy.expiration) {
      try {
        // backend may return ISO string or already formatted
        const d = new Date(copy.expiration);
        if (!isNaN(d.getTime())) {
          copy.expiration = d.toLocaleString();
        }
      } catch (e) {
        // leave as-is
      }
    }
    return copy;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded shadow-lg w-11/12 max-w-3xl p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Sesiones de {userName ?? userId}</h3>
          <div>
            <button
              className="mr-2 bg-gray-200 px-3 py-1 rounded"
              onClick={() => {
                onClose();
              }}
            >
              Cerrar
            </button>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex gap-2 items-end">
            <div>
              <label className="block text-sm text-gray-600">Expiración</label>
              <input
                type="datetime-local"
                value={expiration}
                onChange={(e) => setExpiration(e.target.value)}
                className="border rounded px-2 py-1"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">FACode (opc.)</label>
              <input
                type="text"
                value={FACode}
                onChange={(e) => setFACode(e.target.value)}
                className="border rounded px-2 py-1"
              />
            </div>
            <div>
              <button
                onClick={handleCreate}
                disabled={creating || !expirationValid}
                className="bg-primary text-white px-3 py-1 rounded"
              >
                {creating ? "Creando..." : "Crear sesión"}
              </button>
            </div>
          </div>
        </div>
        {!expirationValid && (
          <div className="mb-4 text-sm text-red-600">La expiración debe ser una fecha futura.</div>
        )}

        <div>
          <GenericTable
            data={formattedSessions}
            columns={["id", "token", "expiration", "FACode", "state", "created_at"]}
            actions={[{ name: "delete", label: "Revocar" }]}
            onAction={handleAction}
          />
        </div>
      </div>
    </div>
  );
};

export default SessionsModal;
