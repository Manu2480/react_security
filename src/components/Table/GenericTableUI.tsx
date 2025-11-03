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

const GenericTableUI = <T extends Record<string, any>>({
  data,
  columns,
  actions,
  onAction,
}: GenericTableProps<T>) => {
  if (!data || data.length === 0) {
    return <div style={{ padding: 16 }}>No hay datos disponibles</div>;
  }

  const visibleColumns = columns?.filter(
    (c) => !["password", "created_at", "updated_at"].includes(String(c))
  );

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {visibleColumns?.map((col) => (
              <TableCell key={String(col)} sx={{ fontWeight: 600 }}>
                {String(col).replace(/_/g, " ").toUpperCase()}
              </TableCell>
            ))}
            {actions && <TableCell align="center">Acciones</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, i) => (
            <TableRow key={i} hover>
              {visibleColumns?.map((col) => (
                <TableCell key={String(col)}>{String(row[col])}</TableCell>
              ))}
              {actions && (
                <TableCell align="center">
                  {actions.map((a) => (
                    <Button
                      key={a.name}
                      variant={a.name === "delete" ? "outlined" : "contained"}
                      color={a.name === "delete" ? "error" : "primary"}
                      size="small"
                      sx={{ mx: 0.5 }}
                      onClick={() => onAction && onAction(a.name, row)}
                    >
                      {a.label}
                    </Button>
                  ))}
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
