import React, { useState, ChangeEvent, FormEvent } from "react";
import Breadcrumb from "../../components/Breadcrumb";

interface ProfileForm {
  name: string;
  email: string;
  phone: string;
  photo: File | null;
  bio: string; // Nueva propiedad para la biografía
}

const ProfileEdit: React.FC = () => {
  const [formData, setFormData] = useState<ProfileForm>({
    name: "",
    email: "",
    phone: "",
    photo: null,
    bio: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const dataToSend = new FormData();
    dataToSend.append("name", formData.name);
    dataToSend.append("email", formData.email);
    dataToSend.append("phone", formData.phone);
    if (formData.photo) dataToSend.append("photo", formData.photo);
    dataToSend.append("bio", formData.bio);

    // Ejemplo: actualización de perfil
    fetch("http://localhost:5000/api/profile", {
      method: "PUT",
      body: dataToSend,
    })
      .then((res) => res.json())
      .then((data) => console.log("Perfil actualizado:", data))
      .catch((err) => console.error("Error al actualizar:", err));
  };

  return (
    <>
      <Breadcrumb pageName="Profile Update" />

      <div className="max-w-xl mx-auto p-6 border rounded bg-white shadow-md dark:bg-boxdark">
        <h2 className="text-2xl font-semibold mb-4 text-center">Update Profile</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium">Photo</label>
            <input type="file" name="photo" onChange={handleChange} />
          </div>

          <div>
            <label className="block font-medium">Bio</label>
            <input
              type="text"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className="mt-3 bg-primary text-white py-2 px-4 rounded hover:bg-opacity-80"
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default ProfileEdit;
