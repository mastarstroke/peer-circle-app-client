import { useEffect, useState } from "react";
import axios from "axios";
import FollowButton from "../components/FollowButton";
import { Link } from "react-router-dom";
import FollowingList from "../components/FollowingList";
import toast from "react-hot-toast";
import ActivityLogs from "../components/ActivityLogs";

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

      toast.success("Profile updated successfully");

      setEditMode(false);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to update profile"
      );
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
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-sm">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 relative">
          <div className="flex items-start justify-between">
            
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Dashboard
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage your profile and account settings
              </p>
            </div>

            {/* <FollowButton userId={profile.id} /> */}
            <Link
              to="/users"
              className="px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-black"
            >
              Discover Users
            </Link>
          </div>
        </div>

        {/* PROFILE CARD */}
        <div className="bg-white border border-gray-200 rounded-2xl mt-6 p-6">
          
          {/* TOP SECTION */}
          <div className="flex items-center justify-between">
            
            <div className="flex items-center gap-4">
              <img
                src={
                  profile.avatar ||
                  `https://ui-avatars.com/api/?name=${profile.fullName}`
                }
                className="w-20 h-20 rounded-full border border-gray-200"
              />

              <div>
                {!editMode ? (
                  <>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {profile.fullName}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {profile.headline || "No headline"}
                    </p>
                  </>
                ) : (
                  <>
                    <input
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      className="text-lg font-semibold border-b outline-none w-full"
                    />
                    <input
                      name="headline"
                      value={form.headline}
                      onChange={handleChange}
                      className="text-sm text-gray-500 border-b outline-none w-full mt-1"
                    />
                  </>
                )}
              </div>
            </div>

            {!editMode && (
              <button
                onClick={() => setEditMode(true)}
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Edit
              </button>
            )}
          </div>

          {/* GRID */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <Field label="Company" name="company" editMode={editMode} form={form} onChange={handleChange} />
            <Field label="Location" name="location" editMode={editMode} form={form} onChange={handleChange} />
            <Field label="Website" name="website" editMode={editMode} form={form} onChange={handleChange} />
            <Field label="GitHub" name="github" editMode={editMode} form={form} onChange={handleChange} />
            <Field label="LinkedIn" name="linkedin" editMode={editMode} form={form} onChange={handleChange} />
            <Field label="Skills" name="skills" editMode={editMode} form={form} onChange={handleChange} />
          </div>

          {/* BIO */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Bio</h3>

            {editMode ? (
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                rows="4"
                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            ) : (
              <p className="text-sm text-gray-600 leading-relaxed">
                {profile.bio || "No bio added"}
              </p>
            )}
          </div>

          {/* ACTIONS */}
          {editMode && (
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={cancelEdit}
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={saveProfile}
                disabled={saving}
                className="px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-black"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}
        </div>

        <FollowingList />
        <ActivityLogs />
      </div>
    </div>
  );
}

/* FIELD COMPONENT */
function Field({ label, name, form, onChange, editMode }) {
  return (
    <div className="border border-gray-100 bg-gray-50 rounded-xl p-4">
      <h3 className="text-xs font-medium text-gray-500 mb-1">{label}</h3>

      {editMode ? (
        <input
          name={name}
          value={form[name] || ""}
          onChange={onChange}
          className="w-full bg-transparent border-b border-gray-300 outline-none text-sm"
        />
      ) : (
        <p className="text-sm text-gray-700">{form[name] || "-"}</p>
      )}
    </div>
  );
}