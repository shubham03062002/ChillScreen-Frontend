// src/components/Watchlist.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../constants/constant";

const WatchList = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch watchlist
  const fetchWatchlist = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/getwatch`, {
        withCredentials: true,
      });
      setWatchlist(data);
      console.log(data,"watch")
      console.log("Fetched watchlist:", data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch watchlist");
    } finally {
      setLoading(false);
    }
  };

  // Remove from watchlist
  const removeFromWatchlist = async (movieId) => {
    try {
      await axios.put(
        `${BACKEND_URL}/rmwatch`,
        { "id": movieId },
        { withCredentials: true }
      );
      toast.success("Removed from watchlist");
      setWatchlist((prev) => prev.filter((item) => item.id !== movieId));
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove from watchlist");
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-4 min-h-[60vh]">
      <h2 className="text-2xl font-bold mb-4">My Watchlist</h2>
      {watchlist.length === 0 ? (
        <p>No items in watchlist yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {watchlist.map((movie) => (
            <div
              key={movie.id}
              className="border rounded-lg p-3 shadow hover:shadow-lg transition"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.original_title || movie.name}
                className="w-full h-48 object-cover rounded max-w-full h-auto"
              />
              <h3 className="mt-2 font-semibold truncate">
                {movie.original_title || movie.name}
              </h3>
              <h4 className="mt-2 ">
                {movie.overview}
              </h4>
              <p className="text-sm text-gray-500">
                ⭐ {movie.vote_average?.toFixed(1)} | {movie.release_date}
              </p>
              <button
                onClick={() => removeFromWatchlist(movie.id)}
                className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchList;
