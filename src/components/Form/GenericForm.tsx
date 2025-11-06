import React from "react";
import { useLibreria } from "../../context/LibreriaContext";
import FormTailwind from "./FormTailwind";
import FormBootstrap from "./FormBootstrap";
import FormMaterialUI from "./FormMaterialUI";

// Define las propiedades genéricas que puede recibir el formulario.
// Se usa <T> para que funcione con cualquier modelo (User, Role, etc.)
interface GenericFormProps<T extends object> {
  mode: 1 | 2; // Modo del formulario: 1 = crear, 2 = actualizar.
  data: T; // Datos base que mostrará el formulario.
  handleCreate?: (values: Partial<T>) => Promise<void> | void; // Acción al crear.
  handleUpdate?: (values: Partial<T>) => Promise<void> | void; // Acción al actualizar.
}

// Componente genérico que selecciona qué versión del formulario mostrar
// según la librería visual activa en el contexto (Tailwind, Bootstrap o Material UI).
const GenericForm = <T extends object>(props: GenericFormProps<T>) => {
  const { libreria } = useLibreria(); // Obtiene la librería visual actual desde el contexto global.

  // Según la librería, retorna el formulario correspondiente.
  switch (libreria) {
    case "bootstrap":
      return <FormBootstrap {...props} />; // Si se usa Bootstrap.
    case "ui":
      return <FormMaterialUI {...props} />; // Si se usa Material UI.
    default:
      return <FormTailwind {...props} />; // Por defecto usa Tailwind.
  }
};

export default GenericForm;
