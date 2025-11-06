// src/components/Table/GenericTableUI.tsx
// -----------------------------------------------------------------------------
// Componente de tabla genérica usando Material UI (MUI).
// - Cada botón tiene un color distinto según la acción.
// - Se agregó barra de desplazamiento horizontal para evitar amontonamiento.
// -----------------------------------------------------------------------------

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { GenericTableProps } from "./GenericTable";

// -----------------------------------------------------------------------------
// GenericTableUI
// -----------------------------------------------------------------------------
const GenericTableUI = <T extends Record<string, any>>({
  data,
  columns,
  actions,
  onAction,
}: GenericTableProps<T>) => {
  // Si no hay datos disponibles
  if (!data || data.length === 0) {
    return <div style={{ padding: 16 }}>No hay datos disponibles</div>;
  }

  // Filtramos las columnas visibles para evitar mostrar campos sensibles
  const visibleColumns = columns?.filter(
    (c) => !["password", "created_at", "updated_at"].includes(String(c))
  );

  // Determina el color del botón según la acción
  const getButtonColor = (actionName: string) => {
    switch (actionName) {
      case "edit":
        return "primary"; // Azul
      case "delete":
        return "error"; // Rojo
      case "address":
        return "secondary"; // Gris morado
      case "profile":
        return "success"; // Verde
      case "sessions":
        return "info"; // Celeste
      case "password":
        return "warning"; // Amarillo
      default:
        return "primary";
    }
  };

  return (
    // Contenedor con scroll horizontal
    <TableContainer
      component={Paper}
      sx={{
        overflowX: "auto", // permite scroll lateral
        maxWidth: "100%", // evita desbordar el layout
        "&::-webkit-scrollbar": { height: 8 }, // estilo de scrollbar
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#b0b0b0",
          borderRadius: 4,
        },
      }}
    >
      <Table sx={{ minWidth: 900 /* fuerza ancho mínimo */ }}>
        {/* Encabezado */}
        <TableHead>
          <TableRow>
            {visibleColumns?.map((col) => (
              <TableCell
                key={String(col)}
                sx={{ fontWeight: 600, whiteSpace: "nowrap" }}
              >
                {String(col).replace(/_/g, " ").toUpperCase()}
              </TableCell>
            ))}
            {actions && <TableCell align="center">Acciones</TableCell>}
          </TableRow>
        </TableHead>

        {/* Cuerpo */}
        <TableBody>
          {data.map((row, i) => (
            <TableRow key={i} hover>
              {visibleColumns?.map((col) => (
                <TableCell
                  key={String(col)}
                  sx={{ whiteSpace: "nowrap", maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis" }}
                >
                  {String(row[col])}
                </TableCell>
              ))}
              {actions && (
                <TableCell align="center">
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "nowrap", // botones en una sola línea
                      overflowX: "auto", // si hay muchos, se hace scroll
                      justifyContent: "center",
                      padding: "4px 0",
                    }}
                  >
                    {actions.map((a) => (
                      <Button
                        key={a.name}
                        variant={a.name === "delete" ? "outlined" : "contained"}
                        color={getButtonColor(a.name)}
                        size="small"
                        sx={{
                          mx: 0.5,
                          whiteSpace: "nowrap", // evita que se rompan
                          flexShrink: 0, // mantiene su tamaño
                        }}
                        onClick={() => onAction && onAction(a.name, row)}
                      >
                        {a.label}
                      </Button>
                    ))}
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GenericTableUI;
