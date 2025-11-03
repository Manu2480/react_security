import React from "react";
import { useLibreria } from "../../context/LibreriaContext";
import GenericTableTailwind from "./GenericTableTailwind";
import GenericTableBootstrap from "./GenericTableBootstrap";
import GenericTableUI from "./GenericTableUI";

export interface Action {
  name: string;
  label: string;
}

export interface GenericTableProps<T extends Record<string, any>> {
  data: T[];
  columns?: (keyof T | string)[];
  actions?: Action[];
  onAction?: (name: string, item: T) => void | Promise<void>;
}

const GenericTable = <T extends Record<string, any>>(props: GenericTableProps<T>) => {
  const { libreria } = useLibreria();

  const inferredColumns =
    props.columns && props.columns.length > 0
      ? props.columns
      : props.data.length > 0
      ? Object.keys(props.data[0]).filter(
          (key) => !["created_at", "updated_at", "password"].includes(key)
        )
      : [];

  const commonProps = { ...props, columns: inferredColumns };

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
