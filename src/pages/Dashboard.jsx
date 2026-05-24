import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/profile";

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

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
    try {
      setLoading(true);

      const res = await axios.get(`${API}/me`, {
        withCredentials: true,
      });

      setProfile(res.data);

      setForm({
        fullName: res.data.fullName || "",
        headline: res.data.headline || "",
        bio: res.data.bio || "",
        company: res.data.company || "",
        location: res.data.location || "",
        skills: res.data.skills || "",
        website: res.data.website || "",
        github: res.data.github || "",
        linkedin: res.data.linkedin || "",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const saveProfile = async () => {
    try {
      setSaving(true);

      const res = await axios.put(`${API}/update`, form, {
        withCredentials: true,
      });

      setProfile(res.data.user);
      setEditMode(false);
    } finally {
      setSaving(false);
    }
  };

  const cancelEdit = () => {
    setForm({
      fullName: profile.fullName || "",
      headline: profile.headline || "",
      bio: profile.bio || "",
      company: profile.company || "",
      location: profile.location || "",
      skills: profile.skills || "",
      website: profile.website || "",
      github: profile.github || "",
      linkedin: profile.linkedin || "",
    });

    setEditMode(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

        <div className="h-40 bg-gradient-to-r from-indigo-600 to-purple-600 relative">

          <div className="absolute bottom-5 left-8">
            <h1 className="tracking-wide">
              Dashboard
            </h1>
            <p className="text-indigo-100 text-sm mt-1">
              Manage your account profile & settings
            </p>
          </div>

        </div>

        <div className="p-8 -mt-16 relative">

          {!editMode && (
            <button
              onClick={() => setEditMode(true)}
              className="absolute top-6 right-6 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
            >
              Edit Profile
            </button>
          )}

          <div className="flex items-center gap-5">
            <img
              src={
                profile.avatar ||
                `https://ui-avatars.com/api/?name=${profile.fullName}`
              }
              className="w-28 h-28 rounded-full border-4 border-white shadow"
            />

            <div className="w-full">
              {editMode ? (
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  className="text-2xl font-bold w-full border-b outline-none bg-transparent"
                />
              ) : (
                <h1 className="text-3xl font-bold">
                  {profile.fullName}
                </h1>
              )}

              {editMode ? (
                <input
                  name="headline"
                  value={form.headline}
                  onChange={handleChange}
                  className="w-full border-b outline-none text-gray-600 mt-1"
                />
              ) : (
                <p className="text-gray-600 mt-1">
                  {profile.headline || "No headline"}
                </p>
              )}
            </div>
          </div>

          {/* FORM GRID */}
          <div className="mt-8 grid grid-cols-2 gap-6">

            <Field label="Company" name="company" editMode={editMode} form={form} onChange={handleChange} />
            <Field label="Location" name="location" editMode={editMode} form={form} onChange={handleChange} />
            <Field label="Website" name="website" editMode={editMode} form={form} onChange={handleChange} />
            <Field label="GitHub" name="github" editMode={editMode} form={form} onChange={handleChange} />
            <Field label="LinkedIn" name="linkedin" editMode={editMode} form={form} onChange={handleChange} />
            <Field label="Skills" name="skills" editMode={editMode} form={form} onChange={handleChange} />

          </div>

          {/* BIO */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Bio</h3>

            {editMode ? (
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                rows="4"
                className="w-full border rounded-xl p-3"
              />
            ) : (
              <p className="text-gray-600">
                {profile.bio || "No bio added"}
              </p>
            )}
          </div>

          {/* BOTTOM ACTIONS */}
          {editMode && (
            <div className="flex justify-end gap-4 mt-10">

              <button
                onClick={cancelEdit}
                className="px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={saveProfile}
                disabled={saving}
                className="px-5 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}

/* FIELD COMPONENT */
function Field({ label, name, form, onChange, editMode }) {
  return (
    <div className="bg-gray-50 p-4 rounded-2xl">
      <h3 className="font-semibold mb-1">{label}</h3>

      {editMode ? (
        <input
          name={name}
          value={form[name] || ""}
          onChange={onChange}
          className="w-full border rounded-lg px-3 py-2"
        />
      ) : (
        <p className="text-gray-600">{form[name] || "-"}</p>
      )}
    </div>
  );
}