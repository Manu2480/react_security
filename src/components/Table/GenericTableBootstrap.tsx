import React from "react";
import { GenericTableProps } from "./GenericTable";

const GenericTableBootstrap = <T extends Record<string, any>>({
  data,
  columns,
  actions,
  onAction,
}: GenericTableProps<T>) => {
  if (!data || data.length === 0) {
    return <div className="p-3 text-muted">No hay datos disponibles</div>;
  }

  const visibleColumns = columns?.filter(
    (c) => !["password", "created_at", "updated_at"].includes(String(c))
  );

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover align-middle">
        <thead className="table-light">
          <tr>
            {visibleColumns?.map((col) => (
              <th key={String(col)}>{String(col).replace(/_/g, " ").toUpperCase()}</th>
            ))}
            {actions && <th className="text-center">Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {visibleColumns?.map((col) => (
                <td key={String(col)}>{String(row[col])}</td>
              ))}
              {actions && (
                <td className="text-center">
                  {actions.map((a) => (
                    <button
                      key={a.name}
                      className={`btn btn-sm mx-1 ${
                        a.name === "delete" ? "btn-danger" : "btn-primary"
                      }`}
                      onClick={() => onAction && onAction(a.name, row)}
                    >
                      {a.label}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GenericTableBootstrap;
