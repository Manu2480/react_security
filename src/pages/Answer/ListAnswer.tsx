import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { answerService } from "../../services/AnswerService";
import { Answer } from "../../models/Answer";
import Breadcrumb from "../../components/Breadcrumb";
import { Table, Button, Container } from "react-bootstrap";

const ListAnswer: React.FC = () => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAnswers();
  }, []);

  const fetchAnswers = async () => {
    try {
      const res = await answerService.getAnswers();
      setAnswers(res);
    } catch (error) {
      console.error("Error obteniendo respuestas:", error);
      Swal.fire("Error", "No fue posible obtener las respuestas", "error");
    }
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "¿Eliminar respuesta?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      await answerService.deleteAnswer(id);
      Swal.fire("Eliminado", "Respuesta eliminada correctamente", "success");
      fetchAnswers();
    } catch (error) {
      Swal.fire("Error", "No fue posible eliminar la respuesta", "error");
    }
  };

  return (
    <Container className="mt-4">
      <Breadcrumb pageName="Respuestas de Seguridad" />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Listado de Respuestas</h4>
        <Button onClick={() => navigate("/answers/create")} variant="success">
          + Crear Respuesta
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>ID Usuario</th>
            <th>ID Pregunta</th>
            <th>Contenido</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {answers.length > 0 ? (
            answers.map((a) => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.user_id}</td>
                <td>{a.security_question_id}</td>
                <td>{a.content}</td>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    className="me-2"
                    onClick={() => navigate(`/answers/update/${a.id}`)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(a.id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
                No hay respuestas registradas
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default ListAnswer;
