import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Breadcrumb from "../../components/Breadcrumb";
import { addressService } from "../../services/addressService";
import AddressFormValidator from "../../components/Form/AddressFormValidator";
import { Address } from "../../models/Address";

const UpdateAddress: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [address, setAddress] = useState<Address | null>(null);

  useEffect(() => {
    if (!id) return;
    addressService
      .getAddressById(Number(id))
      .then((data) => {
        console.log("📦 Dirección cargada:", data);
        setAddress(data);
      })
      .catch((err) => {
        console.error("Error cargando dirección:", err);
        Swal.fire("Error", "No fue posible cargar la dirección", "error");
        navigate("/addresses/list");
      });
  }, [id]);

  const handleUpdate = async (values: Address) => {
    try {
      await addressService.updateAddress(Number(id), values);
      Swal.fire("Éxito", "Dirección actualizada correctamente", "success");
      navigate("/addresses/list");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No fue posible actualizar la dirección", "error");
    }
  };

  if (!address) return <div>Cargando dirección...</div>;

  return (
    <div>
      <Breadcrumb pageName="Actualizar Dirección" />
      <AddressFormValidator
        mode={2}
        address={address}
        handleUpdate={handleUpdate}
      />
    </div>
  );
};

export default UpdateAddress;
