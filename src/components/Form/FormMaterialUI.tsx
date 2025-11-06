import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";

// Interfaz que define las propiedades del formulario.
// El tipo genérico <T> permite reutilizar este componente para cualquier entidad.
interface FormMaterialUIProps<T extends object> {
  mode: 1 | 2; // 1 = crear, 2 = actualizar
  data: T; // Datos iniciales o estructura del formulario
  handleCreate?: (values: Partial<T>) => Promise<void> | void; // Acción al crear
  handleUpdate?: (values: Partial<T>) => Promise<void> | void; // Acción al actualizar
}

// Componente del formulario basado en Material UI.
// Usa Formik para manejar los valores y Yup para validaciones dinámicas.
const FormMaterialUI = <T extends object>({
  mode,
  data,
  handleCreate,
  handleUpdate,
}: FormMaterialUIProps<T>) => {
  // Función que se ejecuta al enviar el formulario
  const onSubmit = async (values: Partial<T>) => {
    if (mode === 1 && handleCreate) await handleCreate(values);
    if (mode === 2 && handleUpdate) await handleUpdate(values);
  };

  // Campos que no deben mostrarse en el formulario
  const omit = ["id", "created_at", "updated_at"];

  // Crea una estructura de validación dependiendo del tipo de dato
  const validationShape: Record<string, any> = {};
  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === "string") validationShape[key] = Yup.string().required("Requerido");
    else if (typeof value === "number") validationShape[key] = Yup.number().required("Requerido");
  });

  return (
    <Formik
      initialValues={data} // Valores iniciales del formulario
      validationSchema={Yup.object(validationShape)} // Validaciones generadas dinámicamente
      onSubmit={onSubmit}
      enableReinitialize // Permite actualizar el formulario si cambian los datos
    >
      {({ values, handleChange }) => (
        <Form style={{ display: "grid", gap: 16, padding: 16 }}>
          {/* Genera los campos del formulario recorriendo los valores */}
          {Object.entries(values)
            .filter(([key]) => !omit.includes(key)) // Filtra los campos no editables
            .map(([key, value]) =>
              typeof value === "boolean" ? (
                // Campo tipo checkbox para valores booleanos
                <FormControlLabel
                  key={key}
                  control={
                    <Checkbox
                      name={key}
                      checked={value}
                      onChange={handleChange}
                    />
                  }
                  label={key.replace(/_/g, " ").toUpperCase()}
                />
              ) : (
                // Campo de texto o número según el tipo de valor
                <Field
                  key={key}
                  as={TextField}
                  name={key}
                  label={key.replace(/_/g, " ").toUpperCase()}
                  type={typeof value === "number" ? "number" : "text"}
                  variant="outlined"
                  fullWidth
                />
              )
            )}

          {/* Botón para enviar el formulario */}
          <Button type="submit" variant="contained" color="primary">
            {mode === 1 ? "Crear" : "Actualizar"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default FormMaterialUI;
