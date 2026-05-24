import { useEffect, useState } from "react";
import api from "../lib/axios";

export default function EditProfile() {
  const [form, setForm] = useState({
    fullName: "",
    headline: "",
    bio: "",
    company: "",
    location: "",
    skills: "",
    website: "",
    github: "",
    linkedin: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const res = await api.get(
      "http://localhost:5000/api/profile/me",
      { withCredentials: true }
    );

    setForm(res.data);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

    const saveProfile = async (e) => {
    e.preventDefault();

    await api.put(
        "http://localhost:5000/api/profile/update",
        form,
        { withCredentials: true }
    );

    alert("Profile updated");

    window.location.href = "/dashboard";
    };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        
        <h1 className="text-3xl font-bold mb-8">
          Edit Profile
        </h1>

        <form
          onSubmit={saveProfile}
          className="space-y-5"
        >
          {Object.keys(form).map((field) => (
            <div key={field}>
              <label className="block mb-2 font-medium capitalize">
                {field}
              </label>

              <input
                type="text"
                name={field}
                value={form[field] || ""}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          ))}

          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
}