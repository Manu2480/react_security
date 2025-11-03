import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { addressService } from "../../services/addressService";

// Esquema de validación con Yup
const AddressSchema = Yup.object({
  street: Yup.string().required("La calle es obligatoria"),
  number: Yup.string().required("El número es obligatorio"),
  latitude: Yup.number()
    .typeError("La latitud debe ser un número")
    .required("La latitud es obligatoria"),
  longitude: Yup.number()
    .typeError("La longitud debe ser un número")
    .required("La longitud es obligatoria"),
});

const UpdateAddress: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // ID de la dirección a editar
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState({
    street: "",
    number: "",
    latitude: 0,
    longitude: 0,
  });

  const [loading, setLoading] = useState(true);

  // Cargar los datos de la dirección cuando el componente se monta
  useEffect(() => {
    if (id) fetchData(Number(id));
  }, [id]);

  const fetchData = async (addressId: number) => {
    try {
      const data = await addressService.getById(addressId);
      setInitialValues({
        street: data.street || "",
        number: data.number || "",
        latitude: data.latitude ?? 0,
        longitude: data.longitude ?? 0,
      });
    } catch (error) {
      console.error("Error al obtener dirección:", error);
      Swal.fire("Error", "No se pudo cargar la dirección.", "error");
      navigate("/users");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      if (!id) {
        Swal.fire("Error", "No se especificó la dirección a actualizar.", "error");
        return;
      }

      const payload = {
        ...values,
        latitude: Number(values.latitude),
        longitude: Number(values.longitude),
      };

      await addressService.updateAddress(Number(id), payload);
      Swal.fire("Éxito", "Dirección actualizada correctamente", "success");
      navigate(-1); // Regresar a la vista anterior
    } catch (error) {
      console.error("Error al actualizar dirección:", error);
      Swal.fire("Error", "No se pudo actualizar la dirección.", "error");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600 mt-8">Cargando dirección...</p>;
  }

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Editar Dirección #{id}
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={AddressSchema}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
            <div>
              <label className="block font-medium text-gray-700">Calle</label>
              <Field
                name="street"
                className="w-full border rounded-md p-2"
                placeholder="Ej: Carrera 15"
              />
              <ErrorMessage name="street" component="p" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block font-medium text-gray-700">Número</label>
              <Field
                name="number"
                className="w-full border rounded-md p-2"
                placeholder="Ej: #42A"
              />
              <ErrorMessage name="number" component="p" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block font-medium text-gray-700">Latitud</label>
              <Field
                name="latitude"
                type="number"
                step="any"
                className="w-full border rounded-md p-2"
                placeholder="Ej: 40.7128"
              />
              <ErrorMessage name="latitude" component="p" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block font-medium text-gray-700">Longitud</label>
              <Field
                name="longitude"
                type="number"
                step="any"
                className="w-full border rounded-md p-2"
                placeholder="Ej: -74.0060"
              />
              <ErrorMessage name="longitude" component="p" className="text-red-500 text-sm" />
            </div>

            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="bg-gray-300 text-black rounded-md py-2 px-4 hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-primary text-white rounded-md py-2 px-4 hover:bg-opacity-90"
              >
                Actualizar
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateAddress;
