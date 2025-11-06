import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Button, Card, Form, Container, Spinner } from "react-bootstrap";
import Breadcrumb from "../../components/Breadcrumb";
import { deviceService } from "../../services/DeviceService";
import { Device } from "../../models/Device";

const UpdateDevice: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [device, setDevice] = useState<Partial<Device> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchDevice(Number(id));
  }, [id]);

  const fetchDevice = async (deviceId: number) => {
    try {
      const res = await deviceService.getDeviceById(deviceId);
      setDevice(res);
    } catch (error) {
      console.error("Error al obtener dispositivo:", error);
      Swal.fire("Error", "No fue posible cargar el dispositivo.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDevice((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !device) return;

    try {
      await deviceService.updateDevice(Number(id), device);
      await Swal.fire({
        title: "Éxito",
        text: "Dispositivo actualizado correctamente.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate(`/devices/list`);
    } catch (error) {
      console.error("Error actualizando dispositivo:", error);
      Swal.fire("Error", "No fue posible actualizar el dispositivo.", "error");
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <Spinner animation="border" variant="success" />
      </div>
    );
  }

  if (!device) {
    return (
      <div className="text-center py-5 text-danger">
        No se encontró el dispositivo.
      </div>
    );
  }

  return (
    <Container className="py-4">
      <Breadcrumb pageName="Editar Dispositivo" />
      <Card className="shadow-lg border-0">
        <Card.Body>
          <h2 className="text-success mb-4 text-center">Editar Dispositivo</h2>

          <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del dispositivo</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={device.name || ""}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Dirección IP</Form.Label>
              <Form.Control
                type="text"
                name="ip"
                value={device.ip || ""}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Sistema Operativo</Form.Label>
              <Form.Control
                type="text"
                name="operating_system"
                value={device.operating_system || ""}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="d-flex justify-content-between">
              <Button variant="secondary" onClick={() => navigate(`/devices/list`)}>
                ← Volver
              </Button>
              <Button variant="success" type="submit">
                💾 Actualizar
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UpdateDevice;
