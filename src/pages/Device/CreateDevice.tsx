import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Button, Card, Form, Container } from "react-bootstrap";
import Breadcrumb from "../../components/Breadcrumb";
import { deviceService } from "../../services/DeviceService";
import { Device } from "../../models/Device";

/**
 * Página: Crear Dispositivo
 * Permite crear un nuevo dispositivo asociado a un usuario específico.
 */
const CreateDevice: React.FC = () => {
  const [device, setDevice] = useState<Partial<Device>>({
    name: "",
    ip: "",
    operating_system: "",
    user_id: undefined,
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDevice((prev) => ({
      ...prev,
      [name]: name === "user_id" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!device.user_id) {
      Swal.fire("Error", "Debe ingresar el ID del usuario.", "warning");
      return;
    }

    try {
      await deviceService.createDevice(device.user_id, device);
      await Swal.fire({
        title: "Éxito",
        text: "Dispositivo creado correctamente.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate(`/devices/list`);
    } catch (error: any) {
      console.error("Error creando dispositivo:", error);
      const message =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        error?.message ||
        "No fue posible crear el dispositivo.";
      Swal.fire("Error", message, "error");
    }
  };

  return (
    <Container className="py-4">
      <Breadcrumb pageName="Crear Dispositivo" />
      <Card className="shadow-lg border-0">
        <Card.Body>
          <h2 className="text-success mb-4 text-center">Nuevo Dispositivo</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>ID del Usuario</Form.Label>
              <Form.Control
                type="number"
                name="user_id"
                value={device.user_id ?? ""}
                onChange={handleChange}
                placeholder="Ingrese el ID del usuario"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nombre del dispositivo</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={device.name}
                onChange={handleChange}
                placeholder="Ejemplo: Laptop HP"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Dirección IP</Form.Label>
              <Form.Control
                type="text"
                name="ip"
                value={device.ip}
                onChange={handleChange}
                placeholder="Ejemplo: 192.168.0.10"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Sistema Operativo</Form.Label>
              <Form.Control
                type="text"
                name="operating_system"
                value={device.operating_system}
                onChange={handleChange}
                placeholder="Ejemplo: Windows 11"
              />
            </Form.Group>

            <div className="d-flex justify-content-between">
              <Button variant="secondary" onClick={() => navigate(`/devices/list`)}>
                ← Volver
              </Button>
              <Button variant="success" type="submit">
                💾 Guardar Dispositivo
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CreateDevice;
