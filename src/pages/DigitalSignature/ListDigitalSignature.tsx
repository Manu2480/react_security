import React, { useEffect, useState } from "react";
import { Button, Card, Container, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import { digitalSignatureService } from "../../services/DigitalSignatureService";
import { DigitalSignature } from "../../models/DigitalSignature";

const ListDigitalSignature: React.FC = () => {
  const [signatures, setSignatures] = useState<DigitalSignature[]>([]);
  const navigate = useNavigate();

  // 🔹 Cargar firmas digitales
  const loadSignatures = async () => {
    try {
      const res = await digitalSignatureService.getDigitalSignatures();
      setSignatures(res);
    } catch (error) {
      console.error("Error al cargar firmas digitales:", error);
      Swal.fire("Error", "No fue posible cargar las firmas digitales.", "error");
    }
  };

  useEffect(() => {
    loadSignatures();
  }, []);

  // 🔹 Eliminar una firma digital
  const handleDelete = async (id: number) => {
    const confirm = await Swal.fire({
      title: "¿Eliminar Firma?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc3545",
    });

    if (confirm.isConfirmed) {
      try {
        await digitalSignatureService.deleteDigitalSignature(id);
        Swal.fire("Eliminada", "La firma digital ha sido eliminada.", "success");
        loadSignatures();
      } catch (error) {
        console.error("Error eliminando firma:", error);
        Swal.fire("Error", "No se pudo eliminar la firma digital.", "error");
      }
    }
  };

  return (
    <Container className="py-4">
      <Breadcrumb pageName="Listado de Firmas Digitales" />
      <Card className="shadow-lg border-0">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="text-success mb-0">Firmas Digitales</h2>
            <Button variant="success" onClick={() => navigate("/digitalsignatures/create")}>
              + Nueva Firma
            </Button>
          </div>

          <Table bordered hover responsive>
            <thead className="table-success text-center">
              <tr>
                <th>ID</th>
                <th>Usuario ID</th>
                <th>Imagen</th>
                <th>Fecha de Creación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {signatures.length > 0 ? (
                signatures.map((sig) => (
                  <tr key={sig.id} className="align-middle text-center">
                    <td>{sig.id}</td>
                    <td>{sig.user_id}</td>
                    <td>
                      {sig.photo ? (
                        <img
                          src={sig.photo}
                          alt="Firma"
                          width={100}
                          height={60}
                          style={{ objectFit: "contain", borderRadius: "8px" }}
                        />
                      ) : (
                        <span className="text-muted">Sin imagen</span>
                      )}
                    </td>
                    <td>
                      {sig.created_at ? (
                        new Date(sig.created_at).toLocaleString("es-CO", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })
                      ) : (
                        <span className="text-muted">Sin fecha</span>
                      )}
                    </td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => navigate(`/digitalsignatures/edit/${sig.id}`)}
                      >
                        ✏️ Editar
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(sig.id!)}
                      >
                        🗑️ Eliminar
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center text-muted py-4">
                    No hay firmas digitales registradas.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ListDigitalSignature;
