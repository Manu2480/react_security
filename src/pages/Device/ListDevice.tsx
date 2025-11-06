import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Button, Table, Card, Container } from "react-bootstrap";
import Breadcrumb from "../../components/Breadcrumb";
import { deviceService } from "../../services/DeviceService";
import { Device } from "../../models/Device";

const ListDevice: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      const res = await deviceService.getDevices();
      setDevices(res);
    } catch (error: any) {
      console.error("Error al obtener dispositivos:", error);
      Swal.fire("Error", "No fue posible cargar los dispositivos.", "error");
    }
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Eliminar dispositivo",
      text: "¿Estás seguro de eliminar este dispositivo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      await deviceService.deleteDevice(id);
      Swal.fire("Eliminado", "Dispositivo eliminado correctamente.", "success");
      fetchDevices();
    } catch (error) {
      console.error("Error eliminando dispositivo:", error);
      Swal.fire("Error", "No fue posible eliminar el dispositivo.", "error");
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/devices/update/${id}`);
  };

  const handleCreate = () => {
    navigate(`/devices/create`);
  };

  return (
    <Container className="py-4">
      <Breadcrumb pageName="Dispositivos" />
      <Card className="shadow-lg border-0">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="text-success mb-0">Dispositivos del Sistema</h2>
            <Button variant="success" onClick={handleCreate}>
              + Agregar Dispositivo
            </Button>
          </div>

          {devices.length === 0 ? (
            <div className="text-center text-muted my-4">
              <p>No hay dispositivos registrados.</p>
            </div>
          ) : (
            <Table striped bordered hover responsive>
              <thead className="table-success">
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Dirección IP</th>
                  <th>Sistema Operativo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {devices.map((device) => (
                  <tr key={device.id}>
                    <td>{device.id}</td>
                    <td>{device.name}</td>
                    <td>{device.ip}</td>
                    <td>{device.operating_system || "No especificado"}</td>
                    <td className="text-center">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEdit(device.id)}
                      >
                        ✏️ Editar
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(device.id)}
                      >
                        🗑️ Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ListDevice;
