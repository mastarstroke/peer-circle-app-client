import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/profile/me",
      { withCredentials: true }
    );

    setProfile(res.data);
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        
        <div className="h-40 bg-gradient-to-r from-indigo-500 to-purple-600"></div>

        <div className="p-8 -mt-16">
          <img
            src={profile.avatar}
            alt=""
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
          />

          <h1 className="text-3xl font-bold mt-4">
            {profile.fullName}
          </h1>

          <p className="text-gray-600 mt-2">
            {profile.headline || "No headline added"}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-2xl">
              <h3 className="font-semibold">Company</h3>
              <p>{profile.company || "-"}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-2xl">
              <h3 className="font-semibold">Location</h3>
              <p>{profile.location || "-"}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}