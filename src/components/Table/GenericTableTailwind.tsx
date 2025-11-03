import React from "react";
import { GenericTableProps } from "./GenericTable";

const GenericTableTailwind = <T extends Record<string, any>>({
  data,
  columns,
  actions,
  onAction,
}: GenericTableProps<T>) => {
  if (!data || data.length === 0) {
    return <div className="p-4 text-gray-500">No hay datos disponibles</div>;
  }

  const visibleColumns = columns?.filter(
    (c) => !["password", "created_at", "updated_at"].includes(String(c))
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left border border-gray-300 rounded-md">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            {visibleColumns?.map((col) => (
              <th key={String(col)} className="px-4 py-2 font-semibold border-b">
                {String(col).replace(/_/g, " ").toUpperCase()}
              </th>
            ))}
            {actions && <th className="px-4 py-2 border-b text-center">Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50">
              {visibleColumns?.map((col) => (
                <td key={String(col)} className="px-4 py-2 border-b">
                  {String(row[col])}
                </td>
              ))}
              {actions && (
                <td className="px-4 py-2 border-b text-center">
                  {actions.map((a) => (
                    <button
                      key={a.name}
                      className="text-blue-600 hover:underline mx-2"
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

export default GenericTableTailwind;
