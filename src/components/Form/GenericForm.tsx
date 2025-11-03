import React from "react";
import { useLibreria } from "../../context/LibreriaContext";
import FormTailwind from "./FormTailwind";
import FormBootstrap from "./FormBootstrap";
import FormMaterialUI from "./FormMaterialUI";

interface GenericFormProps<T extends object> {
  mode: 1 | 2;
  data: T;
  handleCreate?: (values: Partial<T>) => Promise<void> | void;
  handleUpdate?: (values: Partial<T>) => Promise<void> | void;
}

const GenericForm = <T extends object>(props: GenericFormProps<T>) => {
  const { libreria } = useLibreria();

  switch (libreria) {
    case "bootstrap":
      return <FormBootstrap {...props} />;
    case "ui":
      return <FormMaterialUI {...props} />;
    default:
      return <FormTailwind {...props} />;
  }
};

export default GenericForm;
