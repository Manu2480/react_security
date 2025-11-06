import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Breadcrumb from "../../components/Breadcrumb";
import { Form, Button, Container } from "react-bootstrap";
import { answerService } from "../../services/AnswerService";
import { Answer } from "../../models/Answer";

const UpdateAnswer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [answer, setAnswer] = useState<Answer | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) fetchAnswer(Number(id));
  }, [id]);

  const fetchAnswer = async (answerId: number) => {
    try {
      const data = await answerService.getAnswerById(answerId);
      setAnswer(data);
    } catch (error) {
      console.error("Error obteniendo la respuesta:", error);
      Swal.fire("Error", "No fue posible cargar la respuesta", "error");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id || !answer) return;

    try {
      await answerService.updateAnswer(Number(id), { content: answer.content });
      Swal.fire("Éxito", "Respuesta actualizada correctamente", "success");
      navigate("/answers/list");
    } catch (error) {
      console.error("Error actualizando respuesta:", error);
      Swal.fire("Error", "No fue posible actualizar la respuesta", "error");
    }
  };

  if (!answer) return <div>Cargando datos...</div>;

  return (
    <Container className="mt-4">
      <Breadcrumb pageName="Editar Respuesta" />
      <h4 className="mb-3">Editar Respuesta</h4>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Contenido</Form.Label>
          <Form.Control
            type="text"
            value={answer.content}
            onChange={(e) => setAnswer({ ...answer, content: e.target.value })}
          />
        </Form.Group>

        <div className="d-flex justify-content-end">
          <Button type="submit" variant="primary">
            Actualizar
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default UpdateAnswer;
