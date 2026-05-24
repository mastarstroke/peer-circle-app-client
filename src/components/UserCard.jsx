import { useEffect, useState } from "react";
import api from "../lib/axios";
import UserCard from "../components/UserCard";

const API = "http://localhost:5000/api/relationships";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await api.get(`${API}/users`, {
      withCredentials: true,
    });

    setUsers(res.data);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">

        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
          <h1 className="text-2xl font-semibold">
            Discover People
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            Follow and connect with other users
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>

      </div>
    </div>
  );
}