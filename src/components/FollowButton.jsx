import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

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
    try {
      if (isFollowing) {
        await axios.post(
          `${API}/unfollow`,
          { userId },
          { withCredentials: true }
        );

        setIsFollowing(false);

        toast.success("User unfollowed");
      } else {
        await axios.post(
          `${API}/follow`,
          { userId },
          { withCredentials: true }
        );

        setIsFollowing(true);

        toast.success("User followed");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <button
      onClick={toggleFollow}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
        isFollowing
          ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
          : "bg-indigo-600 text-white hover:bg-indigo-700"
      }`}
    >
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
}