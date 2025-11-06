// src/components/Table/GenericTable.tsx
// -----------------------------------------------------------------------------
// Componente de tabla genérico que selecciona automáticamente la librería visual
// (Tailwind, Bootstrap o UI) según el contexto global (`LibreriaContext`).
// Este componente actúa como capa de abstracción para renderizar datos de manera
// uniforme sin importar la tecnología de UI seleccionada.
// -----------------------------------------------------------------------------

import React from "react";
import { useLibreria } from "../../context/LibreriaContext";
import GenericTableTailwind from "./GenericTableTailwind";
import GenericTableBootstrap from "./GenericTableBootstrap";
import GenericTableUI from "./GenericTableUI";

// -----------------------------------------------------------------------------
// Tipos e interfaces de apoyo
// -----------------------------------------------------------------------------
export interface Action {
  name: string;  // Identificador de la acción (ej: "edit", "delete")
  label: string; // Texto visible en el botón o menú
}

export interface GenericTableProps<T extends Record<string, any>> {
  data: T[];                                 // Datos que se mostrarán en la tabla
  columns?: (keyof T | string)[];            // Columnas a mostrar (opcional)
  actions?: Action[];                        // Acciones disponibles por fila
  onAction?: (name: string, item: T) => void | Promise<void>; // Callback para manejar acciones
}

// -----------------------------------------------------------------------------
// Componente principal
// -----------------------------------------------------------------------------
const GenericTable = <T extends Record<string, any>>(props: GenericTableProps<T>) => {
  const { libreria } = useLibreria(); // Contexto global para decidir qué estilo usar

  // Si no se especifican columnas, las infiere automáticamente
  // eliminando campos sensibles o irrelevantes
  const inferredColumns =
    props.columns && props.columns.length > 0
      ? props.columns
      : props.data.length > 0
      ? Object.keys(props.data[0]).filter(
          (key) => !["created_at", "updated_at", "password"].includes(key)
        )
      : [];

  // Propiedades comunes a pasar al componente concreto
  const commonProps = { ...props, columns: inferredColumns };

  // Selección dinámica de librería según el contexto
  switch (libreria) {
    case "bootstrap":
      return <GenericTableBootstrap {...(commonProps as any)} />;
    case "ui":
      return <GenericTableUI {...(commonProps as any)} />;
    default:
      return <GenericTableTailwind {...(commonProps as any)} />;
  }
};

export default GenericTable;
