import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Button, Card, Form, Container } from "react-bootstrap";
import Breadcrumb from "../../components/Breadcrumb";
import { answerService } from "../../services/AnswerService";
import { userService } from "../../services/userService";
import { securityQuestionService } from "../../services/SecurityQuestionService";
import { User } from "../../models/User";
import { SecurityQuestion } from "../../models/SecurityQuestion";

/**
 * Página: Crear Respuesta de Seguridad
 * Permite crear una respuesta asociada a un usuario y una pregunta de seguridad.
 */
const CreateAnswer: React.FC = () => {
  const [userId, setUserId] = useState<number | "">("");
  const [questionId, setQuestionId] = useState<number | "">("");
  const [content, setContent] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [questions, setQuestions] = useState<SecurityQuestion[]>([]);
  const navigate = useNavigate();

  // 🔹 Cargar usuarios y preguntas de seguridad
  useEffect(() => {
    const loadData = async () => {
      try {
        const [usersRes, questionsRes] = await Promise.all([
          userService.getUsers(),
          securityQuestionService.getSecurityQuestions(),
        ]);
        setUsers(usersRes);
        setQuestions(questionsRes);
      } catch (error) {
        console.error("Error cargando datos:", error);
        Swal.fire("Error", "No fue posible cargar usuarios o preguntas.", "error");
      }
    };
    loadData();
  }, []);

  // 🔹 Enviar formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId || !questionId || !content.trim()) {
      Swal.fire("Campos incompletos", "Debe llenar todos los campos.", "warning");
      return;
    }

    try {
      await answerService.createAnswer(Number(userId), Number(questionId), { content });

      await Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Respuesta registrada correctamente.",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/answers/list");
    } catch (error: any) {
      console.error("Error creando la respuesta:", error);
      const message =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        "No fue posible crear la respuesta.";
      Swal.fire("Error", message, "error");
    }
  };

  return (
    <Container className="py-4">
      <Breadcrumb pageName="Crear Respuesta de Seguridad" />
      <Card className="shadow-lg border-0">
        <Card.Body>
          <h2 className="text-success mb-4 text-center">Nueva Respuesta</h2>

          <Form onSubmit={handleSubmit}>
            {/* 🔹 Selector de usuario */}
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

            {/* 🔹 Selector de pregunta de seguridad */}
            <Form.Group className="mb-3">
              <Form.Label>Pregunta de Seguridad</Form.Label>
              <Form.Select
                value={questionId}
                onChange={(e) => setQuestionId(Number(e.target.value))}
                required
              >
                <option value="">Seleccione una pregunta...</option>
                {questions.map((q) => (
                  <option key={q.id} value={q.id}>
                    {q.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* 🔹 Respuesta */}
            <Form.Group className="mb-3">
              <Form.Label>Respuesta</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese la respuesta de seguridad"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </Form.Group>

            {/* 🔹 Botones */}
            <div className="d-flex justify-content-between">
              <Button variant="secondary" onClick={() => navigate("/answers/list")}>
                ← Volver
              </Button>
              <Button type="submit" variant="success">
                💾 Guardar Respuesta
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CreateAnswer;