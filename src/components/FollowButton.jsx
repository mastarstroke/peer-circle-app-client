import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/relationships";

export default function FollowButton({ userId }) {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    const res = await axios.get(`${API}/following`, {
      withCredentials: true,
    });

    const list = res.data;
    setIsFollowing(list.some((u) => u.id === userId));
  };

  const toggleFollow = async () => {
    await axios.post(
      `${API}/${isFollowing ? "unfollow" : "follow"}`,
      { followingId: userId },
      { withCredentials: true }
    );

    fetchStatus();
  };

  return (
    <button
      onClick={toggleFollow}
      className={`px-3 py-1 rounded-lg text-white ${
        isFollowing ? "bg-gray-600" : "bg-indigo-600"
      }`}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
}