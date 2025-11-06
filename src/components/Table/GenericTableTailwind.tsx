import React from "react";
import { GenericTableProps } from "./GenericTable";

const GenericTableTailwind = <T extends Record<string, any>>({
  data,
  columns,
  actions,
  onAction,
}: GenericTableProps<T>) => {
  if (!data || data.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        <div className="text-lg font-medium">No hay datos disponibles</div>
        <div className="text-sm mt-1">Empieza creando registros para que aparezcan aquí.</div>
      </div>
    );
  }

  const visibleColumns = columns?.filter(
    (c) => !["password", "created_at", "updated_at"].includes(String(c))
  );

  const actionClassFor = (name: string) => {
    const baseStyle = "!inline-flex !items-center !justify-center !text-white !font-medium !shadow-sm !transition-all !duration-150 !ease-in-out !cursor-pointer disabled:!opacity-50";
    
    switch (name) {
      case "delete":
        return `${baseStyle} ![background-color:rgb(220,38,38)] hover:![background-color:rgb(185,28,28)] active:![background-color:rgb(153,27,27)]`;
      case "edit":
      case "update":
        return `${baseStyle} ![background-color:rgb(245,158,11)] hover:![background-color:rgb(217,119,6)] active:![background-color:rgb(180,83,9)]`;
      case "view":
        return `${baseStyle} ![background-color:rgb(5,150,105)] hover:![background-color:rgb(4,120,87)] active:![background-color:rgb(6,95,70)]`;
      case "sessions":
        return `${baseStyle} ![background-color:rgb(79,70,229)] hover:![background-color:rgb(67,56,202)] active:![background-color:rgb(55,48,163)]`;
      case "profile":
        return `${baseStyle} ![background-color:rgb(147,51,234)] hover:![background-color:rgb(126,34,206)] active:![background-color:rgb(107,33,168)]`;
      case "password":
        return `${baseStyle} ![background-color:rgb(234,88,12)] hover:![background-color:rgb(194,65,12)] active:![background-color:rgb(154,52,18)]`;
      case "address":
        return `${baseStyle} ![background-color:rgb(8,145,178)] hover:![background-color:rgb(14,116,144)] active:![background-color:rgb(21,94,117)]`;
      default:
        return `${baseStyle} ![background-color:rgb(79,70,229)] hover:![background-color:rgb(67,56,202)] active:![background-color:rgb(55,48,163)]`;
    }
  };

  const renderActionIcon = (name: string) => {
    switch (name) {
      case "delete":
        return (
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case "edit":
      case "update":
        return (
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 21v-3.75L14.81 5.44a2 2 0 012.83 0l1.92 1.92a2 2 0 010 2.83L7.75 21H3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case "view":
        return (
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      default:
        return (
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden shadow-lg rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-gradient-to-r from-slate-100 to-white">
              <tr>
                {visibleColumns?.map((col) => (
                  <th
                    key={String(col)}
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    {String(col).replace(/_/g, " ").toUpperCase()}
                  </th>
                ))}
                {actions && (
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Acciones
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white">
              {data.map((row, i) => (
                <tr
                  key={i}
                  className={`hover:shadow-sm ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                >
                  {visibleColumns?.map((col) => (
                    <td key={String(col)} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 max-w-xs truncate">
                      {row[col] === null || row[col] === undefined ? (
                        <span className="text-gray-400">—</span>
                      ) : (
                        String(row[col])
                      )}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <div className="inline-flex items-center justify-center gap-2">
                        {actions.map((a) => (
                          <button
                            key={a.name}
                            title={a.label}
                            aria-label={a.label}
                            className={`${actionClassFor(a.name)} ![box-shadow:0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_0_rgba(0,0,0,0.06)] !rounded-md !px-3 !py-1.5 !text-sm !min-w-[80px] focus:!outline-none focus:![box-shadow:0_0_0_2px_rgba(99,102,241,0.25)] hover:![transform:translateY(-1px)] active:![transform:translateY(0)]`}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              if (onAction) onAction(a.name, row);
                            }}
                            type="button"
                          >
                            <span className="![display:inline-flex] ![align-items:center] ![gap:0.5rem] ![color:white]">
                              <span className="![font-size:1rem] ![line-height:1rem] ![color:white]">{renderActionIcon(a.name)}</span>
                              <span className="![white-space:nowrap] ![color:white]">{a.label}</span>
                            </span>
                          </button>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GenericTableTailwind;
