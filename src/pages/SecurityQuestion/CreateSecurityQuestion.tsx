import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Button, Card, Form, Container } from "react-bootstrap";
import Breadcrumb from "../../components/Breadcrumb";
import { digitalSignatureService } from "../../services/DigitalSignatureService";
import { userService } from "../../services/userService";
import { User } from "../../models/User";

/**
 * Página: Crear Firma Digital
 * Permite subir una imagen real de firma digital y asignarla a un usuario.
 */
const CreateDigitalSignature: React.FC = () => {
  const [photo, setPhoto] = useState<File | null>(null);
  const [userId, setUserId] = useState<number | "">("");
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  // Cargar los usuarios disponibles
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await userService.getUsers();
        setUsers(res);
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
        Swal.fire("Error", "No fue posible cargar los usuarios.", "error");
      }
    };
    loadUsers();
  }, []);

  // Manejar selección del archivo de imagen
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  // Enviar la firma al backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      Swal.fire("Error", "Debe seleccionar un usuario.", "warning");
      return;
    }

    if (!photo) {
      Swal.fire("Error", "Debe seleccionar una imagen de firma.", "warning");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("photo", photo);
      formData.append("user_id", String(userId));

      await digitalSignatureService.createDigitalSignature(Number(userId), formData);

      await Swal.fire({
        title: "Éxito",
        text: "Firma digital creada correctamente.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate(`/digitalsignatures/list`);
    } catch (error: any) {
      console.error("Error creando firma digital:", error);
      const message =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        "No fue posible crear la firma digital.";
      Swal.fire("Error", message, "error");
    }
  };

  return (
    <Container className="py-4">
      <Breadcrumb pageName="Crear Firma Digital" />
      <Card className="shadow-lg border-0">
        <Card.Body>
          <h2 className="text-success mb-4 text-center">Nueva Firma Digital</h2>

          <Form onSubmit={handleSubmit}>
            {/* Selección del usuario */}
            <Form.Group className="mb-3">
              <Form.Label>Usuario</Form.Label>
              <Form.Select
                value={userId}
                onChange={(e) => setUserId(Number(e.target.value))}
                required
              >
                <option value="">Seleccione un usuario...</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.email})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Subida de imagen */}
            <Form.Group className="mb-3">
              <Form.Label>Archivo de Firma Digital</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
              <Form.Text className="text-muted">
                Sube una imagen (JPG, PNG, etc.) de la firma del usuario.
              </Form.Text>
            </Form.Group>

            {/* Botones */}
            <div className="d-flex justify-content-between">
              <Button variant="secondary" onClick={() => navigate(`/digitalsignatures/list`)}>
                ← Volver
              </Button>
              <Button variant="success" type="submit">
                💾 Guardar Firma
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CreateDigitalSignature;
