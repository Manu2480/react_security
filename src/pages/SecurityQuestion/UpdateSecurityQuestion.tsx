import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Button, Card, Form, Container, Spinner } from "react-bootstrap";
import Breadcrumb from "../../components/Breadcrumb";
import { digitalSignatureService } from "../../services/DigitalSignatureService";
import { DigitalSignature } from "../../models/DigitalSignature";

const UpdateDigitalSignature: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [signature, setSignature] = useState<DigitalSignature | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchSignature(Number(id));
  }, [id]);

  const fetchSignature = async (signatureId: number) => {
    try {
      const res = await digitalSignatureService.getDigitalSignatureById(signatureId);
      setSignature(res);
    } catch (error) {
      console.error("Error al obtener la firma:", error);
      Swal.fire("Error", "No fue posible cargar la firma digital.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignature((prev) => (prev ? { ...prev, photo: e.target.value } : prev));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !signature) return;

    try {
      await digitalSignatureService.updateDigitalSignature(Number(id), {
        photo: signature.photo,
      });

      await Swal.fire({
        title: "Éxito",
        text: "Firma digital actualizada correctamente.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate(`/digitalsignatures/list`);
    } catch (error) {
      Swal.fire("Error", "No fue posible actualizar la firma digital.", "error");
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <Spinner animation="border" variant="success" />
      </div>
    );
  }

  if (!signature) {
    return <div className="text-center text-danger py-5">Firma no encontrada.</div>;
  }

  return (
    <Container className="py-4">
      <Breadcrumb pageName="Editar Firma Digital" />
      <Card className="shadow-lg border-0">
        <Card.Body>
          <h2 className="text-success mb-4 text-center">Editar Firma Digital</h2>
          <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3">
              <Form.Label>URL de la imagen</Form.Label>
              <Form.Control
                type="text"
                value={signature.photo}
                onChange={handleChange}
                placeholder="https://miapp.com/uploads/firma_actualizada.png"
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-between">
              <Button variant="secondary" onClick={() => navigate(`/digitalsignatures/list`)}>
                ← Volver
              </Button>
              <Button variant="success" type="submit">
                💾 Actualizar Firma
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UpdateDigitalSignature;
