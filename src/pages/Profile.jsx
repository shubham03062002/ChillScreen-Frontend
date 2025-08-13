// src/pages/UserProfile.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../constants/constant";
import { toast } from "react-toastify";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/getuser`, {
        withCredentials: true,
      });
      setUser(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load user info");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading profile...</p>;
  }

  if (!user) {
    return <p className="text-center mt-10 text-red-500">No user data found.</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md text-white text-center">
        {/* Avatar */}
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-pink-500 flex items-center justify-center text-3xl font-bold">
          {user.name?.[0]}
        </div>

        {/* User Info */}
        <h1 className="text-3xl font-semibold mb-1">{user.name} {user.surname}</h1>
        <p className="text-gray-400 text-sm mb-6">{user.email}</p>

     

        {/* Stats */}
        <div className="flex justify-around">
          <div className="bg-gray-800 px-6 py-4 rounded-lg">
            <p className="text-2xl font-bold text-pink-400">{user.favourites?.length || 0}</p>
            <p className="text-sm text-gray-400">Favourites</p>
          </div>
          <div className="bg-gray-800 px-6 py-4 rounded-lg">
            <p className="text-2xl font-bold text-pink-400">{user.watchlist?.length || 0}</p>
            <p className="text-sm text-gray-400">Watchlist</p>
          </div>
        </div>
      </div>
    </div>
  );
}
