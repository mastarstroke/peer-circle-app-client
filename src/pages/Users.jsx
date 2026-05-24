import { useEffect, useState } from "react";
import api from "../lib/axios";
import FollowButton from "../components/FollowButton";

const API = "http://localhost:5000/api/users";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await api.get(API, { withCredentials: true });
    setUsers(res.data);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Discover People</h1>

      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex justify-between items-center bg-white p-4 rounded-xl shadow"
          >
            <div>
              <p className="font-semibold">{user.fullName}</p>
              <p className="text-gray-500 text-sm">
                {user.headline || "No headline"}
              </p>
            </div>

            <FollowButton userId={user.id} />
          </div>
        ))}
      </div>
    </div>
  );
}