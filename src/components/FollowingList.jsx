import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/relationships";

export default function FollowingList() {
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    fetchFollowing();
  }, []);

  const fetchFollowing = async () => {
    const res = await axios.get(`${API}/following`, {
      withCredentials: true,
    });

    setFollowing(res.data);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 mt-6">

      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-semibold">
            Following
          </h2>

          <p className="text-sm text-gray-500">
            Users you follow
          </p>
        </div>
      </div>

      {following.length === 0 ? (
        <p className="text-sm text-gray-500">
          You are not following anyone yet.
        </p>
      ) : (
        <div className="space-y-4">
          {following.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between border border-gray-100 rounded-xl p-4"
            >
              <div className="flex items-center gap-3">
                <img
                  src={
                    user.avatar ||
                    `https://ui-avatars.com/api/?name=${user.fullName}`
                  }
                  className="w-12 h-12 rounded-full"
                />

                <div>
                  <h3 className="font-medium">
                    {user.fullName}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {user.headline || "No headline"}
                  </p>
                </div>
              </div>

              <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm">
                Message
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}